import React, { useState, useEffect } from 'react';
import { secureFetch } from '../utils/crypto';
import MeeshoWebviewFrame from './MeeshoWebviewFrame';

export default function MeeshoAnalyticsTab({ currentUser, onConnectStore }) {
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [summary, setSummary] = useState(null);
    const [returnRate, setReturnRate] = useState('');
    const [skuAnalytics, setSkuAnalytics] = useState([]);
    const [payoutTimeline, setPayoutTimeline] = useState([]);
    const [salesTrend, setSalesTrend] = useState([]);
    const [todoList, setTodoList] = useState({ pendingOrders: 0, downloadLabels: 0, outOfStock: 2, lowStock: 0 });
    const [activeChartTab, setActiveChartTab] = useState('revenue'); // 'revenue' | 'orders'
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        loadAnalyticsData();
    }, [currentUser]);

    const loadAnalyticsData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('vendorsdesk_token');
            const data = await secureFetch('/api/meesho/analytics', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (data.success) {
                setConnected(data.connected);
                if (data.connected) {
                    setStoreName(data.storeName);
                    setSummary(data.summary);
                    setReturnRate(data.returnRate);
                    setSkuAnalytics(data.skuAnalytics);
                    setPayoutTimeline(data.payoutTimeline);
                    setSalesTrend(data.salesTrend);
                    if (data.todoList) setTodoList(data.todoList);
                }
            }
        } catch (e) {
            console.error('Failed to load Meesho analytics:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('vendorsdesk_token');
            const data = await secureFetch('/api/meesho/disconnect', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (data.success) {
                setConnected(false);
            }
        } catch (e) {
            console.error('Failed to disconnect store:', e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                <div 
                    style={{
                        width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)',
                        borderTopColor: '#818cf8', borderRadius: '50%', display: 'block',
                        margin: '0 auto 1.25rem auto', animation: 'spin 1s linear infinite'
                    }}
                />
                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Loading Meesho store analytics...</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Fetching order history and payout settlements</div>
            </div>
        );
    }

    if (!connected) {
        if (isConnecting) {
            return (
                <div className="panel-card" style={{ padding: '2.5rem 1.5rem', background: '#f8fafc', display: 'flex', justifyContent: 'center' }}>
                    <MeeshoWebviewFrame 
                        onSuccess={() => {
                            setConnected(true);
                            setIsConnecting(false);
                            loadAnalyticsData();
                        }}
                        onCancel={() => setIsConnecting(false)}
                    />
                </div>
            );
        }

        return (
            <div className="panel-card" style={{ textAlign: 'center', padding: '4rem 2rem', background: '#f8fafc', position: 'relative' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📊</div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontFamily: 'Outfit', fontWeight: 700 }}>Meesho Store Dashboard Analytics</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Connect your Meesho supplier panel to automatically audit returns, monitor SKU risk, track net profit payouts, and reconcile logistics deductions.
                </p>
                <button 
                    className="btn-submit-form" 
                    style={{ maxWidth: '280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} 
                    onClick={() => setIsConnecting(true)}
                >
                    🔌 Connect Meesho Store
                </button>
            </div>
        );
    }

    const chartHeight = 160;
    const chartWidth = 500;
    const maxVal = salesTrend.length > 0 ? Math.max(...salesTrend.map(d => activeChartTab === 'revenue' ? d.revenue : d.orders)) : 100;
    const points = salesTrend.map((d, index) => {
        const val = activeChartTab === 'revenue' ? d.revenue : d.orders;
        const x = (index / (salesTrend.length - 1)) * chartWidth;
        const y = chartHeight - (val / maxVal) * (chartHeight - 30) - 15;
        return { x, y, label: d.date, val };
    });

    const pathData = points.length > 0 
        ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
        : '';
        
    const fillPathData = points.length > 0
        ? `${pathData} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
        : '';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', background: '#f8fafc', color: '#0f172a', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            
            {/* Top Bar with Connect Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ff1493', background: 'rgba(255,20,147,0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        Supplier Hub Integration
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button 
                        style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem', fontWeight: 'bold', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                        onClick={handleDisconnect}
                    >
                        🔌 Disconnect
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.4rem 0.75rem', borderRadius: '20px' }}>
                        <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
                        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>Live Sync</span>
                    </div>
                </div>
            </div>

            {/* Welcome banner (Meesho Style) */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.5rem 2rem', borderRadius: '12px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0, color: '#1e293b' }}>
                    Welcome back, {storeName}
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem', margin: 0 }}>
                    Manage and grow your business with Meesho
                </p>
            </div>

            {/* Alert strip (Meesho Style Policy banner) */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '0.85rem 1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>📢</span>
                    <span style={{ fontSize: '0.85rem', color: '#92400e', fontWeight: 500 }}>
                        <strong>Upcoming Policy Update:</strong> Next Day Dispatch is becoming the new platform standard for all orders.
                    </span>
                </div>
                <a href="#policy" style={{ fontSize: '0.85rem', color: '#ff1493', fontWeight: 600, textDecoration: 'none' }}>Know more</a>
            </div>

            {/* Middle Section: To do list and Setup Account */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                
                {/* To do list (Meesho Style) */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>📋</span>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>To do list</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
                        
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem', position: 'relative' }}>
                            <div style={{ width: '28px', height: '28px', background: 'rgba(99,102,241,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.65rem' }}>
                                <span style={{ fontSize: '0.9rem' }}>📦</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Pending Orders</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#3b82f6', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {todoList.pendingOrders || 0} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>&gt;</span>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem' }}>
                            <div style={{ width: '28px', height: '28px', background: 'rgba(59,130,246,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.65rem' }}>
                                <span style={{ fontSize: '0.9rem' }}>⬇️</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Download Labels</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#3b82f6', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {todoList.downloadLabels || 0} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>&gt;</span>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem' }}>
                            <div style={{ width: '28px', height: '28px', background: 'rgba(239,68,68,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.65rem' }}>
                                <span style={{ fontSize: '0.9rem' }}>❌</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Out of Stock</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {todoList.outOfStock || 0} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>&gt;</span>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.85rem' }}>
                            <div style={{ width: '28px', height: '28px', background: 'rgba(245,158,11,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.65rem' }}>
                                <span style={{ fontSize: '0.9rem' }}>⚠️</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Low Stock</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d97706', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {todoList.lowStock || 0} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>&gt;</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Account Setup Status (Meesho Style) */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Complete your account setup</h4>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem', lineHeight: '1.4' }}>
                            Add the below information to improve your selling journey.
                        </p>
                    </div>
                    <button style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.5rem 0.85rem', borderRadius: '6px', fontSize: '0.75rem', color: '#3b82f6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', marginTop: '1rem', width: 'fit-content' }}>
                        <span>➕</span> Add Business Type
                    </button>
                </div>

            </div>

            {/* Business Insights Panel (Meesho Style Chart) */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>📈</span>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Business Insights</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                            style={{ background: activeChartTab === 'revenue' ? '#f1f5f9' : 'transparent', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: activeChartTab === 'revenue' ? '#ff1493' : '#64748b', fontWeight: 600, cursor: 'pointer' }}
                            onClick={() => setActiveChartTab('revenue')}
                        >
                            Daily Sales
                        </button>
                        <button 
                            style={{ background: activeChartTab === 'orders' ? '#f1f5f9' : 'transparent', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: activeChartTab === 'orders' ? '#ff1493' : '#64748b', fontWeight: 600, cursor: 'pointer' }}
                            onClick={() => setActiveChartTab('orders')}
                        >
                            Daily Orders
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '1.5rem' }}>
                    
                    {/* SVG Line Graph */}
                    <div style={{ background: '#fafafa', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ width: '100%', height: '150px' }}>
                            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#ff1493" stopOpacity="0.25"/>
                                        <stop offset="100%" stopColor="#ff1493" stopOpacity="0"/>
                                    </linearGradient>
                                </defs>
                                
                                {/* Gridlines */}
                                <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#e2e8f0" strokeDasharray="3"/>
                                <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#e2e8f0" strokeDasharray="3"/>
                                <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#e2e8f0" strokeDasharray="3"/>

                                <path d={fillPathData} fill="url(#glowGrad)" />
                                <path d={pathData} fill="none" stroke="#ff1493" strokeWidth="2.5" strokeLinecap="round" />

                                {points.map((p, i) => (
                                    <circle 
                                        key={i} 
                                        cx={p.x} 
                                        cy={p.y} 
                                        r="3.5" 
                                        fill="#ffffff" 
                                        stroke="#ff1493" 
                                        strokeWidth="2"
                                    />
                                ))}
                            </svg>
                        </div>

                        {/* Date axis & labels */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0.25rem' }}>
                            {points.map((p, i) => (
                                <div key={i} style={{ textAlign: 'center', width: '50px' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#1e293b' }}>
                                        {activeChartTab === 'revenue' ? `₹${(p.val / 1000).toFixed(1)}k` : `${p.val}`}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                                        {p.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Views & Orders stats (Meesho Style) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', background: '#fafafa' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Views ({salesTrend && salesTrend.length > 0 ? salesTrend[salesTrend.length - 1].date : 'Today'})</span>
                            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                79 <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>▲ 11.27%</span>
                            </div>
                        </div>

                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', background: '#fafafa' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Orders ({salesTrend && salesTrend.length > 0 ? salesTrend[salesTrend.length - 1].date : 'Today'})</span>
                            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', marginTop: '0.25rem' }}>
                                {salesTrend && salesTrend.length > 0 ? salesTrend[salesTrend.length - 1].orders : 0}
                            </div>
                        </div>

                        <button style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.6rem', borderRadius: '8px', fontSize: '0.75rem', color: '#ff1493', fontWeight: 700, cursor: 'pointer', textAlign: 'center' }}>
                            View More Details
                        </button>

                    </div>

                </div>
            </div>

        </div>
    );
}
