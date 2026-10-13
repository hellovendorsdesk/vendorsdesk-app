import React from 'react';

export default function NotFoundPage({ onReturnHome }) {
    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '3.5rem 2rem', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍 404</div>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Page Not Found</h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                The page or URL you are looking for does not exist or has been moved.
            </p>
            <button 
                onClick={onReturnHome}
                style={{ padding: '0.85rem 1.8rem', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}
            >
                🏠 Return to VendorsDesk Home
            </button>
        </div>
    );
}
