import React from 'react';
import { Check, ArrowRight, Gift, CreditCard } from 'lucide-react';

export default function PricingAffiliatePage({ onRegister }) {
    return (
        <div style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem', maxWidth: '1150px', margin: '0 auto', boxSizing: 'border-box' }}>
            
            {/* Pricing Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.22)',
                    color: '#38bdf8',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    marginBottom: '0.75rem'
                }}>
                    <CreditCard size={13} color="#38bdf8" />
                    <span>Usage credits</span>
                </div>
                <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, marginBottom: '0.5rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
                    Credit-based plans
                </h2>
                <p style={{ color: '#94a3b8', fontSize: 'clamp(0.88rem, 1.8vw, 1rem)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
                    Acquire query credits to audit courier shipping slabs, crop thermal labels, and generate catalog variations.
                </p>
            </div>

            {/* 4-Tier Pricing Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
                
                {/* Starter Plan - ₹99 */}
                <div className="panel-card" style={{
                    padding: '1.75rem 1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '16px'
                }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#94a3b8' }}>Starter</div>
                    <div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>₹99</div>
                        <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.35rem' }}>For testing initial catalog checks</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.06)', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.825rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> <strong style={{ color: '#ffffff' }}>40 credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> 30 days validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> Shipping slab engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> Badges and borders</li>
                    </ul>
                    <button 
                        className="btn-action"
                        style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
                        onClick={onRegister}
                    >
                        Choose Starter
                    </button>
                </div>

                {/* Growth Plan - ₹299 (Most Popular) */}
                <div className="panel-card" style={{
                    padding: '1.75rem 1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '16px',
                    border: '1px solid #38bdf8',
                    background: '#12192a',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#38bdf8',
                        color: '#080b11',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.65rem',
                        borderRadius: '4px'
                    }}>
                        Most popular
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#38bdf8' }}>Growth</div>
                    <div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>₹299</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.35rem' }}>For active sellers scaling variation volume</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(56, 189, 248, 0.2)', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.825rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> <strong style={{ color: '#ffffff' }}>150 credits</strong> (50% bonus)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> 45 days validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> Freight slab audit engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> 4×6 label PDF export</li>
                    </ul>
                    <button 
                        className="btn-primary"
                        style={{
                            width: '100%',
                            marginTop: 'auto',
                            justifyContent: 'center'
                        }}
                        onClick={onRegister}
                    >
                        Choose Growth
                    </button>
                </div>

                {/* Pro Plan - ₹599 */}
                <div className="panel-card" style={{
                    padding: '1.75rem 1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '16px'
                }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#94a3b8' }}>Pro</div>
                    <div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>₹599</div>
                        <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.35rem' }}>For high-volume multi-account suppliers</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.06)', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.825rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> <strong style={{ color: '#ffffff' }}>350 credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> 60 days validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> Priority queue processing</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> Direct WhatsApp support</li>
                    </ul>
                    <button 
                        className="btn-action"
                        style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
                        onClick={onRegister}
                    >
                        Choose Pro
                    </button>
                </div>

                {/* Enterprise Plan - ₹999 */}
                <div className="panel-card" style={{
                    padding: '1.75rem 1.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '16px'
                }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#94a3b8' }}>Enterprise</div>
                    <div>
                        <div style={{ fontSize: '2.25rem', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>₹999</div>
                        <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.35rem' }}>For brand aggregators and agencies</div>
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.06)', margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.825rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> <strong style={{ color: '#ffffff' }}>750 credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> 90 days validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> Highest priority processing</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#38bdf8" /> Dedicated support manager</li>
                    </ul>
                    <button 
                        className="btn-action"
                        style={{ width: '100%', marginTop: 'auto', justifyContent: 'center' }}
                        onClick={onRegister}
                    >
                        Choose Enterprise
                    </button>
                </div>

            </div>

            {/* Affiliate Program Section */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '3rem' }}>
                <div className="panel-card" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                    borderRadius: '16px'
                }}>
                    <div style={{ flex: '1 1 300px', minWidth: '260px' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            color: '#38bdf8',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            marginBottom: '0.65rem',
                            background: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid rgba(56, 189, 248, 0.22)',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '9999px'
                        }}>
                            <Gift size={13} color="#38bdf8" />
                            <span>Affiliate program</span>
                        </div>
                        <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, marginBottom: '0.45rem', color: '#ffffff' }}>
                            Earn 33% commission on referred purchases
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                            Share your referral link with fellow sellers. Earn credit commissions on every purchase, plus give referees 5 bonus credits.
                        </p>
                    </div>
                    <button 
                        className="btn-primary"
                        style={{
                            padding: '0.7rem 1.5rem',
                            fontSize: '0.9rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.45rem'
                        }}
                        onClick={onRegister}
                    >
                        <span>Join affiliate program</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>

        </div>
    );
}
