import React, { useState, useRef } from 'react';
import { secureFetch } from '../utils/crypto';

export default function PnLCalculatorTab() {
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [reportData, setReportData] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = async (file) => {
        if (!file) return;
        setFileName(file.name);
        setIsLoading(true);
        setErrorMsg('');
        setReportData(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const res = await fetch('/api/pnl/calculate', {
                method: 'POST',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                setReportData(data);
            } else {
                setErrorMsg(data.error || 'Failed to parse Excel file.');
            }
        } catch (err) {
            console.error('PnL Upload error:', err);
            setErrorMsg('Network request failed. Please upload a valid Meesho Excel sheet.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
            {/* Header Section */}
            <div className="panel-card" style={{ marginBottom: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(37, 99, 235, 0.05))', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.85rem' }}>
                    📊 EXCEL P&L PROFIT & LOSS AUDITOR
                </div>
                <h2 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                    Audit Meesho Payout Excel & Calculate Net Profit
                </h2>
                <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                    Upload your Meesho Order Settlement Excel or CSV sheet to automatically calculate real net payouts, forward shipping deductions, RTO return losses, TCS/TDS taxes, and SKU-level profit margins.
                </p>

                <div className="upload-zone" onClick={() => fileInputRef.current.click()} style={{ maxWidth: '520px', margin: '0 auto', padding: '2.5rem 1.5rem', borderRadius: '16px', border: '2px dashed #10b981', background: '#ffffff', cursor: 'pointer' }}>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls, .csv" onChange={(e) => handleFileUpload(e.target.files[0])} />
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📑</div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                        {fileName ? `File Selected: ${fileName}` : 'Upload Meesho Settlement Excel / CSV'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Supports .XLSX, .XLS, .CSV (Drop file here)</div>
                </div>

                {isLoading && (
                    <div style={{ marginTop: '1.25rem', fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '16px', height: '16px', border: '2px solid #2563eb', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        Analyzing Meesho Payout Ledger & Reconciling SKU Margins...
                    </div>
                )}

                {errorMsg && <div style={{ marginTop: '1rem', color: '#dc2626', fontWeight: 600, fontSize: '0.85rem' }}>{errorMsg}</div>}
            </div>

            {/* Reconciled Profit Audit Dashboard */}
            {reportData && reportData.summary && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Summary Metric Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <div className="panel-card" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>NET RECONCILED PAYOUT</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                                ₹{reportData.summary.netPayout.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#065f46', marginTop: '0.2rem' }}>From ₹{reportData.summary.grossSales.toLocaleString()} Gross Sales</div>
                        </div>

                        <div className="panel-card" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b91c1c' }}>RETURN LOSSES (RTO + CUSTOMER)</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                                ₹{reportData.summary.totalReturnLosses.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#991b1b', marginTop: '0.2rem' }}>
                                Return Rate: <strong>{reportData.summary.overallReturnRate}</strong>
                            </div>
                        </div>

                        <div className="panel-card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8' }}>SHIPPING FEES DEDUCTED</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563eb', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                                ₹{reportData.summary.totalShippingDeductions.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#1e40af', marginTop: '0.2rem' }}>Forward Freight Charges</div>
                        </div>

                        <div className="panel-card" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309' }}>TOTAL ORDERS PROCESSED</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                                {reportData.summary.totalOrders}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#92400e', marginTop: '0.2rem' }}>
                                Delivered: {reportData.summary.deliveredOrders} | RTO: {reportData.summary.rtoOrders}
                            </div>
                        </div>
                    </div>

                    {/* SKU Breakdown Table */}
                    <div className="panel-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                                🚨 SKU-Wise Profit & Return Audit Table
                            </h3>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                Showing {reportData.skuAnalytics.length} unique SKUs
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                                        <th style={{ padding: '0.75rem' }}>SKU Code</th>
                                        <th style={{ padding: '0.75rem' }}>Total Orders</th>
                                        <th style={{ padding: '0.75rem' }}>Return Rate %</th>
                                        <th style={{ padding: '0.75rem' }}>Gross Sales</th>
                                        <th style={{ padding: '0.75rem' }}>Net Payout</th>
                                        <th style={{ padding: '0.75rem' }}>Margin %</th>
                                        <th style={{ padding: '0.75rem' }}>Audit Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.skuAnalytics.map((sku, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                                            <td style={{ padding: '0.75rem', fontWeight: 700, color: '#0f172a' }}>{sku.sku}</td>
                                            <td style={{ padding: '0.75rem' }}>{sku.sales}</td>
                                            <td style={{ padding: '0.75rem', fontWeight: 700, color: parseFloat(sku.returnRate) > 20 ? '#dc2626' : '#059669' }}>
                                                {sku.returnRate}
                                            </td>
                                            <td style={{ padding: '0.75rem' }}>₹{sku.revenue.toLocaleString()}</td>
                                            <td style={{ padding: '0.75rem', fontWeight: 800, color: sku.profit > 0 ? '#059669' : '#dc2626' }}>
                                                ₹{sku.profit.toLocaleString()}
                                            </td>
                                            <td style={{ padding: '0.75rem', fontWeight: 700 }}>{sku.margin}</td>
                                            <td style={{ padding: '0.75rem' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '6px', background: sku.status.includes('High') ? '#fee2e2' : '#d1fae5', color: sku.status.includes('High') ? '#991b1b' : '#065f46' }}>
                                                    {sku.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
