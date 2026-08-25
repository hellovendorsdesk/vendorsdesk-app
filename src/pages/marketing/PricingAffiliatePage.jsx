import React from 'react';

export default function PricingAffiliatePage({ onRegister }) {
    return (
        <div style={{ padding: '4rem 5%' }}>
            
            {/* Pricing Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontFamily: 'Outfit', fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>Simple, Credit-Based Plans</h2>
                <p style={{ color: '#475569', fontSize: '0.95rem' }}>Acquire check query credits and start optimizing catalog variation rates.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '1150px', margin: '0 auto 5rem auto' }}>
                
                {/* Starter Plan - ₹99 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#64748b' }}>Starter</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a' }}>₹99</div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>For small sellers</div>
                    </div>
                    <hr style={{ opacity: 0.1, margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> <strong>40 Credits</strong> (60% More!)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 30 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> HD Badges & Borders</li>
                    </ul>
                    <button 
                        style={{ width: '100%', padding: '0.65rem', background: '#ffffff', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' }}
                        onClick={onRegister}
                    >
                        Buy Now
                    </button>
                </div>

                {/* Growth Plan - ₹299 (Best Value) */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '2px solid #2563eb', position: 'relative', background: '#ffffff', boxShadow: '0 10px 30px rgba(37, 99, 235, 0.15)', borderRadius: '16px' }}>
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.75rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Best Value</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#2563eb' }}>Growth</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a' }}>₹299</div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>For growing businesses</div>
                    </div>
                    <hr style={{ opacity: 0.1, margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> <strong>150 Credits</strong> (50% More!)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 45 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Multi-Badge Combinations</li>
                    </ul>
                    <button 
                        style={{ width: '100%', padding: '0.7rem', background: '#2563eb', border: 'none', color: '#ffffff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}
                        onClick={onRegister}
                    >
                        Buy Now
                    </button>
                </div>

                {/* Pro Plan - ₹599 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#64748b' }}>Pro</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a' }}>₹599</div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>For high volume</div>
                    </div>
                    <hr style={{ opacity: 0.1, margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> <strong>350 Credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 60 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Dual Seal Stamp Combo</li>
                    </ul>
                    <button 
                        style={{ width: '100%', padding: '0.65rem', background: '#ffffff', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' }}
                        onClick={onRegister}
                    >
                        Buy Now
                    </button>
                </div>

                {/* Enterprise Plan - ₹999 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#64748b' }}>Enterprise</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a' }}>₹999</div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>Best value for agencies</div>
                    </div>
                    <hr style={{ opacity: 0.1, margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> <strong>750 Credits</strong> (50% More!)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 90 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 24/7 Priority Support</li>
                    </ul>
                    <button 
                        style={{ width: '100%', padding: '0.65rem', background: '#ffffff', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' }}
                        onClick={onRegister}
                    >
                        Buy Now
                    </button>
                </div>

            </div>

            {/* Affiliate Program Section */}
            <div style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '5rem', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="panel-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', padding: '2.5rem', background: '#ffffff', border: '1px solid #cbd5e1' }}>
                    <div>
                        <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Affiliate Partnership</div>
                        <h3 style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                            Earn 33% Lifetime Commission on Referred Purchases
                        </h3>
                        <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                            Share your unique link with e-commerce sellers. Earn standard query credits when they buy plans, and give them 5 extra credits upon signup.
                        </p>
                    </div>
                    <button 
                        style={{ background: '#2563eb', border: 'none', color: '#ffffff', padding: '0.85rem 2rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}
                        onClick={onRegister}
                    >
                        Join Affiliate Program
                    </button>
                </div>
            </div>

        </div>
    );
}
