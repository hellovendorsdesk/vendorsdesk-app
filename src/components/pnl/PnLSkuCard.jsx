import React from 'react';
import { STATUS_KEYS, STATUS_COLORS, getSkuMetrics } from '../../utils/pnlMetrics';

export default function PnLSkuCard({ sku, matrix, priceVal, onPriceChange, onSavePrice }) {
    const m = getSkuMetrics(sku, matrix, { [sku]: priceVal });

    const renderDoughnutSvg = (mat) => {
        let total = 0;
        STATUS_KEYS.forEach(k => { total += (mat[k] ? mat[k][0] : 0); });
        if (total === 0) return <div style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>No Order Qty</div>;

        let accumulatedAngle = 0;
        const slices = [];

        STATUS_KEYS.forEach(k => {
            const qty = mat[k] ? mat[k][0] : 0;
            if (qty > 0) {
                const fraction = qty / total;
                const angle = fraction * 360;
                const x1 = 50 + 40 * Math.cos((Math.PI * (accumulatedAngle - 90)) / 180);
                const y1 = 50 + 40 * Math.sin((Math.PI * (accumulatedAngle - 90)) / 180);
                accumulatedAngle += angle;
                const x2 = 50 + 40 * Math.cos((Math.PI * (accumulatedAngle - 90)) / 180);
                const y2 = 50 + 40 * Math.sin((Math.PI * (accumulatedAngle - 90)) / 180);
                const largeArc = angle > 180 ? 1 : 0;
                const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;

                slices.push(<path key={k} d={pathData} fill={STATUS_COLORS[k]} />);
            }
        });

        return (
            <svg viewBox="0 0 100 100" style={{ width: '90px', height: '90px', transform: 'rotate(-90deg)', borderRadius: '50%' }}>
                {slices}
                <circle cx="50" cy="50" r="24" fill="#ffffff" />
            </svg>
        );
    };

    return (
        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem', border: '1px solid #e2e8f0', borderRadius: '16px', background: '#ffffff' }}>
            
            {/* SKU Header */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem', marginBottom: '0.85rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', wordBreak: 'break-all', maxWidth: '68%' }} title={sku}>
                        {sku}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>SETTLEMENT</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb', fontFamily: 'Outfit' }}>₹{m.totalSettlement.toLocaleString()}</div>
                    </div>
                </div>

                {/* Status Breakdown & Doughnut Chart */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: '0.85rem', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {STATUS_KEYS.map(k => {
                            const [qty, amt] = matrix[k] || [0, 0];
                            if (qty === 0 && amt === 0) return null;
                            return (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dotted #e2e8f0', paddingBottom: '0.15rem' }}>
                                    <span style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: STATUS_COLORS[k] }} />
                                        {k}
                                    </span>
                                    <span style={{ fontWeight: 700 }}>{qty} <small style={{ color: STATUS_COLORS[k] }}>(₹{Math.round(amt)})</small></span>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {renderDoughnutSvg(matrix)}
                    </div>
                </div>
            </div>

            {/* Purchase Cost Input & Profit Recalculation */}
            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'nowrap' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap', flexShrink: 0 }}>Purchase Price (₹):</label>
                    <input 
                        type="number" 
                        placeholder="Enter Cost"
                        value={priceVal !== undefined ? priceVal : ''}
                        onChange={(e) => onPriceChange(e.target.value)}
                        style={{ flexGrow: 1, minWidth: '70px', padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}
                    />
                    <button 
                        className="btn-action btn-action-primary" 
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0, minWidth: '85px' }}
                        onClick={() => onSavePrice(sku, priceVal)}
                    >
                        Save Profit
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #cbd5e1', paddingTop: '0.5rem' }}>
                    <div>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>COGS ({m.totalCogsQty} Delivered/Shipped):</span>
                        <strong style={{ fontSize: '0.85rem', color: '#475569' }}>₹{m.totalPurchaseCost.toLocaleString()}</strong>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>SKU Net Profit:</span>
                        <strong style={{ fontSize: '1.1rem', color: m.netProfit >= 0 ? '#059669' : '#dc2626', fontFamily: 'Outfit' }}>
                            ₹{m.netProfit.toLocaleString()}
                        </strong>
                    </div>
                </div>
            </div>

        </div>
    );
}
