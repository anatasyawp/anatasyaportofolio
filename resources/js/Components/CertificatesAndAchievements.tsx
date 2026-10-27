import React, { useState } from 'react';
import { CERTIFICATES } from '../data/portfolioData';
import { Achievement, Certificate, License } from '../types/portfolio';
import { Trophy, ExternalLink, Calendar, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useScrollReveal } from '../lib/useScrollReveal';

interface CertificatesAndAchievementsProps {
    licenses?: License[];
    achievements?: Achievement[];
    certificates?: Certificate[];
}

const mapLicenses = (items: License[] = []): Certificate[] =>
    items.map((item) => ({
        id: item.id,
        title: item.title,
        issuer: item.issuer,
        issueDate: item.issueDate,
        credentialId: item.credentialId,
        credentialUrl: item.credentialUrl,
        association: item.association,
        category: item.category,
        description: item.description,
        skills: item.skills || [],
        type: 'license',
        badge: item.badge,
        image: item.image,
    }));

const mapAchievements = (items: Achievement[] = []): Certificate[] =>
    items.map((item) => ({
        id: item.id,
        title: item.title,
        issuer: item.event,
        issueDate: item.year,
        credentialUrl: item.credentialUrl,
        association: item.association,
        category: item.category || 'National Competition',
        description: item.description,
        skills: item.skills || [],
        type: 'achievement',
        badge: item.badge,
        image: item.image,
    }));

