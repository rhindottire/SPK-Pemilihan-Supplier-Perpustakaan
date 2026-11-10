-- MySQL dump 10.13  Distrib 9.6.0, for Linux (x86_64)
--
-- Host: localhost    Database: spk_supplier_perpustakaan
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '7c4ce003-c6b5-11f1-9445-b6246f22dff0:1-2489';

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategori_buku`
--

DROP TABLE IF EXISTS `kategori_buku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori_buku`
--

LOCK TABLES `kategori_buku` WRITE;
/*!40000 ALTER TABLE `kategori_buku` DISABLE KEYS */;
INSERT INTO `kategori_buku` VALUES (1,'KOM','Teknologi & Ilmu Komputer','Koleksi rekayasa perangkat lunak, sistem informasi, kecerdasan buatan, basis data, dan jaringan.','cpu','2026-11-10 06:23:06','2026-11-10 06:23:06'),(2,'SAINS','Sains & Matematika','Koleksi matematika murni, fisika, kimia, biologi, dan statistika terapan.','activity','2026-11-10 06:23:06','2026-11-10 06:23:06'),(3,'EKO','Ekonomi & Manajemen Bisnis','Koleksi akuntansi, manajemen keuangan, pemasaran digital, dan technopreneurship.','trending-up','2026-11-10 06:23:06','2026-11-10 06:23:06'),(4,'SOS','Sosial & Humaniora','Koleksi sosiologi, komunikasi massa, hukum, ilmu politik, dan filsafat ilmu.','users','2026-11-10 06:23:06','2026-11-10 06:23:06'),(5,'MED','Kesehatan & Kedokteran','Koleksi keperawatan, farmasi klinis, kesehatan masyarakat, dan kedokteran umum.','heart','2026-11-10 06:23:07','2026-11-10 06:23:07'),(6,'SAS','Bahasa & Sastra','Koleksi linguistik bahasa Indonesia, Inggris, sastra klasik, dan kepenulisan ilmiah.','book-open','2026-11-10 06:23:07','2026-11-10 06:23:07'),(7,'REF','Referensi Umum & Ensiklopedia','Koleksi kamus standar, ensiklopedia tematik, handbook keinsinyuran, dan manual standar ISO.','bookmark','2026-11-10 06:23:07','2026-11-10 06:23:07');
/*!40000 ALTER TABLE `kategori_buku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keputusan_spk`
--

DROP TABLE IF EXISTS `keputusan_spk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keputusan_spk`
--

LOCK TABLES `keputusan_spk` WRITE;
/*!40000 ALTER TABLE `keputusan_spk` DISABLE KEYS */;
INSERT INTO `keputusan_spk` VALUES (1,1,2,'[2, 4, 6]','Berdasarkan komparasi berdampingan kriteria batas harga (maks Rp 85.000) dan waktu kirim (maks 4 hari): CV Andi Offset terpilih karena menawarkan katalog buku IT terlengkap (680 judul) dengan harga rata-rata Rp 78.000 (di bawah pagu), estimasi kirim 3 hari, diskon institusi 25%, garansi retur 21 hari, serta fleksibilitas pembayaran Tempo 30 Hari yang sesuai dengan siklus pencairan kas perpustakaan UTM.','Achmad Ali Ridho, S.Kom., M.T.','Kepala Bidang Akuisisi & Pengadaan Bahan Pustaka','2026-11-08','2026-11-10 06:23:07','2026-11-10 06:23:07');
/*!40000 ALTER TABLE `keputusan_spk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_11_10_000001_create_spk_supplier_tables',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengadaan_buku`
--

DROP TABLE IF EXISTS `pengadaan_buku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengadaan_buku`
--

