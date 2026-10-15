import React from 'react';
import { 
    Sparkles, 
    ArrowRight, 
    ShieldCheck, 
    Zap, 
    Lock, 
    TrendingDown, 
    Layers, 
    Printer, 
    FileSpreadsheet, 
    CheckCircle2,
    Check
} from 'lucide-react';

export default function MeeshoShippingRatesPage({ onRegister }) {
    return (
        <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
            
            {/* ── 1. Hero Section ────────────────────────────────────────── */}
            <section className="hero-section">
                
                {/* Subtle Ambient Light (No harsh purple gradients) */}
                <div style={{
                    position: 'absolute', 
                    top: '0', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    width: '600px', 
                    height: '240px',
                    background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.08) 0%, rgba(248, 250, 252, 0) 70%)',
                    pointerEvents: 'none', 
                    zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* Modern Top Pill Badge */}
                    <div className="hero-pill">
                        <Sparkles size={14} color="#2563eb" />
                        <span>AI-Powered Meesho Catalog &amp; Freight Optimization Suite</span>
                    </div>

                    {/* Fluid Responsive Heading (Zero Text Cut-off) */}
                    <h1 className="hero-title">
                        Bypass Duplicate Image Blocks &amp;{' '}
                        <span className="hero-title-gradient">Qualify for Lower Shipping Rates</span>
                    </h1>

                    {/* Subtitle with guaranteed wrapping */}
                    <p className="hero-subtitle">
                        Automated catalog variation generator, AI background remover, SKU return penalty auditor, and bulk thermal label cropper purpose-built for Meesho &amp; e-commerce sellers.
                    </p>

                    {/* High-End SaaS CTA Buttons */}
                    <div className="hero-cta-group">
                        <button 
                            className="btn-primary" 
                            onClick={onRegister}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <Sparkles size={16} />
                            <span>Start Free Audit (3 Credits)</span>
                        </button>
                        <button 
                            className="btn-action"
                            onClick={() => {
                                const el = document.getElementById('bento-features');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <span>Explore 5 Tools</span>
                            <ArrowRight size={15} />
                        </button>
                    </div>

                    {/* Responsive Trust Badges (Wrap gracefully without overflow) */}
                    <div className="hero-badges-row">
                        <div className="hero-badge-item">
                            <ShieldCheck size={14} color="#059669" />
                            <span>100% Meesho Compliant</span>
                        </div>
                        <div className="hero-badge-item">
                            <Zap size={14} color="#2563eb" />
                            <span>Instant Automated Checks</span>
                        </div>
                        <div className="hero-badge-item">
                            <Lock size={14} color="#475569" />
                            <span>Zero Password Storage</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── 2. Bento Feature Grid ─────────────────────────────────── */}
            <section id="bento-features" className="bento-section">
                
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: '#f1f5f9',
                        color: '#475569',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem'
                    }}>
                        <span>Core Capabilities</span>
                    </div>
                    <h2 style={{ fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 auto 0.5rem auto' }}>
                        Everything You Need to Scale on Meesho
                    </h2>
                    <p style={{ color: '#64748b', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', maxWidth: '560px', margin: '0 auto' }}>
                        Stop losing profit to wrongful shipping slabs and duplicate listing bans.
                    </p>
                </div>

                <div className="bento-grid">
                    
                    {/* Feature 1: Freight & Rate Optimizer */}
                    <div className="bento-card">
                        <div>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem'
                            }}>
                                <TrendingDown size={22} color="#2563eb" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.55rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.5rem' }}>
                                SAVE ₹30 - ₹70 PER SHIPMENT
                            </span>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                                Meesho Freight &amp; Slab Optimizer
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                                Automatically audit actual packaged product variation weights against courier shipping rate slabs (0–500g vs 500g–1kg) to eliminate wrongful freight overcharges.
                            </p>
                        </div>
                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '0.85rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Standard Shipping: <del>₹79</del></span>
                            <span style={{ fontWeight: 700, color: '#059669' }}>Optimized: ₹49</span>
                        </div>
                    </div>

                    {/* Feature 2: Image Variation Studio */}
                    <div className="bento-card">
                        <div>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem'
                            }}>
                                <Layers size={22} color="#2563eb" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '0.2rem 0.55rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.5rem' }}>
                                ZERO CATALOG BLOCK
                            </span>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                                Anti-Duplicate Catalog Studio
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                                Generate unique, panel-compliant high-resolution catalog variations with distinct crop angles, subtle background masks, and borders to pass Meesho's algorithm.
                            </p>
                        </div>
                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '0.85rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Compliance Check</span>
                            <span style={{ fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <Check size={14} /> Passed 100%
                            </span>
                        </div>
                    </div>

                    {/* Feature 3: Bulk Thermal Label Cropper */}
                    <div className="bento-card">
                        <div>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem'
                            }}>
                                <Printer size={22} color="#2563eb" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', background: '#f1f5f9', padding: '0.2rem 0.55rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.5rem' }}>
                                WAREHOUSE READY
                            </span>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                                4×6 Bulk Thermal Label Cropper
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                                Drop in multi-order Meesho PDF invoice batches. Instantly crop labels into 4×6 thermal print sheets, sequenced automatically by SKU and courier.
                            </p>
                        </div>
                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '0.85rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Auto-Organize</span>
                            <span style={{ fontWeight: 700, color: '#2563eb' }}>By SKU &amp; Courier</span>
                        </div>
                    </div>

                    {/* Feature 4: Profit & Loss Settlement Calculator */}
                    <div className="bento-card">
                        <div>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem'
                            }}>
                                <FileSpreadsheet size={22} color="#2563eb" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.55rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.5rem' }}>
                                ZERO SURPRISE LOSS
                            </span>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                                E-Commerce Settlement &amp; Net Margin
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: '1.55', marginBottom: '1.25rem' }}>
                                Factor in average RTO returns, return shipping surcharge, packaging expenses, and GST input credits to compute your true net margin before dispatching.
                            </p>
                        </div>
                        <div style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '0.85rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.8rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Return Loss Factor</span>
                            <span style={{ fontWeight: 700, color: '#059669' }}>Calculated Instantly</span>
                        </div>
                    </div>

                </div>

            </section>

            {/* ── 3. Quick 3-Step Walkthrough ───────────────────────────── */}
            <section style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '4rem 1.25rem' }}>
                <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#0f172a', marginBottom: '2.5rem' }}>
                        How It Works in 3 Simple Steps
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                        
                        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1rem' }}>
                                1
                            </div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                                Upload Image or PDF
                            </h4>
                            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                                Drop your product photo or bulk invoice sheet. No manual measurement setup needed.
                            </p>
                        </div>

                        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1rem' }}>
                                2
                            </div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                                AI Audits &amp; Optimizes
                            </h4>
                            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                                Algorithms calculate true freight slab brackets and generate duplicate-proof variations.
                            </p>
                        </div>

                        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1rem' }}>
                                3
                            </div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                                Download &amp; Save Money
                            </h4>
                            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                                Export cropped thermal print packs or listing files and start saving on every order.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
