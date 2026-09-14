import React, { useRef } from 'react';

export default function PnLHeaderZone({
    selectedFile,
    fileName,
    onFileSelect,
    isExtractingDates,
    extractDateRange,
    minDate,
    maxDate,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    isCalculating,
    generateDashboard,
    savedNotice,
    errorMsg,
    hasDashboardData,
    exportCsvReport
}) {
    const fileInputRef = useRef(null);

    return (
        <div className="panel-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(16,185,129,0.06))', border: '1px solid rgba(37,99,235,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#2563eb', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 800, display: 'inline-block', marginBottom: '0.25rem' }}>
                        📊 MEESHO PAYOUT & RECONCILIATION AUDITOR
                    </div>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                        Payment & Profit Analytics Dashboard
                    </h2>
                </div>

                {hasDashboardData && (
                    <button className="btn-submit-form" onClick={exportCsvReport} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                        📥 Export Report CSV
                    </button>
                )}
            </div>

            {/* Upload & Date Range Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
                <div className="upload-zone" onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ padding: '1.5rem', borderRadius: '14px', border: '2px dashed #2563eb', background: '#ffffff', cursor: 'pointer', textAlign: 'center' }}>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls, .csv" onChange={(e) => onFileSelect(e.target.files[0])} />
                    <div style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>📁</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', wordBreak: 'break-all' }}>
                        {fileName ? `Selected: ${fileName}` : 'Click / Drag & Drop Meesho Order Payments Excel'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Supports Order Payments, Ads Cost & Recovery sheets</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button className="btn-action btn-action-primary" disabled={!selectedFile || isExtractingDates} onClick={extractDateRange} style={{ flexGrow: 1, padding: '0.6rem', fontSize: '0.8rem', fontWeight: 700 }}>
                            {isExtractingDates ? 'Scanning Dates...' : '🗓️ Get Date Range'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.2rem' }}>From Date</label>
                            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} min={minDate} max={maxDate} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.2rem' }}>To Date</label>
                            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} min={minDate} max={maxDate} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                        </div>
                    </div>

                    <button className="btn-submit-form" disabled={!selectedFile || isCalculating} onClick={generateDashboard} style={{ padding: '0.75rem', fontSize: '0.9rem', fontWeight: 700, width: '100%' }}>
                        {isCalculating ? 'Processing Reconciliation...' : '🚀 Generate Analytics Dashboard'}
                    </button>
                </div>
            </div>

            {savedNotice && <div style={{ marginTop: '0.85rem', color: '#059669', fontWeight: 700, fontSize: '0.85rem', textAlign: 'center' }}>{savedNotice}</div>}
            {errorMsg && <div style={{ marginTop: '0.85rem', color: '#dc2626', fontWeight: 700, fontSize: '0.85rem', textAlign: 'center' }}>{errorMsg}</div>}
        </div>
    );
}
