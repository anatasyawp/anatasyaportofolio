import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA } from '../data/portfolioData';

export const ProfileSection: React.FC = () => {
    const shouldReduceMotion = useReducedMotion();
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (shouldReduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / 30;
        const y = (e.clientY - (rect.top + rect.height / 2)) / 30;
        setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => {
        setMouseOffset({ x: 0, y: 0 });
    };

    return (
        <section
            id="profile"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-white"
        >
            {/* Subtle burgundy ambient glow */}
            <div className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#881337]/20 via-[#881337]/08 to-transparent blur-[140px] pointer-events-none opacity-60" />
            <div className="absolute left-1/4 bottom-10 w-[400px] h-[400px] rounded-full bg-gray-100/60 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                    
                    {/* Column 1: Editorial Introduction Text (order-1 on both mobile and desktop) */}
                    <div className="lg:col-span-7 flex flex-col justify-center order-1 pt-4 lg:pt-0">
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#881337]/08 border border-[#881337]/20 text-xs font-mono text-[#881337] mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#881337] animate-pulse" />
                            <span>{PERSONAL_INFO.professionalStatus}</span>
                        </motion.div>

                        {/* Large Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-6">
                                Hello, I'm{' '}
                                <span className="font-serif italic font-normal text-[#881337]">
                                    Anatasya Putri.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-8 font-normal">
                                {PERSONAL_INFO.subheadline}
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap items-center gap-4 pt-2"
                        >
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#881337] hover:bg-[#6d1230] rounded-full shadow-lg shadow-[#881337]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Let's Build Together</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-gray-700 hover:text-[#881337] transition-colors"
                            >
                                <span>Explore Projects</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Column 2: Framed Portrait of Tasya (order-2 so on mobile it appears right under the Hello text) */}
                    <div className="lg:col-span-5 relative flex justify-center items-center order-2 mt-4 lg:mt-0">
                        <div className="relative w-full max-w-[360px] sm:max-w-[420px] flex items-center justify-center">

                            {/* Warm atmospheric light behind the framed photo */}
                            <div className="absolute inset-0 m-auto w-[320px] h-[380px] rounded-3xl bg-gradient-to-tr from-[#881337]/15 via-rose-100/30 to-transparent blur-[60px] pointer-events-none" />

                            {/* Elegant Modern Portrait Frame */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: mouseOffset.x * 0.35,
                                    y: mouseOffset.y * 0.35,
                                }}
                                transition={{ type: 'spring', damping: 25, stiffness: 90 }}
                                className="relative z-10 w-full rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-white/90 border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.10)] backdrop-blur-sm"
                            >
                                {/* Inner Picture Frame with subtle burgundy border accent */}
                                <div className="relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 border border-[#881337]/15 flex items-end justify-center shadow-inner">
                                    {/* Portrait Image */}
                                    <img
                                        src={`./${PERSONAL_INFO.avatarUrl}`}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (target.src.indexOf('anatasyaportofolio') === -1) {
                                                target.src = '/anatasyaportofolio/public/images/tasya_cutout.png';
                                            }
                                        }}
                                        alt={PERSONAL_INFO.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                                    />

                                    {/* Corner decorative accent */}
                                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-gray-200/70 text-[11px] font-mono font-medium text-gray-700 shadow-sm">
                                        Anatasya Putri
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
