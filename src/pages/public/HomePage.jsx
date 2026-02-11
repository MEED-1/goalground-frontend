import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop"
            alt="Football Pitch"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/50 via-[var(--color-background)]/80 to-[var(--color-background)]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display text-[var(--color-text)]">
            {t('home.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] mb-10 font-light">
            {t('home.hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xl mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            </div>
            <Link to="/explore">
              <Button size="lg" className="rounded-full w-full sm:w-auto min-w-[150px]">
                {t('common.search')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('home.feature1_title')}</h3>
              <p className="text-[var(--color-text-muted)]">
                {t('home.feature1_desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('home.feature2_title')}</h3>
              <p className="text-[var(--color-text-muted)]">
                {t('home.feature2_desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group">
              <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                <Calendar size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('home.feature3_title')}</h3>
              <p className="text-[var(--color-text-muted)]">
                {t('home.feature3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-display font-bold mb-6">{t('home.cta_title')}</h2>
          <Link to="/explore">
            <Button size="lg" variant="primary">{t('home.cta_button')}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};