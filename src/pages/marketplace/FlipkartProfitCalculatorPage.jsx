// src/pages/marketplace/FlipkartProfitCalculatorPage.jsx - Pure UI Presentation
import React, { useState, useMemo } from 'react';
import { Calculator, Percent, Sparkles } from 'lucide-react';
import { calculateFlipkartProfit } from '../../services/marketplace/flipkartService';

export default function FlipkartProfitCalculatorPage({ onRegister }) {
    const [category, setCategory] = useState('fashion');
    const [sellingPrice, setSellingPrice] = useState(799);
    const [cogs, setCogs] = useState(220);
    const [packagingCost, setPackagingCost] = useState(15);
    const [shippingZone, setShippingZone] = useState('National');
    const [weightGrams, setWeightGrams] = useState(450);

    // Call pure decoupled domain service
    const results = useMemo(() => {
        const totalCost = Number(cogs) + Number(packagingCost);
        return calculateFlipkartProfit({
            sellPrice: Number(sellingPrice),
            itemCost: totalCost,
            category: category === 'fashion' ? 'Clothing' : category === 'footwear' ? 'Footwear' : 'Electronics',
            shippingZone,
            weightGrams: Number(weightGrams)
        });
    }, [category, sellingPrice, cogs, packagingCost, shippingZone, weightGrams]);

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem 1.25rem 4rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/flipkart" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Flipkart Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>Profit &amp; Fee Calculator</span>
            </nav>

            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#60a5fa" />
                    <span>Updated for 2026 Flipkart Rate Card</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.75rem 0' }}>
                    Flipkart Supplier Commission &amp; Net Profit Calculator
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Calculate commission tiers, fixed closing fees, collection charges, shipping slab rates, and 18% GST deductions.
                </p>
            </div>

            {/* Main Interactive Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                {/* Inputs */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <Calculator size={18} color="#60a5fa" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Listing Variables</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                            >
                                <option value="fashion" style={{ background: '#0d121f' }}>Fashion &amp; Apparel (12%)</option>
                                <option value="footwear" style={{ background: '#0d121f' }}>Footwear (11%)</option>
                                <option value="electronics" style={{ background: '#0d121f' }}>Electronics (8%)</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Selling Price (₹)</label>
                                <input
                                    type="number"
                                    value={sellingPrice}
                                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Product Sourcing (₹)</label>
                                <input
                                    type="number"
                                    value={cogs}
                                    onChange={(e) => setCogs(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Shipping Zone</label>
                                <select
                                    value={shippingZone}
                                    onChange={(e) => setShippingZone(e.target.value)}
                                    style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                >
                                    <option value="Local" style={{ background: '#0d121f' }}>Local (₹44)</option>
                                    <option value="Zonal" style={{ background: '#0d121f' }}>Zonal (₹56)</option>
                                    <option value="National" style={{ background: '#0d121f' }}>National (₹72)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Weight (Grams)</label>
                                <input
                                    type="number"
                                    value={weightGrams}
                                    onChange={(e) => setWeightGrams(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outputs Card */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <Percent size={18} color="#10b981" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Net Payout Breakdown</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '1.25rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Net Profit</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: results.netProfit >= 0 ? '#10b981' : '#ef4444' }}>
                                ₹{results.netProfit}
                            </div>
                        </div>
                        <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '14px', padding: '1.25rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Profit Margin</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: results.profitMargin >= 0 ? '#60a5fa' : '#ef4444' }}>
                                {results.profitMargin}%
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>Commission:</span>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>₹{results.commission}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>Fixed Closing Fee:</span>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>₹{results.fixedFee}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>Shipping Fee:</span>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>₹{results.shippingFee}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>18% GST on Fees:</span>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>₹{results.gstOnFees}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.65rem' }}>
                            <span style={{ fontWeight: 700, color: '#ffffff' }}>Total Deductions:</span>
                            <span style={{ fontWeight: 700, color: '#ef4444' }}>-₹{results.totalFlipkartDeductions}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
