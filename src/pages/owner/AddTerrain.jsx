import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const AddTerrain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    price: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call
    navigate('/owner/terrains');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-8">{t('owner.add_terrain')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
        <Input
          label={t('owner.terrain_name')}
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t('common.city')}
            value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <Input
            label={`${t('common.price')} (${t('common.mad_hour')})`}
            type="number"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <Input
          label={t('common.address')}
          value={formData.address}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
          required
        />

        <div className="border-t border-[var(--color-border)] pt-4">
          <Button type="submit" className="w-full">{t('owner.list_terrain')}</Button>
        </div>
      </form>
    </div>
  );
};