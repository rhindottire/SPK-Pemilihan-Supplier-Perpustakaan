import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";

interface Kategori {
  id: number;
  kode: string;
  nama_kategori: string;
}

interface Pengadaan {
  id: number;
  nomor_pengadaan: string;
  judul_pengadaan: string;
  maksimal_harga_satuan: number;
  maksimal_hari_kirim: number;
  total_anggaran_pagu: number;
  estimasi_jumlah_eksemplar: number;
  kategori_id: number;
  kategori: { nama_kategori: string };
}

interface SupplierLolos {
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
  kategori: Array<{ id: number; nama: string; judul: number }>;
  is_lolos: boolean;
  alasan_gugur: string[];
}

interface Highlights {
  min_harga: number;
  min_hari: number;
  max_diskon: number;
  max_rating: number;
  max_garansi: number;
  min_order: number;
}

interface Props {
  kategori_list: Kategori[];
  pengadaan_list: Pengadaan[];
  selected_pengadaan: Pengadaan | null;
  filters: {
    pengadaan_id: string | null;
    max_harga: number;
    max_hari_kirim: number;
    kategori_id: string;
    min_diskon: number;
    syarat_pembayaran: string;
    compare_ids: number[];
  };
  all_suppliers: SupplierLolos[];
  lolos_suppliers: SupplierLolos[];
  gugur_suppliers: SupplierLolos[];
  compared_suppliers: SupplierLolos[];
  highlights: Highlights | null;
}

