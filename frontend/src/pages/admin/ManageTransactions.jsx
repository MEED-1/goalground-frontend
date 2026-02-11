import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Calendar, Download, Filter, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const MOCK_TRANSACTIONS = [
    { id: 'TXN-9021', amount: 300, method: 'Credit Card', player: 'Yassine En-Nesyri', date: '2023-11-19 14:23', status: 'completed' },
    { id: 'TXN-9022', amount: 250, method: 'PayPal', player: 'Sofyan Amrabat', date: '2023-11-19 16:45', status: 'completed' },
    { id: 'TXN-9023', amount: 400, method: 'Credit Card', player: 'Achraf Hakimi', date: '2023-11-20 09:12', status: 'pending' },
    { id: 'TXN-9024', amount: 300, method: 'Apple Pay', player: 'Yassine Bounou', date: '2023-11-20 11:30', status: 'completed' },
    { id: 'TXN-9025', amount: 350, method: 'Credit Card', player: 'Amine Adli', date: '2023-11-20 13:05', status: 'failed' },
];

export const ManageTransactions = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-[var(--color-text)] uppercase italic tracking-tighter">
                        Financial <span className="text-[var(--color-primary)]">Overview</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)]">Monitor all platform revenue and transaction history.</p>
                </div>
                <Button variant="outline" className="rounded-xl border-[var(--color-primary)] text-[var(--color-primary)] font-bold gap-2">
                    <Download size={16} /> Export Statement
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={64} className="text-[var(--color-primary)]" />
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase font-black tracking-widest mb-1">Total Revenue</p>
                    <h3 className="text-4xl font-display font-black text-[var(--color-text)] tracking-tighter">124,500 <span className="text-lg text-[var(--color-primary)]">MAD</span></h3>
                    <div className="flex items-center gap-1 mt-2 text-green-500 text-sm font-bold">
                        <ArrowUpRight size={14} /> +12.5% <span className="text-[var(--color-text-muted)] font-normal ml-1">vs last month</span>
                    </div>
                </div>

                <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] uppercase font-black tracking-widest mb-1">Avg. Transaction</p>
                    <h3 className="text-4xl font-display font-black text-[var(--color-text)] tracking-tighter">312 <span className="text-lg text-[var(--color-primary)]">MAD</span></h3>
                    <div className="flex items-center gap-1 mt-2 text-blue-500 text-sm font-bold">
                        <ArrowUpRight size={14} /> +2.1% <span className="text-[var(--color-text-muted)] font-normal ml-1">vs last month</span>
                    </div>
                </div>

                <div className="bg-[var(--color-card)] p-6 rounded-2xl border border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] uppercase font-black tracking-widest mb-1">Success Rate</p>
                    <h3 className="text-4xl font-display font-black text-[var(--color-text)] tracking-tighter">98.4<span className="text-lg text-[var(--color-primary)]">%</span></h3>
                    <div className="flex items-center gap-1 mt-2 text-red-500 text-sm font-bold">
                        <ArrowDownRight size={14} /> -0.2% <span className="text-[var(--color-text-muted)] font-normal ml-1">vs last month</span>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                <div className="p-4 border-b border-[var(--color-border)] flex flex-col md:flex-row gap-4 bg-[var(--color-background)]/50">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -mt-2 text-[var(--color-text-muted)]" size={16} />
                        <input
                            type="text"
                            placeholder="Search by transaction ID or player..."
                            className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl border-[var(--color-border)] gap-2">
                        <Filter size={16} /> Filters
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--color-background)] text-[var(--color-text-muted)] text-[10px] uppercase font-black tracking-widest border-b border-[var(--color-border)]">
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Method</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {MOCK_TRANSACTIONS.map((txn) => (
                                <tr key={txn.id} className="hover:bg-[var(--color-primary)]/5 transition-colors group">
                                    <td className="p-4 text-xs font-mono text-[var(--color-text-muted)]">{txn.id}</td>
                                    <td className="p-4 font-bold text-[var(--color-text)]">{txn.player}</td>
                                    <td className="p-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <CreditCard size={14} className="text-[var(--color-primary)]" />
                                            <span className="text-[var(--color-text-muted)]">{txn.method}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs text-[var(--color-text-muted)] font-mono">{txn.date}</td>
                                    <td className="p-4 font-black text-[var(--color-text)]">{txn.amount} MAD</td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full border ${txn.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                txn.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
