import { Project, Experience, Education, SkillCategory, Certificate, Achievement } from '../types/portfolio';

export const PERSONAL_INFO = {
    name: 'Anatasya Wenita Putri',
    preferredName: 'Anatasya Wenita Putri',
    headline: 'Hello, I\'m Anatasya.',
    subheadline: 'A Full-Stack Developer and Software Engineering graduate passionate about building impactful web applications, crafting intuitive user experiences, and delivering reliable, high-quality software through thoughtful design and development.',
    roles: [
        'Full-Stack Developer',
        'Software Engineering Graduate',
        'UI/UX Designer',
        'Software QA & Testing'
    ],
    professionalStatus: 'Fresh Graduate · Full-Stack Developer · Open to Opportunities',
    bio: 'Fresh Graduate in D4 Software Engineering (Teknologi Rekayasa Perangkat Lunak) from IPB University (GPA 3.54 / 4.00). Experienced in full-stack web application development using Laravel, PHP, JavaScript, and MySQL during an intensive internship at Pemerintah Kota Depok.',
    email: 'anatasyawenitaputrii@gmail.com',
    github: 'https://github.com/anatasyawp',
    linkedin: 'https://linkedin.com/in/anatasyawp',
    instagram: 'https://instagram.com/anatasyawp_',
    location: 'Bogor / Depok / Jakarta, Indonesia',
    avatarUrl: 'images/tasya_cutout.png',
    cvUrl: '/assets/cv-anatasya-wenita-putri.pdf',
    hasCvFile: false,
};

