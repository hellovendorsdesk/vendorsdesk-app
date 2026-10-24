import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, ArrowRight, DollarSign, Percent, ShieldCheck } from 'lucide-react';
import { calculateEtsyProfitDetailed } from '../../services/marketplace/etsyService';

export default function EtsyProfitCalculatorPage() {
    const [sellingPrice, setSellingPrice] = useState(38.00);
    const [shippingCharged, setShippingCharged] = useState(4.50);
    const [itemCost, setItemCost] = useState(9.00);
    const [packagingPostage, setPackagingPostage] = useState(4.00);
    const [offsiteAdsEnabled, setOffsiteAdsEnabled] = useState(false);
    const [salesTier, setSalesTier] = useState('under10k'); // 'under10k' (15%) or 'over10k' (12%)
    const [renewalCount, setRenewalCount] = useState(1); // 1 = $0.20

    const calculation = useMemo(() => calculateEtsyProfitDetailed({
        sellingPrice,
        shippingCharged,
        itemCost,
        packagingPostage,
        offsiteAdsEnabled,
        salesTier,
        renewalCount
    }), [sellingPrice, shippingCharged, itemCost, packagingPostage, offsiteAdsEnabled, salesTier, renewalCount]);

    const {
        totalBuyerPaid,
        listingFee,
        transactionFee,
        paymentProcessingFee,
        regulatoryFee,
        offsiteAdFee,
        totalEtsyFees,
        totalSellerCosts,
        netPayout,
        netProfit,
        marginPercent,
        roiPercent
    } = calculation;

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/etsy" style={{ color: '#f472b6', textDecoration: 'none' }}>Etsy Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>Profit &amp; Fee Calculator</span>
            </nav>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#f472b6" />
                    <span>Updated for 2026 Etsy Fee &amp; Payment Processing Schedule</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    Etsy Profit &amp; Seller Fee Calculator
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '750px', margin: 0, lineHeight: '1.6' }}>
                    Calculate exact $0.20 listing renewals, 6.5% transaction fees, 3% + $0.25 payment processing, and Offsite Ads (12%–15%) to protect your artisan margins.
                </p>
            </div>

            {/* Main Interactive Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                {/* Inputs Card */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calculator size={18} color="#f472b6" />
                        <span>Product &amp; Pricing Variables</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Listing Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={sellingPrice}
                                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Shipping Charged ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={shippingCharged}
                                    onChange={(e) => setShippingCharged(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Raw Materials / Sourcing ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={itemCost}
                                    onChange={(e) => setItemCost(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Packaging &amp; Actual Postage ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={packagingPostage}
                                    onChange={(e) => setPackagingPostage(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#ffffff', cursor: 'pointer', marginBottom: '0.65rem' }}>
                                <input
                                    type="checkbox"
                                    checked={offsiteAdsEnabled}
                                    onChange={(e) => setOffsiteAdsEnabled(e.target.checked)}
                                />
                                <strong>Order attributed to Etsy Offsite Ads</strong>
                            </label>

                            {offsiteAdsEnabled && (
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#cbd5e1', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="salesTier"
                                            checked={salesTier === 'under10k'}
                                            onChange={() => setSalesTier('under10k')}
                                        />
                                        <span>Shop Sales &lt; $10k/yr (15%)</span>
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#cbd5e1', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="salesTier"
                                            checked={salesTier === 'over10k'}
                                            onChange={() => setSalesTier('over10k')}
                                        />
                                        <span>Shop Sales &gt; $10k/yr (12%)</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Outputs Card */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                                Net Profit Realization
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: netProfit >= 0 ? '#34d399' : '#ef4444' }}>
                                ${netProfit.toFixed(2)}
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                                Bank Payout: <strong style={{ color: '#ffffff' }}>${netPayout.toFixed(2)}</strong> (after ${totalEtsyFees.toFixed(2)} fees)
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: marginPercent >= 25 ? '#34d399' : '#f59e0b' }}>
                                {marginPercent}%
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Net Margin</div>
                            <div style={{ fontSize: '0.78rem', color: '#f472b6', fontWeight: 700, marginTop: '0.2rem' }}>ROI: {roiPercent}%</div>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
                        Etsy Fee Deductions Breakdown
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>Listing &amp; Auto-Renewal Fee</span>
                            <span style={{ color: '#ef4444' }}>- ${listingFee.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>Transaction Fee (6.5%)</span>
                            <span style={{ color: '#ef4444' }}>- ${transactionFee.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>Payment Processing (3% + $0.25)</span>
                            <span style={{ color: '#ef4444' }}>- ${paymentProcessingFee.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>Regulatory Operating Fee (~0.35%)</span>
                            <span style={{ color: '#ef4444' }}>- ${regulatoryFee.toFixed(2)}</span>
                        </div>
                        {offsiteAdFee > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                                <span>Offsite Ads Fee ({salesTier === 'under10k' ? '15%' : '12%'})</span>
                                <span style={{ color: '#ef4444' }}>- ${offsiteAdFee.toFixed(2)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: 700, paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <span>Total Marketplace Fees</span>
                            <span style={{ color: '#ef4444' }}>- ${totalEtsyFees.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', paddingTop: '0.25rem' }}>
                            <span>Maker Materials &amp; Postage</span>
                            <span style={{ color: '#94a3b8' }}>- ${totalSellerCosts.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
