// src/pages/marketplace/EbayTitleGeneratorPage.jsx - Pure UI Presentation
import React, { useState, useMemo } from 'react';
import { Type, Copy, Check, Sparkles, Layers } from 'lucide-react';
import { generateEbayTitles, EBAY_ANGLES } from '../../services/marketplace/ebayService';
import { useToast } from '../../context/ToastContext';

export default function EbayTitleGeneratorPage() {
    const [product, setProduct] = useState('Leather Wallet');
    const [material, setMaterial] = useState('Full Grain Leather');
    const [feature, setFeature] = useState('RFID Blocking Bifold');
    const [audience, setAudience] = useState('Men Husband Gift');
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [copiedAll, setCopiedAll] = useState(false);

    const toast = useToast();

    // Call pure domain logic
    const allTitles = useMemo(() => {
        return generateEbayTitles({ product, material, feature, audience });
    }, [product, material, feature, audience]);

    const handleCopySingle = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(id);
        toast.success(`Title copied (${text.length} chars)`);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleCopyAll = () => {
        const textToCopy = allTitles.map(t => `[${t.angle}] ${t.title} (${t.charCount} chars)`).join('\n');
        navigator.clipboard.writeText(textToCopy);
        setCopiedAll(true);
        toast.success('All 20 Cassini titles copied to clipboard!');
        setTimeout(() => setCopiedAll(false), 2500);
    };

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/ebay" style={{ color: '#60a5fa', textDecoration: 'none' }}>eBay Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>20-Title Cassini Studio</span>
            </nav>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#60a5fa" />
                    <span>Cassini Search Algorithm Optimized · 75–80 Char Sweet Spot</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    eBay 20-Title Cassini Studio &amp; Word Packer
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '750px', margin: 0, lineHeight: '1.6' }}>
                    eBay allows a maximum of 80 characters. Titles under 75 characters waste valuable search real estate. This studio algorithmically constructs 20 title variations across 5 core angles strictly packed to 75–80 characters.
                </p>
            </div>

            {/* Input Form Card */}
            <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Layers size={18} color="#60a5fa" />
                    <span>Product Attributes &amp; Specifications</span>
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Product Keyword (Core Item)</label>
                        <input
                            type="text"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            placeholder="e.g., Leather Wallet"
                            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Material / Composition</label>
                        <input
                            type="text"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            placeholder="e.g., Full Grain Leather"
                            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Key Feature / Specification</label>
                        <input
                            type="text"
                            value={feature}
                            onChange={(e) => setFeature(e.target.value)}
                            placeholder="e.g., RFID Blocking Bifold"
                            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Target Audience / Recipient</label>
                        <input
                            type="text"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            placeholder="e.g., Men Husband Gift"
                            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Generated: <strong style={{ color: '#ffffff' }}>20 Titles</strong> across 5 Cassini Search Angles
                    </div>
                    <button
                        onClick={handleCopyAll}
                        style={{
                            background: copiedAll ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            color: copiedAll ? '#34d399' : '#60a5fa',
                            border: `1px solid ${copiedAll ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
                            padding: '0.5rem 1.15rem',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}
                    >
                        {copiedAll ? <Check size={15} /> : <Copy size={15} />}
                        <span>{copiedAll ? 'All 20 Titles Copied!' : 'Copy All 20 Titles'}</span>
                    </button>
                </div>
            </div>

            {/* Titles List by Angle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {EBAY_ANGLES.map((angle) => {
                    const angleTitles = allTitles.filter(t => t.angle === angle.name);
                    return (
                        <div key={angle.name} style={{ background: '#0d121f', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.5rem' }}>
                            <div style={{ marginBottom: '1.15rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.35rem 0' }}>
                                    {angle.name}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                                    {angle.desc}
                                </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {angleTitles.map((t) => (
                                    <div
                                        key={t.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            borderRadius: '12px',
                                            padding: '0.85rem 1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <div style={{ flex: 1, minWidth: '280px' }}>
                                            <div style={{ fontFamily: 'monospace', fontSize: '0.92rem', color: '#ffffff', lineHeight: '1.4' }}>
                                                {t.title}
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{
                                                fontSize: '0.72rem',
                                                fontWeight: 800,
                                                background: t.isValid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                                color: t.isValid ? '#34d399' : '#fbbf24',
                                                border: `1px solid ${t.isValid ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                                                padding: '0.2rem 0.55rem',
                                                borderRadius: '6px'
                                            }}>
                                                {t.charCount} / 80 Chars {t.isValid ? '✓ Sweet Spot' : ''}
                                            </span>

                                            <button
                                                onClick={() => handleCopySingle(t.title, t.id)}
                                                style={{
                                                    background: copiedIndex === t.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                                    color: copiedIndex === t.id ? '#34d399' : '#ffffff',
                                                    padding: '0.4rem 0.75rem',
                                                    borderRadius: '8px',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.35rem'
                                                }}
                                            >
                                                {copiedIndex === t.id ? <Check size={13} /> : <Copy size={13} />}
                                                <span>{copiedIndex === t.id ? 'Copied' : 'Copy'}</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Cassini Algorithm Rules Documentation */}
            <div style={{ marginTop: '3.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
                    How eBay Cassini Evaluates Titles:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    <div>
                        <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>1. Strict 80-Character Hard Limit</strong>
                        Cassini ignores any word cut off after 80 characters. Leaving titles under 70 characters surrenders ranking power to competitors using long-tail keyword modifiers.
                    </div>
                    <div>
                        <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>2. Avoid Punctuation Clutter</strong>
                        Using symbols like `*** LOOK ***` or `$$$` triggers spam penalties. Use clear spaces and capitalized words to maintain high human click-through rates (CTR).
                    </div>
                    <div>
                        <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>3. Front-Load Primary Keywords</strong>
                        Mobile buyers see only the first 45–55 characters in search feeds. Always put your main product noun and top material in the first 4 words.
                    </div>
                </div>
            </div>
        </div>
    );
}
