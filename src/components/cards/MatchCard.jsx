import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const MatchCard = ({ match }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-primary)] transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display font-bold text-xl uppercase mb-1 text-[var(--color-text)]">
            {match.city} <span className="text-[var(--color-primary)]">•</span> {match.format}
          </h3>
          <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1"><Calendar size={14} /> {match.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {match.time}</span>
          </div>
        </div>
        <div className="bg-[var(--color-background)] border border-[var(--color-border)] px-2 py-1 rounded text-xs font-bold text-[var(--color-text-muted)]">
          {match.level}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {match.positionsNeeded.map((pos) => (
          <Badge key={pos} variant={pos}>{t(`roles.${pos}`)}</Badge>
        ))}
        {match.positionsNeeded.length === 0 && (
          <span className="text-sm text-[var(--color-text-muted)] italic">{t('matches.any_position')}</span>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-4">
        <span className="text-sm font-medium text-[var(--color-text)]">
          <span className="text-[var(--color-primary)] font-bold">{match.spotsLeft}</span> {t('matches.spots_left')}
        </span>
        <Button size="sm">{t('matches.join_match')}</Button>
      </div>
    </div>
  );
};