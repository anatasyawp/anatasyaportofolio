<?php

namespace Tests\Feature;

use App\Models\License;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LicenseCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_licenses_json(): void
    {
        License::create([
            'title' => 'BNSP Certified Software Engineer',
            'issuer' => 'BNSP',
            'issueDate' => 'Jul 2026',
            'order' => 1,
        ]);

        $response = $this->getJson('/api/licenses');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.0.title', 'BNSP Certified Software Engineer');
    }

    public function test_store_creates_a_license(): void
    {
        $response = $this->postJson('/api/licenses', [
            'title' => 'Mini Bootcamp Software Testing',
            'issuer' => 'PT Bajau Escorindo',
            'issueDate' => 'Jul 2026',
            'skills' => ['Manual Testing', 'QA'],
            'order' => 1,
        ]);

        $response->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.title', 'Mini Bootcamp Software Testing');

        $this->assertDatabaseHas('licenses', [
            'title' => 'Mini Bootcamp Software Testing',
            'issuer' => 'PT Bajau Escorindo',
        ]);
    }

    public function test_store_requires_title_and_issuer(): void
    {
        $response = $this->postJson('/api/licenses', [
            'issueDate' => '2026',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'issuer']);
    }

    public function test_update_modifies_a_license(): void
    {
        $license = License::create([
            'title' => 'Old Title',
            'issuer' => 'Old Issuer',
            'order' => 1,
        ]);

        $response = $this->putJson("/api/licenses/{$license->id}", [
            'title' => 'Updated License',
            'badge' => 'National Certified',
        ]);

        $response->assertOk()
            ->assertJsonPath('data.title', 'Updated License')
            ->assertJsonPath('data.badge', 'National Certified');
    }

    public function test_destroy_deletes_a_license(): void
    {
        $license = License::create([
            'title' => 'To Delete',
            'issuer' => 'Issuer',
        ]);

        $response = $this->deleteJson("/api/licenses/{$license->id}");

        $response->assertOk()->assertJsonPath('success', true);
        $this->assertDatabaseMissing('licenses', ['id' => $license->id]);
    }

    public function test_admin_page_renders(): void
    {
        $this->get('/admin/licenses')->assertOk();
    }
}
