import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { useScrollReveal } from '../lib/useScrollReveal';

const fadeUp = (delay = 0) => ({
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay } },
});

export const ContactAndFooter: React.FC = () => {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const { ref, inView } = useScrollReveal(0.07);

    const handleCopyEmail = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const channels = [
        {
            name: 'LinkedIn',
            handle: 'anatasyawp',
            url: PERSONAL_INFO.linkedin,
            icon: LinkedinIcon,
            description: 'Professional experience, recommendations & networking',
            badge: 'Connect',
            accentColor: '#0077B5',
            hoverBorder: 'hover:border-[#0077B5]/40',
            hoverBg:     'hover:bg-[#0077B5]/[0.03]',
            badgeColor:  'bg-[#0077B5]/10 text-[#0077B5]',
        },
        {
            name: 'Instagram',
            handle: 'anatasyawp_',
            url: PERSONAL_INFO.instagram || 'https://instagram.com/anatasyawp_',
            icon: InstagramIcon,
            description: 'Personal activities, creative moments & life updates',
            badge: 'Follow',
            accentColor: '#E1306C',
            hoverBorder: 'hover:border-[#E1306C]/40',
            hoverBg:     'hover:bg-[#E1306C]/[0.03]',
            badgeColor:  'bg-[#E1306C]/10 text-[#E1306C]',
        },
        {
            name: 'Gmail',
            handle: PERSONAL_INFO.email,
            url: `mailto:${PERSONAL_INFO.email}`,
            icon: Mail,
            description: 'Send formal inquiries, job offers or project proposals',
            badge: 'Send Email',
            accentColor: '#EA4335',
            hoverBorder: 'hover:border-[#EA4335]/40',
            hoverBg:     'hover:bg-[#EA4335]/[0.03]',
            badgeColor:  'bg-[#EA4335]/10 text-[#EA4335]',
            hasCopy: true,
        },
        {
            name: 'GitHub',
            handle: 'anatasyawp',
            url: PERSONAL_INFO.github,
            icon: GithubIcon,
            description: 'Explore full repositories, modular code & web prototypes',
            badge: 'Follow',
            accentColor: '#24292e',
            hoverBorder: 'hover:border-gray-800/40',
            hoverBg:     'hover:bg-gray-900/[0.03]',
            badgeColor:  'bg-gray-900/10 text-gray-900',
        },
    ];

    return (
        <footer
            id="contact"
            ref={ref as React.Ref<HTMLElement>}
            className="pt-24 pb-12 relative overflow-hidden"
        >
            {/* Glassmorphism section backing */}
            <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] border-t border-gray-200/80" />

            {/* Decorative orb */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-gradient-to-b from-[#881337]/06 to-transparent blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* ── Section Header ──────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div variants={fadeUp()} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#881337]/08 border border-[#881337]/20 text-[#881337] font-mono text-xs uppercase tracking-widest mb-3">
                        <Mail className="w-3.5 h-3.5" />
                        <span>Get In Touch</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp(0.05)} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Let's connect and{' '}
                        <span className="text-[#881337] font-serif italic font-normal relative">
                            build together.
                            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#881337]/60 to-transparent rounded-full" />
                        </span>
                    </motion.h2>

                    <motion.p variants={fadeUp(0.1)} className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Terbuka untuk posisi <strong>Full-Stack Developer</strong>, <strong>Web Engineer</strong>,{' '}
                        <strong>Software QA</strong>, atau kolaborasi proyek teknologi. Hubungi saya melalui saluran di bawah ini:
                    </motion.p>
                </motion.div>

                {/* ── Channel Cards ────────────────────────────────────── */}
                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
                >
                    {channels.map((ch, idx) => {
                        const Icon = ch.icon;
                        return (
                            <motion.a
                                key={idx}
                                href={ch.url}
                                target={ch.url.startsWith('mailto:') ? '_self' : '_blank'}
                                rel="noreferrer"
                                variants={{
                                    hidden:  { opacity: 0, y: 28 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                                }}
                                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                                className={`p-6 rounded-3xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg group ${ch.hoverBorder} ${ch.hoverBg}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-800 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${ch.badgeColor}`}>
                                            {ch.badge}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#881337] transition-colors flex items-center gap-1.5">
                                        <span>{ch.name}</span>
                                        <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </h3>

                                    <div className="font-mono text-xs text-[#881337] font-semibold mt-1 truncate">
                                        {ch.handle}
                                    </div>

                                    <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">{ch.description}</p>
                                </div>

                                {(ch as any).hasCopy ? (
                                    <div className="mt-6 pt-4 border-t border-gray-200/60">
                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            className="w-full py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                        >
                                            {copiedEmail ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                                    <span className="text-emerald-700">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3.5 h-3.5" />
                                                    <span>Copy Email Address</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-gray-700 transition-colors">
                                        <span>Visit Profile</span>
                                        <span>→</span>
                                    </div>
                                )}
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* ── Location & Availability Banner ───────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="p-6 rounded-3xl bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-16 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center gap-3.5 text-center sm:text-left">
                        <div className="w-10 h-10 rounded-2xl bg-[#881337]/08 border border-[#881337]/20 flex items-center justify-center text-[#881337] shrink-0">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 font-mono">Location & Availability</div>
                            <div className="text-sm font-bold text-gray-900">{PERSONAL_INFO.location}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                            Available for Full-Time / Project
                        </span>
                    </div>
                </motion.div>

                {/* ── Subfooter ─────────────────────────────────────────── */}
                <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
                    <div>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</div>
                    <div>Built with Laravel 12, Inertia.js, React &amp; Tailwind CSS</div>
                </div>

            </div>
        </footer>
    );
};
