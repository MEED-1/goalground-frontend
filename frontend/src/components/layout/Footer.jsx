import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-[var(--color-border)] py-8 mt-auto md:mb-0 mb-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
            <span className="text-black font-bold font-display text-xs">GG</span>
          </div>
          <span className="text-xl font-bold font-display tracking-widest text-[var(--color-text)]">
            GOAL<span className="text-[var(--color-primary)]">GROUND</span>
          </span>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm">
          &copy; {new Date().getFullYear()} GoalGround. {t('common.rights')}
        </p>
      </div>
    </footer>
  );
};