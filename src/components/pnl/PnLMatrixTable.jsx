import React from 'react';
import { STATUS_KEYS, STATUS_COLORS } from '../../utils/pnlMetrics';

export default function PnLMatrixTable({ dataSum }) {
    if (!dataSum) return null;

    return (
        <div className="panel-card">
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>
                📊 Cumulative Status Summary Matrix
            </h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                            {STATUS_KEYS.map(k => (
                                <th key={k} style={{ padding: '0.75rem', borderRight: '1px solid #f1f5f9' }}>
                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: STATUS_COLORS[k], marginRight: '0.35rem' }} />
                                    {k}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
                            {STATUS_KEYS.map(k => {
                                const [qty, amt] = dataSum[k] || [0, 0];
                                return (
                                    <td key={k} style={{ padding: '0.75rem', borderRight: '1px solid #f1f5f9' }}>
                                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>{qty} Qty</div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: STATUS_COLORS[k] }}>₹{Math.round(amt).toLocaleString()}</div>
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