LOCK TABLES `pengadaan_buku` WRITE;
/*!40000 ALTER TABLE `pengadaan_buku` DISABLE KEYS */;
INSERT INTO `pengadaan_buku` VALUES (1,'PENG-2026-001','Pengadaan Koleksi Buku Teks AI, Rekayasa Perangkat Lunak & Basis Data Semester Genap',1,120,85000,4,10200000,'SELESAI',2,'Koleksi wajib tersedia sebelum perkuliahan dimulai pada minggu pertama Februari. Prioritaskan supplier dengan opsi tempo dan garansi ganti baru.','2026-11-10 06:23:07','2026-11-10 06:23:07'),(2,'PENG-2026-002','Pengadaan Buku Teks Manajemen Bisnis Digital & Technopreneurship',3,90,100000,5,9000000,'PROSES_SPK',NULL,'Dibutuhkan untuk penambahan akreditasi laboratorium inovasi bisnis mahasiswa Fakultas Teknik.','2026-11-10 06:23:07','2026-11-10 06:23:07'),(3,'PENG-2026-003','Pengadaan Koleksi Referensi Sosiologi & Komunikasi Sains Humaniora',4,80,90000,4,7200000,'PROSES_SPK',NULL,'Dipersiapkan untuk penunjang riset kolaboratif mahasiswa tingkat akhir.','2026-11-10 06:23:07','2026-11-10 06:23:07');
/*!40000 ALTER TABLE `pengadaan_buku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_kategori`
--

DROP TABLE IF EXISTS `supplier_kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_kategori`
--

LOCK TABLES `supplier_kategori` WRITE;
/*!40000 ALTER TABLE `supplier_kategori` DISABLE KEYS */;
INSERT INTO `supplier_kategori` VALUES (1,1,1,420,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(2,1,2,310,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(3,1,3,540,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(4,1,4,280,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(5,1,6,350,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(6,1,7,150,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(7,2,1,680,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(8,2,2,290,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(9,2,3,210,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(10,2,7,90,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(11,3,2,480,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(12,3,3,410,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(13,3,5,230,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(14,3,1,190,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(15,3,7,180,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(16,4,1,350,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(17,4,2,420,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(18,4,4,510,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(19,4,3,380,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(20,4,5,190,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(21,4,6,260,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(22,5,3,620,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(23,5,5,340,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(24,5,4,180,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(25,6,1,490,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(26,6,2,320,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(27,6,3,240,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(28,6,4,160,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(29,7,4,590,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(30,7,6,640,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(31,7,7,220,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(32,8,4,610,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(33,8,3,290,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(34,8,7,170,'2026-11-10 06:23:07','2026-11-10 06:23:07');
/*!40000 ALTER TABLE `supplier_kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'SUP-001','PT Gramedia Asri Media','Budi Santoso, S.Kom.','021-53650110','institutional.sales@gramedia.id','Jakarta Barat','Jl. Palmerah Selatan No. 22-28, Gelora, Tanah Abang, Jakarta Pusat',95000,4,12000,1500000,20.0,30,'100% Ganti Baru & Free Return Shipping','Tempo 30 Hari',4.9,'Jaringan distributor nasional terbesar, katalog terbitan internasional dan nasional terlengkap.',1,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(2,'SUP-002','CV Andi Offset (Penerbit Andi)','Ratna Dewi Kusuma','0274-561881','pemasaran@andioffset.com','Yogyakarta','Jl. Beo No. 38-40, Demangan Baru, Caturtunggal, Depok, Sleman, D.I. Yogyakarta',78000,3,9000,750000,25.0,21,'Ganti Baru untuk buku cacat cetak & halaman terbalik','Tempo 30 Hari',4.8,'Pelopor buku IT, sains komputasi, dan teknik di Indonesia dengan harga mahasiswa kompetitif.',1,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(3,'SUP-003','Penerbit Erlangga Mahameru','Hendro Prabowo','021-8717085','layanan.kampus@erlangga.co.id','Jakarta Timur','Jl. H. Baping Raya No. 100, Ciracas, Pasar Rebo, Jakarta Timur',115000,5,14000,2000000,22.5,30,'Penggantian unit cacat maksimal 3 hari kerja setelah laporan klaim','Tempo 14 Hari',4.7,'Buku teks standar universitas, lisensi terjemahan Pearson & McGraw-Hill terakreditasi.',1,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(4,'SUP-004','Deepublish Publisher (CV Budi Utama)','Tri Wahyuni, M.Si.','0274-4533427','pengadaan@deepublish.co.id','Yogyakarta','Jl. Rajawali, Gg. Elang 6 No. 3, Drono, Sardonoharjo, Ngaglik, Sleman, DIY',72000,2,0,500000,30.0,14,'Free return langsung print ulang spesimen cacat','Tempo 30 Hari',4.6,'Penerbit spesialis buku ajar dan referensi dosen perguruan tinggi se-Indonesia, waktu kirim ekspres.',1,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(5,'SUP-005','Salemba Empat (Salemba Medika / Humanika)','Ahmad Faisal','021-7818616','distribusi@penerbitsalemba.com','Jakarta Selatan','Jl. Raya Lenteng Agung No. 101, Jagakarsa, Jakarta Selatan',105000,4,11000,1000000,18.0,20,'Klaim retur via portal web 20 hari','Tempo 14 Hari',4.6,'Rujukan utama buku bidang ekonomi, akuntansi, perpajakan, keperawatan, dan kebidanan.',1,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(6,'SUP-006','Graha Ilmu Publisher','Siti Nurhayati','0274-4462190','sales@grahailmu.co.id','Yogyakarta','Ruko Candi Indah Blok A No. 3, Jl. Kaliurang Km 12.5, Sleman, Yogyakarta',69000,3,8000,600000,28.0,14,'Retur 14 hari kerja dengan bukti unboxing','COD / Cash On Delivery',4.4,'Harga paling terjangkau untuk buku monograf sains komputer, elektronika, dan metodologi riset.',1,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(7,'SUP-007','Mizan Pustaka Mandiri (Mizan Group)','Dimas Wicaksono','022-7834310','partnership@mizan.com','Bandung','Jl. Cinambo No. 135, Cisaranten Wetan, Cinambo, Kota Bandung, Jawa Barat',82000,4,10000,800000,25.0,25,'100% Penggantian buku rijek cetak / cover rusak','Tempo 30 Hari',4.8,'Koleksi humaniora, filsafat kontemporer, kajian Islam, dan literatur sastra terbaik.',1,'2026-11-10 06:23:07','2026-11-10 06:23:07'),(8,'SUP-008','Distributor Buku Rajawali Pers (Rajagrafindo)','Farida Anggraini','021-87794420','rajawali@rajagrafindo.co.id','Depok','Jl. Raya Leuwinanggung No. 112, Tapos, Kota Depok, Jawa Barat',88000,5,11000,1000000,20.0,14,'Retur cacat fisik penggantian buku baru 14 hari','Transfer Dimuka',4.3,'Fokus literatur ilmu hukum, administrasi publik, kepustakaan, dan ilmu sosial dasar.',1,'2026-11-10 06:23:07','2026-11-10 06:23:07');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `nim` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_nim_index` (`nim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-10  6:23:27
