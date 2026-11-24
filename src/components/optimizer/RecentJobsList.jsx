import React from 'react';
import { Package, Clock, CheckCircle2 } from 'lucide-react';

export default function RecentJobsList({ jobs, openJob }) {
    return (
        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: '480px', borderRadius: '14px', background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.65rem' }}>
                <h3 className="panel-title" style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                    Recent optimizations
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                    {jobs.length} items
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
                                background: '#141a29', 
                                border: '1px solid rgba(255, 255, 255, 0.08)', 
                                borderRadius: '10px', 
                                overflow: 'hidden', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            <div style={{ width: '100%', aspectRatio: '1 / 1', background: '#090b10', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {job.thumb ? (
                                    <img src={job.thumb} alt={job.category} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <Package size={28} color="#94a3b8" />
                                )}
                            </div>
                            <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                <div style={{ fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#f8fafc' }} title={job.category}>
                                    {job.category}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={11} />
                                    <span>{new Date(job.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>Best rate</span>
                                    <span style={{ fontSize: '0.95rem', color: '#34d399', fontWeight: 700 }}>
                                        {job.cheapestRate != null ? `₹${job.cheapestRate}` : '--'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
                    <div style={{
                        width: '56px', height: '56px', borderRadius: '14px',
                        background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <Package size={26} color="#38bdf8" />
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
                        No recent optimizations
                    </div>
                    <p style={{ fontSize: '0.825rem', marginTop: '0.4rem', maxWidth: '320px', lineHeight: '1.5', color: '#94a3b8' }}>
                        Upload a product photo and test lower Meesho shipping rates to save your history.
                    </p>
                </div>
            )}
        </div>
    );
}
