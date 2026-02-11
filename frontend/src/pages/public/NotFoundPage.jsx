import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Search } from 'lucide-react';

export const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-8">
                <h1 className="text-[120px] md:text-[180px] font-black opacity-10 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-6 bg-[var(--color-primary)] rounded-3xl shadow-2xl rotate-12">
                        <Search size={48} className="text-white" />
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-[var(--color-text-muted)] max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/">
                    <Button size="lg">
                        Back to Home
                    </Button>
                </Link>
                <Link to="/explore">
                    <Button variant="secondary" size="lg">
                        Explore Terrains
                    </Button>
                </Link>
            </div>
        </div>
    );
};
