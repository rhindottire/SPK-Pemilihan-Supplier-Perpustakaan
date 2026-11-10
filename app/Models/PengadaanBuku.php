<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PengadaanBuku extends Model
{
    use HasFactory;

    protected $table = 'pengadaan_buku';

    protected $fillable = [
        'nomor_pengadaan',
        'judul_pengadaan',
        'kategori_id',
        'estimasi_jumlah_eksemplar',
        'maksimal_harga_satuan',
        'maksimal_hari_kirim',
        'total_anggaran_pagu',
        'status',
        'selected_supplier_id',
        'catatan_kebutuhan',
    ];

    protected $casts = [
        'estimasi_jumlah_eksemplar' => 'integer',
        'maksimal_harga_satuan' => 'integer',
        'maksimal_hari_kirim' => 'integer',
        'total_anggaran_pagu' => 'integer',
    ];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(KategoriBuku::class, 'kategori_id');
    }

    public function selectedSupplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'selected_supplier_id');
    }

    public function keputusan(): HasOne
    {
        return $this->hasOne(KeputusanSpk::class, 'pengadaan_id');
    }
}
