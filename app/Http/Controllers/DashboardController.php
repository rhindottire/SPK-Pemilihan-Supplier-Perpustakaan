<?php

namespace App\Http\Controllers;

use App\Models\KategoriBuku;
use App\Models\PengadaanBuku;
use App\Models\Supplier;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalSuppliers = Supplier::where('is_active', true)->count();
        $totalKategori = KategoriBuku::count();
        $totalPengadaan = PengadaanBuku::count();
        $pengadaanSelesai = PengadaanBuku::where('status', 'SELESAI')->count();
        $pengadaanProses = PengadaanBuku::where('status', 'PROSES_SPK')->count();

        $avgHarga = (int) round(Supplier::where('is_active', true)->avg('rata_rata_harga') ?? 0);
        $avgWaktuKirim = round(Supplier::where('is_active', true)->avg('estimasi_hari_kirim') ?? 0, 1);
        $avgDiskon = round(Supplier::where('is_active', true)->avg('diskon_pengadaan_persen') ?? 0, 1);

        $suppliers = Supplier::with('kategori')
            ->where('is_active', true)
            ->orderBy('rating_keandalan', 'desc')
            ->get();

        $pengadaanTerbaru = PengadaanBuku::with(['kategori', 'selectedSupplier', 'keputusan'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $sebaranKota = Supplier::where('is_active', true)
            ->selectRaw('kota_asal, COUNT(*) as jumlah')
            ->groupBy('kota_asal')
            ->orderBy('jumlah', 'desc')
            ->get();

        $scatterData = $suppliers->map(function ($s) {
            return [
                'nama' => $s->nama_supplier,
                'kode' => $s->kode_supplier,
                'harga' => $s->rata_rata_harga,
                'hari' => $s->estimasi_hari_kirim,
                'diskon' => (float) $s->diskon_pengadaan_persen,
                'rating' => (float) $s->rating_keandalan,
            ];
        });

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_suppliers' => $totalSuppliers,
                'total_kategori' => $totalKategori,
                'total_pengadaan' => $totalPengadaan,
                'pengadaan_selesai' => $pengadaanSelesai,
                'pengadaan_proses' => $pengadaanProses,
                'avg_harga' => $avgHarga,
                'avg_waktu_kirim' => $avgWaktuKirim,
                'avg_diskon' => $avgDiskon,
            ],
            'suppliers' => $suppliers,
            'pengadaan_terbaru' => $pengadaanTerbaru,
            'sebaran_kota' => $sebaranKota,
            'scatter_data' => $scatterData,
        ]);
    }
}
