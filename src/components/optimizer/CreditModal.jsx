import React from 'react';
import { CreditCard, X, Gem } from 'lucide-react';

export default function CreditModal({ onClose, onNavigateToBilling }) {
    return (
        <div className="lightbox-modal" onClick={onClose} style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(8, 11, 17, 0.85)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999
        }}>
            <div 
                className="lightbox-content-box" 
                onClick={(e) => e.stopPropagation()} 
                style={{ 
                    maxWidth: '420px', 
                    padding: '2.25rem 2rem', 
                    textAlign: 'center', 
                    borderRadius: '24px', 
                    background: '#0d121f', 
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.08)',
                    position: 'relative'
                }}
            >
                <button 
                    className="lightbox-close" 
                    onClick={onClose}
                    style={{ 
                        position: 'absolute', top: '16px', right: '16px',
                        background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#94a3b8', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    ✕
                </button>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    background: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                }}>
                    <Gem size={30} color="#38bdf8" />
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Out of Credits!
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                    You have <strong style={{ color: '#38bdf8' }}>0 query credits</strong> remaining.<br />
                    To generate more image variations and check live Meesho shipping rates, please choose a plan.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button 
                        className="btn-primary" 
                        style={{ 
                            padding: '0.85rem', 
                            borderRadius: '9999px', 
                            fontSize: '0.95rem', 
                            fontWeight: 700, 
                            background: '#ffffff', 
                            color: '#080b11',
                            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.18)', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            border: 'none'
                        }}
                        onClick={() => {
                            onClose();
                            if (onNavigateToBilling) onNavigateToBilling();
                        }}
                    >
                        <CreditCard size={18} />
                        <span>Purchase Plan Now</span>
                    </button>
                    <button 
                        type="button"
                        style={{ padding: '0.75rem', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.1)', cursor: 'pointer', fontWeight: 600 }}
                        onClick={onClose}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
