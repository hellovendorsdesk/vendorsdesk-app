import React from 'react';
import { ArrowLeft, Download, Sparkles, Zap, AlertTriangle, Eye } from 'lucide-react';

export default function ResultsGallery({
    results,
    sortedResults,
    cheapestCharge,
    isOptimizing,
    stage,
    progressText,
    pct,
    successful,
    selectedJob,
    onBack,
    onDownloadZip,
    isZipping,
    onOptimizeAnother,
    downloadVariation,
    downloadingId,
    setLightboxUrl,
    onGenerateMore,
    imageFile,
    selectedCategory
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            {/* Header Control Card */}
            <div className="panel-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', width: '100%', boxSizing: 'border-box', borderRadius: '20px' }}>
                <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                    <div 
                        onClick={onBack} 
                        style={{ color: '#2563eb', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '0.35rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Dashboard</span>
                    </div>
                    <h2 style={{ fontSize: '1.4rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        Optimization Results
                    </h2>
                    <p style={{ fontSize: '0.825rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                        {selectedJob ? selectedJob.category : (results[0] && results[0].category) || 'Variations'} — {successful.length} rates found
                        {cheapestCharge != null && <> · Best rate <strong style={{ color: '#10b981' }}>₹{cheapestCharge}</strong></>}
                    </p>
                </div>

                {!isOptimizing && (
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', maxWidth: '100%' }}>
                        {results.length > 0 && (
                            <button
                                className="btn-submit-form"
                                disabled={isZipping}
                                onClick={onDownloadZip}
                                style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '10px',
                                    fontWeight: 800,
                                    fontSize: '0.85rem',
                                    whiteSpace: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                <Download size={16} />
                                <span>{isZipping ? 'Zipping...' : `Export All ${results.length} (.ZIP)`}</span>
                            </button>
                        )}
                        <button 
                            className="btn-action btn-action-primary" 
                            style={{ padding: '0.65rem 1.25rem', fontWeight: 700, borderRadius: '10px', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.35rem' }} 
                            onClick={onOptimizeAnother}
                        >
                            <Zap size={16} />
                            <span>Optimize Another</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Live Progress Banner */}
            {isOptimizing && (
                <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderRadius: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ width: '18px', height: '18px', border: '2px solid rgba(37,99,235,0.25)', borderTopColor: '#2563eb', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                            {stage === 'creating' ? 'Creating variations...' : progressText}
                        </span>
                    </div>
                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${stage === 'creating' ? 10 : pct}%`, height: '100%', background: '#2563eb', transition: 'width 0.4s' }} />
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Generating variations and checking live Meesho shipping rates in real time. Results appear below as they complete.
                    </div>
                </div>
            )}

            {!isOptimizing && successful.length === 0 && results.length > 0 && (
                <div className="panel-card" style={{ color: '#ef4444', fontSize: '0.9rem', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <AlertTriangle size={20} />
                    <span>No shipping rates could be retrieved. Reconnect the seller session in the admin panel if expired.</span>
                </div>
            )}

            {/* Grid of Results */}
            {!isOptimizing && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.5rem', alignContent: 'start' }}>
                    {sortedResults.map((v, idx) => {
                        const isCheapest = v.status === 'success' && v.shippingCharge != null && v.shippingCharge === cheapestCharge;
                        const id = v.id || v._id;
                        return (
                            <div 
                                key={id || idx} 
                                className="panel-card card-hover-lift" 
                                style={{ 
                                    padding: '0.85rem',
                                    background: '#ffffff', 
                                    border: isCheapest ? '2px solid #10b981' : '1px solid #cbd5e1', 
                                    borderRadius: '20px', 
                                    overflow: 'hidden', 
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.65rem',
                                    boxShadow: isCheapest ? '0 10px 25px rgba(16, 185, 129, 0.15)' : '0 4px 15px rgba(15, 23, 42, 0.05)'
                                }}
                            >
                                {isCheapest && (
                                    <span 
                                        style={{ 
                                            position: 'absolute', top: '14px', right: '14px', 
                                            background: '#10b981', color: '#ffffff', 
                                            fontSize: '0.65rem', padding: '0.25rem 0.6rem', 
                                            borderRadius: '20px', zIndex: 5, fontWeight: 800,
                                            boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)',
                                            letterSpacing: '0.04em'
                                        }}
                                    >
                                        ⚡ CHEAPEST
                                    </span>
                                )}

                                <div 
                                    style={{ 
                                        width: '100%',
                                        aspectRatio: '1 / 1', 
                                        borderRadius: '14px', 
                                        background: '#f8fafc', 
                                        overflow: 'hidden',
                                        cursor: v.imageUrl ? 'zoom-in' : 'default',
                                        border: '1px solid #f1f5f9',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }} 
                                    onClick={() => v.imageUrl && setLightboxUrl(v.imageUrl)}
                                >
                                    {v.imageUrl ? (
                                        <img 
                                            src={v.imageUrl} 
                                            alt={v.label} 
                                            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} 
                                        />
                                    ) : (
                                        <div style={{ color: 'var(--text-secondary, #64748b)', fontSize: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                                            No image preview
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', width: '62%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={v.label}>
                                            {v.label}
                                        </span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: v.status === 'success' && v.shippingCharge != null ? '#10b981' : '#ef4444' }}>
                                            {v.status === 'success' && v.shippingCharge != null ? `₹${v.shippingCharge}` : '❌'}
                                        </span>
                                    </div>

                                    {v.imageUrl && (
                                        <button 
                                            className="btn-action btn-action-primary" 
                                            style={{ padding: '0.55rem', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 800, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }} 
                                            disabled={downloadingId === id} 
                                            onClick={() => downloadVariation(v)}
                                        >
                                            <Download size={14} />
                                            <span>{downloadingId === id ? 'Downloading...' : 'Download HD Image'}</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {!isOptimizing && imageFile && selectedCategory && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <button 
                        className="btn-submit-form" 
                        style={{ 
                            maxWidth: '380px', 
                            padding: '0.85rem 1.5rem', 
                            fontSize: '0.95rem',
                            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                        onClick={onGenerateMore}
                    >
                        <Sparkles size={18} />
                        <span>Generate More Combinations</span>
                    </button>
                </div>
            )}
        </div>
    );
}
