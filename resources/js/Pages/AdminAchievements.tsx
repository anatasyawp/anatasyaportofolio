import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Achievement } from '../types/portfolio';
import { Plus, Edit3, Trash2, ArrowLeft, CheckCircle2, ExternalLink, X, Save } from 'lucide-react';

interface AdminAchievementsProps {
    achievements: (Achievement & { id: number })[];
}

export default function AdminAchievements({ achievements = [] }: AdminAchievementsProps) {
    const [achievementList, setAchievementList] = useState(achievements);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
        <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-[#881337]/15 selection:text-[#881337]">
            <Head title="Achievement Management — Tasya Portfolio Admin" />

            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <a
                            href={`${basePath}/`}
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
                                    ACHIEVEMENTS CRUD
                                </span>
                            </h1>
                            <div className="flex flex-wrap gap-2 mt-1">
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
                        className="px-4 py-2 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-mono font-bold shadow-md shadow-[#881337]/20 flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Prestasi Baru</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {statusMessage && (
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{statusMessage}</span>
                    </div>
                )}

                {isEditing && (
                    <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white border border-[#881337]/30 shadow-xl shadow-[#881337]/05 relative">
                        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editingId ? 'Edit Data Prestasi' : 'Tambah Prestasi Baru'}
                                </h2>
                                <p className="text-xs text-gray-500 font-mono mt-0.5">
                                    Data yang disimpan akan langsung muncul di carousel Licenses & Achievements
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
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-mono text-gray-600 mb-1">
                                        Judul Prestasi <span className="text-[#881337]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Juara 3 AIReF Poster Competition"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Tahun / Periode</label>
                                    <input
                                        type="text"
                                        placeholder="Sep 2024"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">
                                        Event / Penyelenggara <span className="text-[#881337]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="HIMASHI Universitas Andalas"
                                        value={formData.event}
                                        onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Asosiasi</label>
                                    <input
                                        type="text"
                                        placeholder="Institut Pertanian Bogor (IPB)"
                                        value={formData.association}
                                        onChange={(e) => setFormData({ ...formData, association: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    >
                                        <option value="National Competition">National Competition</option>
                                        <option value="Academic Award">Academic Award</option>
                                        <option value="Organization">Organization</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">Badge</label>
                                    <input
                                        type="text"
                                        placeholder="Juara 3"
                                        value={formData.badge}
                                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-600 mb-1">Deskripsi</label>
                                <textarea
                                    rows={3}
                                    placeholder="Jelaskan konteks kompetisi, tema, dan hasil yang diraih..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-600 mb-1">
                                    Skills (pisahkan dengan koma)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Visual Design, Poster Design, Infographics"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">URL Gambar Preview</label>
                                    <input
                                        type="text"
                                        placeholder="https://images.unsplash.com/..."
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#881337]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-600 mb-1">URL Kredensial / Honor</label>
                                    <input
                                        type="url"
                                        placeholder="https://linkedin.com/in/..."
                                        value={formData.credentialUrl}
                                        onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
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
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 rounded-xl bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-mono font-bold shadow-md shadow-[#881337]/25 flex items-center gap-2 cursor-pointer"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{editingId ? 'Simpan Perubahan' : 'Tambahkan ke Database'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-base font-bold text-gray-900">Daftar Prestasi di Database ({achievementList.length})</h2>
                        <p className="text-xs text-gray-500">Klik "Edit" untuk mengubah atau "Hapus" untuk menghapus prestasi.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/60 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">No</th>
                                    <th className="py-3.5 px-6">Preview & Judul</th>
                                    <th className="py-3.5 px-6">Event</th>
                                    <th className="py-3.5 px-6">Skills</th>
                                    <th className="py-3.5 px-6">Tautan</th>
                                    <th className="py-3.5 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {achievementList.map((item, idx) => (
                                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="py-4 px-6 font-mono font-bold text-gray-500">
                                            {String(idx + 1).padStart(2, '0')}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-12 h-8 rounded-lg object-cover border border-gray-200 shrink-0"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-bold text-gray-900 leading-snug">{item.title}</div>
                                                    <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                                                        {item.badge || item.category} · {item.year}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-gray-800">{item.event || '—'}</span>
                                            <div className="text-[11px] text-gray-500 font-mono">{item.association || item.category}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {item.skills?.slice(0, 3).map((t) => (
                                                    <span key={t} className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono text-gray-600">
                                                        {t}
                                                    </span>
                                                ))}
                                                {(item.skills?.length || 0) > 3 && (
                                                    <span className="text-[10px] text-gray-400 font-mono">
                                                        +{(item.skills?.length || 0) - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {item.credentialUrl && (
                                                <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-[#881337]" title="Credential">
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleStartEdit(item)}
                                                    className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-[#881337] hover:border-[#881337]/30 transition-all"
                                                    title="Edit Prestasi"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(Number(item.id), item.title)}
                                                    className="p-1.5 rounded-lg border border-gray-200 text-rose-500 hover:text-rose-700 hover:border-rose-300 transition-all"
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
