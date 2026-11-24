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
        <div className="panel-card" style={{ marginBottom: '2rem', background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                        Meesho payout & reconciliation
                    </div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                        Payment and profit analytics
                    </h2>
                </div>

                {hasDashboardData && (
                    <button className="btn-submit-form" onClick={exportCsvReport} style={{ background: '#ffffff', color: '#080b11', padding: '0.6rem 1.2rem', fontSize: '0.825rem', fontWeight: 500, borderRadius: '8px' }}>
                        Export report CSV
                    </button>
                )}
            </div>

            {/* Upload & Date Range Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
                <div className="upload-zone" onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ padding: '1.5rem', borderRadius: '12px', border: '1px dashed rgba(56, 189, 248, 0.35)', background: '#141a29', cursor: 'pointer', textAlign: 'center' }}>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls, .csv" onChange={(e) => onFileSelect(e.target.files[0])} />
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc', wordBreak: 'break-all' }}>
                        {fileName ? `Selected: ${fileName}` : 'Click or drop Meesho order payments Excel'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Supports order payments, ads cost, and recovery sheets</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: '#141a29', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button className="btn-action" disabled={!selectedFile || isExtractingDates} onClick={extractDateRange} style={{ flexGrow: 1, padding: '0.55rem', fontSize: '0.8rem', fontWeight: 500, background: '#090b10', color: '#f8fafc', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '8px' }}>
                            {isExtractingDates ? 'Scanning dates...' : 'Get date range'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>From date</label>
                            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} min={minDate} max={maxDate} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.12)', background: '#080b11', color: '#ffffff' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>To date</label>
                            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} min={minDate} max={maxDate} style={{ width: '100%', padding: '0.45rem', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.12)', background: '#080b11', color: '#ffffff' }} />
                        </div>
                    </div>

                    <button className="btn-submit-form" disabled={!selectedFile || isCalculating} onClick={generateDashboard} style={{ padding: '0.7rem', fontSize: '0.85rem', fontWeight: 500, width: '100%', background: '#ffffff', color: '#080b11', borderRadius: '8px', border: 'none' }}>
                        {isCalculating ? 'Processing reconciliation...' : 'Generate analytics dashboard'}
                    </button>
                </div>
            </div>

            {savedNotice && <div style={{ marginTop: '0.85rem', color: '#34d399', fontWeight: 500, fontSize: '0.825rem', textAlign: 'center' }}>{savedNotice}</div>}
            {errorMsg && <div style={{ marginTop: '0.85rem', color: '#f87171', fontWeight: 500, fontSize: '0.825rem', textAlign: 'center' }}>{errorMsg}</div>}
        </div>
    );
}
