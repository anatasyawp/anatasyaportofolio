<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Project;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'modul-perpindahan-wilayah-kerja',
                'number' => '01',
                'title' => 'Modul Perpindahan Wilayah Kerja (PWK)',
                'category' => 'Government & Enterprise',
                'badge' => 'Enterprise Internship',
                'period' => 'Agustus – Desember 2025',
                'client' => 'Pemerintah Kota Depok',
                'summary' => 'Full-stack web module for managing civil servant work-area transfers and rotations at Pemerintah Kota Depok, featuring multi-tier approval workflows, automated document generation, and rigorous functional testing.',
                'role' => 'Full-Stack Developer Intern',
                'contributions' => [
                    'Developed and implemented 13 functional features covering frontend interfaces, backend logic, and MySQL database operations using Laravel, PHP, and JavaScript.',
                    'Designed and built a relational MySQL database schema for tracking employee transfer history and work-unit placement data.',
                    'Contributed to requirements analysis, frontend interface implementation, and backend feature development for the PWK module.',
                    'Executed Black Box Testing across 46 test scenarios, achieving 100% pass rate to ensure application reliability.',
                    'Conducted System Usability Scale (SUS) evaluation resulting in a score of 95/100 (Grade A – Excellent) from 7 stakeholder respondents.'
                ],
                'metrics' => [
                    ['label' => 'Features Developed', 'value' => '13 Features', 'description' => 'End-to-end features completed over 4 months'],
                    ['label' => 'Testing Passed', 'value' => '46 / 46', 'description' => '100% Black Box Test scenarios passed'],
                    ['label' => 'SUS Usability Score', 'value' => '95 / 100', 'description' => 'Grade A Excellent from 7 respondents']
                ],
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Black Box Testing', 'SUS Evaluation'],
                'features' => [
                    'Multi-tier Role Based Access Control (Applicant, BKPSDM Verifier, Department Head)',
                    'Digital Document Submission Workflow with Change Audit Log',
                    'Automated PDF SK Transfer Letter Generator & Digital Verification',
                    'Real-time Work Area Distribution Summary Dashboard'
                ],
                'testingMethodology' => 'Black Box Boundary Value Analysis & Equivalence Partitioning combined with System Usability Scale (SUS) quantitative evaluation.',
                'testingResults' => [
                    '46 functional test scenarios passed with zero critical bugs',
                    'Average SUS score of 95 indicates Best Imaginable usability level'
                ],
                'starMethod' => [
                    'situation' => 'The Depok City Government needed a secure, centralized web module to manage internal work area transfers (PWK) across municipal agencies, replacing manual paperwork with transparent tracking.',
                    'task' => 'As a Full Stack Developer Intern, apply Prototyping SDLC methodology to translate civic organizational workflows into functional software specifications, UML diagrams, interactive UI/UX, and 13 end-to-end features in 4 months.',
                    'action' => [
                        'Collaborated closely with BKPSDM officials to draft workflow wireframes and obtain iterative feedback.',
                        'Developed backend logic using Laravel with Eloquent relations connecting employee records, destination units, and approval tracking.',
                        'Implemented a dynamic multi-level approval pipeline with notification status triggers and exportable PDF decrees.'
                    ],
                    'result' => [
                        'Achieved a 100% pass rate across all 46 functional test cases with zero critical defects.',
                        'Conducted end-user usability testing scoring an exceptional 95/100 on the System Usability Scale (Grade A Excellent).'
                    ]
                ],
                'layerImages' => [
                    ['url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', 'alt' => 'PWK Analytics & Workflow Dashboard Preview', 'depth' => 1, 'caption' => 'Main Dashboard Module & Data Summary'],
                    ['url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'alt' => 'PWK Verification & Approval Table View', 'depth' => 2, 'caption' => 'Verification Table & Approval History'],
                    ['url' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80', 'alt' => 'PWK Mobile Responsive Interface', 'depth' => 3, 'caption' => 'Responsive Submission Form Interface']
                ],
                'githubUrl' => 'https://github.com/anatasyawp',
                'figmaUrl' => 'https://figma.com',
                'docUrl' => 'https://drive.google.com',
                'liveUrl' => null,
                'featured' => true,
                'order' => 1,
            ],
            [
                'slug' => 'modul-pengajuan-standar-kompetensi-jabatan',
                'number' => '02',
                'title' => 'Modul Pengajuan Standar Kompetensi Jabatan (SKJ)',
                'category' => 'Government & Enterprise',
                'badge' => 'Enterprise Internship',
                'period' => 'Agustus – November 2025',
                'client' => 'Pemerintah Kota Depok',
                'summary' => 'Full-stack web module for proposing, mapping, and standardizing technical and managerial competencies for government position classifications, built with Laravel, PHP, MySQL, and JavaScript.',
                'role' => 'Full-Stack Developer Intern',
                'contributions' => [
                    'Developed and implemented 8 operational features across frontend interfaces, backend logic, and MySQL database integration over approximately 3 months.',
                    'Built a competency matrix validation module aligned with KemenPAN-RB standard guidelines, covering both frontend views and backend processing.',
                    'Implemented a review notification system and document version revision history using Laravel and MySQL.',
                    'Collaborated with team members to support requirements analysis and ensure application functionality aligned with user requirements.',
                    'Executed Black Box Testing to validate multi-tier approval flow integrity and access control per user session.'
                ],
                'metrics' => [
                    ['label' => 'Features Developed', 'value' => '8 Features', 'description' => 'Implemented and tested within 3 months'],
                    ['label' => 'Testing Coverage', 'value' => '100% Passed', 'description' => 'All functional test scenarios passed'],
                    ['label' => 'Audit Readiness', 'value' => 'Compliant', 'description' => 'Aligned with competency standard regulations']
                ],
                'technologies' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Blade Components', 'Black Box Testing'],
                'features' => [
                    'Dynamic Competency Matrix Form with Automated Weighted Score Calculation',
                    'Multi-step Document Review Workflow (Draft, Technical Review, Final Approval)',
                    'Official Document Export for Competency Standards',
                    'Competency Document Version Change Log'
                ],
                'testingMethodology' => 'Black Box Testing focused on validating position hierarchy logic input and access privilege boundaries per user session.',
                'testingResults' => [
                    'Cross-level position data relation integrity verified as consistent',
                    'Zero critical vulnerability identified in the approval form process'
                ],
                'starMethod' => [
                    'situation' => 'Depok City Government’s Sekretariat Daerah Bagian Organisasi required a digital competency mapping system within their internal AJAK website to standardize job positions in accordance with KemenPAN-RB regulations.',
                    'task' => 'Deliver frontend and backend components for proposing competency matrices across dozens of municipal positions with strict role-based validation within a 3-month schedule.',
                    'action' => [
                        'Constructed dynamic frontend forms with reactive competency scoring inputs and instant calculation summaries.',
                        'Engineered backend controllers handling multi-state validation rules and document revisions.',
                        'Conducted Black Box regression tests across all edge cases including incomplete competency weights and unauthorized review attempts.'
                    ],
                    'result' => [
                        'Completed all 8 planned operational features with zero defect leakage into staging deployment.',
                        'Streamlined the position competency evaluation cycle for internal municipal evaluators.'
                    ]
                ],
                'layerImages' => [
                    ['url' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', 'alt' => 'SKJ Competency Matrix Editor Interface', 'depth' => 1, 'caption' => 'Competency Proposal Table & Input Matrix'],
                    ['url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'alt' => 'Approval Pipeline & Multi-Tier Review', 'depth' => 2, 'caption' => 'Workflow Review Stage & Validation Modal']
                ],
                'githubUrl' => 'https://github.com/anatasyawp',
                'figmaUrl' => 'https://figma.com',
                'docUrl' => 'https://drive.google.com',
                'liveUrl' => null,
                'featured' => true,
                'order' => 2,
            ],
            [
                'slug' => 'tasya-interactive-portfolio',
                'number' => '03',
                'title' => 'Anatasya Interactive Portfolio',
                'category' => 'UI/UX & Frontend',
                'badge' => 'Personal & Open Source',
                'period' => '2026',
                'client' => 'Personal Project',
                'summary' => 'A modern full-stack portfolio website built with Laravel 12, Inertia.js, React, Tailwind CSS 4, and Motion — showcasing software engineering work with immersive UI/UX and interactive layered project showcases.',
                'role' => 'Full-Stack Developer & UI/UX Designer',
                'contributions' => [
                    'Designed a clean, minimal UI/UX system with light/dark mode and smooth micro-animations.',
                    'Built signature interactive components: 3D Project Carousel and 3D Curved Cylinder Slide Showcase.',
                    'Architected a decoupled frontend-first SPA structure integrated with Laravel backend and MySQL database CRUD.'
                ],
                'metrics' => [
                    ['label' => 'Modern Stack', 'value' => 'Inertia + React', 'description' => 'Full-stack SPA without separate REST overhead'],
                    ['label' => 'Responsive Coverage', 'value' => '320px – 4K', 'description' => 'Optimized across all devices and resolutions']
                ],
                'technologies' => ['Laravel 12', 'React 19', 'TypeScript', 'Inertia.js', 'Tailwind CSS 4', 'Motion for React', 'Lucide Icons'],
                'features' => [
                    'Editorial Hero Section with framed portrait and clean minimalist aesthetic',
                    'Interactive 3D Carousel Showcase with case-study modal & detail view',
                    'Dynamic Curved Cylinder Credentials Slider',
                    'Full-stack Laravel CRUD & REST API integration for projects'
                ],
                'testingMethodology' => 'Component unit testing and browser subagent end-to-end responsive viewport verification.',
                'testingResults' => [
                    'Seamless 60fps animations across viewports',
                    'Clean responsive layout across mobile and desktop devices'
                ],
                'starMethod' => [
                    'situation' => 'Needed an impactful, production-grade portfolio demonstrating both full-stack software engineering competencies and state-of-the-art UI/UX craft.',
                    'task' => 'Build a responsive web application leveraging Laravel 12, React 19, TypeScript, and interactive 3D physics.',
                    'action' => [
                        'Constructed custom motion components with mouse parallax, 3D stepped perspective, and cylindrical transforms.',
                        'Engineered database models, migrations, and RESTful CRUD endpoints in Laravel.'
                    ],
                    'result' => [
                        'Delivered an interactive, verified web app ready for recruitment showcases and live demos.'
                    ]
                ],
                'layerImages' => [
                    ['url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80', 'alt' => 'Code & Interface Composition View', 'depth' => 1, 'caption' => 'Modern Frontend Architecture & Layered Showcase'],
                    ['url' => 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80', 'alt' => 'Design System & Token Hierarchy', 'depth' => 2, 'caption' => 'Design Tokens & Typography Presets']
                ],
                'githubUrl' => 'https://github.com/anatasyawp/anatasyaportofolio',
                'figmaUrl' => 'https://figma.com',
                'docUrl' => 'https://drive.google.com',
                'liveUrl' => 'http://localhost/anatasyaportofolio/public/',
                'featured' => true,
                'order' => 3,
            ]
        ];

        foreach ($projects as $projectData) {
            Project::updateOrCreate(
                ['slug' => $projectData['slug']],
                $projectData
            );
        }
    }
}
