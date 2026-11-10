<?php

namespace App\Http\Controllers;

use App\Models\KategoriBuku;
use App\Models\KeputusanSpk;
use App\Models\PengadaanBuku;
use App\Models\Supplier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SpkController extends Controller
{
    public function index(Request $request): Response
    {
        $kategoriList = KategoriBuku::all();
        $pengadaanList = PengadaanBuku::with('kategori')
            ->where('status', 'PROSES_SPK')
            ->get();

        // 1. Ambil nilai filter dinamis
        $selectedPengadaanId = $request->query('pengadaan_id');
        /** @var PengadaanBuku|null $selectedPengadaan */
        $selectedPengadaan = $selectedPengadaanId ? PengadaanBuku::with('kategori')->find($selectedPengadaanId) : null;

        // Default batas harga & hari kirim (dari pengadaan terpilih atau nilai default)
        $defaultMaxHarga = $selectedPengadaan ? $selectedPengadaan->maksimal_harga_satuan : 90000;
        $defaultMaxHari = $selectedPengadaan ? $selectedPengadaan->maksimal_hari_kirim : 4;
        $defaultKategoriId = $selectedPengadaan ? $selectedPengadaan->kategori_id : null;

        $maxHarga = (int) $request->query('max_harga', $defaultMaxHarga);
        $maxHariKirim = (int) $request->query('max_hari_kirim', $defaultMaxHari);
        $kategoriId = $request->query('kategori_id', $defaultKategoriId ? (string) $defaultKategoriId : 'all');
        $minDiskon = (float) $request->query('min_diskon', 0);
        $syaratPembayaran = $request->query('syarat_pembayaran', 'all');

        // 2. Query seluruh supplier aktif beserta relasi kategori
        $allSuppliers = Supplier::with('kategori')
            ->where('is_active', true)
            ->get();

        // 3. Evaluasi Filter Dinamis (Menentukan Lolos vs Gugur Kriteria)
        $filteredSuppliers = $allSuppliers->map(function (Supplier $supplier) use ($maxHarga, $maxHariKirim, $kategoriId, $minDiskon, $syaratPembayaran) {
            $passHarga = $supplier->rata_rata_harga <= $maxHarga;
            $passHari = $supplier->estimasi_hari_kirim <= $maxHariKirim;
            $passDiskon = $supplier->diskon_pengadaan_persen >= $minDiskon;

            $passKategori = true;
            $judulKatalogKategori = 0;
            if ($kategoriId !== 'all' && ! empty($kategoriId)) {
                /** @var KategoriBuku|null $matchedKategori */
                $matchedKategori = $supplier->kategori->firstWhere('id', (int) $kategoriId);
                $passKategori = $matchedKategori !== null;
                $judulKatalogKategori = ($matchedKategori && isset($matchedKategori->pivot->jumlah_judul_katalog))
                    ? (int) $matchedKategori->pivot->jumlah_judul_katalog
                    : 0;
            }

            $passSyarat = true;
            if ($syaratPembayaran !== 'all' && ! empty($syaratPembayaran)) {
                $passSyarat = str_contains(strtolower($supplier->syarat_pembayaran), strtolower((string) $syaratPembayaran));
            }

            $isLolos = $passHarga && $passHari && $passDiskon && $passKategori && $passSyarat;

            $alasanGugur = [];
            if (! $passHarga) {
                $selisih = $supplier->rata_rata_harga - $maxHarga;
                $alasanGugur[] = 'Harga Rp '.number_format($supplier->rata_rata_harga, 0, ',', '.').' melebihi batas (selisih +Rp '.number_format($selisih, 0, ',', '.').')';
            }
            if (! $passHari) {
                $selisihHari = $supplier->estimasi_hari_kirim - $maxHariKirim;
                $alasanGugur[] = "Waktu kirim {$supplier->estimasi_hari_kirim} hari melebihi batas target (+{$selisihHari} hari)";
            }
            if (! $passDiskon) {
                $alasanGugur[] = "Diskon {$supplier->diskon_pengadaan_persen}% di bawah syarat minimal {$minDiskon}%";
            }
            if (! $passKategori) {
                $alasanGugur[] = 'Tidak menyediakan kategori buku yang dipilih';
            }
            if (! $passSyarat) {
                $alasanGugur[] = "Opsi pembayaran ({$supplier->syarat_pembayaran}) tidak sesuai filter";
            }

            return [
                'id' => $supplier->id,
                'kode_supplier' => $supplier->kode_supplier,
                'nama_supplier' => $supplier->nama_supplier,
                'kontak_person' => $supplier->kontak_person,
                'telepon' => $supplier->telepon,
                'email' => $supplier->email,
                'kota_asal' => $supplier->kota_asal,
                'alamat' => $supplier->alamat,
                'rata_rata_harga' => $supplier->rata_rata_harga,
                'estimasi_hari_kirim' => $supplier->estimasi_hari_kirim,
                'biaya_ongkir_per_kg' => $supplier->biaya_ongkir_per_kg,
                'min_order_nominal' => $supplier->min_order_nominal,
                'diskon_pengadaan_persen' => (float) $supplier->diskon_pengadaan_persen,
                'garansi_retur_hari' => $supplier->garansi_retur_hari,
                'kebijakan_garansi' => $supplier->kebijakan_garansi,
                'syarat_pembayaran' => $supplier->syarat_pembayaran,
                'rating_keandalan' => (float) $supplier->rating_keandalan,
                'reputasi_catatan' => $supplier->reputasi_catatan,
                'kategori' => $supplier->kategori->map(function ($k) {
                    /** @var KategoriBuku $k */
                    return [
                        'id' => $k->id,
                        'nama' => $k->nama_kategori,
                        'kode' => $k->kode,
                        'judul' => isset($k->pivot->jumlah_judul_katalog) ? (int) $k->pivot->jumlah_judul_katalog : 0,
                    ];
                }),
                'judul_katalog_kategori_terpilih' => $judulKatalogKategori,
                'is_lolos' => $isLolos,
                'pass_harga' => $passHarga,
                'pass_hari' => $passHari,
                'alasan_gugur' => $alasanGugur,
            ];
        });

        $lolosSuppliers = $filteredSuppliers->where('is_lolos', true)->values();
        $gugurSuppliers = $filteredSuppliers->where('is_lolos', false)->values();

        // 4. Komparasi Berdampingan (Side-by-side comparison)
        $compareIdsParam = $request->query('compare_ids');
        $compareIds = [];

        if (is_array($compareIdsParam)) {
            $compareIds = array_map('intval', $compareIdsParam);
        } elseif (is_string($compareIdsParam) && ! empty($compareIdsParam)) {
            $compareIds = array_map('intval', explode(',', $compareIdsParam));
        } else {
            // Default: ambil 2 supplier lolos pertama untuk dibandingkan
            $compareIds = $lolosSuppliers->take(2)->pluck('id')->all();
        }

        // Ambil data supplier yang dibandingkan
        $comparedSuppliers = $filteredSuppliers->whereIn('id', $compareIds)->values();

        // Cari nilai terbaik di antara supplier yang dibandingkan untuk visual highlight
        $highlights = null;
        if ($comparedSuppliers->count() >= 2) {
            $minHarga = $comparedSuppliers->min('rata_rata_harga');
            $minHari = $comparedSuppliers->min('estimasi_hari_kirim');
            $maxDiskon = $comparedSuppliers->max('diskon_pengadaan_persen');
            $maxRating = $comparedSuppliers->max('rating_keandalan');
            $maxGaransi = $comparedSuppliers->max('garansi_retur_hari');
            $minOrder = $comparedSuppliers->min('min_order_nominal');

            $highlights = [
                'min_harga' => $minHarga,
                'min_hari' => $minHari,
                'max_diskon' => $maxDiskon,
                'max_rating' => $maxRating,
                'max_garansi' => $maxGaransi,
                'min_order' => $minOrder,
            ];
        }

        return Inertia::render('Spk/Index', [
            'kategori_list' => $kategoriList,
            'pengadaan_list' => $pengadaanList,
            'selected_pengadaan' => $selectedPengadaan,
            'filters' => [
                'pengadaan_id' => $selectedPengadaanId,
                'max_harga' => $maxHarga,
                'max_hari_kirim' => $maxHariKirim,
                'kategori_id' => $kategoriId,
                'min_diskon' => $minDiskon,
                'syarat_pembayaran' => $syaratPembayaran,
                'compare_ids' => $compareIds,
            ],
            'all_suppliers' => $filteredSuppliers,
            'lolos_suppliers' => $lolosSuppliers,
            'gugur_suppliers' => $gugurSuppliers,
            'compared_suppliers' => $comparedSuppliers,
            'highlights' => $highlights,
        ]);
    }

    public function simpanKeputusan(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'pengadaan_id' => 'required|exists:pengadaan_buku,id',
            'supplier_terpilih_id' => 'required|exists:suppliers,id',
            'supplier_dibandingkan_ids' => 'required|array|min:1',
            'alasan_keputusan' => 'required|string|min:10',
            'nama_pengambil_keputusan' => 'required|string|max:150',
            'jabatan' => 'required|string|max:150',
        ]);

        $pengadaan = PengadaanBuku::findOrFail($validated['pengadaan_id']);

        // Update pengadaan
        $pengadaan->update([
            'status' => 'SELESAI',
            'selected_supplier_id' => $validated['supplier_terpilih_id'],
        ]);

        // Catat keputusan SPK
        KeputusanSpk::updateOrCreate(
            ['pengadaan_id' => $pengadaan->id],
            [
                'supplier_terpilih_id' => $validated['supplier_terpilih_id'],
                'supplier_dibandingkan_ids' => $validated['supplier_dibandingkan_ids'],
                'alasan_keputusan' => $validated['alasan_keputusan'],
                'nama_pengambil_keputusan' => $validated['nama_pengambil_keputusan'],
                'jabatan' => $validated['jabatan'],
                'tanggal_keputusan' => now()->toDateString(),
            ]
        );

        return redirect()->route('keputusan.show', $pengadaan->id)
            ->with('success', 'Keputusan pemilihan supplier berhasil disimpan dan Surat Keputusan/PO telah diterbitkan.');
    }
}
