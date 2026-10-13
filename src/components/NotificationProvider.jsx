import React, { useState, useEffect } from 'react';

export default function NotificationProvider({ children }) {
    const [toast, setToast] = useState(null);
    const [modal, setModal] = useState(null);

    const triggerToast = (message, type = 'warning') => {
        setToast({ message, type, id: Date.now() });
    };

    const triggerModal = (title, message, type = 'info') => {
        setModal({ title, message, type });
    };

    useEffect(() => {
        // Intercept native window.alert to render our premium toast alert!
        const originalAlert = window.alert;
        window.alert = (msg) => {
            triggerToast(String(msg), 'warning');
        };

        window.showPremiumToast = (msg, type = 'info') => {
            triggerToast(msg, type);
        };

        window.showPremiumModal = (title, msg, type = 'info') => {
            triggerModal(title, msg, type);
        };

        return () => {
            window.alert = originalAlert;
        };
    }, []);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3800);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const getIcon = (type) => {
        if (type === 'success') return '✅';
        if (type === 'error') return '🚨';
        if (type === 'warning') return '⚠️';
        return '📢';
    };

    const getBorderColor = (type) => {
        if (type === 'success') return '#10b981';
        if (type === 'error') return '#ef4444';
        if (type === 'warning') return '#f59e0b';
        return '#6366f1';
    };

    return (
        <>
            {children}

            {/* Premium Floating Glassmorphism Toast Banner */}
            {toast && (
                <div 
                    style={{
                        position: 'fixed',
                        top: '24px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 999999,
                        background: 'rgba(15, 23, 42, 0.94)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: `1px solid ${getBorderColor(toast.type)}`,
                        boxShadow: `0 20px 35px -10px rgba(0, 0, 0, 0.5), 0 0 15px ${getBorderColor(toast.type)}33`,
                        borderRadius: '14px',
                        padding: '0.85rem 1.4rem',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        minWidth: '320px',
                        maxWidth: '520px',
                        animation: 'toastSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        fontFamily: "'Outfit', 'Inter', sans-serif"
                    }}
                >
                    <span style={{ fontSize: '1.25rem' }}>{getIcon(toast.type)}</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                            {toast.type === 'error' ? 'Notice' : 'Alert'}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.1rem', lineHeight: 1.35 }}>
                            {toast.message}
                        </div>
                    </div>
                    <button
                        onClick={() => setToast(null)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94a3b8',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            padding: '0.2rem',
                            lineHeight: 1
                        }}
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Premium Alert Modal */}
            {modal && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 999999,
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                >
                    <div 
                        style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '20px',
                            padding: '1.75rem',
                            maxWidth: '440px',
                            width: '100%',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
                            color: '#ffffff',
                            fontFamily: "'Outfit', 'Inter', sans-serif"
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{ 
                                width: '42px', height: '42px', borderRadius: '12px', 
                                background: `${getBorderColor(modal.type)}20`,
                                border: `1px solid ${getBorderColor(modal.type)}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.3rem'
                            }}>
                                {getIcon(modal.type)}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>{modal.title}</h3>
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>VendorsDesk System Notification</p>
                            </div>
                        </div>

                        <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {modal.message}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setModal(null)}
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.65rem 1.5rem',
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                                }}
                            >
                                Got it 👍
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes toastSlideDown {
                    from { transform: translate(-50%, -20px); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </>
    );
}
