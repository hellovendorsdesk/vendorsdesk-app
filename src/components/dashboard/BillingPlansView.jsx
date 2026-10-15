import React from 'react';
import { CreditCard, Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';

const PLANS = [
    {
        id: 'tier_99',
        name: 'Starter',
        price: '₹99',
        credits: '40 Credits',
        validity: '30 Days',
        icon: Zap,
        highlight: 'Adds 40 Credits (30 Days)'
    },
    {
        id: 'tier_299',
        name: 'Growth (Best Value)',
        price: '₹299',
        credits: '150 Credits',
        validity: '45 Days',
        icon: Sparkles,
        highlight: 'Adds 150 Credits (45 Days)',
        popular: true
    },
    {
        id: 'tier_599',
        name: 'Pro',
        price: '₹599',
        credits: '350 Credits',
        validity: '60 Days',
        icon: Shield,
        highlight: 'Adds 350 Credits (60 Days)'
    },
    {
        id: 'tier_999',
        name: 'Enterprise',
        price: '₹999',
        credits: '750 Credits',
        validity: '90 Days',
        icon: Crown,
        highlight: 'Adds 750 Credits (90 Days)'
    }
];

export default function BillingPlansView({
    selectedPlan,
    setSelectedPlan,
    couponCode,
    setCouponCode,
    couponMessage,
    couponError,
    isApplyingCoupon,
    handleApplyCoupon,
    submittingPlanId,
    billingError,
    billingSuccess,
    handleSubscribe
}) {
    return (
        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '20px' }}>
            <div>
                <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Account Upgrade Tiers
                </h2>
                <p style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                    Choose your plan to acquire query credits and start optimizing catalog variation rates.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const Icon = plan.icon;
                    return (
                        <div 
                            key={plan.id}
                            className="plan-card" 
                            style={{
                                borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                                background: isSelected ? 'rgba(37, 99, 235, 0.05)' : '#ffffff',
                                borderRadius: '16px',
                                padding: '1.35rem',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.65rem',
                                border: `2px solid ${isSelected ? '#2563eb' : '#e2e8f0'}`,
                                transition: 'all 0.2s ease',
                                position: 'relative'
                            }}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '12px',
                                    background: '#2563eb',
                                    color: '#ffffff',
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    padding: '0.2rem 0.55rem',
                                    borderRadius: '6px',
                                    letterSpacing: '0.04em'
                                }}>
                                    MOST POPULAR
                                </span>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Icon size={18} color="#2563eb" />
                                    <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{plan.name}</strong>
                                </div>
                                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2563eb' }}>{plan.price}</span>
                            </div>
                            <span style={{ fontSize: '0.825rem', color: '#64748b' }}>
                                ⚡ Adds <strong>{plan.credits}</strong> ({plan.validity})
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Coupon Section */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <input 
                    type="text" 
                    placeholder="Enter Coupon (e.g. WELCOME50)" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    disabled={isApplyingCoupon || !!submittingPlanId}
                    style={{ flex: 1, textTransform: 'uppercase', padding: '0.65rem 1rem', borderRadius: '10px' }}
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
            {couponMessage && <div style={{ color: 'var(--success, #10b981)', fontSize: '0.85rem' }}>{couponMessage}</div>}
            {couponError && <div style={{ color: 'var(--danger, #ef4444)', fontSize: '0.85rem' }}>{couponError}</div>}

            {billingError && <div style={{ color: 'var(--danger, #ef4444)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{billingError}</div>}
            {billingSuccess && <div style={{ color: 'var(--success, #10b981)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{billingSuccess}</div>}

            <button 
                className="btn-submit-form" 
                disabled={!!submittingPlanId}
                onClick={() => handleSubscribe()} 
                style={{ 
                    marginTop: '0.5rem',
                    padding: '0.85rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
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
                        <span>Connecting to Cashfree Gateway...</span>
                    </>
                ) : (
                    'Pay & Upgrade Subscription'
                )}
            </button>
        </div>
    );
}
