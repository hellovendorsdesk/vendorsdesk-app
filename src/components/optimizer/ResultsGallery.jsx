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
            <div className="panel-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', width: '100%', boxSizing: 'border-box', borderRadius: '14px', background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ flex: '1 1 260px', minWidth: 0 }}>
                    <div 
                        onClick={onBack} 
                        style={{ color: '#38bdf8', fontSize: '0.825rem', cursor: 'pointer', marginBottom: '0.35rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <ArrowLeft size={15} />
                        <span>Back to optimizer</span>
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                        Optimization results
                    </h2>
                    <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
                        {selectedJob ? selectedJob.category : (results[0] && results[0].category) || 'Variations'} — {successful.length} rates found
                        {cheapestCharge != null && <> · Best rate <strong style={{ color: '#34d399' }}>₹{cheapestCharge}</strong></>}
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
                                    background: '#ffffff',
                                    color: '#080b11',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '8px',
                                    fontWeight: 500,
                                    fontSize: '0.825rem',
                                    whiteSpace: 'nowrap',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <Download size={15} />
                                <span>{isZipping ? 'Zipping...' : `Export ${results.length} images (.zip)`}</span>
                            </button>
                        )}
                        <button 
                            className="btn-action" 
                            style={{ padding: '0.6rem 1.1rem', fontWeight: 500, borderRadius: '8px', fontSize: '0.825rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#f8fafc' }} 
                            onClick={onOptimizeAnother}
                        >
                            <Zap size={15} color="#38bdf8" />
                            <span>Optimize another</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Live Progress Banner */}
            {isOptimizing && (
                <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderRadius: '14px', background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ width: '16px', height: '16px', border: '2px solid rgba(56, 189, 248, 0.25)', borderTopColor: '#38bdf8', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontWeight: 500, fontSize: '0.875rem', color: '#f8fafc' }}>
                            {stage === 'creating' ? 'Creating variations...' : progressText}
                        </span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${stage === 'creating' ? 10 : pct}%`, height: '100%', background: '#38bdf8', transition: 'width 0.4s' }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Testing variations and checking live Meesho shipping rates in real time.
                    </div>
                </div>
            )}

            {!isOptimizing && successful.length === 0 && results.length > 0 && (
                <div className="panel-card" style={{ color: '#f87171', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <AlertTriangle size={18} />
                    <span>No shipping rates could be retrieved. Reconnect the seller session in the admin panel if expired.</span>
                </div>
            )}

            {/* Grid of Results */}
            {!isOptimizing && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem', alignContent: 'start' }}>
                    {sortedResults.map((v, idx) => {
                        const isCheapest = v.status === 'success' && v.shippingCharge != null && v.shippingCharge === cheapestCharge;
                        const id = v.id || v._id;
                        return (
                            <div 
                                key={id || idx} 
                                className="panel-card card-hover-lift" 
                                style={{ 
                                    padding: '0.85rem',
                                    background: '#0f1422', 
                                    border: isCheapest ? '1px solid #34d399' : '1px solid rgba(255, 255, 255, 0.08)', 
                                    borderRadius: '14px', 
                                    overflow: 'hidden', 
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.65rem'
                                }}
                            >
                                {isCheapest && (
                                    <span 
                                        style={{ 
                                            position: 'absolute', top: '12px', right: '12px', 
                                            background: '#34d399', color: '#090b10', 
                                            fontSize: '0.65rem', padding: '0.2rem 0.55rem', 
                                            borderRadius: '6px', zIndex: 5, fontWeight: 700
                                        }}
                                    >
                                        Lowest rate
                                    </span>
                                )}

                                <div 
                                    style={{ 
                                        width: '100%',
                                        aspectRatio: '1 / 1', 
                                        borderRadius: '10px', 
                                        background: '#090b10', 
                                        overflow: 'hidden',
                                        cursor: v.imageUrl ? 'zoom-in' : 'default',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
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
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                                            No image preview
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#f8fafc', width: '62%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={v.label}>
                                            {v.label}
                                        </span>
                                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: v.status === 'success' && v.shippingCharge != null ? '#34d399' : '#f87171' }}>
                                            {v.status === 'success' && v.shippingCharge != null ? `₹${v.shippingCharge}` : 'Failed'}
                                        </span>
                                    </div>

                                    {v.imageUrl && (
                                        <button 
                                            className="btn-action" 
                                            style={{ padding: '0.5rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 500, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#f8fafc' }} 
                                            disabled={downloadingId === id} 
                                            onClick={() => downloadVariation(v)}
                                        >
                                            <Download size={14} />
                                            <span>{downloadingId === id ? 'Downloading...' : 'Download HD'}</span>
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
                            maxWidth: '360px', 
                            padding: '0.75rem 1.4rem', 
                            fontSize: '0.9rem',
                            background: '#ffffff',
                            color: '#080b11',
                            borderRadius: '8px',
                            fontWeight: 500,
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                        onClick={onGenerateMore}
                    >
                        <span>Generate more combinations</span>
                    </button>
                </div>
            )}
        </div>
    );
}
