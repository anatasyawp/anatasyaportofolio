import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Project } from '../types/portfolio';
import { 
    Plus, Edit3, Trash2, ArrowLeft, CheckCircle2, AlertCircle, 
    ExternalLink, Layers, Sparkles, X, Save 
} from 'lucide-react';

interface AdminProjectsProps {
    projects: (Project & { id: number })[];
}

export default function AdminProjects({ projects = [] }: AdminProjectsProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        number: '',
        category: 'Web Engineering',
        badge: '',
        period: '',
        client: '',
        role: '',
        summary: '',
        technologies: '',
        githubUrl: '',
        figmaUrl: '',
        docUrl: '',
        liveUrl: '',
        imageUrl: '',
        order: 1,
    });

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
            technologies: '',
            githubUrl: '',
            figmaUrl: '',
            docUrl: '',
            liveUrl: '',
            imageUrl: '',
            order: projects.length + 1,
        });
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
        setFormData({
            title: proj.title || '',
            number: proj.number || '',
            category: proj.category || 'Web Engineering',
            badge: proj.badge || '',
            period: proj.period || '',
            client: proj.client || '',
            role: proj.role || '',
            summary: proj.summary || '',
            technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '',
            githubUrl: proj.githubUrl || '',
            figmaUrl: proj.figmaUrl || '',
            docUrl: proj.docUrl || '',
            liveUrl: proj.liveUrl || '',
            imageUrl: proj.layerImages?.[0]?.url || '',
            order: proj.order ?? 1,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            technologies: formData.technologies
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            layerImages: formData.imageUrl
                ? [
                    {
                        url: formData.imageUrl,
                        alt: formData.title,
                        depth: 1,
                        caption: formData.title
                    }
                ]
                : [],
        };

        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

        try {
            const url = editingId
                ? `/anatasyaportofolio/public/api/projects/${editingId}`
                : `/anatasyaportofolio/public/api/projects`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatusMessage(editingId ? 'Proyek berhasil diperbarui!' : 'Proyek baru berhasil ditambahkan!');
                resetForm();
                setTimeout(() => {
                    router.reload();
                    setStatusMessage(null);
                }, 1000);
            } else {
                const err = await response.json();
                alert('Gagal menyimpan: ' + (err.message || 'Terjadi kesalahan'));
            }
        } catch (error) {
            alert('Gagal menghubungi server.');
        }
    };

    const handleDelete = async (id: number, title: string) => {
        if (!confirm(`Yakin ingin menghapus proyek "${title}"?`)) return;

        const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

        try {
            const response = await fetch(`/anatasyaportofolio/public/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });

            if (response.ok) {
                setStatusMessage('Proyek berhasil dihapus.');
                setTimeout(() => {
                    router.reload();
                    setStatusMessage(null);
                }, 800);
            } else {
                alert('Gagal menghapus proyek.');
            }
        } catch (error) {
            alert('Gagal menghubungi server.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-[#881337]/15 selection:text-[#881337]">
            <Head title="Project Management — Tasya Portfolio Admin" />

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a
                            href="/anatasyaportofolio/public/"
                            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-[#881337] hover:border-[#881337]/30 transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Portofolio</span>
                        </a>
                        <div className="h-4 w-px bg-gray-200" />
                        <div>
                            <h1 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                                <span>PORTFOLIO ADMIN</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#881337]/10 text-[#881337] font-bold">
                                    PROJECTS CRUD
                                </span>
                            </h1>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleStartCreate}
                        className="px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-mono font-bold shadow-md shadow-[#881337]/20 flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Proyek Baru</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Alert Notification */}
                {statusMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{statusMessage}</span>
                    </div>
                )}

                {/* Form Section (Modal / Expandable) */}
                {isEditing && (
                    <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white border border-[#881337]/30 shadow-xl shadow-[#881337]/05 relative">
                        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editingId ? 'Edit Data Proyek' : 'Tambah Proyek Baru'}
                                </h2>
                                <p className="text-xs text-gray-500 font-mono mt-0.5">
                                    Data yang disimpan akan langsung otomatis muncul di 3D Carousel & Modal Portofolio
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
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-mono text-gray-600 mb-1">
                                        Judul Proyek <span className="text-[#881337]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Modul Analitik Kepegawaian (MAK)"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
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
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Periode</label>
                                    <input
                                        type="text"
                                        placeholder="Januari – Maret 2026"
                                        value={formData.period}
                                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Klien / Lembaga</label>
                                    <input
                                        type="text"
                                        placeholder="Pemerintah Kota Depok / Personal"
                                        value={formData.client}
                                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Peran / Role</label>
                                    <input
                                        type="text"
                                        placeholder="Full-Stack Developer Intern"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-600 mb-1">Ringkasan / Summary</label>
                                <textarea
                                    rows={3}
                                    placeholder="Deskripsikan fitur utama, fungsi, dan hasil dari modul ini..."
                                    value={formData.summary}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-600 mb-1">
                                    Teknologi (pisahkan dengan koma)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Laravel, React, MySQL, Tailwind CSS, REST API"
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-600 mb-1">
                                    URL Gambar Preview (Unsplash atau path gambar lokal di folder public/images/)
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">URL GitHub</label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/anatasyawp/..."
                                        value={formData.githubUrl}
                                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">URL Figma</label>
                                    <input
                                        type="url"
                                        placeholder="https://figma.com/..."
                                        value={formData.figmaUrl}
                                        onChange={(e) => setFormData({ ...formData, figmaUrl: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">URL Dokumen / Drive</label>
                                    <input
                                        type="url"
                                        placeholder="https://drive.google.com/..."
                                        value={formData.docUrl}
                                        onChange={(e) => setFormData({ ...formData, docUrl: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-mono hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-mono font-bold shadow-md shadow-[#881337]/25 flex items-center gap-2 cursor-pointer"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{editingId ? 'Simpan Perubahan' : 'Tambahkan ke Database'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Table of Projects */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">Daftar Proyek di Database ({projects.length})</h2>
                            <p className="text-xs text-gray-500">Klik "Edit" untuk mengubah atau "Hapus" untuk menghapus proyek.</p>
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
                                {projects.map((proj, idx) => (
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
                                                        className="w-12 h-8 rounded-lg object-cover border border-gray-200 shrink-0"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-bold text-gray-900 leading-snug">
                                                        {proj.title}
                                                    </div>
                                                    <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                                                        {proj.role} · {proj.period}
                                                    </div>
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
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleStartEdit(proj)}
                                                    className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#881337] hover:border-[#881337]/30 transition-all"
                                                    title="Edit Proyek"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(proj.id, proj.title)}
                                                    className="p-1.5 rounded-lg border border-gray-200 text-rose-500 hover:text-rose-700 hover:border-rose-300 transition-all"
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
