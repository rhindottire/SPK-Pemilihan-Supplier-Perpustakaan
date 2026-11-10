import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";

interface SupplierData {
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
  diskon_pengadaan_persen: number;
  garansi_retur_hari: number;
  kebijakan_garansi: string;
  syarat_pembayaran: string;
  rating_keandalan: number;
}

interface PengadaanData {
  id: number;
  nomor_pengadaan: string;
  judul_pengadaan: string;
  kategori: { nama_kategori: string };
  estimasi_jumlah_eksemplar: number;
  maksimal_harga_satuan: number;
  maksimal_hari_kirim: number;
  total_anggaran_pagu: number;
  selected_supplier: SupplierData;
  keputusan: {
    id: number;
    alasan_keputusan: string;
    nama_pengambil_keputusan: string;
    jabatan: string;
    tanggal_keputusan: string;
  };
}

interface Props {
  pengadaan: PengadaanData;
  compared_suppliers: SupplierData[];
}

export default function KeputusanShow({ pengadaan, compared_suppliers }: Props) {
  const supplier = pengadaan.selected_supplier;
  const keputusan = pengadaan.keputusan;

  const totalEstimasiBiaya =
    pengadaan.estimasi_jumlah_eksemplar *
    (supplier.rata_rata_harga * (1 - supplier.diskon_pengadaan_persen / 100));

  return (
    <AppLayout title="Berita Acara & Surat Pesanan PO">
      <Head title={`Berita Acara SPK - ${pengadaan.nomor_pengadaan}`} />

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <Link
          href="/keputusan"
          className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 font-semibold"
        >
          ← Kembali ke Riwayat Keputusan
        </Link>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold text-xs flex items-center space-x-1.5 shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Cetak Dokumen Resmi (PDF/Print)</span>
        </button>
      </div>

      {/* Dokumen Lembar Resmi Cetak */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white text-zinc-900 border border-zinc-200 shadow-xl max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
        {/* Kop Surat Resmi */}
        <div className="border-b-2 border-zinc-900 pb-4 mb-6 text-center">
          <h2 className="text-sm uppercase tracking-widest font-semibold text-zinc-600">
            KEMENTERIAN PENDIDIKAN TINGGI, SAINS, DAN TEKNOLOGI
          </h2>
          <h1 className="text-lg font-black tracking-tight text-zinc-950 uppercase mt-0.5">
            UPT PERPUSTAKAAN UNIVERSITAS TRUNOJOYO MADURA
          </h1>
          <p className="text-[11px] text-zinc-500 mt-1">
            Jl. Raya Telang, PO. BOX 2 Kamal, Bangkalan - Madura | Telp. (031) 3011146 | Website: perpustakaan.trunojoyo.ac.id
          </p>
        </div>

        {/* Judul Dokumen */}
        <div className="text-center mb-6">
          <h3 className="text-base font-extrabold uppercase underline tracking-wide">
            BERITA ACARA PENETAPAN REKANAN SUPPLIER PENGADAAN BUKU
          </h3>
          <p className="text-xs font-mono text-zinc-600 mt-1">
            Nomor: BA-SPK/PERPUS-UTM/{pengadaan.nomor_pengadaan}/{new Date(keputusan.tanggal_keputusan).getFullYear()}
          </p>
        </div>

        <div className="text-xs space-y-4 text-justify leading-relaxed">
          <p>
            Pada hari ini, tanggal <strong>{keputusan.tanggal_keputusan}</strong>, bertempat di Ruang Pengadaan UPT Perpustakaan Universitas Trunojoyo Madura, telah dilaksanakan evaluasi pemilihan rekanan pengadaan bahan pustaka menggunakan <strong>Sistem Pendukung Keputusan (SPK) Berbasis Filter Dinamis dan Matriks Pembanding Berdampingan</strong> terhadap paket pengadaan berikut:
          </p>

          {/* Rincian Paket Pengadaan */}
          <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2 text-xs">
            <div className="grid grid-cols-3">
              <span className="text-zinc-500">Nomor Pengadaan:</span>
              <span className="col-span-2 font-mono font-bold">{pengadaan.nomor_pengadaan}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-zinc-500">Judul Pengadaan:</span>
              <span className="col-span-2 font-semibold">{pengadaan.judul_pengadaan}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-zinc-500">Kategori Bahan Pustaka:</span>
              <span className="col-span-2">{pengadaan.kategori.nama_kategori}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-zinc-500">Pagu Anggaran Maksimal:</span>
              <span className="col-span-2 font-bold">Rp {pengadaan.total_anggaran_pagu.toLocaleString("id-ID")}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-zinc-500">Kriteria Batas Kualifikasi:</span>
              <span className="col-span-2 font-semibold text-indigo-700">
                Batas Harga Satuan ≤ Rp {pengadaan.maksimal_harga_satuan.toLocaleString("id-ID")} • Batas Waktu Kirim ≤ {pengadaan.maksimal_hari_kirim} Hari
              </span>
            </div>
          </div>

          {/* Supplier Pembanding yang Dikomparasi */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-2">1. Hasil Evaluasi & Komparasi Berdampingan (*Side-by-Side Comparison*):</h4>
            <div className="overflow-x-auto border border-zinc-200 rounded-lg">
              <table className="w-full text-[11px] text-left">
                <thead className="bg-zinc-100 text-zinc-700 font-bold border-b border-zinc-200">
                  <tr>
                    <th className="p-2">Kode</th>
                    <th className="p-2">Nama Rekanan Penerbit</th>
                    <th className="p-2">Kota</th>
                    <th className="p-2">Harga Rata-rata</th>
                    <th className="p-2">Estimasi Kirim</th>
                    <th className="p-2">Diskon</th>
                    <th className="p-2">Syarat Bayar</th>
                    <th className="p-2">Garansi Retur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {compared_suppliers.map((s) => {
                    const isWinner = s.id === supplier.id;
                    return (
                      <tr key={s.id} className={isWinner ? "bg-emerald-50 font-semibold" : ""}>
                        <td className="p-2 font-mono">{s.kode_supplier}</td>
                        <td className="p-2">
                          {s.nama_supplier} {isWinner && <span className="text-emerald-700 font-bold">(TERPILIH)</span>}
                        </td>
                        <td className="p-2">{s.kota_asal}</td>
                        <td className="p-2">Rp {s.rata_rata_harga.toLocaleString("id-ID")}</td>
                        <td className="p-2">{s.estimasi_hari_kirim} Hari</td>
                        <td className="p-2">{s.diskon_pengadaan_persen}%</td>
                        <td className="p-2">{s.syarat_pembayaran}</td>
                        <td className="p-2">{s.garansi_retur_hari} Hari</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Penetapan Rekanan */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-2">2. Rekanan Pemenang yang Ditetapkan:</h4>
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-1.5 text-xs">
              <div className="grid grid-cols-3">
                <span className="text-zinc-600">Nama Perusahaan:</span>
                <span className="col-span-2 font-bold text-emerald-900">{supplier.nama_supplier}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-zinc-600">Alamat & Kontak:</span>
                <span className="col-span-2">{supplier.alamat} • Telp: {supplier.telepon}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-zinc-600">Estimasi Total Biaya:</span>
                <span className="col-span-2 font-bold text-zinc-900">
                  Rp {Math.round(totalEstimasiBiaya).toLocaleString("id-ID")} ({pengadaan.estimasi_jumlah_eksemplar} Eksemplar @ diskon {supplier.diskon_pengadaan_persen}%)
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-zinc-600">Estimasi Tiba:</span>
                <span className="col-span-2 font-bold">{supplier.estimasi_hari_kirim} Hari Kerja</span>
              </div>
            </div>
          </div>

          {/* Rasionalisasi Keputusan */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-1">3. Pertimbangan & Rasionalisasi Keputusan Pengadaan:</h4>
            <p className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 text-zinc-800 leading-relaxed italic">
              "{keputusan.alasan_keputusan}"
            </p>
          </div>

          <p className="mt-4">
            Demikian Berita Acara Penetapan Rekanan ini dibuat dengan sebenar-benarnya untuk digunakan sebagai dasar penerbitan Surat Pesanan (*Purchase Order*) pengadaan buku perpustakaan.
          </p>

          {/* Tanda Tangan */}
          <div className="pt-8 flex justify-between items-end text-xs">
            <div className="text-center w-64">
              <p className="text-zinc-500 mb-16">Penyedia / Rekanan Terpilih,</p>
              <p className="font-bold underline">{supplier.kontak_person}</p>
              <p className="text-[11px] text-zinc-500">{supplier.nama_supplier}</p>
            </div>

            <div className="text-center w-64">
              <p className="text-zinc-500 mb-1">Bangkalan, {keputusan.tanggal_keputusan}</p>
              <p className="text-zinc-500 mb-16">Pejabat Pengadaan Bahan Pustaka,</p>
              <p className="font-bold underline">{keputusan.nama_pengambil_keputusan}</p>
              <p className="text-[11px] text-zinc-500">{keputusan.jabatan}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
