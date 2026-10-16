import React from 'react';
import { 
    Calculator, 
    TrendingUp, 
    TrendingDown, 
    CheckCircle2, 
    AlertTriangle, 
    Info, 
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
            {/* Header Banner */}
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(37, 99, 235, 0.08)',
                    color: '#2563eb',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    padding: '0.25rem 0.85rem',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: '0.5rem'
                }}>
                    <Calculator size={13} />
                    <span>MEESHO ZERO-COMMISSION PROFIT ENGINE</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.35rem', fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>
                    E-commerce Profit & Margin Calculator
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 auto', maxWidth: '580px', lineHeight: 1.5 }}>
                    Calculate realistic net margins, break-even price thresholds, GST liability, and return loss factors on Meesho.
                </p>
            </div>

            <div className="calculator-main-grid">
                
                {/* Inputs card */}
                <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                        <Calculator size={18} color="#2563eb" />
                        <h3 style={{ fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif', color: '#0f172a', fontWeight: 700, margin: 0 }}>
                            Calculator Parameters
                        </h3>
                    </div>
                    
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <IndianRupee size={13} color="#64748b" />
                            Listing Selling Price (₹)
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
                            <IndianRupee size={13} color="#64748b" />
                            Product Cost Price (₹)
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
                            <Percent size={13} color="#64748b" />
                            GST Rate Slab
                        </label>
                        <select value={gstSlab} onChange={(e) => setGstSlab(Number(e.target.value))}>
                            <option value="5">5% (Sarees/Garments under ₹1,000)</option>
                            <option value="12">12% (Garments above ₹1,000/Bags)</option>
                            <option value="18">18% (Electronics/Cosmetics)</option>
                            <option value="28">28% (Luxury goods)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Truck size={13} color="#64748b" />
                            Outbound Shipping Cost (₹)
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
                            <Package size={13} color="#64748b" />
                            Packaging & Label Cost (₹)
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
                            <RotateCcw size={13} color="#64748b" />
                            Average Return Rate (%)
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
                            <Truck size={13} color="#64748b" />
                            Return Shipping Surcharge (₹)
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
                <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                        <TrendingUp size={18} color="#10b981" />
                        <h3 style={{ fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif', color: '#0f172a', fontWeight: 700, margin: 0 }}>
                            Profitability Analysis
                        </h3>
                    </div>

                    {/* Big Profit Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                        <div style={{
                            background: isProfitable ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                            border: `1px solid ${isProfitable ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                            borderRadius: '12px',
                            padding: '1.25rem'
                        }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                                Net Profit / Order
                            </span>
                            <span style={{
                                fontSize: '1.75rem',
                                fontWeight: 800,
                                fontFamily: 'Outfit, sans-serif',
                                color: isProfitable ? '#059669' : '#dc2626',
                                display: 'block'
                            }}>
                                ₹{netProfit}
                            </span>
                            <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginTop: '0.25rem' }}>
                                Post return & tax deductions
                            </span>
                        </div>

                        <div style={{
                            background: isProfitable ? 'rgba(37, 99, 235, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                            border: `1px solid ${isProfitable ? 'rgba(37, 99, 235, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                            borderRadius: '12px',
                            padding: '1.25rem'
                        }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                                Net Profit Margin
                            </span>
                            <span style={{
                                fontSize: '1.75rem',
                                fontWeight: 800,
                                fontFamily: 'Outfit, sans-serif',
                                color: isProfitable ? '#2563eb' : '#dc2626',
                                display: 'block'
                            }}>
                                {profitMargin}%
                            </span>
                            <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginTop: '0.25rem' }}>
                                Calculated on selling price
                            </span>
                        </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem',
                        background: '#f8fafc',
                        padding: '1.25rem',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                            <span style={{ color: '#64748b' }}>GST Liability (Sales − Input Credit):</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>₹{netGstLiability}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                            <span style={{ color: '#64748b' }}>Outbound Shipping + Packaging:</span>
                            <span style={{ fontWeight: 600, color: '#0f172a' }}>₹{shippingCost + packagingCost}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                            <span style={{ color: '#64748b' }}>Referral Commission Fee (Meesho 0%):</span>
                            <span style={{ fontWeight: 600, color: '#059669' }}>₹{referralFee}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem' }}>
                            <span style={{ color: '#64748b' }}>Estimated Return Loss Factor:</span>
                            <span style={{ fontWeight: 600, color: '#dc2626' }}>₹{averageReturnLoss}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, paddingTop: '0.25rem' }}>
                            <span style={{ color: '#0f172a' }}>Total Deductions:</span>
                            <span style={{ color: '#dc2626' }}>₹{totalDeductions}</span>
                        </div>
                    </div>

                    {/* Break-even Summary banner */}
                    <div style={{
                        background: isProfitable ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                        border: `1px solid ${isProfitable ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
                        padding: '1.25rem',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.45rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            color: isProfitable ? '#065f46' : '#991b1b'
                        }}>
                            {isProfitable ? (
                                <>
                                    <CheckCircle2 size={18} color="#059669" />
                                    <span>Product is Profitable</span>
                                </>
                            ) : (
                                <>
                                    <AlertTriangle size={18} color="#dc2626" />
                                    <span>Product is running in Loss!</span>
                                </>
                            )}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.55', margin: 0 }}>
                            Aapko is product par break-even (no profit, no loss) reach karne ke liye minimum <strong style={{ color: '#0f172a' }}>₹{breakEven}</strong> selling price rakhni chahiye. 
                            Apni return rate control karke ya packaging costs optimize karke aap profit margins maximize kar sakte hain.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
