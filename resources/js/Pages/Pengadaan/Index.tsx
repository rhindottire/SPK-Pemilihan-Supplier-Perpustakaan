import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";

interface Kategori {
  id: number;
  kode: string;
  nama_kategori: string;
}

interface PengadaanItem {
  id: number;
  nomor_pengadaan: string;
  judul_pengadaan: string;
  kategori_id: number;
  estimasi_jumlah_eksemplar: number;
  maksimal_harga_satuan: number;
  maksimal_hari_kirim: number;
  total_anggaran_pagu: number;
  status: string;
  selected_supplier_id?: number;
  selected_supplier?: {
    id: number;
    nama_supplier: string;
    kode_supplier: string;
    kota_asal: string;
  };
  catatan_kebutuhan?: string;
  created_at: string;
}

interface Props {
  pengadaan_list: PengadaanItem[];
  kategori_list: Kategori[];
}

export default function PengadaanIndex({ pengadaan_list, kategori_list }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomor_pengadaan: `PENG-2026-00${pengadaan_list.length + 1}`,
    judul_pengadaan: "",
    kategori_id: kategori_list[0]?.id || 1,
    estimasi_jumlah_eksemplar: 100,
    maksimal_harga_satuan: 85000,
    maksimal_hari_kirim: 4,
    total_anggaran_pagu: 8500000,
    catatan_kebutuhan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/pengadaan", formData, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  return (
    <AppLayout title="Paket Pengadaan Buku Perpustakaan">
      <Head title="Paket Pengadaan Buku - SIP Perpustakaan" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            Paket Pengadaan Koleksi Perpustakaan
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Daftar pengajuan pengadaan buku perpustakaan yang membutuhkan evaluasi batas harga & waktu kirim SPK.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <span>+ Buat Paket Pengadaan Baru</span>
        </button>
      </div>

      {/* Grid Paket Pengadaan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pengadaan_list.map((p) => {
          const isSelesai = p.status === "SELESAI";
          const kategoriName = kategori_list.find((k) => k.id === p.kategori_id)?.nama_kategori || "Umum";

          return (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-zinc-400 font-semibold">{p.nomor_pengadaan}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelesai
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 animate-pulse"
                    }`}
                  >
                    {isSelesai ? "SELESAI (PO Diterbitkan)" : "PROSES SPK"}
                  </span>
                </div>

                <h3 className="font-bold text-zinc-900 dark:text-white text-sm line-clamp-2 mb-2">
                  {p.judul_pengadaan}
                </h3>
                <span className="inline-block px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                  Kategori: {kategoriName}
                </span>

                <div className="space-y-1.5 py-3 border-t border-b border-zinc-100 dark:border-zinc-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Pagu Anggaran:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      Rp {p.total_anggaran_pagu.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Batas Harga Satuan:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      ≤ Rp {p.maksimal_harga_satuan.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Batas Waktu Kirim:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      ≤ {p.maksimal_hari_kirim} Hari Kerja
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Kebutuhan:</span>
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {p.estimasi_jumlah_eksemplar} Eksemplar
                    </span>
                  </div>
                </div>

                {isSelesai && p.selected_supplier && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 text-xs">
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block font-semibold">
                      Supplier Pemenang Terpilih:
                    </span>
                    <strong className="text-zinc-900 dark:text-white">{p.selected_supplier.nama_supplier}</strong>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                {isSelesai ? (
                  <Link
                    href={`/keputusan/${p.id}`}
                    className="w-full text-center py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold transition-colors"
                  >
                    Buka Berita Acara & PO →
                  </Link>
                ) : (
                  <Link
                    href={`/spk?pengadaan_id=${p.id}&max_harga=${p.maksimal_harga_satuan}&max_hari_kirim=${p.maksimal_hari_kirim}&kategori_id=${p.kategori_id}`}
                    className="w-full text-center py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-600/20"
                  >
                    Buka di SPK Pembanding →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL BUAT PAKET PENGADAAN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800">
              <h3 className="text-base font-black text-zinc-900 dark:text-white">
                Buat Paket Pengadaan Buku Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1">Nomor Pengadaan:</label>
                <input
                  type="text"
                  required
                  value={formData.nomor_pengadaan}
                  onChange={(e) => setFormData({ ...formData, nomor_pengadaan: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Judul Paket Pengadaan:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pengadaan Koleksi Buku Referensi Rekayasa Perangkat Lunak 2026"
                  value={formData.judul_pengadaan}
                  onChange={(e) => setFormData({ ...formData, judul_pengadaan: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Kategori Koleksi Utama:</label>
                <select
                  value={formData.kategori_id}
                  onChange={(e) => setFormData({ ...formData, kategori_id: Number(e.target.value) })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                >
                  {kategori_list.map((k) => (
                    <option key={k.id} value={k.id}>
                      [{k.kode}] {k.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Batas Harga Satuan (Rp):</label>
                  <input
                    type="number"
                    required
                    value={formData.maksimal_harga_satuan}
                    onChange={(e) => {
                      const h = Number(e.target.value);
                      setFormData({
                        ...formData,
                        maksimal_harga_satuan: h,
                        total_anggaran_pagu: h * formData.estimasi_jumlah_eksemplar,
                      });
                    }}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Batas Waktu Kirim (Hari):</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={30}
                    value={formData.maksimal_hari_kirim}
                    onChange={(e) => setFormData({ ...formData, maksimal_hari_kirim: Number(e.target.value) })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Estimasi Eksemplar:</label>
                  <input
                    type="number"
                    required
                    value={formData.estimasi_jumlah_eksemplar}
                    onChange={(e) => {
                      const jml = Number(e.target.value);
                      setFormData({
                        ...formData,
                        estimasi_jumlah_eksemplar: jml,
                        total_anggaran_pagu: jml * formData.maksimal_harga_satuan,
                      });
                    }}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Total Pagu Anggaran (Rp):</label>
                  <input
                    type="number"
                    required
                    value={formData.total_anggaran_pagu}
                    onChange={(e) => setFormData({ ...formData, total_anggaran_pagu: Number(e.target.value) })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
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
                  Simpan & Lanjutkan ke SPK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
