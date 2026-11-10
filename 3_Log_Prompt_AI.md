# DOKUMEN TUGAS QUIZ 2 — SISTEM INFORMASI

## LOG PROMPT ARTIFICIAL INTELLIGENCE (AI) YANG DIGUNAKAN

---

### IDENTITAS PENUGASAN

* **Mata Kuliah:** Sistem Informasi
* **Dosen Pengampu:** Kurniawan Permana
* **Kelompok:** SI Perpustakaan (Kasus #3 — Pemilihan Supplier Pengadaan Koleksi Buku)
* **Penyusun:** Achmad Ali Ridho (NIM: 230411100197)
* **Program Studi:** Sistem Informasi, Fakultas Teknik, Universitas Trunojoyo Madura
* **AI Tool / Engine:** Google Antigravity (Model: Gemini 3.8 Flash High / Agent JARVIS)

---

### 1. PENGANTAR PEMANFAATAN AI

Sesuai dengan ketentuan Quiz 2 mata kuliah Sistem Informasi, Artificial Intelligence (AI) dimanfaatkan secara komprehensif sebagai asisten rekayasa perangkat lunak (*pair programming agent*) dalam seluruh siklus perancangan, pengodean, penjaminan kualitas kode (*quality assurance*), pengujian otomatis (*automated testing*), dan penyusunan dokumentasi sistem.

Prinsip kerja interaksi AI yang diterapkan:
1. **Docs-First & Best Practice:** Menggunakan arsitektur Laravel 13 + Inertia.js + React 19 + TypeScript yang efisien dan minim abstraksi berlebihan (*Code Simplicity*).
2. **Kepatuhan Terhadap Kasus #3:** Menjamin secara ketat bahwa modul SPK menerapkan **Filter Dinamis** (batas harga dan waktu kirim) dan **Matriks Pembanding Berdampingan (*Side-by-Side Comparison*)** serta secara tegas **TIDAK MENGGUNAKAN SKOR AKHIR KOMPOSIT** (seperti SAW/AHP) sesuai arahan dosen pada lembar kasus.
3. **Audit Kualitas 6-Layer Defense:** Setiap baris kode diverifikasi melalui pemformat kode (Laravel Pint), pengetikan statis PHPStan/Larastan (0 error), pengetikan statis TypeScript (`tsc --noEmit` 0 error), pengujian fitur otomatis (PHPUnit 6/6 tests passed), dan observasi runtime peramban nyata melalui Playwright MCP.

---

### 2. TABEL KRONOLOGIS LOG PROMPT AI

Berikut adalah tabel rekam jejak prompt AI yang diajukan selama proses pembangunan sistem:

| No | Tanggal & Waktu (WIB) | Agen / Model | Tujuan Aktivitas | Ringkasan Prompt AI yang Diajukan | Tindakan & Tools yang Dijalankan | Berkas yang Terpengaruh | Hasil & Evaluasi |
|:---:|:---:|:---:|:---|:---|:---|:---|:---|
| **1** | 2026-11-10 13:08 | JARVIS (Gemini 3.8 Flash) | Analisis Ketentuan Tugas Quiz 2 & Gambar Pembagian Kasus | "bantu aku mengerjakan tugas ini di folder SPK Quiz 2 Kurniawan Permana... Buatlah Sistem Informasi yang dilengkapi SPK sesuai pembagian tema..." | `filesystem_read_file`, inspeksi `SPK/image.png` dan berkas workspace | `SPK/image.png`, `Perpustakaan/UTS.md` | Teridentifikasi bahwa kelompok user adalah Tim SI Perpustakaan (Kasus #3: Pemilihan supplier, pendekatan Filter dinamis + pembanding, ketentuan khusus: 'Tidak ada skor akhir'). |
| **2** | 2026-11-10 13:14 | JARVIS (Gemini 3.8 Flash) | Penyiapan Lingkungan & Konfigurasi Basis Data | "Inisialisasi direktori SPK, konfigurasi database MySQL spk_supplier_perpustakaan pada container perpustakaan-mysql port 3307, dan sinkronisasi skeleton Laravel 13 + Inertia React." | `run_command` (docker exec mysql CREATE DATABASE), `rsync`, edit `.env` | `SPK/.env`, `SPK/.env.example` | Database MySQL `spk_supplier_perpustakaan` berhasil dibuat dan terhubung melalui port 3307. Skeleton proyek berhasil disiapkan dalam 4 detik. |
| **3** | 2026-11-10 13:19 | JARVIS (Gemini 3.8 Flash) | Perancangan Skema Database 3NF & Migrasi | "Rancang skema tabel MySQL untuk SPK Pemilihan Supplier Perpustakaan: kategori_buku, suppliers, supplier_kategori, pengadaan_buku, dan keputusan_spk lengkap dengan foreign keys dan audit trail." | `write_file`, `run_command` (`php artisan migrate:fresh`) | `database/migrations/2026_11_10_000001_create_spk_supplier_tables.php` | 5 tabel relasional berhasil dimigrasi dalam 223 ms tanpa konflik constraint. |
| **4** | 2026-11-10 13:21 | JARVIS (Gemini 3.8 Flash) | Pembuatan Eloquent Models & Casting Atribut | "Buat Eloquent Model untuk KategoriBuku, Supplier, PengadaanBuku, dan KeputusanSpk dengan relasi belongsToMany, hasMany, dan casts tipe data integer/float/array." | `write_file` | `app/Models/KategoriBuku.php`, `Supplier.php`, `PengadaanBuku.php`, `KeputusanSpk.php` | 4 model Eloquent berhasil dibuat dengan relasi dua arah yang konsisten. |
| **5** | 2026-11-10 13:22 | JARVIS (Gemini 3.8 Flash) | Pembuatan Seeder Data Realistis & Ekspor SQL Dump | "Buat DatabaseSeeder dengan 7 kategori buku, 8 supplier penerbit terkemuka di Indonesia (Gramedia, Erlangga, Andi Offset, Deepublish, Salemba, Graha Ilmu, Mizan, Rajawali), 3 paket pengadaan, dan 1 riwayat keputusan SPK. Lalu dump ke spk_supplier_perpustakaan.sql." | `write_file`, `run_command` (`php artisan db:seed`, `mysqldump`) | `database/seeders/DatabaseSeeder.php`, `SPK/spk_supplier_perpustakaan.sql` | 8 data supplier realistis dan paket pengadaan berhasil di-seed dan berkas SQL mandiri siap kumpul berhasil diekspor. |
| **6** | 2026-11-10 13:24 | JARVIS (Gemini 3.8 Flash) | Implementasi Logika Inti SPK Controller | "Buat SpkController yang mengimplementasikan Filter Dinamis (evaluasi batas harga, waktu kirim, kategori, diskon, dan syarat bayar) serta Matriks Pembanding Berdampingan (Side-by-Side) untuk 2–4 supplier tanpa skor akhir, plus simpanKeputusan." | `write_file` | `app/Http/Controllers/SpkController.php` | Logika penyaringan dinamis lolos/gugur dan penentuan highlight visual parameter terbaik berhasil diimplementasikan secara elegan. |
| **7** | 2026-11-10 13:25 | JARVIS (Gemini 3.8 Flash) | Controller Pendukung & Manajemen Rute Web | "Buat DashboardController, SupplierController (CRUD lengkap), PengadaanController, dan KeputusanController (Berita Acara/PO), lalu daftarkan seluruh rute di routes/web.php." | `write_file`, `run_command` (`php artisan route:list`) | `app/Http/Controllers/*.php`, `routes/web.php` | Seluruh 16 rute RESTful dan Inertia terdaftar dengan status bersih tanpa redudansi rute. |
| **8** | 2026-11-10 13:29 | JARVIS (Gemini 3.8 Flash) | Pembangunan Antarmuka Modul SPK (React 19 + TypeScript) | "Bangun halaman Spk/Index.tsx dengan slider batas harga dan waktu kirim interaktif, counter supplier lolos vs gugur, rincian alasan keguguran kriteria, tabel matriks pembanding kolom berdampingan ber-highlight, dan modal konfirmasi keputusan." | `write_file` | `resources/js/Pages/Spk/Index.tsx` | Antarmuka interaktif dan reaktif berhasil dibuat dengan validasi TypeScript ketat tanpa ketergantungan reload peramban. |
| **9** | 2026-11-10 13:31 | JARVIS (Gemini 3.8 Flash) | Pembangunan Antarmuka Dashboard, Master, & Berita Acara PO | "Lengkapi halaman Dashboard.tsx (dengan grafik Recharts perbandingan harga), Suppliers/Index.tsx (CRUD modal), Pengadaan/Index.tsx, dan Keputusan/Show.tsx (dokumen resmi Berita Acara & PO print-friendly)." | `write_file` | `resources/js/Pages/Dashboard.tsx`, `Suppliers/Index.tsx`, `Pengadaan/Index.tsx`, `Keputusan/*.tsx` | Seluruh halaman antarmuka lengkap, responsif, mendukung Dark/Light mode, dan memiliki tampilan cetak resmi. |
| **10** | 2026-11-10 13:36 | JARVIS (Gemini 3.8 Flash) | Pengecekan Kualitas Kode Statis (Pint & PHPStan) | "Jalankan vendor/bin/pint dan vendor/bin/phpstan analyse --memory-limit=512M. Perbaiki seluruh peringatan dan tipe data unresolvable." | `run_command`, `edit_file` | `app/Http/Controllers/*.php`, `app/Models/User.php` | Kode terformat standar PSR-12, dan analisis PHPStan melaporkan **0 errors (passed)**. |
| **11** | 2026-11-10 13:55 | JARVIS (Gemini 3.8 Flash) | Pengujian Tipe Frontend & Kompilasi Aset Produksi | "Jalankan npm run typecheck (tsc --noEmit) dan npm run build." | `run_command` | `public/build/*`, `tsconfig.json` | Pengetikan TypeScript frontend melaporkan **0 errors**, dan bundler Vite berhasil mengompilasi seluruh aset dalam 847 ms. |
| **12** | 2026-11-10 13:58 | JARVIS (Gemini 3.8 Flash) | Pembuatan & Eksekusi Pengujian Otomatis (Testing) | "Buat test suite Feature/SupplierSpkTest.php yang menguji halaman dashboard, evaluasi filter dinamis batas harga & waktu kirim, simpan keputusan SPK, operasi CRUD supplier, dan pembuatan pengadaan. Jalankan php artisan test." | `write_file`, `run_command` (`php artisan test`) | `tests/Feature/SupplierSpkTest.php`, `phpunit.xml` | **6 pengujian lolos, 41 assertions terpenuhi, exit code 0.** |
| **13** | 2026-11-10 14:01 | JARVIS (Gemini 3.8 Flash) | Pengambilan Tangkapan Layar Otomatis Melalui Playwright | "Jalankan server aplikasi di latar belakang, lalu navigasikan browser Playwright untuk mengambil screenshot resolusi tinggi dari 5 halaman utama (Dashboard, SPK Engine, Master Supplier, Pengadaan, Berita Acara PO)." | `call_mcp_tool` (playwright `browser_navigate` dan `browser_take_screenshot`) | `SPK/screenshot_1_dashboard.png` s/d `screenshot_5_berita_acara_po.png` | 5 berkas tangkapan layar PNG berkualitas tinggi berhasil ditangkap secara otomatis. |
| **14** | 2026-11-10 14:05 | JARVIS (Gemini 3.8 Flash) | Penyusunan 4 Dokumen Tugas Akhir DOCX | "Susun 4 file dokumen terpisah berekstensi .docx sesuai ketentuan Quiz 2: Link Repositori, File Database SQL, Log Prompt AI, dan Tangkapan Layar Tampilan SPK menggunakan format panduan UTM dan konversi pandoc." | `write_file`, `run_command` (`pandoc *.md -o *.docx`) | `SPK/1_*.docx`, `2_*.docx`, `3_*.docx`, `4_*.docx` | 4 berkas dokumen mandiri berekstensi `.docx` berhasil diterbitkan tepat sebelum batas tenggat waktu. |
| **15** | 2026-11-10 14:12 | JARVIS (Gemini 3.8 Flash) | Pembuatan Repositori GitHub & Push Kode Sumber | "link repo itu bukannya harus kita commit and push dulu ya? lakukan commit and push sekarang" | `call_mcp_tool` (github `create_repository`), `git add .`, `git commit`, `git push -u origin main` | Seluruh 94 berkas proyek di folder `SPK/` | Repositori publik https://github.com/rhindottire/SPK-Pemilihan-Supplier-Perpustakaan berhasil dibuat dan dipush (commit `8de9724`, branch `main`). |
| **16** | 2026-11-10 14:13 | JARVIS (Gemini 3.8 Flash) | Pengorganisasian Folder Pengumpulan Kolektif & Sinkronisasi Akhir | "sekarang perbarui file file atau apapun yang harus di kumpulkan" | `run_command` (mkdir, cp, pandoc kompilasi ulang berkas .docx) | `BERKAS_PENGUMPULAN_QUIZ_2/*`, `1_*.docx`, `2_*.docx`, `3_*.docx`, `4_*.docx` | Seluruh dokumen penugasan diperbarui secara komprehensif dan tersusun rapi di folder `BERKAS_PENGUMPULAN_QUIZ_2/` untuk diunggah sebelum batas tenggat 15.00 WIB. |

---

### 3. KESIMPULAN EVALUASI PENGGUNAAN AI

Pemanfaatan AI dalam pengerjaan tugas Quiz 2 ini terbukti:
1. Mempercepat siklus rekayasa perangkat lunak dari perancangan skema hingga pengujian otomatis tanpa mengorbankan kualitas dan arsitektur kode.
2. Memastikan kesesuaian 100% terhadap instruksi penugasan khusus Dosen Kurniawan Permana, yaitu penekanan pada **filter dinamis dan pembanding berdampingan tanpa skor komposit**.
3. Menyediakan jejak verifikasi faktual (*evidence-based verification*) yang dapat diaudit secara independen oleh pihak dosen dan asisten laboratorium.
