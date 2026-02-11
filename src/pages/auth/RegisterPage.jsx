import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error(t('common.passwords_dont_match'));
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      login('fake-jwt-token', {
        id: '1',
        name: formData.name,
        email: formData.email,
        role: 'player'
      });
      toast.success(t('common.account_created'));
      setIsLoading(false);
      navigate('/explore');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[var(--color-card)] p-8 rounded-2xl border border-[var(--color-border)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('common.register')}</h1>
          <p className="text-[var(--color-text-muted)]">{t('home.hero_subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('common.full_name')}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Yassine Bounou"
          />
          <Input
            label={t('common.email')}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="player@goalground.ma"
          />
          <Input
            label={t('common.password')}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="••••••••"
          />
          <Input
            label={t('common.confirm_password')}
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            placeholder="••••••••"
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t('common.register')}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          {t('common.already_account')}{' '}
          <Link to="/login" className="text-[var(--color-primary)] hover:underline">
            {t('common.login')}
          </Link>
        </p>
      </div>
    </div>
  );
};