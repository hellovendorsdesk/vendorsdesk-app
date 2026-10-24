import React from 'react';
import { Calculator, ShieldCheck, Target, RotateCcw, ArrowRight, Sparkles, Package } from 'lucide-react';

export default function FlipkartHubPage({ onNavigate }) {
    const tools = [
        {
            slug: '/flipkart/profit-calculator',
            pageKey: 'flipkart-profit-calculator',
            title: 'Tiered Commission & Profit Calculator',
            tag: 'Top Used Tool',
            tagColor: '#38bdf8',
            description: 'Calculate Marketplace Commission (5-20%), Fixed Fee, Collection Charge (Prepaid vs COD), Pick & Pack, Shipping Zones, and 18% GST.',
            icon: Calculator
        },
        {
            slug: '/flipkart/listing-scorecard',
            pageKey: 'flipkart-listing-scorecard',
            title: 'Flipkart Listing Quality Scorecard',
            tag: 'Algorithm Audit',
            tagColor: '#10b981',
            description: 'Audit your product listings against Flipkart search guidelines: title syntax, image dimensions (1000x1000px), and mandatory attributes.',
            icon: ShieldCheck
        },
        {
            slug: '/flipkart/pla-ads-roas-calculator',
            pageKey: 'flipkart-pla-ads-roas-calculator',
            title: 'PLA & PCA Ads ROAS Calculator',
            tag: 'Advertising',
            tagColor: '#a855f7',
            description: 'Evaluate Product Listing Ads (PLA) spend, target bids, conversion rates, and break-even ROAS to eliminate ad wastage.',
            icon: Target
        },
        {
            slug: '/flipkart/return-loss-estimator',
            pageKey: 'flipkart-return-loss-estimator',
            title: 'Customer & Courier Return Loss Calculator',
            tag: 'Loss Protection',
            tagColor: '#ef4444',
            description: 'Simulate return charges, reverse logistics fees, non-recoverable forward shipping, and product repackaging loss per 100 dispatches.',
            icon: RotateCcw
        }
    ];

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#38bdf8" />
                    <span>Free Flipkart Seller Growth &amp; Margin Suite</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    Flipkart Seller Tools &amp; Fee Calculators
                </h1>
                <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Master Flipkart tiered commissions, calculate accurate shipping zones, audit listing scores, and maximize net bank settlement.
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
                                justifyContent: 'space-between'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(56, 189, 248, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={22} color="#38bdf8" />
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginTop: '1.5rem' }}>
                                <span>Launch Free Tool</span>
                                <ArrowRight size={15} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
