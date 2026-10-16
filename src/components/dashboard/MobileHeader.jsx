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
                    style={{ height: '30px', width: 'auto' }} 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                />
                <span style={{ fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
                    VendorsDesk
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                {currentUser && (
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: '#eff6ff', 
                        color: '#2563eb', 
                        padding: '0.3rem 0.65rem', 
                        borderRadius: '8px', 
                        fontSize: '0.78rem', 
                        fontWeight: 700,
                        border: '1px solid #bfdbfe'
                    }}>
                        <Coins size={14} />
                        <span>{currentUser.credits}</span>
                    </div>
                )}
                <button 
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                    aria-label="Toggle navigation menu"
                    style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        width: '38px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#0f172a'
                    }}
                >
                    {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
        </header>
    );
}
