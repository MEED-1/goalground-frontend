import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, DollarSign, Star, CheckCircle, XCircle, MoreVertical, ExternalLink, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';

const MOCK_TERRAINS = [
    { id: '1', name: 'Oasis Sports Center', owner: 'Achraf Hakimi', city: 'Casablanca', price: 300, format: '5v5', status: 'approved', rating: 4.8, bookings: 156 },
    { id: '2', name: 'Rabat Futsal Arena', owner: 'Yassine Bounou', city: 'Rabat', price: 250, format: '7v7', status: 'approved', rating: 4.5, bookings: 92 },
    { id: '3', name: 'Tangier Pro Pitch', owner: 'Amine Adli', city: 'Tangier', price: 350, format: '5v5', status: 'pending', rating: 0, bookings: 0 },
    { id: '4', name: 'Agadir Beach Arena', owner: 'Soufiane Rahimi', city: 'Agadir', price: 200, format: '11v11', status: 'rejected', rating: 0, bookings: 0 },
];

export const ManageTerrains = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [terrains, setTerrains] = useState(MOCK_TERRAINS);

    const handleUpdateStatus = (id, newStatus) => {
        setTerrains(terrains.map(t => t.id === id ? { ...t, status: newStatus } : t));
        toast.success(`Terrain ${newStatus} successfully!`);
    };

    const filteredTerrains = terrains.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.owner.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-[var(--color-text)] uppercase italic tracking-tighter">
                        Manage <span className="text-[var(--color-primary)]">Terrains</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Approve, reject, and manage all football pitches on the platform.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="ATT" className="px-4 py-2 rounded-xl text-xs font-black italic">
                        {terrains.filter(t => t.status === 'pending').length} PENDING APPROVAL
                    </Badge>
                </div>
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                <div className="p-4 border-b border-[var(--color-border)] flex flex-col md:flex-row gap-4 bg-[var(--color-background)]/50">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -mt-2 text-[var(--color-text-muted)]" size={16} />
                        <input
                            type="text"
                            placeholder="Search terrains or owners..."
                            className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-2 text-sm focus:outline-none"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--color-background)] text-[var(--color-text-muted)] text-[10px] uppercase font-black tracking-widest border-b border-[var(--color-border)]">
                                <th className="p-4 min-w-[200px]">Terrain & Owner</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Format & Price</th>
                                <th className="p-4">Performance</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {filteredTerrains.map((terrain) => (
                                <tr key={terrain.id} className="hover:bg-[var(--color-primary)]/5 transition-colors group">
                                    <td className="p-4">
                                        <p className="font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">{terrain.name}</p>
                                        <p className="text-xs text-[var(--color-text-muted)] italic">Owner: {terrain.owner}</p>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                                            <MapPin size={14} className="text-[var(--color-primary)]" />
                                            {terrain.city}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <Badge variant={terrain.format} className="text-[10px] py-0 w-fit">{terrain.format}</Badge>
                                            <p className="text-sm font-black text-[var(--color-primary)]">{terrain.price} MAD</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1 text-xs font-bold">
                                                <Star size={12} className="text-yellow-400 fill-yellow-400" /> {terrain.rating || 'N/A'}
                                            </div>
                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-tighter">{terrain.bookings} Bookings</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full border ${terrain.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                terrain.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {terrain.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {terrain.status !== 'approved' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-lg p-2 h-auto text-green-500 border-green-500/20 hover:bg-green-500 hover:text-white"
                                                    onClick={() => handleUpdateStatus(terrain.id, 'approved')}
                                                >
                                                    <CheckCircle size={14} />
                                                </Button>
                                            )}
                                            {terrain.status !== 'rejected' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-lg p-2 h-auto text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white"
                                                    onClick={() => handleUpdateStatus(terrain.id, 'rejected')}
                                                >
                                                    <XCircle size={14} />
                                                </Button>
                                            )}
                                            <Button variant="outline" size="sm" className="rounded-lg p-2 h-auto">
                                                <ExternalLink size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredTerrains.length === 0 && (
                        <div className="py-20 text-center text-[var(--color-text-muted)] italic">
                            No terrains found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
