import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Map, Calendar, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-3xl font-bold font-display text-[var(--color-text)]">{value}</h3>
    <p className="text-[var(--color-text-muted)] text-sm">{label}</p>
  </div>
);

export const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-8 text-[var(--color-text)]">{t('admin.dashboard_title')}</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Link to="/admin/users">
          <StatCard icon={Users} label={t('admin.total_users')} value="1,240" color="bg-blue-600" />
        </Link>
        <Link to="/admin/terrains">
          <StatCard icon={Map} label={t('admin.terrains')} value="85" color="bg-green-600" />
        </Link>
        <Link to="/admin/reservations">
          <StatCard icon={Calendar} label={t('admin.bookings')} value="3,402" color="bg-purple-600" />
        </Link>
        <Link to="/admin/transactions">
          <StatCard icon={Trophy} label={t('admin.matches')} value="920" color="bg-yellow-600" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
          <h3 className="font-bold text-xl mb-4 text-[var(--color-text)]">{t('admin.quick_actions')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link to="/admin/reports" className="flex items-center justify-between p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group">
              <span className="font-bold">{t('admin.reports')}</span>
              <div className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-black transition-colors">
                <Trophy size={14} />
              </div>
            </Link>
            <Link to="/admin/users" className="flex items-center justify-between p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group">
              <span className="font-bold">{t('admin.manage_users')}</span>
              <div className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-black transition-colors">
                <Users size={14} />
              </div>
            </Link>
            <Link to="/admin/terrains" className="flex items-center justify-between p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group">
              <span className="font-bold">{t('admin.manage_terrains', 'Manage Terrains')}</span>
              <div className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-black transition-colors">
                <Map size={14} />
              </div>
            </Link>
            <Link to="/admin/reservations" className="flex items-center justify-between p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group">
              <span className="font-bold">{t('admin.manage_reservations', 'Reservations')}</span>
              <div className="w-8 h-8 rounded-full bg-[var(--color-card)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-black transition-colors">
                <Calendar size={14} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};