export const PROJECTS: Project[] = [
    {
        id: 'pwk',
        slug: 'modul-perpindahan-wilayah-kerja',
        number: '01',
        title: 'Modul Perpindahan Wilayah Kerja (PWK)',
        category: 'Government & Enterprise',
        badge: 'Enterprise Internship',
        period: 'Agustus – Desember 2025',
        client: 'Pemerintah Kota Depok',
        summary: 'Full-stack web module for managing civil servant work-area transfers and rotations at Pemerintah Kota Depok, featuring multi-tier approval workflows, automated document generation, and rigorous functional testing.',
        role: 'Full-Stack Developer Intern',
        contributions: [
            'Developed and implemented 13 functional features covering frontend interfaces, backend logic, and MySQL database operations using Laravel, PHP, and JavaScript.',
            'Designed and built a relational MySQL database schema for tracking employee transfer history and work-unit placement data.',
            'Contributed to requirements analysis, frontend interface implementation, and backend feature development for the PWK module.',
            'Executed Black Box Testing across 46 test scenarios, achieving 100% pass rate to ensure application reliability.',
            'Conducted System Usability Scale (SUS) evaluation resulting in a score of 95/100 (Grade A – Excellent) from 7 stakeholder respondents.'
        ],
        metrics: [
            {
                label: 'Features Developed',
                value: '13 Features',
                description: 'End-to-end features completed over 4 months'
            },
            {
                label: 'Testing Passed',
                value: '46 / 46',
                description: '100% Black Box Test scenarios passed'
            },
            {
                label: 'SUS Usability Score',
                value: '95 / 100',
                description: 'Grade A Excellent from 7 respondents'
            }
        ],
        technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Black Box Testing', 'SUS Evaluation'],
        features: [
            'Multi-tier Role Based Access Control (Applicant, BKPSDM Verifier, Department Head)',
            'Digital Document Submission Workflow with Change Audit Log',
            'Automated PDF SK Transfer Letter Generator & Digital Verification',
            'Real-time Work Area Distribution Summary Dashboard'
        ],
        testingMethodology: 'Black Box Boundary Value Analysis & Equivalence Partitioning combined with System Usability Scale (SUS) quantitative evaluation.',
        testingResults: [
            '46 functional test scenarios passed with zero critical bugs',
            'Average SUS score of 95 indicates Best Imaginable usability level'
        ],
        starMethod: {
            situation: 'The Depok City Government needed a secure, centralized web module to manage internal work area transfers (PWK) across municipal agencies, replacing manual paperwork with transparent tracking.',
            task: 'As a Full Stack Developer Intern, apply Prototyping SDLC methodology to translate civic organizational workflows into functional software specifications, UML diagrams, interactive UI/UX, and 13 end-to-end features in 4 months.',
            action: [
                'Engineered frontend interface views using HTML, CSS, JavaScript, and Bootstrap, ensuring high responsiveness and clarity for government staff.',
                'Developed robust backend logic and MySQL database models with Laravel 11 and PHP to handle multi-tier approvals, document uploads, and automated SK PDF generation.',
                'Designed and executed 46 Black Box test scenarios (boundary value analysis & equivalence partitioning) across applicant, verifier, and department head roles.'
            ],
            result: [
                'Achieved a 100% pass rate across all 46 functional test cases with zero critical defects.',
                'Conducted end-user usability testing scoring an exceptional 95/100 on the System Usability Scale (Grade A Excellent).'
            ]
        },
        layerImages: [
            {
                url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
                alt: 'PWK Analytics & Workflow Dashboard Preview',
                depth: 1,
                caption: 'Main Dashboard Module & Data Summary'
            },
            {
                url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                alt: 'PWK Verification & Approval Table View',
                depth: 2,
                caption: 'Verification Table & Approval History'
            },
            {
                url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
                alt: 'PWK Mobile Responsive Interface',
                depth: 3,
                caption: 'Responsive Submission Form Interface'
            }
        ],
        githubUrl: 'https://github.com/anatasyawp',
        figmaUrl: 'https://figma.com',
        docUrl: 'https://drive.google.com',
        liveUrl: undefined,
        featured: true
    },
    {
        id: 'skj',
        slug: 'modul-pengajuan-standar-kompetensi-jabatan',
        number: '02',
        title: 'Modul Pengajuan Standar Kompetensi Jabatan (SKJ)',
        category: 'Government & Enterprise',
        badge: 'Enterprise Internship',
        period: 'Agustus – November 2025',
        client: 'Pemerintah Kota Depok',
        summary: 'Full-stack web module for proposing, mapping, and standardizing technical and managerial competencies for government position classifications, built with Laravel, PHP, MySQL, and JavaScript.',
        role: 'Full-Stack Developer Intern',
        contributions: [
            'Developed and implemented 8 operational features across frontend interfaces, backend logic, and MySQL database integration over approximately 3 months.',
            'Built a competency matrix validation module aligned with KemenPAN-RB standard guidelines, covering both frontend views and backend processing.',
            'Implemented a review notification system and document version revision history using Laravel and MySQL.',
            'Collaborated with team members to support requirements analysis and ensure application functionality aligned with user requirements.',
            'Executed Black Box Testing to validate multi-tier approval flow integrity and access control per user session.'
        ],
        metrics: [
            {
                label: 'Features Developed',
                value: '8 Features',
                description: 'Implemented and tested within 3 months'
            },
            {
                label: 'Testing Coverage',
                value: '100% Passed',
                description: 'All functional test scenarios passed'
            },
            {
                label: 'Audit Readiness',
                value: 'Compliant',
                description: 'Aligned with competency standard regulations'
            }
        ],
        technologies: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Blade Components', 'Black Box Testing'],
        features: [
            'Dynamic Competency Matrix Form with Automated Weighted Score Calculation',
            'Multi-step Document Review Workflow (Draft, Technical Review, Final Approval)',
            'Official Document Export for Competency Standards',
            'Competency Document Version Change Log'
        ],
        testingMethodology: 'Black Box Testing focused on validating position hierarchy logic input and access privilege boundaries per user session.',
        testingResults: [
            'Cross-level position data relation integrity verified as consistent',
            'Zero critical vulnerability identified in the approval form process'
        ],
        starMethod: {
            situation: 'Depok City Government’s Sekretariat Daerah Bagian Organisasi required a digital competency mapping system within their internal AJAK website to standardize job positions in accordance with KemenPAN-RB regulations.',
            task: 'Collaborate with administrative stakeholders using Agile methodology to design the user interface, implement 8 full-stack features over 3 months, and rigorously validate the system.',
            action: [
                'Designed clean interface views and built dynamic competency matrix forms with weighted scoring formulas using JavaScript, jQuery, AJAX, and Blade components.',
                'Engineered backend processing with Laravel, PHP, and MySQL for multi-tier document review workflows, role permissions, and version revision change logs.',
                'Executed 22 Black Box Testing test cases to validate input boundaries and access control privileges per user session.'
            ],
            result: [
                'Successfully developed and deployed 8 core features on schedule with 100% test pass rate across 22 test scenarios.',
                'Enabled seamless digital evaluation of competency standards with complete audit readiness and zero critical vulnerabilities.'
            ]
        },
        layerImages: [
            {
                url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
                alt: 'SKJ Competency Matrix Workspace Preview',
                depth: 1,
                caption: 'Competency Standard Matrix & Behavioral Indicators'
            },
            {
                url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
                alt: 'SKJ Hierarchy Approval Flow',
                depth: 2,
                caption: 'SKJ Approval Hierarchy Workflow'
            }
        ],
        githubUrl: 'https://github.com/anatasyawp',
        figmaUrl: 'https://figma.com',
        docUrl: 'https://drive.google.com',
        liveUrl: undefined,
        featured: true
    },
    {
        id: 'tasya-portfolio',
        slug: 'tasya-interactive-portfolio',
        number: '03',
        title: 'Anatasya Interactive Portfolio',
        category: 'UI/UX & Frontend',
        badge: 'Personal & Open Source',
        period: '2026',
        client: 'Personal Project',
        summary: 'A modern full-stack portfolio website built with Laravel 12, Inertia.js, React, Tailwind CSS 4, and Motion — showcasing software engineering work with immersive UI/UX and interactive layered project showcases.',
        role: 'Full-Stack Developer & UI/UX Designer',
        contributions: [
            'Designed a clean, minimal UI/UX system with light/dark mode and smooth micro-animations.',
            'Built the signature interactive component: Layered Image Parallax Showcase with desktop pointer control and responsive mobile reflow.',
            'Architected a decoupled frontend-first SPA structure integrated with Laravel backend, ready for MySQL & RESTful CRUD.'
        ],
        metrics: [
            {
                label: 'Modern Stack',
                value: 'Inertia + React',
                description: 'Full-stack SPA without separate REST overhead'
            },
            {
                label: 'Responsive Coverage',
                value: '320px – 4K',
                description: 'Optimized across all devices and resolutions'
            }
        ],
        technologies: ['Laravel 12', 'React 19', 'TypeScript', 'Inertia.js', 'Tailwind CSS 4', 'Motion for React', 'Lucide Icons'],
        features: [
            'Editorial Hero Section with cursor parallax motion depth',
            'Interactive Layered Image Showcase with case-study modal & detail view',
            'Real-time project category filter with motion layout transitions',
            'Interactive contact form with validation state and backend-ready indicator'
        ],
        layerImages: [
            {
                url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
                alt: 'Code & Interface Composition View',
                depth: 1,
                caption: 'Modern Frontend Architecture & Layered Showcase'
            },
            {
                url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
                alt: 'Design System & Token Hierarchy',
                depth: 2,
                caption: 'Design Tokens & Typography Presets'
            }
        ],
        githubUrl: 'https://github.com/anatasyawp/anatasyaportofolio',
        figmaUrl: 'https://figma.com',
        docUrl: 'https://drive.google.com',
        liveUrl: 'http://localhost/anatasyaportofolio/public/',
        featured: true
    }
];

