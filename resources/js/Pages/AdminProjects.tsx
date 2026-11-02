import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Project, ProjectLayerImage } from '../types/portfolio';
import { 
    Plus, Edit3, Trash2, ArrowLeft, CheckCircle2, AlertCircle, 
    ExternalLink, Layers, Sparkles, X, Save, Upload, Image as ImageIcon,
    ArrowUp, ArrowDown, HelpCircle, Loader2
} from 'lucide-react';

interface AdminProjectsProps {
    projects: (Project & { id: number })[];
}

interface MetricItem {
    label: string;
    value: string;
    description: string;
}

export default function AdminProjects({ projects = [] }: AdminProjectsProps) {
    const [projectList, setProjectList] = useState(projects);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        number: '',
        category: 'Web Engineering' as Project['category'],
        badge: '',
        period: '',
        client: '',
        role: '',
        summary: '', // Permasalahan yang terjadi / Latar belakang
        contributions: '', // Job desk / Cakupan rekayasa (1 per baris)
        features: '', // Key achievements / Sorotan fitur utama (1 per baris)
        metrics: [] as MetricItem[],
        technologies: '', // Tools yang digunakan (dipisahkan koma)
        githubUrl: '',
        figmaUrl: '',
        docUrl: '',
        liveUrl: '',
        order: 1,
    });

    const [uploadedImages, setUploadedImages] = useState<ProjectLayerImage[]>([]);
    const [manualImageUrl, setManualImageUrl] = useState<string>('');

    const resetForm = () => {
        setFormData({
            title: '',
            number: '',
            category: 'Web Engineering',
            badge: '',
            period: '',
            client: '',
            role: '',
            summary: '',
            contributions: '',
            features: '',
            metrics: [
                { label: 'Fitur Dibangun', value: '', description: '' },
                { label: 'Testing Coverage', value: '', description: '' },
                { label: 'Regulasi / Standar', value: '', description: '' },
            ],
            technologies: '',
            githubUrl: '',
            figmaUrl: '',
            docUrl: '',
            liveUrl: '',
            order: projectList.length + 1,
        });
        setUploadedImages([]);
        setManualImageUrl('');
        setIsEditing(false);
        setEditingId(null);
    };

    const handleStartCreate = () => {
        resetForm();
        setIsEditing(true);
    };

    const handleStartEdit = (proj: any) => {
        setEditingId(proj.id);
        setIsEditing(true);

        const contributionsText = Array.isArray(proj.contributions) 
            ? proj.contributions.join('\n') 
            : (proj.contributions || '');

        const featuresText = Array.isArray(proj.features) 
            ? proj.features.join('\n') 
            : (proj.features || '');

        const techText = Array.isArray(proj.technologies) 
            ? proj.technologies.join(', ') 
            : (proj.technologies || '');

        const metricsArray: MetricItem[] = Array.isArray(proj.metrics) && proj.metrics.length > 0
            ? proj.metrics
            : [
                { label: 'Fitur Dibangun', value: '', description: '' },
                { label: 'Testing Coverage', value: '', description: '' },
                { label: 'Regulasi / Standar', value: '', description: '' },
            ];

        setFormData({
            title: proj.title || '',
            number: proj.number || '',
            category: proj.category || 'Web Engineering',
            badge: proj.badge || '',
            period: proj.period || '',
            client: proj.client || '',
            role: proj.role || '',
            summary: proj.summary || '',
            contributions: contributionsText,
            features: featuresText,
            metrics: metricsArray,
            technologies: techText,
            githubUrl: proj.githubUrl || '',
            figmaUrl: proj.figmaUrl || '',
            docUrl: proj.docUrl || '',
            liveUrl: proj.liveUrl || '',
            order: proj.order ?? 1,
        });

        if (Array.isArray(proj.layerImages) && proj.layerImages.length > 0) {
            setUploadedImages(proj.layerImages);
        } else if (proj.imageUrl) {
            setUploadedImages([{ url: proj.imageUrl, alt: proj.title, depth: 1, caption: proj.title }]);
        } else {
            setUploadedImages([]);
        }
    };

    const getBaseUrl = () => {
        const path = window.location.pathname;
        const adminIdx = path.indexOf('/admin');
        const basePath = adminIdx !== -1 ? path.substring(0, adminIdx) : '';
        return basePath;
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${getBaseUrl()}/api/projects`, {
                headers: { 'Accept': 'application/json' }
            });
            const result = await res.json();
            if (result.success && Array.isArray(result.data)) {
                setProjectList(result.data);
            }
        } catch (e) {
            console.error('Failed to reload projects', e);
        }
    };

    // Multi-image upload handler (Max 2MB per image, JPG/PNG/WebP, up to 10+ images)
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const maxSizeBytes = 2 * 1024 * 1024; // 2MB
        const validFiles: File[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate format
            if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
                alert(`File "${file.name}" bukan format gambar yang didukung (gunakan JPG, PNG, atau WebP).`);
                continue;
            }

            // Validate size <= 2MB
            if (file.size > maxSizeBytes) {
                alert(`Ukuran file "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)}MB) melebihi batas maksimal 2MB agar website tetap ringan.`);
                continue;
            }

            validFiles.push(file);
        }

        if (validFiles.length === 0) {
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        setIsUploading(true);

        try {
            const uploadFormData = new FormData();
            validFiles.forEach((f) => {
                uploadFormData.append('images[]', f);
            });

            const res = await fetch(`${getBaseUrl()}/api/upload`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: uploadFormData,
            });

            const data = await res.json();

            if (res.ok && data.success && Array.isArray(data.images)) {
                const newItems: ProjectLayerImage[] = data.images.map((img: any, idx: number) => ({
                    url: img.url,
                    alt: img.alt || formData.title || `Project Screenshot ${uploadedImages.length + idx + 1}`,
                    depth: 1,
                    caption: img.alt || '',
                }));

                setUploadedImages((prev) => [...prev, ...newItems]);
                setStatusMessage(`${newItems.length} gambar berhasil diupload!`);
                setTimeout(() => setStatusMessage(null), 3000);
            } else {
                alert('Gagal mengunggah gambar: ' + (data.message || 'Terjadi kesalahan'));
            }
        } catch (err) {
            alert('Gagal mengunggah gambar ke server.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleAddManualImage = () => {
        if (!manualImageUrl.trim()) return;
        const newImg: ProjectLayerImage = {
            url: manualImageUrl.trim(),
            alt: formData.title || 'Project Image',
            depth: 1,
            caption: '',
        };
        setUploadedImages([...uploadedImages, newImg]);
        setManualImageUrl('');
    };

    const handleRemoveImage = (index: number) => {
        setUploadedImages(uploadedImages.filter((_, idx) => idx !== index));
    };

    const handleMoveImage = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= uploadedImages.length) return;

        const updated = [...uploadedImages];
        const [moved] = updated.splice(index, 1);
        updated.splice(targetIndex, 0, moved);
        setUploadedImages(updated);
    };

    const handleUpdateCaption = (index: number, caption: string) => {
        const updated = [...uploadedImages];
        updated[index] = { ...updated[index], caption };
        setUploadedImages(updated);
    };

    const handleUpdateMetric = (index: number, field: keyof MetricItem, val: string) => {
        const updated = [...formData.metrics];
        updated[index] = { ...updated[index], [field]: val };
        setFormData({ ...formData, metrics: updated });
    };

    const handleAddMetricSlot = () => {
        if (formData.metrics.length >= 4) {
            alert('Maksimal 4 kartu metrik agar tampilan tetap rapi.');
            return;
        }
        setFormData({
            ...formData,
            metrics: [...formData.metrics, { label: '', value: '', description: '' }]
        });
    };

    const handleRemoveMetricSlot = (index: number) => {
        setFormData({
            ...formData,
            metrics: formData.metrics.filter((_, idx) => idx !== index)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (uploadedImages.length === 0) {
            if (!confirm('Anda belum mengunggah gambar untuk proyek ini. Tetap ingin menyimpan?')) {
                return;
            }
        }

        setIsSubmitting(true);

        // Parse multiline string into clean array
        const parseLines = (text: string) => 
            text
                .split('\n')
                .map((line) => line.trim().replace(/^[-*•\d.]\s*/, ''))
                .filter(Boolean);

        const contributionsArray = parseLines(formData.contributions);
        const featuresArray = parseLines(formData.features);
        const technologiesArray = formData.technologies
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        const validMetrics = formData.metrics.filter((m) => m.label.trim() || m.value.trim());

        const payload = {
            ...formData,
            contributions: contributionsArray,
            features: featuresArray,
            technologies: technologiesArray,
            metrics: validMetrics,
            layerImages: uploadedImages,
        };

        const base = `${getBaseUrl()}/api/projects`;

        try {
            const url = editingId ? `${base}/${editingId}` : base;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatusMessage(editingId ? 'Proyek berhasil diperbarui!' : 'Proyek baru berhasil ditambahkan!');
                resetForm();
                await fetchProjects();
                setTimeout(() => {
                    setStatusMessage(null);
                }, 3500);
            } else {
                const err = await response.json();
                alert('Gagal menyimpan: ' + (err.message || JSON.stringify(err)));
            }
        } catch (error) {
            alert('Gagal menghubungi server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Yakin ingin menghapus proyek "${title}"?`)) return;

        try {
            const response = await fetch(`${getBaseUrl()}/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setStatusMessage('Proyek berhasil dihapus.');
                await fetchProjects();
                setTimeout(() => {
                    setStatusMessage(null);
                }, 3000);
            } else {
                const err = await response.json();
                alert('Gagal menghapus proyek: ' + (err.message || ''));
            }
        } catch (error) {
            alert('Gagal menghubungi server.');
        }
    };

    const basePath = getBaseUrl();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-[#881337]/15 selection:text-[#881337] pb-16">
            <Head title="Project Management — Tasya Portfolio Admin" />

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a
                            href={`${basePath}/`}
                            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-[#881337] hover:border-[#881337]/30 transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Portofolio</span>
                        </a>
                        <div className="h-4 w-px bg-gray-200 hidden sm:block" />
                        <div>
                            <h1 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                                <span>PORTFOLIO ADMIN</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#881337]/10 text-[#881337] font-bold">
                                    PROJECTS CRUD
                                </span>
                            </h1>
                            <div className="flex flex-wrap gap-2 mt-0.5">
                                <span className="text-[10px] font-mono text-[#881337] font-bold">Projects</span>
                                <span className="text-[10px] text-gray-300">·</span>
                                <a href={`${basePath}/admin/licenses`} className="text-[10px] font-mono text-gray-500 hover:text-[#881337]">
                                    Licenses
                                </a>
                                <span className="text-[10px] text-gray-300">·</span>
                                <a href={`${basePath}/admin/achievements`} className="text-[10px] font-mono text-gray-500 hover:text-[#881337]">
                                    Achievements
                                </a>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleStartCreate}
                        className="px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-mono font-bold shadow-md shadow-[#881337]/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Proyek Baru</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Alert Notification */}
                {statusMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{statusMessage}</span>
                    </div>
                )}

                {/* Form Section */}
                {isEditing && (
                    <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#881337]/30 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>{editingId ? 'Edit Data Proyek' : 'Tambah Proyek Baru'}</span>
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#881337]/10 text-[#881337] font-mono font-bold">
                                        Form Lengkap Case Study
                                    </span>
                                </h2>
                                <p className="text-xs text-gray-500 font-mono mt-1">
                                    Semua data yang diinput di sini akan langsung sinkron dan muncul saat proyek diklik di website.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Section 1: Informasi Dasar */}
                            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 space-y-4">
                                <h3 className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-[#881337]" />
                                    <span>1. Informasi Pokok Proyek</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">
                                            Nomor Proyek (misal: 01, 02, 04)
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="04"
                                            value={formData.number}
                                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-xs font-mono text-gray-600 mb-1">
                                            Judul Proyek <span className="text-[#881337]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Modul Pengajuan Standar Kompetensi Jabatan (SKJ)"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">Kategori</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        >
                                            <option value="Government & Enterprise">Government & Enterprise</option>
                                            <option value="Web Engineering">Web Engineering</option>
                                            <option value="UI/UX & Frontend">UI/UX & Frontend</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">Badge (misal: Enterprise Internship)</label>
                                        <input
                                            type="text"
                                            placeholder="Enterprise Project"
                                            value={formData.badge}
                                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">Periode Proyek</label>
                                        <input
                                            type="text"
                                            placeholder="Agustus – November 2025"
                                            value={formData.period}
                                            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">Instansi / Klien</label>
                                        <input
                                            type="text"
                                            placeholder="Pemerintah Kota Depok / Personal Project"
                                            value={formData.client}
                                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">Peran / Role</label>
                                        <input
                                            type="text"
                                            placeholder="Full-Stack Developer Intern"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Upload Gambar (Max 2MB per gambar, JPG/PNG/WebP, support 10+ gambar) */}
                            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h3 className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                            <ImageIcon className="w-3.5 h-3.5 text-[#881337]" />
                                            <span>2. Upload Gambar Screenshot Proyek</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                                JPG / PNG / WebP · Max 2MB / file
                                            </span>
                                        </h3>
                                        <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                                            Bisa unggah sekaligus hingga 10+ screenshot. Gambar pertama otomatis menjadi gambar sampul utama (Banner).
                                        </p>
                                    </div>

                                    {/* Upload Button */}
                                    <label className={`px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-mono font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                <span>Mengunggah...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-3.5 h-3.5" />
                                                <span>Pilih File Gambar</span>
                                            </>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept="image/jpeg,image/png,image/jpg,image/webp"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Uploaded Images Gallery / List */}
                                {uploadedImages.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                                        {uploadedImages.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="relative group bg-white border border-gray-200 rounded-2xl overflow-hidden p-2.5 shadow-sm space-y-2"
                                            >
                                                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                                    <img
                                                        src={img.url}
                                                        alt={img.alt || `Gambar ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                                                        {idx === 0 ? '★ BANNER UTAMA' : `#${idx + 1}`}
                                                    </span>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <input
                                                        type="text"
                                                        placeholder="Keterangan gambar (opsional)"
                                                        value={img.caption || ''}
                                                        onChange={(e) => handleUpdateCaption(idx, e.target.value)}
                                                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#881337]"
                                                    />

                                                    <div className="flex items-center justify-between pt-1">
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                type="button"
                                                                disabled={idx === 0}
                                                                onClick={() => handleMoveImage(idx, 'up')}
                                                                className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-30 disabled:pointer-events-none"
                                                                title="Pindah ke Atas / Depan"
                                                            >
                                                                <ArrowUp className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                disabled={idx === uploadedImages.length - 1}
                                                                onClick={() => handleMoveImage(idx, 'down')}
                                                                className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-30 disabled:pointer-events-none"
                                                                title="Pindah ke Bawah / Belakang"
                                                            >
                                                                <ArrowDown className="w-3 h-3" />
                                                            </button>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveImage(idx)}
                                                            className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                                            title="Hapus Gambar"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-8 border-2 border-dashed border-gray-200 rounded-2xl text-center space-y-1 bg-white">
                                        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto" />
                                        <p className="text-xs text-gray-600 font-medium">Belum ada gambar yang diunggah.</p>
                                        <p className="text-[11px] text-gray-400 font-mono">Klik "Pilih File Gambar" di atas untuk upload dari komputer.</p>
                                    </div>
                                )}

                                {/* Fallback add by URL */}
                                <div className="pt-2 flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Atau tempel URL gambar eksternal (Unsplash / CDN)..."
                                        value={manualImageUrl}
                                        onChange={(e) => setManualImageUrl(e.target.value)}
                                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#881337] bg-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddManualImage}
                                        className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-xs font-mono font-bold"
                                    >
                                        Tambah URL
                                    </button>
                                </div>
                            </div>

                            {/* Section 3: Permasalahan yang Terjadi (Problem Statement) */}
                            <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20 space-y-2">
                                <label className="block text-xs font-mono font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                                    <span>3. Permasalahan yang Terjadi / Latar Belakang Proyek <span className="text-[#881337]">*</span></span>
                                </label>
                                <p className="text-[11px] text-amber-800/80 font-mono">
                                    Jelaskan kendala, kebutuhan instansi, atau permasalahan awal yang diselesaikan melalui proyek ini (akan muncul di popup detail saat proyek diklik).
                                </p>
                                <textarea
                                    rows={4}
                                    required
                                    placeholder="Contoh: Proses pengajuan dan pemetaan standar kompetensi jabatan sebelumnya dilakukan secara manual dengan spreadsheet, memicu inkonsistensi data, alur persetujuan lambat, dan kesulitan dalam melacak riwayat perubahan dokumen kompetensi kepegawaian."
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/30 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                />
                            </div>

                            {/* Section 4: Job Desk / Cakupan Rekayasa (Contributions) */}
                            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 space-y-2">
                                <label className="block text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#881337]" />
                                    <span>4. Job Desk / Cakupan Rekayasa & Implementasi <span className="text-[#881337]">*</span></span>
                                </label>
                                <p className="text-[11px] text-gray-500 font-mono">
                                    Tuliskan tugas, tanggung jawab, dan kontribusi teknis kamu. <strong>Gunakan 1 baris per poin job desk</strong>:
                                </p>
                                <textarea
                                    rows={5}
                                    required
                                    placeholder="Contoh:&#10;Merancang dan membangun 8 fitur operasional frontend, backend, dan database MySQL selama 3 bulan.&#10;Membangun modul validasi matriks kompetensi sesuai regulasi KemenPAN-RB.&#10;Mengimplementasikan sistem notifikasi review dan riwayat revisi dokumen menggunakan Laravel.&#10;Melakukan Black Box Testing untuk menguji alur persetujuan multi-level dan session role."
                                    value={formData.contributions}
                                    onChange={(e) => setFormData({ ...formData, contributions: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white font-sans"
                                />
                            </div>

                            {/* Section 5: Key Achievements (Sorotan Fitur & Metrik Dampak) */}
                            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 space-y-4">
                                <div>
                                    <label className="block text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-[#881337]" />
                                        <span>5. Key Achievements & Sorotan Fitur Utama <span className="text-[#881337]">*</span></span>
                                    </label>
                                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                                        Tuliskan pencapaian fungsional dan fitur unggulan yang berhasil dibangun. <strong>Gunakan 1 baris per fitur</strong>:
                                    </p>
                                </div>
                                <textarea
                                    rows={4}
                                    required
                                    placeholder="Contoh:&#10;Dynamic Competency Matrix Form dengan Perhitungan Bobot Otomatis&#10;Multi-step Document Review Workflow (Draft, Technical Review, Final Approval)&#10;Export Dokumen Resmi Standar Kompetensi ke format PDF / Cetak&#10;Competency Document Version Change Log & Audit Trail"
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white font-sans"
                                />

                                {/* Kartu Metrik Tambahan */}
                                <div className="pt-2 border-t border-gray-200 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-gray-600">
                                            Kartu Angka / Metrik Pencapaian (Opsional, muncul di kotak stats):
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleAddMetricSlot}
                                            className="text-xs font-mono text-[#881337] hover:underline flex items-center gap-1 font-bold"
                                        >
                                            <Plus className="w-3 h-3" /> Tambah Kartu
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {formData.metrics.map((m, mIdx) => (
                                            <div key={mIdx} className="p-3 rounded-xl bg-white border border-gray-200 space-y-1.5 relative">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-mono text-gray-400">Stat #{mIdx + 1}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveMetricSlot(mIdx)}
                                                        className="text-gray-400 hover:text-rose-500"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Nilai (e.g. 8 Features, 100%)"
                                                    value={m.value}
                                                    onChange={(e) => handleUpdateMetric(mIdx, 'value', e.target.value)}
                                                    className="w-full px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-200 text-[#881337] focus:outline-none focus:border-[#881337]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Label (e.g. Fitur Dibangun)"
                                                    value={m.label}
                                                    onChange={(e) => handleUpdateMetric(mIdx, 'label', e.target.value)}
                                                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#881337]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Keterangan singkat"
                                                    value={m.description}
                                                    onChange={(e) => handleUpdateMetric(mIdx, 'description', e.target.value)}
                                                    className="w-full px-2.5 py-1 text-[11px] rounded-lg border border-gray-200 text-gray-500 focus:outline-none focus:border-[#881337]"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Section 6: Tools yang Digunakan (Technologies) */}
                            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 space-y-2">
                                <label className="block text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <Layers className="w-3.5 h-3.5 text-[#881337]" />
                                    <span>6. Tools & Teknologi yang Digunakan <span className="text-[#881337]">*</span></span>
                                </label>
                                <p className="text-[11px] text-gray-500 font-mono">
                                    Tuliskan bahasa pemrograman, framework, dan tools yang dipakai, pisahkan dengan koma:
                                </p>
                                <input
                                    type="text"
                                    required
                                    placeholder="Laravel, PHP, MySQL, JavaScript, Blade Components, Black Box Testing, Figma, Git"
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white font-mono"
                                />
                            </div>

                            {/* Section 7: Tautan / Link Proyek */}
                            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 space-y-3">
                                <h3 className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider">
                                    7. Tautan Aset & Repositori (Opsional)
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-mono text-gray-600 mb-1">GitHub URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://github.com/..."
                                            value={formData.githubUrl}
                                            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-gray-600 mb-1">Figma URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://figma.com/..."
                                            value={formData.figmaUrl}
                                            onChange={(e) => setFormData({ ...formData, figmaUrl: e.target.value })}
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-gray-600 mb-1">Dokumen / SRS / Drive</label>
                                        <input
                                            type="url"
                                            placeholder="https://drive.google.com/..."
                                            value={formData.docUrl}
                                            onChange={(e) => setFormData({ ...formData, docUrl: e.target.value })}
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-mono text-gray-600 mb-1">Live Preview URL</label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com"
                                            value={formData.liveUrl}
                                            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                            className="w-full px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-mono hover:bg-gray-100 cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isUploading}
                                    className="px-7 py-3 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-mono font-bold shadow-lg shadow-[#881337]/25 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan ke Database...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>{editingId ? 'Simpan Perubahan' : 'Tambahkan ke Database'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Table of Projects */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">Daftar Proyek di Database ({projectList.length})</h2>
                            <p className="text-xs text-gray-500">Klik tombol "Edit" untuk mengubah atau "Hapus" untuk menghapus proyek.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">No</th>
                                    <th className="py-3.5 px-6">Preview & Judul</th>
                                    <th className="py-3.5 px-6">Kategori & Klien</th>
                                    <th className="py-3.5 px-6">Teknologi</th>
                                    <th className="py-3.5 px-6">Tautan</th>
                                    <th className="py-3.5 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {projectList.map((proj, idx) => (
                                    <tr key={proj.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="py-4 px-6 font-mono font-bold text-gray-500">
                                            {proj.number || `0${idx + 1}`}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                {proj.layerImages?.[0]?.url && (
                                                    <img
                                                        src={proj.layerImages[0].url}
                                                        alt={proj.title}
                                                        className="w-14 h-9 rounded-lg object-cover border border-gray-200 shrink-0 shadow-sm"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-bold text-gray-900 leading-snug">
                                                        {proj.title}
                                                    </div>
                                                    <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                                                        {proj.role} · {proj.period}
                                                    </div>
                                                    {proj.layerImages && proj.layerImages.length > 1 && (
                                                        <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200">
                                                            📷 {proj.layerImages.length} gambar
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-gray-800">{proj.client || '—'}</span>
                                            <div className="text-[11px] text-gray-500 font-mono">{proj.category}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {proj.technologies?.slice(0, 3).map((t) => (
                                                    <span key={t} className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-600">
                                                        {t}
                                                    </span>
                                                ))}
                                                {(proj.technologies?.length || 0) > 3 && (
                                                    <span className="text-[10px] text-gray-400 font-mono">
                                                        +{(proj.technologies?.length || 0) - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                {proj.githubUrl && (
                                                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-[#881337]" title="GitHub">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                {proj.figmaUrl && (
                                                    <a href={proj.figmaUrl} target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-700" title="Figma">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                {proj.liveUrl && (
                                                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700" title="Live Preview">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleStartEdit(proj)}
                                                    className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#881337] hover:border-[#881337]/30 transition-all cursor-pointer"
                                                    title="Edit Proyek"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(proj.id, proj.title)}
                                                    className="p-1.5 rounded-lg border border-gray-200 text-rose-500 hover:text-rose-700 hover:border-rose-300 transition-all cursor-pointer"
                                                    title="Hapus Proyek"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
