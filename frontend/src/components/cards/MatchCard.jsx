import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const MatchCard = ({ match }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [requested, setRequested] = useState(false);

  const handleToggleJoin = () => {
    if (!user) {
      toast.error(t('auth.login_required', 'Please login to join matches'));
      return;
    }

    if (requested) {
      setRequested(false);
      toast.success(t('matches.request_cancelled', 'Request withdrawn'));
    } else {
      setRequested(true);
      toast.success(t('matches.request_sent', 'Request sent to host!'));
    }
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-primary)] transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display font-bold text-xl uppercase mb-1 text-[var(--color-text)]">
            {match.city} <span className="text-[var(--color-primary)]">•</span> {match.format}
          </h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1"><Calendar size={14} /> {match.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {match.time}</span>
            </div>
            <span className="flex items-center gap-1 text-xs text-[var(--color-primary)] font-medium">
              <MapPin size={12} /> {match.venue || 'TBD Stadium'}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="bg-[var(--color-background)] border border-[var(--color-border)] px-2 py-1 rounded text-xs font-bold text-[var(--color-text-muted)]">
            {match.level}
          </div>
          <span className="text-sm font-bold text-[var(--color-text)] flex items-center gap-0.5">
            {match.price || 50} <span className="text-[10px] text-[var(--color-text-muted)]">MAD</span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {match.positionsNeeded.map((pos) => (
          <Badge key={pos} variant={pos}>{t(`roles.${pos}`)}</Badge>
        ))}
        {match.positionsNeeded.length === 0 && (
          <span className="text-sm text-[var(--color-text-muted)] italic">{t('matches.any_position')}</span>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-4">
        <span className="text-sm font-medium text-[var(--color-text)]">
          <span className="text-[var(--color-primary)] font-bold">{match.spotsLeft}</span> {t('matches.spots_left')}
        </span>
        {requested ? (
          <Button
            size="sm"
            variant="outline"
            onClick={handleToggleJoin}
            className="flex items-center gap-2 group transition-all duration-300 border-green-500/30 bg-green-500/5 text-green-500 hover:border-red-500 hover:bg-red-500 hover:text-white"
          >
            <div className="flex items-center gap-2 group-hover:hidden">
              <CheckCircle size={14} />
              <span>{t('common.requested', 'Requested')}</span>
            </div>
            <div className="hidden group-hover:flex items-center gap-2">
              <XCircle size={14} />
              <span>{t('common.cancel', 'Cancel')}</span>
            </div>
          </Button>
        ) : (
          <Button size="sm" onClick={handleToggleJoin} className="rounded-xl px-6">
            {t('matches.join_match')}
          </Button>
        )}
      </div>
    </div>
  );
};