import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { Achievement } from '../types/portfolio';
import { 
    Plus, Edit3, Trash2, ArrowLeft, CheckCircle2, ExternalLink, X, Save, 
    Upload, Image as ImageIcon, Loader2, Trophy, Award 
} from 'lucide-react';

interface AdminAchievementsProps {
    achievements: (Achievement & { id: number })[];
}

export default function AdminAchievements({ achievements = [] }: AdminAchievementsProps) {
    const [achievementList, setAchievementList] = useState(achievements);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        event: '',
        year: '',
        description: '',
        badge: '',
        association: '',
        category: 'National Competition',
        credentialUrl: '',
        skills: '',
        image: '',
        order: 1,
    });

    const resetForm = () => {
        setFormData({
            title: '',
            event: '',
            year: '',
            description: '',
            badge: '',
            association: '',
            category: 'National Competition',
            credentialUrl: '',
            skills: '',
            image: '',
            order: achievementList.length + 1,
        });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleStartCreate = () => {
        resetForm();
        setIsEditing(true);
    };

    const handleStartEdit = (item: Achievement & { id: number }) => {
        setEditingId(Number(item.id));
        setIsEditing(true);
        setFormData({
            title: item.title || '',
            event: item.event || '',
            year: item.year || '',
            description: item.description || '',
            badge: item.badge || '',
            association: item.association || '',
            category: item.category || 'National Competition',
            credentialUrl: item.credentialUrl || '',
            skills: Array.isArray(item.skills) ? item.skills.join(', ') : '',
            image: item.image || '',
            order: item.order ?? 1,
        });
    };

    const getBaseUrl = () => {
        const path = window.location.pathname;
        const adminIdx = path.indexOf('/admin');
        return adminIdx !== -1 ? path.substring(0, adminIdx) : '';
    };

    const apiBase = () => `${getBaseUrl()}/api/achievements`;

    const fetchAchievements = async () => {
        try {
            const res = await fetch(apiBase(), {
                headers: { Accept: 'application/json' },
            });
            const result = await res.json();
            if (result.success && Array.isArray(result.data)) {
                setAchievementList(result.data);
            }
        } catch (e) {
            console.error('Failed to reload achievements', e);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    // File Upload Handler (Max 2MB per file, JPG/PNG/WebP)
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSizeBytes = 2 * 1024 * 1024; // 2MB

        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
            alert('Format file tidak didukung! Mohon gunakan JPG, PNG, atau WebP.');
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        if (file.size > maxSizeBytes) {
            alert(`Ukuran file (${(file.size / (1024 * 1024)).toFixed(1)}MB) melebihi batas maksimal 2MB agar website tetap ringan.`);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        setIsUploading(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('image', file);
            uploadFormData.append('folder', 'achievements');

            const res = await fetch(`${getBaseUrl()}/api/upload`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: uploadFormData,
            });

            const data = await res.json();

            if (res.ok && data.success && data.url) {
                setFormData((prev) => ({ ...prev, image: data.url }));
                setStatusMessage('Foto bukti penghargaan/prestasi berhasil diunggah!');
                setTimeout(() => setStatusMessage(null), 3000);
            } else {
                alert('Gagal mengunggah foto: ' + (data.message || 'Terjadi kesalahan'));
            }
        } catch (err) {
            alert('Gagal mengunggah gambar ke server.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            skills: formData.skills
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            credentialUrl: formData.credentialUrl || null,
        };

        try {
            const url = editingId ? `${apiBase()}/${editingId}` : apiBase();
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setStatusMessage(editingId ? 'Prestasi berhasil diperbarui!' : 'Prestasi baru berhasil ditambahkan!');
                resetForm();
                await fetchAchievements();
                setTimeout(() => {
                    setStatusMessage(null);
                }, 3000);
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
        if (!confirm(`Yakin ingin menghapus prestasi "${title}"?`)) return;

        try {
            const response = await fetch(`${apiBase()}/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                setStatusMessage('Prestasi berhasil dihapus.');
                await fetchAchievements();
                setTimeout(() => {
                    setStatusMessage(null);
                }, 3000);
            } else {
                const err = await response.json();
                alert('Gagal menghapus prestasi: ' + (err.message || ''));
            }
        } catch (error) {
            alert('Gagal menghubungi server.');
        }
    };

    const basePath = getBaseUrl();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-[#881337]/15 selection:text-[#881337] pb-16">
            <Head title="Achievement Management — Tasya Portfolio Admin" />

            <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                                    ACHIEVEMENTS CRUD
                                </span>
                            </h1>
                            <div className="flex flex-wrap gap-2 mt-0.5">
                                <a href={`${basePath}/admin/projects`} className="text-[10px] font-mono text-gray-500 hover:text-[#881337]">
                                    Projects
                                </a>
                                <span className="text-[10px] text-gray-300">·</span>
                                <a href={`${basePath}/admin/licenses`} className="text-[10px] font-mono text-gray-500 hover:text-[#881337]">
                                    Licenses
                                </a>
                                <span className="text-[10px] text-gray-300">·</span>
                                <span className="text-[10px] font-mono text-[#881337] font-bold">Achievements</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleStartCreate}
                        className="px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-mono font-bold shadow-md shadow-[#881337]/20 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Prestasi Baru</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {statusMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{statusMessage}</span>
                    </div>
                )}

                {isEditing && (
                    <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#881337]/30 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>{editingId ? 'Edit Data Prestasi' : 'Tambah Prestasi Baru'}</span>
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 font-mono font-bold">
                                        Sinkron dengan Portofolio
                                    </span>
                                </h2>
                                <p className="text-xs text-gray-500 font-mono mt-1">
                                    Data dan gambar yang disimpan akan langsung tampil di carousel Licenses & Achievements.
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

                            {/* Section 1: Informasi Prestasi */}
                            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 space-y-4">
                                <h3 className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                                    <span>1. Informasi Prestasi & Penghargaan</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">
                                            Nama Prestasi / Judul Kompetisi <span className="text-[#881337]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Juara 3 AIReF Poster Competition"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">
                                            Penyelenggara / Event <span className="text-[#881337]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="HIMASHI Universitas Andalas"
                                            value={formData.event}
                                            onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">Kategori</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        >
                                            <option value="National Competition">National Competition</option>
                                            <option value="Regional Competition">Regional Competition</option>
                                            <option value="Academic Award">Academic Award</option>
                                            <option value="Design Award">Design Award</option>
                                            <option value="Hackathon">Hackathon</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">Badge Penghargaan</label>
                                        <input
                                            type="text"
                                            placeholder="Juara 3 / Finalist"
                                            value={formData.badge}
                                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-600 mb-1">Waktu (Bulan/Tahun)</label>
                                        <input
                                            type="text"
                                            placeholder="Sep 2024"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Institusi Terkait (Association)</label>
                                    <input
                                        type="text"
                                        placeholder="Institut Pertanian Bogor (IPB)"
                                        value={formData.association}
                                        onChange={(e) => setFormData({ ...formData, association: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Deskripsi Prestasi</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Kompetisi poster yang diselenggarakan oleh HIMASHI Universitas Andalas, merancang komunikasi visual dan infografis."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">
                                        Skills / Kompetensi yang Digunakan (pisahkan dengan koma)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Visual Design, Poster Design, Creative Communication, Infographics"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Tautan Bukti / Sertifikat Penghargaan (LinkedIn / Online)</label>
                                    <input
                                        type="url"
                                        placeholder="https://linkedin.com/in/anatasyawp/overlay/Honor/..."
                                        value={formData.credentialUrl}
                                        onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337] bg-white"
                                    />
                                </div>
                            </div>

                            {/* Section 2: Upload Foto Sertifikat / Piala / Dokumentasi */}
                            <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/80 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h3 className="text-xs font-mono font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                                            <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                                            <span>2. Upload Foto Sertifikat / Piala / Dokumentasi</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                                JPG / PNG / WebP · Max 2MB
                                            </span>
                                        </h3>
                                        <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                                            Upload foto dokumentasi atau sertifikat penghargaan langsung dari perangkat kamu.
                                        </p>
                                    </div>

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
                                            accept="image/jpeg,image/png,image/jpg,image/webp"
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {formData.image ? (
                                    <div className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl">
                                        <img
                                            src={formData.image}
                                            alt={formData.title || 'Preview'}
                                            className="w-24 h-16 rounded-xl object-cover border border-gray-200 shadow-sm shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-mono font-bold text-gray-800 truncate">
                                                {formData.image}
                                            </div>
                                            <div className="text-[11px] text-emerald-600 font-mono flex items-center gap-1 mt-0.5">
                                                <CheckCircle2 className="w-3 h-3" />
                                                <span>Foto prestasi siap digunakan</span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, image: '' })}
                                            className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                            title="Hapus Gambar"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-6 border-2 border-dashed border-gray-200 rounded-2xl text-center space-y-1 bg-white">
                                        <ImageIcon className="w-7 h-7 text-gray-400 mx-auto" />
                                        <p className="text-xs text-gray-600 font-medium">Belum ada foto yang diunggah.</p>
                                        <p className="text-[11px] text-gray-400 font-mono">Pilih file gambar di atas atau tempel URL eksternal di bawah.</p>
                                    </div>
                                )}

                                {/* Fallback add by URL */}
                                <div className="pt-1 flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Atau tempel URL gambar eksternal (Unsplash / CDN)..."
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#881337] bg-white"
                                    />
                                </div>
                            </div>

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
                                            <span>Menyimpan...</span>
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

                {/* Table of Achievements */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">Daftar Prestasi & Penghargaan ({achievementList.length})</h2>
                            <p className="text-xs text-gray-500">Klik tombol "Edit" untuk mengubah atau "Hapus" untuk menghapus prestasi.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">Foto & Judul</th>
                                    <th className="py-3.5 px-6">Penyelenggara / Event</th>
                                    <th className="py-3.5 px-6">Kategori</th>
                                    <th className="py-3.5 px-6">Waktu</th>
                                    <th className="py-3.5 px-6">Tautan</th>
                                    <th className="py-3.5 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {achievementList.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-12 h-9 rounded-lg object-cover border border-gray-200 shrink-0 shadow-sm"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-bold text-gray-900 leading-snug">
                                                        {item.title}
                                                    </div>
                                                    {item.badge && (
                                                        <div className="text-[10px] text-amber-700 font-mono font-bold mt-0.5">
                                                            {item.badge}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-gray-800">{item.event}</span>
                                            {item.association && (
                                                <div className="text-[11px] text-gray-500">{item.association}</div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-2 py-0.5 rounded bg-amber-50 text-[10px] font-mono text-amber-800 border border-amber-200">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-mono text-gray-600">
                                            {item.year || '—'}
                                        </td>
                                        <td className="py-4 px-6">
                                            {item.credentialUrl ? (
                                                <a
                                                    href={item.credentialUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 text-[#881337] hover:underline font-mono text-[11px]"
                                                >
                                                    <span>Lihat</span>
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 font-mono text-[11px]">—</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleStartEdit(item)}
                                                    className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#881337] hover:border-[#881337]/30 transition-all cursor-pointer"
                                                    title="Edit Prestasi"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(Number(item.id), item.title)}
                                                    className="p-1.5 rounded-lg border border-gray-200 text-rose-500 hover:text-rose-700 hover:border-rose-300 transition-all cursor-pointer"
                                                    title="Hapus Prestasi"
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
