import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { Briefcase, GraduationCap, CheckCircle2, Award, Terminal } from 'lucide-react';
import { useScrollReveal } from '../lib/useScrollReveal';

/* ── Animation presets ──────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
});

const staggerContainer = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const timelineItem = {
    hidden:  { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const cardReveal = {
    hidden:  { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Experience & Education ─────────────────────────────────────────────── */
export const ExperienceAndEducation: React.FC = () => {
    const { ref: sectionRef, inView } = useScrollReveal(0.08);
    const animState = inView ? 'visible' : 'hidden';

    return (
        <section
            id="experience"
            ref={sectionRef as React.Ref<HTMLElement>}
            className="py-24 relative overflow-hidden"
        >
            {/* Section glassmorphism backing with seamless vertical gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/70 backdrop-blur-[2px]" />

            {/* Seamless ambient transition glow between sections */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[220px] rounded-full bg-gradient-to-b from-[#881337]/06 via-rose-100/20 to-transparent blur-[100px] pointer-events-none" />

            {/* Decorative orb */}
            <div className="absolute top-10 right-1/4 w-[500px] h-[400px] rounded-full bg-gradient-to-bl from-[#881337]/06 to-transparent blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* ── Left: Experience Timeline ── */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial="hidden"
                            animate={animState}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeUp()} className="flex items-center gap-2 text-[#881337] font-mono text-xs uppercase tracking-widest mb-3">
                                <Briefcase className="w-3.5 h-3.5" />
                                <span>Professional Background</span>
                            </motion.div>

                            <motion.h2 variants={fadeUp(0.05)} className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-10">
                                Work Experience
                            </motion.h2>

                            <motion.div
                                variants={staggerContainer}
                                className="relative pl-6 sm:pl-8 border-l-2 border-gray-200 space-y-10 max-h-[560px] overflow-y-auto pr-3 sm:pr-4 custom-scrollbar"
                            >
                                {EXPERIENCES.map((exp, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={timelineItem}
                                        className="relative group"
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#881337] border-4 border-white group-hover:scale-125 transition-transform duration-300 shadow-md shadow-[#881337]/30" />

                                        {/* Hover card highlight */}
                                        <div className="absolute -inset-3 rounded-2xl bg-[#881337]/0 group-hover:bg-[#881337]/[0.03] transition-colors duration-300 -z-10" />

                                        <div className="flex items-start gap-3.5 mb-3">
                                            {exp.logoUrl && (
                                                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm p-1.5 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden group-hover:border-[#881337]/20 transition-colors">
                                                    <img
                                                        src={`./${exp.logoUrl}`}
                                                        onError={(e) => {
                                                            const t = e.currentTarget;
                                                            if (t.src.indexOf('anatasyaportofolio') === -1)
                                                                t.src = `/anatasyaportofolio/public/${exp.logoUrl}`;
                                                        }}
                                                        alt={exp.organization}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#881337] transition-colors leading-tight">
                                                        {exp.role}
                                                    </h3>
                                                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-700 border border-gray-200">
                                                        {exp.period}
                                                    </span>
                                                </div>
                                                <div className="text-sm font-medium text-[#881337] mt-1">
                                                    {exp.organization} — <span className="text-gray-500 font-normal">{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{exp.description}</p>

                                        <ul className="space-y-2 mb-4">
                                            {exp.achievements.map((ach, aIdx) => (
                                                <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                                    <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
                                                    <span>{ach}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {exp.technologies.map((t) => (
                                                <span key={t} className="px-2 py-0.5 text-[11px] font-mono text-gray-600 bg-gray-100 hover:bg-[#881337]/08 hover:text-[#881337] hover:border-[#881337]/20 rounded border border-gray-200 transition-colors cursor-default">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ── Right: Education ── */}
                    <div className="lg:col-span-5" id="education">
                        <motion.div
                            initial="hidden"
                            animate={animState}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeUp(0.1)} className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-widest mb-3">
                                <GraduationCap className="w-3.5 h-3.5" />
                                <span>Academic Foundation</span>
                            </motion.div>

                            <motion.h2 variants={fadeUp(0.15)} className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-10">
                                Education
                            </motion.h2>

                            <motion.div
                                variants={cardReveal}
                                className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 space-y-6 shadow-sm hover:shadow-md hover:border-[#881337]/20 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3.5">
                                        {EDUCATION_DATA.logoUrl && (
                                            <div className="w-11 h-11 rounded-xl bg-white border border-gray-200/90 shadow-sm p-1.5 flex items-center justify-center shrink-0">
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
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{EDUCATION_DATA.institution}</h3>
                                            <div className="text-sm text-[#881337] font-medium mt-1">
                                                {EDUCATION_DATA.degree} — {EDUCATION_DATA.major}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-700 border border-gray-200 shrink-0">
                                        {EDUCATION_DATA.period}
                                    </span>
                                </div>

                                {/* GPA highlight */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-[#881337]/05 to-rose-50/40 border border-[#881337]/12 flex items-center justify-between">
                                    <span className="text-xs text-gray-600 font-medium">Cumulative GPA</span>
                                    <span className="text-2xl font-black text-gray-900 font-mono">{EDUCATION_DATA.gpa}</span>
                                </div>

                                <ul className="space-y-2.5">
                                    {EDUCATION_DATA.highlights.map((h, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                                            <Award className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4 border-t border-gray-100">
                                    <div className="text-[11px] font-mono text-gray-500">
                                        Status: Fresh Graduate (2026) | Open to Full-Stack Developer &amp; Software Engineering Roles
                                    </div>
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
    const { ref, inView } = useScrollReveal(0.1);

    return (
        <section
            id="skills"
            ref={ref as React.Ref<HTMLElement>}
            className="py-24 relative overflow-hidden"
        >
            {/* Glassmorphism backing */}
            <div className="absolute inset-0 bg-gray-50/75 backdrop-blur-[2px] border-t border-gray-200" />

            {/* Decorative glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-t from-[#881337]/06 to-transparent blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <motion.div
                        variants={fadeUp()}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#881337]/08 border border-[#881337]/20 text-[#881337] font-mono text-xs uppercase tracking-widest mb-3"
                    >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Core Tech Stack &amp; Tools</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp(0.05)} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Skills &amp;{' '}
                        <span className="text-[#881337] font-serif italic font-normal">Technologies</span>
                    </motion.h2>

                    <motion.p variants={fadeUp(0.1)} className="text-sm sm:text-base text-gray-600">
                        Bahasa pemrograman, framework, database, dan alat pengujian perangkat lunak yang digunakan dalam pengembangan sistem.
                    </motion.p>
                </motion.div>

                {/* Cards grid */}
                <motion.div
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={{
                        hidden:  {},
                        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {SKILL_CATEGORIES.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden:  { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                            }}
                            whileHover={{ y: -5, transition: { duration: 0.25 } }}
                            className="p-6 rounded-3xl border border-gray-200/90 shadow-sm flex flex-col justify-between hover:border-[#881337]/30 hover:shadow-lg hover:shadow-[#881337]/08 transition-all duration-300 bg-white group cursor-default"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#881337] transition-colors">
                                        {cat.name}
                                    </h3>
                                    <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                        0{idx + 1}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-6 leading-relaxed">{cat.description}</p>

                                {/* Logo badges */}
                                <div className="grid grid-cols-2 gap-2.5">
                                    {cat.skills.map((skill, sIdx) => (
                                        <motion.div
                                            key={sIdx}
                                            whileHover={{ scale: 1.04 }}
                                            className="p-2.5 rounded-2xl bg-gray-50/90 hover:bg-white border border-gray-200/80 hover:border-[#881337]/30 hover:shadow-sm transition-all duration-200 flex items-center gap-2.5 group/item"
                                        >
                                            {skill.icon ? (
                                                <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 p-1 flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                                    <img
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        className="w-full h-full object-contain"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-7 h-7 rounded-lg bg-[#881337]/10 text-[#881337] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                                    {skill.name.charAt(0)}
                                                </div>
                                            )}
                                            <span className="text-xs font-semibold text-gray-800 tracking-tight truncate leading-tight">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                                <span>{cat.skills.length} Technologies</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#881337]/40" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};
