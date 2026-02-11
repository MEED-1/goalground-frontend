import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';
import { Edit2, Zap, Activity, Layout, TrendingUp, Calendar, Users, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const PlayerProfile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  if (!user) return <div className="p-10">{t('auth.login_required')}</div>;

  // --- PLAYER VIEW DATA ---
  const playerStats = { matches: 42, goals: 18, motm: 5, rating: 4.7 };
  const attributes = [
    { name: t('player.attr_pace'), value: 85 },
    { name: t('player.attr_shooting'), value: 78 },
    { name: t('player.attr_passing'), value: 82 },
    { name: t('player.attr_dribbling'), value: 88 },
    { name: t('player.attr_defending'), value: 45 },
    { name: t('player.attr_physical'), value: 70 },
  ];

  // --- OWNER VIEW DATA ---
  const ownerStats = { terrains: 3, revenue: '12,450', bookings: 156 };
  const ownerTerrains = [
    { id: 1, name: 'Oasis Sports', bookings: 45, revenue: '4,500' },
    { id: 2, name: 'Anfa Pitch', bookings: 32, revenue: '3,200' },
  ];

  // --- ADMIN VIEW DATA ---
  const adminStats = { totalUsers: '1.2k', totalRevenue: '450k', activeMatches: 24 };

  const renderPlayerView = () => (
    <>
      <div className="flex gap-4 justify-center md:justify-start">
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-text)]">{playerStats.matches}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('common.matches')}</p>
        </div>
        <div className="w-px bg-[var(--color-border)]"></div>
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-primary)]">{playerStats.rating}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('common.rating')}</p>
        </div>
        <div className="w-px bg-[var(--color-border)]"></div>
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-text)]">{playerStats.goals}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('common.goals')}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
          <h3 className="text-xl font-bold mb-6 font-display flex items-center gap-2 text-[var(--color-text)]">
            <Zap className="text-[var(--color-primary)]" size={20} /> {t('player.attributes')}
          </h3>
          <div className="space-y-4">
            {attributes.map(attr => (
              <div key={attr.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[var(--color-text-muted)]">{attr.name}</span>
                  <span className="font-bold text-[var(--color-text)]">{attr.value}</span>
                </div>
                <div className="h-2 bg-[var(--color-background)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-[var(--color-primary)]" style={{ width: `${attr.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
          <h3 className="text-xl font-bold mb-6 font-display flex items-center gap-2 text-[var(--color-text)]">
            <Activity className="text-[var(--color-primary)]" size={20} /> {t('player.recent_matches')}
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg">
                <div>
                  <p className="font-bold text-sm text-[var(--color-text)]">Oasis Center 5v5</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Oct {20 - i}, 2023</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-green-400">WON 5-3</span>
                  <span className="bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)] text-xs px-2 py-0.5 rounded">7.5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderOwnerView = () => (
    <>
      <div className="flex gap-4 justify-center md:justify-start">
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-text)]">{ownerStats.terrains}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('nav.my_terrains')}</p>
        </div>
        <div className="w-px bg-[var(--color-border)]"></div>
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-primary)]">{ownerStats.revenue}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">MAD</p>
        </div>
        <div className="w-px bg-[var(--color-border)]"></div>
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-text)]">{ownerStats.bookings}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('nav.my_bookings')}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
          <h3 className="text-xl font-bold mb-6 font-display flex items-center gap-2 text-[var(--color-text)]">
            <Layout className="text-[var(--color-primary)]" size={20} /> {t('owner.terrain_management')}
          </h3>
          <div className="space-y-4">
            {ownerTerrains.map(terrain => (
              <div key={terrain.id} className="p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-[var(--color-text)]">{terrain.name}</p>
                  <Badge variant="ATT">{terrain.bookings} bookings</Badge>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">{terrain.revenue} MAD earned</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
          <h3 className="text-xl font-bold mb-6 font-display flex items-center gap-2 text-[var(--color-text)]">
            <Calendar className="text-[var(--color-primary)]" size={20} /> {t('owner.schedule')}
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg">
                <div>
                  <p className="font-bold text-sm text-[var(--color-text)]">Today • 18:00 - 19:00</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Booking #{1000 + i}</p>
                </div>
                <div className="text-green-400 font-bold text-sm">Confirmed</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderAdminView = () => (
    <>
      <div className="flex gap-4 justify-center md:justify-start">
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-text)]">{adminStats.totalUsers}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('admin.total_users')}</p>
        </div>
        <div className="w-px bg-[var(--color-border)]"></div>
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-primary)]">{adminStats.totalRevenue}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">MAD</p>
        </div>
        <div className="w-px bg-[var(--color-border)]"></div>
        <div className="text-center">
          <p className="text-xl font-bold text-[var(--color-text)]">{adminStats.activeMatches}</p>
          <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('nav.find_match')}</p>
        </div>
      </div>
      <div className="mt-8 bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
        <h3 className="text-xl font-bold mb-6 font-display flex items-center gap-2 text-[var(--color-text)]">
          <TrendingUp className="text-[var(--color-primary)]" size={20} /> {t('owner.stats_overview')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[var(--color-background)] rounded-lg text-center">
            <Users size={20} className="mx-auto mb-2 text-[var(--color-primary)]" />
            <p className="text-sm font-bold text-[var(--color-text)]">24 New Users</p>
            <p className="text-xs text-[var(--color-text-muted)]">In last 24h</p>
          </div>
          <div className="p-4 bg-[var(--color-background)] rounded-lg text-center">
            <Activity size={20} className="mx-auto mb-2 text-blue-400" />
            <p className="text-sm font-bold text-[var(--color-text)]">156 Matches</p>
            <p className="text-xs text-[var(--color-text-muted)]">Played this week</p>
          </div>
          <div className="p-4 bg-[var(--color-background)] rounded-lg text-center">
            <Shield size={20} className="mx-auto mb-2 text-green-400" />
            <p className="text-sm font-bold text-[var(--color-text)]">12 Verifications</p>
            <p className="text-xs text-[var(--color-text-muted)]">Pending approval</p>
          </div>
          <div className="p-4 bg-[var(--color-background)] rounded-lg text-center">
            <TrendingUp size={20} className="mx-auto mb-2 text-purple-400" />
            <p className="text-sm font-bold text-[var(--color-text)]">+12% Growth</p>
            <p className="text-xs text-[var(--color-text-muted)]">Week over week</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-[var(--color-card)] rounded-2xl p-6 border border-[var(--color-border)] mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[var(--color-card)] border-4 border-[var(--color-border)] flex items-center justify-center text-3xl font-bold text-[var(--color-primary)] z-10 uppercase">
          {user.name.charAt(0)}
        </div>

        <div className="text-center md:text-left flex-1 z-10">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <h1 className="text-3xl font-display font-bold text-[var(--color-text)]">{user.name}</h1>
            <Badge variant={user.role === 'player' ? 'ATT' : 'MID'}>{user.role.toUpperCase()}</Badge>
          </div>
          <p className="text-[var(--color-text-muted)] mb-4 flex items-center justify-center md:justify-start gap-2">
            {user.role === 'admin' ? t('admin.system_stats') : 'Casablanca, MA'}
          </p>

          {user.role === 'player' && renderPlayerView()}
          {user.role === 'owner' && renderOwnerView()}
          {user.role === 'admin' && renderAdminView()}
        </div>

        <Button variant="outline" size="sm" className="absolute top-6 right-6 gap-2 hidden md:flex">
          <Edit2 size={14} /> {t('common.edit')}
        </Button>
      </div>
    </div>
  );
};