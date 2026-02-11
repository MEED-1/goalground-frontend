import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { SlotPicker } from '../../components/booking/SlotPicker';
import { Button } from '../../components/ui/Button';
import { ChevronLeft, CreditCard } from 'lucide-react';

export const BookingPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const terrainName = searchParams.get('name') || 'Unknown Terrain';
  const price = searchParams.get('price') || '0';

  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBooking = () => {
    if (!slot) return;
    setLoading(true);

    // Simulate Stripe processing
    setTimeout(() => {
      setLoading(false);
      // Navigate to success page with booking details
      navigate('/booking/success', {
        state: {
          terrainName,
          date: date.toISOString(),
          slot,
          price
        }
      });
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 pl-0 gap-2" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} /> Back
      </Button>

      <h1 className="text-3xl font-display font-bold mb-2">Book Your Session</h1>
      <p className="text-[var(--color-text-muted)] mb-8">Confirm your time slot at <span className="text-[var(--color-primary)]">{terrainName}</span></p>

      <div className="bg-[var(--color-card)] p-6 md:p-8 rounded-xl border border-[var(--color-border)] mb-8">
        <SlotPicker
          selectedDate={date}
          onDateSelect={setDate}
          selectedSlot={slot}
          onSlotSelect={setSlot}
        />
      </div>

      <div className="bg-[var(--color-card)] p-6 rounded-xl border border-[var(--color-border)]">
        <div className="flex justify-between items-center mb-6 border-b border-[var(--color-border)] pb-4">
          <div>
            <p className="text-sm text-[var(--color-text-muted)]">Total Price</p>
            <p className="text-2xl font-bold text-[var(--color-text)]">{price} MAD</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[var(--color-text-muted)]">Selected Time</p>
            <p className="font-bold text-[var(--color-primary)]">
              {format(date, 'MMM d')} • {slot || '--:--'}
            </p>
          </div>
        </div>

        <Button
          className="w-full gap-2"
          size="lg"
          disabled={!slot}
          isLoading={loading}
          onClick={handleBooking}
        >
          <CreditCard size={20} />
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
};