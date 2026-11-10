# DOKUMEN TUGAS QUIZ 2 — SISTEM INFORMASI

## SISTEM PENDUKUNG KEPUTUSAN (SPK) PEMILIHAN SUPPLIER PENGADAAN BUKU PERPUSTAKAAN

---

### IDENTITAS MAHASISWA & PENUGASAN

* **Mata Kuliah:** Sistem Informasi
* **Dosen Pengampu:** Kurniawan Permana
* **Kelompok / Tim:** SI Perpustakaan (Kasus #3)
* **Kasus:** Pemilihan Supplier Pengadaan Koleksi Buku Perpustakaan
* **Pendekatan SPK:** Filter Dinamis + Matriks Pembanding Berdampingan (*Side-by-Side Comparison*)
* **Prinsip Logika SPK:** Pengguna menentukan batas harga dan waktu kirim, lalu membandingkan supplier berdampingan secara objektif. **Tidak ada skor akhir komposit.**
* **Penyusun:** Achmad Ali Ridho (NIM: 230411100197)
* **Program Studi:** Sistem Informasi, Fakultas Teknik, Universitas Trunojoyo Madura

---

### 1. TAUTAN REPOSITORI SOURCE CODE

Repositori kode sumber (*source code*) proyek aplikasi Sistem Informasi Perpustakaan yang dilengkapi Sistem Pendukung Keputusan (SPK) Pemilihan Supplier telah diunggah pada platform GitHub dan dapat diakses publik melalui tautan resmi berikut:

* **URL Repositori GitHub:**
  [https://github.com/rhindottire/SPK-Pemilihan-Supplier-Perpustakaan](https://github.com/rhindottire/SPK-Pemilihan-Supplier-Perpustakaan)

* **Visibilitas Repositori:** Publik (*Public Repository*)
* **Branch Utama:** `main`

---

### 2. DESKRIPSI & ARSITEKTUR SISTEM

Aplikasi ini dibangun khusus untuk memenuhi kriteria evaluasi tugas Quiz 2 mata kuliah Sistem Informasi dengan spesifikasi teknis tingkat industri modern:

#### A. Arsitektur Perangkat Lunak
* **Backend:** PHP 8.5 dengan Framework **Laravel 13** (struktur monolitik modern, Eloquent ORM, Service Layer, dan Form Requests validation).
* **Frontend:** **Inertia.js** terintegrasi dengan **React 19** dan **TypeScript** (Single Page Application tanpa latensi reload halaman, tipe data statis ketat *zero runtime error*).
* **Bundler & Tooling:** Vite 8, Tailwind CSS v4, Lucide Icons, dan Recharts 3 untuk visualisasi analitik sebaran harga vs waktu kirim.
* **Basis Data:** Relational Database **MySQL 9 / MariaDB** (InnoDB engine, dukungan foreign key constraints, transaksi ACID, dan integritas referensial penuh).

#### B. Fitur Unggulan Sistem Informasi & SPK
1. **Dashboard Eksekutif & Analitik:** Menyajikan ringkasan KPI (total rekanan penerbit, rata-rata harga satuan, rata-rata waktu kirim, sebaran geografis rekanan, dan grafik komparasi trade-off).
2. **Modul SPK — Filter Dinamis Kriteria:** Memungkinkan pustakawan menetapkan batas harga maksimal per eksemplar, batas waktu pengiriman maksimal (hari kerja), kategori koleksi yang dicari, persentase minimal diskon institusi, dan fleksibilitas syarat pembayaran (misal: Tempo 30 Hari). Sistem secara instan menyaring rekanan yang lolos kualifikasi dan mengisolasi rekanan yang gugur beserta alasan rincinya.
3. **Modul SPK — Matriks Pembanding Berdampingan (*Side-by-Side Comparison*):** Pengguna dapat memilih 2 hingga 4 supplier rekanan yang lolos untuk dibandingkan secara *head-to-head* pada matriks berdampingan. Sistem menyoroti parameter terbaik (termurah, tercepat, diskon tertinggi, garansi terpanjang) secara visual tanpa manipulasi skor agregat buatan.
4. **Modul SPK — Pengesahan Keputusan & Audit Trail:** Pustakawan dapat menetapkan supplier pemenang untuk paket pengadaan tertentu, mencantumkan pertimbangan rasionalisasi keputusan, dan langsung menerbitkan dokumen Berita Acara Penetapan Rekanan serta Surat Pesanan (*Purchase Order* / PO) yang ramah cetak (*print-friendly*).
5. **Master Data Supplier (CRUD):** Pengelolaan profil lengkap rekanan penerbit/distributor (PT Gramedia, Penerbit Erlangga, CV Andi Offset, Deepublish, Salemba Empat, Graha Ilmu, Mizan, Rajawali Pers).
6. **Manajemen Paket Pengadaan Buku:** Pencatatan kebutuhan restock buku perpustakaan lengkap dengan pagu anggaran, jumlah eksemplar, batas harga satuan, dan batas waktu kedatangan buku.

---

### 3. PANDUAN MENJALANKAN APLIKASI SECARA LOKAL

Bagi asisten laboratorium atau penguji yang ingin mendemonstrasikan aplikasi secara lokal pada komputer/laptop, langkah-langkah instalasi adalah sebagai berikut:

#### Prasyarat Sistem
* PHP versi 8.3 atau yang lebih baru (ekstensi `pdo_mysql`, `mbstring`, `openssl` aktif).
* Composer versi 2.x.
* Node.js versi 20+ dan npm/pnpm.
* MySQL / MariaDB Server.

#### Langkah Instalasi
1. Melakukan kloning repositori GitHub:
   ```bash
   git clone https://github.com/rhindottire/SPK-Pemilihan-Supplier-Perpustakaan.git
   cd SPK-Pemilihan-Supplier-Perpustakaan
   ```
2. Menginstal seluruh dependensi PHP dan Node.js:
   ```bash
   composer install
   npm install
   ```
3. Menyiapkan berkas lingkungan (*environment configuration*):
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Menyesuaikan koneksi database pada berkas `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=spk_supplier_perpustakaan
   DB_USERNAME=root
   DB_PASSWORD=
   ```
5. Membuat database dan mengimpor skema data awal (seeder):
   ```bash
   php artisan migrate --seed
   ```
   *(Atau alternatif: impor langsung berkas `spk_supplier_perpustakaan.sql` melalui phpMyAdmin / MySQL CLI).*
6. Membangun aset antarmuka frontend:
   ```bash
   npm run build
   ```
7. Menjalankan server aplikasi lokal:
   ```bash
   php artisan serve
   ```
8. Membuka peramban (*web browser*) dan mengakses alamat:
   ```
   http://localhost:8000
   ```

Aplikasi siap dioperasikan dan seluruh fitur SPK dapat diuji langsung.
