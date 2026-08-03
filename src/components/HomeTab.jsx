import React from 'react';

export default function HomeTab({ onNavigate }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Hero Welcome banner */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                padding: '3rem 2rem',
                borderRadius: '24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', top: '-10%', left: '-5%', width: '150px', height: '150px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', filter: 'blur(30px)'
                }} />
                
                <h1 style={{ fontSize: '2.4rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                    Welcome to <span style={{ background: 'var(--primary-glow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VendorsDesk</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 1.5rem auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    Essential growth and utility tool suite built specifically for Indian e-commerce suppliers. 
                    Optimize variations, crop shipping labels, audit payout margins, and scale your brand.
                </p>
                <button className="btn-submit-form" style={{ maxWidth: '220px', margin: '0 auto' }} onClick={() => onNavigate('optimizer')}>
                    🚀 Open Image Generator
                </button>
            </div>

            {/* Main Tools Grid */}
            <div>
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'Outfit', marginBottom: '1.25rem', paddingLeft: '0.25rem' }}>Supplier Tools Suite</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    
                    {/* Tool 1 */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '1.25rem' }}>
                        <div>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Meesho Image Generator</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                                Generate variations of catalog images that bypass Meesho's classification filters. 
                                Secure lower shipping brackets and save logistics fees on every single order.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }} onClick={() => onNavigate('optimizer')}>
                            Open Generator
                        </button>
                    </div>

                    {/* Tool 2 */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '1.25rem' }}>
                        <div>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Shipping Label Exporter</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                                Upload bulk dispatch invoice PDFs. Automatically crop shipping labels, sort pages by SKU combinations, 
                                and bundle by courier partner for faster packing.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }} onClick={() => onNavigate('label-exporter')}>
                            Start Exporting
                        </button>
                    </div>

                    {/* Tool 3 */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '1.25rem' }}>
                        <div>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧮</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Profit Calculator</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                                Know your net profitability. Simulate sales returns loss, calculate GST liability deductions, 
                                and check target break-even prices before listing items.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }} onClick={() => onNavigate('calculator')}>
                            Open Calculator
                        </button>
                    </div>

                    {/* Tool 4 */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '1.25rem' }}>
                        <div>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Affiliate Program</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                                Share your referral code. Earn a flat **33% (1/3)** credit commission on referee's first purchase 
                                while they receive 5 bonus credits instantly.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }} onClick={() => onNavigate('affiliate')}>
                            Invite & Earn
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}
