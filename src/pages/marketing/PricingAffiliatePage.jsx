import React from 'react';
import { Check, Sparkles, ArrowRight, Gift } from 'lucide-react';

export default function PricingAffiliatePage({ onRegister }) {
    return (
        <div style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 1.25rem', maxWidth: '1150px', margin: '0 auto', boxSizing: 'border-box' }}>
            
            {/* Pricing Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.22)',
                    color: '#38bdf8',
                    padding: '0.35rem 0.95rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: '1rem',
                    boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)'
                }}>
                    <Sparkles size={13} color="#38bdf8" />
                    <span>TRANSPARENT USAGE CREDITS</span>
                </div>
                <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4.5vw, 2.75rem)', fontWeight: 800, marginBottom: '0.75rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                    Simple, Credit-Based Plans
                </h2>
                <p style={{ color: '#94a3b8', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                    Acquire query credits and optimize catalog variation rates, bypass duplicate image bans, and audit courier freight slabs.
                </p>
            </div>

            {/* 4-Tier Hardware Bento Pricing Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '4.5rem' }}>
                
                {/* Starter Plan - ₹99 */}
                <div style={{
                    padding: '2rem 1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.15rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.4)',
                    boxSizing: 'border-box'
                }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#94a3b8', letterSpacing: '0.02em' }}>Starter</div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', lineHeight: 1 }}>₹99</div>
                        <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.4rem' }}>For small sellers testing catalog checks</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.06)', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.85rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> <strong style={{ color: '#ffffff' }}>40 Credits</strong> (Instant)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> 30 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> HD Badges &amp; Borders</li>
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
                <div style={{
                    padding: '2rem 1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.15rem',
                    background: 'rgba(56, 189, 248, 0.03)',
                    border: '1px solid #38bdf8',
                    borderRadius: '20px',
                    position: 'relative',
                    boxShadow: '0 0 35px rgba(56, 189, 248, 0.15), inset 0 1px 0 rgba(56, 189, 248, 0.3)',
                    boxSizing: 'border-box'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#38bdf8',
                        color: '#080b11',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.85rem',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        boxShadow: '0 2px 10px rgba(56, 189, 248, 0.4)'
                    }}>
                        Best Value
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#38bdf8', letterSpacing: '0.02em' }}>Growth</div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', lineHeight: 1 }}>₹299</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.4rem' }}>For active sellers scaling variation volume</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(56, 189, 248, 0.15)', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.85rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> <strong style={{ color: '#ffffff' }}>150 Credits</strong> (50% More)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> 45 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> Freight Slab Audit Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> Multi-Variation Combinations</li>
                    </ul>
                    <button 
                        className="btn-primary"
                        style={{
                            width: '100%',
                            marginTop: 'auto',
                            justifyContent: 'center',
                            background: '#ffffff',
                            color: '#080b11',
                            fontWeight: 800,
                            boxShadow: '0 0 25px rgba(255, 255, 255, 0.25)'
                        }}
                        onClick={onRegister}
                    >
                        Buy Growth
                    </button>
                </div>

                {/* Pro Plan - ₹599 */}
                <div style={{
                    padding: '2rem 1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.15rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.4)',
                    boxSizing: 'border-box'
                }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#94a3b8', letterSpacing: '0.02em' }}>Pro</div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', lineHeight: 1 }}>₹599</div>
                        <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.4rem' }}>For high volume warehouse operations</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.06)', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.85rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> <strong style={{ color: '#ffffff' }}>350 Credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> 60 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> Batch PDF Label Cropper</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> Dual Seal Stamp Combo</li>
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
                <div style={{
                    padding: '2rem 1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.15rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.4)',
                    boxSizing: 'border-box'
                }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#94a3b8', letterSpacing: '0.02em' }}>Enterprise</div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', lineHeight: 1 }}>₹999</div>
                        <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.4rem' }}>Best for agencies &amp; multi-brands</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.06)', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.85rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> <strong style={{ color: '#ffffff' }}>750 Credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> 90 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> Highest Round-Robin Priority</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={15} color="#38bdf8" /> 24/7 Dedicated Slack/WhatsApp</li>
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
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '3.5rem' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    padding: 'clamp(1.75rem, 4vw, 2.75rem)',
                    background: 'linear-gradient(135deg, rgba(13, 18, 31, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                    boxSizing: 'border-box'
                }}>
                    <div style={{ flex: '1 1 300px', minWidth: '260px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            color: '#38bdf8',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginBottom: '0.75rem',
                            background: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid rgba(56, 189, 248, 0.22)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px'
                        }}>
                            <Gift size={13} color="#38bdf8" />
                            <span>Affiliate Partnership</span>
                        </div>
                        <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, marginBottom: '0.65rem', color: '#ffffff' }}>
                            Earn 33% Lifetime Commission on Referred Purchases
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                            Share your link with fellow sellers. Earn recurring credits and payouts on every subscription, plus give your referrals 5 free bonus credits.
                        </p>
                    </div>
                    <button 
                        className="btn-primary"
                        style={{
                            padding: '0.8rem 1.75rem',
                            fontSize: '0.92rem',
                            background: '#ffffff',
                            color: '#080b11',
                            borderRadius: '9999px',
                            fontWeight: 800,
                            boxShadow: '0 0 25px rgba(255, 255, 255, 0.25)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
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