export const EXPERIENCES: Experience[] = [
    {
        period: 'Jan 2026 – Jun 2026',
        role: 'Teaching Assistant',
        organization: 'IPB University',
        location: 'Bogor, Indonesia',
        logoUrl: 'images/logo_ipb.png',
        description: 'Research university offering undergraduate and applied degree programs.',
        achievements: [
            'Mentored 38 students across 14 multimedia practicum sessions by delivering hands-on technical guidance, design critique, and tooling feedback using Pacdora, Canva, and Figma.',
            'Assisted the lead lecturer in supervising and coordinating two major milestone deliverables (product designs and commercial advertising content), keeping student milestone tracking 100% on schedule.'
        ],
        technologies: ['Figma', 'Pacdora', 'Canva', 'Multimedia Design', 'Mentoring & Feedback', 'Project Supervision']
    },
    {
        period: 'Jan 2026 – May 2026',
        role: 'Full Stack Developer Intern',
        organization: 'Pemerintah Kota Depok',
        location: 'Depok, Indonesia',
        logoUrl: 'images/logo_depok.png',
        description: 'Local government agency providing public services in Depok.',
        achievements: [
            'Applied the Prototyping SDLC methodology to translate civic organizational needs into functional specifications and UML diagrams, designing the complete UI/UX and engineering 13 core features in 4 months using Laravel 11, PHP, JavaScript, and MySQL.',
            'Formulated and executed 46 comprehensive Black Box Testing test cases (positive & negative scenarios) achieving a 100% pass rate, coupled with end-user usability testing that secured an outstanding System Usability Scale (SUS) score of 95/100.'
        ],
        technologies: ['Laravel 11', 'PHP', 'JavaScript', 'MySQL', 'Prototyping SDLC', 'UML Modeling', 'Black Box Testing (100%)', 'SUS (95/100)']
    },
    {
        period: 'Aug 2025 – Dec 2025',
        role: 'Full Stack Developer Intern',
        organization: 'Pemerintah Kota Depok',
        location: 'Depok, Indonesia',
        logoUrl: 'images/logo_depok.png',
        description: 'Local government agency providing public services in Depok.',
        achievements: [
            'Adopted Agile methodology to translate civil servant requirements into functional workflows, designing user interfaces and building 8 core features within 3 months using Laravel, PHP, JavaScript, jQuery, AJAX, and MySQL for the internal AJAK website.',
            'Conducted 22 Black Box Testing test cases validating feature reliability, business logic boundaries, and user compliance, achieving a 100% pass rate with zero unresolved defects before staging deployment.'
        ],
        technologies: ['Laravel', 'PHP', 'JavaScript', 'jQuery', 'AJAX', 'MySQL', 'Agile Methodology', 'Black Box Testing (100%)']
    }
];

