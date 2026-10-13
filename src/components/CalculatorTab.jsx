import React from 'react';
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>E-commerce Profit Calculator</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Calculate your net margin, break-even price, and return loss factor on Meesho</p>
            </div>

            <div className="calculator-main-grid">
                
                {/* Inputs card */}
                <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', color: '#2563eb', fontWeight: 800 }}>Calculator Inputs</h3>
                    
                    <div className="form-group">
                        <label>Listing Selling Price (₹)</label>
                        <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} />
                    </div>

                    <div className="form-group">
                        <label>Product Cost Price (₹)</label>
                        <input type="number" value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} />
                    </div>

                    <div className="form-group">
                        <label>GST Rate Slab</label>
                        <select value={gstSlab} onChange={(e) => setGstSlab(Number(e.target.value))}>
                            <option value="5">5% (Sarees/Garments under 1000)</option>
                            <option value="12">12% (Garments above 1000/Bags)</option>
                            <option value="18">18% (Electronics/Cosmetics)</option>
                            <option value="28">28% (Luxury items)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Outbound Shipping Cost (₹)</label>
                        <input type="number" value={shippingCost} onChange={(e) => setShippingCost(Number(e.target.value))} />
                    </div>

                    <div className="form-group">
                        <label>Packaging & Label Cost (₹)</label>
                        <input type="number" value={packagingCost} onChange={(e) => setPackagingCost(Number(e.target.value))} />
                    </div>

                    <div className="form-group">
                        <label>Average Return Rate (%)</label>
                        <input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} />
                    </div>

                    <div className="form-group">
                        <label>Return Shipping Charge (₹)</label>
                        <input type="number" value={returnShippingCost} onChange={(e) => setReturnShippingCost(Number(e.target.value))} />
                    </div>
                </div>

                {/* Output analysis card */}
                <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', color: '#7c3aed', fontWeight: 800 }}>Profitability Analysis</h3>

                    {/* Big Profit Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.25rem' }}>
                        <div className="stat-card" style={{ background: '#f8fafc', border: '1px solid var(--card-border)', padding: '1.25rem' }}>
                            <span className="stat-label">Net Profit / Order</span>
                            <span className={`stat-val ${netProfit >= 0 ? 'success' : 'failed'}`} style={{ color: netProfit >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                                ₹{netProfit}
                            </span>
                            <span className="stat-footer">Post return/tax deductions</span>
                        </div>
                        <div className="stat-card" style={{ background: '#f8fafc', border: '1px solid var(--card-border)', padding: '1.25rem' }}>
                            <span className="stat-label">Net Profit Margin</span>
                            <span className="stat-val" style={{ color: netProfit >= 0 ? '#2563eb' : 'var(--danger)' }}>
                                {profitMargin}%
                            </span>
                            <span className="stat-footer">On selling price</span>
                        </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>GST Liability (Sales - Input Credit):</span>
                            <span>₹{netGstLiability}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Outbound Shipping + Pack:</span>
                            <span>₹{shippingCost + packagingCost}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Referral commission fee (0%):</span>
                            <span>₹{referralFee}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Estimated Return Loss Factor:</span>
                            <span style={{ color: 'var(--danger)' }}>₹{averageReturnLoss}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 'bold', paddingTop: '0.25rem' }}>
                            <span>Total Deductions:</span>
                            <span style={{ color: 'var(--danger)' }}>₹{totalDeductions}</span>
                        </div>
                    </div>

                    {/* Break-even Summary banner */}
                    <div style={{
                        background: netProfit >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: netProfit >= 0 ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem'
                    }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                            {netProfit >= 0 ? '🟢 Product is Profitable' : '🔴 Product is running in Loss!'}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                            Aapko is product par break-even (no profit, no loss) reach karne ke liye minimum **₹{breakEven}** selling price rakhni chahiye. 
                            Apni return rate control karke ya packaging costs optimize karke aap profit margins increase kar sakte hain.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}
