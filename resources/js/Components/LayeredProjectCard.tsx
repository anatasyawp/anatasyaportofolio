import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Layers, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Project } from '../types/portfolio';

interface LayeredProjectCardProps {
    project: Project;
    onSelectProject: (project: Project) => void;
    reverse?: boolean;
}

export const LayeredProjectCard: React.FC<LayeredProjectCardProps> = ({
    project,
    onSelectProject,
    reverse = false,
}) => {
    const shouldReduceMotion = useReducedMotion();
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (shouldReduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / 25;
        const y = (e.clientY - (rect.top + rect.height / 2)) / 25;
        setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => {
        setMouseOffset({ x: 0, y: 0 });
    };

    return (
        <article className="py-12 md:py-20 border-b border-gray-200 dark:border-white/5 last:border-0">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Left/Right Text & Specification Content */}
                <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Project Header Meta */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs font-semibold text-[#881337] dark:text-[#be123c] tracking-wider">
                            PROJECT {project.number}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                            {project.category}
                        </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                        {project.title}
                    </h3>

                    {/* Client & Period */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-5">
                        <span className="text-gray-800 dark:text-gray-200 font-medium">{project.client}</span>
                        <span>•</span>
                        <span>{project.period}</span>
                        <span>•</span>
                        <span className="text-[#881337] dark:text-[#be123c]">{project.role}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                        {project.summary}
                    </p>

                    {/* Key Metrics / Highlights */}
                    {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5">
                            {project.metrics.map((m, idx) => (
                                <div key={idx}>
                                    <div className="text-lg font-bold text-gray-900 dark:text-white font-mono">{m.value}</div>
                                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-mono rounded bg-gray-100 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => onSelectProject(project)}
                            className="group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#881337] hover:bg-[#6d1230] rounded-md shadow-md shadow-[#881337]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span>Read Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <span>Source Code</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Right/Left Signature Interactive Cascading 3D Layered Showcase */}
                <div
                    className={`lg:col-span-6 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        onClick={() => onSelectProject(project)}
                        className="group relative cursor-pointer min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-4 sm:p-8 rounded-3xl bg-gradient-to-br from-gray-50/80 via-white to-gray-50/60 border border-gray-200/80 hover:border-[#881337]/30 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                        {/* Ambient Burgundy Glow Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#881337]/05 via-transparent to-rose-50/40 pointer-events-none" />
                        
                        {/* 3D Perspective Stage Container */}
                        <div 
                            className="relative w-full max-w-[460px] h-[280px] sm:h-[320px] transition-transform duration-700 ease-out flex items-center justify-center"
                            style={{
                                perspective: '1200px',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {/* Layer 3 (Deepest / Back Stepped Card) */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: (mouseOffset.x * 0.25) + 50,
                                    y: (mouseOffset.y * 0.25) - 35,
                                    rotateX: 12 + (mouseOffset.y * 0.15),
                                    rotateY: -18 + (mouseOffset.x * 0.15),
                                    rotateZ: 4,
                                }}
                                transition={{ type: 'spring', damping: 20, stiffness: 90 }}
                                className="absolute w-[80%] aspect-[16/10] rounded-xl overflow-hidden bg-white border border-gray-300 shadow-[10px_18px_35px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:translate-x-16 group-hover:-translate-y-10 group-hover:shadow-[15px_25px_45px_rgba(136,19,55,0.15)]"
                                style={{ transformOrigin: 'bottom left' }}
                            >
                                <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-200 flex items-center justify-between text-[10px] text-gray-600 font-mono">
                                    <span className="truncate">{project.layerImages[2]?.caption || 'Architecture & Testing'}</span>
                                    <span className="text-[#881337] font-semibold">03</span>
                                </div>
                                <div className="w-full h-full bg-gray-50 overflow-hidden">
                                    <img
                                        src={project.layerImages[2]?.url || project.layerImages[0].url}
                                        alt="Back Layer Preview"
                                        className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
                                    />
                                </div>
                            </motion.div>

                            {/* Layer 2 (Middle Stepped Card) */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: (mouseOffset.x * 0.4) + 20,
                                    y: (mouseOffset.y * 0.4) - 15,
                                    rotateX: 14 + (mouseOffset.y * 0.2),
                                    rotateY: -20 + (mouseOffset.x * 0.2),
                                    rotateZ: 5,
                                }}
                                transition={{ type: 'spring', damping: 20, stiffness: 95 }}
                                className="absolute w-[82%] aspect-[16/10] rounded-xl overflow-hidden bg-white border border-gray-300 shadow-[15px_25px_45px_rgba(0,0,0,0.14)] z-10 transition-all duration-500 group-hover:translate-x-6 group-hover:-translate-y-4"
                                style={{ transformOrigin: 'bottom left' }}
                            >
                                <div className="bg-gray-50 px-3 py-1.5 border-b border-gray-200 flex items-center justify-between text-[10px] text-gray-700 font-mono">
                                    <span className="truncate">{project.layerImages[1]?.caption || 'System Workflow'}</span>
                                    <span className="text-[#881337] font-semibold">02</span>
                                </div>
                                <div className="w-full h-full bg-gray-100 overflow-hidden">
                                    <img
                                        src={project.layerImages[1]?.url || project.layerImages[0].url}
                                        alt="Middle Layer Preview"
                                        className="w-full h-full object-cover filter brightness-[0.96]"
                                    />
                                </div>
                            </motion.div>

                            {/* Layer 1 (Forefront Stepped Card - Hero Project Window) */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: (mouseOffset.x * 0.55) - 20,
                                    y: (mouseOffset.y * 0.55) + 15,
                                    rotateX: 16 + (mouseOffset.y * 0.25),
                                    rotateY: -22 + (mouseOffset.x * 0.25),
                                    rotateZ: 6,
                                }}
                                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                                className="absolute w-[86%] aspect-[16/10] rounded-xl overflow-hidden bg-white border-2 border-white shadow-[20px_35px_60px_rgba(0,0,0,0.18)] z-20 transition-all duration-500 group-hover:-translate-x-4 group-hover:translate-y-2 group-hover:border-[#881337]/40"
                                style={{ transformOrigin: 'bottom left' }}
                            >
                                {/* Browser-style Header Bar */}
                                <div className="bg-white px-3.5 py-2 border-b border-gray-200 flex items-center justify-between text-[11px] text-gray-700">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    </div>
                                    <span className="font-mono text-[10px] font-semibold text-gray-800 tracking-wider">
                                        {project.number} · {project.title.substring(0, 24)}...
                                    </span>
                                    <span className="text-[10px] font-mono text-[#881337] font-bold">01</span>
                                </div>

                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                    <img
                                        src={project.layerImages[0].url}
                                        alt={project.layerImages[0].alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                    
                                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                                        <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/20">
                                            {project.badge}
                                        </span>
                                        <span className="text-[11px] font-mono font-medium text-white/90">
                                            {project.technologies[0]} · {project.technologies[1]}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Interactive Badge (Tap for STAR Case Study) */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: mouseOffset.x * 0.7,
                                    y: mouseOffset.y * 0.7,
                                }}
                                transition={{ type: 'spring', damping: 15, stiffness: 120 }}
                                className="absolute bottom-3 right-3 sm:right-6 z-30 px-3.5 py-2 rounded-xl bg-white/95 border border-[#881337]/30 shadow-xl backdrop-blur-md flex items-center gap-2 group-hover:scale-105 transition-transform"
                            >
                                <span className="w-2 h-2 rounded-full bg-[#881337] animate-pulse" />
                                <div className="text-[11px] font-mono font-medium text-gray-800">
                                    <span className="font-bold text-[#881337]">Tap / Click</span> to view STAR Case Study
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    );
};
