import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";

interface KeputusanItem {
  id: number;
  pengadaan_id: number;
  nomor_pengadaan: string;
  judul_pengadaan: string;
  kategori: string;
  supplier_terpilih: {
    id: number;
    nama: string;
    kota: string;
    harga: number;
    hari: number;
    diskon: number;
    rating: number;
  };
  compared_count: number;
  compared_suppliers: string[];
  alasan_keputusan: string;
  nama_pengambil_keputusan: string;
  jabatan: string;
  tanggal_keputusan: string;
}

interface Props {
  keputusan_list: KeputusanItem[];
}

export default function KeputusanIndex({ keputusan_list }: Props) {
  return (
    <AppLayout title="Riwayat Keputusan SPK & Purchase Order">
      <Head title="Riwayat Keputusan SPK - SIP Perpustakaan" />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
          Riwayat Keputusan SPK & Audit Trail
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Arsip Berita Acara Penetapan Rekanan Supplier Pengadaan Koleksi Buku Perpustakaan.
        </p>
      </div>

      <div className="space-y-4">
        {keputusan_list.map((k) => (
          <div
            key={k.id}
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-md">
                  {k.nomor_pengadaan}
                </span>
                <span className="text-[11px] text-zinc-400">• Disahkan pada {k.tanggal_keputusan}</span>
              </div>

              <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                {k.judul_pengadaan}
              </h2>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 text-xs">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-emerald-600 font-bold">✓ Rekanan Terpilih:</span>
                  <strong className="text-zinc-900 dark:text-white">{k.supplier_terpilih.nama}</strong>
                  <span className="text-zinc-400 font-mono text-[10px]">({k.supplier_terpilih.kota})</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed italic">
                  "{k.alasan_keputusan}"
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
                <span>Pejabat: <strong>{k.nama_pengambil_keputusan}</strong> ({k.jabatan})</span>
                <span>•</span>
                <span>Dibandingkan terhadap: {k.compared_suppliers.join(", ")}</span>
              </div>
            </div>

            <div className="flex md:flex-col items-center gap-2">
              <Link
                href={`/keputusan/${k.pengadaan_id}`}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 text-center transition-all"
              >
                Cetak Surat PO & Berita Acara
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
