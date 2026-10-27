import React, { useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, FileText, ExternalLink, Zap, CheckCircle2, ShieldCheck, Layers, Terminal } from 'lucide-react';
import { Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';

interface ProjectDetailModalProps {
    project: Project | null;
    onClose: () => void;
    onSelectProject: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
    project,
    onClose,
    onSelectProject,
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (project) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [project, onClose]);

    if (!project) return null;

    const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
    const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
    const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            {/* Modal Container: Gen-Z Neobrutalism & Clean Minimalist Hybrid */}
            <div className="relative w-full max-w-3xl bg-white border-2 border-gray-900 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] overflow-hidden max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
                
                {/* Header Top Bar */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b-2 border-gray-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-xs font-mono font-black text-white bg-[#881337] px-2.5 py-1 rounded-lg">
                            {project.number}
                        </span>
                        <span className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wider truncate max-w-[200px] sm:max-w-xs">
                            {project.title.split('(')[0]}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Production Ready
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close Project Detail"
                        className="p-1.5 rounded-xl border border-gray-200 text-gray-700 hover:text-black hover:bg-gray-100 transition-all hover:rotate-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
                    
                    {/* Visual Media Header with floating badge */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 aspect-[16/9] relative shadow-inner group">
                        <img
                            src={project.layerImages[0]?.url}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono font-bold text-gray-900 shadow-sm">
                                ⚡ {project.badge}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-[#881337] text-white text-xs font-mono font-bold shadow-sm">
                                {project.period}
                            </span>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-xs font-mono text-gray-300 mt-1">
                                    Client: {project.client} · Role: {project.role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Gen-Z Interactive Links Hub (GitHub, Figma, Docs, Live Preview) */}
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                            <Terminal className="w-4 h-4 text-[#881337]" />
                            PROJECT ASSETS & REPOSITORIES:
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
                                >
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>
                                    <span>GitHub</span>
                                    <ExternalLink className="w-3 h-3 text-gray-400" />
                                </a>
                            )}

                            {project.figmaUrl && (
                                <a
                                    href={project.figmaUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
                                >
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 12a3 3 0 0 0 3-3 3 3 0 0 0-3-3H9v6h3zm0 0a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H9zm0-12a3 3 0 0 0-3 3v3h6a3 3 0 0 0-3-3 3 3 0 0 0 0-3zm-3 15a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3v-3H9zm0-9a3 3 0 0 0-3 3 3 3 0 0 0 3 3h3V6H9z"/>
                                    </svg>
                                    <span>Figma</span>
                                    <ExternalLink className="w-3 h-3 text-purple-200" />
                                </a>
                            )}

                            {project.docUrl && (
                                <a
                                    href={project.docUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
                                >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>Documentation / SRS</span>
                                    <ExternalLink className="w-3 h-3 text-blue-200" />
                                </a>
                            )}

                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3.5 py-2 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
                                >
                                    <Zap className="w-3.5 h-3.5" />
                                    <span>Live Web App</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Metrics / Stats Grid */}
                    {project.metrics && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {project.metrics.map((m, idx) => (
                                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-[#881337]/40 transition-colors">
                                    <div className="text-xl sm:text-2xl font-black font-mono text-[#881337]">{m.value}</div>
                                    <div className="text-xs font-bold text-gray-800 mt-0.5">{m.label}</div>
                                    <div className="text-[11px] text-gray-500">{m.description}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Punchy Visual Highlights (Replaces heavy text) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* What I Built */}
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                                <span>🛠️</span>
                                <span>Core Engineering Scope</span>
                            </h4>
                            <ul className="space-y-2">
                                {project.contributions.slice(0, 3).map((c, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
                                        <span>{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* High-Impact Features */}
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                                <span>🚀</span>
                                <span>Feature Highlights</span>
                            </h4>
                            <div className="space-y-2">
                                {project.features.slice(0, 4).map((f, idx) => (
                                    <div key={idx} className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-800 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#881337]" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack Pills with Icons/Badges */}
                    <div className="space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                            TECH STACK:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((t) => (
                                <span
                                    key={t}
                                    className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-gray-100 text-gray-800 border border-gray-200"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer Navigation (Prev / Next Case Study) */}
                <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-200 flex items-center justify-between">
                    {prevProject ? (
                        <button
                            type="button"
                            onClick={() => onSelectProject(prevProject)}
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-600 hover:text-[#881337] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>PREV: {prevProject.title.split(' ')[0]}</span>
                        </button>
                    ) : <div />}

                    {nextProject ? (
                        <button
                            type="button"
                            onClick={() => onSelectProject(nextProject)}
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-600 hover:text-[#881337] transition-colors"
                        >
                            <span>NEXT: {nextProject.title.split(' ')[0]}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : <div />}
                </div>

            </div>
        </div>
    );
};
