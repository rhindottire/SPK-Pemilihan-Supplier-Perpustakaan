<?php

namespace App\Http\Controllers;

use App\Models\KategoriBuku;
use App\Models\KeputusanSpk;
use App\Models\PengadaanBuku;
use App\Models\Supplier;
use Inertia\Inertia;
use Inertia\Response;

class KeputusanController extends Controller
{
    public function index(): Response
    {
        $keputusan = KeputusanSpk::with(['pengadaan.kategori', 'supplierTerpilih'])
            ->orderBy('tanggal_keputusan', 'desc')
            ->get()
            ->map(function (KeputusanSpk $k) {
                $comparedSuppliers = Supplier::whereIn('id', $k->supplier_dibandingkan_ids ?? [])->get();
                /** @var PengadaanBuku $pengadaan */
                $pengadaan = $k->pengadaan;
                /** @var Supplier $supplierTerpilih */
                $supplierTerpilih = $k->supplierTerpilih;
                /** @var KategoriBuku $kategori */
                $kategori = $pengadaan->kategori;

                return [
                    'id' => $k->id,
                    'pengadaan_id' => $k->pengadaan_id,
                    'nomor_pengadaan' => $pengadaan->nomor_pengadaan,
                    'judul_pengadaan' => $pengadaan->judul_pengadaan,
                    'kategori' => $kategori->nama_kategori,
                    'supplier_terpilih' => [
                        'id' => $supplierTerpilih->id,
                        'nama' => $supplierTerpilih->nama_supplier,
                        'kota' => $supplierTerpilih->kota_asal,
                        'harga' => $supplierTerpilih->rata_rata_harga,
                        'hari' => $supplierTerpilih->estimasi_hari_kirim,
                        'diskon' => (float) $supplierTerpilih->diskon_pengadaan_persen,
                        'rating' => (float) $supplierTerpilih->rating_keandalan,
                    ],
                    'compared_count' => count($k->supplier_dibandingkan_ids ?? []),
                    'compared_suppliers' => $comparedSuppliers->map(fn (Supplier $s) => $s->nama_supplier)->all(),
                    'alasan_keputusan' => $k->alasan_keputusan,
                    'nama_pengambil_keputusan' => $k->nama_pengambil_keputusan,
                    'jabatan' => $k->jabatan,
                    'tanggal_keputusan' => $k->tanggal_keputusan->format('Y-m-d'),
                ];
            });

        return Inertia::render('Keputusan/Index', [
            'keputusan_list' => $keputusan,
        ]);
    }

    public function show(int $id): Response
    {
        $pengadaan = PengadaanBuku::with(['kategori', 'selectedSupplier', 'keputusan.supplierTerpilih'])
            ->findOrFail($id);

        $keputusan = $pengadaan->keputusan;

        $comparedSuppliers = [];
        if ($keputusan && ! empty($keputusan->supplier_dibandingkan_ids)) {
            $comparedSuppliers = Supplier::whereIn('id', $keputusan->supplier_dibandingkan_ids)->get();
        }

        return Inertia::render('Keputusan/Show', [
            'pengadaan' => $pengadaan,
            'keputusan' => $keputusan,
            'compared_suppliers' => $comparedSuppliers,
        ]);
    }
}
