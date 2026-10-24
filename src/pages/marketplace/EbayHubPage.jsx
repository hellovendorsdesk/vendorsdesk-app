import React from 'react';
import { Type, Sparkles, ArrowRight, Calculator, Search, ShieldCheck } from 'lucide-react';

export default function EbayHubPage({ onNavigate }) {
    const tools = [
        {
            slug: '/ebay/title-generator',
            pageKey: 'ebay-title-generator',
            title: 'eBay 20-Title Cassini Studio',
            tag: 'Strict 75–80 Char Limit',
            tagColor: '#3b82f6',
            description: 'Generate 20 high-converting eBay titles across 5 Cassini search angles. Algorithmic word-packing loop guarantees titles strictly fit between 75 and 80 characters.',
            icon: Type
        },
        {
            slug: '/ebay/keyword-tool',
            pageKey: 'ebay-keyword-tool',
            title: 'eBay Keyword Research & Opportunity Scorer',
            tag: 'Cassini Opportunity Formula',
            tagColor: '#10b981',
            description: 'Analyze seed keywords with logarithmic competition scoring (0 to 1M scale), demand velocity (reviews & sold items), and profit sweet-spot pricing ($20–$100).',
            icon: Search
        },
        {
            slug: '/ebay/fee-calculator',
            pageKey: 'ebay-fee-calculator',
            title: 'eBay Fee & Net Profit Margin Calculator',
            tag: '2026 Rate Schedule',
            tagColor: '#f59e0b',
            description: 'Calculate Final Value Fees (12.35%–15%), $0.30 fixed per order insertion fee, Store subscription tier discounts, Promoted Listings ads, and actual net bank payout.',
            icon: Calculator
        }
    ];

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#60a5fa" />
                    <span>Free eBay Seller Intelligence &amp; Listing Optimization</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    eBay Seller Suite &amp; Cassini Title Studio
                </h1>
                <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Maximize your eBay search rank with Cassini algorithm compliant titles, algorithmic keyword opportunity scoring, and accurate final value fee calculations.
                </p>
            </div>

            {/* Tools Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <div
                            key={tool.pageKey}
                            onClick={() => onNavigate(tool.pageKey)}
                            style={{
                                background: '#0d121f',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '20px',
                                padding: '1.75rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={22} color="#60a5fa" />
                                    </div>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.05)', color: tool.tagColor, border: `1px solid ${tool.tagColor}33`, padding: '0.2rem 0.55rem', borderRadius: '6px', fontWeight: 700 }}>
                                        {tool.tag}
                                    </span>
                                </div>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.65rem' }}>
                                    {tool.title}
                                </h2>
                                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
                                    {tool.description}
                                </p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: 700, fontSize: '0.85rem', marginTop: '1.5rem' }}>
                                <span>Launch Tool</span>
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
