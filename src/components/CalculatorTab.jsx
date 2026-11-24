import React from 'react';
import { 
    Calculator, 
    TrendingUp, 
    TrendingDown, 
    CheckCircle2, 
    AlertTriangle, 
    IndianRupee, 
    Percent, 
    Package, 
    Truck, 
    RotateCcw 
} from 'lucide-react';
import useMarginCalculator from '../hooks/useMarginCalculator';

export default function CalculatorTab() {
    const {
        inputs: {
            sellingPrice,
            setSellingPrice,
            costPrice,
            setCostPrice,
            gstSlab,
            setGstSlab,
            packagingCost,
            setPackagingCost,
            shippingCost,
            setShippingCost,
            referralFeePercent,
            setReferralFeePercent,
            returnRate,
            setReturnRate,
            returnShippingCost,
            setReturnShippingCost
        },
        gstOnSales,
        gstOnCost,
        netGstLiability,
        referralFee,
        averageReturnLoss,
        totalDeductions,
        netProfit,
        profitMargin,
        breakEven
    } = useMarginCalculator();

    const isProfitable = netProfit >= 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
            {/* Header Banner */}
            <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(56, 189, 248, 0.08)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.22)',
                    padding: '0.25rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                }}>
                    <Calculator size={13} />
                    <span>Margin calculator</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', letterSpacing: '-0.02em' }}>
                    E-commerce profit and margin calculator
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 auto', maxWidth: '580px', lineHeight: 1.5 }}>
                    Calculate realistic net margins, break-even thresholds, GST liability, and return deductions on Meesho.
                </p>
            </div>

            <div className="calculator-main-grid">
                
                {/* Inputs card */}
                <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                        <Calculator size={16} color="#38bdf8" />
                        <h3 style={{ fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', fontWeight: 600, margin: 0 }}>
                            Calculation parameters
                        </h3>
                    </div>
                    
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <IndianRupee size={13} color="#94a3b8" />
                            Listing selling price (₹)
                        </label>
                        <input 
                            type="number" 
                            value={sellingPrice} 
                            onChange={(e) => setSellingPrice(Number(e.target.value))} 
                            placeholder="e.g. 499"
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <IndianRupee size={13} color="#94a3b8" />
                            Product cost price (₹)
                        </label>
                        <input 
                            type="number" 
                            value={costPrice} 
                            onChange={(e) => setCostPrice(Number(e.target.value))} 
                            placeholder="e.g. 180"
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Percent size={13} color="#94a3b8" />
                            GST rate slab
                        </label>
                        <select value={gstSlab} onChange={(e) => setGstSlab(Number(e.target.value))}>
                            <option value="5">5% (Sarees / garments under ₹1,000)</option>
                            <option value="12">12% (Garments above ₹1,000 / bags)</option>
                            <option value="18">18% (Electronics / cosmetics)</option>
                            <option value="28">28% (Luxury goods)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Truck size={13} color="#94a3b8" />
                            Outbound shipping cost (₹)
                        </label>
                        <input 
                            type="number" 
                            value={shippingCost} 
                            onChange={(e) => setShippingCost(Number(e.target.value))} 
                            placeholder="e.g. 50"
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Package size={13} color="#94a3b8" />
                            Packaging and label cost (₹)
                        </label>
                        <input 
                            type="number" 
                            value={packagingCost} 
                            onChange={(e) => setPackagingCost(Number(e.target.value))} 
                            placeholder="e.g. 15"
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <RotateCcw size={13} color="#94a3b8" />
                            Average return rate (%)
                        </label>
                        <input 
                            type="number" 
                            value={returnRate} 
                            onChange={(e) => setReturnRate(Number(e.target.value))} 
                            placeholder="e.g. 15"
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Truck size={13} color="#94a3b8" />
                            Return shipping surcharge (₹)
                        </label>
                        <input 
                            type="number" 
                            value={returnShippingCost} 
                            onChange={(e) => setReturnShippingCost(Number(e.target.value))} 
                            placeholder="e.g. 120"
                        />
                    </div>
                </div>

                {/* Output analysis card */}
                <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                        <TrendingUp size={16} color="#10b981" />
                        <h3 style={{ fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', fontWeight: 600, margin: 0 }}>
                            Profitability analysis
                        </h3>
                    </div>

                    {/* Big Profit Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                        <div style={{
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '1.25rem'
                        }}>
                            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>
                                Net profit per order
                            </span>
                            <span style={{
                                fontSize: '1.65rem',
                                fontWeight: 600,
                                color: isProfitable ? '#34d399' : '#f87171',
                                display: 'block',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                ₹{netProfit}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginTop: '0.25rem' }}>
                                Post return and tax deductions
                            </span>
                        </div>

                        <div style={{
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '1.25rem'
                        }}>
                            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>
                                Net margin
                            </span>
                            <span style={{
                                fontSize: '1.65rem',
                                fontWeight: 600,
                                color: isProfitable ? '#38bdf8' : '#f87171',
                                display: 'block',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                {profitMargin}%
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block', marginTop: '0.25rem' }}>
                                Calculated on selling price
                            </span>
                        </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        background: '#141a29',
                        padding: '1.25rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: '#94a3b8' }}>GST liability (Sales − Input credit):</span>
                            <span style={{ fontWeight: 500, color: '#f8fafc', fontVariantNumeric: 'tabular-nums' }}>₹{netGstLiability}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: '#94a3b8' }}>Outbound shipping and packaging:</span>
                            <span style={{ fontWeight: 500, color: '#f8fafc', fontVariantNumeric: 'tabular-nums' }}>₹{shippingCost + packagingCost}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: '#94a3b8' }}>Meesho commission fee:</span>
                            <span style={{ fontWeight: 500, color: '#34d399', fontVariantNumeric: 'tabular-nums' }}>₹{referralFee} (0%)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.65rem' }}>
                            <span style={{ color: '#94a3b8' }}>Estimated return loss:</span>
                            <span style={{ fontWeight: 500, color: '#f87171', fontVariantNumeric: 'tabular-nums' }}>₹{averageReturnLoss}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, paddingTop: '0.25rem' }}>
                            <span style={{ color: '#f8fafc' }}>Total deductions:</span>
                            <span style={{ color: '#f87171', fontVariantNumeric: 'tabular-nums' }}>₹{totalDeductions}</span>
                        </div>
                    </div>

                    {/* Break-even Summary banner */}
                    <div style={{
                        background: isProfitable ? 'rgba(52, 211, 153, 0.08)' : 'rgba(248, 113, 113, 0.08)',
                        border: `1px solid ${isProfitable ? 'rgba(52, 211, 153, 0.22)' : 'rgba(248, 113, 113, 0.22)'}`,
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.88rem',
                            fontWeight: 600,
                            color: isProfitable ? '#34d399' : '#f87171'
                        }}>
                            {isProfitable ? (
                                <>
                                    <CheckCircle2 size={16} color="#34d399" />
                                    <span>Listing is profitable</span>
                                </>
                            ) : (
                                <>
                                    <AlertTriangle size={16} color="#f87171" />
                                    <span>Listing operates at a loss</span>
                                </>
                            )}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                            Break-even price: <strong style={{ color: '#ffffff' }}>₹{breakEven}</strong>
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
}
