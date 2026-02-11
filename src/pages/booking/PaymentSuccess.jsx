import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { format } from 'date-fns';
import { CheckCircle, Download, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const PaymentSuccess = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return <div className="p-10 text-center">{t('common.error')}</div>;
  }

  const bookingDate = new Date(state.date);
  const qrValue = JSON.stringify({
    id: 'booking-123456',
    terrain: state.terrainName,
    date: state.date,
    slot: state.slot
  });

  const downloadQR = () => {
    const canvas = document.getElementById('qr-ticket');
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `ticket-${state.terrainName}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full text-green-500 mb-6">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2 text-[var(--color-text)]">{t('booking.confirmed_title')}</h1>
        <p className="text-[var(--color-text-muted)]">{t('booking.confirmed_subtitle')}</p>
      </div>

      <div className="bg-[var(--color-card)] text-[var(--color-text)] rounded-2xl overflow-hidden shadow-xl mb-8 border border-[var(--color-border)] relative">
        {/* Ticket Header */}
        <div className="bg-[var(--color-primary)] p-6 text-center text-black">
          <h2 className="text-xl font-bold uppercase tracking-widest">{t('booking.ticket_header')}</h2>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-1">{state.terrainName}</h3>
            <div className="flex justify-center items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1"><Calendar size={14} /> {format(bookingDate, 'MMM d, yyyy')}</span>
              <span className="flex items-center gap-1">🕒 {state.slot}</span>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <QRCodeCanvas
              id="qr-ticket"
              value={qrValue}
              size={180}
              level={"H"}
              includeMargin={true}
            />
          </div>

          <div className="border-t border-dashed border-[var(--color-border)] pt-4 flex justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">{t('booking.booking_id')}</span>
            <span className="font-mono font-bold text-[var(--color-text)]">#GG-88291</span>
          </div>
        </div>

        {/* Decorative circles for ticket effect */}
        <div className="absolute top-[80px] -left-3 w-6 h-6 bg-[var(--color-background)] rounded-full"></div>
        <div className="absolute top-[80px] -right-3 w-6 h-6 bg-[var(--color-background)] rounded-full"></div>
      </div>

      <div className="flex flex-col gap-4">
        <Button onClick={downloadQR} className="w-full gap-2">
          <Download size={18} /> {t('booking.download_ticket')}
        </Button>
        <Link to="/explore">
          <Button variant="ghost" className="w-full">{t('booking.book_another')}</Button>
        </Link>
      </div>
    </div>
  );
};