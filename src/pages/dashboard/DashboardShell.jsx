import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { secureFetch } from '../../utils/crypto';
import HomeTab from '../../components/HomeTab';
import OptimizerTab from '../../components/OptimizerTab';
import LabelExporterTab from '../../components/LabelExporterTab';
import CalculatorTab from '../../components/CalculatorTab';
import FreeImageGeneratorTab from '../../components/FreeImageGeneratorTab';
import PnLCalculatorTab from '../../components/PnLCalculatorTab';
import BulkBackgroundRemoverTab from '../../components/BulkBackgroundRemoverTab';

export default function DashboardShell({ activePage, setActivePage, navigateToPage }) {
    const { currentUser, setCurrentUser, handleLogout, checkUserAuth, openSignupModal } = useAuth();

    // Billing Upgrade State
    const [selectedPlan, setSelectedPlan] = useState('tier_299');
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState('');
    const [couponError, setCouponError] = useState('');
    const [billingError, setBillingError] = useState('');
    const [billingSuccess, setBillingSuccess] = useState('');
    const [submittingPlanId, setSubmittingPlanId] = useState(null);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [copiedText, setCopiedText] = useState('Copy');

    const handleApplyCoupon = async () => {
        setCouponError('');
        setCouponMessage('');
        if (!couponCode) return;
        setIsApplyingCoupon(true);

        const token = localStorage.getItem('vendorsdesk_token');
        try {
            const data = await secureFetch('/api/billing/coupon/apply', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { code: couponCode }
            });

            if (data.success) {
                const discount = data.coupon.discountType === 'percentage' 
                    ? `${data.coupon.discountValue}%` 
                    : `₹${data.coupon.discountValue}`;
                setCouponMessage(`Coupon Applied! Discount: ${discount}`);
            } else {
                setCouponError(data.error || 'Invalid coupon.');
            }
        } catch (e) {
            setCouponError('Coupon validation error.');
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const handleSubscribe = async (planToSubscribe) => {
        const targetPlan = planToSubscribe || selectedPlan;
        setBillingError('');
        setBillingSuccess('');
        setSubmittingPlanId(targetPlan);
        const token = localStorage.getItem('vendorsdesk_token');

        if (!token) {
            openSignupModal();
            setSubmittingPlanId(null);
            return;
        }
        
        try {
            const data = await secureFetch('/api/billing/cashfree/create-order', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { plan: targetPlan, couponCode }
            });

            if (data.success && data.paymentSessionId) {
                setBillingSuccess('Redirecting to Cashfree Secure Payment Gateway...');
                
                const triggerCheckout = () => {
                    const cashfree = window.Cashfree({ mode: data.cfEnv === 'PRODUCTION' ? 'production' : 'sandbox' });
                    cashfree.checkout({
                        paymentSessionId: data.paymentSessionId,
                        redirectTarget: '_self'
                    });
                };

                if (!window.Cashfree) {
                    const script = document.createElement('script');
                    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
                    script.onload = triggerCheckout;
                    document.body.appendChild(script);
                } else {
                    triggerCheckout();
                }
                return;
            }

            const fallbackData = await secureFetch('/api/billing/subscribe', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { plan: targetPlan, couponCode }
            });

            if (fallbackData.success) {
                setBillingSuccess(`Upgrade Successful! ${fallbackData.message}`);
                setCouponCode('');
                setCouponMessage('');
                await checkUserAuth();
                setTimeout(() => {
                    setBillingSuccess('');
                    setActivePage('home');
                }, 2000);
            } else {
                setBillingError(data.error || fallbackData.error || 'Subscription failed.');
            }
        } catch (e) {
            console.error('Subscription Error:', e);
            setBillingError('Network subscription failed.');
        } finally {
            setSubmittingPlanId(null);
        }
    };

    const copyReferralLink = () => {
        if (!currentUser) return;
        const refLink = `${window.location.origin}/index.html?ref=${currentUser.referralCode}`;
        navigator.clipboard.writeText(refLink).then(() => {
            setCopiedText('Copied!');
            setTimeout(() => setCopiedText('Copy'), 2000);
        });
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-gradient)', color: 'var(--text-primary)' }}>
            
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: '#ffffff',
                borderRight: '1px solid #cbd5e1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem 1.25rem',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                zIndex: 100,
                overflowY: 'auto'
            }}>
                <div>
                    {/* Brand */}
                    <div 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2.5rem', cursor: 'pointer' }}
                        onClick={() => navigateToPage('home')}
                    >
                        <img src="/logo-icon.png" alt="VendorsDesk Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                            VendorsDesk
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <button 
                            className={`sidebar-link ${activePage === 'home' ? 'active' : ''}`}
                            onClick={() => navigateToPage('home')}
                        >
                            🏠 Home Dashboard
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'bg-remover' ? 'active' : ''}`}
                            onClick={() => navigateToPage('bg-remover')}
                            style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#2563eb', fontWeight: 700 }}
                        >
                            🖼️ Bulk Background Remover
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'free-image-generator' ? 'active' : ''}`}
                            onClick={() => navigateToPage('free-image-generator')}
                        >
                            🆓 Free Image Generator
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'optimizer' ? 'active' : ''}`}
                            onClick={() => navigateToPage('optimizer')}
                        >
                            ⚡ Rate Optimizer
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'pnl-calculator' ? 'active' : ''}`}
                            onClick={() => navigateToPage('pnl-calculator')}
                        >
                            📊 Excel P&L Calculator
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'label-exporter' ? 'active' : ''}`}
                            onClick={() => navigateToPage('label-exporter')}
                        >
                            📋 Label Exporter
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'calculator' ? 'active' : ''}`}
                            onClick={() => navigateToPage('calculator')}
                        >
                            🧮 Margin Calculator
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'billing' ? 'active' : ''}`}
                            onClick={() => navigateToPage('billing')}
                            style={{ position: 'relative' }}
                        >
                            💳 Purchase Plan
                            {currentUser && currentUser.credits <= 0 && (
                                <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#ffffff', fontSize: '0.6rem', padding: '0.15rem 0.4rem', borderRadius: '6px', fontWeight: 800 }}>GET CREDITS</span>
                            )}
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'affiliate' ? 'active' : ''}`}
                            onClick={() => navigateToPage('affiliate')}
                        >
                            👥 Affiliate Program
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'website' ? 'active' : ''}`}
                            onClick={() => navigateToPage('home')}
                            style={{ marginTop: '0.5rem', background: 'rgba(37, 99, 235, 0.06)', border: '1px solid rgba(37, 99, 235, 0.2)', color: '#2563eb', fontWeight: 700 }}
                        >
                            🌐 View Website & Plans
                        </button>
                    </nav>
                </div>

                {/* Profile Section Footer */}
                {currentUser && (
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
                            <div style={{ fontSize: '0.75rem', color: currentUser.credits <= 0 ? '#ef4444' : 'var(--text-secondary)', fontWeight: currentUser.credits <= 0 ? 700 : 400 }}>
                                💎 {currentUser.credits} Credits {currentUser.credits <= 0 && '(0 Remaining)'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#2563eb', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '0.15rem' }}>Tier: {currentUser.tier}</div>
                        </div>
                        <button className="btn-action btn-action-danger" onClick={handleLogout} style={{ width: '100%' }}>Logout</button>
                    </div>
                )}
            </aside>

            {/* Main Area */}
            <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)', flexGrow: 1, padding: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '100%' }}>
                    
                    {/* Top 0-Credits Banner Notice */}
                    {currentUser && currentUser.credits <= 0 && currentUser.tier !== 'enterprise' && activePage !== 'billing' && activePage !== 'website' && (
                        <div style={{
                            background: 'linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)',
                            border: '1px solid #bfdbfe',
                            borderRadius: '14px',
                            padding: '0.9rem 1.25rem',
                            marginBottom: '1.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1.4rem' }}>⚠️</span>
                                <div>
                                    <strong style={{ fontSize: '0.9rem', color: '#1e40af', display: 'block' }}>You have 0 Credits remaining!</strong>
                                    <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>If you want to generate image variations and check lower shipping rates, please purchase a plan.</span>
                                </div>
                            </div>
                            <button 
                                style={{
                                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '10px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                                }}
                                onClick={() => setActivePage('billing')}
                            >
                                💳 Purchase Plan Now
                            </button>
                        </div>
                    )}

                    {/* Render active tabs/pages */}
                    {activePage === 'home' && (
                        <HomeTab onNavigate={(page) => setActivePage(page)} />
                    )}

                    {activePage === 'bg-remover' && (
                        <BulkBackgroundRemoverTab />
                    )}

                    {activePage === 'free-image-generator' && (
                        <FreeImageGeneratorTab onRegister={openSignupModal} />
                    )}

                    {activePage === 'optimizer' && (
                        <div className="main-container">
                            <OptimizerTab 
                                currentUser={currentUser}
                                onCreditsChange={(cr) => setCurrentUser(prev => ({ ...prev, credits: cr }))} 
                                onNavigateToBilling={() => setActivePage('billing')}
                            />
                        </div>
                    )}

                    {activePage === 'pnl-calculator' && (
                        <PnLCalculatorTab />
                    )}

                    {activePage === 'label-exporter' && (
                        <LabelExporterTab 
                            currentUser={currentUser} 
                            onNavigateToBilling={() => setActivePage('billing')} 
                        />
                    )}

                    {activePage === 'calculator' && (
                        <CalculatorTab />
                    )}

                    {activePage === 'billing' && (
                        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>Account Upgrade Tiers</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose your plan to acquire query credits and start optimizing catalog variation rates.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                                {/* Starter Plan - ₹99 */}
                                <div 
                                    className="plan-card" 
                                    style={{
                                        borderColor: selectedPlan === 'tier_99' ? '#2563eb' : '#cbd5e1',
                                        background: selectedPlan === 'tier_99' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                                        borderRadius: '14px',
                                        padding: '1.25rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                    onClick={() => setSelectedPlan('tier_99')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Starter</strong>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹99</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>⚡ Adds <strong>40 Credits</strong> (30 Days)</span>
                                </div>

                                {/* Growth Plan - ₹299 (Best Value) */}
                                <div 
                                    className="plan-card" 
                                    style={{
                                        borderColor: selectedPlan === 'tier_299' ? '#2563eb' : '#cbd5e1',
                                        background: selectedPlan === 'tier_299' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                                        borderRadius: '14px',
                                        padding: '1.25rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                        position: 'relative'
                                    }}
                                    onClick={() => setSelectedPlan('tier_299')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Growth (Best Value)</strong>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹299</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🔥 Adds <strong>150 Credits</strong> (45 Days)</span>
                                </div>

                                {/* Pro Plan - ₹599 */}
                                <div 
                                    className="plan-card" 
                                    style={{
                                        borderColor: selectedPlan === 'tier_599' ? '#2563eb' : '#cbd5e1',
                                        background: selectedPlan === 'tier_599' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                                        borderRadius: '14px',
                                        padding: '1.25rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                    onClick={() => setSelectedPlan('tier_599')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Pro</strong>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹599</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🚀 Adds <strong>350 Credits</strong> (60 Days)</span>
                                </div>

                                {/* Enterprise Plan - ₹999 */}
                                <div 
                                    className="plan-card" 
                                    style={{
                                        borderColor: selectedPlan === 'tier_999' ? '#2563eb' : '#cbd5e1',
                                        background: selectedPlan === 'tier_999' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                                        borderRadius: '14px',
                                        padding: '1.25rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                    onClick={() => setSelectedPlan('tier_999')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Enterprise</strong>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹999</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>👑 Adds <strong>750 Credits</strong> (90 Days)</span>
                                </div>
                            </div>

                            {/* Coupon Section */}
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                                <input 
                                    type="text" 
                                    placeholder="Enter Coupon (e.g. WELCOME50)" 
                                    value={couponCode} 
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    disabled={isApplyingCoupon || !!submittingPlanId}
                                    style={{ flex: 1, textTransform: 'uppercase' }}
                                />
                                <button 
                                    className="btn-action btn-action-primary" 
                                    disabled={isApplyingCoupon || !!submittingPlanId || !couponCode}
                                    style={{ padding: '0 1.5rem', whiteSpace: 'nowrap', opacity: (isApplyingCoupon || !!submittingPlanId || !couponCode) ? 0.6 : 1 }} 
                                    onClick={handleApplyCoupon}
                                >
                                    {isApplyingCoupon ? 'Applying...' : 'Apply Coupon'}
                                </button>
                            </div>
                            {couponMessage && <div style={{ color: 'var(--success)', fontSize: '0.85rem' }}>{couponMessage}</div>}
                            {couponError && <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{couponError}</div>}

                            {billingError && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{billingError}</div>}
                            {billingSuccess && <div style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{billingSuccess}</div>}

                            <button 
                                className="btn-submit-form" 
                                disabled={!!submittingPlanId}
                                onClick={() => handleSubscribe()} 
                                style={{ 
                                    marginTop: '0.5rem',
                                    opacity: submittingPlanId ? 0.75 : 1,
                                    cursor: submittingPlanId ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {submittingPlanId ? (
                                    <>
                                        <span style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                        Connecting to Cashfree Gateway...
                                    </>
                                ) : (
                                    'Pay & Upgrade Subscription'
                                )}
                            </button>
                        </div>
                    )}

                    {activePage === 'affiliate' && currentUser && (
                        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>Affiliate Program</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Share your code with other sellers. Earn substantial credits when they make their first purchase!</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '0.5rem 0' }}>
                                <div className="stat-card" style={{ background: '#f8fafc', border: '1px solid var(--card-border)', padding: '1.25rem' }}>
                                    <span className="stat-label">Total Referrals</span>
                                    <span className="stat-val" style={{ color: '#c084fc', fontSize: '2rem' }}>{currentUser.referralsCount || 0}</span>
                                    <span className="stat-footer">Sellers signed up</span>
                                </div>
                                <div className="stat-card" style={{ background: '#f8fafc', border: '1px solid var(--card-border)', padding: '1.25rem' }}>
                                    <span className="stat-label">Commission Rate</span>
                                    <span className="stat-val" style={{ color: 'var(--success)', fontSize: '2rem' }}>33%</span>
                                    <span className="stat-footer">1/3 of referee's first plan credits</span>
                                </div>
                            </div>

                            <div className="form-group" style={{ background: '#f8fafc', border: '1px solid var(--card-border)', padding: '1.25rem', borderRadius: '12px' }}>
                                <label style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Your Referral Link</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input 
                                        type="text" 
                                        readOnly 
                                        value={`${window.location.origin}/index.html?ref=${currentUser.referralCode}`} 
                                        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--text-secondary)' }}
                                    />
                                    <button className="btn-action" style={{ padding: '0 1.5rem' }} onClick={copyReferralLink}>
                                        {copiedText}
                                    </button>
                                </div>
                            </div>

                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>How it Works:</strong>
                                <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                    <li>Copy your unique referral link and send it to other sellers.</li>
                                    <li>When they sign up via your link, they receive **5 extra free credits** (total 8 free credits).</li>
                                    <li>When they buy their first plan, **you receive 1/3 of their plan's credits** (e.g. they buy Standard 200 credits plan, you receive 66 credits commission).</li>
                                    <li>Referral payouts are one-time per user and apply only on their first purchase.</li>
                                </ol>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
