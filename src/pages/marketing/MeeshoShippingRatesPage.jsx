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
    Check,
    ChevronRight
} from 'lucide-react';

export default function MeeshoShippingRatesPage({ onRegister }) {
    return (
        <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', background: '#080b11', color: '#f8fafc' }}>
            
            {/* ── 1. Hero Section (Obsidian Stealth SaaS) ────────────────── */}
            <section style={{
                padding: 'clamp(3rem, 7vw, 6rem) 1.25rem clamp(2.5rem, 5vw, 4.5rem) 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                
                {/* Precision Ambient Radial Light (Subtle Electric Sapphire / Cyan) */}
                <div style={{
                    position: 'absolute', 
                    top: '-10%', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    width: '750px', 
                    height: '350px',
                    background: 'radial-gradient(ellipse at 50% 20%, rgba(56, 189, 248, 0.14) 0%, rgba(37, 99, 235, 0.08) 35%, rgba(8, 11, 17, 0) 70%)',
                    pointerEvents: 'none', 
                    zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* Eyebrow Micro-Pill Tag */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        background: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.22)',
                        color: '#38bdf8',
                        padding: '0.35rem 0.95rem',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        marginBottom: '1.5rem',
                        boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)'
                    }}>
                        <Sparkles size={13} color="#38bdf8" />
                        <span>AI-POWERED MEESHO SUPPLIER ENGINE</span>
                    </div>

                    {/* Massive High-End Typographic Headline */}
                    <h1 style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 'clamp(2rem, 5.5vw, 3.85rem)',
                        fontWeight: 800,
                        lineHeight: 1.15,
                        letterSpacing: '-0.03em',
                        color: '#ffffff',
                        maxWidth: '860px',
                        margin: '0 auto 1.25rem auto',
                        wordBreak: 'normal',
                        overflowWrap: 'break-word',
                        padding: '0 0.5rem',
                        boxSizing: 'border-box'
                    }}>
                        Bypass Duplicate Image Blocks &amp;{' '}
                        <span style={{
                            background: 'linear-gradient(180deg, #ffffff 30%, #94a3b8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'inline'
                        }}>
                            Qualify for Lower Shipping Rates
                        </span>
                    </h1>

                    {/* Subtitle in sleek silver-slate */}
                    <p style={{
                        color: '#94a3b8',
                        fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                        maxWidth: '620px',
                        margin: '0 auto 2.25rem auto',
                        lineHeight: 1.65,
                        wordBreak: 'normal',
                        overflowWrap: 'break-word',
                        padding: '0 0.75rem',
                        boxSizing: 'border-box'
                    }}>
                        Automated catalog variation generator, AI background remover, SKU return penalty auditor, and bulk thermal label cropper purpose-built for high-volume Meesho sellers.
                    </p>

                    {/* Linear-Grade Button-in-Button CTA Architecture */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.85rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '520px',
                        marginBottom: '2.5rem',
                        boxSizing: 'border-box',
                        padding: '0 1rem'
                    }}>
                        <button 
                            onClick={onRegister}
                            style={{
                                background: '#ffffff',
                                color: '#080b11',
                                border: 'none',
                                borderRadius: '9999px',
                                padding: '0.75rem 1.4rem',
                                fontSize: '0.92rem',
                                fontWeight: 700,
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.65rem',
                                boxShadow: '0 0 35px rgba(255, 255, 255, 0.2), 0 4px 14px rgba(0, 0, 0, 0.3)',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            <span>Start Free Audit (3 Credits)</span>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: '#080b11',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ArrowRight size={13} />
                            </div>
                        </button>

                        <button 
                            onClick={() => {
                                const el = document.getElementById('bento-features');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                color: '#e2e8f0',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '9999px',
                                padding: '0.75rem 1.4rem',
                                fontSize: '0.92rem',
                                fontWeight: 600,
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                        >
                            <span>Explore 5 Tools</span>
                            <ChevronRight size={15} color="#94a3b8" />
                        </button>
                    </div>

                    {/* Obsidian Trust Badges */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        rowGap: '0.5rem',
                        fontSize: '0.8rem',
                        color: '#94a3b8',
                        fontWeight: 600,
                        width: '100%',
                        maxWidth: '680px',
                        margin: '0 auto',
                        boxSizing: 'border-box',
                        padding: '0 0.5rem'
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.07)',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '9999px'
                        }}>
                            <ShieldCheck size={14} color="#34d399" />
                            <span>100% Meesho Compliant</span>
                        </div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.07)',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '9999px'
                        }}>
                            <Zap size={14} color="#38bdf8" />
                            <span>Instant Automated Checks</span>
                        </div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.07)',
                            padding: '0.4rem 0.85rem',
                            borderRadius: '9999px'
                        }}>
                            <Lock size={14} color="#94a3b8" />
                            <span>Zero Password Storage</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── 2. Double-Bezel Bento Grid ────────────────────────────── */}
            <section id="bento-features" style={{
                width: '100%',
                maxWidth: '1140px',
                margin: '0 auto',
                padding: '3rem 1.25rem 5rem 1.25rem',
                boxSizing: 'border-box'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#94a3b8',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.65rem'
                    }}>
                        Core Capabilities
                    </div>
                    <h2 style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        margin: '0 auto 0.5rem auto'
                    }}>
                        Engineered for High-Volume Catalog Scale
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: 'clamp(0.88rem, 1.8vw, 1.05rem)', maxWidth: '560px', margin: '0 auto' }}>
                        Stop losing profit to wrongful shipping slabs and duplicate catalog suspensions.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                    gap: '1.5rem',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    
                    {/* Card 1: Freight & Rate Optimizer */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '24px',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.3)',
                        boxSizing: 'border-box'
                    }}>
                        <div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'rgba(56, 189, 248, 0.08)',
                                border: '1px solid rgba(56, 189, 248, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem'
                            }}>
                                <TrendingDown size={24} color="#38bdf8" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '0.2rem 0.55rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.65rem' }}>
                                SAVE ₹30 – ₹70 PER SHIPMENT
                            </span>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                                Meesho Freight &amp; Slab Optimizer
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Automatically audit actual packaged product variation weights against courier shipping rate slabs (0–500g vs 500g–1kg) to eliminate wrongful freight overcharges.
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '12px',
                            padding: '0.85rem 1.15rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Standard Courier Slab: <del style={{ color: '#94a3b8' }}>₹79</del></span>
                            <span style={{ fontWeight: 700, color: '#34d399' }}>Optimized Tier: ₹49</span>
                        </div>
                    </div>

                    {/* Card 2: Anti-Duplicate Studio */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '24px',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.3)',
                        boxSizing: 'border-box'
                    }}>
                        <div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'rgba(129, 140, 248, 0.08)',
                                border: '1px solid rgba(129, 140, 248, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem'
                            }}>
                                <Layers size={24} color="#818cf8" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#818cf8', background: 'rgba(129, 140, 248, 0.08)', border: '1px solid rgba(129, 140, 248, 0.2)', padding: '0.2rem 0.55rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.65rem' }}>
                                ALGORITHMIC EVASION
                            </span>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                                Anti-Duplicate Catalog Studio
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Generate unique, panel-compliant high-resolution catalog variations with distinct crop angles, subtle background masks, and borders to pass Meesho's automated filters.
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '12px',
                            padding: '0.85rem 1.15rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Panel Compliance Check</span>
                            <span style={{ fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <Check size={14} /> 100% Passed
                            </span>
                        </div>
                    </div>

                    {/* Card 3: 4x6 Thermal Label Cropper */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '24px',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.3)',
                        boxSizing: 'border-box'
                    }}>
                        <div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'rgba(56, 189, 248, 0.08)',
                                border: '1px solid rgba(56, 189, 248, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem'
                            }}>
                                <Printer size={24} color="#38bdf8" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.2rem 0.55rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.65rem' }}>
                                WAREHOUSE AUTOMATION
                            </span>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                                4×6 Bulk Thermal Label Cropper
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Drop in multi-order Meesho PDF invoice batches. Instantly crop labels into 4×6 thermal print sheets, sequenced automatically by SKU and courier partner.
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '12px',
                            padding: '0.85rem 1.15rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Dispatch Sorting</span>
                            <span style={{ fontWeight: 700, color: '#38bdf8' }}>By SKU &amp; Courier</span>
                        </div>
                    </div>

                    {/* Card 4: Net P&L Settlement Sheet */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '24px',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.3)',
                        boxSizing: 'border-box'
                    }}>
                        <div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'rgba(52, 211, 153, 0.08)',
                                border: '1px solid rgba(52, 211, 153, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.25rem'
                            }}>
                                <FileSpreadsheet size={24} color="#34d399" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '0.2rem 0.55rem', borderRadius: '6px', display: 'inline-block', marginBottom: '0.65rem' }}>
                                ZERO SURPRISE LOSS
                            </span>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                                True P&amp;L Settlement Sheet
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Factor in average RTO returns, return shipping surcharge, packaging expenses, and GST input credits to compute your true net margin before dispatching.
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '12px',
                            padding: '0.85rem 1.15rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Return Loss Factor</span>
                            <span style={{ fontWeight: 700, color: '#34d399' }}>Instant Calculation</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── 3. Step Walkthrough (Obsidian Timeline) ────────────────── */}
            <section style={{
                background: 'rgba(255, 255, 255, 0.015)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '4.5rem 1.25rem'
            }}>
                <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        marginBottom: '2.5rem'
                    }}>
                        Operational Workflow in 3 Steps
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.5rem',
                        textAlign: 'left'
                    }}>
                        <div style={{
                            padding: '1.75rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)'
                        }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ffffff', color: '#080b11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                                1
                            </div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                                Upload Image or PDF
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                                Drop your product photo or bulk invoice sheet. No complex calibration or manual measurement needed.
                            </p>
                        </div>

                        <div style={{
                            padding: '1.75rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)'
                        }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#38bdf8', color: '#080b11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                                2
                            </div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                                AI Analyzes Slabs
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                                Algorithms calculate true freight brackets and generate unique, panel-compliant listing variations.
                            </p>
                        </div>

                        <div style={{
                            padding: '1.75rem',
                            background: 'rgba(255, 255, 255, 0.02)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)'
                        }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#34d399', color: '#080b11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                                3
                            </div>
                            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                                Export &amp; Save Money
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                                Export cropped thermal print packs or listing files and start saving ₹30–₹70 on every order.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
