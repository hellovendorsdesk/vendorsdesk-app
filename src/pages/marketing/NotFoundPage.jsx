import React from 'react';

export default function NotFoundPage({ onReturnHome }) {
    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '3.5rem 2rem', background: '#0d121f', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍 404</div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Page Not Found</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                The page or URL you are looking for does not exist or has been moved.
            </p>
            <button 
                onClick={onReturnHome}
                className="btn-primary"
                style={{ padding: '0.85rem 1.8rem', background: '#ffffff', color: '#080b11', border: 'none', borderRadius: '9999px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 4px 20px rgba(255, 255, 255, 0.18)' }}
            >
                🏠 Return to VendorsDesk Home
            </button>
        </div>
    );
}
