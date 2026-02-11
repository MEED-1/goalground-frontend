import React from 'react';
import { useTranslation } from 'react-i18next';
import { MatchCard } from '../../components/cards/MatchCard';
import { Button } from '../../components/ui/Button';
import { Filter } from 'lucide-react';

const MOCK_MATCHES = [
  {
    id: '1', city: 'Casablanca', date: 'Oct 24', time: '20:00',
    format: '5v5', level: 'Intermediate', spotsLeft: 1,
    positionsNeeded: ['GK']
  },
  {
    id: '2', city: 'Rabat', date: 'Oct 25', time: '18:00',
    format: '7v7', level: 'Advanced', spotsLeft: 3,
    positionsNeeded: ['DEF', 'MID']
  },
  {
    id: '3', city: 'Marrakech', date: 'Oct 26', time: '21:00',
    format: '5v5', level: 'Casual', spotsLeft: 2,
    positionsNeeded: ['ATT']
  },
];

export const FindMatch = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-text)]">{t('matches.title')}</h1>
          <p className="text-[var(--color-text-muted)]">{t('matches.subtitle')}</p>
        </div>

        <div className="flex gap-3">
          <select className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none">
            <option className="bg-[var(--color-card)]">{t('common.all_cities')}</option>
            <option className="bg-[var(--color-card)]">{t('cities.casablanca')}</option>
            <option className="bg-[var(--color-card)]">{t('cities.rabat')}</option>
          </select>
          <Button variant="secondary" className="gap-2">
            <Filter size={16} /> {t('common.filters')}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MATCHES.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};