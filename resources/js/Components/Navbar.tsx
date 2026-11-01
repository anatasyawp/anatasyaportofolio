import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 25);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: t('nav.profile'), href: '#profile' },
        { label: t('nav.experience'), href: '#experience' },
        { label: t('nav.projects'), href: '#projects' },
        { label: t('nav.certificates'), href: '#certificates' },
        { label: t('nav.skills'), href: '#skills' },
        { label: t('nav.contact'), href: '#contact' },
    ];

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 py-3.5 shadow-sm'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Brand / Logo */}
                <a
                    href="#top"
                    onClick={(e) => handleClick(e, '#top')}
                    className="group flex items-center space-x-2.5 font-medium tracking-tight text-gray-900"
                    aria-label="hianatasya home"
                >
                    {/* Website Logo Mark */}
                    <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-[#881337]/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#881337]/35 ring-1 ring-white/30 shrink-0">
                        <img
                            src="./images/logo.svg"
                            onError={(e) => {
                                const t = e.currentTarget;
                                if (t.dataset.retried) return;
                                t.dataset.retried = 'true';
                                if (t.src.indexOf('anatasyaportofolio') === -1) {
                                    t.src = '/anatasyaportofolio/public/images/logo.svg';
                                }
                            }}
                            alt="Anatasya Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Brand Wordmark: hianatasya */}
                    <span className="text-lg tracking-tight select-none flex items-baseline">
                        <span className="font-normal text-gray-400 group-hover:text-gray-600 transition-colors">hi</span>
                        <span className="font-extrabold text-gray-900 group-hover:text-[#881337] transition-colors">anatasya</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#881337] ml-0.5 inline-block group-hover:scale-125 transition-transform" />
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-7">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleClick(e, item.href)}
                            className="text-sm font-medium text-gray-600 hover:text-[#881337] transition-colors relative py-1"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop Right Actions: Language Switcher + GitHub + Contact CTA */}
                <div className="hidden sm:flex items-center space-x-3.5">
                    <LanguageSwitcher />

                    <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
                    >
                        {t('nav.github')} <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                        href="#contact"
                        onClick={(e) => handleClick(e, '#contact')}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#881337] hover:bg-[#6d1230] rounded-md shadow-sm shadow-[#881337]/30 transition-all hover:shadow-[#881337]/50"
                    >
                        {t('nav.getInTouch')}
                    </a>
                </div>

                {/* Mobile Right Bar */}
                <div className="flex lg:hidden items-center space-x-2">
                    <LanguageSwitcher compact />
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 text-gray-700 hover:text-[#881337] focus:outline-none"
                        aria-label="Toggle Navigation"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileOpen && (
                <div className="lg:hidden bg-white/98 border-b border-gray-200 px-6 py-6 backdrop-blur-xl animate-in fade-in duration-200 shadow-lg">
                    <div className="flex flex-col space-y-3.5">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                className="text-base font-medium text-gray-800 hover:text-[#881337] transition-colors py-1.5"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                            <div className="flex items-center justify-between py-1">
                                <span className="text-xs font-mono font-medium text-gray-500 uppercase tracking-wider">{t('nav.switchLang')}</span>
                                <LanguageSwitcher />
                            </div>
                            <a
                                href={PERSONAL_INFO.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-gray-600 flex items-center justify-between"
                            >
                                {t('nav.githubProfile')} <ArrowUpRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleClick(e, '#contact')}
                                className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#881337] rounded-md shadow-md"
                            >
                                {t('nav.getInTouch')}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
