<?php

namespace Database\Seeders;

use App\Models\License;
use Illuminate\Database\Seeder;

class LicenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'title' => 'Mini Bootcamp Software Testing',
                'issuer' => 'PT Bajau Escorindo',
                'issueDate' => 'Jul 2026',
                'credentialId' => 'BE/185/HRD-SBC/VIII/2026',
                'credentialUrl' => 'https://www.linkedin.com/in/anatasyawp/overlay/Certifications/416569369/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
                'category' => 'Software Testing & QA',
                'badge' => 'Bootcamp Graduate',
                'description' => 'Comprehensive software testing training covering manual testing practices, test cases design, defect reporting, and test execution.',
                'skills' => ['Software Quality Assurance', 'Manual Testing', 'Software Testing', 'Test Case Design', 'Defect Tracking'],
                'image' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
                'order' => 1,
            ],
            [
                'title' => 'BNSP Certified Software Engineer',
                'issuer' => 'LSP Vokasi IPB / BNSP',
                'issueDate' => 'Jul 2026',
                'credentialId' => '285/LSP.928.2/VII/2026',
                'credentialUrl' => 'https://www.linkedin.com/in/anatasyawp/overlay/Certifications/415729051/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
                'category' => 'National Competency Certification',
                'badge' => 'BNSP National Certified',
                'description' => 'National professional certification validating competencies in software engineering, architecture, SDLC implementation, and code reliability.',
                'skills' => ['Software Development Life Cycle (SDLC)', 'Model-View-Controller (MVC)', 'Software Architecture', 'OOP', 'Database Management', 'Code Verification'],
                'image' => 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
                'order' => 2,
            ],
            [
                'title' => 'Short Class Data Visualization with Microsoft Excel',
                'issuer' => 'MySkill',
                'issueDate' => 'Jun 2025',
                'credentialId' => '263908/EXL/LM/07/2025',
                'credentialUrl' => 'https://www.linkedin.com/in/anatasyawp/overlay/Certifications/988774674/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
                'category' => 'Data Analysis & Analytics',
                'badge' => 'MySkill Certified',
                'description' => 'Specialized course in transforming raw data into visual dashboards, dynamic charting, and actionable business insights using Microsoft Excel.',
                'skills' => ['Data Analysis', 'Data Visualization', 'Microsoft Excel', 'Dashboard Reporting'],
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                'order' => 3,
            ],
            [
                'title' => 'Complete UI Designer: Visual Design, Prototype, Usability Testing',
                'issuer' => 'BuildWithAngga',
                'issueDate' => 'Feb 2024',
                'credentialId' => 'J3GKYZjcrf',
                'credentialUrl' => 'https://www.linkedin.com/in/anatasyawp/overlay/Certifications/1508047857/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
                'category' => 'UI/UX Design',
                'badge' => 'Industry Design Certificate',
                'description' => 'Comprehensive UI design masterclass focusing on design systems, high-fidelity wireframing, component tokens, interactive prototyping, and usability testing.',
                'skills' => ['Figma (Software)', 'User Interface Design', 'Prototyping', 'Usability Testing', 'Design System'],
                'image' => 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
                'order' => 4,
            ],
        ];

        foreach ($items as $item) {
            License::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}
