import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, MoreVertical, Shield, User, UserCheck, UserMinus, Mail, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const MOCK_USERS = [
    { id: '1', name: 'Yassine En-Nesyri', email: 'yassine@example.com', role: 'player', city: 'Casablanca', status: 'active', joined: '2023-10-12' },
    { id: '2', name: 'Achraf Hakimi', email: 'achraf@example.com', role: 'owner', city: 'Rabat', status: 'active', joined: '2023-09-25' },
    { id: '3', name: 'Sofyan Amrabat', email: 'sofyan@example.com', role: 'player', city: 'Fes', status: 'inactive', joined: '2023-11-02' },
    { id: '4', name: 'Mehdi Benatia', email: 'mehdi@admin.com', role: 'admin', city: 'Casablanca', status: 'active', joined: '2023-01-15' },
    { id: '5', name: 'Yassine Bounou', email: 'bounou@example.com', role: 'player', city: 'Tangier', status: 'active', joined: '2023-08-30' },
];

export const ManageUsers = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [users, setUsers] = useState(MOCK_USERS);

    const handleToggleStatus = (userId) => {
        setUsers(users.map(u =>
            u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
        ));
        toast.success('User status updated successfully');
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-[var(--color-text)] uppercase italic tracking-tighter">
                        Manage <span className="text-[var(--color-primary)]">Users</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Oversee and manage all registered users in the GoalGround platform.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="rounded-xl font-bold px-6">Export CSV</Button>
                </div>
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                <div className="p-4 border-b border-[var(--color-border)] flex flex-col md:flex-row gap-4 bg-[var(--color-background)]/50">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -track-y-1/2 text-[var(--color-text-muted)] mt-[-8px]" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-4 py-2 text-sm focus:outline-none"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="player">Players</option>
                            <option value="owner">Owners</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--color-background)] text-[var(--color-text-muted)] text-[10px] uppercase font-black tracking-widest border-b border-[var(--color-border)]">
                                <th className="p-4 min-w-[200px]">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">City</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-[var(--color-primary)]/5 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] font-bold group-hover:scale-110 transition-transform">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">{user.name}</p>
                                                <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1"><Mail size={10} /> {user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant={user.role === 'player' ? 'ATT' : user.role === 'owner' ? 'MID' : 'GK'} className="font-black italic px-3">
                                            {user.role.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-[var(--color-text-muted)] text-sm font-medium">
                                        <div className="flex items-center gap-1"><MapPin size={14} className="text-[var(--color-primary)]" /> {user.city}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
                                            <span className={`text-xs font-bold uppercase ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-[var(--color-text-muted)] text-xs font-mono">{user.joined}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-lg p-2 h-auto"
                                                onClick={() => handleToggleStatus(user.id)}
                                                title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                                            >
                                                {user.status === 'active' ? <UserMinus size={14} className="text-red-500" /> : <UserCheck size={14} className="text-green-500" />}
                                            </Button>
                                            <Button variant="outline" size="sm" className="rounded-lg p-2 h-auto">
                                                <Shield size={14} className="text-blue-500" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="py-20 text-center text-[var(--color-text-muted)] italic">
                            No users found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
