<?php

namespace Tests\Feature;

use App\Models\Achievement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AchievementCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_achievements_json(): void
    {
        Achievement::create([
            'title' => 'Juara 3 AIReF Poster Competition',
            'event' => 'HIMASHI Universitas Andalas',
            'year' => 'Sep 2024',
            'order' => 1,
        ]);

        $response = $this->getJson('/api/achievements');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.0.title', 'Juara 3 AIReF Poster Competition');
    }

    public function test_store_creates_an_achievement(): void
    {
        $response = $this->postJson('/api/achievements', [
            'title' => 'Juara 3 Harvest Pangan',
            'event' => 'HMITP Universitas Bakrie',
            'year' => 'Mar 2024',
            'badge' => 'Juara 3',
            'skills' => ['Infographics'],
            'order' => 1,
        ]);

        $response->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.event', 'HMITP Universitas Bakrie');

        $this->assertDatabaseHas('achievements', [
            'title' => 'Juara 3 Harvest Pangan',
            'event' => 'HMITP Universitas Bakrie',
        ]);
    }

    public function test_store_requires_title_and_event(): void
    {
        $response = $this->postJson('/api/achievements', [
            'year' => '2024',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'event']);
    }

    public function test_update_modifies_an_achievement(): void
    {
        $achievement = Achievement::create([
            'title' => 'Old Award',
            'event' => 'Old Event',
            'order' => 1,
        ]);

        $response = $this->putJson("/api/achievements/{$achievement->id}", [
            'title' => 'Updated Award',
            'badge' => 'Juara 1',
        ]);

        $response->assertOk()
            ->assertJsonPath('data.title', 'Updated Award')
            ->assertJsonPath('data.badge', 'Juara 1');
    }

    public function test_destroy_deletes_an_achievement(): void
    {
        $achievement = Achievement::create([
            'title' => 'To Delete',
            'event' => 'Event',
        ]);

        $response = $this->deleteJson("/api/achievements/{$achievement->id}");

        $response->assertOk()->assertJsonPath('success', true);
        $this->assertDatabaseMissing('achievements', ['id' => $achievement->id]);
    }

    public function test_admin_page_renders(): void
    {
        $this->get('/admin/achievements')->assertOk();
    }
}
