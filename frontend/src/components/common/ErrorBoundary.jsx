import React from 'react';
import { Button } from '../ui/Button';
import { ShieldAlert } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)]">
                    <div className="max-w-md w-full text-center space-y-6 p-8 bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-xl">
                        <div className="flex justify-center">
                            <div className="p-4 bg-red-500/10 rounded-full text-red-500">
                                <ShieldAlert size={48} />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold">Something went wrong</h1>
                        <p className="text-[var(--color-text-muted)]">
                            We encountered an unexpected error. Don't worry, your data is safe. Please try refreshing the page.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => window.location.reload()}>
                                Refresh Page
                            </Button>
                            <Button variant="secondary" onClick={() => window.location.href = '/'}>
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
