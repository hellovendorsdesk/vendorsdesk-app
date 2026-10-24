// src/pages/marketplace/MeeshoRtoLossPage.jsx - Pure UI Presentation
import React, { useState, useMemo } from 'react';
import { RotateCcw, AlertTriangle, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';
import { calculateMeeshoRto } from '../../services/marketplace/meeshoService';

export default function MeeshoRtoLossPage({ onRegister }) {
    const [monthlyOrders, setMonthlyOrders] = useState(1000);
    const [sellingPrice, setSellingPrice] = useState(399);
    const [productCost, setProductCost] = useState(140);
    const [packagingCost, setPackagingCost] = useState(12);
    const [rtoRatePct, setRtoRatePct] = useState(18); // 18% RTO
    const [returnRatePct, setReturnRatePct] = useState(12); // 12% Customer Return

    // Call pure decoupled domain service
    const results = useMemo(() => {
        const totalProductCost = Number(productCost) + Number(packagingCost);
        return calculateMeeshoRto({
            sellPrice: Number(sellingPrice),
            productCost: totalProductCost,
            customerReturnRate: Number(returnRatePct),
            rtoReturnRate: Number(rtoRatePct)
        });
    }, [sellingPrice, productCost, packagingCost, returnRatePct, rtoRatePct]);

    // Scaled to monthly volume
    const monthlyNetProfit = Math.round(results.expectedProfitPerOrder * monthlyOrders);
    const monthlyRtoLoss = Math.round(results.rtoLossPerDispatchedUnit * monthlyOrders);
    const monthlyCustomerReturnLoss = Math.round(results.customerReturnLossPerUnit * monthlyOrders);

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem 1.25rem 4rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/meesho" style={{ color: '#ec4899', textDecoration: 'none', fontWeight: 600 }}>Meesho Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>RTO &amp; Return Loss Simulator</span>
            </nav>

            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#ec4899', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#ec4899" />
                    <span>#1 Profit Protection Tool for Meesho Suppliers</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.75rem 0' }}>
                    Meesho RTO &amp; Customer Return Loss Simulator
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Meesho charges 0% commission, but reverse shipping and packaging damage on RTO and customer returns can wipe out profits. Simulate true realized margins.
                </p>
            </div>

            {/* Main Interactive Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                {/* Inputs */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <RotateCcw size={18} color="#ec4899" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Supplier Dispatch Parameters</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Monthly Dispatched Orders</label>
                            <input
                                type="number"
                                value={monthlyOrders}
                                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                                style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                            />
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
                                    value={productCost}
                                    onChange={(e) => setProductCost(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>RTO Rate (%)</label>
                                <input
                                    type="number"
                                    value={rtoRatePct}
                                    onChange={(e) => setRtoRatePct(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Customer Return (%)</label>
                                <input
                                    type="number"
                                    value={returnRatePct}
                                    onChange={(e) => setReturnRatePct(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outputs Card */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <ShieldAlert size={18} color="#ec4899" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Simulated PnL Results</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ background: results.isProfitable ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: `1px solid ${results.isProfitable ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`, borderRadius: '14px', padding: '1.25rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: results.isProfitable ? '#10b981' : '#ef4444', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Monthly Net Profit</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: results.isProfitable ? '#10b981' : '#ef4444' }}>
                                ₹{monthlyNetProfit.toLocaleString()}
                            </div>
                        </div>
                        <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.25)', borderRadius: '14px', padding: '1.25rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ec4899', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Safe Price Buffer</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                                ₹{results.suggestedSafePrice}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>Successful Delivery Rate:</span>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>{results.deliveredRate}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>Monthly Courier RTO Loss:</span>
                            <span style={{ color: '#ef4444', fontWeight: 600 }}>-₹{monthlyRtoLoss.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                            <span>Monthly Customer Return Loss:</span>
                            <span style={{ color: '#ef4444', fontWeight: 600 }}>-₹{monthlyCustomerReturnLoss.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.65rem' }}>
                            <span style={{ fontWeight: 700, color: '#ffffff' }}>Profit Per Dispatched Unit:</span>
                            <span style={{ fontWeight: 700, color: results.isProfitable ? '#10b981' : '#ef4444' }}>₹{results.expectedProfitPerOrder}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
