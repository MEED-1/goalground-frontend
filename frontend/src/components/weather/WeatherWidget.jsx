import React from 'react';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';

export const WeatherWidget = ({ city, weather }) => {
  // Mock display if no data
  if (!weather) return (
    <div className="bg-[var(--color-card)] rounded-xl p-4 flex items-center justify-between border border-[var(--color-border)]">
      <div className="flex items-center gap-3">
        <Sun className="text-yellow-400" size={24} />
        <div>
          <p className="font-bold text-lg text-[var(--color-text)]">24°C</p>
          <p className="text-xs text-[var(--color-text-muted)]">Clear Sky</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <Wind size={14} /> 12 km/h
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--color-card)] rounded-xl p-4 flex items-center justify-between border border-[var(--color-border)]">
      {/* Implementation with real data would go here */}
    </div>
  );
};