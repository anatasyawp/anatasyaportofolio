<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'title' => 'Juara 3 AIReF Poster Competition',
                'event' => 'HIMASHI Universitas Andalas',
                'year' => 'Sep 2024',
                'association' => 'Institut Pertanian Bogor (IPB)',
                'category' => 'National Competition',
                'badge' => 'Juara 3',
                'description' => 'AIReF Poster Competition organized by International Relations (HIMASHI) Universitas Andalas, creating visual design communications for public awareness.',
                'credentialUrl' => 'https://www.linkedin.com/in/anatasyawp/overlay/Honor/1506369033/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
                'skills' => ['Visual Design', 'Poster Design', 'Creative Communication', 'Infographics'],
                'image' => 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
                'order' => 1,
            ],
            [
                'title' => 'Juara 3 Harvest Pangan Chapter X Infographics Competition',
                'event' => 'HMITP Universitas Bakrie',
                'year' => 'Mar 2024',
                'association' => 'Institut Pertanian Bogor (IPB)',
                'category' => 'National Competition',
                'badge' => 'Juara 3',
                'description' => 'Harvest Pangan Chapter X Infographics Competition yang diselenggarakan oleh HMITP Universitas Bakrie dengan tema "Pangan Nusantara Kaya Akan Rasa dan Mendukung Keberlanjutan Lingkungan".',
                'credentialUrl' => 'https://www.linkedin.com/in/anatasyawp/overlay/Honor/1503296932/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
                'skills' => ['Infographics Design', 'Information Architecture', 'Sustainable Food Awareness', 'Data Storytelling'],
                'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
                'order' => 2,
            ],
        ];

        foreach ($items as $item) {
            Achievement::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}
