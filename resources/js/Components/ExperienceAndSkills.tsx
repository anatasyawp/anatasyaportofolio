import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { Briefcase, GraduationCap, CheckCircle2, Award, Terminal, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../lib/useScrollReveal';

/* ── Animation presets ──────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
});

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const timelineItem = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Experience & Education ─────────────────────────────────────────────── */
export const ExperienceAndEducation: React.FC = () => {
    const { t } = useTranslation();
    const { ref: sectionRef, inView } = useScrollReveal(0.08);
    const [selectedExp, setSelectedExp] = useState<number>(0);
    const animState = inView ? 'visible' : 'hidden';

    // Translated education data
    const educationHighlights = t('education.highlights', { returnObjects: true });
    const highlightsList = Array.isArray(educationHighlights) ? educationHighlights : EDUCATION_DATA.highlights;

    return (
        <section
            id="experience"
            ref={sectionRef as React.Ref<HTMLElement>}
            className="py-16 sm:py-24 relative overflow-hidden"
        >
            {/* Section glassmorphism backing with seamless vertical gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/70 backdrop-blur-[2px]" />

            {/* Seamless ambient transition glow between sections */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[220px] rounded-full bg-gradient-to-b from-[#881337]/06 via-rose-100/20 to-transparent blur-[100px] pointer-events-none" />

            {/* Decorative orb */}
            <div className="absolute top-10 right-1/4 w-[500px] h-[400px] rounded-full bg-gradient-to-bl from-[#881337]/06 to-transparent blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

                    {/* ── Left: Work Experience Timeline with Dedicated Scrollable Area ── */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial="hidden"
                            animate={animState}
                            variants={staggerContainer}
                        >
                            {/* Section Subtitle Badge */}
                            <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                                <motion.div variants={fadeUp()} className="inline-flex items-center gap-2 text-[#881337] font-mono text-xs uppercase tracking-widest">
                                    <Briefcase className="w-3.5 h-3.5" />
                                    <span>{t('experience.badge')}</span>
                                </motion.div>

                                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#881337]/08 text-[#881337] border border-[#881337]/15">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#881337] animate-pulse" />
                                    <span>{t('experience.scrollHint')}</span>
                                </span>
                            </div>

                            {/* Section Main Heading */}
                            <motion.h2 variants={fadeUp(0.05)} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
                                {t('experience.titleWork')} <span className="font-serif italic font-normal text-[#881337]">{t('experience.titleExperience')}</span>
                            </motion.h2>

                            <motion.p variants={fadeUp(0.08)} className="text-sm sm:text-base text-gray-600 mb-6 max-w-xl leading-relaxed">
                                {t('experience.subtitle')}
                            </motion.p>

                            {/* ── Dedicated Scroll Container for Career Pathway (Balanced with Education) ── */}
                            <div className="relative">
                                <div className="max-h-[580px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar py-2">
                                    {/* The Connected Vertical Timeline Track (o-o-o) */}
                                    <div className="relative border-l-2 border-[#881337]/20 ml-2 sm:ml-3 pl-6 sm:pl-8 space-y-6 sm:space-y-8">
                                        {EXPERIENCES.map((exp, idx) => {
                                            const isSelected = selectedExp === idx;
                                            const expKey = idx === 0 ? 'asdos' : idx === 1 ? 'pwk' : 'skj';
                                            const role = t(`experience.items.${expKey}.role`, { defaultValue: exp.role });
                                            const organization = t(`experience.items.${expKey}.organization`, { defaultValue: exp.organization });
                                            const location = t(`experience.items.${expKey}.location`, { defaultValue: exp.location });
                                            const period = t(`experience.items.${expKey}.period`, { defaultValue: exp.period });
                                            const description = t(`experience.items.${expKey}.description`, { defaultValue: exp.description });
                                            const rawAchievements = t(`experience.items.${expKey}.achievements`, { returnObjects: true });
                                            const achievements = Array.isArray(rawAchievements) ? rawAchievements : exp.achievements;

                                            return (
                                                <motion.div
                                                    key={idx}
                                                    variants={timelineItem}
                                                    onClick={() => setSelectedExp(idx)}
                                                    className={`relative group p-4 sm:p-6 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 ${isSelected
                                                        ? 'bg-gradient-to-br from-[#881337]/[0.06] via-rose-50/40 to-white/70 backdrop-blur-md border border-[#881337]/35 ring-1 ring-[#881337]/20 shadow-lg shadow-[#881337]/08'
                                                        : 'bg-white/45 hover:bg-gradient-to-br hover:from-[#881337]/[0.03] hover:to-white/60 backdrop-blur-sm border border-gray-200/70 hover:border-[#881337]/25 shadow-sm hover:shadow-md'
                                                        }`}
                                                >
                                                    {/* ── Timeline Node Dot (o) with Active Pulse ── */}
                                                    <div className="absolute -left-[33px] sm:-left-[41px] top-5 flex items-center justify-center">
                                                        {isSelected && (
                                                            <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#881337] opacity-35" />
                                                        )}
                                                        <div className={`w-4 h-4 rounded-full border-[3px] shadow-md transition-all duration-300 group-hover:scale-125 ${isSelected
                                                            ? 'bg-[#881337] border-white shadow-[#881337]/40 scale-110'
                                                            : 'bg-white border-[#881337]/60 group-hover:border-[#881337]'
                                                            }`} />
                                                    </div>

                                                    {/* Role & Company Header */}
                                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                                        <div className="flex items-start gap-3.5">
                                                            {exp.logoUrl && (
                                                                <div className={`w-12 h-12 rounded-2xl p-1.5 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden transition-all duration-300 shadow-sm ${isSelected
                                                                    ? 'bg-white border border-[#881337]/30 ring-2 ring-[#881337]/15 scale-105'
                                                                    : 'bg-white/80 border border-gray-200 group-hover:border-[#881337]/30'
                                                                    }`}>
                                                                    <img
                                                                        src={`./${exp.logoUrl}`}
                                                                        onError={(e) => {
                                                                            const t = e.currentTarget;
                                                                            if (t.src.indexOf('anatasyaportofolio') === -1)
                                                                                t.src = `/anatasyaportofolio/public/${exp.logoUrl}`;
                                                                        }}
                                                                        alt={organization}
                                                                        className="w-full h-full object-contain"
                                                                    />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <h3 className={`text-lg sm:text-xl font-bold transition-colors leading-snug ${isSelected ? 'text-[#881337]' : 'text-gray-900 group-hover:text-[#881337]'
                                                                    }`}>
                                                                    {role}
                                                                </h3>
                                                                <div className="text-xs sm:text-sm font-semibold text-[#881337] mt-0.5 flex flex-wrap items-center gap-1.5">
                                                                    <span>{organization}</span>
                                                                    <span className="text-gray-300">·</span>
                                                                    <span className="text-gray-500 font-normal">{location}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium self-start shrink-0 transition-colors ${isSelected
                                                            ? 'bg-[#881337] text-white shadow-sm'
                                                            : 'bg-gray-100 text-gray-700 border border-gray-200/80'
                                                            }`}>
                                                            {period}
                                                        </span>
                                                    </div>

                                                    {/* Description Paragraph */}
                                                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                                                        {description}
                                                    </p>

                                                    {/* Responsibilities & Achievements */}
                                                    <ul className="space-y-2.5 mb-5">
                                                        {achievements.map((ach: string, aIdx: number) => (
                                                            <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                                                                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isSelected ? 'text-[#881337]' : 'text-[#881337]/80'
                                                                    }`} />
                                                                <span>{ach}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {/* Tech Stack Pills */}
                                                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#881337]/10">
                                                        {exp.technologies.map((t) => (
                                                            <span
                                                                key={t}
                                                                className={`px-2.5 py-0.5 text-[11px] font-mono rounded-lg border transition-all cursor-default ${isSelected
                                                                    ? 'bg-white/80 text-[#881337] border-[#881337]/30 font-semibold shadow-xs'
                                                                    : 'bg-white/50 text-gray-600 border-gray-200/80 hover:bg-[#881337]/08 hover:text-[#881337] hover:border-[#881337]/25'
                                                                    }`}
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right: Academic Education (Tailored for IT Recruiters & Tech Leads) ── */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28 self-start" id="education">
                        <motion.div
                            initial="hidden"
                            animate={animState}
                            variants={staggerContainer}
                        >
                            <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                                <motion.div variants={fadeUp(0.1)} className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-widest">
                                    <GraduationCap className="w-3.5 h-3.5 text-[#881337]" />
                                    <span>{t('education.badge')}</span>
                                </motion.div>

                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                    <span>{t('education.certified')}</span>
                                </span>
                            </div>

                            <motion.h2 variants={fadeUp(0.15)} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                                {t('education.title')}
                            </motion.h2>

                            {/* Gen-Z Recruiter Bento Card */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, scale: 0.96, y: 20 },
                                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                                }}
                                className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-white/95 via-white/85 to-rose-50/20 border border-gray-200/90 shadow-md backdrop-blur-md space-y-5"
                            >
                                {/* University & Degree Hero Row */}
                                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                                    {EDUCATION_DATA.logoUrl && (
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 p-2 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                                            <img
                                                src={`./${EDUCATION_DATA.logoUrl}`}
                                                onError={(e) => {
                                                    const t = e.currentTarget;
                                                    if (t.src.indexOf('anatasyaportofolio') === -1)
                                                        t.src = `/anatasyaportofolio/public/${EDUCATION_DATA.logoUrl}`;
                                                }}
                                                alt={EDUCATION_DATA.institution}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-xs font-mono font-bold text-[#881337] tracking-wider uppercase">
                                                {EDUCATION_DATA.period}
                                            </span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200/80">
                                                {t('education.degreeType')}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 leading-snug">
                                            {t('education.institution', { defaultValue: EDUCATION_DATA.institution })}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">
                                            {t('education.major', { defaultValue: EDUCATION_DATA.major })}
                                        </p>
                                    </div>
                                </div>

                                {/* GPA Highlight Box */}
                                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#881337]/[0.06] via-rose-50/40 to-transparent border border-[#881337]/15 flex items-center justify-between">
                                    <div>
                                        <div className="text-xs text-gray-500 font-mono">{t('education.achievementLabel')}</div>
                                        <div className="text-sm font-bold text-gray-900 mt-0.5">{t('education.gpaLabel')}</div>
                                    </div>
                                    <div className="text-2xl font-black text-[#881337] font-mono tracking-tight">
                                        {EDUCATION_DATA.gpa}
                                    </div>
                                </div>

                                {/* IT Recruiter Competency Matrix */}
                                <div className="space-y-2.5 pt-1">
                                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
                                        {t('education.scopeLabel')}
                                    </div>
                                    <ul className="space-y-2">
                                        {highlightsList.map((h: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                                                <Award className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* IT Recruiter Foundational Tech Stack Chips */}
                                <div className="pt-2">
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Laravel 11', 'React & JS', 'MySQL Schema', 'Black Box QA', 'Figma UI/UX', 'REST API'].map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700 text-[10px] font-mono font-medium shadow-2xs"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Availability Status for Recruiters */}
                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                        <span className="font-medium">{t('education.readyStatus')}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#881337] bg-[#881337]/08 px-2 py-0.5 rounded-md">
                                        {t('education.classBadge')}
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

/* ── Skills Section ─────────────────────────────────────────────────────── */
export const SkillsSection: React.FC = () => {
    const { t } = useTranslation();
    const { ref, inView } = useScrollReveal(0.1);

    return (
        <section
            id="skills"
            ref={ref as React.Ref<HTMLElement>}
            className="py-16 sm:py-24 relative overflow-hidden"
        >
            {/* Seamless organic gradient divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#881337]/20 to-transparent pointer-events-none" />

            {/* Glassmorphism backing */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/70 to-white/60 backdrop-blur-[6px]" />

            {/* Decorative glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-t from-[#881337]/06 to-transparent blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
                >
                    <motion.div
                        variants={fadeUp()}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#881337]/08 border border-[#881337]/20 text-[#881337] font-mono text-xs uppercase tracking-widest mb-3"
                    >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{t('skills.badge')}</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp(0.05)} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        {t('skills.title')}{' '}
                        <span className="text-[#881337] font-serif italic font-normal">{t('skills.titleAccent')}</span>
                    </motion.h2>

                    <motion.p variants={fadeUp(0.1)} className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {t('skills.subtitle')}
                    </motion.p>
                </motion.div>

                {/* Cards grid */}
                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {SKILL_CATEGORIES.map((cat, idx) => {
                        const categoryName = t(`skills.categories.${cat.name}.name`, { defaultValue: cat.name });

                        return (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                                }}
                                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                                className="p-6 rounded-3xl border border-gray-200/90 shadow-sm flex flex-col justify-between hover:border-[#881337]/30 hover:shadow-lg hover:shadow-[#881337]/08 transition-all duration-300 bg-white group cursor-default"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#881337] transition-colors">
                                            {categoryName}
                                        </h3>
                                        <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                            0{idx + 1}
                                        </span>
                                    </div>

                                    {/* Logo badges */}
                                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                        {cat.skills.map((skill, sIdx) => (
                                            <motion.div
                                                key={sIdx}
                                                whileHover={{ scale: 1.04, y: -2 }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50/90 hover:bg-white border border-gray-200/80 hover:border-[#881337]/35 hover:shadow-sm transition-all duration-200 group/item cursor-default"
                                            >
                                                {skill.icon ? (
                                                    <div className="w-6 h-6 rounded-lg bg-white border border-gray-100 p-0.5 flex items-center justify-center shrink-0 shadow-2xs group-hover/item:scale-105 transition-transform">
                                                        <img
                                                            src={skill.icon.startsWith('http') ? skill.icon : `./${skill.icon}`}
                                                            onError={(e) => {
                                                                const t = e.currentTarget;
                                                                if (t.dataset.retried) return;
                                                                t.dataset.retried = 'true';
                                                                if (t.src.indexOf('anatasyaportofolio') === -1) {
                                                                    t.src = `/anatasyaportofolio/public/${skill.icon}`;
                                                                }
                                                            }}
                                                            alt={skill.name}
                                                            className="w-full h-full object-contain"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{ backgroundColor: `${skill.color || '#881337'}15`, color: skill.color || '#881337' }}
                                                        className="w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0"
                                                    >
                                                        {skill.name.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="text-xs font-semibold text-gray-800 group-hover/item:text-[#881337] transition-colors whitespace-nowrap">
                                                    {skill.name}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                                    <span>{t('skills.toolsCount', { count: cat.skills.length })}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#881337]/40" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
};
