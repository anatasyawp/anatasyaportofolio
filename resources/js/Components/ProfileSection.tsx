import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, MapPin, CheckCircle2, Download } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../lib/useScrollReveal';

/* ── Stagger variants ──────────────────────────────────────────────────────── */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const itemVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const cardVariants = {
    hidden:  { opacity: 0, scale: 0.94, y: 32 },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const ProfileSection: React.FC = () => {
    const shouldReduceMotion = useReducedMotion();
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const { ref, inView } = useScrollReveal(0.1);

    // Typewriter effect state
    const targetText = 'Anatasya.';
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (shouldReduceMotion) {
            setTypedText(targetText);
            return;
        }

        const startTimer = setTimeout(() => setHasStarted(true), 350);
        return () => clearTimeout(startTimer);
    }, [shouldReduceMotion]);

    useEffect(() => {
        if (shouldReduceMotion || !hasStarted) return;

        let timer: ReturnType<typeof setTimeout>;

        if (!isDeleting && typedText === targetText) {
            // Pause 4.5s once fully typed
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, 4500);
        } else if (isDeleting && typedText === '') {
            // Pause 500ms before retyping
            timer = setTimeout(() => {
                setIsDeleting(false);
            }, 500);
        } else {
            const speed = isDeleting ? 38 : 80;
            timer = setTimeout(() => {
                setTypedText((prev) =>
                    isDeleting
                        ? targetText.slice(0, prev.length - 1)
                        : targetText.slice(0, prev.length + 1)
                );
            }, speed);
        }

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, hasStarted, shouldReduceMotion]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (shouldReduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width  / 2)) / 30;
        const y = (e.clientY - (rect.top  + rect.height / 2)) / 30;
        setMouseOffset({ x, y });
    };

    const handleMouseLeave = () => setMouseOffset({ x: 0, y: 0 });

    return (
        <section
            id="profile"
            ref={ref as React.Ref<HTMLElement>}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-transparent"
        >
            {/* Section-local ambient glows */}
            <div className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#881337]/12 via-[#881337]/04 to-transparent blur-[150px] pointer-events-none opacity-70" />
            <div className="absolute left-1/4 bottom-10 w-[400px] h-[400px] rounded-full bg-rose-50/60 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

                    {/* ── Left Column: Text ──────────────────────────────── */}
                    <motion.div
                        className="lg:col-span-7 flex flex-col justify-center order-1 pt-4 lg:pt-0"
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView || !shouldReduceMotion ? 'visible' : 'hidden'}
                    >
                        {/* Status Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#881337]/08 border border-[#881337]/20 text-xs font-mono text-[#881337] mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#881337] animate-pulse" />
                            <span>{PERSONAL_INFO.professionalStatus}</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.08] mb-6">
                                Hello, I'm{' '}
                                <span className="font-serif italic font-normal text-[#881337] relative inline-block min-h-[1.1em]">
                                    <span>{typedText || '\u00A0'}</span>
                                    <span
                                        aria-hidden="true"
                                        className="inline-block w-[3px] sm:w-[4px] h-[0.85em] ml-1 sm:ml-1.5 bg-[#881337] align-baseline animate-cursor-blink"
                                    />
                                    {/* Underline shimmer */}
                                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#881337]/60 via-rose-400/50 to-transparent rounded-full" />
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-8 font-normal">
                                {PERSONAL_INFO.subheadline}
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-4 pt-2"
                        >
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#881337] hover:bg-[#6d1230] rounded-full shadow-lg shadow-[#881337]/30 transition-all hover:scale-[1.03] hover:shadow-[#881337]/40 active:scale-[0.98]"
                            >
                                <span>Let's Connect</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-gray-700 hover:text-[#881337] bg-white/70 hover:bg-white rounded-full border border-gray-200 hover:border-[#881337]/30 transition-all shadow-sm"
                            >
                                <span>Explore Projects</span>
                            </a>

                            {PERSONAL_INFO.hasCvFile && (
                                <a
                                    href={PERSONAL_INFO.cvUrl}
                                    download
                                    className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-gray-600 hover:text-[#881337] transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>CV</span>
                                </a>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* ── Right Column: Portrait ─────────────────────────── */}
                    <div className="lg:col-span-5 relative flex justify-center items-center order-2 mt-4 lg:mt-0">
                        <div className="relative w-full max-w-[360px] sm:max-w-[420px] flex items-center justify-center">
                            {/* Atmospheric glow behind photo */}
                            <div className="absolute inset-0 m-auto w-[320px] h-[380px] rounded-3xl bg-gradient-to-tr from-[#881337]/18 via-rose-100/35 to-transparent blur-[70px] pointer-events-none" />

                            {/* Portrait frame — mouse-reactive */}
                            <motion.div
                                animate={shouldReduceMotion ? {} : {
                                    x: mouseOffset.x * 0.35,
                                    y: mouseOffset.y * 0.35,
                                }}
                                transition={{ type: 'spring', damping: 25, stiffness: 90 }}
                                className="relative z-10 w-full rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-white/90 border border-gray-200/90 shadow-[0_24px_60px_rgba(0,0,0,0.10)] backdrop-blur-sm hover:shadow-[0_30px_70px_rgba(136,19,55,0.12)] transition-shadow duration-500"
                            >
                                <div className="relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 border border-[#881337]/15 shadow-inner">
                                    <img
                                        src={`./${PERSONAL_INFO.avatarUrl}`}
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (target.src.indexOf('anatasyaportofolio') === -1) {
                                                target.src = '/anatasyaportofolio/public/images/tasya_cutout.png';
                                            }
                                        }}
                                        alt={PERSONAL_INFO.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                                    />
                                    {/* Corner name tag */}
                                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-gray-200/70 text-[11px] font-mono font-medium text-gray-700 shadow-sm">
                                        Anatasya Wenita Putri
                                    </div>
                                    {/* Overlay shimmer on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#881337]/05 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Floating badge */}
                                <motion.div
                                    animate={shouldReduceMotion ? {} : {
                                        y: [0, -6, 0],
                                    }}
                                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                                    className="absolute -bottom-3 -right-3 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-lg text-xs font-mono text-gray-700 flex items-center gap-1.5"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>Open to Work</span>
                                </motion.div>

                                <motion.div
                                    animate={shouldReduceMotion ? {} : {
                                        y: [0, -5, 0],
                                    }}
                                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                                    className="absolute -top-3 -left-3 px-3 py-2 rounded-xl bg-[#881337] shadow-lg text-xs font-mono text-white flex items-center gap-1.5"
                                >
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{PERSONAL_INFO.location?.split(',')[0] ?? 'Indonesia'}</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Smooth gradient transition toward Experience & Education */}
            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-white/30 pointer-events-none" />
        </section>
    );
};
