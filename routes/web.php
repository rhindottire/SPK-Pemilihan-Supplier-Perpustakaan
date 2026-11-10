<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KeputusanController;
use App\Http\Controllers\PengadaanController;
use App\Http\Controllers\SpkController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

// 1. Dashboard Utama & Analisis Sebaran Supplier
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// 2. Modul SPK: Filter Dinamis & Komparasi Berdampingan (Quiz 2)
Route::get('/spk', [SpkController::class, 'index'])->name('spk.index');
Route::post('/spk/simpan-keputusan', [SpkController::class, 'simpanKeputusan'])->name('spk.simpan-keputusan');

// 3. Manajemen Master Data Supplier (CRUD)
Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
Route::post('/suppliers', [SupplierController::class, 'store'])->name('suppliers.store');
Route::put('/suppliers/{supplier}', [SupplierController::class, 'update'])->name('suppliers.update');
Route::delete('/suppliers/{supplier}', [SupplierController::class, 'destroy'])->name('suppliers.destroy');

// 4. Manajemen Paket Pengadaan Koleksi Buku
Route::get('/pengadaan', [PengadaanController::class, 'index'])->name('pengadaan.index');
Route::post('/pengadaan', [PengadaanController::class, 'store'])->name('pengadaan.store');

// 5. Riwayat Keputusan SPK & Cetak Berita Acara / Purchase Order (PO)
Route::get('/keputusan', [KeputusanController::class, 'index'])->name('keputusan.index');
Route::get('/keputusan/{id}', [KeputusanController::class, 'show'])->name('keputusan.show');
