import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { Download } from 'lucide-react';

export const PDFExport = ({ players }) => {
  const printRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    setLoading(true);

    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff', // PDF should be white paper style
      });
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`goalground_report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleDownloadPdf} isLoading={loading} variant="outline" className="gap-2">
          <Download size={18} />
          {t('admin.generate_pdf')}
        </Button>
      </div>

      {/* Hidden container for PDF generation */}
      <div className="absolute left-[-9999px] top-0">
        <div ref={printRef} className="w-[210mm] min-h-[297mm] bg-white p-10 text-black font-sans">
          {/* Header */}
          <div className="border-b-4 border-[#00FF87] pb-6 mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold uppercase tracking-wider text-black">GoalGround</h1>
              <p className="text-gray-500 text-sm mt-1">{t('admin.pdf_scouting_report')}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{new Date().toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">{t('admin.total_players')}: {players.length}</p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-6">
            {players.map((player) => (
              <div key={player.id} className="border border-gray-200 rounded p-4 bg-gray-50 break-inside-avoid">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{player.name}</h3>
                    <p className="text-sm text-gray-600">{player.city}</p>
                  </div>
                  <span className={`
                    px-2 py-1 rounded text-xs font-bold text-white
                    ${player.position === 'GK' ? 'bg-yellow-500' :
                      player.position === 'DEF' ? 'bg-blue-600' :
                        player.position === 'MID' ? 'bg-green-600' : 'bg-red-600'}
                  `}>
                    {t(`roles.${player.position}`)}
                  </span>
                </div>

                <div className="flex justify-between text-sm mb-3 border-b pb-2">
                  <span>{t('admin.matches')}: <strong>{player.stats.matches}</strong></span>
                  <span>{t('common.rating')}: <strong>{player.stats.rating}/5</strong></span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <span className="w-16">{t('admin.attr_speed')}</span>
                    <div className="flex-1 bg-gray-300 h-2 rounded overflow-hidden">
                      <div className="bg-black h-full" style={{ width: `${player.attributes.speed * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-16">{t('admin.attr_tech')}</span>
                    <div className="flex-1 bg-gray-300 h-2 rounded overflow-hidden">
                      <div className="bg-black h-full" style={{ width: `${player.attributes.technique * 10}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs">
                    <span className="w-16">{t('admin.attr_physical')}</span>
                    <div className="flex-1 bg-gray-300 h-2 rounded overflow-hidden">
                      <div className="bg-black h-full" style={{ width: `${player.attributes.physical * 10}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-xs text-gray-400 border-t pt-4">
            {t('admin.pdf_footer')}
          </div>
        </div>
      </div>
    </div>
  );
};