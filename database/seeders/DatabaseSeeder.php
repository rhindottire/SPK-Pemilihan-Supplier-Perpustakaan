<?php

namespace Database\Seeders;

use App\Models\KategoriBuku;
use App\Models\KeputusanSpk;
use App\Models\PengadaanBuku;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Kategori Buku
        $kategoriData = [
            [
                'kode' => 'KOM',
                'nama_kategori' => 'Teknologi & Ilmu Komputer',
                'deskripsi' => 'Koleksi rekayasa perangkat lunak, sistem informasi, kecerdasan buatan, basis data, dan jaringan.',
                'icon' => 'cpu',
            ],
            [
                'kode' => 'SAINS',
                'nama_kategori' => 'Sains & Matematika',
                'deskripsi' => 'Koleksi matematika murni, fisika, kimia, biologi, dan statistika terapan.',
                'icon' => 'activity',
            ],
            [
                'kode' => 'EKO',
                'nama_kategori' => 'Ekonomi & Manajemen Bisnis',
                'deskripsi' => 'Koleksi akuntansi, manajemen keuangan, pemasaran digital, dan technopreneurship.',
                'icon' => 'trending-up',
            ],
            [
                'kode' => 'SOS',
                'nama_kategori' => 'Sosial & Humaniora',
                'deskripsi' => 'Koleksi sosiologi, komunikasi massa, hukum, ilmu politik, dan filsafat ilmu.',
                'icon' => 'users',
            ],
            [
                'kode' => 'MED',
                'nama_kategori' => 'Kesehatan & Kedokteran',
                'deskripsi' => 'Koleksi keperawatan, farmasi klinis, kesehatan masyarakat, dan kedokteran umum.',
                'icon' => 'heart',
            ],
            [
                'kode' => 'SAS',
                'nama_kategori' => 'Bahasa & Sastra',
                'deskripsi' => 'Koleksi linguistik bahasa Indonesia, Inggris, sastra klasik, dan kepenulisan ilmiah.',
                'icon' => 'book-open',
            ],
            [
                'kode' => 'REF',
                'nama_kategori' => 'Referensi Umum & Ensiklopedia',
                'deskripsi' => 'Koleksi kamus standar, ensiklopedia tematik, handbook keinsinyuran, dan manual standar ISO.',
                'icon' => 'bookmark',
            ],
        ];

        $kategoriModels = [];
        foreach ($kategoriData as $k) {
            $kategoriModels[$k['kode']] = KategoriBuku::create($k);
        }

        // 2. Data Supplier Realistis
        $suppliers = [
            [
                'kode_supplier' => 'SUP-001',
                'nama_supplier' => 'PT Gramedia Asri Media',
                'kontak_person' => 'Budi Santoso, S.Kom.',
                'telepon' => '021-53650110',
                'email' => 'institutional.sales@gramedia.id',
                'kota_asal' => 'Jakarta Barat',
                'alamat' => 'Jl. Palmerah Selatan No. 22-28, Gelora, Tanah Abang, Jakarta Pusat',
                'rata_rata_harga' => 95000,
                'estimasi_hari_kirim' => 4,
                'biaya_ongkir_per_kg' => 12000,
                'min_order_nominal' => 1500000,
                'diskon_pengadaan_persen' => 20.0,
                'garansi_retur_hari' => 30,
                'kebijakan_garansi' => '100% Ganti Baru & Free Return Shipping',
                'syarat_pembayaran' => 'Tempo 30 Hari',
                'rating_keandalan' => 4.9,
                'reputasi_catatan' => 'Jaringan distributor nasional terbesar, katalog terbitan internasional dan nasional terlengkap.',
                'katalog' => ['KOM' => 420, 'SAINS' => 310, 'EKO' => 540, 'SOS' => 280, 'SAS' => 350, 'REF' => 150],
            ],
            [
                'kode_supplier' => 'SUP-002',
                'nama_supplier' => 'CV Andi Offset (Penerbit Andi)',
                'kontak_person' => 'Ratna Dewi Kusuma',
                'telepon' => '0274-561881',
                'email' => 'pemasaran@andioffset.com',
                'kota_asal' => 'Yogyakarta',
                'alamat' => 'Jl. Beo No. 38-40, Demangan Baru, Caturtunggal, Depok, Sleman, D.I. Yogyakarta',
                'rata_rata_harga' => 78000,
                'estimasi_hari_kirim' => 3,
                'biaya_ongkir_per_kg' => 9000,
                'min_order_nominal' => 750000,
                'diskon_pengadaan_persen' => 25.0,
                'garansi_retur_hari' => 21,
                'kebijakan_garansi' => 'Ganti Baru untuk buku cacat cetak & halaman terbalik',
                'syarat_pembayaran' => 'Tempo 30 Hari',
                'rating_keandalan' => 4.8,
                'reputasi_catatan' => 'Pelopor buku IT, sains komputasi, dan teknik di Indonesia dengan harga mahasiswa kompetitif.',
                'katalog' => ['KOM' => 680, 'SAINS' => 290, 'EKO' => 210, 'REF' => 90],
            ],
            [
                'kode_supplier' => 'SUP-003',
                'nama_supplier' => 'Penerbit Erlangga Mahameru',
                'kontak_person' => 'Hendro Prabowo',
                'telepon' => '021-8717085',
                'email' => 'layanan.kampus@erlangga.co.id',
                'kota_asal' => 'Jakarta Timur',
                'alamat' => 'Jl. H. Baping Raya No. 100, Ciracas, Pasar Rebo, Jakarta Timur',
                'rata_rata_harga' => 115000,
                'estimasi_hari_kirim' => 5,
                'biaya_ongkir_per_kg' => 14000,
                'min_order_nominal' => 2000000,
                'diskon_pengadaan_persen' => 22.5,
                'garansi_retur_hari' => 30,
                'kebijakan_garansi' => 'Penggantian unit cacat maksimal 3 hari kerja setelah laporan klaim',
                'syarat_pembayaran' => 'Tempo 14 Hari',
                'rating_keandalan' => 4.7,
                'reputasi_catatan' => 'Buku teks standar universitas, lisensi terjemahan Pearson & McGraw-Hill terakreditasi.',
                'katalog' => ['SAINS' => 480, 'EKO' => 410, 'MED' => 230, 'KOM' => 190, 'REF' => 180],
            ],
            [
                'kode_supplier' => 'SUP-004',
                'nama_supplier' => 'Deepublish Publisher (CV Budi Utama)',
                'kontak_person' => 'Tri Wahyuni, M.Si.',
                'telepon' => '0274-4533427',
                'email' => 'pengadaan@deepublish.co.id',
                'kota_asal' => 'Yogyakarta',
                'alamat' => 'Jl. Rajawali, Gg. Elang 6 No. 3, Drono, Sardonoharjo, Ngaglik, Sleman, DIY',
                'rata_rata_harga' => 72000,
                'estimasi_hari_kirim' => 2,
                'biaya_ongkir_per_kg' => 0,
                'min_order_nominal' => 500000,
                'diskon_pengadaan_persen' => 30.0,
                'garansi_retur_hari' => 14,
                'kebijakan_garansi' => 'Free return langsung print ulang spesimen cacat',
                'syarat_pembayaran' => 'Tempo 30 Hari',
                'rating_keandalan' => 4.6,
                'reputasi_catatan' => 'Penerbit spesialis buku ajar dan referensi dosen perguruan tinggi se-Indonesia, waktu kirim ekspres.',
                'katalog' => ['KOM' => 350, 'SAINS' => 420, 'SOS' => 510, 'EKO' => 380, 'MED' => 190, 'SAS' => 260],
            ],
            [
                'kode_supplier' => 'SUP-005',
                'nama_supplier' => 'Salemba Empat (Salemba Medika / Humanika)',
                'kontak_person' => 'Ahmad Faisal',
                'telepon' => '021-7818616',
                'email' => 'distribusi@penerbitsalemba.com',
                'kota_asal' => 'Jakarta Selatan',
                'alamat' => 'Jl. Raya Lenteng Agung No. 101, Jagakarsa, Jakarta Selatan',
                'rata_rata_harga' => 105000,
                'estimasi_hari_kirim' => 4,
                'biaya_ongkir_per_kg' => 11000,
                'min_order_nominal' => 1000000,
                'diskon_pengadaan_persen' => 18.0,
                'garansi_retur_hari' => 20,
                'kebijakan_garansi' => 'Klaim retur via portal web 20 hari',
                'syarat_pembayaran' => 'Tempo 14 Hari',
                'rating_keandalan' => 4.6,
                'reputasi_catatan' => 'Rujukan utama buku bidang ekonomi, akuntansi, perpajakan, keperawatan, dan kebidanan.',
                'katalog' => ['EKO' => 620, 'MED' => 340, 'SOS' => 180],
            ],
            [
                'kode_supplier' => 'SUP-006',
                'nama_supplier' => 'Graha Ilmu Publisher',
                'kontak_person' => 'Siti Nurhayati',
                'telepon' => '0274-4462190',
                'email' => 'sales@grahailmu.co.id',
                'kota_asal' => 'Yogyakarta',
                'alamat' => 'Ruko Candi Indah Blok A No. 3, Jl. Kaliurang Km 12.5, Sleman, Yogyakarta',
                'rata_rata_harga' => 69000,
                'estimasi_hari_kirim' => 3,
                'biaya_ongkir_per_kg' => 8000,
                'min_order_nominal' => 600000,
                'diskon_pengadaan_persen' => 28.0,
                'garansi_retur_hari' => 14,
                'kebijakan_garansi' => 'Retur 14 hari kerja dengan bukti unboxing',
                'syarat_pembayaran' => 'COD / Cash On Delivery',
                'rating_keandalan' => 4.4,
                'reputasi_catatan' => 'Harga paling terjangkau untuk buku monograf sains komputer, elektronika, dan metodologi riset.',
                'katalog' => ['KOM' => 490, 'SAINS' => 320, 'EKO' => 240, 'SOS' => 160],
            ],
            [
                'kode_supplier' => 'SUP-007',
                'nama_supplier' => 'Mizan Pustaka Mandiri (Mizan Group)',
                'kontak_person' => 'Dimas Wicaksono',
                'telepon' => '022-7834310',
                'email' => 'partnership@mizan.com',
                'kota_asal' => 'Bandung',
                'alamat' => 'Jl. Cinambo No. 135, Cisaranten Wetan, Cinambo, Kota Bandung, Jawa Barat',
                'rata_rata_harga' => 82000,
                'estimasi_hari_kirim' => 4,
                'biaya_ongkir_per_kg' => 10000,
                'min_order_nominal' => 800000,
                'diskon_pengadaan_persen' => 25.0,
                'garansi_retur_hari' => 25,
                'kebijakan_garansi' => '100% Penggantian buku rijek cetak / cover rusak',
                'syarat_pembayaran' => 'Tempo 30 Hari',
                'rating_keandalan' => 4.8,
                'reputasi_catatan' => 'Koleksi humaniora, filsafat kontemporer, kajian Islam, dan literatur sastra terbaik.',
                'katalog' => ['SOS' => 590, 'SAS' => 640, 'REF' => 220],
            ],
            [
                'kode_supplier' => 'SUP-008',
                'nama_supplier' => 'Distributor Buku Rajawali Pers (Rajagrafindo)',
                'kontak_person' => 'Farida Anggraini',
                'telepon' => '021-87794420',
                'email' => 'rajawali@rajagrafindo.co.id',
                'kota_asal' => 'Depok',
                'alamat' => 'Jl. Raya Leuwinanggung No. 112, Tapos, Kota Depok, Jawa Barat',
                'rata_rata_harga' => 88000,
                'estimasi_hari_kirim' => 5,
                'biaya_ongkir_per_kg' => 11000,
                'min_order_nominal' => 1000000,
                'diskon_pengadaan_persen' => 20.0,
                'garansi_retur_hari' => 14,
                'kebijakan_garansi' => 'Retur cacat fisik penggantian buku baru 14 hari',
                'syarat_pembayaran' => 'Transfer Dimuka',
                'rating_keandalan' => 4.3,
                'reputasi_catatan' => 'Fokus literatur ilmu hukum, administrasi publik, kepustakaan, dan ilmu sosial dasar.',
                'katalog' => ['SOS' => 610, 'EKO' => 290, 'REF' => 170],
            ],
        ];

        $createdSuppliers = [];
        foreach ($suppliers as $s) {
            $katalog = $s['katalog'];
            unset($s['katalog']);

            $supplierModel = Supplier::create($s);
            $createdSuppliers[] = $supplierModel;

            foreach ($katalog as $kodeKategori => $jumlah) {
                if (isset($kategoriModels[$kodeKategori])) {
                    $supplierModel->kategori()->attach($kategoriModels[$kodeKategori]->id, [
                        'jumlah_judul_katalog' => $jumlah,
                    ]);
                }
            }
        }

        // 3. Paket Pengadaan Buku
        $komKategori = $kategoriModels['KOM'];
        $ekoKategori = $kategoriModels['EKO'];
        $sosKategori = $kategoriModels['SOS'];
        $andiOffset = $createdSuppliers[1]; // CV Andi Offset

        $pengadaan1 = PengadaanBuku::create([
            'nomor_pengadaan' => 'PENG-2026-001',
            'judul_pengadaan' => 'Pengadaan Koleksi Buku Teks AI, Rekayasa Perangkat Lunak & Basis Data Semester Genap',
            'kategori_id' => $komKategori->id,
            'estimasi_jumlah_eksemplar' => 120,
            'maksimal_harga_satuan' => 85000,
            'maksimal_hari_kirim' => 4,
            'total_anggaran_pagu' => 10200000,
            'status' => 'SELESAI',
            'selected_supplier_id' => $andiOffset->id,
            'catatan_kebutuhan' => 'Koleksi wajib tersedia sebelum perkuliahan dimulai pada minggu pertama Februari. Prioritaskan supplier dengan opsi tempo dan garansi ganti baru.',
        ]);

        KeputusanSpk::create([
            'pengadaan_id' => $pengadaan1->id,
            'supplier_terpilih_id' => $andiOffset->id,
            'supplier_dibandingkan_ids' => [$andiOffset->id, $createdSuppliers[3]->id, $createdSuppliers[5]->id],
            'alasan_keputusan' => 'Berdasarkan komparasi berdampingan kriteria batas harga (maks Rp 85.000) dan waktu kirim (maks 4 hari): CV Andi Offset terpilih karena menawarkan katalog buku IT terlengkap (680 judul) dengan harga rata-rata Rp 78.000 (di bawah pagu), estimasi kirim 3 hari, diskon institusi 25%, garansi retur 21 hari, serta fleksibilitas pembayaran Tempo 30 Hari yang sesuai dengan siklus pencairan kas perpustakaan UTM.',
            'nama_pengambil_keputusan' => 'Achmad Ali Ridho, S.Kom., M.T.',
            'jabatan' => 'Kepala Bidang Akuisisi & Pengadaan Bahan Pustaka',
            'tanggal_keputusan' => '2026-11-08',
        ]);

        PengadaanBuku::create([
            'nomor_pengadaan' => 'PENG-2026-002',
            'judul_pengadaan' => 'Pengadaan Buku Teks Manajemen Bisnis Digital & Technopreneurship',
            'kategori_id' => $ekoKategori->id,
            'estimasi_jumlah_eksemplar' => 90,
            'maksimal_harga_satuan' => 100000,
            'maksimal_hari_kirim' => 5,
            'total_anggaran_pagu' => 9000000,
            'status' => 'PROSES_SPK',
            'selected_supplier_id' => null,
            'catatan_kebutuhan' => 'Dibutuhkan untuk penambahan akreditasi laboratorium inovasi bisnis mahasiswa Fakultas Teknik.',
        ]);

        PengadaanBuku::create([
            'nomor_pengadaan' => 'PENG-2026-003',
            'judul_pengadaan' => 'Pengadaan Koleksi Referensi Sosiologi & Komunikasi Sains Humaniora',
            'kategori_id' => $sosKategori->id,
            'estimasi_jumlah_eksemplar' => 80,
            'maksimal_harga_satuan' => 90000,
            'maksimal_hari_kirim' => 4,
            'total_anggaran_pagu' => 7200000,
            'status' => 'PROSES_SPK',
            'selected_supplier_id' => null,
            'catatan_kebutuhan' => 'Dipersiapkan untuk penunjang riset kolaboratif mahasiswa tingkat akhir.',
        ]);
    }
}
