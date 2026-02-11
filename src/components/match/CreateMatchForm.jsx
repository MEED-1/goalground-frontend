import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PositionSlots } from './PositionSlots';

export const CreateMatchForm = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    city: '',
    date: '',
    time: '',
    format: '5v5',
    level: 'Intermediate',
    positions: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('common.city')}
          value={formData.city}
          onChange={e => setFormData({ ...formData, city: e.target.value })}
          required
        />
        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">{t('matches.level')}</label>
          <select
            className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-md px-4 py-2 text-[var(--color-text)]"
            value={formData.level}
            onChange={e => setFormData({ ...formData, level: e.target.value })}
          >
            <option value="Casual">{t('matches.level_casual')}</option>
            <option value="Intermediate">{t('matches.level_intermediate')}</option>
            <option value="Advanced">{t('matches.level_advanced')}</option>
            <option value="Professional">{t('matches.level_pro')}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('common.date')}
          type="date"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <Input
          label={t('common.time')}
          type="time"
          value={formData.time}
          onChange={e => setFormData({ ...formData, time: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">{t('matches.positions_needed')}</label>
        <PositionSlots
          selected={formData.positions}
          onChange={pos => setFormData({ ...formData, positions: pos })}
        />
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading}>
        {t('matches.create_match')}
      </Button>
    </form>
  );
};