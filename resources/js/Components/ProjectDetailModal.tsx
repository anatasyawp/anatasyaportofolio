import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    X, ArrowRight, ArrowLeft, FileText, ExternalLink, Zap, 
    CheckCircle2, Terminal, AlertCircle, ChevronLeft, ChevronRight,
    Sparkles, Layers
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';

interface ProjectDetailModalProps {
    project: Project | null;
    projects?: Project[];
    onClose: () => void;
    onSelectProject: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
    project,
    projects,
    onClose,
    onSelectProject,
}) => {
    const { t } = useTranslation();
    const [activeImgIdx, setActiveImgIdx] = useState<number>(0);

    // Reset image index when project changes
    useEffect(() => {
        setActiveImgIdx(0);
    }, [project?.id]);

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

    const projectList = (projects && projects.length > 0) ? projects : PROJECTS;
    const currentIndex = projectList.findIndex(p => String(p.id) === String(project.id));
    const prevProject = currentIndex > 0 ? projectList[currentIndex - 1] : null;
    const nextProject = (currentIndex !== -1 && currentIndex < projectList.length - 1) ? projectList[currentIndex + 1] : null;

    // Localized project details
    const pKey = String(project.id);
    const title = t(`projects.items.${pKey}.title`, { defaultValue: project.title });
    const badge = t(`projects.items.${pKey}.badge`, { defaultValue: project.badge });
    const period = t(`projects.items.${pKey}.period`, { defaultValue: project.period });
    const client = t(`projects.items.${pKey}.client`, { defaultValue: project.client });
    const role = t(`projects.items.${pKey}.role`, { defaultValue: project.role });
    const summary = t(`projects.items.${pKey}.summary`, { defaultValue: project.summary }) || project.summary;

    const rawContributions = t(`projects.items.${pKey}.contributions`, { returnObjects: true });
    const contributions = (Array.isArray(rawContributions) && rawContributions.length > 0) 
        ? rawContributions 
        : (project.contributions || []);

    const rawFeatures = t(`projects.items.${pKey}.features`, { returnObjects: true });
    const features = (Array.isArray(rawFeatures) && rawFeatures.length > 0) 
        ? rawFeatures 
        : (project.features || []);

    const rawMetrics = t(`projects.items.${pKey}.metrics`, { returnObjects: true });
    const metrics = (Array.isArray(rawMetrics) && rawMetrics.length > 0) 
        ? rawMetrics 
        : (project.metrics || []);

    const images = (Array.isArray(project.layerImages) && project.layerImages.length > 0)
        ? project.layerImages
        : [{ url: '/images/default.png', alt: title, depth: 1, caption: '' }];

    const currentImg = images[activeImgIdx] || images[0];

    const handlePrevImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImgIdx((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNextImg = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImgIdx((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="relative w-full max-w-4xl bg-white border-2 border-gray-900 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden max-h-[92vh] flex flex-col my-auto animate-in zoom-in-95 duration-200">
                
                {/* Header Top Bar */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b-2 border-gray-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-xs font-mono font-black text-white bg-[#881337] px-2.5 py-1 rounded-lg">
                            {project.number || '01'}
                        </span>
                        <span className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wider truncate max-w-[200px] sm:max-w-md">
                            {title.split('(')[0]}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {t('projects.productionReady', { defaultValue: 'Siap Produksi' })}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close Project Detail"
                        className="p-1.5 rounded-xl border border-gray-200 text-gray-700 hover:text-black hover:bg-gray-100 transition-all hover:rotate-90 cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
                    
                    {/* Visual Media Header with Interactive Multi-Image Gallery */}
                    <div className="space-y-3">
                        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-950 aspect-[16/9] relative shadow-inner group">
                            <img
                                src={currentImg.url}
                                alt={currentImg.alt || title}
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                            
                            {/* Badges on Top Left */}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                                {badge && (
                                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-mono font-bold text-gray-900 shadow-sm">
                                        ⚡ {badge}
                                    </span>
                                )}
                                {period && (
                                    <span className="px-3 py-1 rounded-full bg-[#881337] text-white text-xs font-mono font-bold shadow-sm">
                                        {period}
                                    </span>
                                )}
                            </div>

                            {/* Image Counter Badge Top Right */}
                            {images.length > 1 && (
                                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-mono font-bold shadow-sm z-10">
                                    📷 {activeImgIdx + 1} / {images.length}
                                </div>
                            )}

                            {/* Left / Right Navigation Buttons (if multiple images) */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={handlePrevImg}
                                        aria-label="Gambar Sebelumnya"
                                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-transform hover:scale-110 z-10 cursor-pointer"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNextImg}
                                        aria-label="Gambar Selanjutnya"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-transform hover:scale-110 z-10 cursor-pointer"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}

                            {/* Project Title & Caption at Bottom */}
                            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none z-10">
                                <div className="max-w-2xl">
                                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                                        {title}
                                    </h3>
                                    <p className="text-xs font-mono text-gray-300 mt-1">
                                        {client && <span>{client}</span>}
                                        {client && role && <span> · </span>}
                                        {role && <span>{role}</span>}
                                    </p>
                                    {currentImg.caption && (
                                        <p className="text-[11px] font-sans text-amber-200/90 mt-1 italic">
                                            ℹ️ {currentImg.caption}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Strip (if multiple images) */}
                        {images.length > 1 && (
                            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setActiveImgIdx(idx)}
                                        className={`relative shrink-0 w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                            activeImgIdx === idx 
                                                ? 'border-[#881337] ring-2 ring-[#881337]/30 scale-105' 
                                                : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                                        }`}
                                    >
                                        <img
                                            src={img.url}
                                            alt={img.alt || `Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Gen-Z Interactive Links Hub (GitHub, Figma, Docs, Live Preview) */}
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                            <Terminal className="w-4 h-4 text-[#881337]" />
                            <span>{t('projects.assetsHeading', { defaultValue: 'ASET PROYEK & REPOSITORI:' })}</span>
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
                                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
                                >
                                    <img
                                        src="/images/icons/figma.svg"
                                        alt="Figma"
                                        className="w-3.5 h-3.5 object-contain shrink-0"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <span>Figma</span>
                                    <ExternalLink className="w-3 h-3 text-gray-400" />
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
                                    <span>{t('projects.docLabel', { defaultValue: 'Dokumentasi / SRS' })}</span>
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
                                    <span>{t('projects.liveLabel', { defaultValue: 'Live Preview' })}</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Section 1: Permasalahan yang Terjadi (Problem Statement / Latar Belakang) */}
                    {summary && (
                        <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/25 space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                                <span>{t('projects.problemStatement', { defaultValue: 'Permasalahan & Latar Belakang Proyek' })}</span>
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans">
                                {summary}
                            </p>
                        </div>
                    )}

                    {/* Section 2: Quick Metrics / Stats Grid */}
                    {metrics && metrics.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {metrics.map((m: any, idx: number) => (
                                <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-[#881337]/40 transition-colors">
                                    <div className="text-xl sm:text-2xl font-black font-mono text-[#881337]">{m.value}</div>
                                    <div className="text-xs font-bold text-gray-900 mt-1">{m.label}</div>
                                    {m.description && (
                                        <div className="text-[11px] text-gray-500 mt-0.5">{m.description}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Section 3: Job Desk & Key Achievements Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Desk / Cakupan Rekayasa & Implementasi */}
                        {contributions && contributions.length > 0 && (
                            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#881337]" />
                                    <span>{t('projects.coreScope', { defaultValue: 'Job Desk & Cakupan Kerja' })}</span>
                                </h4>
                                <ul className="space-y-2.5">
                                    {contributions.map((c: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#881337] shrink-0 mt-2" />
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Key Achievements / Sorotan Fitur Utama */}
                        {features && features.length > 0 && (
                            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-[#881337]" />
                                    <span>{t('projects.featureHighlights', { defaultValue: 'Key Achievements & Sorotan Fitur' })}</span>
                                </h4>
                                <div className="space-y-2">
                                    {features.map((f: string, idx: number) => (
                                        <div key={idx} className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-800 flex items-start gap-2.5 shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-[#881337] shrink-0 mt-1.5" />
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Section 4: Tools & Teknologi yang Digunakan */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="space-y-2 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                                <Layers className="w-4 h-4 text-[#881337]" />
                                <span>{t('projects.techStack', { defaultValue: 'Tools & Teknologi yang Digunakan' })}</span>
                            </span>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-white text-gray-800 border border-gray-200 shadow-sm"
                                    >
                                        #{tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Navigation (Prev / Next Case Study) */}
                <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-200 flex items-center justify-between">
                    {prevProject ? (
                        <button
                            type="button"
                            onClick={() => onSelectProject(prevProject)}
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-600 hover:text-[#881337] transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>{t('projects.prev', { defaultValue: 'Sebelumnya' })}: {prevProject.title.split(' ')[0]}</span>
                        </button>
                    ) : <div />}

                    {nextProject ? (
                        <button
                            type="button"
                            onClick={() => onSelectProject(nextProject)}
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-600 hover:text-[#881337] transition-colors cursor-pointer"
                        >
                            <span>{t('projects.nextBtn', { defaultValue: 'Berikutnya' })}: {nextProject.title.split(' ')[0]}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : <div />}
                </div>

            </div>
        </div>
    );
};
