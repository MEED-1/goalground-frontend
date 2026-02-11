import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import toast from 'react-hot-toast';

export const AddTerrain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: 'Casablanca',
    price: '',
    address: '',
    description: '',
    surface: 'Artificial Grass',
    amenities: [],
    capacity: '5v5'
  });

  useDocumentTitle(t('owner.add_terrain'));

  const amenitiesList = [
    { id: 'parking', label: t('explore.amenity_parking') },
    { id: 'showers', label: t('explore.amenity_showers') },
    { id: 'wifi', label: t('explore.amenity_wifi') },
    { id: 'cafe', label: t('explore.amenity_cafe') },
  ];

  const handleAmenityToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t('common.success', 'Terrain submitted for review!'));
    navigate('/owner/terrains');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">{t('owner.add_terrain')}</h1>
        <p className="text-[var(--color-text-muted)]">List your stadium on GoalGround and start receiving bookings.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)] space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">Basic Information</h2>
          <Input
            label={t('owner.terrain_name')}
            placeholder="e.g. Oasis Sports Center"
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
              label={`${t('common.price')} (${t('common.price_hour')})`}
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <Input
            label={t('common.address', 'Address')}
            placeholder="e.g. 123 Street Name"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>

        <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)] space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">Details & Amenities</h2>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Description</label>
            <textarea
              className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none h-32"
              placeholder="Tell players about your stadium..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Surface Type</label>
              <select
                className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-2.5 text-[var(--color-text)] focus:outline-none"
                value={formData.surface}
                onChange={e => setFormData({ ...formData, surface: e.target.value })}
              >
                <option>Artificial Grass</option>
                <option>Grass</option>
                <option>Clay</option>
                <option>Indoor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Capacity</label>
              <select
                className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-2.5 text-[var(--color-text)] focus:outline-none"
                value={formData.capacity}
                onChange={e => setFormData({ ...formData, capacity: e.target.value })}
              >
                <option>5v5</option>
                <option>7v7</option>
                <option>9v9</option>
                <option>11v11</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-3">Amenities</label>
            <div className="flex flex-wrap gap-3">
              {amenitiesList.map(amenity => (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => handleAmenityToggle(amenity.id)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${formData.amenities.includes(amenity.id)
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-black font-bold'
                      : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
                    }`}
                >
                  {amenity.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1 py-4 text-lg">{t('owner.list_terrain')}</Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>{t('common.cancel', 'Cancel')}</Button>
        </div>
      </form>
    </div>
  );
};