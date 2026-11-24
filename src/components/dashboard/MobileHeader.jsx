import React from 'react';
import { Menu, X, Coins } from 'lucide-react';

export default function MobileHeader({
    handleNavigate,
    currentUser,
    mobileNavOpen,
    setMobileNavOpen
}) {
    return (
        <header className="dashboard-mobile-header">
            <div 
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
                onClick={() => handleNavigate('home')}
            >
                <img 
                    src="/logo-icon.png" 
                    alt="VendorsDesk Logo" 
                    style={{ height: '28px', width: 'auto' }} 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                />
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '1.15rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                    VendorsDesk
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {currentUser && (
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: 'rgba(56, 189, 248, 0.1)', 
                        color: '#38bdf8', 
                        padding: '0.3rem 0.65rem', 
                        borderRadius: '8px', 
                        fontSize: '0.78rem', 
                        fontWeight: 600,
                        border: '1px solid rgba(56, 189, 248, 0.25)'
                    }}>
                        <Coins size={14} />
                        <span>{currentUser.credits}</span>
                    </div>
                )}
                <button 
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                    aria-label="Toggle navigation menu"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#ffffff'
                    }}
                >
                    {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>
        </header>
    );
}
