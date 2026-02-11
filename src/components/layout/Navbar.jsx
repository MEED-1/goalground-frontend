import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Globe, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { changeLanguage, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <nav className="border-b border-[var(--color-border)] bg-[var(--color-background)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                <span className="text-black font-bold font-display">GG</span>
              </div>
              <span className="text-2xl font-bold font-display tracking-widest text-[var(--color-text)]">
                GOAL<span className="text-[var(--color-primary)]">GROUND</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {(!user || user.role === 'player') && (
              <>
                <Link to="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {t('nav.home')}
                </Link>
                <Link to="/explore" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {t('nav.explore')}
                </Link>
                <Link to="/matches" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {t('nav.find_match')}
                </Link>
              </>
            )}

            {user?.role === 'owner' && (
              <>
                <Link to="/owner/terrains" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {t('nav.my_terrains')}
                </Link>
                <Link to="/owner/add-terrain" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {t('nav.add_terrain')}
                </Link>
                <Link to="/profile" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {t('nav.my_bookings')}
                </Link>
              </>
            )}

            {user?.role === 'admin' && (
              <>
                <Link to="/admin" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {t('nav.dashboard')}
                </Link>
                <Link to="/admin/reports" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {t('nav.admin_reports')}
                </Link>
              </>
            )}

            {/* Language Switcher and Theme Toggle */}
            <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-4">
              <ThemeToggle />
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent text-sm text-[var(--color-text)] focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-[var(--color-card)]">EN</option>
                <option value="fr" className="bg-[var(--color-card)]">FR</option>
                <option value="ar" className="bg-[var(--color-card)]">AR</option>
              </select>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile">
                  <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)]">
                      <UserIcon size={16} />
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">{t('common.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">{t('common.register')}</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-[var(--color-text)] hover:text-[var(--color-primary)]">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};