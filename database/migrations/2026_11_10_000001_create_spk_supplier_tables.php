<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kategori_buku', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 20)->unique();
            $table->string('nama_kategori');
            $table->string('deskripsi')->nullable();
            $table->string('icon')->default('book');
            $table->timestamps();
        });

        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('kode_supplier', 20)->unique();
            $table->string('nama_supplier');
            $table->string('kontak_person');
            $table->string('telepon', 30);
            $table->string('email');
            $table->string('kota_asal');
            $table->text('alamat');
            $table->unsignedInteger('rata_rata_harga'); // Rupiah
            $table->unsignedInteger('estimasi_hari_kirim'); // Hari
            $table->unsignedInteger('biaya_ongkir_per_kg')->default(0); // Rupiah
            $table->unsignedInteger('min_order_nominal')->default(0); // Rupiah
            $table->decimal('diskon_pengadaan_persen', 4, 1)->default(0); // %
            $table->unsignedInteger('garansi_retur_hari')->default(14); // Hari
            $table->string('kebijakan_garansi');
            $table->string('syarat_pembayaran'); // "Tempo 30 Hari", "COD", dll
            $table->decimal('rating_keandalan', 3, 1)->default(4.5); // 1.0 - 5.0
            $table->text('reputasi_catatan')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('supplier_kategori', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained('suppliers')->onDelete('cascade');
            $table->foreignId('kategori_id')->constrained('kategori_buku')->onDelete('cascade');
            $table->unsignedInteger('jumlah_judul_katalog')->default(0);
            $table->timestamps();
        });

        Schema::create('pengadaan_buku', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_pengadaan', 30)->unique();
            $table->string('judul_pengadaan');
            $table->foreignId('kategori_id')->constrained('kategori_buku');
            $table->unsignedInteger('estimasi_jumlah_eksemplar');
            $table->unsignedInteger('maksimal_harga_satuan');
            $table->unsignedInteger('maksimal_hari_kirim');
            $table->unsignedBigInteger('total_anggaran_pagu');
            $table->string('status', 30)->default('PROSES_SPK'); // DRAFT, PROSES_SPK, SELESAI
            $table->foreignId('selected_supplier_id')->nullable()->constrained('suppliers')->nullOnDelete();
            $table->text('catatan_kebutuhan')->nullable();
            $table->timestamps();
        });

        Schema::create('keputusan_spk', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pengadaan_id')->constrained('pengadaan_buku')->onDelete('cascade');
            $table->foreignId('supplier_terpilih_id')->constrained('suppliers');
            $table->json('supplier_dibandingkan_ids');
            $table->text('alasan_keputusan');
            $table->string('nama_pengambil_keputusan');
            $table->string('jabatan')->default('Kepala Bagian Pengadaan Perpustakaan');
            $table->date('tanggal_keputusan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keputusan_spk');
        Schema::dropIfExists('pengadaan_buku');
        Schema::dropIfExists('supplier_kategori');
        Schema::dropIfExists('suppliers');
        Schema::dropIfExists('kategori_buku');
    }
};
