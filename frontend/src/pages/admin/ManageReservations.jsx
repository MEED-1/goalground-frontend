import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, Clock, User, Hash, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';

const MOCK_RESERVATIONS = [
    { id: 'GG-1024', player: 'Yassine En-Nesyri', terrain: 'Oasis Sports Center', date: '2023-11-20', slot: '18:00 - 19:00', total: 300, status: 'confirmed' },
    { id: 'GG-1025', player: 'Sofyan Amrabat', terrain: 'Rabat Futsal Arena', date: '2023-11-21', slot: '20:00 - 21:00', total: 250, status: 'pending' },
    { id: 'GG-1026', player: 'Achraf Hakimi', terrain: 'Marrakech Kickoff', date: '2023-11-22', slot: '17:00 - 18:00', total: 400, status: 'cancelled' },
    { id: 'GG-1027', player: 'Yassine Bounou', terrain: 'Oasis Sports Center', date: '2023-11-20', slot: '21:00 - 22:00', total: 300, status: 'confirmed' },
];

export const ManageReservations = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [reservations, setReservations] = useState(MOCK_RESERVATIONS);

    const handleCancel = (id) => {
        setReservations(reservations.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
        toast.success('Reservation cancelled successfully');
    };

    const filteredReservations = reservations.filter(r => {
        const matchesSearch = r.player.toLowerCase().includes(search.toLowerCase()) ||
            r.terrain.toLowerCase().includes(search.toLowerCase()) ||
            r.id.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-[var(--color-text)] uppercase italic tracking-tighter">
                        Manage <span className="text-[var(--color-primary)]">Reservations</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Real-time overview of all bookings across all terrains.</p>
                </div>
                <div className="bg-[var(--color-card)] p-4 rounded-2xl border border-[var(--color-border)] flex gap-6">
                    <div className="text-center">
                        <p className="text-xs text-[var(--color-text-muted)] uppercase font-black">Today</p>
                        <p className="text-xl font-bold text-[var(--color-primary)]">12</p>
                    </div>
                    <div className="w-px bg-[var(--color-border)]"></div>
                    <div className="text-center">
                        <p className="text-xs text-[var(--color-text-muted)] uppercase font-black">Pending</p>
                        <p className="text-xl font-bold text-yellow-500">3</p>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                <div className="p-4 border-b border-[var(--color-border)] flex flex-col md:flex-row gap-4 bg-[var(--color-background)]/50">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -mt-2 text-[var(--color-text-muted)]" size={16} />
                        <input
                            type="text"
                            placeholder="Search by ID, player, or terrain..."
                            className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-2 text-sm focus:outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--color-background)] text-[var(--color-text-muted)] text-[10px] uppercase font-black tracking-widest border-b border-[var(--color-border)]">
                                <th className="p-4">ID</th>
                                <th className="p-4">Member</th>
                                <th className="p-4">Terrain</th>
                                <th className="p-4">Schedule</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {filteredReservations.map((res) => (
                                <tr key={res.id} className="hover:bg-[var(--color-primary)]/5 transition-colors group">
                                    <td className="p-4 text-xs font-mono text-[var(--color-primary)] font-bold">{res.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <User size={14} className="text-[var(--color-text-muted)]" />
                                            <span className="font-bold text-sm text-[var(--color-text)]">{res.player}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-[var(--color-text-muted)]">{res.terrain}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-text)]">
                                                <Calendar size={12} className="text-[var(--color-primary)]" /> {res.date}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)] font-black uppercase">
                                                <Clock size={10} /> {res.slot}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-black text-[var(--color-primary)]">{res.total} MAD</td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${res.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                                                res.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-red-500/10 text-red-500'
                                            }`}>
                                            {res.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {res.status !== 'cancelled' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-lg p-2 h-auto text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white"
                                                    onClick={() => handleCancel(res.id)}
                                                    title="Cancel Reservation"
                                                >
                                                    <XCircle size={14} />
                                                </Button>
                                            )}
                                            <Button variant="outline" size="sm" className="rounded-lg p-2 h-auto">
                                                <AlertCircle size={14} className="text-blue-500" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredReservations.length === 0 && (
                        <div className="py-20 text-center text-[var(--color-text-muted)] italic">
                            No reservations found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
