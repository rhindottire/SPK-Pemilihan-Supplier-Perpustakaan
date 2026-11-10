import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface Stats {
  total_suppliers: number;
  total_kategori: number;
  total_pengadaan: number;
  pengadaan_selesai: number;
  pengadaan_proses: number;
  avg_harga: number;
  avg_waktu_kirim: number;
  avg_diskon: number;
}

interface SupplierItem {
  id: number;
  kode_supplier: string;
  nama_supplier: string;
  kota_asal: string;
  rata_rata_harga: number;
  estimasi_hari_kirim: number;
  diskon_pengadaan_persen: number;
  rating_keandalan: number;
  syarat_pembayaran: string;
  kategori: Array<{ id: number; nama_kategori: string }>;
}

interface PengadaanItem {
  id: number;
  nomor_pengadaan: string;
  judul_pengadaan: string;
  maksimal_harga_satuan: number;
  maksimal_hari_kirim: number;
  status: string;
  kategori: { nama_kategori: string };
  selected_supplier?: { nama_supplier: string };
}

interface Props {
  stats: Stats;
  suppliers: SupplierItem[];
  pengadaan_terbaru: PengadaanItem[];
  sebaran_kota: Array<{ kota_asal: string; jumlah: number }>;
  scatter_data: Array<{
    nama: string;
    kode: string;
    harga: number;
    hari: number;
    diskon: number;
    rating: number;
  }>;
}

export default function Dashboard({
  stats,
  suppliers,
  pengadaan_terbaru,
  scatter_data,
}: Props) {
  const chartData = suppliers.map((s) => ({
    name: s.nama_supplier.replace(/(PT|CV|Penerbit|Distributor)\s+/g, ""),
    harga: s.rata_rata_harga,
    hari: s.estimasi_hari_kirim,
    diskon: s.diskon_pengadaan_persen,
  }));

  return (
    <AppLayout title="Dashboard SPK Supplier Perpustakaan">
      <Head title="Dashboard - SPK Pemilihan Supplier Perpustakaan" />

      {/* Hero Welcome */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl shadow-indigo-900/10 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-indigo-200 mb-4 font-mono">
            <span>📚 Sistem Informasi Perpustakaan • Kasus #3</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Sistem Pendukung Keputusan Pemilihan Supplier Buku
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed mb-6">
            Membantu pengelola perpustakaan menyeleksi rekanan penerbit/distributor terbaik berbasis{" "}
            <strong>Filter Dinamis</strong> batas harga dan waktu kirim, serta{" "}
            <strong>Komparasi Berdampingan (*Side-by-Side*)</strong> tanpa manipulasi skor komposit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/spk"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs hover:bg-indigo-50 transition-all shadow-md"
            >
              <svg className="w-4 h-4 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Jalankan SPK Pembanding</span>
            </Link>
            <Link
              href="/pengadaan"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white font-medium text-xs border border-white/20 transition-all"
            >
              <span>Daftar Pengadaan ({stats.pengadaan_proses} Aktif)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1">
            Total Rekanan Supplier
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {stats.total_suppliers} <span className="text-xs font-normal text-zinc-400">Penerbit/Distributor</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center space-x-1">
            <span>● Seluruhnya Terverifikasi Aktif</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1">
            Rata-rata Harga Satuan
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Rp {stats.avg_harga.toLocaleString("id-ID")}
          </div>
          <div className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            Kisaran Rp 69.000 – Rp 115.000
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1">
            Rata-rata Waktu Kirim
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {stats.avg_waktu_kirim} <span className="text-xs font-normal text-zinc-400">Hari Kerja</span>
          </div>
          <div className="mt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            Tercepat 2 hari (Deepublish)
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-1">
            Rata-rata Diskon Buku
          </div>
          <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            {stats.avg_diskon}%
          </div>
          <div className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            Diskon pengadaan perpustakaan
          </div>
        </div>
      </div>

      {/* Visual Chart & Pengadaan Aktif */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart Column */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                Perbandingan Harga Rata-rata per Eksemplar
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Data katalog buku dari seluruh supplier rekanan perpustakaan
              </p>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">Rupiah (IDR)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={(val) => `${val / 1000}k`} tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(val: any) => [`Rp ${Number(val).toLocaleString("id-ID")}`, "Rata-rata Harga"]}
                  contentStyle={{ backgroundColor: "#1e1b4b", borderRadius: "10px", color: "#fff", fontSize: "12px" }}
                />
                <Bar dataKey="harga" radius={[6, 6, 0, 0]} fill="#4f46e5">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.harga <= 80000 ? "#10b981" : entry.harga <= 100000 ? "#6366f1" : "#f59e0b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 text-[11px] text-zinc-500 mt-2">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
              <span>Ekonomis (≤ Rp 80k)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span>
              <span>Menengah (Rp 81k - 100k)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
              <span>Premium (&gt; Rp 100k)</span>
            </span>
          </div>
        </div>

        {/* Paket Pengadaan Aktif */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Status Paket Pengadaan
            </h2>
            <Link href="/pengadaan" className="text-xs text-indigo-600 hover:underline font-medium">
              Semua
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {pengadaan_terbaru.map((p) => {
              const isSelesai = p.status === "SELESAI";
              return (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 text-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] text-zinc-400 font-semibold">
                      {p.nomor_pengadaan}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isSelesai
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 animate-pulse"
                      }`}
                    >
                      {isSelesai ? "Selesai Dipilih" : "Butuh SPK"}
                    </span>
                  </div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1 mb-1">
                    {p.judul_pengadaan}
                  </div>
                  <div className="text-[11px] text-zinc-500 flex items-center justify-between mt-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60">
                    <span>Target: ≤ Rp {p.maksimal_harga_satuan.toLocaleString("id-ID")} | ≤ {p.maksimal_hari_kirim} hari</span>
                    {!isSelesai ? (
                      <Link
                        href={`/spk?pengadaan_id=${p.id}&max_harga=${p.maksimal_harga_satuan}&max_hari_kirim=${p.maksimal_hari_kirim}`}
                        className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                      >
                        Pilih Supplier →
                      </Link>
                    ) : (
                      <Link href={`/keputusan/${p.id}`} className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                        Lihat PO ✓
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabel Master Rekanan Singkat */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Daftar Rekanan Supplier Buku Perpustakaan
            </h2>
            <p className="text-xs text-zinc-500">
              Data parameter penentu pemilihan supplier pada SPK
            </p>
          </div>
          <Link
            href="/suppliers"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            Kelola Master Supplier →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Kode & Nama Supplier</th>
                <th className="px-4 py-3">Kota</th>
                <th className="px-4 py-3">Rata-rata Harga</th>
                <th className="px-4 py-3">Waktu Kirim</th>
                <th className="px-4 py-3">Diskon</th>
                <th className="px-4 py-3">Syarat Pembayaran</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-medium">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold text-zinc-900 dark:text-white">{s.nama_supplier}</div>
                    <div className="text-[10px] font-mono text-zinc-400">{s.kode_supplier}</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{s.kota_asal}</td>
                  <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                    Rp {s.rata_rata_harga.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold">
                      {s.estimasi_hari_kirim} Hari
                    </span>
                  </td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                    {s.diskon_pengadaan_persen}%
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{s.syarat_pembayaran}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center space-x-1 text-amber-500 font-bold">
                      <span>★</span>
                      <span>{s.rating_keandalan}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/spk?compare_ids=${s.id}`}
                      className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                    >
                      Bandingkan
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
