import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TerrainMap } from '../../components/map/TerrainMap';
import { Button } from '../../components/ui/Button';
import { Filter } from 'lucide-react';
import { TerrainCard } from '../../components/cards/TerrainCard';

// Mock Data
const MOCK_TERRAINS = [
  { id: '1', name: 'Oasis Sports Center', lat: 33.5731, lng: -7.5898, price: 300, city: 'Casablanca', format: '5v5', rating: 4.8, image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500' },
  { id: '2', name: 'Rabat Futsal Arena', lat: 34.0209, lng: -6.8416, price: 250, city: 'Rabat', format: '7v7', rating: 4.5, image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500' },
  { id: '3', name: 'Marrakech Kickoff', lat: 31.6295, lng: -7.9811, price: 400, city: 'Marrakech', format: '5v5', rating: 4.9, image: 'https://images.unsplash.com/photo-1524012431247-53c4ca729550?w=500' },
];

export const ExploreTerrains = () => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">

        {/* Map Container - Full width on mobile, 60% on desktop */}
        <div className="w-full md:w-[60%] h-full relative z-0">
          <TerrainMap terrains={MOCK_TERRAINS} zoom={7} />

          {/* Mobile Toggle Button */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden z-[1000]">
            <Button onClick={() => setShowFilters(!showFilters)} className="shadow-lg">
              {showFilters ? t('explore.show_map') : t('explore.show_list')}
            </Button>
          </div>
        </div>

        {/* List Container - Hidden on mobile unless toggled, 40% on desktop */}
        <div className={`
          absolute inset-0 bg-[var(--color-background)] z-10 
          md:static md:w-[40%] md:border-l md:border-[var(--color-border)] md:flex md:flex-col
          ${showFilters ? 'flex flex-col' : 'hidden'}
        `}>
          {/* Filters Header */}
          <div className="p-4 border-b border-[var(--color-border)] flex gap-2 overflow-x-auto">
            <Button variant="secondary" size="sm" className="whitespace-nowrap rounded-full">{t('cities.casablanca')}</Button>
            <Button variant="secondary" size="sm" className="whitespace-nowrap rounded-full">{t('cities.rabat')}</Button>
            <Button variant="secondary" size="sm" className="whitespace-nowrap rounded-full">{t('explore.filters_format')}: 5v5</Button>
            <Button variant="secondary" size="sm" className="whitespace-nowrap rounded-full">{t('explore.filters_format')}: 7v7</Button>
            <button className="p-2 border border-[var(--color-border)] rounded-full hover:bg-[var(--color-card)] text-[var(--color-primary)]">
              <Filter size={16} />
            </button>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 md:pb-4">
            {MOCK_TERRAINS.map(terrain => (
              <TerrainCard key={terrain.id} terrain={terrain} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};