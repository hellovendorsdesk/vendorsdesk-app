import React from 'react';
import { Users, Percent, Copy, Check } from 'lucide-react';

export default function AffiliateProgramView({
    currentUser,
    copiedText,
    copyReferralLink
}) {
    if (!currentUser) return null;

    return (
        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '16px' }}>
            <div>
                <h2 style={{ fontSize: '1.5rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                    Affiliate program
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    Share your referral code with other sellers. Earn 33% credit bonus when they make their first purchase.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem', margin: '0.25rem 0' }}>
                <div style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>Total referrals</span>
                    <span style={{ color: '#ffffff', fontSize: '1.75rem', fontWeight: 600, display: 'block', fontVariantNumeric: 'tabular-nums' }}>
                        {currentUser.referralsCount || 0}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Sellers signed up</span>
                </div>
                <div style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '12px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>Commission rate</span>
                    <span style={{ color: '#10b981', fontSize: '1.75rem', fontWeight: 600, display: 'block', fontVariantNumeric: 'tabular-nums' }}>
                        33%
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>One-third of referee's first purchase credits</span>
                </div>
            </div>

            <div style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '12px' }}>
                <label style={{ marginBottom: '0.4rem', fontWeight: 500, color: '#f8fafc', fontSize: '0.825rem' }}>Unique referral link</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                        type="text" 
                        readOnly 
                        value={`${window.location.origin}/?ref=${currentUser.referralCode}`} 
                        style={{ background: '#0c0e14', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                    <button 
                        className="btn-primary" 
                        style={{ padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', fontSize: '0.85rem' }} 
                        onClick={copyReferralLink}
                    >
                        {copiedText === 'Copied!' ? <Check size={15} /> : <Copy size={15} />}
                        <span>{copiedText}</span>
                    </button>
                </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                    How it works
                </strong>
                <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li>Copy your unique referral link and send it to other sellers.</li>
                    <li>When they sign up via your link, they receive 5 extra free credits (total 8 credits).</li>
                    <li>When they buy their first plan, you receive 33% of their plan credits as bonus commission.</li>
                    <li>Referral payouts are applied automatically on their first purchase.</li>
                </ol>
            </div>
        </div>
    );
}
