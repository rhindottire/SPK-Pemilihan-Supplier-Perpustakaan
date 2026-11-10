<?php

namespace App\Http\Controllers;

use App\Models\KategoriBuku;
use App\Models\PengadaanBuku;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PengadaanController extends Controller
{
    public function index(): Response
    {
        $pengadaan = PengadaanBuku::with(['kategori', 'selectedSupplier', 'keputusan'])
            ->orderBy('created_at', 'desc')
            ->get();

        $kategoriList = KategoriBuku::all();

        return Inertia::render('Pengadaan/Index', [
            'pengadaan_list' => $pengadaan,
            'kategori_list' => $kategoriList,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nomor_pengadaan' => 'required|string|max:30|unique:pengadaan_buku,nomor_pengadaan',
            'judul_pengadaan' => 'required|string|max:200',
            'kategori_id' => 'required|exists:kategori_buku,id',
            'estimasi_jumlah_eksemplar' => 'required|integer|min:1',
            'maksimal_harga_satuan' => 'required|integer|min:1000',
            'maksimal_hari_kirim' => 'required|integer|min:1|max:30',
            'total_anggaran_pagu' => 'required|integer|min:1000',
            'catatan_kebutuhan' => 'nullable|string',
        ]);

        $validated['status'] = 'PROSES_SPK';

        $pengadaan = PengadaanBuku::create($validated);

        return redirect()->route('spk.index', [
            'pengadaan_id' => $pengadaan->id,
            'max_harga' => $pengadaan->maksimal_harga_satuan,
            'max_hari_kirim' => $pengadaan->maksimal_hari_kirim,
            'kategori_id' => $pengadaan->kategori_id,
        ])->with('success', "Paket pengadaan {$pengadaan->nomor_pengadaan} berhasil dibuat. Silakan lakukan filter dinamis dan komparasi supplier.");
    }
}
