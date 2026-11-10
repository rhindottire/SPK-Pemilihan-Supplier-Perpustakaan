<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KeputusanSpk extends Model
{
    use HasFactory;

    protected $table = 'keputusan_spk';

    protected $fillable = [
        'pengadaan_id',
        'supplier_terpilih_id',
        'supplier_dibandingkan_ids',
        'alasan_keputusan',
        'nama_pengambil_keputusan',
        'jabatan',
        'tanggal_keputusan',
    ];

    protected $casts = [
        'supplier_dibandingkan_ids' => 'array',
        'tanggal_keputusan' => 'date',
    ];

    public function pengadaan(): BelongsTo
    {
        return $this->belongsTo(PengadaanBuku::class, 'pengadaan_id');
    }

    public function supplierTerpilih(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_terpilih_id');
    }
}
