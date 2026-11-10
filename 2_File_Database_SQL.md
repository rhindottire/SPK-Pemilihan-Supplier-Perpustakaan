# DOKUMEN TUGAS QUIZ 2 — SISTEM INFORMASI

## DOKUMENTASI STRUKTUR BASIS DATA & SKRIP SQL (.SQL)

---

### IDENTITAS PENUGASAN

* **Mata Kuliah:** Sistem Informasi
* **Dosen Pengampu:** Kurniawan Permana
* **Kelompok:** SI Perpustakaan (Kasus #3 — Pemilihan Supplier Pengadaan Buku)
* **Penyusun:** Achmad Ali Ridho (NIM: 230411100197)
* **Program Studi:** Sistem Informasi, Fakultas Teknik, Universitas Trunojoyo Madura
* **Nama Database:** `spk_supplier_perpustakaan`
* **RDBMS Engine:** MySQL 9.x / MariaDB (InnoDB Storage Engine)

---

### 1. DESAIN SKEMA RELASIONAL & KAMUS DATA (DATA DICTIONARY)

Basis data sistem dirancang secara normal (3NF) guna menjamin integritas data transaksi pengadaan dan histori audit keputusan SPK:

#### A. Tabel `kategori_buku`
Menyimpan klasifikasi bidang ilmu koleksi buku perpustakaan yang disediakan oleh para supplier.
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `kode` (VARCHAR(20), Unique) — Kode klasifikasi buku (misal: KOM, SAINS, EKO, SOS, MED, SAS, REF).
* `nama_kategori` (VARCHAR(255)) — Nama lengkap bidang kategori keilmuan buku.
* `deskripsi` (VARCHAR(255), Nullable) — Penjelasan ruang lingkup koleksi.
* `icon` (VARCHAR(50)) — Identifier icon visual pada antarmuka.
* `created_at`, `updated_at` (TIMESTAMP)

#### B. Tabel `suppliers`
Menyimpan profil rekanan penerbit/distributor buku beserta metrik evaluasi SPK (biaya, logistik, termin, reputasi).
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `kode_supplier` (VARCHAR(20), Unique) — Kode identifikasi unik rekanan (SUP-001 s/d SUP-008).
* `nama_supplier` (VARCHAR(255)) — Nama resmi badan usaha penerbit/distributor rekanan.
* `kontak_person` (VARCHAR(255)) — Nama penanggung jawab bagian pemasaran institusi.
* `telepon` (VARCHAR(30)) — Nomor kontak / WhatsApp institusi.
* `email` (VARCHAR(255)) — Alamat surel resmi korespondensi pengadaan.
* `kota_asal` (VARCHAR(255)) — Domisili gudang distribusi / kantor pusat (Jakarta, Yogyakarta, Bandung, Depok, dll.).
* `alamat` (TEXT) — Alamat fisik lengkap kantor/kantor cabang rekanan.
* `rata_rata_harga` (INT UNSIGNED) — Rata-rata harga satuan buku katalog dalam satuan Rupiah (IDR). Kriteria batas harga SPK.
* `estimasi_hari_kirim` (INT UNSIGNED) — Estimasi durasi pengiriman pesanan hingga tiba di perpustakaan (hari kerja). Kriteria batas waktu kirim SPK.
* `biaya_ongkir_per_kg` (INT UNSIGNED) — Tarif ongkos kirim per kilogram (0 jika promosi gratis ongkir institusi).
* `min_order_nominal` (INT UNSIGNED) — Syarat minimum nominal pembelian per faktur.
* `diskon_pengadaan_persen` (DECIMAL(4,1)) — Persentase diskon potongan harga khusus pengadaan perpustakaan perguruan tinggi.
* `garansi_retur_hari` (INT UNSIGNED) — Masa perlindungan pengembalian buku cacat fisik / salah cetak (hari).
* `kebijakan_garansi` (VARCHAR(255)) — Ringkasan klausul jaminan mutu dan penggantian eksemplar cacat.
* `syarat_pembayaran` (VARCHAR(255)) — Skema termin pembayaran (Tempo 30 Hari, Tempo 14 Hari, COD, Transfer Dimuka).
* `rating_keandalan` (DECIMAL(3,1)) — Skor reputasi dan kepatuhan rekanan (skala 1.0 hingga 5.0 bintang).
* `reputasi_catatan` (TEXT, Nullable) — Rekam jejak dan spesialisasi katalog rekanan.
* `is_active` (TINYINT(1), Default 1) — Status keaktifan rekanan dalam basis data.
* `created_at`, `updated_at` (TIMESTAMP)

#### C. Tabel `supplier_kategori` (Pivot / Junction Table)
Relasi *Many-to-Many* antara supplier rekanan dan bidang kategori buku yang disediakan, dilengkapi kapasitas judul katalog.
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `supplier_id` (BIGINT UNSIGNED, Foreign Key -> `suppliers.id`, ON DELETE CASCADE)
* `kategori_id` (BIGINT UNSIGNED, Foreign Key -> `kategori_buku.id`, ON DELETE CASCADE)
* `jumlah_judul_katalog` (INT UNSIGNED) — Estimasi keanekaragaman judul buku yang diterbitkan/didistribusikan.
* `created_at`, `updated_at` (TIMESTAMP)

#### D. Tabel `pengadaan_buku`
Menyimpan paket pengajuan restock dan pengadaan bahan pustaka oleh pengelola perpustakaan.
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `nomor_pengadaan` (VARCHAR(30), Unique) — Kode referensi paket pengadaan (misal: PENG-2026-001).
* `judul_pengadaan` (VARCHAR(255)) — Nama kegiatan atau rincian paket buku yang diadakan.
* `kategori_id` (BIGINT UNSIGNED, Foreign Key -> `kategori_buku.id`) — Klasifikasi bidang buku utama yang dibutuhkan.
* `estimasi_jumlah_eksemplar` (INT UNSIGNED) — Target kuantitas buku yang dipesan.
* `maksimal_harga_satuan` (INT UNSIGNED) — Batas harga satuan tertinggi yang dialokasikan dalam pagu (Plafon SPK).
* `maksimal_hari_kirim` (INT UNSIGNED) — Batas waktu kirim maksimal agar buku tiba sebelum semester perkuliahan dimulai.
* `total_anggaran_pagu` (BIGINT UNSIGNED) — Pagu anggaran maksimal yang disahkan (IDR).
* `status` (VARCHAR(30)) — Status pengadaan (`PROSES_SPK` atau `SELESAI`).
* `selected_supplier_id` (BIGINT UNSIGNED, Nullable, Foreign Key -> `suppliers.id`, ON DELETE SET NULL) — Rekanan pemenang yang ditetapkan.
* `catatan_kebutuhan` (TEXT, Nullable) — Deskripsi spesifik urgensi buku.
* `created_at`, `updated_at` (TIMESTAMP)

#### E. Tabel `keputusan_spk` (Audit Trail & Berita Acara)
Menyimpan jejak audit transparansi pemilihan supplier berbasis matriks pembanding berdampingan.
* `id` (BIGINT UNSIGNED, Primary Key, Auto Increment)
* `pengadaan_id` (BIGINT UNSIGNED, Foreign Key -> `pengadaan_buku.id`, ON DELETE CASCADE)
* `supplier_terpilih_id` (BIGINT UNSIGNED, Foreign Key -> `suppliers.id`) — ID rekanan definitif yang memenangkan pengadaan.
* `supplier_dibandingkan_ids` (JSON) — Array ID seluruh supplier yang dikomparasi secara *side-by-side* pada matriks SPK (misal: `[2, 4, 6]`).
* `alasan_keputusan` (TEXT) — Catatan rasionalisasi pertimbangan pengambil keputusan (trade-off harga vs waktu kirim vs garansi).
* `nama_pengambil_keputusan` (VARCHAR(255)) — Nama pejabat berwenang yang mengesahkan pemilihan.
* `jabatan` (VARCHAR(255)) — Jabatan struktural pejabat pengadaan.
* `tanggal_keputusan` (DATE) — Tanggal pengesahan Berita Acara / Surat Pesanan PO.
* `created_at`, `updated_at` (TIMESTAMP)

---

### 2. SKRIP SQL LENGKAP (DDL & DML SEEDER DATA)

Berikut adalah naskah DDL (*Data Definition Language*) dan DML (*Data Manipulation Language*) lengkap yang telah diuji dan siap diimpor ke server MySQL/MariaDB:

```sql
-- ==============================================================
-- DATABASE: spk_supplier_perpustakaan
-- SISTEM PENDUKUNG KEPUTUSAN PEMILIHAN SUPPLIER BUKU PERPUSTAKAAN
-- FAKULTAS TEKNIK UNIVERSITAS TRUNOJOYO MADURA
-- ==============================================================

CREATE DATABASE IF NOT EXISTS `spk_supplier_perpustakaan`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `spk_supplier_perpustakaan`;

-- 1. Tabel kategori_buku
DROP TABLE IF EXISTS `supplier_kategori`;
DROP TABLE IF EXISTS `keputusan_spk`;
DROP TABLE IF EXISTS `pengadaan_buku`;
DROP TABLE IF EXISTS `suppliers`;
DROP TABLE IF EXISTS `kategori_buku`;

CREATE TABLE `kategori_buku` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kode` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'book',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kategori_buku_kode_unique` (`kode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel suppliers
CREATE TABLE `suppliers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kode_supplier` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_supplier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kontak_person` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kota_asal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rata_rata_harga` int unsigned NOT NULL,
  `estimasi_hari_kirim` int unsigned NOT NULL,
  `biaya_ongkir_per_kg` int unsigned NOT NULL DEFAULT '0',
  `min_order_nominal` int unsigned NOT NULL DEFAULT '0',
  `diskon_pengadaan_persen` decimal(4,1) NOT NULL DEFAULT '0.0',
  `garansi_retur_hari` int unsigned NOT NULL DEFAULT '14',
  `kebijakan_garansi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `syarat_pembayaran` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating_keandalan` decimal(3,1) NOT NULL DEFAULT '4.5',
  `reputasi_catatan` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `suppliers_kode_supplier_unique` (`kode_supplier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabel supplier_kategori
CREATE TABLE `supplier_kategori` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` bigint unsigned NOT NULL,
  `kategori_id` bigint unsigned NOT NULL,
  `jumlah_judul_katalog` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_kategori_supplier_id_foreign` (`supplier_id`),
  KEY `supplier_kategori_kategori_id_foreign` (`kategori_id`),
  CONSTRAINT `supplier_kategori_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_buku` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supplier_kategori_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Tabel pengadaan_buku
CREATE TABLE `pengadaan_buku` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nomor_pengadaan` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `judul_pengadaan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori_id` bigint unsigned NOT NULL,
  `estimasi_jumlah_eksemplar` int unsigned NOT NULL,
  `maksimal_harga_satuan` int unsigned NOT NULL,
  `maksimal_hari_kirim` int unsigned NOT NULL,
  `total_anggaran_pagu` bigint unsigned NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PROSES_SPK',
  `selected_supplier_id` bigint unsigned DEFAULT NULL,
  `catatan_kebutuhan` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pengadaan_buku_nomor_pengadaan_unique` (`nomor_pengadaan`),
  KEY `pengadaan_buku_kategori_id_foreign` (`kategori_id`),
  KEY `pengadaan_buku_selected_supplier_id_foreign` (`selected_supplier_id`),
  CONSTRAINT `pengadaan_buku_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_buku` (`id`),
  CONSTRAINT `pengadaan_buku_selected_supplier_id_foreign` FOREIGN KEY (`selected_supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Tabel keputusan_spk
CREATE TABLE `keputusan_spk` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `pengadaan_id` bigint unsigned NOT NULL,
  `supplier_terpilih_id` bigint unsigned NOT NULL,
  `supplier_dibandingkan_ids` json NOT NULL,
  `alasan_keputusan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_pengambil_keputusan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jabatan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Kepala Bagian Pengadaan Perpustakaan',
  `tanggal_keputusan` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `keputusan_spk_pengadaan_id_foreign` (`pengadaan_id`),
  KEY `keputusan_spk_supplier_terpilih_id_foreign` (`supplier_terpilih_id`),
  CONSTRAINT `keputusan_spk_pengadaan_id_foreign` FOREIGN KEY (`pengadaan_id`) REFERENCES `pengadaan_buku` (`id`) ON DELETE CASCADE,
  CONSTRAINT `keputusan_spk_supplier_terpilih_id_foreign` FOREIGN KEY (`supplier_terpilih_id`) REFERENCES `suppliers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================
-- DML: DATA SEEDER AWAL
-- ==============================================================

INSERT INTO `kategori_buku` (`id`, `kode`, `nama_kategori`, `deskripsi`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'KOM', 'Teknologi & Ilmu Komputer', 'Koleksi rekayasa perangkat lunak, sistem informasi, AI, basis data, dan jaringan.', 'cpu', NOW(), NOW()),
(2, 'SAINS', 'Sains & Matematika', 'Koleksi matematika murni, fisika, kimia, biologi, dan statistika terapan.', 'activity', NOW(), NOW()),
(3, 'EKO', 'Ekonomi & Manajemen Bisnis', 'Koleksi akuntansi, manajemen keuangan, pemasaran digital, dan kewirausahaan.', 'trending-up', NOW(), NOW()),
(4, 'SOS', 'Sosial & Humaniora', 'Koleksi sosiologi, komunikasi massa, hukum, ilmu politik, dan filsafat ilmu.', 'users', NOW(), NOW()),
(5, 'MED', 'Kesehatan & Kedokteran', 'Koleksi keperawatan, farmasi klinis, kesehatan masyarakat, dan kedokteran umum.', 'heart', NOW(), NOW()),
(6, 'SAS', 'Bahasa & Sastra', 'Koleksi linguistik bahasa Indonesia, Inggris, sastra klasik, dan kepenulisan ilmiah.', 'book-open', NOW(), NOW()),
(7, 'REF', 'Referensi Umum & Ensiklopedia', 'Koleksi kamus standar, ensiklopedia tematik, handbook teknik, dan standar ISO.', 'bookmark', NOW(), NOW());

INSERT INTO `suppliers` (`id`, `kode_supplier`, `nama_supplier`, `kontak_person`, `telepon`, `email`, `kota_asal`, `alamat`, `rata_rata_harga`, `estimasi_hari_kirim`, `biaya_ongkir_per_kg`, `min_order_nominal`, `diskon_pengadaan_persen`, `garansi_retur_hari`, `kebijakan_garansi`, `syarat_pembayaran`, `rating_keandalan`, `reputasi_catatan`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'SUP-001', 'PT Gramedia Asri Media', 'Budi Santoso, S.Kom.', '021-53650110', 'institutional.sales@gramedia.id', 'Jakarta Barat', 'Jl. Palmerah Selatan No. 22-28, Gelora, Tanah Abang, Jakarta Pusat', 95000, 4, 12000, 1500000, 20.0, 30, '100% Ganti Baru & Free Return Shipping', 'Tempo 30 Hari', 4.9, 'Jaringan distributor nasional terbesar, katalog terbitan internasional dan nasional terlengkap.', 1, NOW(), NOW()),
(2, 'SUP-002', 'CV Andi Offset (Penerbit Andi)', 'Ratna Dewi Kusuma', '0274-561881', 'pemasaran@andioffset.com', 'Yogyakarta', 'Jl. Beo No. 38-40, Demangan Baru, Caturtunggal, Depok, Sleman, D.I. Yogyakarta', 78000, 3, 9000, 750000, 25.0, 21, 'Ganti Baru untuk buku cacat cetak & halaman terbalik', 'Tempo 30 Hari', 4.8, 'Pelopor buku IT, sains komputasi, dan teknik di Indonesia dengan harga mahasiswa kompetitif.', 1, NOW(), NOW()),
(3, 'SUP-003', 'Penerbit Erlangga Mahameru', 'Hendro Prabowo', '021-8717085', 'layanan.kampus@erlangga.co.id', 'Jakarta Timur', 'Jl. H. Baping Raya No. 100, Ciracas, Pasar Rebo, Jakarta Timur', 115000, 5, 14000, 2000000, 22.5, 30, 'Penggantian unit cacat maksimal 3 hari kerja setelah laporan klaim', 'Tempo 14 Hari', 4.7, 'Buku teks standar universitas, lisensi terjemahan Pearson & McGraw-Hill terakreditasi.', 1, NOW(), NOW()),
(4, 'SUP-004', 'Deepublish Publisher (CV Budi Utama)', 'Tri Wahyuni, M.Si.', '0274-4533427', 'pengadaan@deepublish.co.id', 'Yogyakarta', 'Jl. Rajawali, Gg. Elang 6 No. 3, Drono, Sardonoharjo, Ngaglik, Sleman, DIY', 72000, 2, 0, 500000, 30.0, 14, 'Free return langsung print ulang spesimen cacat', 'Tempo 30 Hari', 4.6, 'Penerbit spesialis buku ajar dan referensi dosen perguruan tinggi se-Indonesia, waktu kirim ekspres.', 1, NOW(), NOW()),
(5, 'SUP-005', 'Salemba Empat (Salemba Medika / Humanika)', 'Ahmad Faisal', '021-7818616', 'distribusi@penerbitsalemba.com', 'Jakarta Selatan', 'Jl. Raya Lenteng Agung No. 101, Jagakarsa, Jakarta Selatan', 105000, 4, 11000, 1000000, 18.0, 20, 'Klaim retur via portal web 20 hari', 'Tempo 14 Hari', 4.6, 'Rujukan utama buku bidang ekonomi, akuntansi, perpajakan, keperawatan, dan kebidanan.', 1, NOW(), NOW()),
(6, 'SUP-006', 'Graha Ilmu Publisher', 'Siti Nurhayati', '0274-4462190', 'sales@grahailmu.co.id', 'Yogyakarta', 'Ruko Candi Indah Blok A No. 3, Jl. Kaliurang Km 12.5, Sleman, Yogyakarta', 69000, 3, 8000, 600000, 28.0, 14, 'Retur 14 hari kerja dengan bukti unboxing', 'COD / Cash On Delivery', 4.4, 'Harga paling terjangkau untuk buku monograf sains komputer, elektronika, dan metodologi riset.', 1, NOW(), NOW()),
(7, 'SUP-007', 'Mizan Pustaka Mandiri (Mizan Group)', 'Dimas Wicaksono', '022-7834310', 'partnership@mizan.com', 'Bandung', 'Jl. Cinambo No. 135, Cisaranten Wetan, Cinambo, Kota Bandung, Jawa Barat', 82000, 4, 10000, 800000, 25.0, 25, '100% Penggantian buku rijek cetak / cover rusak', 'Tempo 30 Hari', 4.8, 'Koleksi humaniora, filsafat kontemporer, kajian Islam, dan literatur sastra terbaik.', 1, NOW(), NOW()),
(8, 'SUP-008', 'Distributor Buku Rajawali Pers (Rajagrafindo)', 'Farida Anggraini', '021-87794420', 'rajawali@rajagrafindo.co.id', 'Depok', 'Jl. Raya Leuwinanggung No. 112, Tapos, Kota Depok, Jawa Barat', 88000, 5, 11000, 1000000, 20.0, 14, 'Retur cacat fisik penggantian buku baru 14 hari', 'Transfer Dimuka', 4.3, 'Fokus literatur ilmu hukum, administrasi publik, kepustakaan, dan ilmu sosial dasar.', 1, NOW(), NOW());

INSERT INTO `pengadaan_buku` (`id`, `nomor_pengadaan`, `judul_pengadaan`, `kategori_id`, `estimasi_jumlah_eksemplar`, `maksimal_harga_satuan`, `maksimal_hari_kirim`, `total_anggaran_pagu`, `status`, `selected_supplier_id`, `catatan_kebutuhan`, `created_at`, `updated_at`) VALUES
(1, 'PENG-2026-001', 'Pengadaan Koleksi Buku Teks AI, Rekayasa Perangkat Lunak & Basis Data Semester Genap', 1, 120, 85000, 4, 10200000, 'SELESAI', 2, 'Koleksi wajib tersedia sebelum perkuliahan dimulai pada minggu pertama Februari.', NOW(), NOW()),
(2, 'PENG-2026-002', 'Pengadaan Buku Teks Manajemen Bisnis Digital & Technopreneurship', 3, 90, 100000, 5, 9000000, 'PROSES_SPK', NULL, 'Dibutuhkan untuk penambahan akreditasi laboratorium inovasi bisnis mahasiswa Fakultas Teknik.', NOW(), NOW()),
(3, 'PENG-2026-003', 'Pengadaan Koleksi Referensi Sosiologi & Komunikasi Sains Humaniora', 4, 80, 90000, 4, 7200000, 'PROSES_SPK', NULL, 'Dipersiapkan untuk penunjang riset kolaboratif mahasiswa tingkat akhir.', NOW(), NOW());

INSERT INTO `keputusan_spk` (`id`, `pengadaan_id`, `supplier_terpilih_id`, `supplier_dibandingkan_ids`, `alasan_keputusan`, `nama_pengambil_keputusan`, `jabatan`, `tanggal_keputusan`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '[2, 4, 6]', 'Berdasarkan komparasi berdampingan kriteria batas harga (maks Rp 85.000) dan waktu kirim (maks 4 hari): CV Andi Offset terpilih karena menawarkan katalog buku IT terlengkap (680 judul) dengan harga rata-rata Rp 78.000 (di bawah pagu), estimasi kirim 3 hari, diskon institusi 25%, garansi retur 21 hari, serta fleksibilitas pembayaran Tempo 30 Hari yang sesuai dengan siklus pencairan kas perpustakaan UTM.', 'Achmad Ali Ridho, S.Kom., M.T.', 'Kepala Bidang Akuisisi & Pengadaan Bahan Pustaka', '2026-11-08', NOW(), NOW());
```

---

*File basis data mandiri berekstensi `.sql` juga tersedia secara terpisah pada direktori proyek dengan nama berkas: `spk_supplier_perpustakaan.sql`.*
