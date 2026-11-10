import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";

interface Kategori {
  id: number;
  kode: string;
  nama_kategori: string;
}

interface SupplierItem {
  id: number;
  kode_supplier: string;
  nama_supplier: string;
  kontak_person: string;
  telepon: string;
  email: string;
  kota_asal: string;
  alamat: string;
  rata_rata_harga: number;
  estimasi_hari_kirim: number;
  biaya_ongkir_per_kg: number;
  min_order_nominal: number;
  diskon_pengadaan_persen: number;
  garansi_retur_hari: number;
  kebijakan_garansi: string;
  syarat_pembayaran: string;
  rating_keandalan: number;
  reputasi_catatan: string;
  kategori: Kategori[];
}

interface Props {
  suppliers: SupplierItem[];
  kategori_list: Kategori[];
  filters: {
    search: string;
    sort: string;
    order: string;
  };
}

export default function SuppliersIndex({ suppliers, kategori_list, filters }: Props) {
  const [search, setSearch] = useState<string>(filters.search);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    kode_supplier: "",
    nama_supplier: "",
    kontak_person: "",
    telepon: "",
    email: "",
    kota_asal: "Yogyakarta",
    alamat: "",
    rata_rata_harga: 75000,
    estimasi_hari_kirim: 3,
    biaya_ongkir_per_kg: 10000,
    min_order_nominal: 1000000,
    diskon_pengadaan_persen: 20.0,
    garansi_retur_hari: 14,
    kebijakan_garansi: "100% Ganti Baru bila cacat fisik",
    syarat_pembayaran: "Tempo 30 Hari",
    rating_keandalan: 4.5,
    reputasi_catatan: "",
    kategori_ids: [] as number[],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get("/suppliers", { search }, { preserveState: true });
  };

  const openCreateModal = () => {
    setEditingSupplier(null);
    setFormData({
      kode_supplier: `SUP-00${suppliers.length + 1}`,
      nama_supplier: "",
      kontak_person: "",
      telepon: "",
      email: "",
      kota_asal: "Yogyakarta",
      alamat: "",
      rata_rata_harga: 80000,
      estimasi_hari_kirim: 3,
      biaya_ongkir_per_kg: 10000,
      min_order_nominal: 1000000,
      diskon_pengadaan_persen: 20.0,
      garansi_retur_hari: 14,
      kebijakan_garansi: "100% Ganti Baru untuk cacat fisik",
      syarat_pembayaran: "Tempo 30 Hari",
      rating_keandalan: 4.5,
      reputasi_catatan: "",
      kategori_ids: [1, 2],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: SupplierItem) => {
    setEditingSupplier(s);
    setFormData({
      kode_supplier: s.kode_supplier,
      nama_supplier: s.nama_supplier,
      kontak_person: s.kontak_person,
      telepon: s.telepon,
      email: s.email,
      kota_asal: s.kota_asal,
      alamat: s.alamat,
      rata_rata_harga: s.rata_rata_harga,
      estimasi_hari_kirim: s.estimasi_hari_kirim,
      biaya_ongkir_per_kg: s.biaya_ongkir_per_kg,
      min_order_nominal: s.min_order_nominal,
      diskon_pengadaan_persen: s.diskon_pengadaan_persen,
      garansi_retur_hari: s.garansi_retur_hari,
      kebijakan_garansi: s.kebijakan_garansi,
      syarat_pembayaran: s.syarat_pembayaran,
      rating_keandalan: s.rating_keandalan,
      reputasi_catatan: s.reputasi_catatan || "",
      kategori_ids: s.kategori.map((k) => k.id),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      router.put(`/suppliers/${editingSupplier.id}`, formData, {
        onSuccess: () => setIsModalOpen(false),
      });
    } else {
      router.post("/suppliers", formData, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleDelete = (id: number, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data supplier ${nama}?`)) {
      router.delete(`/suppliers/${id}`);
    }
  };

  return (
    <AppLayout title="Data Master Supplier Buku">
      <Head title="Data Master Rekanan Supplier - SIP Perpustakaan" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            Master Rekanan Supplier Buku
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Database profil, kapabilitas katalog, biaya, dan SLA pengiriman rekanan penerbit/distributor.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <span>+ Daftarkan Rekanan Baru</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm mb-6 text-xs">
        <form onSubmit={handleSearch} className="flex items-center space-x-2 flex-1 max-w-md">
          <input
            type="text"
            placeholder="Cari nama penerbit, kode, atau kota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold"
          >
            Cari
          </button>
        </form>

        <div className="text-zinc-500 text-[11px] font-mono">
          Total: <strong className="text-zinc-900 dark:text-white">{suppliers.length}</strong> Supplier Terdaftar
        </div>
      </div>

      {/* Tabel Master Supplier */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Supplier & Kota</th>
                <th className="px-4 py-3">Kontak & Telepon</th>
                <th className="px-4 py-3">Rata-rata Harga</th>
                <th className="px-4 py-3">Waktu Kirim</th>
                <th className="px-4 py-3">Diskon</th>
                <th className="px-4 py-3">Garansi Retur</th>
                <th className="px-4 py-3">Syarat Bayar</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-medium">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold text-zinc-900 dark:text-white">{s.nama_supplier}</div>
                    <div className="text-[10px] font-mono text-zinc-400">{s.kode_supplier} • {s.kota_asal}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                    <div>{s.kontak_person}</div>
                    <div className="text-[10px] font-mono text-zinc-400">{s.telepon}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                    Rp {s.rata_rata_harga.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold text-[11px]">
                      {s.estimasi_hari_kirim} Hari
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">
                    {s.diskon_pengadaan_persen}%
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {s.garansi_retur_hari} Hari
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                    {s.syarat_pembayaran}
                  </td>
                  <td className="px-4 py-3 text-amber-500 font-bold">
                    ★ {s.rating_keandalan}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(s)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                    >
                      Edit
                    </button>
                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(s.id, s.nama_supplier)}
                      className="text-rose-600 dark:text-rose-400 hover:underline font-bold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT SUPPLIER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-base font-black text-zinc-900 dark:text-white">
                {editingSupplier ? "Perbarui Data Rekanan" : "Daftarkan Rekanan Penerbit / Distributor Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kode Supplier:</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingSupplier}
                    value={formData.kode_supplier}
                    onChange={(e) => setFormData({ ...formData, kode_supplier: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Nama Perusahaan / Penerbit:</label>
                  <input
                    type="text"
                    required
                    value={formData.nama_supplier}
                    onChange={(e) => setFormData({ ...formData, nama_supplier: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kontak Person:</label>
                  <input
                    type="text"
                    required
                    value={formData.kontak_person}
                    onChange={(e) => setFormData({ ...formData, kontak_person: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">No. Telepon / WA:</label>
                  <input
                    type="text"
                    required
                    value={formData.telepon}
                    onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email:</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kota Asal:</label>
                  <input
                    type="text"
                    required
                    value={formData.kota_asal}
                    onChange={(e) => setFormData({ ...formData, kota_asal: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Alamat Lengkap:</label>
                  <input
                    type="text"
                    required
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Parameter Penilaian SPK */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-3">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px] uppercase">
                  Parameter Metrik SPK (Harga, Waktu, Diskon, Termin)
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Rata-rata Harga Satuan (Rp):</label>
                    <input
                      type="number"
                      required
                      value={formData.rata_rata_harga}
                      onChange={(e) => setFormData({ ...formData, rata_rata_harga: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Estimasi Waktu Kirim (Hari):</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={30}
                      value={formData.estimasi_hari_kirim}
                      onChange={(e) => setFormData({ ...formData, estimasi_hari_kirim: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Diskon Pengadaan (%):</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formData.diskon_pengadaan_persen}
                      onChange={(e) => setFormData({ ...formData, diskon_pengadaan_persen: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Syarat Pembayaran:</label>
                    <input
                      type="text"
                      required
                      value={formData.syarat_pembayaran}
                      onChange={(e) => setFormData({ ...formData, syarat_pembayaran: e.target.value })}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Garansi Retur (Hari):</label>
                    <input
                      type="number"
                      required
                      value={formData.garansi_retur_hari}
                      onChange={(e) => setFormData({ ...formData, garansi_retur_hari: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Rating Keandalan (1-5):</label>
                    <input
                      type="number"
                      step="0.1"
                      min={1}
                      max={5}
                      required
                      value={formData.rating_keandalan}
                      onChange={(e) => setFormData({ ...formData, rating_keandalan: Number(e.target.value) })}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Kebijakan Garansi & Rekam Jejak:</label>
                <input
                  type="text"
                  required
                  value={formData.kebijakan_garansi}
                  onChange={(e) => setFormData({ ...formData, kebijakan_garansi: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
                >
                  Simpan Data Rekanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
