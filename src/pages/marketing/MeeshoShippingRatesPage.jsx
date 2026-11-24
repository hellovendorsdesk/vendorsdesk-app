import React from 'react';
import { 
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
            
            {/* 1. Hero Section */}
            <section style={{
                padding: 'clamp(2.75rem, 6vw, 5rem) 1.25rem clamp(2.25rem, 4.5vw, 4rem) 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* Eyebrow Micro-Pill Tag */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.22)',
                        color: '#38bdf8',
                        padding: '0.3rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        marginBottom: '1.25rem'
                    }}>
                        <ShieldCheck size={13} color="#38bdf8" />
                        <span>Meesho supplier utility platform</span>
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 'clamp(1.85rem, 5vw, 3.25rem)',
                        fontWeight: 600,
                        lineHeight: 1.2,
                        letterSpacing: '-0.025em',
                        color: '#ffffff',
                        maxWidth: '860px',
                        margin: '0 auto 1rem auto',
                        wordBreak: 'normal',
                        overflowWrap: 'break-word',
                        padding: '0 0.5rem',
                        boxSizing: 'border-box'
                    }}>
                        Bypass duplicate image blocks and qualify for lower shipping rates
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        color: '#94a3b8',
                        fontSize: 'clamp(0.925rem, 1.8vw, 1.1rem)',
                        maxWidth: '620px',
                        margin: '0 auto 2rem auto',
                        lineHeight: 1.6,
                        wordBreak: 'normal',
                        overflowWrap: 'break-word',
                        padding: '0 0.75rem',
                        boxSizing: 'border-box'
                    }}>
                        Catalog variation generator, background remover, return penalty auditor, and bulk thermal label cropper built for high-volume Meesho sellers.
                    </p>

                    {/* CTA Actions */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '500px',
                        marginBottom: '2rem',
                        boxSizing: 'border-box',
                        padding: '0 1rem'
                    }}>
                        <button 
                            onClick={onRegister}
                            className="btn-primary"
                            style={{
                                padding: '0.7rem 1.4rem',
                                fontSize: '0.9rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>Start free audit (3 credits)</span>
                            <ArrowRight size={14} />
                        </button>

                        <button 
                            onClick={() => {
                                const el = document.getElementById('bento-features');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="btn-action"
                            style={{
                                padding: '0.7rem 1.4rem',
                                fontSize: '0.9rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}
                        >
                            <span>Explore 5 tools</span>
                            <ChevronRight size={14} color="#94a3b8" />
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.65rem',
                        rowGap: '0.45rem',
                        fontSize: '0.78rem',
                        color: '#94a3b8',
                        fontWeight: 500,
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
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '9999px'
                        }}>
                            <ShieldCheck size={13} color="#34d399" />
                            <span>100% Meesho compliant</span>
                        </div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '9999px'
                        }}>
                            <Zap size={13} color="#38bdf8" />
                            <span>Instant client checks</span>
                        </div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '9999px'
                        }}>
                            <Lock size={13} color="#94a3b8" />
                            <span>No credentials stored</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* 2. Bento Capabilities Grid */}
            <section id="bento-features" style={{
                width: '100%',
                maxWidth: '1140px',
                margin: '0 auto',
                padding: '2.5rem 1.25rem 4.5rem 1.25rem',
                boxSizing: 'border-box'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
                        fontWeight: 500,
                        marginBottom: '0.5rem'
                    }}>
                        Capabilities
                    </div>
                    <h2 style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        fontWeight: 600,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        margin: '0 auto 0.4rem auto'
                    }}>
                        Engineered for catalog and dispatch scale
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)', maxWidth: '560px', margin: '0 auto' }}>
                        Prevent margin loss from incorrect shipping slabs and duplicate catalog suspensions.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                    gap: '1.25rem',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                    
                    {/* Card 1: Freight & Rate Optimizer */}
                    <div className="panel-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: '16px',
                        padding: '1.75rem'
                    }}>
                        <div>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                background: 'rgba(56, 189, 248, 0.08)',
                                border: '1px solid rgba(56, 189, 248, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <TrendingDown size={20} color="#38bdf8" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#34d399', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '0.2rem 0.55rem', borderRadius: '4px', display: 'inline-block', marginBottom: '0.5rem' }}>
                                Save ₹30 – ₹70 per order
                            </span>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.4rem' }}>
                                Freight and slab optimizer
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                Audit packaged product weights against courier rate slabs (0–500g vs 500g–1kg) to eliminate wrongful shipping overcharges.
                            </p>
                        </div>
                        <div style={{
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem',
                            fontVariantNumeric: 'tabular-nums'
                        }}>
                            <span style={{ color: '#64748b' }}>Standard slab: <del style={{ color: '#94a3b8' }}>₹79</del></span>
                            <span style={{ fontWeight: 600, color: '#34d399' }}>Optimized slab: ₹49</span>
                        </div>
                    </div>

                    {/* Card 2: Anti-Duplicate Studio */}
                    <div className="panel-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: '16px',
                        padding: '1.75rem'
                    }}>
                        <div>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                background: 'rgba(56, 189, 248, 0.08)',
                                border: '1px solid rgba(56, 189, 248, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <Layers size={20} color="#38bdf8" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '0.2rem 0.55rem', borderRadius: '4px', display: 'inline-block', marginBottom: '0.5rem' }}>
                                Variation generator
                            </span>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.4rem' }}>
                                Anti-duplicate catalog studio
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                Generate unique catalog variations with distinct crop angles, background masks, and borders to pass automated image filters.
                            </p>
                        </div>
                        <div style={{
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Compliance check</span>
                            <span style={{ fontWeight: 600, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <Check size={14} /> 100% passed
                            </span>
                        </div>
                    </div>

                    {/* Card 3: 4x6 Thermal Label Cropper */}
                    <div className="panel-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: '16px',
                        padding: '1.75rem'
                    }}>
                        <div>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                background: 'rgba(56, 189, 248, 0.08)',
                                border: '1px solid rgba(56, 189, 248, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <Printer size={20} color="#38bdf8" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 500, color: '#94a3b8', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.2rem 0.55rem', borderRadius: '4px', display: 'inline-block', marginBottom: '0.5rem' }}>
                                Dispatch utility
                            </span>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.4rem' }}>
                                4×6 bulk thermal label cropper
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                Upload multi-order Meesho invoice sheets and crop labels into 4×6 thermal print batches, sorted by SKU and courier.
                            </p>
                        </div>
                        <div style={{
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Dispatch sorting</span>
                            <span style={{ fontWeight: 600, color: '#38bdf8' }}>By SKU & courier</span>
                        </div>
                    </div>

                    {/* Card 4: Net P&L Settlement Sheet */}
                    <div className="panel-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderRadius: '16px',
                        padding: '1.75rem'
                    }}>
                        <div>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '10px',
                                background: 'rgba(52, 211, 153, 0.08)',
                                border: '1px solid rgba(52, 211, 153, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <FileSpreadsheet size={20} color="#34d399" />
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#34d399', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '0.2rem 0.55rem', borderRadius: '4px', display: 'inline-block', marginBottom: '0.5rem' }}>
                                Return settlement
                            </span>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.4rem' }}>
                                Net P&L settlement sheet
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                Factor in RTO returns, return shipping surcharges, packaging, and GST input credits to know your true net payout.
                            </p>
                        </div>
                        <div style={{
                            background: '#141a29',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.82rem'
                        }}>
                            <span style={{ color: '#64748b' }}>Return loss calculation</span>
                            <span style={{ fontWeight: 600, color: '#34d399' }}>Instant formula</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. Step Walkthrough */}
            <section style={{
                background: '#0c0e14',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '3.5rem 1.25rem'
            }}>
                <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '2rem'
                    }}>
                        Operational workflow in 3 steps
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.25rem',
                        textAlign: 'left'
                    }}>
                        <div style={{
                            padding: '1.5rem',
                            background: '#0f1422',
                            borderRadius: '14px',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ffffff', color: '#080b11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>
                                1
                            </div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.35rem' }}>
                                Upload image or PDF
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.825rem', lineHeight: 1.6, margin: 0 }}>
                                Drop in your catalog image or bulk Meesho label PDF sheet. No manual configuration needed.
                            </p>
                        </div>

                        <div style={{
                            padding: '1.5rem',
                            background: '#0f1422',
                            borderRadius: '14px',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#38bdf8', color: '#080b11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>
                                2
                            </div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.35rem' }}>
                                Review automated checks
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.825rem', lineHeight: 1.6, margin: 0 }}>
                                System evaluates minimum shipping brackets and generates unique listing image variations.
                            </p>
                        </div>

                        <div style={{
                            padding: '1.5rem',
                            background: '#0f1422',
                            borderRadius: '14px',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#34d399', color: '#080b11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>
                                3
                            </div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.35rem' }}>
                                Export and dispatch
                            </h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.825rem', lineHeight: 1.6, margin: 0 }}>
                                Download cropped 4×6 labels or ready variations to protect margins on every dispatch.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
