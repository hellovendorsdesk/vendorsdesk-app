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
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: '#f8fafc' }}>
                <div 
                    style={{
                        width: '36px', height: '36px', border: '3px solid rgba(255,255,255,0.1)',
                        borderTopColor: '#38bdf8', borderRadius: '50%', display: 'block',
                        margin: '0 auto 1.25rem auto', animation: 'spin 1s linear infinite'
                    }}
                />
                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>Loading store analytics...</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>Fetching order history and payout settlements</div>
            </div>
        );
    }

    if (!connected) {
        if (isConnecting) {
            return (
                <div className="panel-card" style={{ padding: '2.5rem 1.5rem', background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', display: 'flex', justifyContent: 'center' }}>
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
            <div className="panel-card" style={{ textAlign: 'center', padding: '4rem 2rem', background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', position: 'relative' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <span style={{ fontSize: '1.4rem', color: '#38bdf8' }}>📊</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 600, color: '#f8fafc' }}>Meesho store dashboard analytics</h3>
                <p style={{ color: '#94a3b8', maxWidth: '480px', margin: '0 auto 2rem auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
                    Connect your Meesho supplier panel to automatically audit returns, monitor SKU risk, track net profit payouts, and reconcile logistics deductions.
                </p>
                <button 
                    className="btn-submit-form" 
                    style={{ maxWidth: '240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#ffffff', color: '#080b11', borderRadius: '8px', fontWeight: 500, padding: '0.65rem 1.25rem', border: 'none' }} 
                    onClick={() => setIsConnecting(true)}
                >
                    Connect Meesho store
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#f8fafc' }}>
            
            {/* Top Bar with Connect Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.85rem 1.25rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        Supplier hub integration
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.25)', padding: '0.35rem 0.75rem', borderRadius: '20px' }}>
                        <span style={{ width: '6px', height: '6px', background: '#34d399', borderRadius: '50%' }}></span>
                        <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 500 }}>Live sync</span>
                    </div>
                    <button 
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 500, background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '6px', cursor: 'pointer' }}
                        onClick={handleDisconnect}
                    >
                        Disconnect
                    </button>
                </div>
            </div>

            {/* Welcome banner */}
            <div style={{ background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem 1.5rem', borderRadius: '12px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 600, margin: 0, color: '#f8fafc' }}>
                    Welcome back, {storeName}
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.825rem', marginTop: '0.25rem', margin: 0 }}>
                    Manage and grow your business with Meesho catalog insights.
                </p>
            </div>

            {/* Alert strip */}
            <div style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.85rem 1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.825rem', color: '#f8fafc', fontWeight: 400 }}>
                        <strong style={{ fontWeight: 500 }}>Upcoming policy update:</strong> Next Day Dispatch is becoming the new platform standard for all orders.
                    </span>
                </div>
                <a href="#policy" style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 500, textDecoration: 'none' }}>Learn more</a>
            </div>

            {/* Middle Section: To do list and Setup Account */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                
                {/* To do list */}
                <div style={{ background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>To do list</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        
                        <div style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '0.85rem' }}>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>Pending orders</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#38bdf8', marginTop: '0.25rem' }}>
                                {todoList.pendingOrders || 0}
                            </div>
                        </div>

                        <div style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '0.85rem' }}>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>Download labels</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#38bdf8', marginTop: '0.25rem' }}>
                                {todoList.downloadLabels || 0}
                            </div>
                        </div>

                        <div style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '0.85rem' }}>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>Out of stock</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#f87171', marginTop: '0.25rem' }}>
                                {todoList.outOfStock || 0}
                            </div>
                        </div>

                        <div style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '0.85rem' }}>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 400 }}>Low stock</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fb923c', marginTop: '0.25rem' }}>
                                {todoList.lowStock || 0}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Account Setup Status */}
                <div style={{ background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>Complete your account setup</h4>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem', lineHeight: '1.5' }}>
                            Configure your supplier credentials and tax preferences to streamline automated reconciliation.
                        </p>
                    </div>
                    <button style={{ background: '#ffffff', border: 'none', padding: '0.55rem 1rem', borderRadius: '8px', fontSize: '0.8rem', color: '#080b11', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', marginTop: '1rem', width: 'fit-content' }}>
                        Add business type
                    </button>
                </div>

            </div>

            {/* Business Insights Panel */}
            <div style={{ background: '#0f1422', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>Business insights</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.35rem', background: '#090b10', padding: '0.2rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <button 
                            style={{ background: activeChartTab === 'revenue' ? '#141a29' : 'transparent', border: activeChartTab === 'revenue' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: activeChartTab === 'revenue' ? '#f8fafc' : '#94a3b8', fontWeight: 500, cursor: 'pointer' }}
                            onClick={() => setActiveChartTab('revenue')}
                        >
                            Daily sales
                        </button>
                        <button 
                            style={{ background: activeChartTab === 'orders' ? '#141a29' : 'transparent', border: activeChartTab === 'orders' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: activeChartTab === 'orders' ? '#f8fafc' : '#94a3b8', fontWeight: 500, cursor: 'pointer' }}
                            onClick={() => setActiveChartTab('orders')}
                        >
                            Daily orders
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    
                    {/* SVG Line Graph */}
                    <div style={{ background: '#090b10', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ width: '100%', height: '150px' }}>
                            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25"/>
                                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/>
                                    </linearGradient>
                                </defs>
                                
                                {/* Gridlines */}
                                <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3"/>
                                <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3"/>
                                <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="3"/>

                                <path d={fillPathData} fill="url(#glowGrad)" />
                                <path d={pathData} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

                                {points.map((p, i) => (
                                    <circle 
                                        key={i} 
                                        cx={p.x} 
                                        cy={p.y} 
                                        r="3" 
                                        fill="#090b10" 
                                        stroke="#38bdf8" 
                                        strokeWidth="2"
                                    />
                                ))}
                            </svg>
                        </div>

                        {/* Date axis & labels */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0.25rem' }}>
                            {points.map((p, i) => (
                                <div key={i} style={{ textAlign: 'center', width: '50px' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc' }}>
                                        {activeChartTab === 'revenue' ? `₹${(p.val / 1000).toFixed(1)}k` : `${p.val}`}
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                                        {p.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Views & Orders stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        
                        <div style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1rem', background: '#141a29' }}>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Views ({salesTrend && salesTrend.length > 0 ? salesTrend[salesTrend.length - 1].date : 'Today'})</span>
                            <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                79 <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 500 }}>+11.2%</span>
                            </div>
                        </div>

                        <div style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1rem', background: '#141a29' }}>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Orders ({salesTrend && salesTrend.length > 0 ? salesTrend[salesTrend.length - 1].date : 'Today'})</span>
                            <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#f8fafc', marginTop: '0.25rem' }}>
                                {salesTrend && salesTrend.length > 0 ? salesTrend[salesTrend.length - 1].orders : 0}
                            </div>
                        </div>

                        <button style={{ background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.6rem', borderRadius: '8px', fontSize: '0.8rem', color: '#f8fafc', fontWeight: 500, cursor: 'pointer', textAlign: 'center' }}>
                            View details
                        </button>

                    </div>

                </div>
            </div>

        </div>
    );
}
