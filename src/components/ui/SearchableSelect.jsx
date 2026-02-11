import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SearchableSelect = ({
    options,
    value,
    onChange,
    placeholder,
    label,
    className = ""
}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Filter and sort options alphabetically
    const filteredOptions = options
        .filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => a.label.localeCompare(b.label));

    const selectedOption = options.find(opt => opt.value === value);

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
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">{label}</label>}

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 cursor-pointer hover:border-[var(--color-primary)] transition-all group"
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <Search size={18} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] shrink-0" />
                    <span className={`truncate ${!selectedOption ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text)] font-medium'}`}>
                        {selectedOption ? selectedOption.label : placeholder || t('common.search')}
                    </span>
                </div>
                <ChevronDown size={18} className={`text-[var(--color-text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col max-h-[300px]">
                    <div className="p-3 border-b border-[var(--color-border)]">
                        <input
                            autoFocus
                            type="text"
                            className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            placeholder={t('common.search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="overflow-y-auto no-scrollbar py-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange(opt.value);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[var(--color-background)] transition-colors text-left ${value === opt.value ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/5 font-bold' : 'text-[var(--color-text)]'
                                        }`}
                                >
                                    <span>{opt.label}</span>
                                    {value === opt.value && <Check size={16} />}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-[var(--color-text-muted)] text-center">
                                {t('explore.no_results')}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
