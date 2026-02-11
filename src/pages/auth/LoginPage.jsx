import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      let role = 'player';
      let name = 'Demo Player';

      if (formData.email === 'admin@goalground.ma') {
        role = 'admin';
        name = 'GG Admin';
      } else if (formData.email === 'owner@goalground.ma') {
        role = 'owner';
        name = 'Terrain Owner';
      }

      // Mock successful login
      login('fake-jwt-token', {
        id: role === 'admin' ? '99' : role === 'owner' ? '50' : '1',
        name,
        email: formData.email,
        role
      });
      toast.success(t('common.success'));
      setIsLoading(false);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'owner') {
        navigate('/owner/add-terrain');
      } else {
        navigate('/explore');
      }
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('common.login')}</h1>
          <p className="text-[var(--color-text-muted)]">{t('common.login_welcome')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('common.email')}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="player@goalground.ma (admin, owner...)"
          />
          <Input
            label={t('common.password')}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="••••••••"
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t('common.login')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          {t('common.no_account')}{' '}
          <Link to="/register" className="text-[var(--color-primary)] hover:underline">
            {t('common.register')}
          </Link>
        </p>
      </div>
    </div>
  );
};