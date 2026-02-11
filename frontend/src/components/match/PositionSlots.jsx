import React from 'react';
import { Badge } from '../ui/Badge';

const POSITIONS = ['GK', 'DEF', 'MID', 'ATT'];

export const PositionSlots = ({ selected, onChange }) => {
  const togglePosition = (pos) => {
    if (selected.includes(pos)) {
      onChange(selected.filter(p => p !== pos));
    } else {
      onChange([...selected, pos]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {POSITIONS.map(pos => (
        <button
          key={pos}
          type="button"
          onClick={() => togglePosition(pos)}
          className={`px-4 py-2 rounded-md border transition-all ${selected.includes(pos)
              ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-black font-bold'
              : 'bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'
            }`}
        >
          {pos}
        </button>
      ))}
    </div>
  );
};