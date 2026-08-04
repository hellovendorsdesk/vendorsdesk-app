import React, { useState, useEffect, useRef } from 'react';

const STATUS_KEYS = ['Delivered', 'Exchange', 'Shipped', 'Cancelled', 'RTO', 'Recovery&Claim', 'Return'];
const STATUS_COLORS = {
    'Delivered': '#10b981',
    'Exchange': '#3b82f6',
    'Shipped': '#8b5cf6',
    'Cancelled': '#64748b',
    'RTO': '#f59e0b',
    'Recovery&Claim': '#06b6d4',
    'Return': '#ef4444'
};

const API_BASE = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' && window.location.hostname.includes('vendorsdesk.in') ? 'https://backend.vendorsdesk.in' : '');

export default function PnLCalculatorTab() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isExtractingDates, setIsExtractingDates] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Date Range State
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // Dashboard Data State
    const [dashboardData, setDashboardData] = useState(null);
    const [skuPrices, setSkuPrices] = useState({});
    const [savedNotice, setSavedNotice] = useState('');

    // Search & Sort State
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('profit_high'); // 'profit_high' | 'profit_low' | 'alpha'

    const fileInputRef = useRef(null);

    // Fetch saved SKU prices on mount
    useEffect(() => {
        fetchSavedPrices();
    }, []);

    const fetchSavedPrices = async () => {
        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const res = await fetch(`${API_BASE}/api/pnl/get_purchase_prices`, {
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            const data = await res.json();
            if (data.success && data.prices) {
                setSkuPrices(data.prices);
            }
        } catch (e) {
            console.error('Failed to fetch saved purchase prices:', e);
        }
    };

    const handleFileSelect = (file) => {
        if (!file) return;
        setSelectedFile(file);
        setFileName(file.name);
        setErrorMsg('');
        setDashboardData(null);
    };

    // Step 1: Extract Date Range
    const extractDateRange = async () => {
        if (!selectedFile) {
            alert('Please select an Excel or CSV file first.');
            return;
        }
        setIsExtractingDates(true);
        setErrorMsg('');
        const formData = new FormData();
        formData.append('excel_file', selectedFile);

        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const res = await fetch(`${API_BASE}/api/pnl/date_range`, { 
                method: 'POST', 
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                body: formData 
            });
            const data = await res.json();
            if (data.min_date && data.max_date) {
                setMinDate(data.min_date);
                setMaxDate(data.max_date);
                setFromDate(data.min_date);
                setToDate(data.max_date);
            } else {
                setErrorMsg(data.error || 'Could not extract date range.');
            }
        } catch (err) {
            console.error('Date range extraction error:', err);
            setErrorMsg('Failed to extract date range from file.');
        } finally {
            setIsExtractingDates(false);
        }
    };

    // Step 2: Generate Dashboard Analytics
    const generateDashboard = async () => {
        if (!selectedFile) {
            alert('Please select an Excel or CSV file first.');
            return;
        }
        setIsCalculating(true);
        setErrorMsg('');
        const formData = new FormData();
        formData.append('excel_file', selectedFile);
        if (fromDate) formData.append('from_date', fromDate);
        if (toDate) formData.append('to_date', toDate);

        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const res = await fetch(`${API_BASE}/api/pnl/dashboard_data_count`, { 
                method: 'POST', 
                headers: token ? { 'Authorization': `Bearer ${token}` } : {},
                body: formData 
            });
            const data = await res.json();
            if (data.data) {
                setDashboardData(data);
            } else {
                setErrorMsg(data.error || 'Failed to process dashboard data.');
            }
        } catch (err) {
            console.error('Dashboard generation error:', err);
            setErrorMsg('Failed to generate analytics dashboard.');
        } finally {
            setIsCalculating(false);
        }
    };

    // Step 3: Save SKU Purchase Price
    const handleSavePrice = async (sku, priceVal) => {
        const numPrice = parseFloat(priceVal) || 0;
        setSkuPrices(prev => ({ ...prev, [sku]: numPrice }));

        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const res = await fetch(`${API_BASE}/api/pnl/save_purchase_price`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ sku, price: numPrice })
            });
            const data = await res.json();
            if (data.success) {
                setSavedNotice(`Saved cost ₹${numPrice} for ${sku}!`);
                setTimeout(() => setSavedNotice(''), 3000);
            }
        } catch (e) {
            console.error('Save price error:', e);
        }
    };

    // Calculate SKU Net Profit
    const getSkuMetrics = (skuName, statusMatrix) => {
        const costPerUnit = parseFloat(skuPrices[skuName]) || 0;
        let totalSettlement = 0;
        let deliveredQty = 0;
        let exchangeQty = 0;
        let shippedQty = 0;

        STATUS_KEYS.forEach(k => {
            const [qty, amt] = statusMatrix[k] || [0, 0];
            totalSettlement += amt;
            if (k === 'Delivered') deliveredQty += qty;
            if (k === 'Exchange') exchangeQty += qty;
            if (k === 'Shipped') shippedQty += qty;
        });

        const totalCogsQty = deliveredQty + exchangeQty + shippedQty;
        const totalPurchaseCost = totalCogsQty * costPerUnit;
        const netProfit = totalSettlement - totalPurchaseCost;

        return {
            totalSettlement: Math.round(totalSettlement),
            totalCogsQty,
            totalPurchaseCost: Math.round(totalPurchaseCost),
            netProfit: Math.round(netProfit)
        };
    };

    // Calculate Overall Dashboard Totals
    const calculateOverallKPIs = () => {
        if (!dashboardData || !dashboardData.data) return { overallSettlement: 0, grossSkuProfit: 0, adsSpend: 0, finalNetProfit: 0 };

        let overallSettlement = 0;
        let grossSkuProfit = 0;

        Object.keys(dashboardData.data).forEach(sku => {
            const metrics = getSkuMetrics(sku, dashboardData.data[sku]);
            overallSettlement += metrics.totalSettlement;
            grossSkuProfit += metrics.netProfit;
        });

        const adsSpend = dashboardData.ads_spend || 0;
        const finalNetProfit = grossSkuProfit - adsSpend;

        return {
            overallSettlement: Math.round(overallSettlement),
            grossSkuProfit: Math.round(grossSkuProfit),
            adsSpend: Math.round(adsSpend),
            finalNetProfit: Math.round(finalNetProfit)
        };
    };

    const kpis = calculateOverallKPIs();

    // Export CSV Report
    const exportCsvReport = () => {
        if (!dashboardData || !dashboardData.data) return;

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "SKU Name,Purchase Price (INR),Delivered Qty,Exchange Qty,Shipped Qty,Cancelled Qty,RTO Qty,Recovery&Claim Qty,Return Qty,Total Settlement (INR),Total COGS (INR),Net SKU Profit (INR)\n";

        Object.keys(dashboardData.data).forEach(sku => {
            const matrix = dashboardData.data[sku];
            const price = skuPrices[sku] || 0;
            const m = getSkuMetrics(sku, matrix);

            const row = [
                `"${sku}"`,
                price,
                matrix['Delivered'][0],
                matrix['Exchange'][0],
                matrix['Shipped'][0],
                matrix['Cancelled'][0],
                matrix['RTO'][0],
                matrix['Recovery&Claim'][0],
                matrix['Return'][0],
                m.totalSettlement,
                m.totalPurchaseCost,
                m.netProfit
            ].join(",");
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `vendorsdesk_pnl_analytics_report.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    // Filter & Sort SKUs
    const getFilteredSkus = () => {
        if (!dashboardData || !dashboardData.data) return [];
        let keys = Object.keys(dashboardData.data);

        if (searchQuery.trim()) {
            keys = keys.filter(k => k.toLowerCase().includes(searchQuery.toLowerCase().trim()));
        }

        keys.sort((a, b) => {
            const mA = getSkuMetrics(a, dashboardData.data[a]);
            const mB = getSkuMetrics(b, dashboardData.data[b]);
            if (sortBy === 'profit_high') return mB.netProfit - mA.netProfit;
            if (sortBy === 'profit_low') return mA.netProfit - mB.netProfit;
            if (sortBy === 'alpha') return a.localeCompare(b);
            return 0;
        });

        return keys;
    };

    const filteredSkus = getFilteredSkus();

    // Render Doughnut Chart SVG Component
    const renderDoughnutSvg = (matrix) => {
        let total = 0;
        STATUS_KEYS.forEach(k => { total += matrix[k][0]; });
        if (total === 0) return <div style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', padding: '1rem' }}>No Order Qty</div>;

        let accumulatedAngle = 0;
        const slices = [];

        STATUS_KEYS.forEach(k => {
            const qty = matrix[k][0];
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
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: '#0f172a' }}>
            
            {/* Header & Upload Controls */}
            <div className="panel-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(16,185,129,0.06))', border: '1px solid rgba(37,99,235,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <div style={{ background: 'rgba(37,99,235,0.1)', color: '#2563eb', padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.5rem' }}>
                            📊 MEESHO RECONCILIATION & PROFIT ANALYTICS ENGINE
                        </div>
                        <h2 style={{ fontFamily: 'Outfit', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
                            Payment & Profit Analytics Dashboard
                        </h2>
                    </div>

                    {dashboardData && (
                        <button className="btn-submit-form" onClick={exportCsvReport} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                            📥 Export Report CSV
                        </button>
                    )}
                </div>

                {/* Upload & Date Range Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', alignItems: 'center' }}>
                    <div className="upload-zone" onClick={() => fileInputRef.current.click()} style={{ padding: '1.5rem', borderRadius: '14px', border: '2px dashed #2563eb', background: '#ffffff', cursor: 'pointer', textAlign: 'center' }}>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".xlsx, .xls, .csv" onChange={(e) => handleFileSelect(e.target.files[0])} />
                        <div style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>📁</div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                            {fileName ? `Selected: ${fileName}` : 'Click / Drag & Drop Meesho Order Payments Excel'}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Supports Order Payments, Ads Cost & Recovery sheets</div>
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

            {/* Dashboard Analytics Content */}
            {dashboardData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    
                    {/* Top 4 KPI Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                        <div className="panel-card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1d4ed8' }}>OVERALL SETTLEMENT</div>
                            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#2563eb', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                                ₹{kpis.overallSettlement.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#1e40af', marginTop: '0.2rem' }}>Total Settlement Across All Statuses</div>
                        </div>

                        <div className="panel-card" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>GROSS SKU PROFIT</div>
                            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                                ₹{kpis.grossSkuProfit.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#065f46', marginTop: '0.2rem' }}>Sum of SKU Net Profits (Before Ads)</div>
                        </div>

                        <div className="panel-card" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309' }}>ADS SPEND DEDUCTION</div>
                            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#d97706', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                                ₹{kpis.adsSpend.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#92400e', marginTop: '0.2rem' }}>Filtered Date Range Ads Cost (GST Inclusive)</div>
                        </div>

                        <div className="panel-card" style={{ background: kpis.finalNetProfit >= 0 ? '#f0fdf4' : '#fef2f2', border: `1px solid ${kpis.finalNetProfit >= 0 ? '#bbf7d0' : '#fecaca'}` }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: kpis.finalNetProfit >= 0 ? '#15803d' : '#b91c1c' }}>CUMULATIVE FINAL NET PROFIT</div>
                            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: kpis.finalNetProfit >= 0 ? '#16a34a' : '#dc2626', fontFamily: 'Outfit', marginTop: '0.25rem' }}>
                                ₹{kpis.finalNetProfit.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: kpis.finalNetProfit >= 0 ? '#166534' : '#991b1b', marginTop: '0.2rem' }}>Gross SKU Profit minus Ads Spend</div>
                        </div>
                    </div>

                    {/* Cumulative Summary Table */}
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
                                            const [qty, amt] = dashboardData.data_sum[k] || [0, 0];
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

                    {/* Live Search & Sort Controls */}
                    <div className="panel-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1, maxWidth: '450px' }}>
                            <span style={{ fontSize: '1.2rem' }}>🔍</span>
                            <input 
                                type="text" 
                                placeholder="Search SKU name..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem 1rem', fontSize: '0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Sort By:</span>
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 600 }}
                            >
                                <option value="profit_high">Net Profit: High to Low</option>
                                <option value="profit_low">Net Profit: Low to High</option>
                                <option value="alpha">SKU Name (A-Z)</option>
                            </select>
                        </div>
                    </div>

                    {/* Dynamic SKU Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
                        {filteredSkus.map(sku => {
                            const matrix = dashboardData.data[sku];
                            const m = getSkuMetrics(sku, matrix);
                            const currentPrice = skuPrices[sku] !== undefined ? skuPrices[sku] : '';

                            return (
                                <div key={sku} className="panel-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem', border: '1px solid #e2e8f0', borderRadius: '16px' }}>
                                    
                                    {/* SKU Header */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.65rem', marginBottom: '0.85rem' }}>
                                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', wordBreak: 'break-all', maxWidth: '70%' }} title={sku}>
                                                {sku}
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>SETTLEMENT</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2563eb', fontFamily: 'Outfit' }}>₹{m.totalSettlement.toLocaleString()}</div>
                                            </div>
                                        </div>

                                        {/* Status Table & Doughnut Chart */}
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
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>Purchase Price (₹):</label>
                                            <input 
                                                type="number" 
                                                placeholder="Enter Cost"
                                                value={currentPrice}
                                                onChange={(e) => setSkuPrices(prev => ({ ...prev, [sku]: e.target.value }))}
                                                style={{ flexGrow: 1, padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 700 }}
                                            />
                                            <button 
                                                className="btn-action btn-action-primary" 
                                                style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem', fontWeight: 700 }}
                                                onClick={() => handleSavePrice(sku, currentPrice)}
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
                        })}
                    </div>

                </div>
            )}
        </div>
    );
}
