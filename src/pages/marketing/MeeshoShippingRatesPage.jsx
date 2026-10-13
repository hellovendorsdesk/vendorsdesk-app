import React from 'react';

export default function MeeshoShippingRatesPage({ onRegister }) {
    return (
        <div>
            {/* Hero Section - Compact SaaS Layout */}
            <section style={{ padding: '3.25rem 4% 2.5rem 4%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                
                {/* Background Ambient Orbs */}
                <div style={{
                    position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
                    width: '500px', height: '300px',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.06) 50%, transparent 70%)',
                    filter: 'blur(45px)', pointerEvents: 'none', zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* Compact Glowing Top Pill Tag */}
                    <div style={{ 
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)', 
                        border: '1px solid rgba(37, 99, 235, 0.22)', 
                        padding: '0.3rem 0.9rem', 
                        borderRadius: '30px', 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        color: '#2563eb', 
                        marginBottom: '1.25rem', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.35rem',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.06)'
                    }}>
                        <span>⚡</span> India's #1 All-In-One Meesho Supplier Growth Suite
                    </div>

                    {/* Refined Main Heading */}
                    <h1 style={{ 
                        fontFamily: 'Outfit, sans-serif', 
                        fontSize: '2.65rem', 
                        fontWeight: 800, 
                        lineHeight: 1.18, 
                        letterSpacing: '-0.03em', 
                        maxWidth: '820px', 
                        margin: '0 auto 1rem auto',
                        color: '#0f172a'
                    }}>
                        Bypass Duplicate Image Blocks & <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Qualify for Lower Shipping Rates</span>
                    </h1>

                    <p style={{ color: '#475569', fontSize: '0.98rem', maxWidth: '620px', margin: '0 auto 1.75rem auto', lineHeight: '1.6' }}>
                        Automated catalog variation generator, AI background remover, SKU return penalty auditor, and bulk thermal label cropper built for Meesho & e-commerce sellers.
                    </p>

                    {/* CTA Buttons Row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '2.25rem' }}>
                        <button 
                            className="btn-get-started card-hover-lift"
                            style={{ 
                                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', 
                                border: 'none', 
                                color: '#ffffff', 
                                padding: '0.75rem 1.85rem', 
                                borderRadius: '12px', 
                                fontSize: '0.92rem', 
                                fontWeight: 800, 
                                cursor: 'pointer', 
                                boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)' 
                            }}
                            onClick={onRegister}
                        >
                            ⚡ Start Free Audit (3 Free Credits)
                        </button>
                        <button 
                            className="btn-signin card-hover-lift"
                            style={{ 
                                background: '#ffffff', 
                                border: '1px solid #cbd5e1', 
                                color: '#0f172a', 
                                padding: '0.75rem 1.6rem', 
                                borderRadius: '12px', 
                                fontSize: '0.92rem', 
                                fontWeight: 800, 
                                cursor: 'pointer', 
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' 
                            }}
                            onClick={() => {
                                const el = document.getElementById('faqs');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            📖 How It Works
                        </button>
                    </div>

                    {/* Social Proof Badges */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><strong style={{ color: '#059669' }}>✓ 100% Compliant</strong> Panel Handshake</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><strong style={{ color: '#2563eb' }}>⚡ Instant</strong> Automated Output</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><strong style={{ color: '#7c3aed' }}>🔒 Zero Key</strong> Storage</span>
                    </div>

                </div>
            </section>
        </div>
    );
}
