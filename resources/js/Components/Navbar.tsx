import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
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
        { label: 'Profile', href: '#profile' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Certificates & Awards', href: '#certificates' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' },
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
                >
                    <div className="w-9 h-9 rounded-lg bg-[#881337] flex items-center justify-center text-white shadow-md shadow-[#881337]/20 group-hover:scale-105 transition-transform">
                        <Code2 className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight group-hover:text-[#881337] transition-colors">
                        tasya<span className="text-[#881337] font-normal">.dev</span>
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-7">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleClick(e, item.href)}
                            className="text-sm font-medium text-gray-600 hover:text-[#881337] transition-colors relative py-1"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop Right Actions: Contact CTA */}
                <div className="hidden sm:flex items-center space-x-4">
                    <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
                    >
                        GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                        href="#contact"
                        onClick={(e) => handleClick(e, '#contact')}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#881337] hover:bg-[#6d1230] rounded-md shadow-sm shadow-[#881337]/30 transition-all hover:shadow-[#881337]/50"
                    >
                        Get In Touch
                    </a>
                </div>

                {/* Mobile Right Bar */}
                <div className="flex lg:hidden items-center space-x-2">
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
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                className="text-base font-medium text-gray-800 hover:text-[#881337] transition-colors py-1.5"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2.5">
                            <a
                                href={PERSONAL_INFO.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-gray-600 flex items-center justify-between"
                            >
                                GitHub Profile <ArrowUpRight className="w-4 h-4" />
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => handleClick(e, '#contact')}
                                className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#881337] rounded-md shadow-md"
                            >
                                Let's Connect
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
