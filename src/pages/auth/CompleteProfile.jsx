import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const CompleteProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    position: 'MID',
    foot: 'Right',
    city: '',
    bio: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update profile
    navigate('/explore');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold mb-2">{t('auth.complete_profile_title')}</h1>
      <p className="text-[var(--color-text-muted)] mb-8">{t('auth.complete_profile_subtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">{t('auth.preferred_position')}</label>
          <div className="grid grid-cols-4 gap-2">
            {['GK', 'DEF', 'MID', 'ATT'].map(pos => (
              <button
                key={pos}
                type="button"
                className={`p-2 rounded border text-sm font-bold ${formData.position === pos
                  ? 'bg-[var(--color-primary)] text-black border-[var(--color-primary)]'
                  : 'bg-[var(--color-card)] border-[var(--color-border)]'
                  }`}
                onClick={() => setFormData({ ...formData, position: pos })}
              >
                {t(`roles.${pos}`)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">{t('auth.preferred_foot')}</label>
          <select
            className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-md px-4 py-2"
            value={formData.foot}
            onChange={e => setFormData({ ...formData, foot: e.target.value })}
          >
            <option value="Right">{t('auth.foot_right')}</option>
            <option value="Left">{t('auth.foot_left')}</option>
            <option value="Both">{t('auth.foot_both')}</option>
          </select>
        </div>

        <Input
          label={t('auth.city')}
          value={formData.city}
          onChange={e => setFormData({ ...formData, city: e.target.value })}
          required
        />

        <Button type="submit" className="w-full">{t('common.save_profile')}</Button>
      </form>
    </div>
  );
};