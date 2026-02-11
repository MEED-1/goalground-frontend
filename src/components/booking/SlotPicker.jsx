import React from 'react';
import { useTranslation } from 'react-i18next';
import { format, addDays, isSameDay } from 'date-fns';
import { Button } from '../ui/Button';

export const SlotPicker = ({
  selectedDate,
  onDateSelect,
  selectedSlot,
  onSlotSelect
}) => {
  const { t } = useTranslation();
  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  // Mock time slots
  const timeSlots = [
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-3 font-display">{t('booking.select_date')}</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`
                  flex flex-col items-center justify-center min-w-[70px] p-3 rounded-lg border transition-all
                  ${isSelected
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-black'
                    : 'bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]'}
                `}
              >
                <span className="text-xs font-bold uppercase">{format(date, 'EEE')}</span>
                <span className="text-xl font-bold">{format(date, 'd')}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-3 font-display">{t('booking.select_time')}</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <Button
              key={slot}
              variant={selectedSlot === slot ? 'primary' : 'secondary'}
              onClick={() => onSlotSelect(slot)}
              className="w-full"
            >
              {slot}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};