export const EDUCATION_DATA: Education = {
    period: '2022 – 2026',
    institution: 'IPB University (Institut Pertanian Bogor)',
    degree: 'Applied Bachelor’s Degree (D4)',
    major: 'Software Engineering Technology',
    gpa: '3.54 / 4.00',
    logoUrl: 'images/logo_ipb.png',
    highlights: [
        'Focus Areas: Full-Stack Web Development with a strong interest in Frontend Development, UI/UX Design, Software Testing, and Database Management.',
        'Applied Software Development Life Cycle (SDLC) methodologies and software testing practices through academic and team-based projects.',
        'Final Thesis: Development of the Work Area Transfer Module for the Depok City Government’s Internal Website.',
        'Certification: BNSP Software Engineering Certification.'
    ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        name: 'Frontend Development',
        description: 'Building responsive, accessible, and interactive web interfaces.',
        skills: [
            { 
                name: 'HTML5', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
                color: '#E34F26'
            },
            { 
                name: 'CSS3', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
                color: '#1572B6'
            },
            { 
                name: 'JavaScript', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
                color: '#F7DF1E'
            },
            { 
                name: 'React', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                color: '#61DAFB'
            },
            { 
                name: 'Tailwind CSS', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
                color: '#06B6D4'
            },
            { 
                name: 'Bootstrap', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
                color: '#7952B3'
            },
        ]
    },
    {
        name: 'Backend & Database',
        description: 'Developing application logic, secure APIs, and relational database schemas.',
        skills: [
            { 
                name: 'PHP', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
                color: '#777BB4'
            },
            { 
                name: 'Laravel', 
                icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg',
                color: '#FF2D20'
            },
            { 
                name: 'MySQL', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
                color: '#4479A1'
            },
            { 
                name: 'RESTful API', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
                color: '#009688'
            }
        ]
    },
    {
        name: 'UI/UX Design',
        description: 'Designing wireframes, high-fidelity prototypes, and design systems.',
        skills: [
            { 
                name: 'Figma', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
                color: '#F24E1E'
            },
            { 
                name: 'Wireframing', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg',
                color: '#FF61F6'
            },
            { 
                name: 'Usability (SUS)', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg',
                color: '#0052CC'
            },
        ]
    },
    {
        name: 'Software Engineering & QA',
        description: 'Testing methodologies, version control, and API testing tools.',
        skills: [
            { 
                name: 'Git & GitHub', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
                color: '#F05032'
            },
            { 
                name: 'Postman', 
                icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
                color: '#FF6C37'
            },
            { 
                name: 'Apache JMeter', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
                color: '#D22128'
            },
            { 
                name: 'Jira', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
                color: '#0052CC'
            },
            { 
                name: 'Black Box Testing', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg',
                color: '#43B02A'
            },
            { 
                name: 'UAT Testing', 
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg',
                color: '#172B4D'
            },
        ]
    }
];

