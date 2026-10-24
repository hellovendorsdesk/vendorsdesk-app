// src/context/ToastContext.jsx - Global Notification & Toast State Management
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random().toString(36).substring(2, 7);
        setToasts((prev) => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const success = useCallback((msg, duration) => addToast(msg, 'success', duration), [addToast]);
    const error = useCallback((msg, duration) => addToast(msg, 'error', duration), [addToast]);
    const info = useCallback((msg, duration) => addToast(msg, 'info', duration), [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, info }}>
            {children}
            {/* Toast Container */}
            <div style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                pointerEvents: 'none',
                maxWidth: '380px',
                width: 'calc(100vw - 48px)'
            }}>
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        style={{
                            pointerEvents: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: '#0E121A',
                            color: '#F1F5F9',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                            borderLeft: `4px solid ${
                                t.type === 'success' ? '#10B981' : t.type === 'error' ? '#EF4444' : '#00F0FF'
                            }`,
                            animation: 'slideIn 0.25s ease-out'
                        }}
                    >
                        {t.type === 'success' && <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0 }} />}
                        {t.type === 'error' && <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />}
                        {t.type === 'info' && <Info size={18} color="#00F0FF" style={{ flexShrink: 0 }} />}
                        <span style={{ flex: 1, lineHeight: 1.4 }}>{t.message}</span>
                        <button
                            onClick={() => removeToast(t.id)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#94A3B8',
                                cursor: 'pointer',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        // Fallback gracefully if used outside provider
        return {
            success: (msg) => console.log('[Toast Success]:', msg),
            error: (msg) => console.error('[Toast Error]:', msg),
            info: (msg) => console.info('[Toast Info]:', msg)
        };
    }
    return context;
}
