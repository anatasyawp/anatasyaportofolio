import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { Sparkles, ArrowUpRight, FileText, Eye, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectShowcaseProps {
    onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
    const shouldReduceMotion = useReducedMotion();
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const totalProjects = PROJECTS.length;

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
        const x = (e.clientX - (rect.left + rect.width / 2)) / 40;
        const y = (e.clientY - (rect.top + rect.height / 2)) / 40;
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
        <section id="projects" className="py-24 relative bg-white border-t border-gray-200 overflow-hidden">
            {/* Subtle atmospheric glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-[#881337]/08 via-rose-50/40 to-transparent blur-[140px] pointer-events-none rounded-full" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gray-200">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#881337]/08 border border-[#881337]/20 text-xs font-mono text-[#881337] mb-3">
                            <Zap className="w-3.5 h-3.5 text-[#881337] fill-[#881337]" />
                            <span>FEATURED PROJECTS · 3D INTERACTIVE CAROUSEL</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight uppercase">
                            FEATURED <span className="font-serif italic font-normal text-[#881337]">PROJECTS</span>
                        </h2>
                    </div>

                    {/* Quick Tab Selector & Arrows */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-2xl border border-gray-200">
                            {PROJECTS.map((proj, idx) => {
                                const isCurrent = activeIdx === idx;
                                return (
                                    <button
                                        key={proj.id}
                                        type="button"
                                        onClick={() => setActiveIdx(idx)}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all font-bold ${
                                            isCurrent
                                                ? 'bg-[#881337] text-white shadow-md shadow-[#881337]/30 scale-100'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-white/70'
                                        }`}
                                    >
                                        {getProjectShortName(proj)}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Arrow navigation buttons */}
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

                {/* THE 3D INTERACTIVE PROJECT STAGE */}
                <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative w-full rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 border border-gray-200 shadow-xl overflow-hidden min-h-[640px] lg:min-h-[720px] flex flex-col justify-between"
                >
                    {/* Background Subtle Watermark Type */}
                    <div className="absolute top-6 left-8 pointer-events-none select-none z-0">
                        <span className="text-7xl sm:text-9xl lg:text-[150px] font-black tracking-tighter text-gray-900/[0.035] leading-none uppercase">
                            PORTFOLIO
                        </span>
                    </div>

                    {/* Top Status Bar: Current Project Info & Direct Links */}
                    <div className="relative z-30 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#881337] animate-ping" />
                            <span className="font-mono text-xs font-bold text-[#881337] uppercase tracking-wider">
                                ACTIVE: {getProjectShortName(PROJECTS[activeIdx])}
                            </span>
                            <span className="hidden sm:inline text-xs text-gray-300">|</span>
                            <span className="hidden sm:inline text-xs font-mono text-gray-600">
                                {PROJECTS[activeIdx]?.client} · {PROJECTS[activeIdx]?.period}
                            </span>
                        </div>

                        {/* Direct Links: GitHub, Figma, Docs, and Modal Open */}
                        <div className="flex items-center gap-2">
                            {PROJECTS[activeIdx]?.githubUrl && (
                                <a
                                    href={PROJECTS[activeIdx].githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="GitHub Repository"
                                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 hover:text-[#881337] shadow-sm transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-mono font-bold"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                    <span className="hidden md:inline">GitHub</span>
                                </a>
                            )}
                            {PROJECTS[activeIdx]?.figmaUrl && (
                                <a
                                    href={PROJECTS[activeIdx].figmaUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Figma UI/UX Design"
                                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-purple-600 hover:text-purple-700 shadow-sm transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-mono font-bold"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 12a3 3 0 0 0 3-3 3 3 0 0 0-3-3H9v6h3zm0 0a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H9zm0-12a3 3 0 0 0-3 3v3h6a3 3 0 0 0-3-3 3 3 0 0 0 0-3zm-3 15a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3v-3H9zm0-9a3 3 0 0 0-3 3 3 3 0 0 0 3 3h3V6H9z" />
                                    </svg>
                                    <span className="hidden md:inline">Figma</span>
                                </a>
                            )}
                            {PROJECTS[activeIdx]?.docUrl && (
                                <a
                                    href={PROJECTS[activeIdx].docUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Documentation & SRS"
                                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 hover:text-[#881337] shadow-sm transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-mono"
                                >
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <span className="hidden md:inline">Docs</span>
                                </a>
                            )}
                            <button
                                type="button"
                                onClick={() => onSelectProject(PROJECTS[activeIdx])}
                                className="px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white shadow-md shadow-[#881337]/20 transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                            >
                                <Eye className="w-4 h-4" />
                                <span>Inspect Details</span>
                            </button>
                        </div>
                    </div>

                    {/* 3D ROTATING DEPTH STAGE WITH NO OVERLAP */}
                    <div
                        className="relative w-full my-auto py-8 sm:py-12 flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-visible"
                        style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
                    >
                        {/* Side Left Floating Arrow Indicator (for easy click) */}
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous"
                            className="absolute left-0 sm:left-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/95 hover:bg-white text-gray-800 hover:text-[#881337] shadow-lg border border-gray-200 transition-all hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-sm cursor-pointer"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Side Right Floating Arrow Indicator */}
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next"
                            className="absolute right-0 sm:right-4 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/95 hover:bg-white text-gray-800 hover:text-[#881337] shadow-lg border border-gray-200 transition-all hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-sm cursor-pointer"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* 3 Cards Dynamic Cycling Positioning */}
                        {PROJECTS.map((proj, idx) => {
                            // Calculate relative cyclic position from activeIdx: 0 = Front, 1 = Middle/Right, 2 = Back/Left
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
                                // Front Card: Main focus, closest to viewer, interactive
                                xOffset = 0;
                                yOffset = 20;
                                zOffset = 100;
                                rotateY = -6;
                                rotateX = 6;
                                rotateZ = 0;
                                scale = 1.02;
                                zIndex = 35;
                                opacity = 1;
                            } else if (relPos === 1) {
                                // Next Card: Stepped to the right & back, tilted, fully visible header
                                xOffset = 240; // Clean horizontal spacing to prevent awkward overlap
                                yOffset = -50;
                                zOffset = -80;
                                rotateY = -24;
                                rotateX = 10;
                                rotateZ = 3;
                                scale = 0.92;
                                zIndex = 25;
                                opacity = 0.88;
                            } else if (relPos === 2) {
                                // Previous Card: Stepped to the left & deep back
                                xOffset = -240; // Distinct left offset
                                yOffset = -50;
                                zOffset = -120;
                                rotateY = 16;
                                rotateX = 10;
                                rotateZ = -3;
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
                                        rotateX: rotateX + (mouseOffset.y * 0.1),
                                        rotateY: rotateY + (mouseOffset.x * 0.1),
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
                                    className={`absolute w-[86%] sm:w-[56%] max-w-[540px] aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer bg-white border-2 transition-shadow duration-300 ${
                                        isSelected
                                            ? 'border-[#881337] ring-4 ring-[#881337]/20 shadow-[0_30px_70px_rgba(136,19,55,0.22)]'
                                            : 'border-gray-200 hover:border-[#881337]/60 shadow-[0_20px_45px_rgba(0,0,0,0.10)] hover:opacity-100 hover:scale-[0.95]'
                                    }`}
                                >
                                    {/* Browser Window Bar (Clean title bar with project name) */}
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
                                            {isSelected ? 'ACTIVE' : 'NEXT'}
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

                    {/* Bottom Status / Navigation Controls */}
                    <div className="relative z-30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
                            <span className="px-2 py-0.5 rounded bg-[#881337]/10 font-bold text-[#881337]">
                                STEP {activeIdx + 1} OF {totalProjects}
                            </span>
                            <span className="hidden sm:inline">Gunakan tombol panah untuk rotasi kartu · Klik kartu depan untuk pop-up detail</span>
                        </div>

                        {/* Interactive Project Dot Indicators & Arrow Shortcut */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {PROJECTS.map((p, idx) => (
                                    <button
                                        key={p.id}
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
                </div>

            </div>
        </section>
    );
};

