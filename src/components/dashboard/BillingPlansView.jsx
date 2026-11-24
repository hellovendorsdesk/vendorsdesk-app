import React from 'react';
import { CreditCard, Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';

const PLANS = [
    {
        id: 'tier_99',
        name: 'Starter',
        price: '₹99',
        credits: '40 credits',
        validity: '30 days',
        icon: Zap,
        highlight: 'Adds 40 credits (30 days)'
    },
    {
        id: 'tier_299',
        name: 'Growth',
        price: '₹299',
        credits: '150 credits',
        validity: '45 days',
        icon: Sparkles,
        highlight: 'Adds 150 credits (45 days)',
        popular: true
    },
    {
        id: 'tier_599',
        name: 'Pro',
        price: '₹599',
        credits: '350 credits',
        validity: '60 days',
        icon: Shield,
        highlight: 'Adds 350 credits (60 days)'
    },
    {
        id: 'tier_999',
        name: 'Enterprise',
        price: '₹999',
        credits: '750 credits',
        validity: '90 days',
        icon: Crown,
        highlight: 'Adds 750 credits (90 days)'
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
        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '16px' }}>
            <div>
                <h2 style={{ fontSize: '1.5rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                    Usage credit plans
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    Acquire query credits to audit shipping slabs and generate catalog variations.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '0.25rem' }}>
                {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    const Icon = plan.icon;
                    return (
                        <div 
                            key={plan.id}
                            className="plan-card" 
                            style={{
                                borderColor: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
                                background: isSelected ? 'rgba(56, 189, 248, 0.06)' : '#141a29',
                                borderRadius: '12px',
                                padding: '1.25rem',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.65rem',
                                border: `1px solid ${isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'}`,
                                transition: 'all 0.15s ease',
                                position: 'relative'
                            }}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-9px',
                                    right: '12px',
                                    background: '#38bdf8',
                                    color: '#080b11',
                                    fontSize: '0.62rem',
                                    fontWeight: 600,
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '4px'
                                }}>
                                    Most popular
                                </span>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                    <Icon size={16} color="#38bdf8" />
                                    <strong style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 600 }}>{plan.name}</strong>
                                </div>
                                <span style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff' }}>{plan.price}</span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                Adds <strong style={{ color: '#ffffff' }}>{plan.credits}</strong> ({plan.validity})
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Coupon Section */}
            <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.25rem' }}>
                <input 
                    type="text" 
                    placeholder="Coupon code (optional)" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    disabled={isApplyingCoupon || !!submittingPlanId}
                    style={{ flex: 1, textTransform: 'uppercase' }}
                />
                <button 
                    className="btn-action" 
                    disabled={isApplyingCoupon || !!submittingPlanId || !couponCode}
                    style={{ padding: '0 1.25rem', whiteSpace: 'nowrap', opacity: (isApplyingCoupon || !!submittingPlanId || !couponCode) ? 0.5 : 1 }} 
                    onClick={handleApplyCoupon}
                >
                    {isApplyingCoupon ? 'Applying...' : 'Apply coupon'}
                </button>
            </div>
            {couponMessage && <div style={{ color: '#10b981', fontSize: '0.825rem' }}>{couponMessage}</div>}
            {couponError && <div style={{ color: '#f87171', fontSize: '0.825rem' }}>{couponError}</div>}

            {billingError && <div style={{ color: '#f87171', fontSize: '0.825rem', marginTop: '0.25rem' }}>{billingError}</div>}
            {billingSuccess && <div style={{ color: '#10b981', fontSize: '0.825rem', marginTop: '0.25rem' }}>{billingSuccess}</div>}

            <button 
                className="btn-primary" 
                disabled={!!submittingPlanId}
                onClick={() => handleSubscribe()} 
                style={{ 
                    marginTop: '0.5rem',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    opacity: submittingPlanId ? 0.75 : 1,
                    cursor: submittingPlanId ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%'
                }}
            >
                {submittingPlanId ? (
                    <>
                        <span style={{ width: '14px', height: '14px', border: '2px solid #080b11', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <span>Connecting to Cashfree gateway...</span>
                    </>
                ) : (
                    'Proceed to checkout'
                )}
            </button>
        </div>
    );
}
