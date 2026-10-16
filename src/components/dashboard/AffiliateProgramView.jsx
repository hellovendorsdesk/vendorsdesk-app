import React from 'react';
import { Users, Percent, Copy, Check } from 'lucide-react';

export default function AffiliateProgramView({
    currentUser,
    copiedText,
    copyReferralLink
}) {
    if (!currentUser) return null;

    return (
        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '20px' }}>
            <div>
                <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Affiliate Program
                </h2>
                <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                    Share your referral code with other sellers. Earn substantial credits when they make their first purchase!
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.25rem', margin: '0.5rem 0' }}>
                <div className="stat-card" style={{ background: '#f8fafc', border: '1px solid var(--card-border, #e2e8f0)', padding: '1.25rem' }}>
                    <span className="stat-label">Total Referrals</span>
                    <span className="stat-val" style={{ color: '#7c3aed', fontSize: '2rem' }}>
                        {currentUser.referralsCount || 0}
                    </span>
                    <span className="stat-footer">Sellers signed up</span>
                </div>
                <div className="stat-card" style={{ background: '#f8fafc', border: '1px solid var(--card-border, #e2e8f0)', padding: '1.25rem' }}>
                    <span className="stat-label">Commission Rate</span>
                    <span className="stat-val" style={{ color: 'var(--success, #10b981)', fontSize: '2rem' }}>
                        33%
                    </span>
                    <span className="stat-footer">1/3 of referee's first plan credits</span>
                </div>
            </div>

            <div className="form-group" style={{ background: '#f8fafc', border: '1px solid var(--card-border, #e2e8f0)', padding: '1.25rem', borderRadius: '14px' }}>
                <label style={{ marginBottom: '0.5rem', fontWeight: 600, color: '#0f172a' }}>Your Unique Referral Link</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                        type="text" 
                        readOnly 
                        value={`${window.location.origin}/?ref=${currentUser.referralCode}`} 
                        style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: 'var(--text-secondary, #64748b)', padding: '0.65rem 1rem', borderRadius: '10px' }}
                    />
                    <button 
                        className="btn-action btn-action-primary" 
                        style={{ padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }} 
                        onClick={copyReferralLink}
                    >
                        {copiedText === 'Copied!' ? <Check size={16} /> : <Copy size={16} />}
                        <span>{copiedText}</span>
                    </button>
                </div>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #64748b)', lineHeight: '1.6' }}>
                <strong style={{ color: 'var(--text-primary, #0f172a)', display: 'block', marginBottom: '0.5rem' }}>
                    How it Works:
                </strong>
                <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li>Copy your unique referral link and send it to other sellers.</li>
                    <li>When they sign up via your link, they receive <strong>5 extra free credits</strong> (total 8 free credits).</li>
                    <li>When they buy their first plan, <strong>you receive 1/3 of their plan's credits</strong> (e.g. they buy Standard 200 credits plan, you receive 66 credits commission).</li>
                    <li>Referral payouts are one-time per user and apply only on their first purchase.</li>
                </ol>
            </div>
        </div>
    );
}
