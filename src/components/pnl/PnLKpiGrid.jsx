import React from 'react';

export default function PnLKpiGrid({ kpis }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="panel-card" style={{ background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8' }}>Total settlement</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>
                    ₹{kpis.overallSettlement.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>Settlement across all order statuses</div>
            </div>

            <div className="panel-card" style={{ background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8' }}>Gross SKU profit</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 600, color: '#34d399', marginTop: '0.25rem' }}>
                    ₹{kpis.grossSkuProfit.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>Sum of SKU net profits (before ads)</div>
            </div>

            <div className="panel-card" style={{ background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8' }}>Ads spend deduction</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 600, color: '#fb923c', marginTop: '0.25rem' }}>
                    ₹{kpis.adsSpend.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>Filtered date range ads cost (GST inclusive)</div>
            </div>

            <div className="panel-card" style={{ background: '#0f1422', border: `1px solid ${kpis.finalNetProfit >= 0 ? 'rgba(52, 211, 153, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`, borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8' }}>Cumulative final net profit</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 600, color: kpis.finalNetProfit >= 0 ? '#34d399' : '#f87171', marginTop: '0.25rem' }}>
                    ₹{kpis.finalNetProfit.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>Gross SKU profit minus ads spend</div>
            </div>
        </div>
    );
}
