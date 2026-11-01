import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ArrowUpRight, FileText, Eye, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../lib/useScrollReveal';

interface ProjectShowcaseProps {
    onSelectProject: (project: Project) => void;
    projects?: Project[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject, projects = PROJECTS }) => {
    const { t } = useTranslation();
    const shouldReduceMotion = useReducedMotion();
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const { ref: sectionRef, inView } = useScrollReveal(0.06);

    const rawList = projects && projects.length > 0 ? projects : PROJECTS;
    const projectList = rawList.map((proj) => ({
        ...proj,
        title: t(`projects.items.${proj.id}.title`, { defaultValue: proj.title }),
        category: t(`projects.items.${proj.id}.category`, { defaultValue: proj.category }),
        badge: t(`projects.items.${proj.id}.badge`, { defaultValue: proj.badge }),
        period: t(`projects.items.${proj.id}.period`, { defaultValue: proj.period }),
        client: t(`projects.items.${proj.id}.client`, { defaultValue: proj.client }),
        role: t(`projects.items.${proj.id}.role`, { defaultValue: proj.role }),
        summary: t(`projects.items.${proj.id}.summary`, { defaultValue: proj.summary }),
    }));

    const totalProjects = projectList.length;
    const currProject = projectList[activeIdx] || projectList[0];

    const handlePrev = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveIdx((prev) => (prev - 1 + totalProjects) % totalProjects);
    };

    const handleNext = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveIdx((prev) => (prev + 1) % totalProjects);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (shouldReduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / 45;
        const y = (e.clientY - (rect.top + rect.height / 2)) / 45;
        setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => {
        setMouseOffset({ x: 0, y: 0 });
    };

    // Helper to get project short display label
    const getProjectShortName = (proj: Project) => {
        if (proj.id === 'pwk') return 'MODUL PWK';
        if (proj.id === 'skj') return 'MODUL SKJ';
        if (proj.id === 'tasya-portfolio') return 'ANATASYA PORTFOLIO';
        return proj.title.split('(')[0].trim().toUpperCase();
    };

    return (
        <section id="projects" ref={sectionRef as React.Ref<HTMLElement>} className="py-16 sm:py-24 relative overflow-hidden">
            {/* Seamless organic gradient divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#881337]/20 to-transparent pointer-events-none" />

            {/* Glassmorphism section backing */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/65 to-white/50 backdrop-blur-[6px]" />

            {/* Subtle atmospheric glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] lg:w-[800px] h-[340px] sm:h-[550px] bg-gradient-to-tr from-[#881337]/08 via-rose-50/40 to-transparent blur-[120px] pointer-events-none rounded-full" />

            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* ── Section Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-gray-200">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#881337]/08 border border-[#881337]/20 text-xs font-mono text-[#881337] mb-2 sm:mb-3">
                            <Zap className="w-3.5 h-3.5 text-[#881337] fill-[#881337]" />
                            <span>{t('projects.badge')}</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight uppercase leading-tight">
                            {t('projects.heading')} <span className="font-serif italic font-normal text-[#881337]">{t('projects.headingAccent')}</span>
                        </h2>
                    </div>

                    {/* Navigation buttons + counter badge */}
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100/90 border border-gray-200 font-mono text-xs text-gray-700 shadow-sm">
                            <span className="font-bold text-[#881337]">
                                {String(activeIdx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-500">
                                {String(totalProjects).padStart(2, '0')}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={handlePrev}
                                aria-label="Previous project"
                                className="w-10 h-10 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 hover:text-[#881337] hover:border-[#881337]/40 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                aria-label="Next project"
                                className="w-10 h-10 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 hover:text-[#881337] hover:border-[#881337]/40 shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── MOBILE VIEW (< lg): High-Impact Responsive Touch Showcase ── */}
                <div className="block lg:hidden">
                    <div className="relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-gray-50/90 via-white to-gray-50/70 border border-gray-200 shadow-xl overflow-hidden">
                        
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-200/80">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="relative flex h-2.5 w-2.5 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#881337] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#881337]" />
                                </span>
                                <span className="font-mono text-xs font-bold text-[#881337] uppercase tracking-wider truncate">
                                    {getProjectShortName(currProject)}
                                </span>
                            </div>

                            {/* Direct Quick Link Icons */}
                            <div className="flex items-center gap-1.5 shrink-0">
                                {currProject.githubUrl && (
                                    <a
                                        href={currProject.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="GitHub Repository"
                                        className="p-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 hover:text-[#881337] shadow-sm transition-all"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                    </a>
                                )}
                                {currProject.figmaUrl && (
                                    <a
                                        href={currProject.figmaUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Figma Prototype"
                                        className="p-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 shadow-sm transition-all"
                                    >
                                        <img
                                            src="./images/icons/figma.svg"
                                            alt="Figma"
                                            className="w-3.5 h-3.5 object-contain"
                                        />
                                    </a>
                                )}
                                {currProject.docUrl && (
                                    <a
                                        href={currProject.docUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Documentation"
                                        className="p-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-blue-600 shadow-sm transition-all"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Interactive Swipeable Project Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currProject.id || activeIdx}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -24 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x > 50) {
                                        handlePrev();
                                    } else if (info.offset.x < -50) {
                                        handleNext();
                                    }
                                }}
                                className="w-full rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden"
                            >
                                {/* Browser Title Bar */}
                                <div className="px-3.5 py-2.5 bg-gray-50/90 border-b border-gray-200 flex items-center justify-between text-xs font-mono">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    </div>
                                    <span className="font-bold text-gray-700 tracking-wide truncate max-w-[170px] uppercase text-[11px]">
                                        {currProject.client}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#881337] text-white">
                                        {t('projects.active')}
                                    </span>
                                </div>

                                {/* Preview Image Showcase with Click Action */}
                                <div
                                    onClick={() => onSelectProject(currProject)}
                                    className="relative w-full aspect-[16/10] overflow-hidden bg-gray-900 cursor-pointer group"
                                >
                                    <img
                                        src={currProject.layerImages[0].url}
                                        alt={currProject.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                    {/* Badges on image */}
                                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                                        <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-rose-200">
                                            ⚡ {currProject.badge}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/25 text-[10px] font-mono text-white">
                                            {currProject.period}
                                        </span>
                                    </div>

                                    {/* Bottom Tap Cue */}
                                    <div className="absolute bottom-2.5 right-2.5">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#881337]/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>{t('projects.openProject')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body & Details */}
                                <div className="p-4 sm:p-5">
                                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#881337] font-semibold mb-1">
                                        <span>PROJECT {currProject.number}</span>
                                        <span>•</span>
                                        <span className="text-gray-500">{currProject.category}</span>
                                    </div>

                                    <h3
                                        onClick={() => onSelectProject(currProject)}
                                        className="text-lg font-black text-gray-900 tracking-tight leading-snug cursor-pointer hover:text-[#881337] transition-colors"
                                    >
                                        {currProject.title}
                                    </h3>

                                    <div className="text-xs font-mono text-gray-500 mt-1 mb-2.5">
                                        {t('projects.role')}: <span className="font-semibold text-gray-700">{currProject.role}</span>
                                    </div>

                                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3.5">
                                        {currProject.summary}
                                    </p>

                                    {/* Tech Stack Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {currProject.technologies.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-mono border border-gray-200/80"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {currProject.technologies.length > 4 && (
                                            <span className="px-1.5 py-0.5 rounded-md bg-rose-50 text-[#881337] text-[10px] font-mono font-bold">
                                                +{currProject.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Primary Ergonomic CTA Button */}
                                    <button
                                        type="button"
                                        onClick={() => onSelectProject(currProject)}
                                        className="w-full py-2.5 px-4 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white font-bold text-xs shadow-md shadow-[#881337]/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>{t('projects.openProject')}</span>
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile Pagination & Swipe Hint */}
                        <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-xs">
                            <span className="text-[11px] font-mono text-gray-500">
                                {t('projects.mobileHint')}
                            </span>

                            <div className="flex items-center gap-1.5">
                                {projectList.map((p, idx) => (
                                    <button
                                        key={p.id || p.slug}
                                        type="button"
                                        onClick={() => setActiveIdx(idx)}
                                        aria-label={`Lihat ${getProjectShortName(p)}`}
                                        className={`h-2 rounded-full transition-all cursor-pointer ${
                                            activeIdx === idx
                                                ? 'w-6 bg-[#881337]'
                                                : 'w-2 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── DESKTOP VIEW (>= lg): 3D Interactive Stage ── */}
                <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="hidden lg:flex relative w-full rounded-3xl p-10 lg:p-12 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 border border-gray-200 shadow-xl overflow-hidden min-h-[680px] flex-col justify-between"
                >
                    {/* Background Subtle Watermark Type */}
                    <div className="absolute top-8 left-10 pointer-events-none select-none z-0">
                        <span className="text-[140px] font-black tracking-tighter text-gray-900/[0.025] leading-none uppercase">
                            PORTFOLIO
                        </span>
                    </div>

                    {/* Top Status Bar: Current Project Info & Direct Links */}
                    <div className="relative z-30 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#881337] animate-ping" />
                            <span className="font-mono text-xs font-bold text-[#881337] uppercase tracking-wider">
                                {t('projects.active')}: {currProject ? getProjectShortName(currProject) : ''}
                            </span>
                            <span className="text-xs text-gray-300">|</span>
                            <span className="text-xs font-mono text-gray-600">
                                {currProject?.client} · {currProject?.period}
                            </span>
                        </div>

                        {/* Direct Links: GitHub, Figma, Docs, and Modal Open */}
                        <div className="flex items-center gap-2">
                            {currProject?.githubUrl && (
                                <a
                                    href={currProject.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="GitHub Repository"
                                    className="px-3 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 hover:text-[#881337] shadow-sm transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-mono font-bold"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                            )}
                            {currProject?.figmaUrl && (
                                <a
                                    href={currProject.figmaUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Figma UI/UX Design"
                                    className="px-3 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 shadow-sm transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-mono font-bold text-gray-700 hover:text-gray-900"
                                >
                                    <img
                                        src="./images/icons/figma.svg"
                                        alt="Figma"
                                        className="w-4 h-4 object-contain shrink-0"
                                    />
                                    <span>Figma</span>
                                </a>
                            )}
                            {currProject?.docUrl && (
                                <a
                                    href={currProject.docUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Documentation & SRS"
                                    className="px-3 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 hover:text-[#881337] shadow-sm transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-mono"
                                >
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <span>{t('projects.docLabel')}</span>
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={() => currProject && onSelectProject(currProject)}
                                className="px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white shadow-md shadow-[#881337]/20 transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                            >
                                <Eye className="w-4 h-4" />
                                <span>{t('projects.openProject')}</span>
                            </button>
                        </div>
                    </div>

                    {/* 3D Depth Stage */}
                    <div
                        className="relative w-full my-auto py-10 flex items-center justify-center min-h-[460px] overflow-visible"
                        style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
                    >
                        {/* Side Left Floating Arrow */}
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous project"
                            className="absolute left-2 z-40 w-12 h-12 rounded-2xl bg-white/95 hover:bg-white text-gray-800 hover:text-[#881337] shadow-lg border border-gray-200 transition-all hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-sm cursor-pointer"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Side Right Floating Arrow */}
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next project"
                            className="absolute right-2 z-40 w-12 h-12 rounded-2xl bg-white/95 hover:bg-white text-gray-800 hover:text-[#881337] shadow-lg border border-gray-200 transition-all hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-sm cursor-pointer"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* 3 Cards Dynamic Positioning */}
                        {projectList.map((proj, idx) => {
                            const relPos = (idx - activeIdx + totalProjects) % totalProjects;

                            let xOffset = 0;
                            let yOffset = 0;
                            let zOffset = 0;
                            let rotateY = 0;
                            let rotateX = 0;
                            let rotateZ = 0;
                            let scale = 1;
                            let zIndex = 30;
                            let opacity = 1;

                            if (relPos === 0) {
                                // Front Card
                                xOffset = 0;
                                yOffset = 10;
                                zOffset = 90;
                                rotateY = -5;
                                rotateX = 5;
                                rotateZ = 0;
                                scale = 1.02;
                                zIndex = 35;
                                opacity = 1;
                            } else if (relPos === 1) {
                                // Next Card (Right)
                                xOffset = 230;
                                yOffset = -35;
                                zOffset = -70;
                                rotateY = -22;
                                rotateX = 8;
                                rotateZ = 2;
                                scale = 0.92;
                                zIndex = 25;
                                opacity = 0.88;
                            } else if (relPos === 2) {
                                // Previous Card (Left)
                                xOffset = -230;
                                yOffset = -35;
                                zOffset = -110;
                                rotateY = 16;
                                rotateX = 8;
                                rotateZ = -2;
                                scale = 0.88;
                                zIndex = 20;
                                opacity = 0.78;
                            }

                            const isSelected = relPos === 0;

                            return (
                                <motion.div
                                    key={proj.id}
                                    onClick={() => {
                                        if (isSelected) {
                                            onSelectProject(proj);
                                        } else {
                                            setActiveIdx(idx);
                                        }
                                    }}
                                    animate={shouldReduceMotion ? { opacity } : {
                                        x: xOffset + (mouseOffset.x * (0.6 - relPos * 0.15)),
                                        y: yOffset + (mouseOffset.y * (0.6 - relPos * 0.15)),
                                        z: zOffset,
                                        rotateX: rotateX + (mouseOffset.y * 0.08),
                                        rotateY: rotateY + (mouseOffset.x * 0.08),
                                        rotateZ,
                                        scale,
                                        opacity,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        damping: 24,
                                        stiffness: 110,
                                        mass: 0.8
                                    }}
                                    style={{
                                        zIndex,
                                        transformOrigin: 'center center',
                                    }}
                                    className={`absolute w-[54%] max-w-[540px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-white border-2 transition-shadow duration-300 ${
                                        isSelected
                                            ? 'border-[#881337] ring-4 ring-[#881337]/20 shadow-[0_30px_70px_rgba(136,19,55,0.22)]'
                                            : 'border-gray-200 hover:border-[#881337]/60 shadow-[0_20px_45px_rgba(0,0,0,0.10)] hover:opacity-100 hover:scale-[0.95]'
                                    }`}
                                >
                                    {/* Browser Window Bar */}
                                    <div className={`px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs font-mono transition-colors ${
                                        isSelected ? 'bg-white' : 'bg-gray-50'
                                    }`}>
                                        <div className="flex items-center space-x-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                        </div>
                                        <span className={`font-bold tracking-wide truncate max-w-[240px] uppercase ${
                                            isSelected ? 'text-[#881337]' : 'text-gray-800'
                                        }`}>
                                            {getProjectShortName(proj)}
                                        </span>
                                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                            isSelected
                                                ? 'bg-[#881337] text-white'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}>
                                            {isSelected ? t('projects.active') : t('projects.next')}
                                        </span>
                                    </div>

                                    {/* Project Preview Image */}
                                    <div className="relative w-full h-[calc(100%-40px)] overflow-hidden bg-gray-100">
                                        <img
                                            src={proj.layerImages[0].url}
                                            alt={proj.title}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                                        {/* Bottom Overlay Info */}
                                        <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
                                            <div className="max-w-[80%]">
                                                <div className="text-[10px] font-mono text-rose-300 font-bold uppercase tracking-wider mb-0.5">
                                                    {getProjectShortName(proj)}
                                                </div>
                                                <h4 className="text-sm sm:text-base font-extrabold tracking-tight truncate leading-tight">
                                                    {proj.title}
                                                </h4>
                                                <div className="text-[11px] font-mono text-gray-300 mt-0.5">
                                                    {proj.role} · {proj.period}
                                                </div>
                                            </div>

                                            <div className={`p-2 rounded-xl backdrop-blur-md border transition-all hover:scale-110 shrink-0 ${
                                                isSelected
                                                    ? 'bg-[#881337] border-[#881337] text-white shadow-md'
                                                    : 'bg-white/20 border-white/30 text-white'
                                            }`}>
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Desktop Bottom Status Bar */}
                    <div className="relative z-30 pt-4 flex items-center justify-between gap-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
                            <span className="px-2 py-0.5 rounded bg-[#881337]/10 font-bold text-[#881337]">
                                {t('projects.step')} {activeIdx + 1} {t('projects.of')} {totalProjects}
                            </span>
                            <span>{t('projects.desktopHint')}</span>
                        </div>

                        {/* Interactive Project Dot Indicators */}
                        <div className="flex items-center gap-2">
                            {projectList.map((p, idx) => (
                                <button
                                    key={p.id || p.slug}
                                    type="button"
                                    onClick={() => setActiveIdx(idx)}
                                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                                        activeIdx === idx
                                            ? 'w-8 bg-[#881337]'
                                            : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    aria-label={`Lihat ${getProjectShortName(p)}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </motion.div>
        </section>
    );
};
