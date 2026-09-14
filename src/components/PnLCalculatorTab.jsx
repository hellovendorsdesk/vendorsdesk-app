import React, { useState, useEffect } from 'react';
import PnLHeaderZone from './pnl/PnLHeaderZone';
import PnLKpiGrid from './pnl/PnLKpiGrid';
import PnLMatrixTable from './pnl/PnLMatrixTable';
import PnLSkuCard from './pnl/PnLSkuCard';
import { getSkuMetrics, calculateOverallKPIs, exportCsvReport } from '../utils/pnlMetrics';

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

    const kpis = calculateOverallKPIs(dashboardData, skuPrices);

    const getFilteredSkus = () => {
        if (!dashboardData || !dashboardData.data) return [];
        let keys = Object.keys(dashboardData.data);

        if (searchQuery.trim()) {
            keys = keys.filter(k => k.toLowerCase().includes(searchQuery.toLowerCase().trim()));
        }

        keys.sort((a, b) => {
            const mA = getSkuMetrics(a, dashboardData.data[a], skuPrices);
            const mB = getSkuMetrics(b, dashboardData.data[b], skuPrices);
            if (sortBy === 'profit_high') return mB.netProfit - mA.netProfit;
            if (sortBy === 'profit_low') return mA.netProfit - mB.netProfit;
            if (sortBy === 'alpha') return a.localeCompare(b);
            return 0;
        });

        return keys;
    };

    const filteredSkus = getFilteredSkus();

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: '#0f172a' }}>
            {/* Header & Controls */}
            <PnLHeaderZone 
                selectedFile={selectedFile}
                fileName={fileName}
                onFileSelect={handleFileSelect}
                isExtractingDates={isExtractingDates}
                extractDateRange={extractDateRange}
                minDate={minDate}
                maxDate={maxDate}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                isCalculating={isCalculating}
                generateDashboard={generateDashboard}
                savedNotice={savedNotice}
                errorMsg={errorMsg}
                hasDashboardData={!!dashboardData}
                exportCsvReport={() => exportCsvReport(dashboardData, skuPrices)}
            />

            {/* Dashboard Analytics Content */}
            {dashboardData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    {/* Top 4 KPI Cards */}
                    <PnLKpiGrid kpis={kpis} />

                    {/* Cumulative Summary Matrix Table */}
                    <PnLMatrixTable dataSum={dashboardData.data_sum} />

                    {/* Search & Sort Controls */}
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {filteredSkus.map(sku => (
                            <PnLSkuCard 
                                key={sku}
                                sku={sku}
                                matrix={dashboardData.data[sku]}
                                priceVal={skuPrices[sku]}
                                onPriceChange={(val) => setSkuPrices(prev => ({ ...prev, [sku]: val }))}
                                onSavePrice={handleSavePrice}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
