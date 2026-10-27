import React from 'react';
import { EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { Briefcase, GraduationCap, CheckCircle2, Award, Terminal } from 'lucide-react';

export const ExperienceAndEducation: React.FC = () => {
    return (
        <section id="experience" className="py-24 relative bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left Column: Professional Experience Timeline */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-2 text-[#881337] dark:text-[#be123c] font-mono text-xs uppercase tracking-widest mb-3">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Professional Background</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-10">
                            Work Experience
                        </h2>

                        <div className="relative pl-6 sm:pl-8 border-l border-gray-200 space-y-10 max-h-[560px] overflow-y-auto pr-3 sm:pr-4 custom-scrollbar">
                            {EXPERIENCES.map((exp, idx) => (
                                <div key={idx} className="relative group">
                                    {/* Timeline indicator node */}
                                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#881337] border-4 border-white group-hover:scale-125 transition-transform shadow-md shadow-[#881337]/30" />

                                    <div className="flex items-start gap-3.5 mb-3">
                                        {/* Organization Logo */}
                                        {exp.logoUrl && (
                                            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm p-1.5 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                                                <img
                                                    src={`./${exp.logoUrl}`}
                                                    onError={(e) => {
                                                        const target = e.currentTarget;
                                                        if (target.src.indexOf('anatasyaportofolio') === -1) {
                                                            target.src = `/anatasyaportofolio/public/${exp.logoUrl}`;
                                                        }
                                                    }}
                                                    alt={exp.organization}
                                                    className="w-full h-full object-contain object-center"
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

                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        {exp.description}
                                    </p>

                                    {/* Achievements */}
                                    <ul className="space-y-2 mb-4">
                                        {exp.achievements.map((ach, aIdx) => (
                                            <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                                                <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
                                                <span>{ach}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tech badges */}
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {exp.technologies.map((t) => (
                                            <span key={t} className="px-2 py-0.5 text-[11px] font-mono text-gray-600 bg-gray-100 rounded border border-gray-200">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Education & Credentials */}
                    <div className="lg:col-span-5" id="education">
                        <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-widest mb-3">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Academic Foundation</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-10">
                            Education
                        </h2>

                        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-gray-200 space-y-6 bg-white">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3.5">
                                    {EDUCATION_DATA.logoUrl && (
                                        <div className="w-11 h-11 rounded-xl bg-white border border-gray-200/90 shadow-sm p-1.5 flex items-center justify-center shrink-0">
                                            <img
                                                src={`./${EDUCATION_DATA.logoUrl}`}
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    if (target.src.indexOf('anatasyaportofolio') === -1) {
                                                        target.src = `/anatasyaportofolio/public/${EDUCATION_DATA.logoUrl}`;
                                                    }
                                                }}
                                                alt={EDUCATION_DATA.institution}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {EDUCATION_DATA.institution}
                                        </h3>
                                        <div className="text-sm text-[#881337] font-medium mt-1">
                                            {EDUCATION_DATA.degree} — {EDUCATION_DATA.major}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-700 border border-gray-200 shrink-0">
                                    {EDUCATION_DATA.period}
                                </span>
                            </div>

                            {/* GPA Highlight */}
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Cumulative GPA:</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white font-mono">
                                    {EDUCATION_DATA.gpa}
                                </span>
                            </div>

                            <ul className="space-y-2.5">
                                {EDUCATION_DATA.highlights.map((h, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                        <Award className="w-4 h-4 text-[#881337] dark:text-[#be123c] shrink-0 mt-0.5" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                                <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                                    Status: Fresh Graduate (2026) | Open to Full-Stack Developer & Software Engineering Roles
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export const SkillsSection: React.FC = () => {
    return (
        <section id="skills" className="py-24 relative bg-gray-50/70 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 text-[#881337] font-mono text-xs uppercase tracking-widest mb-3">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Core Competencies & Stack</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Skills & Technologies
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Transparently mapped between production-tested competencies and technologies actively practiced.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SKILL_CATEGORIES.map((cat, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl glass-panel border border-gray-200 dark:border-white/10 flex flex-col justify-between hover:border-[#881337]/25 transition-all hover:translate-y-[-2px] bg-white dark:bg-[#1e1e1e]"
                        >
                            <div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{cat.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{cat.description}</p>

                                <div className="space-y-3">
                                    {cat.skills.map((skill, sIdx) => (
                                        <div key={sIdx} className="flex items-center justify-between text-xs">
                                            <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                                            <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                                                skill.level === 'Proficient'
                                                    ? 'bg-[#881337]/08 text-[#881337] dark:text-[#be123c] border border-[#881337]/15'
                                                    : skill.level === 'Advanced'
                                                    ? 'bg-gray-800/05 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-white/10'
                                                    : 'bg-gray-100 dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5'
                                            }`}>
                                                {skill.level}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 text-[10px] font-mono text-gray-400 dark:text-gray-500 text-right">
                                Category 0{idx + 1}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
