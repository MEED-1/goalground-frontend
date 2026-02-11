import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Star, Shield, Layout, Wifi, Car, Coffee } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const TerrainDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Mock data based on ID
  const terrain = {
    id: id,
    name: 'Oasis Sports Center',
    price: 300,
    city: 'Casablanca',
    address: '123 Route de Bouskoura, Casablanca',
    rating: 4.8,
    reviews: 124,
    format: '5v5',
    surface: 'Synthetic (FIFA Quality)',
    description: 'Premier football facility featuring top-quality synthetic turf, LED floodlights, and premium changing rooms. Perfect for competitive matches and casual games alike.',
    features: ['Parking', 'Showers', 'Cafe', 'WiFi'],
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1200',
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=1200'
    ]
  };

  const amenityMap = {
    'Parking': { icon: <Car size={18} />, label: t('explore.amenity_parking') },
    'WiFi': { icon: <Wifi size={18} />, label: t('explore.amenity_wifi') },
    'Cafe': { icon: <Coffee size={18} />, label: t('explore.amenity_cafe') },
    'Showers': { icon: <Shield size={18} />, label: t('explore.amenity_showers') }
  };

  return (
    <div className="pb-20">
      {/* Image Gallery */}
      <div className="h-[40vh] md:h-[50vh] relative">
        <img
          src={terrain.images[0]}
          alt={terrain.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[var(--color-primary)] text-black px-2 py-0.5 rounded text-sm font-bold uppercase">
                  {terrain.format}
                </span>
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">{terrain.rating}</span>
                  <span className="text-[var(--color-text-muted)]">({terrain.reviews} {t('explore.reviews')})</span>
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2 text-[var(--color-text)]">{terrain.name}</h1>
              <p className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <MapPin size={18} /> {terrain.address}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[var(--color-primary)]">
                {terrain.price} <span className="text-lg text-[var(--color-text)] font-normal">{t('common.price_hour')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid md:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="md:col-span-2 space-y-8">
          <section className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
            <h2 className="text-xl font-bold mb-4 font-display text-[var(--color-text)]">{t('explore.about')}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
              {terrain.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Layout className="text-[var(--color-primary)]" />
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">{t('explore.surface')}</p>
                  <p className="font-medium text-[var(--color-text)]">{terrain.surface}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-[var(--color-primary)]" />
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">{t('explore.filters_format')}</p>
                  <p className="font-medium text-[var(--color-text)]">{terrain.format}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
            <h2 className="text-xl font-bold mb-4 font-display text-[var(--color-text)]">{t('explore.amenities')}</h2>
            <div className="flex flex-wrap gap-4">
              {terrain.features.map(feature => (
                <div key={feature} className="flex items-center gap-2 bg-[var(--color-background)] border border-[var(--color-border)] px-4 py-2 rounded-full text-[var(--color-text)]">
                  {amenityMap[feature]?.icon || <Shield size={18} />}
                  {amenityMap[feature]?.label || feature}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Booking CTA */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)] shadow-lg">
            <h3 className="text-2xl font-bold font-display mb-4 text-[var(--color-text)]">{t('explore.ready_to_play')}</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-6">{t('explore.ready_to_play_sub')}</p>
            <Button
              className="w-full py-4 text-lg"
              onClick={() => navigate(`/booking/${id}?name=${encodeURIComponent(terrain.name)}&price=${terrain.price}`)}
            >
              {t('common.book_now')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};