<?php

namespace App\Http\Controllers;

use App\Models\KategoriBuku;
use App\Models\Supplier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search', '');
        $sortBy = $request->query('sort', 'nama_supplier');
        $order = $request->query('order', 'asc');

        $query = Supplier::with('kategori')->where('is_active', true);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama_supplier', 'like', "%{$search}%")
                    ->orWhere('kode_supplier', 'like', "%{$search}%")
                    ->orWhere('kota_asal', 'like', "%{$search}%")
                    ->orWhere('kontak_person', 'like', "%{$search}%");
            });
        }

        if (in_array($sortBy, ['nama_supplier', 'rata_rata_harga', 'estimasi_hari_kirim', 'diskon_pengadaan_persen', 'rating_keandalan'])) {
            $query->orderBy($sortBy, $order === 'desc' ? 'desc' : 'asc');
        } else {
            $query->orderBy('nama_supplier', 'asc');
        }

        $suppliers = $query->get();
        $kategoriList = KategoriBuku::all();

        return Inertia::render('Suppliers/Index', [
            'suppliers' => $suppliers,
            'kategori_list' => $kategoriList,
            'filters' => [
                'search' => $search,
                'sort' => $sortBy,
                'order' => $order,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'kode_supplier' => 'required|string|max:20|unique:suppliers,kode_supplier',
            'nama_supplier' => 'required|string|max:150',
            'kontak_person' => 'required|string|max:100',
            'telepon' => 'required|string|max:30',
            'email' => 'required|email|max:100',
            'kota_asal' => 'required|string|max:100',
            'alamat' => 'required|string',
            'rata_rata_harga' => 'required|integer|min:1000',
            'estimasi_hari_kirim' => 'required|integer|min:1|max:30',
            'biaya_ongkir_per_kg' => 'required|integer|min:0',
            'min_order_nominal' => 'required|integer|min:0',
            'diskon_pengadaan_persen' => 'required|numeric|min:0|max:100',
            'garansi_retur_hari' => 'required|integer|min:0|max:90',
            'kebijakan_garansi' => 'required|string|max:255',
            'syarat_pembayaran' => 'required|string|max:100',
            'rating_keandalan' => 'required|numeric|min:1|max:5',
            'reputasi_catatan' => 'nullable|string',
            'kategori_ids' => 'nullable|array',
            'kategori_ids.*' => 'exists:kategori_buku,id',
        ]);

        $supplier = Supplier::create($validated);

        if (! empty($validated['kategori_ids'])) {
            $attachData = [];
            foreach ($validated['kategori_ids'] as $kId) {
                $attachData[$kId] = ['jumlah_judul_katalog' => 100];
            }
            $supplier->kategori()->attach($attachData);
        }

        return redirect()->route('suppliers.index')
            ->with('success', "Supplier {$supplier->nama_supplier} berhasil didaftarkan.");
    }

    public function update(Request $request, Supplier $supplier): RedirectResponse
    {
        $validated = $request->validate([
            'nama_supplier' => 'required|string|max:150',
            'kontak_person' => 'required|string|max:100',
            'telepon' => 'required|string|max:30',
            'email' => 'required|email|max:100',
            'kota_asal' => 'required|string|max:100',
            'alamat' => 'required|string',
            'rata_rata_harga' => 'required|integer|min:1000',
            'estimasi_hari_kirim' => 'required|integer|min:1|max:30',
            'biaya_ongkir_per_kg' => 'required|integer|min:0',
            'min_order_nominal' => 'required|integer|min:0',
            'diskon_pengadaan_persen' => 'required|numeric|min:0|max:100',
            'garansi_retur_hari' => 'required|integer|min:0|max:90',
            'kebijakan_garansi' => 'required|string|max:255',
            'syarat_pembayaran' => 'required|string|max:100',
            'rating_keandalan' => 'required|numeric|min:1|max:5',
            'reputasi_catatan' => 'nullable|string',
            'kategori_ids' => 'nullable|array',
            'kategori_ids.*' => 'exists:kategori_buku,id',
        ]);

        $supplier->update($validated);

        if (isset($validated['kategori_ids'])) {
            $attachData = [];
            foreach ($validated['kategori_ids'] as $kId) {
                $attachData[$kId] = ['jumlah_judul_katalog' => 120];
            }
            $supplier->kategori()->sync($attachData);
        }

        return redirect()->route('suppliers.index')
            ->with('success', "Data supplier {$supplier->nama_supplier} berhasil diperbarui.");
    }

    public function destroy(Supplier $supplier): RedirectResponse
    {
        $nama = $supplier->nama_supplier;
        $supplier->delete();

        return redirect()->route('suppliers.index')
            ->with('success', "Supplier {$nama} berhasil dihapus dari sistem.");
    }
}
