<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KategoriBuku extends Model
{
    use HasFactory;

    protected $table = 'kategori_buku';

    protected $fillable = [
        'kode',
        'nama_kategori',
        'deskripsi',
        'icon',
    ];

    public function suppliers(): BelongsToMany
    {
        return $this->belongsToMany(Supplier::class, 'supplier_kategori', 'kategori_id', 'supplier_id')
            ->withPivot('jumlah_judul_katalog')
            ->withTimestamps();
    }

    public function pengadaan(): HasMany
    {
        return $this->hasMany(PengadaanBuku::class, 'kategori_id');
    }
}
