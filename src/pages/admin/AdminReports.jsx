import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PDFExport } from '../../components/admin/PDFExport';

// Mock Data for Admin
const MOCK_PLAYERS = [
  {
    id: '1', name: 'Yassine Bounou', position: 'GK', city: 'Casablanca',
    stats: { matches: 45, rating: 4.9 },
    attributes: { speed: 6, technique: 7, physical: 9 }
  },
  {
    id: '2', name: 'Achraf Hakimi', position: 'DEF', city: 'Rabat',
    stats: { matches: 32, rating: 4.8 },
    attributes: { speed: 10, technique: 8, physical: 8 }
  },
  {
    id: '3', name: 'Hakim Ziyech', position: 'MID', city: 'Nador',
    stats: { matches: 28, rating: 4.7 },
    attributes: { speed: 7, technique: 10, physical: 6 }
  },
];

export const AdminReports = () => {
  const { t } = useTranslation();
  const [filterPos, setFilterPos] = useState('ALL');

  const filteredPlayers = filterPos === 'ALL'
    ? MOCK_PLAYERS
    : MOCK_PLAYERS.filter(p => p.position === filterPos);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-text)]">{t('admin.reports')}</h1>
          <p className="text-[var(--color-text-muted)]">{t('admin.reports_subtitle')}</p>
        </div>
        <PDFExport players={filteredPlayers} />
      </div>

      {/* Filters */}
      <div className="bg-[var(--color-card)] p-4 rounded-lg border border-[var(--color-border)] mb-8 flex gap-4">
        <div>
          <label className="block text-xs text-[var(--color-text-muted)] mb-1">{t('admin.filter_pos')}</label>
          <select
            value={filterPos}
            onChange={(e) => setFilterPos(e.target.value)}
            className="bg-[var(--color-background)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text)] min-w-[150px] focus:outline-none"
          >
            <option value="ALL" className="bg-[var(--color-card)]">{t('admin.all_positions')}</option>
            <option value="GK" className="bg-[var(--color-card)]">{t('roles.GK')}</option>
            <option value="DEF" className="bg-[var(--color-card)]">{t('roles.DEF')}</option>
            <option value="MID" className="bg-[var(--color-card)]">{t('roles.MID')}</option>
            <option value="ATT" className="bg-[var(--color-card)]">{t('roles.ATT')}</option>
          </select>
        </div>
      </div>

      {/* Preview Table */}
      <div className="bg-[var(--color-card)] rounded-lg border border-[var(--color-border)] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[var(--color-background)] text-[var(--color-text-muted)] text-xs uppercase border-b border-[var(--color-border)]">
            <tr>
              <th className="p-4">{t('common.name')}</th>
              <th className="p-4">{t('common.city')}</th>
              <th className="p-4">{t('common.position')}</th>
              <th className="p-4">{t('common.rating')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filteredPlayers.map((player) => (
              <tr key={player.id} className="hover:bg-[var(--color-background)] transition-colors">
                <td className="p-4 font-medium text-[var(--color-text)]">{player.name}</td>
                <td className="p-4 text-[var(--color-text-muted)]">{player.city}</td>
                <td className="p-4">
                  <span className={`
                    px-2 py-1 rounded text-xs font-bold
                    ${player.position === 'GK' ? 'bg-[var(--color-pos-gk)] text-black' :
                      player.position === 'DEF' ? 'bg-[var(--color-pos-def)] text-white' :
                        player.position === 'MID' ? 'bg-[var(--color-pos-mid)] text-black' : 'bg-[var(--color-pos-att)] text-white'}
                  `}>
                    {t(`roles.${player.position}`)}
                  </span>
                </td>
                <td className="p-4 text-[var(--color-primary)] font-bold">{player.stats.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};