export const CERTIFICATES: Certificate[] = [
    {
        id: 'cert-bajau',
        title: 'Mini Bootcamp Software Testing',
        issuer: 'PT Bajau Escorindo',
        issueDate: 'Jul 2026',
        credentialId: 'BE/185/HRD-SBC/VIII/2026',
        credentialUrl: 'https://www.linkedin.com/in/anatasyawp/overlay/Certifications/416569369/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
        category: 'Software Testing & QA',
        type: 'certification',
        badge: 'Bootcamp Graduate',
        description: 'Comprehensive software testing training covering manual testing practices, test cases design, defect reporting, and test execution.',
        skills: ['Software Quality Assurance', 'Manual Testing', 'Software Testing', 'Test Case Design', 'Defect Tracking'],
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'cert-bnsp',
        title: 'BNSP Certified Software Engineer',
        issuer: 'LSP Vokasi IPB / BNSP',
        issueDate: 'Jul 2026',
        credentialId: '285/LSP.928.2/VII/2026',
        credentialUrl: 'https://www.linkedin.com/in/anatasyawp/overlay/Certifications/415729051/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
        category: 'National Competency Certification',
        type: 'license',
        badge: 'BNSP National Certified',
        description: 'National professional certification validating competencies in software engineering, architecture, SDLC implementation, and code reliability.',
        skills: ['Software Development Life Cycle (SDLC)', 'Model-View-Controller (MVC)', 'Software Architecture', 'OOP', 'Database Management', 'Code Verification'],
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'cert-myskill',
        title: 'Short Class Data Visualization with Microsoft Excel',
        issuer: 'MySkill',
        issueDate: 'Jun 2025',
        credentialId: '263908/EXL/LM/07/2025',
        credentialUrl: 'https://www.linkedin.com/in/anatasyawp/overlay/Certifications/988774674/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
        category: 'Data Analysis & Analytics',
        type: 'certification',
        badge: 'MySkill Certified',
        description: 'Specialized course in transforming raw data into visual dashboards, dynamic charting, and actionable business insights using Microsoft Excel.',
        skills: ['Data Analysis', 'Data Visualization', 'Microsoft Excel', 'Dashboard Reporting'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'cert-bwa',
        title: 'Complete UI Designer: Visual Design, Prototype, Usability Testing',
        issuer: 'BuildWithAngga',
        issueDate: 'Feb 2024',
        credentialId: 'J3GKYZjcrf',
        credentialUrl: 'https://www.linkedin.com/in/anatasyawp/overlay/Certifications/1508047857/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
        category: 'UI/UX Design',
        type: 'certification',
        badge: 'Industry Design Certificate',
        description: 'Comprehensive UI design masterclass focusing on design systems, high-fidelity wireframing, component tokens, interactive prototyping, and usability testing.',
        skills: ['Figma (Software)', 'User Interface Design', 'Prototyping', 'Usability Testing', 'Design System'],
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'ach-airef',
        title: 'Juara 3 AIReF Poster Competition',
        issuer: 'HIMASHI Universitas Andalas',
        association: 'Institut Pertanian Bogor (IPB)',
        issueDate: 'Sep 2024',
        credentialUrl: 'https://www.linkedin.com/in/anatasyawp/overlay/Honor/1506369033/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
        category: 'National Competition',
        type: 'achievement',
        badge: 'Juara 3',
        description: 'AIReF Poster Competition organized by International Relations (HIMASHI) Universitas Andalas, creating visual design communications for public awareness.',
        skills: ['Visual Design', 'Poster Design', 'Creative Communication', 'Infographics'],
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'ach-harvest',
        title: 'Juara 3 Harvest Pangan Chapter X Infographics Competition',
        issuer: 'HMITP Universitas Bakrie',
        association: 'Institut Pertanian Bogor (IPB)',
        issueDate: 'Mar 2024',
        credentialUrl: 'https://www.linkedin.com/in/anatasyawp/overlay/Honor/1503296932/treasury/?profileId=ACoAAEJEYHoBhwY2GxB_qAPAZ7QC2Yp6NXuF03s',
        category: 'National Competition',
        type: 'achievement',
        badge: 'Juara 3',
        description: 'Harvest Pangan Chapter X Infographics Competition yang diselenggarakan oleh HMITP Universitas Bakrie dengan tema "Pangan Nusantara Kaya Akan Rasa dan Mendukung Keberlanjutan Lingkungan".',
        skills: ['Infographics Design', 'Information Architecture', 'Sustainable Food Awareness', 'Data Storytelling'],
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
    }
];

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'ach-airef',
        title: 'Juara 3 AIReF Poster Competition',
        event: 'HIMASHI Universitas Andalas · Berasosiasi dengan IPB',
        year: '2024',
        description: 'Penghargaan Juara 3 dalam kompetisi poster tingkat nasional AIReF yang diadakan oleh Hubungan Internasional Universitas Andalas.',
        badge: 'Juara 3 Nasional'
    },
    {
        id: 'ach-harvest',
        title: 'Juara 3 Harvest Pangan Chapter X Infographics Competition',
        event: 'HMITP Universitas Bakrie · Berasosiasi dengan IPB',
        year: '2024',
        description: 'Mengangkat tema "Pangan Nusantara Kaya Akan Rasa dan Mendukung Keberlanjutan Lingkungan" dengan desain visual infografis yang edukatif dan terstruktur.',
        badge: 'Juara 3 Nasional'
    }
];
