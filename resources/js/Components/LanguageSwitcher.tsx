import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
    className?: string;
    compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', compact = false }) => {
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language?.startsWith('id') ? 'id' : 'en';

    const handleLanguageChange = (lang: 'id' | 'en') => {
        if (currentLang !== lang) {
            i18n.changeLanguage(lang);
        }
    };

    return (
        <div
            className={`inline-flex items-center p-1 rounded-full bg-gray-100/90 border border-gray-200/90 shadow-2xs backdrop-blur-sm transition-all ${className}`}
            role="region"
            aria-label={t('nav.switchLang')}
        >
            <div className="flex items-center pl-1.5 pr-1 text-gray-400 pointer-events-none" aria-hidden="true">
                <Globe className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            </div>

            <div className="flex items-center space-x-0.5">
                <button
                    type="button"
                    onClick={() => handleLanguageChange('id')}
                    className={`relative px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                        currentLang === 'id'
                            ? 'bg-[#881337] text-white shadow-xs'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                    aria-pressed={currentLang === 'id'}
                    aria-label="Bahasa Indonesia"
                >
                    ID
                </button>

                <button
                    type="button"
                    onClick={() => handleLanguageChange('en')}
                    className={`relative px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                        currentLang === 'en'
                            ? 'bg-[#881337] text-white shadow-xs'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                    aria-pressed={currentLang === 'en'}
                    aria-label="English"
                >
                    EN
                </button>
            </div>
        </div>
    );
};