export const CertificatesAndAchievements: React.FC<CertificatesAndAchievementsProps> = ({
    licenses = [],
    achievements = [],
    certificates,
}) => {
    const shouldReduceMotion = useReducedMotion();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { ref: sectionRef, inView } = useScrollReveal(0.07);

    const fromDatabase = [...mapLicenses(licenses), ...mapAchievements(achievements)];
    const certificateList =
        fromDatabase.length > 0
            ? fromDatabase
            : certificates && certificates.length > 0
                ? certificates
                : CERTIFICATES;
    const totalItems = certificateList.length;

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % totalItems);
    };

    const activeItem = certificateList[activeIndex];

    return (
        <section id="certificates" ref={sectionRef as React.Ref<HTMLElement>} className="py-24 relative overflow-hidden">
            {/* Glassmorphism section backing */}
            <div className="absolute inset-0 bg-gray-50/75 backdrop-blur-[2px] border-t border-gray-200" />

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#881337]/06 via-rose-50/30 to-transparent blur-[140px] pointer-events-none rounded-full" />

            <motion.div
                className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#881337]/08 border border-[#881337]/20 text-xs font-mono text-[#881337] mb-3">
                            <Trophy className="w-3.5 h-3.5" />
                            <span>CREDENTIALS · CERTIFICATIONS · ACHIEVEMENTS</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Licenses & <span className="text-[#881337] font-serif italic font-normal">Achievements</span>
                        </h2>
                        <p className="text-sm text-gray-600 mt-2 max-w-xl">
                            Verified professional software engineering certifications, QA bootcamp credentials, and national competition awards.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous Slide"
                            className="w-11 h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 hover:text-[#881337] shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next Slide"
                            className="w-11 h-11 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 hover:text-[#881337] shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 3D CURVED CYLINDER CAROUSEL STAGE (Matching User Reference) */}
                <div
                    className="relative w-full py-6 md:py-12 flex items-center justify-center min-h-[460px] sm:min-h-[520px] overflow-visible"
                    style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
                >
                    {certificateList.map((item, idx) => {
                        // Calculate offset relative to activeIndex in circular space (-2, -1, 0, 1, 2, etc.)
                        let diff = idx - activeIndex;
                        if (diff > totalItems / 2) diff -= totalItems;
                        if (diff < -totalItems / 2) diff += totalItems;

                        // Only render items within immediate viewing range (-3 to +3)
                        if (Math.abs(diff) > 2) return null;

                        const isCenter = diff === 0;

                        // Curved arc positioning like the user's panoramic cylinder reference:
                        // Cards curve along an arc: X spreads out, Z recedes backwards, rotateY angles inward
                        const xOffset = diff * 210; // Spacing between cards
                        const zOffset = -Math.abs(diff) * 110; // Curves backwards into the screen
                        const rotateY = diff * -22; // Inward curved angle facing viewer
                        const scale = isCenter ? 1.05 : 0.88;
                        const opacity = isCenter ? 1 : Math.max(0.4, 1 - Math.abs(diff) * 0.28);
                        const zIndex = 30 - Math.abs(diff) * 5;

                        return (
                            <motion.div
                                key={item.id || item.title}
                                onClick={() => setActiveIndex(idx)}
                                animate={shouldReduceMotion ? { opacity } : {
                                    x: xOffset,
                                    z: zOffset,
                                    rotateY,
                                    scale,
                                    opacity,
                                }}
                                transition={{
                                    type: 'spring',
                                    damping: 24,
                                    stiffness: 120,
                                    mass: 0.8
                                }}
                                style={{
                                    zIndex,
                                    transformOrigin: 'center center',
                                }}
                                className={`absolute w-[280px] sm:w-[320px] aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer bg-white transition-shadow duration-300 ${
                                    isCenter
                                        ? 'border-2 border-[#881337] ring-4 ring-[#881337]/20 shadow-[0_25px_60px_rgba(136,19,55,0.22)]'
                                        : 'border border-gray-200 hover:border-gray-300 shadow-[0_15px_35px_rgba(0,0,0,0.08)]'
                                }`}
                            >
                                {/* Card Background Photo with Dark Gradient Overlay */}
                                <div className="relative w-full h-full overflow-hidden">
                                    <img
                                        src={item.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-black/30" />

                                    {/* Top Card Badge */}
                                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${
                                            item.type === 'achievement'
                                                ? 'bg-amber-500/90 text-white shadow-sm'
                                                : 'bg-[#881337]/90 text-white shadow-sm'
                                        }`}>
                                            {item.badge || item.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-[11px] font-mono text-gray-300 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                                            <Calendar className="w-3 h-3 text-rose-300" />
                                            <span>{item.issueDate}</span>
                                        </div>
                                    </div>

                                    {/* Bottom Content Area */}
                                    <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col justify-end text-white">
                                        <div className="text-[11px] font-mono text-rose-300 font-bold uppercase tracking-wider mb-1">
                                            {item.issuer}
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-2 mb-2 text-white">
                                            {item.title}
                                        </h3>

                                        {item.association && (
                                            <p className="text-[11px] text-gray-300 font-sans mb-2">
                                                Berasosiasi: <span className="font-semibold text-white">{item.association}</span>
                                            </p>
                                        )}

                                        {/* Skill Tags */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {item.skills?.slice(0, 3).map((s) => (
                                                <span
                                                    key={s}
                                                    className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/15 backdrop-blur-md text-gray-100 border border-white/10"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                            {(item.skills?.length || 0) > 3 && (
                                                <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/20 text-gray-200">
                                                    +{(item.skills?.length || 0) - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Action / Credential Link */}
                                        {item.credentialUrl ? (
                                            <a
                                                href={item.credentialUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-gray-100 text-gray-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-102"
                                            >
                                                <span>Lihat Sertifikat</span>
                                                <ExternalLink className="w-3.5 h-3.5 text-[#881337]" />
                                            </a>
                                        ) : (
                                            <div className="py-1 text-[11px] font-mono text-gray-400 flex items-center gap-1">
                                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                                <span>Verified Credential</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Active Slide Details & Indicators */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#881337]/10 text-xs font-mono font-bold text-[#881337]">
                            {activeIndex + 1} / {totalItems}
                        </span>
                        <div className="text-xs text-gray-600 font-mono">
                            {activeItem?.credentialId && (
                                <span>ID: <strong className="text-gray-900">{activeItem.credentialId}</strong> · </span>
                            )}
                            <span>Geser kartu atau gunakan tombol panah</span>
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex items-center gap-1.5">
                        {certificateList.map((c, i) => (
                            <button
                                key={c.id || c.title}
                                type="button"
                                onClick={() => setActiveIndex(i)}
                                aria-label={`Slide to ${c.title}`}
                                className={`h-2 rounded-full transition-all cursor-pointer ${
                                    activeIndex === i
                                        ? 'w-8 bg-[#881337]'
                                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>

            </motion.div>
        </section>
    );
};

