import React from 'react';
import { Tag, Sparkles, ArrowRight, Calculator, Search } from 'lucide-react';

export default function EtsyHubPage({ onNavigate }) {
    const tools = [
        {
            slug: '/etsy/tag-generator',
            pageKey: 'etsy-tag-generator',
            title: 'Etsy 13-Tag Studio & 140-Char Title',
            tag: 'Strict ≤20 Char Limit',
            tagColor: '#ec4899',
            description: 'Generate exactly 13 unique tags strictly under 20 characters and a 140-character pipe-separated title. Strips forbidden punctuation and provides one-click CSV export.',
            icon: Tag
        },
        {
            slug: '/etsy/keyword-tool',
            pageKey: 'etsy-keyword-tool',
            title: 'Etsy Long-Tail Keyword Research',
            tag: 'Opportunity Score',
            tagColor: '#10b981',
            description: 'Discover artisan, vintage, and handmade long-tail phrases. Scored using logarithmic competition metrics and the $20–$100 sweet-spot profit curve.',
            icon: Search
        },
        {
            slug: '/etsy/profit-calculator',
            pageKey: 'etsy-profit-calculator',
            title: 'Etsy Profit & Seller Fee Calculator',
            tag: '2026 Fee Schedule',
            tagColor: '#f97316',
            description: 'Compute $0.20 listing renewals, 6.5% transaction fees, 3% + $0.25 payment processing, regulatory fees, Offsite Ads (12%–15%), and net creator margin.',
            icon: Calculator
        }
    ];

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#f472b6" />
                    <span>Free Etsy Maker &amp; Artisan Growth Utilities</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    Etsy Seller Suite &amp; 13-Tag Studio
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Grow your Etsy shop with algorithmically compliant 13-tag matrices (≤20 chars), 140-char title optimizers, and transparent fee &amp; profit calculations.
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
                                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.4)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(236, 72, 153, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={22} color="#f472b6" />
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f472b6', fontWeight: 700, fontSize: '0.85rem', marginTop: '1.5rem' }}>
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
