import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Download, Terminal, Sparkles, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const HeroSection: React.FC = () => {
    const shouldReduceMotion = useReducedMotion();
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (shouldReduceMotion) return;
        const { clientX, clientY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) / 30;
        const y = (clientY - (rect.top + rect.height / 2)) / 30;
        setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => {
        setMouseOffset({ x: 0, y: 0 });
    };

    return (
        <section
            id="top"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-radial-gradient"
        >
            {/* Subtle background ambient gradients */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Column: Text & Editorial Presentation */}
                    <div className="lg:col-span-7 z-10 flex flex-col justify-center">
                        {/* Status / Role pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-indigo-300 mb-6 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Available for Full-Stack & IT Developer Roles</span>
                        </motion.div>

                        {/* Name and Positioning */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="text-sm uppercase tracking-[0.25em] font-semibold text-slate-400 mb-3 flex items-center gap-2">
                                <span>{PERSONAL_INFO.name}</span>
                                <span className="text-indigo-400 font-normal">/ Tasya</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
                                Building Digital Experiences Through{' '}
                                <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-indigo-100 bg-clip-text text-transparent">
                                    Code, Design, & Engineering.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-light">
                                Software Engineering graduate from IPB University (GPA 3.54) with verified experience delivering enterprise-grade modules at Pemerintah Kota Depok. Specializing in high-performance Laravel architectures, modern reactive interfaces, and rigorous Black Box Quality Assurance.
                            </p>
                        </motion.div>

                        {/* CTA Buttons & Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap items-center gap-4 pt-2"
                        >
                            <a
                                href="#projects"
                                className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Explore My Work</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {PERSONAL_INFO.hasCvFile ? (
                                <a
                                    href={PERSONAL_INFO.cvUrl}
                                    download
                                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-all hover:text-white"
                                >
                                    <Download className="w-4 h-4 text-indigo-400" />
                                    <span>Download CV</span>
                                </a>
                            ) : (
                                <span
                                    title="CV asset will be uploaded soon"
                                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-400 bg-white/[0.02] border border-white/5 rounded-lg cursor-not-allowed opacity-80"
                                >
                                    <Download className="w-4 h-4 text-slate-500" />
                                    <span>CV (Available on Request)</span>
                                </span>
                            )}

                            {/* Social Icons */}
                            <div className="flex items-center gap-2 pl-2">
                                <a
                                    href={PERSONAL_INFO.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub Profile"
                                    className="p-3 text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-all"
                                >
                                    <GithubIcon className="w-4 h-4" />
                                </a>
                                <a
                                    href={PERSONAL_INFO.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn Profile"
                                    className="p-3 text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-lg transition-all"
                                >
                                    <LinkedinIcon className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>

                        {/* Verified Credential Snapshot */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/10 max-w-xl"
                        >
                            <div>
                                <div className="text-2xl font-bold text-white font-mono">3.54<span className="text-xs text-indigo-400">/4.00</span></div>
                                <div className="text-xs text-slate-400 mt-0.5">IPB University GPA</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white font-mono">13+8<span className="text-xs text-indigo-400"> Feats</span></div>
                                <div className="text-xs text-slate-400 mt-0.5">Pemkot Depok Modules</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white font-mono">95<span className="text-xs text-indigo-400">/100</span></div>
                                <div className="text-xs text-slate-400 mt-0.5">SUS Usability Score</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Signature Layered Visual Experience */}
                    <div className="lg:col-span-5 relative flex justify-center items-center">
                        <div className="relative w-full max-w-[480px] h-[480px] flex items-center justify-center">

                            {/* Back Layer: Code Terminal Mockup */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: mouseOffset.x * -0.6,
                                    y: mouseOffset.y * -0.6,
                                    rotateZ: -4,
                                }}
                                transition={{ type: 'spring', damping: 25, stiffness: 100 }}
                                className="absolute w-[85%] rounded-xl overflow-hidden glass-panel shadow-2xl z-0 transform -translate-y-8 -translate-x-6 border border-white/10"
                            >
                                <div className="bg-[#12141F] px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                                        <Terminal className="w-3 h-3 text-indigo-400" /> artisan test --filter=PWKTest
                                    </span>
                                </div>
                                <div className="p-4 font-mono text-xs text-slate-300 bg-[#0A0C14]/90 space-y-1.5">
                                    <div className="text-emerald-400">PASS Tests\Feature\PWKWorkflowTest</div>
                                    <div className="text-slate-400">✓ mutasi_request_can_be_submitted_by_pegawai</div>
                                    <div className="text-slate-400">✓ bkpsdm_verification_tier_validated</div>
                                    <div className="text-slate-400">✓ sk_generation_payload_integrity_check</div>
                                    <div className="text-indigo-300 pt-1">Tests: 46 passed (100% assertions)</div>
                                </div>
                            </motion.div>

                            {/* Middle Layer: Enterprise Project Snapshot Preview */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: mouseOffset.x * 0.8,
                                    y: mouseOffset.y * 0.8,
                                    rotateZ: 3,
                                }}
                                transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                                className="absolute w-[90%] rounded-xl overflow-hidden glass-panel shadow-2xl z-10 transform translate-y-4 translate-x-4 border border-indigo-500/20"
                            >
                                <div className="bg-[#151928] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                        <span className="text-xs font-medium text-slate-200">PWK Enterprise Architecture</span>
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                                        Pemkot Depok
                                    </span>
                                </div>
                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                                    <img
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                                        alt="PWK Module Preview"
                                        className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                                        <span className="text-white font-medium">Modul Perpindahan Wilayah Kerja</span>
                                        <span className="text-emerald-400 font-mono text-[11px]">SUS 95/100</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Top Floating Accent Card */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: mouseOffset.x * 1.4,
                                    y: mouseOffset.y * 1.4,
                                    rotateZ: -2,
                                }}
                                transition={{ type: 'spring', damping: 18, stiffness: 140 }}
                                className="absolute bottom-4 -left-2 z-20 p-3.5 rounded-xl glass-panel border border-white/15 shadow-2xl backdrop-blur-xl flex items-center gap-3"
                            >
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-white">Full-Stack & QA Focused</div>
                                    <div className="text-[11px] text-slate-400 font-mono">Laravel • React • Inertia • MySQL</div>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                </div>

                {/* Subtle Scroll Indicator */}
                <div className="mt-14 flex justify-center">
                    <a
                        href="#projects"
                        aria-label="Scroll to projects"
                        className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                        <span className="text-[10px] uppercase font-mono tracking-widest">Explore Projects</span>
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                    </a>
                </div>
            </div>
        </section>
    );
};
