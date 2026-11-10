<?php

namespace Tests\Feature;

use App\Models\KategoriBuku;
use App\Models\PengadaanBuku;
use App\Models\Supplier;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SupplierSpkTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_dashboard_page_loads_successfully(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_spk_index_loads_with_default_filters(): void
    {
        $response = $this->get('/spk');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Spk/Index', false)
            ->has('all_suppliers')
            ->has('lolos_suppliers')
            ->has('gugur_suppliers')
        );
    }

    public function test_spk_dynamic_filter_evaluates_price_and_delivery_limits(): void
    {
        // Filter ketat: max harga 75.000 dan max waktu kirim 3 hari
        $response = $this->get('/spk?max_harga=75000&max_hari_kirim=3');
        $response->assertStatus(200);

        $response->assertInertia(function ($page) {
            $lolos = $page->toArray()['props']['lolos_suppliers'];
            foreach ($lolos as $s) {
                $this->assertLessThanOrEqual(75000, $s['rata_rata_harga']);
                $this->assertLessThanOrEqual(3, $s['estimasi_hari_kirim']);
            }
        });
    }

    public function test_spk_can_save_decision_and_create_audit_trail(): void
    {
        $pengadaan = PengadaanBuku::where('status', 'PROSES_SPK')->firstOrFail();
        $supplier = Supplier::firstOrFail();

        $response = $this->post('/spk/simpan-keputusan', [
            'pengadaan_id' => $pengadaan->id,
            'supplier_terpilih_id' => $supplier->id,
            'supplier_dibandingkan_ids' => [$supplier->id, 2, 3],
            'alasan_keputusan' => 'Terpilih karena memenuhi kriteria harga terjangkau dan waktu kirim tercepat.',
            'nama_pengambil_keputusan' => 'Achmad Ali Ridho, S.Kom., M.T.',
            'jabatan' => 'Kepala Bidang Pengadaan',
        ]);

        $response->assertRedirect('/keputusan/'.$pengadaan->id);

        $this->assertDatabaseHas('pengadaan_buku', [
            'id' => $pengadaan->id,
            'status' => 'SELESAI',
            'selected_supplier_id' => $supplier->id,
        ]);

        $this->assertDatabaseHas('keputusan_spk', [
            'pengadaan_id' => $pengadaan->id,
            'supplier_terpilih_id' => $supplier->id,
        ]);
    }

    public function test_supplier_crud_operations(): void
    {
        $kategoriIds = KategoriBuku::pluck('id')->take(2)->toArray();

        // 1. Create
        $response = $this->post('/suppliers', [
            'kode_supplier' => 'SUP-TEST-99',
            'nama_supplier' => 'CV Mitra Pustaka Test',
            'kontak_person' => 'Budi Tester',
            'telepon' => '08123456789',
            'email' => 'test@mitrapustaka.com',
            'kota_asal' => 'Surabaya',
            'alamat' => 'Jl. Pemuda No. 10, Surabaya',
            'rata_rata_harga' => 70000,
            'estimasi_hari_kirim' => 2,
            'biaya_ongkir_per_kg' => 5000,
            'min_order_nominal' => 500000,
            'diskon_pengadaan_persen' => 20,
            'garansi_retur_hari' => 14,
            'kebijakan_garansi' => '100% Ganti Baru',
            'syarat_pembayaran' => 'Tempo 30 Hari',
            'rating_keandalan' => 4.7,
            'reputasi_catatan' => 'Supplier baru tes',
            'kategori_ids' => $kategoriIds,
        ]);

        $response->assertRedirect('/suppliers');
        $this->assertDatabaseHas('suppliers', ['kode_supplier' => 'SUP-TEST-99']);

        // 2. Update
        $supplier = Supplier::where('kode_supplier', 'SUP-TEST-99')->firstOrFail();
        $updateResponse = $this->put('/suppliers/'.$supplier->id, [
            'nama_supplier' => 'CV Mitra Pustaka Updated',
            'kontak_person' => 'Budi Updated',
            'telepon' => '08123456789',
            'email' => 'test@mitrapustaka.com',
            'kota_asal' => 'Surabaya',
            'alamat' => 'Jl. Pemuda No. 10, Surabaya',
            'rata_rata_harga' => 72000,
            'estimasi_hari_kirim' => 3,
            'biaya_ongkir_per_kg' => 6000,
            'min_order_nominal' => 500000,
            'diskon_pengadaan_persen' => 25,
            'garansi_retur_hari' => 21,
            'kebijakan_garansi' => '100% Ganti Baru',
            'syarat_pembayaran' => 'Tempo 30 Hari',
            'rating_keandalan' => 4.8,
            'reputasi_catatan' => 'Supplier sudah diupdate',
            'kategori_ids' => [$kategoriIds[0]],
        ]);
        $updateResponse->assertRedirect('/suppliers');
        $this->assertDatabaseHas('suppliers', ['id' => $supplier->id, 'nama_supplier' => 'CV Mitra Pustaka Updated']);

        // 3. Delete
        $deleteResponse = $this->delete('/suppliers/'.$supplier->id);
        $deleteResponse->assertRedirect('/suppliers');
        $this->assertDatabaseMissing('suppliers', ['id' => $supplier->id]);
    }

    public function test_pengadaan_creation(): void
    {
        $kategori = KategoriBuku::firstOrFail();

        $response = $this->post('/pengadaan', [
            'nomor_pengadaan' => 'PENG-TEST-2026',
            'judul_pengadaan' => 'Pengadaan Buku Referensi AI 2026',
            'kategori_id' => $kategori->id,
            'estimasi_jumlah_eksemplar' => 50,
            'maksimal_harga_satuan' => 90000,
            'maksimal_hari_kirim' => 4,
            'total_anggaran_pagu' => 4500000,
            'catatan_kebutuhan' => 'Catatan tes pengadaan',
        ]);

        $this->assertDatabaseHas('pengadaan_buku', [
            'nomor_pengadaan' => 'PENG-TEST-2026',
            'status' => 'PROSES_SPK',
        ]);
    }
}
