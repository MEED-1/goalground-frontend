import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Settings, BarChart2, Trash2, Edit2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const MyTerrains = () => {
    const { t } = useTranslation();
    const [terrains, setTerrains] = useState([]);
    const [loading, setLoading] = useState(true);

    useDocumentTitle(t('nav.my_terrains'));

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            setTerrains([
                { id: 1, name: 'Oasis Sports Center', city: 'Casablanca', price: 450, bookings: 124, status: 'active' },
                { id: 2, name: 'Anfa Five-a-side', city: 'Casablanca', price: 500, bookings: 89, status: 'active' },
                { id: 3, name: 'Atlas Arena', city: 'Marrakech', price: 350, bookings: 45, status: 'inactive' },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) return <div className="p-12"><Spinner /></div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">{t('owner.my_terrains')}</h1>
                    <p className="text-[var(--color-text-muted)]">{t('owner.terrain_management')}</p>
                </div>
                <Link to="/owner/add-terrain">
                    <Button className="gap-2">
                        <Plus size={18} /> {t('nav.add_terrain')}
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {terrains.map(terrain => (
                    <div key={terrain.id} className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)] transition-all group">
                        <div className="h-40 bg-[var(--color-background)] relative flex items-center justify-center text-[var(--color-text-muted)]">
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <Badge
                                variant={terrain.status === 'active' ? 'ATT' : 'MID'}
                                className="absolute top-4 right-4"
                            >
                                {terrain.status.toUpperCase()}
                            </Badge>
                        </div>

                        <div className="p-5">
                            <h3 className="font-bold text-xl mb-1">{terrain.name}</h3>
                            <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1 mb-4">
                                <MapPin size={14} /> {terrain.city}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-[var(--color-border)]">
                                <div>
                                    <p className="text-xs text-[var(--color-text-muted)] uppercase">{t('common.price')}</p>
                                    <p className="font-bold">{terrain.price} {t('common.price_hour')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--color-text-muted)] uppercase">Bookings</p>
                                    <p className="font-bold">{terrain.bookings}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1 gap-1">
                                    <Edit2 size={14} /> {t('common.edit')}
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 gap-1">
                                    <BarChart2 size={14} /> Stats
                                </Button>
                                <Button variant="outline" size="sm" className="bg-red-500/10 hover:bg-red-500 hover:text-white border-red-500/20 text-red-500 p-2">
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {terrains.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-[var(--color-card)] rounded-2xl border-2 border-dashed border-[var(--color-border)]">
                        <p className="text-[var(--color-text-muted)] mb-4">No terrains listed yet.</p>
                        <Link to="/owner/add-terrain">
                            <Button variant="outline">{t('owner.add_terrain')}</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
