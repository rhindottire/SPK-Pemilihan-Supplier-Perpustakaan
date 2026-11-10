# SIP-SUPPLIER: Sistem Informasi Perpustakaan & SPK Pemilihan Supplier Buku

Sistem Informasi Manajemen dan Sistem Pendukung Keputusan (SPK) untuk seleksi rekanan supplier penerbit/distributor buku perpustakaan perguruan tinggi. Dibangun untuk memenuhi penugasan **Quiz 2 Mata Kuliah Sistem Informasi (Dosen: Kurniawan Permana)** pada Fakultas Teknik Universitas Trunojoyo Madura.

---

## 1. Studi Kasus & Metodologi SPK (Kasus #3)

* **Tim:** SI Perpustakaan
* **Kasus:** Pemilihan Supplier Pengadaan Koleksi Bahan Pustaka
* **Pendekatan SPK:** **Filter Dinamis + Matriks Pembanding Berdampingan (*Side-by-Side Comparison*)**
* **Ketentuan Khusus:** **Tidak ada skor akhir komposit.**

### Alur Keputusan:
1. **Filter Dinamis:** Pengguna menentukan batas maksimal harga satuan (Rp) dan batas maksimal waktu pengiriman (hari kerja), serta memfilter kategori koleksi buku, diskon minimal, dan syarat pembayaran (tempo kredit). Sistem menyaring supplier yang memenuhi kriteria (*feasible*) dan merinci alasan supplier yang gugur.
2. **Matriks Pembanding Berdampingan:** Pengguna memilih 2 hingga 4 supplier yang lolos untuk dibandingkan secara *head-to-head*. Sistem memberikan highlight visual pada parameter unggulan (termurah, tercepat, diskon tertinggi, garansi terpanjang).
3. **Pengesahan Keputusan:** Pustakawan menetapkan rekanan pemenang untuk paket pengadaan tertentu dengan mencatat rasionalisasi pertimbangan, dan sistem menerbitkan dokumen resmi Berita Acara Penetapan & Surat Pesanan (*Purchase Order* / PO).

---

## 2. Tech Stack

* **Backend:** PHP 8.5, Laravel 13, Eloquent ORM
* **Frontend:** Inertia.js, React 19, TypeScript, Tailwind CSS v4, Recharts 3
* **Basis Data:** MySQL 9.x / MariaDB (InnoDB Storage Engine)
* **Penjaminan Kualitas:**
  * Linter & Code Style: Laravel Pint (PSR-12)
  * Analisis Statis: PHPStan / Larastan (Level 5, 0 errors)
  * Typecheck Frontend: TypeScript Compiler (`tsc --noEmit`, 0 errors)
  * Automated Tests: PHPUnit Feature Test Suite (6 tests passed, 41 assertions)

---

## 3. Komponen Berkas Penugasan (Quiz 2)

Sesuai instruksi pengumpulan, telah disiapkan 4 file dokumen terpisah:
1. `1_Link_Repositori_Source_Code.docx`: Tautan repositori GitHub, identitas kelompok, dan ringkasan arsitektur.
2. `2_File_Database_SQL.docx` & `spk_supplier_perpustakaan.sql`: Dokumentasi skema relasional, kamus data, dan skrip SQL DDL/DML lengkap.
3. `3_Log_Prompt_AI.docx`: Rekam jejak seluruh prompt AI terstruktur yang digunakan dari perancangan hingga implementasi.
4. `4_Tangkapan_Layar_Aplikasi_SPK.docx`: Dokumentasi visual antarmuka beranotasi lengkap (Dashboard, SPK Engine, Master Supplier, Pengadaan, Berita Acara PO).

---

## 4. Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat
* PHP 8.3+
* Composer 2.x
* Node.js 20+ & npm
* MySQL Server

### Langkah-langkah
```bash
# 1. Kloning repositori
git clone https://github.com/rhindottire/SPK-Pemilihan-Supplier-Perpustakaan.git
cd SPK-Pemilihan-Supplier-Perpustakaan

# 2. Instalasi dependensi
composer install
npm install

# 3. Konfigurasi Environment
cp .env.example .env
php artisan key:generate

# Sesuaikan koneksi DB pada berkas .env
# DB_DATABASE=spk_supplier_perpustakaan

# 4. Migrasi & Seeding Data
php artisan migrate --seed

# 5. Kompilasi Aset Frontend
npm run build

# 6. Jalankan Server Lokal
php artisan serve
```

Akses aplikasi pada peramban melalui alamat: `http://localhost:8000`.

---

## 5. Pengujian Otomatis

Jalankan test suite menggunakan perintah:
```bash
php artisan test
```
Seluruh 6 skenario pengujian (Dashboard, Evaluasi Filter Dinamis, Pemilihan Keputusan, CRUD Supplier, Pengadaan) lolos pengujian secara otomatis.
