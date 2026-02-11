import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Green Marker
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const TerrainMap = ({
  terrains,
  center = [31.7917, -7.0926], // Center of Morocco
  zoom = 6
}) => {
  const { t } = useTranslation();

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-[var(--color-border)]">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        {terrains.map((terrain) => (
          <Marker
            key={terrain.id}
            position={[terrain.lat, terrain.lng]}
            icon={greenIcon}
          >
            <Popup className="custom-popup">
              <div className="p-1 min-w-[150px]">
                <h3 className="font-bold font-display text-lg mb-1 text-[var(--color-text)]">{terrain.name}</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-1">{terrain.city} • {terrain.format}</p>
                <p className="font-bold text-[var(--color-primary-hover)] mb-2">
                  {terrain.price} {t('common.price_hour')}
                </p>
                <Link
                  to={`/terrains/${terrain.id}`}
                  className="block w-full text-center bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] text-xs uppercase font-bold py-1 px-2 rounded hover:border-[var(--color-primary)] transition-colors"
                >
                  {t('common.view_details')}
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};