export default function SpkIndex({
  kategori_list,
  pengadaan_list,
  selected_pengadaan,
  filters,
  lolos_suppliers,
  gugur_suppliers,
  compared_suppliers,
  highlights,
}: Props) {
  // Local state for dynamic filter inputs
  const [maxHarga, setMaxHarga] = useState<number>(filters.max_harga);
  const [maxHari, setMaxHari] = useState<number>(filters.max_hari_kirim);
  const [kategoriId, setKategoriId] = useState<string>(filters.kategori_id);
  const [minDiskon, setMinDiskon] = useState<number>(filters.min_diskon);
  const [syaratPembayaran, setSyaratPembayaran] = useState<string>(filters.syarat_pembayaran);
  const [selectedPengadaanId, setSelectedPengadaanId] = useState<string>(filters.pengadaan_id || "");
  const [selectedCompareIds, setSelectedCompareIds] = useState<number[]>(filters.compare_ids);
  const [showGugur, setShowGugur] = useState<boolean>(false);

  // Modal State for Decision Confirmation
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [decisionSupplier, setDecisionSupplier] = useState<SupplierLolos | null>(null);
  const [pengadaanTargetId, setPengadaanTargetId] = useState<string>(filters.pengadaan_id || (pengadaan_list[0]?.id ? String(pengadaan_list[0].id) : ""));
  const [namaPengambil, setNamaPengambil] = useState<string>("Achmad Ali Ridho, S.Kom., M.T.");
  const [jabatanPengambil, setJabatanPengambil] = useState<string>("Kepala Bidang Pengadaan & Akuisisi Perpustakaan");
  const [alasanKeputusan, setAlasanKeputusan] = useState<string>("");

  // Function to apply filters
  const applyFilters = (newCompareIds?: number[]) => {
    const ids = newCompareIds !== undefined ? newCompareIds : selectedCompareIds;
    router.get(
      "/spk",
      {
        pengadaan_id: selectedPengadaanId || undefined,
        max_harga: maxHarga,
        max_hari_kirim: maxHari,
        kategori_id: kategoriId,
        min_diskon: minDiskon,
        syarat_pembayaran: syaratPembayaran,
        compare_ids: ids.join(","),
      },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handlePengadaanChange = (pId: string) => {
    setSelectedPengadaanId(pId);
    if (!pId) {
      return;
    }
    const found = pengadaan_list.find((p) => String(p.id) === pId);
    if (found) {
      setMaxHarga(found.maksimal_harga_satuan);
      setMaxHari(found.maksimal_hari_kirim);
      setKategoriId(String(found.kategori_id));
      router.get(
        "/spk",
        {
          pengadaan_id: found.id,
          max_harga: found.maksimal_harga_satuan,
          max_hari_kirim: found.maksimal_hari_kirim,
          kategori_id: found.kategori_id,
        },
        { preserveState: true, preserveScroll: true }
      );
    }
  };

  const toggleCompare = (id: number) => {
    let next: number[];
    if (selectedCompareIds.includes(id)) {
      next = selectedCompareIds.filter((item) => item !== id);
    } else {
      if (selectedCompareIds.length >= 4) {
        alert("Maksimal 4 supplier yang dapat dibandingkan berdampingan sekaligus.");
        return;
      }
      next = [...selectedCompareIds, id];
    }
    setSelectedCompareIds(next);
    applyFilters(next);
  };

  const openDecisionModal = (supplier: SupplierLolos) => {
    setDecisionSupplier(supplier);
    setAlasanKeputusan(
      `Memilih ${supplier.nama_supplier} karena memenuhi seluruh batas kriteria pengadaan: harga rata-rata Rp ${supplier.rata_rata_harga.toLocaleString("id-ID")} (di bawah batas pagu), estimasi waktu kirim ${supplier.estimasi_hari_kirim} hari, diskon ${supplier.diskon_pengadaan_persen}%, serta garansi ${supplier.garansi_retur_hari} hari dengan skema pembayaran ${supplier.syarat_pembayaran}.`
    );
    setIsModalOpen(true);
  };

  const submitDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decisionSupplier || !pengadaanTargetId) {
      alert("Pilih paket pengadaan dan supplier yang ditunjuk.");
      return;
    }

    router.post(
      "/spk/simpan-keputusan",
      {
        pengadaan_id: pengadaanTargetId,
        supplier_terpilih_id: decisionSupplier.id,
        supplier_dibandingkan_ids: compared_suppliers.map((s) => s.id),
        alasan_keputusan: alasanKeputusan,
        nama_pengambil_keputusan: namaPengambil,
        jabatan: jabatanPengambil,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <AppLayout title="SPK Pemilihan Supplier - Filter Dinamis & Pembanding">
      <Head title="SPK Pemilihan Supplier - Filter Dinamis & Pembanding" />

      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold uppercase mb-1">
              <span>Modul Inti Quiz 2 • SI Perpustakaan</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              SPK Pemilihan Supplier Koleksi Perpustakaan
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Pendekatan SPK: <strong>Filter Dinamis</strong> batas harga dan waktu kirim, lalu{" "}
              <strong>Komparasi Berdampingan (*Side-by-side*)</strong>. Tanpa manipulasi skor komposit.
            </p>
          </div>

          {/* Pengadaan Context Selector */}
          <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800/80 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs">
            <span className="font-semibold px-2 text-zinc-600 dark:text-zinc-300">Target Paket:</span>
            <select
              value={selectedPengadaanId}
              onChange={(e) => handlePengadaanChange(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2.5 py-1 text-xs font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">-- Simulasi Mandiri (Custom) --</option>
              {pengadaan_list.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nomor_pengadaan} (≤ Rp {p.maksimal_harga_satuan.toLocaleString("id-ID")}, ≤ {p.maksimal_hari_kirim} hr)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Filter Panel (Left) & Filter Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* PANEL FILTER DINAMIS */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                Filter Dinamis Kriteria
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setMaxHarga(90000);
                setMaxHari(4);
                setKategoriId("all");
                setMinDiskon(0);
                setSyaratPembayaran("all");
                router.get("/spk", {}, { preserveState: true, preserveScroll: true });
              }}
              className="text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Reset Filter
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyFilters();
            }}
            className="space-y-4 text-xs"
          >
            {/* Filter 1: Batas Harga Maksimal */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Batas Harga Satuan Maksimal:
                </label>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded text-xs">
                  Rp {maxHarga.toLocaleString("id-ID")}
                </span>
              </div>
              <input
                type="range"
                min="65000"
                max="120000"
                step="1000"
                value={maxHarga}
                onChange={(e) => setMaxHarga(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>Rp 65.000 (Min)</span>
                <span>Rp 120.000 (Maks)</span>
              </div>
            </div>

            {/* Filter 2: Batas Waktu Kirim Maksimal */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Batas Waktu Kirim Maksimal:
                </label>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded text-xs">
                  ≤ {maxHari} Hari Kerja
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={maxHari}
                onChange={(e) => setMaxHari(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>2 Hari (Ekspres)</span>
                <span>8 Hari (Standar)</span>
              </div>
            </div>

            {/* Filter 3: Kategori Buku */}
            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Kategori Koleksi Buku yang Dibutuhkan:
              </label>
              <select
                value={kategoriId}
                onChange={(e) => setKategoriId(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="all">Semua Kategori (Tampilkan Seluruh Rekanan)</option>
                {kategori_list.map((k) => (
                  <option key={k.id} value={k.id}>
                    [{k.kode}] {k.nama_kategori}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 4 & 5: Minimal Diskon & Syarat Pembayaran */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Min. Diskon:
                </label>
                <select
                  value={minDiskon}
                  onChange={(e) => setMinDiskon(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100"
                >
                  <option value={0}>Semua (0%)</option>
                  <option value={15}>≥ 15%</option>
                  <option value={20}>≥ 20%</option>
                  <option value={25}>≥ 25%</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Syarat Bayar:
                </label>
                <select
                  value={syaratPembayaran}
                  onChange={(e) => setSyaratPembayaran(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100"
                >
                  <option value="all">Semua Opsi</option>
                  <option value="tempo">Harus Ada Tempo</option>
                  <option value="cod">COD</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Terapkan Filter Dinamis</span>
            </button>
          </form>
        </div>

        {/* HASIL FILTER DINAMIS & SELEKSI PEMBANDING */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Supplier Memenuhi Batas Kriteria ({lolos_suppliers.length})
                </h2>
              </div>
              <span className="text-[11px] text-zinc-400">
                Pilih 2–4 untuk dibandingkan berdampingan
              </span>
            </div>

            {lolos_suppliers.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200">
                <p className="font-semibold mb-1">Tidak ada supplier yang lolos batas kriteria yang ketat.</p>
                <p className="text-[11px] text-amber-700 dark:text-amber-300">
                  Coba naikkan batas harga maksimal atau longgarkan estimasi hari kirim di panel filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lolos_suppliers.map((s) => {
                  const isChecked = selectedCompareIds.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleCompare(s.id)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between select-none ${
                        isChecked
                          ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-600/30"
                          : "border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-400 bg-zinc-50/50 dark:bg-zinc-800/40"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-mono text-[10px] text-zinc-400 font-semibold">{s.kode_supplier}</span>
                          <div className="font-bold text-zinc-900 dark:text-white text-xs">{s.nama_supplier}</div>
                          <div className="text-[11px] text-zinc-500">{s.kota_asal}</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 py-2 my-1 border-t border-b border-zinc-200/50 dark:border-zinc-700/50 text-[11px]">
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase">Harga Rata-rata</span>
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">
                            Rp {s.rata_rata_harga.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase">Waktu Kirim</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {s.estimasi_hari_kirim} Hari
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase">Diskon Buku</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {s.diskon_pengadaan_persen}%
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase">Syarat Bayar</span>
                          <span className="font-medium text-zinc-700 dark:text-zinc-300 truncate block">
                            {s.syarat_pembayaran}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-amber-500 font-semibold">★ {s.rating_keandalan}</span>
                        <span
                          className={`text-[10px] font-bold ${
                            isChecked ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"
                          }`}
                        >
                          {isChecked ? "✓ Terpilih di Pembanding" : "+ Klik untuk Bandingkan"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Supplier yang Gugur / Melebihi Batas Kriteria */}
          {gugur_suppliers.length > 0 && (
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs">
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setShowGugur(!showGugur)}
              >
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {gugur_suppliers.length} Supplier Melebihi Batas / Tidak Lolos Kriteria
                  </span>
                </div>
                <span className="text-zinc-400 hover:text-zinc-600 text-[11px]">
                  {showGugur ? "Sembunyikan ▲" : "Tampilkan Rincian ▼"}
                </span>
              </div>

              {showGugur && (
                <div className="mt-3 space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-700/60">
                  {gugur_suppliers.map((g) => (
                    <div
                      key={g.id}
                      className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                    >
                      <div>
                        <strong className="text-zinc-900 dark:text-zinc-100">{g.nama_supplier}</strong>{" "}
                        <span className="text-zinc-400 font-mono">({g.kota_asal})</span>
                      </div>
                      <div className="text-rose-600 dark:text-rose-400 font-medium">
                        {g.alasan_gugur.join(" • ")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MATRIKS KOMPARASI BERDAMPINGAN (SIDE-BY-SIDE COMPARISON) */}
      <section className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h2 className="text-base font-extrabold text-zinc-900 dark:text-white">
                Matriks Pembanding Berdampingan (*Side-by-Side Comparison*)
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Menampilkan {compared_suppliers.length} supplier rekanan secara berdampingan tanpa agregasi skor buatan.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
              {compared_suppliers.length} Supplier Dibandingkan
            </span>
          </div>
        </div>

        {/* Banner Prinsip SPK Non-Skoring (Sesuai Soal Quiz) */}
        <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 mb-6 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-3">
          <div className="text-lg">⚖️</div>
          <div>
            <strong className="font-bold">Prinsip SPK Berbasis Komparasi Faktual (Tanpa Skor Akhir):</strong>
            <p className="mt-0.5 text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed">
              Sesuai ketentuan penugasan Quiz 2, sistem tidak memaksakan skor agregat tunggal. Pengambil keputusan
              membandingkan trade-off langsung parameter kunci (misal: apakah memilih waktu kirim 2 hari dengan harga
              sedikit lebih tinggi vs waktu kirim 4 hari dengan diskon maksimal). Indikator warna menyoroti nilai
              terbaik pada masing-masing parameter.
            </p>
          </div>
        </div>

        {compared_suppliers.length < 2 ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-dashed border-zinc-300 dark:border-zinc-700">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Pilih Minimal 2 Supplier untuk Memulai Komparasi
            </h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 mb-4">
              Centang checkbox supplier pada daftar yang lolos kriteria di atas untuk membandingkan parameter mereka
              berdampingan secara langsung.
            </p>
            {lolos_suppliers.length >= 2 && (
              <button
                type="button"
                onClick={() => {
                  const defaultTwo = lolos_suppliers.slice(0, 2).map((s) => s.id);
                  setSelectedCompareIds(defaultTwo);
                  applyFilters(defaultTwo);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md hover:bg-indigo-700 transition-colors"
              >
                Bandingkan 2 Supplier Teratas Otomatis
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="p-3 text-left w-48 bg-zinc-50 dark:bg-zinc-800/60 font-bold text-zinc-600 dark:text-zinc-400 uppercase text-[10px] tracking-wider">
                    Parameter Evaluasi
                  </th>
                  {compared_suppliers.map((s) => (
                    <th
                      key={s.id}
                      className="p-4 text-center min-w-[220px] bg-white dark:bg-zinc-900 border-l border-zinc-100 dark:border-zinc-800"
                    >
                      <span className="font-mono text-[10px] text-zinc-400 font-semibold">{s.kode_supplier}</span>
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white mt-0.5">{s.nama_supplier}</h4>
                      <p className="text-[11px] text-zinc-500">{s.kota_asal}</p>
                      <button
                        type="button"
                        onClick={() => openDecisionModal(s)}
                        className="mt-3 w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        Pilih Supplier Ini ✓
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {/* 1. Rata-rata Harga Satuan */}
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30">
                    Rata-rata Harga Satuan Buku
                  </td>
                  {compared_suppliers.map((s) => {
                    const isBest = highlights && s.rata_rata_harga === highlights.min_harga;
                    return (
                      <td
                        key={s.id}
                        className={`p-3 text-center border-l border-zinc-100 dark:border-zinc-800 ${
                          isBest ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""
                        }`}
                      >
                        <div className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                          Rp {s.rata_rata_harga.toLocaleString("id-ID")}
                        </div>
                        {isBest && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            ★ Termurah
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 2. Estimasi Waktu Pengiriman */}
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30">
                    Estimasi Waktu Pengiriman
                  </td>
                  {compared_suppliers.map((s) => {
                    const isBest = highlights && s.estimasi_hari_kirim === highlights.min_hari;
                    return (
                      <td
                        key={s.id}
                        className={`p-3 text-center border-l border-zinc-100 dark:border-zinc-800 ${
                          isBest ? "bg-blue-50/40 dark:bg-blue-950/20" : ""
                        }`}
                      >
                        <div className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                          {s.estimasi_hari_kirim} Hari Kerja
                        </div>
                        {isBest && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            ⚡ Tercepat
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 3. Diskon Pengadaan */}
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30">
                    Diskon Pengadaan Institusi
                  </td>
                  {compared_suppliers.map((s) => {
                    const isBest = highlights && s.diskon_pengadaan_persen === highlights.max_diskon;
                    return (
                      <td
                        key={s.id}
                        className={`p-3 text-center border-l border-zinc-100 dark:border-zinc-800 ${
                          isBest ? "bg-emerald-50/40 dark:bg-emerald-950/20" : ""
                        }`}
                      >
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                          {s.diskon_pengadaan_persen}%
                        </div>
                        {isBest && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            Diskon Tertinggi
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 4. Biaya Ongkos Kirim per Kg */}
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30">
                    Ongkos Kirim
                  </td>
                  {compared_suppliers.map((s) => {
                    const isFree = s.biaya_ongkir_per_kg === 0;
                    return (
                      <td key={s.id} className="p-3 text-center border-l border-zinc-100 dark:border-zinc-800">
                        {isFree ? (
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                            Gratis Ongkir (Promo)
                          </span>
                        ) : (
                          <span className="text-zinc-700 dark:text-zinc-300">
                            Rp {s.biaya_ongkir_per_kg.toLocaleString("id-ID")} / kg
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 5. Syarat & Termin Pembayaran */}
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30">
                    Syarat Pembayaran
                  </td>
                  {compared_suppliers.map((s) => (
                    <td key={s.id} className="p-3 text-center border-l border-zinc-100 dark:border-zinc-800">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {s.syarat_pembayaran}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 6. Garansi Retur Buku Cacat */}
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30">
                    Garansi Retur & Kebijakan
                  </td>
                  {compared_suppliers.map((s) => {
                    const isBest = highlights && s.garansi_retur_hari === highlights.max_garansi;
                    return (
                      <td
                        key={s.id}
                        className={`p-3 text-center border-l border-zinc-100 dark:border-zinc-800 ${
                          isBest ? "bg-amber-50/40 dark:bg-amber-950/20" : ""
                        }`}
                      >
                        <div className="font-bold text-zinc-900 dark:text-zinc-100">{s.garansi_retur_hari} Hari</div>
                        <div className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{s.kebijakan_garansi}</div>
                      </td>
                    );
                  })}
                </tr>

                {/* 7. Rating Keandalan Rekanan */}
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30">
                    Rating Reputasi Rekanan
                  </td>
                  {compared_suppliers.map((s) => (
                    <td key={s.id} className="p-3 text-center border-l border-zinc-100 dark:border-zinc-800">
                      <div className="font-bold text-amber-500 text-sm">★ {s.rating_keandalan} / 5.0</div>
                    </td>
                  ))}
                </tr>

                {/* 8. Catatan Keunggulan */}
                <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="p-3 font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-800/30">
                    Keunggulan & Rekam Jejak
                  </td>
                  {compared_suppliers.map((s) => (
                    <td
                      key={s.id}
                      className="p-3 text-center border-l border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 italic leading-relaxed"
                    >
                      "{s.reputasi_catatan}"
                    </td>
                  ))}
                </tr>

                {/* 9. Tombol Aksi Bawah */}
                <tr>
                  <td className="p-3 bg-zinc-50/50 dark:bg-zinc-800/30"></td>
                  {compared_suppliers.map((s) => (
                    <td
                      key={s.id}
                      className="p-3 text-center border-l border-zinc-100 dark:border-zinc-800"
                    >
                      <button
                        type="button"
                        onClick={() => openDecisionModal(s)}
                        className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
                      >
                        Tetapkan {s.kode_supplier}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* MODAL KONFIRMASI KEPUTUSAN & PENERBITAN PO */}
      {isModalOpen && decisionSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Pengesahan Hasil SPK
                </span>
                <h3 className="text-base font-black text-zinc-900 dark:text-white">
                  Tetapkan Supplier Pilihan Pengadaan
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-800 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitDecision} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400">Supplier Rekanan Terpilih:</div>
                <div className="font-extrabold text-sm text-indigo-900 dark:text-indigo-200">
                  {decisionSupplier.nama_supplier} ({decisionSupplier.kode_supplier})
                </div>
                <div className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 flex gap-3">
                  <span>Harga: Rp {decisionSupplier.rata_rata_harga.toLocaleString("id-ID")}</span>
                  <span>•</span>
                  <span>Waktu: {decisionSupplier.estimasi_hari_kirim} Hari</span>
                  <span>•</span>
                  <span>Diskon: {decisionSupplier.diskon_pengadaan_persen}%</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Paket Pengadaan yang Ditugaskan:
                </label>
                <select
                  required
                  value={pengadaanTargetId}
                  onChange={(e) => setPengadaanTargetId(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100"
                >
                  <option value="">-- Pilih Paket Pengadaan --</option>
                  {pengadaan_list.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nomor_pengadaan} - {p.judul_pengadaan}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Nama Pejabat Pengambil Keputusan:
                  </label>
                  <input
                    type="text"
                    required
                    value={namaPengambil}
                    onChange={(e) => setNamaPengambil(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Jabatan Struktural:
                  </label>
                  <input
                    type="text"
                    required
                    value={jabatanPengambil}
                    onChange={(e) => setJabatanPengambil(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Rasionalisasi / Alasan Penetapan Keputusan (Audit Trail SPK):
                </label>
                <textarea
                  rows={4}
                  required
                  value={alasanKeputusan}
                  onChange={(e) => setAlasanKeputusan(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 text-xs text-zinc-900 dark:text-zinc-100 font-sans leading-relaxed"
                  placeholder="Jelaskan alasan trade-off parameter mengapa supplier ini dipilih di antara supplier pembanding..."
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
                >
                  Sahkan & Terbitkan Surat Keputusan PO ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
