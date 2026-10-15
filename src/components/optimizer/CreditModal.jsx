import React from 'react';
import { CreditCard, X, Gem } from 'lucide-react';

export default function CreditModal({ onClose, onNavigateToBilling }) {
    return (
        <div className="lightbox-modal" onClick={onClose}>
            <div 
                className="lightbox-content-box" 
                onClick={(e) => e.stopPropagation()} 
                style={{ 
                    maxWidth: '420px', 
                    padding: '2.25rem 2rem', 
                    textAlign: 'center', 
                    borderRadius: '24px', 
                    background: '#ffffff', 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    position: 'relative'
                }}
            >
                <button 
                    className="lightbox-close" 
                    onClick={onClose}
                    style={{ position: 'absolute', top: '16px', right: '16px' }}
                >
                    ✕
                </button>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    background: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                }}>
                    <Gem size={32} color="#2563eb" />
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                    Out of Credits!
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                    You have <strong>0 query credits</strong> remaining.<br />
                    To generate more image variations and check live Meesho shipping rates, please choose a plan.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button 
                        className="btn-submit-form" 
                        style={{ 
                            padding: '0.85rem', 
                            borderRadius: '12px', 
                            fontSize: '0.95rem', 
                            fontWeight: 700, 
                            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', 
                            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
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
                        style={{ padding: '0.65rem', borderRadius: '12px', background: '#f8fafc', color: '#64748b', border: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: 600 }}
                        onClick={onClose}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
