// src/pages/marketplace/AmazonFbaCalculatorPage.jsx - Pure UI Presentation
import React, { useState, useMemo } from 'react';
import { Calculator, Package, Percent, DollarSign, Sparkles } from 'lucide-react';
import { calculateAmazonFba } from '../../services/marketplace/amazonService';

export default function AmazonFbaCalculatorPage({ onRegister }) {
    const [category, setCategory] = useState('apparel');
    const [sellingPrice, setSellingPrice] = useState(899);
    const [itemCost, setItemCost] = useState(250);
    const [packagingCost, setPackagingCost] = useState(20);
    const [inboundFreight, setInboundFreight] = useState(15);
    const [weightGrams, setWeightGrams] = useState(450);

    // Call pure decoupled domain service
    const results = useMemo(() => {
        const weightKg = Number(weightGrams) / 1000;
        const totalSourcingCost = Number(itemCost) + Number(packagingCost) + Number(inboundFreight);
        return calculateAmazonFba({
            weightKg,
            category: category === 'electronics' ? 'Electronics' : 'General',
            sellPrice: Number(sellingPrice),
            itemCost: totalSourcingCost
        });
    }, [category, sellingPrice, itemCost, packagingCost, inboundFreight, weightGrams]);

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem 1.25rem 4rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/amazon" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>Amazon Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>FBA Fee &amp; Profit Calculator</span>
            </nav>

            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(249, 115, 22, 0.12)', border: '1px solid rgba(249, 115, 22, 0.3)', color: '#f97316', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#f97316" />
                    <span>Real-Time Amazon FBA Fee Schedule</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.75rem 0' }}>
                    Amazon FBA Fee &amp; Realized Profit Calculator
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Calculate exact Fulfillment by Amazon (FBA) pick &amp; pack fees, referral rates, closing fees, and net profit margins before dispatching inventory.
                </p>
            </div>

            {/* Main Interactive Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                {/* Inputs */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <Calculator size={18} color="#f97316" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Product &amp; Pricing Variables</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Amazon Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                            >
                                <option value="apparel" style={{ background: '#0d121f' }}>Apparel &amp; Fashion (12.5%)</option>
                                <option value="electronics" style={{ background: '#0d121f' }}>Consumer Electronics (8%)</option>
                                <option value="home_kitchen" style={{ background: '#0d121f' }}>Home &amp; Kitchen (11%)</option>
                                <option value="beauty" style={{ background: '#0d121f' }}>Beauty &amp; Grooming (9%)</option>
                                <option value="grocery" style={{ background: '#0d121f' }}>Grocery &amp; Gourmet (6%)</option>
                                <option value="books" style={{ background: '#0d121f' }}>Books &amp; Media (13.5%)</option>
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
                                    value={itemCost}
                                    onChange={(e) => setItemCost(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Packaging (₹)</label>
                                <input
                                    type="number"
                                    value={packagingCost}
                                    onChange={(e) => setPackagingCost(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>FBA Inbound (₹)</label>
                                <input
                                    type="number"
                                    value={inboundFreight}
                                    onChange={(e) => setInboundFreight(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
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

                {/* Outputs Card */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <Percent size={18} color="#10b981" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Net Realized Profit Breakdown</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '1.25rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Net Profit</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: results.netProfit >= 0 ? '#10b981' : '#ef4444' }}>
                                ₹{results.netProfit}
                            </div>
                        </div>
                        <div style={{ background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: '14px', padding: '1.25rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Profit Margin</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: results.profitMargin >= 0 ? '#f97316' : '#ef4444' }}>
                                {results.profitMargin}%
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>Size Tier:</span>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>{results.sizeTier}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>Referral Fee:</span>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>₹{results.referralFee}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>FBA Fulfillment Fee:</span>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>₹{results.fbaFee}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.65rem' }}>
                            <span style={{ fontWeight: 700, color: '#ffffff' }}>Total Amazon Deductions:</span>
                            <span style={{ fontWeight: 700, color: '#ef4444' }}>-₹{results.totalAmazonFees}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
