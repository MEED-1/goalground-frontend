import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Star, TrendingUp, Filter, MessageSquare, ChevronRight, Zap, Target, Shield, Activity, Award, Trophy, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { Modal } from '../../components/ui/Modal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useAuth } from '../../context/AuthContext';
import { SearchableSelect } from '../../components/ui/SearchableSelect';
import toast from 'react-hot-toast';

export const SearchPlayers = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters State
    const [selectedCity, setSelectedCity] = useState('all');
    const [selectedPos, setSelectedPos] = useState('all');
    const [minRating, setMinRating] = useState(0);
    const [minMatches, setMinMatches] = useState(0);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    // Rating Modal State
    const [ratingModal, setRatingModal] = useState({ show: false, player: null });
    const [stats, setStats] = useState({ speed: 80, passing: 80, shooting: 80, defense: 80, physical: 80 });

    useDocumentTitle(t('nav.find_players', 'Find Players'));

    const CITY_KEYS = [
        'casablanca', 'rabat', 'marrakech', 'tanger', 'agadir', 'fes',
        'meknes', 'sale', 'oujda', 'kenitra'
    ];

    const CITY_OPTIONS = [
        { value: 'all', label: t('common.all_cities') },
        ...CITY_KEYS.map(key => ({ value: key, label: t(`cities.${key}`) }))
    ];

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            setPlayers([
                { id: 1, name: 'Yassine En-Nesyri', city: 'Casablanca', position: 'ATT', rating: 4.8, matches: 156, bio: 'Looking for competitive 7v7 matches.' },
                { id: 2, name: 'Achraf Hakimi', city: 'Rabat', position: 'DEF', rating: 4.9, matches: 203, bio: 'Pace is my weapon. Ready for high-intensity games.' },
                { id: 3, name: 'Sofyan Amrabat', city: 'Fes', position: 'MID', rating: 4.7, matches: 124, bio: 'Controlling the midfield is what I do.' },
                { id: 4, name: 'Yassine Bounou', city: 'Tangier', position: 'GK', rating: 4.9, matches: 188, bio: 'Nothing gets past me. Top tier GK available.' },
                { id: 5, name: 'Nayef Aguerd', city: 'Rabat', position: 'DEF', rating: 4.6, matches: 92, bio: 'Solid at the back. Good at long passes.' },
                { id: 6, name: 'Azzedine Ounahi', city: 'Casablanca', position: 'MID', rating: 4.5, matches: 78, bio: 'Technical player. Loves dribbling.' },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const handleRateClick = (player) => {
        if (!user) {
            toast.error(t('auth.login_required', 'Please login to rate players'));
            return;
        }
        setRatingModal({ show: true, player });
    };

    const handleChatClick = (player) => {
        if (!user) {
            toast.error(t('auth.login_required', 'Please login to chat'));
            return;
        }
        toast.success(`Opening chat with ${player.name}...`);
    };

    const submitRating = () => {
        const avg = (Object.values(stats).reduce((a, b) => a + b, 0) / 5 / 20).toFixed(1);
        toast.success(`Success! You rated ${ratingModal.player.name} ${avg}/5.0 based on performance.`);
        setRatingModal({ show: false, player: null });
    };

    const filteredPlayers = players.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(search.toLowerCase());
        const cityMatch = selectedCity === 'all' || p.city.toLowerCase() === selectedCity || p.city.toLowerCase() === t(`cities.${selectedCity}`).toLowerCase();
        const posMatch = selectedPos === 'all' || p.position === selectedPos;
        const ratingMatch = p.rating >= minRating;
        const matchesMatch = p.matches >= minMatches;

        return nameMatch && cityMatch && posMatch && ratingMatch && matchesMatch;
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-display font-bold uppercase tracking-tighter italic">
                        Search <span className="text-[var(--color-primary)]">Players</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)] mt-2">Connect with the best footballers in your city.</p>
                </div>

                <div className="relative w-full md:w-[400px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
                    <input
                        type="text"
                        className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-full py-4 pl-12 pr-6 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium"
                        placeholder={t('common.search_by_name', 'Search by name...')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-10">
                <div className="flex gap-4 mb-4 overflow-x-auto pb-2 no-scrollbar items-center">
                    <Button
                        variant={showAdvancedFilters ? 'primary' : 'outline'}
                        size="sm"
                        className={`rounded-full gap-2 transition-all ${showAdvancedFilters ? 'text-black' : 'border-[var(--color-primary)] text-[var(--color-primary)]'}`}
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                        <Filter size={14} /> {t('common.filters')}
                    </Button>
                    <div className="w-px h-6 bg-[var(--color-border)] mx-2 shrink-0"></div>
                    {['all', 'GK', 'DEF', 'MID', 'ATT'].map(pos => (
                        <button
                            key={pos}
                            onClick={() => setSelectedPos(pos)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedPos === pos ? 'bg-[var(--color-primary)] text-black border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20' : 'bg-[var(--color-card)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
                                }`}
                        >
                            {pos === 'all' ? t('common.all_positions', 'All Positions') : t(`roles.${pos}`)}
                        </button>
                    ))}
                </div>

                {showAdvancedFilters && (
                    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
                        <SearchableSelect
                            label={t('common.city')}
                            options={CITY_OPTIONS}
                            value={selectedCity}
                            onChange={setSelectedCity}
                        />

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-3">Min. Rating ({minRating}+)</label>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                step="0.5"
                                value={minRating}
                                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                className="w-full accent-[var(--color-primary)] h-1.5 rounded-lg bg-[var(--color-background)] appearance-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-3">Min. Matches Played ({minMatches}+)</label>
                            <input
                                type="range"
                                min="0"
                                max="300"
                                step="10"
                                value={minMatches}
                                onChange={(e) => setMinMatches(parseInt(e.target.value))}
                                className="w-full accent-[var(--color-primary)] h-1.5 rounded-lg bg-[var(--color-background)] appearance-none"
                            />
                        </div>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Spinner /></div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    {filteredPlayers.map(player => (
                        <div key={player.id} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:border-[var(--color-primary)] transition-all relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-[var(--color-primary)]/10 transition-colors"></div>

                            <div className="w-24 h-24 rounded-2xl bg-[var(--color-background)] border-2 border-[var(--color-border)] flex items-center justify-center text-3xl font-bold text-[var(--color-primary)] shrink-0 group-hover:border-[var(--color-primary)] group-hover:rotate-3 transition-all overflow-hidden relative">
                                {player.name.charAt(0)}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4 gap-2 text-center sm:text-left">
                                    <div>
                                        <h3 className="text-2xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">{player.name}</h3>
                                        <p className="text-sm text-[var(--color-text-muted)] flex items-center justify-center sm:justify-start gap-1">
                                            <MapPin size={12} /> {player.city}
                                        </p>
                                    </div>
                                    <Badge variant={player.position}>{player.position}</Badge>
                                </div>

                                <div className="flex justify-center sm:justify-start gap-8 my-5">
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-[var(--color-text)] flex items-center gap-1.5">
                                            <Star size={18} className="text-yellow-400 fill-yellow-400" /> {player.rating}
                                        </p>
                                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">{t('common.rating')}</p>
                                    </div>
                                    <div className="w-px bg-[var(--color-border)] h-8 self-center"></div>
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-[var(--color-text)] flex items-center gap-1.5">
                                            <Trophy size={18} className="text-[var(--color-primary)]" /> {player.matches}
                                        </p>
                                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mt-0.5">{t('common.matches')}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-[var(--color-text-muted)] mb-8 line-clamp-2 italic bg-[var(--color-background)]/50 p-3 rounded-lg border-l-2 border-[var(--color-primary)]">
                                    "{player.bio}"
                                </p>

                                <div className="flex gap-3 mt-auto">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="flex-1 gap-2 rounded-xl group"
                                        onClick={() => handleRateClick(player)}
                                    >
                                        <TrendingUp size={16} className="group-hover:translate-y-[-2px] transition-transform" /> {t('common.rate', 'Rate')}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl px-4 hover:bg-[var(--color-primary)] hover:text-black transition-all"
                                        onClick={() => handleChatClick(player)}
                                    >
                                        <MessageSquare size={18} />
                                    </Button>
                                    <Button variant="outline" size="sm" className="rounded-xl px-4">
                                        <ChevronRight size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredPlayers.length === 0 && (
                        <div className="col-span-full py-32 text-center bg-[var(--color-card)] rounded-3xl border border-dashed border-[var(--color-border)]">
                            <Users size={48} className="mx-auto text-[var(--color-border)] mb-4" />
                            <h3 className="text-xl font-bold text-[var(--color-text)]">{t('explore.no_results')}</h3>
                            <p className="text-[var(--color-text-muted)] mt-2">Try adjusting your filters or search term.</p>
                            <Button variant="outline" className="mt-6 rounded-full" onClick={() => {
                                setSearch('');
                                setSelectedCity('all');
                                setSelectedPos('all');
                                setMinRating(0);
                                setMinMatches(0);
                            }}>Clear All Filters</Button>
                        </div>
                    )}
                </div>
            )}

            {/* Rating Modal */}
            {ratingModal.show && (
                <Modal
                    isOpen={ratingModal.show}
                    onClose={() => setRatingModal({ show: false, player: null })}
                    title={`Rate Performance: ${ratingModal.player?.name}`}
                >
                    <div className="space-y-8 py-4">
                        <div className="grid gap-6">
                            {[
                                { id: 'speed', label: t('common.player_stats.speed'), icon: <Zap size={18} className="text-yellow-400" /> },
                                { id: 'passing', label: t('common.player_stats.passing'), icon: <Target size={18} className="text-blue-400" /> },
                                { id: 'shooting', label: t('common.player_stats.shooting'), icon: <Award size={18} className="text-red-400" /> },
                                { id: 'defense', label: t('common.player_stats.defense'), icon: <Shield size={18} className="text-green-400" /> },
                                { id: 'physical', label: t('common.player_stats.physical'), icon: <Activity size={18} className="text-purple-400" /> },
                            ].map(item => (
                                <div key={item.id} className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-tighter">
                                            {item.icon} {item.label}
                                        </div>
                                        <span className={`text-lg font-display font-black ${stats[item.id] > 85 ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}>
                                            {stats[item.id]}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="20"
                                        max="99"
                                        value={stats[item.id]}
                                        onChange={(e) => setStats({ ...stats, [item.id]: parseInt(e.target.value) })}
                                        className="w-full accent-[var(--color-primary)] h-2 rounded-lg bg-[var(--color-background)] appearance-none cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="bg-[var(--color-background)] p-6 rounded-2xl border border-[var(--color-border)] text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent"></div>
                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.3em] font-black mb-1">{t('common.player_stats.average')}</p>
                            <div className="text-5xl font-black font-display text-[var(--color-primary)] drop-shadow-lg group-hover:scale-110 transition-transform">
                                {(Object.values(stats).reduce((a, b) => a + b, 0) / 5 / 20).toFixed(1)}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setRatingModal({ show: false, player: null })}>
                                Cancel
                            </Button>
                            <Button variant="primary" className="flex-2 rounded-xl" onClick={submitRating}>
                                Submit Rating
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};
