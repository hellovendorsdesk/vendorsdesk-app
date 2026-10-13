import React from 'react';

export default function PnLKpiGrid({ kpis }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="panel-card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8' }}>OVERALL SETTLEMENT</div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#2563eb', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                    ₹{kpis.overallSettlement.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#1e40af', marginTop: '0.2rem' }}>Total Settlement Across All Statuses</div>
            </div>

            <div className="panel-card" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>GROSS SKU PROFIT</div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                    ₹{kpis.grossSkuProfit.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#065f46', marginTop: '0.2rem' }}>Sum of SKU Net Profits (Before Ads)</div>
            </div>

            <div className="panel-card" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309' }}>ADS SPEND DEDUCTION</div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#d97706', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                    ₹{kpis.adsSpend.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#92400e', marginTop: '0.2rem' }}>Filtered Date Range Ads Cost (GST Inclusive)</div>
            </div>

            <div className="panel-card" style={{ background: kpis.finalNetProfit >= 0 ? '#f0fdf4' : '#fef2f2', border: `1px solid ${kpis.finalNetProfit >= 0 ? '#bbf7d0' : '#fecaca'}` }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: kpis.finalNetProfit >= 0 ? '#15803d' : '#b91c1c' }}>CUMULATIVE FINAL NET PROFIT</div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: kpis.finalNetProfit >= 0 ? '#16a34a' : '#dc2626', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                    ₹{kpis.finalNetProfit.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: kpis.finalNetProfit >= 0 ? '#166534' : '#991b1b', marginTop: '0.2rem' }}>Gross SKU Profit minus Ads Spend</div>
            </div>
        </div>
    );
}
