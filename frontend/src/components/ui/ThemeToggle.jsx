import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-primary)] hover:scale-110 transition-all duration-300 focus:outline-none"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon size={18} className="animate-in fade-in zoom-in duration-300" />
            ) : (
                <Sun size={18} className="animate-in fade-in zoom-in duration-300" />
            )}
        </button>
    );
};
