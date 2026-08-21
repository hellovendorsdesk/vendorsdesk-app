import React from 'react';

export default function HomeTab({ onNavigate }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
            
            {/* Hero Welcome Banner with High-End SaaS Glassmorphism */}
            <div 
                className="panel-card"
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: '1px solid rgba(37, 99, 235, 0.22)',
                    padding: '3.75rem 2.5rem 3.25rem 2.5rem',
                    borderRadius: '28px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
                }}
            >
                {/* Background Ambient Glowing Orbs */}
                <div style={{
                    position: 'absolute', top: '-25%', left: '50%', transform: 'translateX(-50%)',
                    width: '450px', height: '450px',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.14) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 70%)',
                    filter: 'blur(50px)', pointerEvents: 'none'
                }} />
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                    
                    {/* Top Pill Badge */}
                    <div style={{ 
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)', 
                        border: '1px solid rgba(37, 99, 235, 0.25)', 
                        color: '#2563eb', 
                        padding: '0.4rem 1.1rem', 
                        borderRadius: '30px', 
                        fontSize: '0.78rem', 
                        fontWeight: 800, 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.45rem', 
                        marginBottom: '1.25rem',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.08)'
                    }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
                        INDIA'S #1 AUTOMATED MEESHO SUPPLIER GROWTH PLATFORM
                    </div>

                    <h1 style={{ 
                        fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', 
                        fontFamily: 'Outfit, sans-serif', 
                        fontWeight: 800, 
                        marginBottom: '1rem', 
                        letterSpacing: '-0.03em', 
                        color: '#0f172a', 
                        lineHeight: 1.12 
                    }}>
                        Scale Your E-Commerce Sales With <br />
                        <span style={{ 
                            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)', 
                            WebkitBackgroundClip: 'text', 
                            WebkitTextFillColor: 'transparent' 
                        }}>
                            Smart Automated Seller Tools
                        </span>
                    </h1>
                    
                    <p style={{ 
                        color: '#475569', 
                        maxWidth: '720px', 
                        margin: '0 auto 2.25rem auto', 
                        fontSize: '1.08rem', 
                        lineHeight: '1.65',
                        fontWeight: 450
                    }}>
                        Isolate product subjects live, replace background scenes with 12 studio backdrops, apply 19 PNG graphic stamps, audit ₹48/₹56/₹62 shipping rate slabs, and crop 4x6 PDF thermal shipping labels.
                    </p>

                    {/* Live Metric Pills */}
                    <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
                        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem', color: '#0f172a', fontWeight: 700, boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
                            ⚡ 100% Automated Studio
                        </div>
                        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem', color: '#0f172a', fontWeight: 700, boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
                            🖼️ 19 PNG Graphic Badges
                        </div>
                        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem', color: '#0f172a', fontWeight: 700, boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
                            📊 ₹48 Freight Slab Audit
                        </div>
                        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem', color: '#0f172a', fontWeight: 700, boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
                            📋 4x6 PDF Label Cropper
                        </div>
                    </div>

                    {/* Primary CTA Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="btn-submit-form"
                            style={{ 
                                padding: '0.9rem 2.25rem', 
                                fontSize: '1rem', 
                                fontWeight: 800, 
                                borderRadius: '14px', 
                                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', 
                                boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)' 
                            }}
                            onClick={() => onNavigate('bg-remover')}
                        >
                            🖼️ Open Background Remover Studio ➔
                        </button>
                        <button
                            className="btn-action"
                            style={{ 
                                padding: '0.9rem 2rem', 
                                fontSize: '1rem', 
                                fontWeight: 800, 
                                borderRadius: '14px', 
                                background: '#ffffff', 
                                border: '1px solid #cbd5e1', 
                                color: '#0f172a',
                                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)'
                            }}
                            onClick={() => onNavigate('free-image-generator')}
                        >
                            🆓 Free Image Generator
                        </button>
                    </div>
                </div>
            </div>

            {/* 5 Essential Supplier Growth Tools Grid */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', padding: '0 0.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.6rem', fontFamily: 'Outfit', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                            🚀 Essential Supplier Growth Suite
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                            Select an automated tool below to launch instant processing
                        </p>
                    </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.75rem' }}>
                    
                    {/* Tool 1: Background Remover & Studio */}
                    <div className="panel-card card-hover-lift" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.35rem', 
                        border: '1px solid rgba(236, 72, 153, 0.35)', 
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(253, 242, 248, 0.9))',
                        borderRadius: '24px',
                        padding: '1.75rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                                🖼️
                            </div>
                            <span style={{ fontSize: '0.68rem', background: 'linear-gradient(135deg, #ec4899, #d946ef)', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 800 }}>
                                STUDIO V2
                            </span>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.6rem', fontFamily: 'Outfit', color: '#0f172a' }}>
                                Background Remover & Studio
                            </h4>
                            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                                Isolate product subjects automatically, change background scenes live (Beach, Forest, Living Room, Palace, Marble), apply 19 Real Graphic PNG Badges, and export ZIP.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', width: '100%', padding: '0.75rem', fontWeight: 800, borderRadius: '12px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }} onClick={() => onNavigate('bg-remover')}>
                            Launch Live Studio ➔
                        </button>
                    </div>

                    {/* Tool 2: Free Image Generator */}
                    <div className="panel-card card-hover-lift" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.35rem', 
                        border: '1px solid rgba(16, 185, 129, 0.35)', 
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(236, 253, 245, 0.9))',
                        borderRadius: '24px',
                        padding: '1.75rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                                🆓
                            </div>
                            <span style={{ fontSize: '0.68rem', background: '#10b981', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 800 }}>
                                100% FREE
                            </span>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.6rem', fontFamily: 'Outfit', color: '#0f172a' }}>
                                Free Catalog Image Generator
                            </h4>
                            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                                Generate Pink/Blue borders, vertical canvas padding, and 19 Real Graphic PNG Badges to bypass Meesho duplicate listing blocks without login requirements.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', width: '100%', padding: '0.75rem', fontWeight: 800, borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #059669)' }} onClick={() => onNavigate('free-image-generator')}>
                            Open Generator ➔
                        </button>
                    </div>

                    {/* Tool 3: Rate & Shipping Optimizer */}
                    <div className="panel-card card-hover-lift" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.35rem', 
                        border: '1px solid rgba(37, 99, 235, 0.35)', 
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(239, 246, 255, 0.9))',
                        borderRadius: '24px',
                        padding: '1.75rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                                ⚡
                            </div>
                            <span style={{ fontSize: '0.68rem', background: '#2563eb', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 800 }}>
                                ₹48 SLAB AUDIT
                            </span>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.6rem', fontFamily: 'Outfit', color: '#0f172a' }}>
                                Rate & Shipping Optimizer
                            </h4>
                            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                                Check live Meesho freight slabs (₹48, ₹56, ₹62) via active token pool to ensure minimum shipping rates and maximum seller profit margin.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', width: '100%', padding: '0.75rem', fontWeight: 800, borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }} onClick={() => onNavigate('optimizer')}>
                            Audit Rates ➔
                        </button>
                    </div>

                    {/* Tool 4: Excel P&L Settlement Calculator */}
                    <div className="panel-card card-hover-lift" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.35rem', 
                        border: '1px solid rgba(217, 119, 6, 0.35)', 
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(254, 243, 199, 0.9))',
                        borderRadius: '24px',
                        padding: '1.75rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(217, 119, 6, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                                📊
                            </div>
                            <span style={{ fontSize: '0.68rem', background: '#d97706', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 800 }}>
                                EXCEL AUDITOR
                            </span>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.6rem', fontFamily: 'Outfit', color: '#0f172a' }}>
                                Excel P&L Settlement Calculator
                            </h4>
                            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                                Upload Meesho Payout Excel files to calculate exact net supplier payouts, customer return penalty deductions, ads spend, and RTO losses.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', width: '100%', padding: '0.75rem', fontWeight: 800, borderRadius: '12px', background: 'linear-gradient(135deg, #d97706, #b45309)' }} onClick={() => onNavigate('pnl-calculator')}>
                            Calculate Settlement ➔
                        </button>
                    </div>

                    {/* Tool 5: Bulk Thermal Label Exporter */}
                    <div className="panel-card card-hover-lift" style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.35rem', 
                        border: '1px solid rgba(124, 58, 237, 0.35)', 
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(243, 232, 255, 0.9))',
                        borderRadius: '24px',
                        padding: '1.75rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                                📋
                            </div>
                            <span style={{ fontSize: '0.68rem', background: '#7c3aed', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 800 }}>
                                4x6 THERMAL
                            </span>
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.6rem', fontFamily: 'Outfit', color: '#0f172a' }}>
                                Bulk Thermal Label Exporter
                            </h4>
                            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                                Crop shipping label PDF sheets into 4x6 thermal printer format, automatically sorted by SKU combinations and courier partners.
                            </p>
                        </div>
                        <button className="btn-action btn-action-primary" style={{ marginTop: 'auto', width: '100%', padding: '0.75rem', fontWeight: 800, borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }} onClick={() => onNavigate('label-exporter')}>
                            Crop Labels ➔
                        </button>
                    </div>

                </div>
            </div>

            {/* Page-Wise Master SEO Keyword Directory & Optimization Center */}
            <div style={{ background: '#ffffff', borderRadius: '28px', border: '1px solid #cbd5e1', padding: '2rem', boxShadow: '0 15px 35px rgba(15, 23, 42, 0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                        <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, display: 'inline-block', marginBottom: '0.4rem' }}>
                            🎯 GOOGLE RANK #1 PAGE-WISE KEYWORD DIRECTORY
                        </div>
                        <h3 style={{ fontSize: '1.45rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                            Page-Wise SEO Keyword Master Directory & Plan
                        </h3>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.35rem' }}>
                    
                    {/* Page 1: Home */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#2563eb' }}>🏠 Home Page (`/`)</div>
                        <div style={{ fontSize: '0.8rem', color: '#0f172a' }}><strong>Primary Keywords:</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                            meesho shipping rate calculator, meesho weight slabs 2026, meesho seller fee calculator
                        </div>
                    </div>

                    {/* Page 2: BG Remover */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ec4899' }}>🖼️ AI Studio & BG Remover (`/background-remover`)</div>
                        <div style={{ fontSize: '0.8rem', color: '#0f172a' }}><strong>Primary Keywords:</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                            meesho background remover free online, meesho studio backdrop generator, product photo editor meesho
                        </div>
                    </div>

                    {/* Page 3: Free Image Generator */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#10b981' }}>🆓 Free Image Generator (`/free-image-generator`)</div>
                        <div style={{ fontSize: '0.8rem', color: '#0f172a' }}><strong>Primary Keywords:</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                            meesho catalog image generator free, meesho pink border image maker, meesho duplicate image bypass tool
                        </div>
                    </div>

                    {/* Page 4: Rate Optimizer */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#2563eb' }}>⚡ Rate Optimizer (`/rate-optimizer`)</div>
                        <div style={{ fontSize: '0.8rem', color: '#0f172a' }}><strong>Primary Keywords:</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                            meesho rate optimizer tool, meesho ₹48 shipping slab check, meesho logistics fee audit tool
                        </div>
                    </div>

                    {/* Page 5: Excel P&L Auditor */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#d97706' }}>📊 Excel P&L Auditor (`/pnl-calculator`)</div>
                        <div style={{ fontSize: '0.8rem', color: '#0f172a' }}><strong>Primary Keywords:</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                            meesho pnl calculator excel, meesho payment settlement auditor, meesho bank payout reconciliation excel
                        </div>
                    </div>

                    {/* Page 6: Label Exporter */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#7c3aed' }}>📋 Thermal Label Exporter (`/label-exporter`)</div>
                        <div style={{ fontSize: '0.8rem', color: '#0f172a' }}><strong>Primary Keywords:</strong></div>
                        <div style={{ fontSize: '0.78rem', color: '#475569', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                            meesho pdf shipping label cropper 4x6, meesho label exporter sku sorter, thermal label cropper meesho
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
