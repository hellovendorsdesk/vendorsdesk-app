import React from 'react';
import { Calculator, Key, FileText, Sparkles, ArrowRight, Package } from 'lucide-react';

export default function AmazonHubPage({ onNavigate, onRegister }) {
    const tools = [
        {
            slug: '/amazon/fba-calculator',
            pageKey: 'amazon-fba-calculator',
            title: 'Amazon FBA & Net Profit Calculator',
            tag: 'Live 2026 Rate Schedule',
            tagColor: '#10b981',
            description: 'Accurately compute referral fees (6-15%), closing fee price slabs, FBA weight handling/pick & pack, 18% GST, and real bank payout margin.',
            icon: Calculator
        },
        {
            slug: '/amazon/keyword-cleaner',
            pageKey: 'amazon-keyword-cleaner',
            title: 'Duplicate Keyword Remover & 250-Byte Counter',
            tag: 'Amazon A9 Algorithm',
            tagColor: '#f97316',
            description: 'Deduplicate search terms, strip byte-wasting punctuation, and compute exact UTF-8 byte length to stay within Amazon’s 250-byte backend keyword limit.',
            icon: Key
        },
        {
            slug: '/amazon/description-editor',
            pageKey: 'amazon-description-editor',
            title: 'Product Description HTML Sanitizer',
            tag: 'Listing Protection',
            tagColor: '#38bdf8',
            description: 'Strip forbidden tags (scripts, fonts, divs) and format clean descriptions with Amazon-permitted tags (<b>, <p>, <ul>, <li>, <br>). Includes live preview.',
            icon: FileText
        }
    ];

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(249, 115, 22, 0.12)', border: '1px solid rgba(249, 115, 22, 0.3)', color: '#f97316', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#f97316" />
                    <span>Free Amazon Seller Growth &amp; Margin Utilities</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    Amazon Seller Calculators &amp; Listing Tools
                </h1>
                <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Real, functional tools for Amazon sellers: calculate accurate FBA payouts, clean and optimize backend keywords for the 250-byte limit, and sanitize description HTML.
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
                                e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(249, 115, 22, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={22} color="#f97316" />
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f97316', fontWeight: 700, fontSize: '0.85rem', marginTop: '1.5rem' }}>
                                <span>Launch Tool</span>
                                <ArrowRight size={15} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
