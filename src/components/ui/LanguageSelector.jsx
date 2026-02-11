import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const LanguageSelector = () => {
    const { language, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', label: 'English', short: 'EN' },
        { code: 'fr', label: 'Français', short: 'FR' },
        { code: 'ar', label: 'العربية', short: 'AR' },
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--color-card)] border border-transparent hover:border-[var(--color-border)] transition-all text-sm font-bold text-[var(--color-text)]"
            >
                <Globe size={16} className="text-[var(--color-primary)]" />
                <span className="uppercase">{currentLang.short}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    changeLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[var(--color-background)] transition-colors ${language === lang.code ? 'text-[var(--color-primary)] font-bold' : 'text-[var(--color-text)]'
                                    }`}
                            >
                                <span>{lang.label}</span>
                                {language === lang.code && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
