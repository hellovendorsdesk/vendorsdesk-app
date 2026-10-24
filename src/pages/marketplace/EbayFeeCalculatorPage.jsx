import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, ArrowRight, DollarSign, Percent, ShieldCheck } from 'lucide-react';
import { EBAY_CATEGORIES, calculateEbayFeesDetailed } from '../../services/marketplace/ebayService';

export default function EbayFeeCalculatorPage() {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(49.99);
    const [shippingCharged, setShippingCharged] = useState(5.00);
    const [itemCost, setItemCost] = useState(15.00);
    const [actualShippingCost, setActualShippingCost] = useState(6.50);
    const [hasStore, setHasStore] = useState(false);
    const [promotedAdRate, setPromotedAdRate] = useState(3.0);
    const [isInternational, setIsInternational] = useState(false);

    const calculation = useMemo(() => calculateEbayFeesDetailed({
        categoryIndex,
        categories: EBAY_CATEGORIES,
        sellingPrice,
        shippingCharged,
        itemCost,
        actualShippingCost,
        hasStore,
        promotedAdRate,
        isInternational
    }), [categoryIndex, sellingPrice, shippingCharged, itemCost, actualShippingCost, hasStore, promotedAdRate, isInternational]);

    const {
        cat,
        totalBuyerPaid,
        fvfRate,
        fvfPercentageAmount,
        fixedOrderFee,
        totalFvf,
        promotedAdFee,
        intlFee,
        totalEbayFees,
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
                <a href="/ebay" style={{ color: '#60a5fa', textDecoration: 'none' }}>eBay Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>Fee &amp; Profit Calculator</span>
            </nav>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#fbbf24" />
                    <span>Updated for 2026 eBay Final Value Fee (FVF) Schedule</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    eBay Fee &amp; Net Profit Margin Calculator
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '750px', margin: 0, lineHeight: '1.6' }}>
                    Accurately calculate eBay Final Value Fees (12.35%–15%), fixed $0.30 transaction costs, Promoted Listings ad spend, and net bank payout before listing.
                </p>
            </div>

            {/* Main Interactive Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                {/* Inputs Card */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calculator size={18} color="#60a5fa" />
                        <span>Listing &amp; Pricing Variables</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Product Category</label>
                            <select
                                value={categoryIndex}
                                onChange={(e) => setCategoryIndex(Number(e.target.value))}
                                style={{ width: '100%', boxSizing: 'border-box', background: '#171f30', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.92rem', outline: 'none' }}
                            >
                                {CATEGORIES.map((c, i) => (
                                    <option key={c.name} value={i}>
                                        {c.name} ({hasStore ? c.feeStore : c.feeNonStore}%)
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Selling Price ($)</label>
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
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Item Cost / COGS ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={itemCost}
                                    onChange={(e) => setItemCost(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Actual Postage Cost ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={actualShippingCost}
                                    onChange={(e) => setActualShippingCost(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Promoted Ad Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={promotedAdRate}
                                    onChange={(e) => setPromotedAdRate(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.4rem', paddingTop: '0.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: '#ffffff', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={hasStore}
                                        onChange={(e) => setHasStore(e.target.checked)}
                                    />
                                    <span>eBay Store Subscriber</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: '#ffffff', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={isInternational}
                                        onChange={(e) => setIsInternational(e.target.checked)}
                                    />
                                    <span>International Buyer (1.65%)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outputs Card */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                                Net Profit Per Sale
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: netProfit >= 0 ? '#34d399' : '#ef4444' }}>
                                ${netProfit.toFixed(2)}
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                                Bank Payout: <strong style={{ color: '#ffffff' }}>${netPayout.toFixed(2)}</strong> (after ${totalEbayFees.toFixed(2)} fees)
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: marginPercent >= 20 ? '#34d399' : '#f59e0b' }}>
                                {marginPercent}%
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Net Margin</div>
                            <div style={{ fontSize: '0.78rem', color: '#60a5fa', fontWeight: 700, marginTop: '0.2rem' }}>ROI: {roiPercent}%</div>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
                        Deductions &amp; Fee Breakdown
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>Final Value Fee ({fvfRate}%)</span>
                            <span style={{ color: '#ef4444' }}>- ${fvfPercentageAmount.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                            <span>Order Fixed Insertion Fee</span>
                            <span style={{ color: '#ef4444' }}>- ${fixedOrderFee.toFixed(2)}</span>
                        </div>
                        {promotedAdFee > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                                <span>Promoted Listings Ad Fee ({promotedAdRate}%)</span>
                                <span style={{ color: '#ef4444' }}>- ${promotedAdFee.toFixed(2)}</span>
                            </div>
                        )}
                        {intlFee > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                                <span>International Fee (1.65%)</span>
                                <span style={{ color: '#ef4444' }}>- ${intlFee.toFixed(2)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: 700, paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <span>Total eBay Deductions</span>
                            <span style={{ color: '#ef4444' }}>- ${totalEbayFees.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', paddingTop: '0.25rem' }}>
                            <span>Product &amp; Postage Expenses</span>
                            <span style={{ color: '#94a3b8' }}>- ${totalSellerCosts.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
