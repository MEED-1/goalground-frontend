import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/Badge';
import { Star } from 'lucide-react';

export const PlayerCard = ({ player }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-4 flex items-center gap-4 hover:border-[var(--color-primary)] transition-all">
      <div className="w-16 h-16 bg-[var(--color-background)] border border-[var(--color-border)] rounded-full flex items-center justify-center text-xl font-bold text-[var(--color-primary)] overflow-hidden">
        {player.avatar ? <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" /> : player.name.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-[var(--color-text)]">{player.name}</h3>
            <p className="text-[var(--color-text-muted)] text-sm">{player.age} • {player.city}</p>
          </div>
          <Badge variant={player.position}>{t(`roles.${player.position}`)}</Badge>
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="font-bold">{player.rating}</span>
          </div>
          <span className="text-[var(--color-text-muted)]">{player.matches} {t('common.matches')}</span>
          <span className="text-[var(--color-text-muted)]">{player.goals} {t('common.goals')}</span>
        </div>
      </div>
    </div>
  );
};