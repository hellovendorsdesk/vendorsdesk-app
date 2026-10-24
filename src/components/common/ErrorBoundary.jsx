// src/components/common/ErrorBoundary.jsx - Global React Render Error Boundary
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        if (import.meta.env.DEV) {
            console.error('[ErrorBoundary caught error]:', error, errorInfo);
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    handleGoHome = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#08090C',
                    color: '#F1F5F9',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    padding: '1.5rem'
                }}>
                    <div style={{
                        maxWidth: '520px',
                        width: '100%',
                        background: '#0E121A',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '16px',
                        padding: '2rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'rgba(239, 68, 68, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.25rem',
                            color: '#EF4444'
                        }}>
                            <AlertTriangle size={28} />
                        </div>

                        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: '#FFFFFF' }}>
                            Something went wrong
                        </h2>

                        <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                            The application encountered an unexpected state. Your data is safe. Try reloading the tool or returning to the home page.
                        </p>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                            <button
                                onClick={this.handleReset}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '8px',
                                    background: '#00F0FF',
                                    color: '#08090C',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <RefreshCw size={16} /> Reload Page
                            </button>

                            <button
                                onClick={this.handleGoHome}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    color: '#F1F5F9',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    cursor: 'pointer'
                                }}
                            >
                                <Home size={16} /> Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
