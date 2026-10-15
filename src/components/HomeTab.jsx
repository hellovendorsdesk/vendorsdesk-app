import React from 'react';
import { 
    FileText, 
    Layers, 
    Sparkles, 
    TrendingDown, 
    FileSpreadsheet, 
    Printer, 
    ArrowRight, 
    Zap, 
    CheckCircle2,
    ShieldCheck,
    Coins,
    BarChart3
} from 'lucide-react';

export default function HomeTab({ onNavigate }) {
    const tools = [
        {
            id: 'optimizer',
            title: 'Rate & Shipping Optimizer',
            badge: 'FREIGHT AUDIT',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            icon: TrendingDown,
            iconColor: '#2563eb',
            iconBg: '#eff6ff',
            description: 'Audit live Meesho freight slabs (₹48, ₹56, ₹62) via active token pool to ensure minimum shipping rates and maximum seller profit margin.',
            buttonText: 'Audit Rates',
            route: 'optimizer'
        },
        {
            id: 'label-exporter',
            title: 'Bulk Thermal Label Exporter',
            badge: '4x6 THERMAL',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            icon: Printer,
            iconColor: '#4f46e5',
            iconBg: '#eef2ff',
            description: 'Crop multi-order shipping label PDF sheets into 4x6 thermal printer format, automatically sorted by SKU combinations and courier partners.',
            buttonText: 'Crop Labels',
            route: 'label-exporter'
        },
        {
            id: 'pnl-calculator',
            title: 'Excel P&L Settlement Calculator',
            badge: 'EXCEL AUDITOR',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
            icon: FileSpreadsheet,
            iconColor: '#d97706',
            iconBg: '#fffbeb',
            description: 'Upload Meesho Payout Excel files to calculate exact net supplier payouts, customer return penalty deductions, ads spend, and RTO losses.',
            buttonText: 'Calculate Settlement',
            route: 'pnl-calculator'
        },
        {
            id: 'templates',
            title: '1-Click Listing Autofill Suite',
            badge: 'CHROME EXTENSION',
            badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
            icon: FileText,
            iconColor: '#0891b2',
            iconBg: '#ecfeff',
            description: 'Save your product listings once as templates. VendorsDesk Chrome Extension auto-fills forms across Meesho, Flipkart, and Amazon in seconds.',
            buttonText: 'Open Templates',
            route: 'templates'
        },
        {
            id: 'bg-remover',
            title: 'Background Remover Studio',
            badge: 'STUDIO V2',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            icon: Layers,
            iconColor: '#10b981',
            iconBg: '#ecfdf5',
            description: 'Isolate product subjects automatically, change background scenes live (Beach, Studio, Living Room, Marble), apply 19 Real Graphic PNG Badges.',
            buttonText: 'Launch Studio',
            route: 'bg-remover'
        },
        {
            id: 'free-image-generator',
            title: 'Free Catalog Image Generator',
            badge: '100% FREE',
            badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
            icon: Sparkles,
            iconColor: '#0d9488',
            iconBg: '#f0fdfa',
            description: 'Generate Pink/Blue borders, vertical canvas padding, and 19 Real Graphic PNG Badges to bypass Meesho duplicate listing blocks without login requirements.',
            buttonText: 'Open Generator',
            route: 'free-image-generator'
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
            
            {/* Hero Welcome Banner */}
            <div 
                style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    padding: '3rem 2rem 2.75rem 2rem',
                    borderRadius: '20px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)'
                }}
            >
                <div style={{ position: 'relative', zIndex: 2 }}>
                    
                    {/* Top Pill Badge */}
                    <div style={{ 
                        background: '#eff6ff', 
                        border: '1px solid #bfdbfe', 
                        color: '#2563eb', 
                        padding: '0.35rem 0.95rem', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.45rem', 
                        marginBottom: '1.25rem'
                    }}>
                        <ShieldCheck size={14} />
                        <span>AUTOMATED MEESHO SUPPLIER GROWTH PLATFORM</span>
                    </div>

                    <h1 style={{ 
                        fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', 
                        fontFamily: 'Plus Jakarta Sans, sans-serif', 
                        fontWeight: 800, 
                        marginBottom: '0.85rem', 
                        letterSpacing: '-0.03em', 
                        color: '#0f172a', 
                        lineHeight: 1.18 
                    }}>
                        Scale Your E-Commerce Sales With <br />
                        <span style={{ color: '#2563eb' }}>
                            Intelligent Automated Seller Tools
                        </span>
                    </h1>
                    
                    <p style={{ 
                        color: '#475569', 
                        maxWidth: '680px', 
                        margin: '0 auto 2rem auto', 
                        fontSize: '1rem', 
                        lineHeight: '1.6',
                        fontWeight: 400
                    }}>
                        Audit ₹48/₹56/₹62 shipping freight slabs, crop 4x6 thermal shipping labels, calculate exact net P&L settlements, and automate catalog studio imagery.
                    </p>

                    {/* Metric Highlights */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.45rem 0.85rem', borderRadius: '10px', fontSize: '0.78rem', color: '#0f172a', fontWeight: 600 }}>
                            <Zap size={14} color="#2563eb" />
                            <span>Instant Live Processing</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.45rem 0.85rem', borderRadius: '10px', fontSize: '0.78rem', color: '#0f172a', fontWeight: 600 }}>
                            <CheckCircle2 size={14} color="#10b981" />
                            <span>19 Certified Graphic Badges</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.45rem 0.85rem', borderRadius: '10px', fontSize: '0.78rem', color: '#0f172a', fontWeight: 600 }}>
                            <BarChart3 size={14} color="#d97706" />
                            <span>₹48 Freight Slab Audit</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.45rem 0.85rem', borderRadius: '10px', fontSize: '0.78rem', color: '#0f172a', fontWeight: 600 }}>
                            <Printer size={14} color="#4f46e5" />
                            <span>4x6 PDF Label Cropper</span>
                        </div>
                    </div>

                    {/* Primary CTA Buttons */}
                    <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="vd-btn vd-btn-primary"
                            style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}
                            onClick={() => onNavigate('optimizer')}
                        >
                            <span>Launch Rate Optimizer</span>
                            <ArrowRight size={16} />
                        </button>
                        <button
                            className="vd-btn vd-btn-secondary"
                            style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
                            onClick={() => onNavigate('label-exporter')}
                        >
                            <span>Crop Shipping Labels</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Essential Supplier Growth Tools Grid */}
            <div>
                <div style={{ marginBottom: '1.25rem', padding: '0 0.25rem' }}>
                    <h2 style={{ fontSize: '1.35rem', fontFamily: 'Plus Jakarta Sans', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                        Essential Supplier Growth Suite
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
                        Select an automated tool below to launch instant processing
                    </p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.25rem' }}>
                    {tools.map(tool => {
                        const Icon = tool.icon;
                        return (
                            <div 
                                key={tool.id} 
                                className="vd-card" 
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '1rem', 
                                    borderRadius: '16px',
                                    padding: '1.5rem'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ 
                                        width: '44px', height: '44px', borderRadius: '12px', 
                                        background: tool.iconBg, 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center' 
                                    }}>
                                        <Icon size={22} color={tool.iconColor} />
                                    </div>
                                    <span style={{ 
                                        fontSize: '0.65rem', 
                                        background: '#f1f5f9', 
                                        color: '#334155', 
                                        border: '1px solid #e2e8f0',
                                        padding: '0.2rem 0.65rem', 
                                        borderRadius: '6px', 
                                        fontWeight: 700,
                                        letterSpacing: '0.04em'
                                    }}>
                                        {tool.badge}
                                    </span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'Plus Jakarta Sans', color: '#0f172a' }}>
                                        {tool.title}
                                    </h3>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.55', margin: 0 }}>
                                        {tool.description}
                                    </p>
                                </div>
                                <button 
                                    className="vd-btn vd-btn-secondary" 
                                    style={{ marginTop: 'auto', width: '100%', justifyContent: 'space-between', padding: '0.55rem 0.85rem' }} 
                                    onClick={() => onNavigate(tool.route)}
                                >
                                    <span>{tool.buttonText}</span>
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Tips / Security Banner */}
            <div style={{ 
                background: '#eff6ff', 
                border: '1px solid #bfdbfe', 
                borderRadius: '16px', 
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={28} color="#2563eb" style={{ flexShrink: 0 }} />
                    <div>
                        <strong style={{ fontSize: '0.9rem', color: '#1e40af', display: 'block' }}>
                            Encrypted Supplier Automation Engine
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>
                            All shipping rate checks, label crops, and P&L files are processed locally in-browser and over TLS encrypted channels.
                        </span>
                    </div>
                </div>
                <button 
                    className="vd-btn vd-btn-primary" 
                    style={{ fontSize: '0.82rem', padding: '0.45rem 1rem', height: '36px' }}
                    onClick={() => onNavigate('billing')}
                >
                    <Coins size={14} />
                    <span>Get More Credits</span>
                </button>
            </div>

        </div>
    );
}
