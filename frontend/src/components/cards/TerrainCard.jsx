import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { Button } from '../ui/Button';

export const TerrainCard = ({ terrain }) => {
  const { t } = useTranslation();

  return (
    <Link to={`/terrains/${terrain.id}`} className="block group">
      <div className="bg-[var(--color-card)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all">
        <div className="h-40 overflow-hidden relative">
          <img
            src={terrain.image}
            alt={terrain.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-[var(--color-background)]/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-[var(--color-text)] border border-[var(--color-border)] uppercase">
            {terrain.format}
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-display font-bold text-[var(--color-text)]">{terrain.name}</h3>
            <div className="flex items-center gap-1 text-[var(--color-primary)]">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-bold">{terrain.rating}</span>
            </div>
          </div>
          <p className="text-[var(--color-text-muted)] text-sm mb-4">{terrain.city}</p>
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text)] font-bold">{terrain.price} <span className="text-xs font-normal text-[var(--color-text-muted)]">{t('common.price_hour')}</span></span>
            <Button size="sm" variant="outline">{t('explore.book')}</Button>
          </div>
        </div>
      </div>
    </Link>
  );
};