import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TerrainMap } from '../../components/map/TerrainMap';
import { Button } from '../../components/ui/Button';
import { Filter, DollarSign, MapPin } from 'lucide-react';
import { TerrainCard } from '../../components/cards/TerrainCard';
import { SearchableSelect } from '../../components/ui/SearchableSelect';

// Mock Data
const MOCK_TERRAINS = [
  { id: '1', name: 'Oasis Sports Center', lat: 33.5731, lng: -7.5898, price: 300, city: 'Casablanca', format: '5v5', rating: 4.8, image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500' },
  { id: '2', name: 'Rabat Futsal Arena', lat: 34.0209, lng: -6.8416, price: 250, city: 'Rabat', format: '7v7', rating: 4.5, image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500' },
  { id: '3', name: 'Marrakech Kickoff', lat: 31.6295, lng: -7.9811, price: 400, city: 'Marrakech', format: '5v5', rating: 4.9, image: 'https://images.unsplash.com/photo-1524012431247-53c4ca729550?w=500' },
];

export const ExploreTerrains = () => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000);

  // Cities List for filters (Alphabetical for the dropdown)
  const CITY_KEYS = [
    'casablanca', 'rabat', 'marrakech', 'tanger', 'agadir', 'fes',
    'meknes', 'sale', 'oujda', 'kenitra', 'tetouan', 'safi',
    'mohammedia', 'khouribga', 'el_jadida', 'beni_mellal', 'nador', 'settat'
  ];

  const CITY_OPTIONS = [
    { value: 'all', label: t('common.all_cities') },
    ...CITY_KEYS.map(key => ({
      value: key,
      label: t(`cities.${key}`)
    })).sort((a, b) => a.label.localeCompare(b.label))
  ];

  // Formats List for filters
  const FORMATS = ['5v5', '7v7', '11v11'];

  // Filter Logic
  const filteredTerrains = MOCK_TERRAINS.filter(terrain => {
    const terrainCity = terrain.city.toLowerCase();
    const cityMatch = selectedCity === 'all' ||
      terrainCity === selectedCity ||
      terrainCity === t(`cities.${selectedCity}`).toLowerCase();

    const formatMatch = selectedFormat === 'all' || terrain.format === selectedFormat;
    const priceMatch = terrain.price <= maxPrice;

    return cityMatch && formatMatch && priceMatch;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">

        {/* Map Container - 40% height on mobile, 60% width on desktop */}
        <div className="w-full h-[40%] md:h-full md:w-[60%] relative z-0 shrink-0">
          <TerrainMap terrains={filteredTerrains} zoom={7} />

          {/* Mobile List Toggle - Optional, can keep for explicit switch or just show both */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden z-[1000]">
            <Button
              size="sm"
              onClick={() => {
                const listElem = document.getElementById('terrain-list');
                listElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="shadow-lg rounded-full"
            >
              {t('explore.show_list')}
            </Button>
          </div>
        </div>

        {/* List Container - Below map on mobile, 40% width on desktop */}
        <div id="terrain-list" className="flex flex-col flex-1 bg-[var(--color-background)] border-t md:border-t-0 md:border-l border-[var(--color-border)] overflow-hidden">
          {/* Filters Header */}
          <div className="p-4 border-b border-[var(--color-border)] space-y-4">
            <div className="flex flex-col gap-4">
              <SearchableSelect
                options={CITY_OPTIONS}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder={t('common.all_cities')}
                className="w-full"
              />

              <div className="flex items-center gap-4 bg-[var(--color-card)] p-3 rounded-xl border border-[var(--color-border)]">
                <DollarSign size={18} className="text-[var(--color-primary)] shrink-0" />
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-[var(--color-text-muted)]">Max Price</span>
                    <span className="text-[var(--color-primary)]">{maxPrice} MAD</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-[var(--color-primary)] cursor-pointer h-1.5 rounded-lg bg-[var(--color-background)] appearance-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar items-center">
              <Button
                variant={selectedFormat === 'all' ? 'primary' : 'secondary'}
                size="sm"
                className="whitespace-nowrap rounded-full px-4 text-xs font-bold"
                onClick={() => setSelectedFormat('all')}
              >
                {t('common.all_formats', 'All Formats')}
              </Button>
              {FORMATS.map(format => (
                <Button
                  key={format}
                  variant={selectedFormat === format ? 'primary' : 'secondary'}
                  size="sm"
                  className="whitespace-nowrap rounded-full px-4 text-xs font-bold"
                  onClick={() => setSelectedFormat(format)}
                >
                  {format}
                </Button>
              ))}
              <div className="flex-grow"></div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 border border-[var(--color-border)] rounded-full transition-all hover:bg-[var(--color-card)] ${showFilters ? 'bg-[var(--color-primary)] text-black border-[var(--color-primary)]' : 'text-[var(--color-primary)]'}`}
              >
                <Filter size={16} />
              </button>
            </div>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 md:pb-4">
            {filteredTerrains.length > 0 ? (
              filteredTerrains.map(terrain => (
                <TerrainCard key={terrain.id} terrain={terrain} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-[var(--color-text-muted)]">{t('explore.no_results', 'No terrains found matching your criteria.')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};