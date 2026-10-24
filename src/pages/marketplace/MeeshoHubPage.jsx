import React from 'react';
import { RotateCcw, Truck, Image, Printer, FileSpreadsheet, Sparkles, ArrowRight, Package } from 'lucide-react';

export default function MeeshoHubPage({ onNavigate }) {
    const tools = [
        {
            slug: '/meesho/shipping-rates',
            pageKey: 'meesho-shipping-rates',
            title: 'Freight & Courier Slab Optimizer',
            tag: 'Top Used Tool',
            tagColor: '#ec4899',
            description: 'Audit product dimensions and weight slabs (₹48, ₹56, ₹62) to qualify for lower shipping charges and protect net margins.',
            icon: Truck
        },
        {
            slug: '/meesho/rto-return-loss-calculator',
            pageKey: 'meesho-rto-calculator',
            title: 'RTO & Customer Return Loss Simulator',
            tag: 'Profit Protection',
            tagColor: '#ef4444',
            description: 'Calculate the real financial bleed of 15-30% RTO and customer returns. Find the minimum selling price to stay profitable.',
            icon: RotateCcw
        },
        {
            slug: '/meesho/label-exporter',
            pageKey: 'meesho-label-exporter',
            title: '4×6 Thermal Label Cropper & SKU Sorter',
            tag: 'Packing Utility',
            tagColor: '#38bdf8',
            description: 'Crop multi-page Meesho shipping label PDFs into 4x6 thermal printer format. Automatically group and sort labels by SKU.',
            icon: Printer
        },
        {
            slug: '/meesho/image-generator',
            pageKey: 'free-image-generator',
            title: 'Anti-Duplicate Catalog Image Studio',
            tag: 'Catalog SEO',
            tagColor: '#10b981',
            description: 'Bypass Meesho duplicate listing bans with custom borders, vertical spacers, and 19 verified graphic trust badges.',
            icon: Image
        },
        {
            slug: '/meesho/pnl-calculator',
            pageKey: 'pnl-calculator',
            title: 'Excel P&L Settlement Sheet Auditor',
            tag: 'Accounting',
            tagColor: '#a855f7',
            description: 'Upload Meesho payment settlement sheets to audit net bank payouts after returns, forward shipping, and TCS/TDS deductions.',
            icon: FileSpreadsheet
        }
    ];

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#ec4899', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#ec4899" />
                    <span>#1 Meesho Supplier Growth &amp; Utility Suite</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    Meesho Supplier Tools &amp; Rate Optimizers
                </h1>
                <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Stop shipping fee leakages, eliminate RTO return losses, crop thermal labels in bulk, and audit net bank settlements. 100% free, no login needed.
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
                                        <Icon size={22} color="#ec4899" />
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

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ec4899', fontWeight: 700, fontSize: '0.85rem', marginTop: '1.5rem' }}>
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
