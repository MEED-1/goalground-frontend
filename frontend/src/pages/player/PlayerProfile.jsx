import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/ui/Badge';
import { Edit2, Zap, Activity, Layout, TrendingUp, Calendar, Users, Shield, MapPin, Phone, Save, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import toast from 'react-hot-toast';

export const PlayerProfile = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    city: user?.city || 'Casablanca',
    phone: user?.phone || '+212 600-000000',
    bio: user?.bio || 'Passionate football player looking for intense matches!',
    age: user?.age || 24,
    position: user?.position || 'MID',
  });

  useDocumentTitle(user?.name || 'Profile');

  if (!user) return <div className="p-10">{t('auth.login_required')}</div>;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast.success(t('common.success', 'Profile updated!'));
  };

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

      <div className="mt-6 p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)]">
        <h4 className="text-xs font-bold text-[var(--color-primary)] uppercase mb-2">Rated by Others</h4>
        <p className="text-sm text-[var(--color-text-muted)] italic">
          Your stats are generated based on feedback from players you've matched with.
        </p>
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
      <div className="bg-[var(--color-card)] rounded-3xl p-8 border border-[var(--color-border)] mb-10 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden group shadow-2xl shadow-black/20">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[var(--color-primary)]/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full -ml-16 -mb-16 blur-2xl"></div>

        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[var(--color-card)] to-[var(--color-background)] border-4 border-[var(--color-border)] flex items-center justify-center text-5xl font-black text-[var(--color-primary)] z-10 uppercase shrink-0 shadow-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <span className="relative z-10 italic drop-shadow-md">{formData.name.charAt(0)}</span>
        </div>

        <div className="text-center md:text-left flex-1 z-10 w-full">
          {isEditing ? (
            <div className="space-y-4 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('common.name')}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label={t('common.age', 'Age')}
                    type="number"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                  />
                  {user.role === 'player' && (
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">{t('common.position')}</label>
                      <select
                        className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-2.5 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
                        value={formData.position}
                        onChange={e => setFormData({ ...formData, position: e.target.value })}
                      >
                        {['GK', 'DEF', 'MID', 'ATT'].map(pos => (
                          <option key={pos} value={pos} className="bg-[var(--color-card)]">{t(`roles.${pos}`)}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('common.city')}
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                  label={t('auth.phone', 'Phone')}
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">{t('auth.bio')}</label>
                <textarea
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg p-3 text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none h-24"
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                ></textarea>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="gap-2 rounded-xl px-6"><Save size={16} /> {t('common.save')}</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="gap-2 rounded-xl px-6"><X size={16} /> {t('common.cancel', 'Cancel')}</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h1 className="text-4xl font-display font-black text-[var(--color-text)] uppercase italic tracking-tighter">{user.name}</h1>
                <Badge variant={user.role === 'player' ? 'ATT' : 'MID'} className="px-4 py-1 rounded-full text-sm font-black">
                  {user.role === 'player' ? formData.position : user.role.toUpperCase()}
                </Badge>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-[var(--color-text-muted)] mb-6 text-sm">
                <span className="flex items-center gap-1.5 bg-[var(--color-background)]/50 px-3 py-1 rounded-full border border-[var(--color-border)]">
                  <MapPin size={14} className="text-[var(--color-primary)]" /> {user.city || 'Casablanca'}
                </span>
                <span className="flex items-center gap-1.5 bg-[var(--color-background)]/50 px-3 py-1 rounded-full border border-[var(--color-border)]">
                  <Calendar size={14} className="text-[var(--color-primary)]" /> {formData.age || 24} {t('common.years', 'years')}
                </span>
                <span className="flex items-center gap-1.5 bg-[var(--color-background)]/50 px-3 py-1 rounded-full border border-[var(--color-border)]">
                  <Phone size={14} className="text-[var(--color-primary)]" /> {user.phone || '+212 600-000000'}
                </span>
              </div>
              <div className="relative group max-w-xl mx-auto md:mx-0">
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-[var(--color-primary)] rounded-full hidden md:block opacity-50"></div>
                <p className="text-[var(--color-text-muted)] mb-8 italic leading-relaxed text-sm md:text-base">
                  "{user.bio || 'No bio provided.'}"
                </p>
              </div>
            </>
          )}

          {!isEditing && (
            <div className="w-full mt-2">
              {user.role === 'player' && renderPlayerView()}
              {user.role === 'owner' && renderOwnerView()}
              {user.role === 'admin' && renderAdminView()}
            </div>
          )}
        </div>

        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 md:top-6 md:right-6 gap-2 rounded-xl border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-all font-bold"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 size={14} /> {t('common.edit')}
          </Button>
        )}
      </div>
    </div>
  );
};