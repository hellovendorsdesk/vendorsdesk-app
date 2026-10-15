import React from 'react';
import { Check, Sparkles, ArrowRight, Gift } from 'lucide-react';

export default function PricingAffiliatePage({ onRegister }) {
    return (
        <div style={{ padding: 'clamp(2rem, 5vw, 4rem) 1.25rem', maxWidth: '1150px', margin: '0 auto', boxSizing: 'border-box' }}>
            
            {/* Pricing Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#1d4ed8',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem'
                }}>
                    <Sparkles size={13} />
                    <span>Transparent Pricing</span>
                </div>
                <h2 style={{ fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                    Simple, Credit-Based Plans
                </h2>
                <p style={{ color: '#64748b', fontSize: 'clamp(0.85rem, 2vw, 1rem)', maxWidth: '500px', margin: '0 auto' }}>
                    Acquire query credits and start optimizing catalog variation rates and freight slabs.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
                
                {/* Starter Plan - ₹99 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#64748b' }}>Starter</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>₹99</div>
                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>For small sellers testing catalog checks</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> <strong>40 Credits</strong> (Instant)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> 30 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> HD Badges &amp; Borders</li>
                    </ul>
                    <button 
                        className="btn-action"
                        style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
                        onClick={onRegister}
                    >
                        Buy Starter
                    </button>
                </div>

                {/* Growth Plan - ₹299 (Best Value) */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '2px solid #2563eb', position: 'relative', background: '#ffffff', boxShadow: '0 10px 30px rgba(37, 99, 235, 0.12)', borderRadius: '18px' }}>
                    <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.75rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Best Value</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#2563eb' }}>Growth</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>₹299</div>
                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>For growing e-commerce sellers</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> <strong>150 Credits</strong> (50% More)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> 45 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> Freight Slab Audit Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> Multi-Variation Combinations</li>
                    </ul>
                    <button 
                        className="btn-primary"
                        style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
                        onClick={onRegister}
                    >
                        Buy Growth
                    </button>
                </div>

                {/* Pro Plan - ₹599 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#64748b' }}>Pro</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>₹599</div>
                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>For high volume warehouse operations</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> <strong>350 Credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> 60 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> Batch PDF Label Cropper</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> Dual Seal Stamp Combo</li>
                    </ul>
                    <button 
                        className="btn-action"
                        style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
                        onClick={onRegister}
                    >
                        Buy Pro
                    </button>
                </div>

                {/* Enterprise Plan - ₹999 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#64748b' }}>Enterprise</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>₹999</div>
                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Best for agencies &amp; multi-brands</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> <strong>750 Credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> 90 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> Highest Round-Robin Priority</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Check size={15} color="#2563eb" /> 24/7 Priority Support</li>
                    </ul>
                    <button 
                        className="btn-action"
                        style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
                        onClick={onRegister}
                    >
                        Buy Enterprise
                    </button>
                </div>

            </div>

            {/* Affiliate Program Section */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '3.5rem' }}>
                <div className="panel-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', padding: 'clamp(1.5rem, 4vw, 2.5rem)', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px' }}>
                    <div style={{ flex: '1 1 300px', minWidth: '260px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#2563eb', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.5rem', background: '#eff6ff', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                            <Gift size={13} />
                            <span>Affiliate Partnership</span>
                        </div>
                        <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.7rem)', fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
                            Earn 33% Lifetime Commission on Referred Purchases
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                            Share your link with fellow sellers. Earn credits and payouts on every subscription, plus give your referrals 5 free bonus credits.
                        </p>
                    </div>
                    <button 
                        className="btn-primary"
                        style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem' }}
                        onClick={onRegister}
                    >
                        <span>Join Affiliate Program</span>
                        <ArrowRight size={15} />
                    </button>
                </div>
            </div>

        </div>
    );
}
