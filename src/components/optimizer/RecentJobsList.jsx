import React from 'react';
import { Package, Clock, CheckCircle2 } from 'lucide-react';

export default function RecentJobsList({ jobs, openJob }) {
    return (
        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: '480px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem' }}>
                <h3 className="panel-title" style={{ color: '#2563eb', fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', margin: 0 }}>
                    Recent Optimizations
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #64748b)', fontWeight: 600 }}>
                    Total: {jobs.length}
                </span>
            </div>

            {jobs.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', alignContent: 'start' }}>
                    {jobs.map(job => (
                        <div 
                            key={job._id} 
                            onClick={() => openJob(job)} 
                            className="history-card-hover"
                            style={{ 
                                background: '#ffffff', 
                                border: '1px solid var(--card-border, #e2e8f0)', 
                                borderRadius: '14px', 
                                overflow: 'hidden', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ width: '100%', aspectRatio: '1 / 1', background: '#f8fafc', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {job.thumb ? (
                                    <img src={job.thumb} alt={job.category} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <Package size={32} color="#94a3b8" />
                                )}
                            </div>
                            <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#0f172a' }} title={job.category}>
                                    {job.category}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={11} />
                                    <span>{new Date(job.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Best Rate</span>
                                    <span style={{ fontSize: '0.95rem', color: '#10b981', fontWeight: 800 }}>
                                        {job.cheapestRate != null ? `₹${job.cheapestRate}` : '--'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-secondary, #64748b)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '18px',
                        background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <Package size={32} color="#2563eb" />
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                        No Recent Optimizations
                    </div>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', maxWidth: '340px', lineHeight: '1.5', color: '#64748b' }}>
                        Upload a product photo on the left panel and click "Generate Variations" to test and save lower shipping rates.
                    </p>
                </div>
            )}
        </div>
    );
}
