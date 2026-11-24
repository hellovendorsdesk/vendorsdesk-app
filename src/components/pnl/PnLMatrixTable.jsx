import React from 'react';
import { STATUS_KEYS, STATUS_COLORS } from '../../utils/pnlMetrics';

export default function PnLMatrixTable({ dataSum }) {
    if (!dataSum) return null;

    return (
        <div className="panel-card" style={{ background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#f8fafc', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
                Cumulative status summary matrix
            </h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#141a29', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8', fontWeight: 500 }}>
                            {STATUS_KEYS.map(k => (
                                <th key={k} style={{ padding: '0.75rem', borderRight: '1px solid rgba(255, 255, 255, 0.04)' }}>
                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: STATUS_COLORS[k], marginRight: '0.35rem' }} />
                                    {k}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ background: '#0c0e14', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            {STATUS_KEYS.map(k => {
                                const [qty, amt] = dataSum[k] || [0, 0];
                                return (
                                    <td key={k} style={{ padding: '0.75rem', borderRight: '1px solid rgba(255, 255, 255, 0.04)' }}>
                                        <div style={{ fontWeight: 600, fontSize: '1rem', color: '#f8fafc' }}>{qty} Qty</div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: STATUS_COLORS[k] }}>₹{Math.round(amt).toLocaleString()}</div>
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
