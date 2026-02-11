import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Trophy, User, PlusCircle, Layout, FileText, ClipboardList, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

export const MobileNav = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const role = user?.role || 'player';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-card)] border-t border-[var(--color-border)] pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {role === 'player' && (
          <>
            <NavLink to="/" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <Home size={20} />
              <span className="text-[10px] mt-1">{t('nav.home')}</span>
            </NavLink>

            <NavLink to="/explore" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <Map size={20} />
              <span className="text-[10px] mt-1">{t('nav.explore')}</span>
            </NavLink>

            <NavLink to="/matches" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <Trophy size={20} />
              <span className="text-[10px] mt-1">{t('nav.find_match')}</span>
            </NavLink>

            <NavLink to="/players" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <Users size={20} />
              <span className="text-[10px] mt-1">Players</span>
            </NavLink>
          </>
        )}

        {role === 'owner' && (
          <>
            <NavLink to="/owner/terrains" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <Layout size={20} />
              <span className="text-[10px] mt-1">{t('nav.my_terrains')}</span>
            </NavLink>

            <NavLink to="/owner/add-terrain" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <PlusCircle size={20} />
              <span className="text-[10px] mt-1">{t('nav.add_terrain')}</span>
            </NavLink>

            <NavLink to="/my-bookings" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <ClipboardList size={20} />
              <span className="text-[10px] mt-1">{t('nav.my_bookings')}</span>
            </NavLink>
          </>
        )}

        {role === 'admin' && (
          <>
            <NavLink to="/admin" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <Layout size={20} />
              <span className="text-[10px] mt-1">{t('nav.dashboard')}</span>
            </NavLink>

            <NavLink to="/admin/reports" className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
            }>
              <FileText size={20} />
              <span className="text-[10px] mt-1">{t('nav.admin_reports')}</span>
            </NavLink>
          </>
        )}

        <NavLink to="/profile" className={({ isActive }) =>
          `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`
        }>
          <User size={20} />
          <span className="text-[10px] mt-1">{t('nav.profile')}</span>
        </NavLink>
      </div>
    </div>
  );
};