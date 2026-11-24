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
            title: 'Rate & shipping optimizer',
            badge: 'Freight audit',
            icon: TrendingDown,
            iconColor: '#38bdf8',
            description: 'Audit live Meesho freight slabs (₹48, ₹56, ₹62) to verify minimum courier slabs and prevent overcharging.',
            buttonText: 'Audit rates',
            route: 'optimizer'
        },
        {
            id: 'label-exporter',
            title: 'Bulk thermal label cropper',
            badge: '4×6 format',
            icon: Printer,
            iconColor: '#38bdf8',
            description: 'Crop multi-order shipping label PDF sheets into 4×6 thermal format, sorted by SKU and courier partner.',
            buttonText: 'Crop labels',
            route: 'label-exporter'
        },
        {
            id: 'pnl-calculator',
            title: 'Excel P&L calculator',
            badge: 'Settlement audit',
            icon: FileSpreadsheet,
            iconColor: '#38bdf8',
            description: 'Upload Meesho payout Excel sheets to calculate net supplier payouts, return deductions, and RTO losses.',
            buttonText: 'Calculate settlement',
            route: 'pnl-calculator'
        },
        {
            id: 'templates',
            title: 'Listing autofill suite',
            badge: 'Chrome extension',
            icon: FileText,
            iconColor: '#38bdf8',
            description: 'Store product listings as templates and auto-fill catalog forms across Meesho, Flipkart, and Amazon.',
            buttonText: 'Open templates',
            route: 'templates'
        },
        {
            id: 'bg-remover',
            title: 'Background remover',
            badge: 'Studio',
            icon: Layers,
            iconColor: '#38bdf8',
            description: 'Isolate product subjects and generate clean studio, marble, or lifestyle catalog backdrops.',
            buttonText: 'Launch studio',
            route: 'bg-remover'
        },
        {
            id: 'free-image-generator',
            title: 'Catalog image studio',
            badge: 'No login required',
            icon: Sparkles,
            iconColor: '#38bdf8',
            description: 'Generate colored border padding and clean badges to pass Meesho duplicate listing verification.',
            buttonText: 'Open studio',
            route: 'free-image-generator'
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
            
            {/* Hero Welcome Banner */}
            <div 
                style={{
                    background: '#0f1422',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '2.5rem 1.75rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)'
                }}
            >
                <div style={{ position: 'relative', zIndex: 2 }}>
                    
                    {/* Top Pill Badge */}
                    <div style={{ 
                        background: 'rgba(56, 189, 248, 0.08)', 
                        border: '1px solid rgba(56, 189, 248, 0.22)', 
                        color: '#38bdf8', 
                        padding: '0.3rem 0.85rem', 
                        borderRadius: '9999px', 
                        fontSize: '0.75rem', 
                        fontWeight: 500, 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.4rem', 
                        marginBottom: '1rem'
                    }}>
                        <ShieldCheck size={14} />
                        <span>Meesho supplier utility platform</span>
                    </div>

                    <h1 style={{ 
                        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', 
                        fontFamily: 'Plus Jakarta Sans, sans-serif', 
                        fontWeight: 600, 
                        marginBottom: '0.75rem', 
                        letterSpacing: '-0.02em', 
                        color: '#ffffff', 
                        lineHeight: 1.2 
                    }}>
                        Seller tools for dispatch, shipping rates, and catalog scale
                    </h1>
                    
                    <p style={{ 
                        color: '#94a3b8', 
                        maxWidth: '640px', 
                        margin: '0 auto 1.75rem auto', 
                        fontSize: '0.95rem', 
                        lineHeight: 1.6,
                        fontWeight: 400
                    }}>
                        Audit ₹48/₹56/₹62 shipping slabs, crop 4×6 thermal labels, calculate net payouts, and generate catalog image variations.
                    </p>

                    {/* Metric Highlights */}
                    <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', color: '#f8fafc', fontWeight: 500 }}>
                            <Zap size={14} color="#38bdf8" />
                            <span>Instant client checks</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', color: '#f8fafc', fontWeight: 500 }}>
                            <CheckCircle2 size={14} color="#10b981" />
                            <span>19 Certified graphic badges</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', color: '#f8fafc', fontWeight: 500 }}>
                            <BarChart3 size={14} color="#38bdf8" />
                            <span>₹48 Freight slab audit</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#141a29', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', color: '#f8fafc', fontWeight: 500 }}>
                            <Printer size={14} color="#38bdf8" />
                            <span>4×6 PDF label cropper</span>
                        </div>
                    </div>

                    {/* Primary CTA Buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="btn-primary"
                            style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
                            onClick={() => onNavigate('optimizer')}
                        >
                            <span>Launch rate optimizer</span>
                            <ArrowRight size={15} />
                        </button>
                        <button
                            className="btn-action"
                            style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
                            onClick={() => onNavigate('label-exporter')}
                        >
                            <span>Crop shipping labels</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Essential Supplier Growth Tools Grid */}
            <div>
                <div style={{ marginBottom: '1rem', padding: '0 0.25rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                        Essential seller suite
                    </h2>
                    <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                        Select a tool below to begin processing
                    </p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1rem' }}>
                    {tools.map(tool => {
                        const Icon = tool.icon;
                        return (
                            <div 
                                key={tool.id} 
                                className="panel-card" 
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '0.85rem', 
                                    borderRadius: '14px',
                                    padding: '1.4rem'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ 
                                        width: '40px', height: '40px', borderRadius: '10px', 
                                        background: 'rgba(56, 189, 248, 0.08)', 
                                        border: '1px solid rgba(56, 189, 248, 0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center' 
                                    }}>
                                        <Icon size={20} color={tool.iconColor} />
                                    </div>
                                    <span style={{ 
                                        fontSize: '0.68rem', 
                                        background: 'rgba(255, 255, 255, 0.04)', 
                                        color: '#94a3b8', 
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        padding: '0.15rem 0.55rem', 
                                        borderRadius: '6px', 
                                        fontWeight: 500
                                    }}>
                                        {tool.badge}
                                    </span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff' }}>
                                        {tool.title}
                                    </h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.825rem', lineHeight: 1.55, margin: 0 }}>
                                        {tool.description}
                                    </p>
                                </div>
                                <button 
                                    className="btn-action" 
                                    style={{ marginTop: 'auto', width: '100%', justifyContent: 'space-between', padding: '0.55rem 0.85rem', fontSize: '0.825rem' }} 
                                    onClick={() => onNavigate(tool.route)}
                                >
                                    <span>{tool.buttonText}</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick Tips / Security Banner */}
            <div style={{ 
                background: '#0c0e14', 
                border: '1px solid rgba(255, 255, 255, 0.08)', 
                borderRadius: '14px', 
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={24} color="#38bdf8" style={{ flexShrink: 0 }} />
                    <div>
                        <strong style={{ fontSize: '0.88rem', color: '#ffffff', display: 'block', fontWeight: 600 }}>
                            Client-side verified processing
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                            All shipping rate checks, label crops, and P&L calculations process locally in-browser with TLS encryption.
                        </span>
                    </div>
                </div>
                <button 
                    className="btn-action" 
                    style={{ fontSize: '0.82rem', padding: '0.45rem 1rem', height: '36px', gap: '0.4rem' }}
                    onClick={() => onNavigate('billing')}
                >
                    <Coins size={14} color="#38bdf8" />
                    <span>Purchase credits</span>
                </button>
            </div>

        </div>
    );
}
