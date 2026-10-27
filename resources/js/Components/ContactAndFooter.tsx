import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const ContactAndFooter: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus('error');
            setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus('error');
            setErrorMessage('Invalid email format.');
            return;
        }

        setStatus('submitting');

        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    return (
        <footer id="contact" className="pt-24 pb-12 relative bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    
                    {/* Left Column: Direct Inquiries */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 text-[#881337] font-mono text-xs uppercase tracking-widest mb-3">
                                <Mail className="w-3.5 h-3.5" />
                                <span>Get In Touch</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                                Let's build something remarkable.
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
                                Open to Full-Stack Developer, Web Engineer, UI/UX, or Software QA roles. Feel free to reach out to discuss collaboration opportunities, job prospects, or any software technology project.
                            </p>

                            <div className="space-y-4">
                                <a
                                    href={`mailto:${PERSONAL_INFO.email}`}
                                    className="p-4 rounded-xl glass-panel border border-gray-200 dark:border-white/10 flex items-center gap-3.5 hover:border-[#881337]/30 transition-colors group bg-white dark:bg-[#1e1e1e]"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[#881337]/08 border border-[#881337]/15 flex items-center justify-center text-[#881337] dark:text-[#be123c] group-hover:scale-105 transition-transform">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Direct Email</div>
                                        <div className="text-sm font-mono text-gray-900 dark:text-white group-hover:text-[#881337] dark:group-hover:text-[#be123c] transition-colors">
                                            {PERSONAL_INFO.email}
                                        </div>
                                    </div>
                                </a>

                                <div className="p-4 rounded-xl glass-panel border border-gray-200 dark:border-white/10 flex items-center gap-3.5 bg-white dark:bg-[#1e1e1e]">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Location Base</div>
                                        <div className="text-sm text-gray-900 dark:text-white">
                                            {PERSONAL_INFO.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Presence */}
                        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-white/5 flex items-center gap-3">
                            <a
                                href={PERSONAL_INFO.github}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 rounded-lg glass-panel border border-gray-200 dark:border-white/10 text-xs font-mono text-gray-700 dark:text-gray-300 hover:text-[#881337] dark:hover:text-white flex items-center gap-2 hover:border-[#881337]/25 transition-all bg-white dark:bg-[#1e1e1e]"
                            >
                                <GithubIcon className="w-4 h-4" />
                                <span>GitHub</span>
                                <ArrowUpRight className="w-3 h-3 text-gray-400" />
                            </a>
                            <a
                                href={PERSONAL_INFO.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 rounded-lg glass-panel border border-gray-200 dark:border-white/10 text-xs font-mono text-gray-700 dark:text-gray-300 hover:text-[#881337] dark:hover:text-white flex items-center gap-2 hover:border-[#881337]/25 transition-all bg-white dark:bg-[#1e1e1e]"
                            >
                                <LinkedinIcon className="w-4 h-4" />
                                <span>LinkedIn</span>
                                <ArrowUpRight className="w-3 h-3 text-gray-400" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="p-6 sm:p-10 rounded-2xl glass-panel border border-gray-200 dark:border-white/10 shadow-sm bg-white dark:bg-[#1e1e1e]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send a Message</h3>
                                <span className="text-[11px] font-mono text-gray-400">
                                    Frontend-Ready Form
                                </span>
                            </div>

                            {status === 'success' && (
                                <div className="p-4 mb-6 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#881337] dark:text-[#be123c]" />
                                    <span>Your message is ready to send! This form is structured for MySQL backend integration in the next phase.</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-4 mb-6 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-mono text-gray-600 dark:text-gray-400 mb-1.5">
                                            Full Name <span className="text-[#881337]">*</span>
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Alex Pratama"
                                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#881337] dark:focus:border-[#be123c] transition-colors placeholder:text-gray-400"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs font-mono text-gray-600 dark:text-gray-400 mb-1.5">
                                            Email Address <span className="text-[#881337]">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="name@company.com"
                                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#881337] dark:focus:border-[#be123c] transition-colors placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs font-mono text-gray-600 dark:text-gray-400 mb-1.5">
                                        Subject / Topic
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Job Opportunity / Project Collaboration"
                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#881337] dark:focus:border-[#be123c] transition-colors placeholder:text-gray-400"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-mono text-gray-600 dark:text-gray-400 mb-1.5">
                                        Message <span className="text-[#881337]">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write the details of your message or inquiry here..."
                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#881337] dark:focus:border-[#be123c] transition-colors placeholder:text-gray-400 resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-3.5 px-6 rounded-lg bg-[#881337] hover:bg-[#6d1230] text-white text-xs font-semibold uppercase tracking-wider shadow-md shadow-[#881337]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {status === 'submitting' ? (
                                        <span>Processing...</span>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send className="w-3.5 h-3.5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Subfooter */}
                <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
                    <div>
                        © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
                    </div>
                    <div>
                        Built with Laravel 12, Inertia.js, React & Tailwind CSS
                    </div>
                </div>

            </div>
        </footer>
    );
};
