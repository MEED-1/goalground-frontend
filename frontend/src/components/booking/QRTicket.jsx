import React from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '../ui/Button';
import { Download, Calendar, MapPin } from 'lucide-react';

export const QRTicket = ({ booking }) => {
  const { t } = useTranslation();
  const qrData = JSON.stringify({
    id: booking.id,
    terrain: booking.terrainName,
    date: booking.date,
    slot: booking.slot
  });

  const downloadQR = () => {
    const canvas = document.getElementById(`qr-${booking.id}`);
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `ticket-${booking.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="bg-[var(--color-card)] text-[var(--color-text)] p-6 rounded-xl border border-[var(--color-border)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-xl text-[var(--color-text)]">{booking.terrainName}</h3>
          <div className="text-sm text-[var(--color-text-muted)] space-y-1 mt-1">
            <p className="flex items-center gap-1"><Calendar size={14} /> {booking.date} • {booking.slot}</p>
            <p className="flex items-center gap-1"><MapPin size={14} /> {booking.city}</p>
          </div>
        </div>
        <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
          {t('booking.confirmed')}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <QRCodeCanvas
          id={`qr-${booking.id}`}
          value={qrData}
          size={150}
          level="H"
        />
        <Button size="sm" variant="outline" className="w-full" onClick={downloadQR}>
          <Download size={16} className="mr-2" /> {t('common.download')}
        </Button>
      </div>
    </div>
  );
};