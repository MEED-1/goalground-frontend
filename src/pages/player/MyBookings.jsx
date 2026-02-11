import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRTicket } from '../../components/booking/QRTicket';
import { Spinner } from '../../components/ui/Spinner';
import { getMyReservations } from '../../api/reservation.api';

export const MyBookings = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    setTimeout(() => {
      setBookings([
        { id: '1', terrainName: 'Oasis Sports Center', date: '2023-11-20', slot: '18:00', city: 'Casablanca' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="p-12"><Spinner /></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-8">{t('booking.my_bookings')}</h1>
      <div className="space-y-6">
        {bookings.map(booking => (
          <QRTicket key={booking.id} booking={booking} />
        ))}
        {bookings.length === 0 && <p className="text-[var(--color-text-muted)]">{t('booking.no_bookings')}</p>}
      </div>
    </div>
  );
};