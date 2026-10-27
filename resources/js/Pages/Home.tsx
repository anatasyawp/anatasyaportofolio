import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { ThemeProvider } from '../context/ThemeContext';
import { Navbar } from '../Components/Navbar';
import { ProfileSection } from '../Components/ProfileSection';
import { ProjectShowcase } from '../Components/ProjectShowcase';
import { CertificatesAndAchievements } from '../Components/CertificatesAndAchievements';
import { ExperienceAndEducation, SkillsSection } from '../Components/ExperienceAndSkills';
import { ContactAndFooter } from '../Components/ContactAndFooter';
import { ProjectDetailModal } from '../Components/ProjectDetailModal';
import { Project } from '../types/portfolio';

export default function Home() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-white text-gray-800 selection:bg-[#881337]/15 selection:text-[#881337]">
                <Head>
                    <title>Anatasya Wenita Putri — Full-Stack Developer & Software Engineering Portfolio</title>
                    <meta
                        name="description"
                        content="Portfolio of Anatasya Wenita Putri (Tasya). Fresh Graduate in D4 Software Engineering from IPB University. Full-Stack Developer with experience in Laravel, PHP, MySQL, JavaScript, and Software Quality Assurance at Pemerintah Kota Depok."
                    />
                </Head>

                {/* Navigation Bar with Dark / Light Switch */}
                <Navbar />

                {/* Main Content Layout:
                    1. Profile with Photo ("Hello, I'm Anatasya Putri.")
                    2. Work Experience & Education
                    3. Featured Projects Showcase
                    4. Certificates & Achievements
                    5. Skills & Tech Stack
                    6. Contact & Footer
                */}
                <main>
                    {/* 1. Profile Section with Tasya's Photo & Introduction */}
                    <ProfileSection />

                    {/* 2. Professional Work Experience & Education (Right below Intro) */}
                    <ExperienceAndEducation />

                    {/* 3. Featured Projects Showcase */}
                    <ProjectShowcase onSelectProject={(project) => setSelectedProject(project)} />

                    {/* 4. Certificates & Achievements */}
                    <CertificatesAndAchievements />

                    {/* 5. Core Skills & Tech Stack */}
                    <SkillsSection />

                    {/* 6. Contact Form & Footer */}
                    <ContactAndFooter />
                </main>

                {/* Project Case Study Detail Overlay */}
                <ProjectDetailModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    onSelectProject={(project) => setSelectedProject(project)}
                />
            </div>
        </ThemeProvider>
    );
}
