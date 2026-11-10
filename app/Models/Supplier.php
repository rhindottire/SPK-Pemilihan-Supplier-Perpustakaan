<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    use HasFactory;

    protected $table = 'suppliers';

    protected $fillable = [
        'kode_supplier',
        'nama_supplier',
        'kontak_person',
        'telepon',
        'email',
        'kota_asal',
        'alamat',
        'rata_rata_harga',
        'estimasi_hari_kirim',
        'biaya_ongkir_per_kg',
        'min_order_nominal',
        'diskon_pengadaan_persen',
        'garansi_retur_hari',
        'kebijakan_garansi',
        'syarat_pembayaran',
        'rating_keandalan',
        'reputasi_catatan',
        'is_active',
    ];

    protected $casts = [
        'rata_rata_harga' => 'integer',
        'estimasi_hari_kirim' => 'integer',
        'biaya_ongkir_per_kg' => 'integer',
        'min_order_nominal' => 'integer',
        'diskon_pengadaan_persen' => 'float',
        'garansi_retur_hari' => 'integer',
        'rating_keandalan' => 'float',
        'is_active' => 'boolean',
    ];

    public function kategori(): BelongsToMany
    {
        return $this->belongsToMany(KategoriBuku::class, 'supplier_kategori', 'supplier_id', 'kategori_id')
            ->withPivot('jumlah_judul_katalog')
            ->withTimestamps();
    }

    public function keputusan(): HasMany
    {
        return $this->hasMany(KeputusanSpk::class, 'supplier_terpilih_id');
    }
}
