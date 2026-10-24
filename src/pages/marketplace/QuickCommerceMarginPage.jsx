import React, { useState, useMemo } from 'react';
import { Zap, DollarSign, Percent, AlertCircle, Sparkles, Package, ArrowRight } from 'lucide-react';
import { calculateQuickCommerceMargin } from '../../services/marketplace/quickCommerceService';

export default function QuickCommerceMarginPage({ onRegister }) {
    const [platform, setPlatform] = useState('blinkit'); // blinkit, zepto, instamart
    const [mrp, setMrp] = useState(299);
    const [costPrice, setCostPrice] = useState(120);
    const [commissionPct, setCommissionPct] = useState(22); // 22%
    const [handlingFeePerUnit, setHandlingFeePerUnit] = useState(6);
    const [damageAllowancePct, setDamageAllowancePct] = useState(3); // 3% expiry/leakage buffer

    // Calculations decoupled into domain engine
    const marginResult = useMemo(() => calculateQuickCommerceMargin({
        mrp,
        costPrice,
        commissionPct,
        handlingFeePerUnit,
        damageAllowancePct
    }), [mrp, costPrice, commissionPct, handlingFeePerUnit, damageAllowancePct]);

    const {
        platformCommission,
        damageLoss,
        totalPlatformDeductions,
        netPayout,
        netProfit,
        netMarginPct
    } = marginResult;

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem 1.25rem 4rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/quick-commerce" style={{ color: '#eab308', textDecoration: 'none', fontWeight: 600 }}>Quick Commerce</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>Dark Store Margin &amp; Payout Calculator</span>
            </nav>

            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(234, 179, 8, 0.12)', border: '1px solid rgba(234, 179, 8, 0.3)', color: '#eab308', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#eab308" />
                    <span>Blinkit · Zepto · Swiggy Instamart</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.75rem 0' }}>
                    Quick Commerce Dark Store Profit Calculator
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Calculate dark store take-rates, inwarding handling fees, expiry buffers, and real net profit realization for 10-minute delivery apps.
                </p>
            </div>

            {/* Calculator Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                {/* Inputs */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <Zap size={18} color="#eab308" />
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Dark Store Variables</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Q-Commerce Partner</label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.9rem', outline: 'none' }}
                            >
                                <option value="blinkit" style={{ background: '#0d121f' }}>Blinkit (Zomato Commerce)</option>
                                <option value="zepto" style={{ background: '#0d121f' }}>Zepto</option>
                                <option value="instamart" style={{ background: '#0d121f' }}>Swiggy Instamart</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Selling Price / MRP (₹)</label>
                                <input
                                    type="number"
                                    value={mrp}
                                    onChange={(e) => setMrp(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Cost of Goods / COGS (₹)</label>
                                <input
                                    type="number"
                                    value={costPrice}
                                    onChange={(e) => setCostPrice(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Take Rate / Commission (%)</label>
                                <input
                                    type="number"
                                    value={commissionPct}
                                    onChange={(e) => setCommissionPct(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Handling Fee (₹/unit)</label>
                                <input
                                    type="number"
                                    value={handlingFeePerUnit}
                                    onChange={(e) => setHandlingFeePerUnit(Number(e.target.value))}
                                    style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ background: netProfit >= 0 ? 'rgba(234, 179, 8, 0.08)' : 'rgba(239, 68, 68, 0.08)', borderRadius: '20px', border: netProfit >= 0 ? '1px solid rgba(234, 179, 8, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: netProfit >= 0 ? '#eab308' : '#ef4444', textTransform: 'uppercase' }}>
                                Estimated Net Realization Per Unit
                            </div>
                            <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', marginTop: '0.2rem' }}>
                                ₹{netProfit.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                Dark Store Payout: <strong style={{ color: '#ffffff' }}>₹{netPayout}</strong>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ background: netProfit >= 0 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)', padding: '0.5rem 1rem', borderRadius: '12px', display: 'inline-block' }}>
                                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: netProfit >= 0 ? '#eab308' : '#ef4444' }}>{netMarginPct}%</div>
                                <div style={{ fontSize: '0.65rem', color: '#cbd5e1' }}>Margin</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
                            Dark Store Deductions Breakdown
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                                <span>Platform Take Rate ({commissionPct}%)</span>
                                <span style={{ fontWeight: 700, color: '#eab308' }}>- ₹{platformCommission}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                                <span>Dark Store Handling &amp; Inwarding</span>
                                <span style={{ fontWeight: 700, color: '#eab308' }}>- ₹{handlingFeePerUnit}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                                <span>Expiry &amp; Transit Damage Buffer ({damageAllowancePct}%)</span>
                                <span style={{ fontWeight: 700, color: '#ef4444' }}>- ₹{damageLoss}</span>
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '0.4rem 0' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff', fontWeight: 700 }}>
                                <span>Total Dark Store Cost</span>
                                <span style={{ color: '#ef4444' }}>- ₹{totalPlatformDeductions + damageLoss}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
