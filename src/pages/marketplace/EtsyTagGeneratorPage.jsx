// src/pages/marketplace/EtsyTagGeneratorPage.jsx - Pure UI Presentation
import React, { useState, useMemo } from 'react';
import { Tag, Copy, Check, Sparkles, Layers } from 'lucide-react';
import { generateEtsyTags } from '../../services/marketplace/etsyService';
import { useToast } from '../../context/ToastContext';

export default function EtsyTagGeneratorPage() {
    const [product, setProduct] = useState('Leather Wallet');
    const [material, setMaterial] = useState('Full Grain Leather');
    const [style, setStyle] = useState('Minimalist Bifold');
    const [recipient, setRecipient] = useState('Husband Gift');
    const [copiedAllTags, setCopiedAllTags] = useState(false);
    const [copiedTitle, setCopiedTitle] = useState(false);
    const [copiedTagIdx, setCopiedTagIdx] = useState(null);

    const toast = useToast();

    // Call pure decoupled domain service
    const { tags, etsyTitle } = useMemo(() => {
        return generateEtsyTags({ product, material, style, recipient });
    }, [product, material, style, recipient]);

    const csvTags = tags.map(t => t.tag).join(', ');

    const handleCopyAll = () => {
        navigator.clipboard.writeText(csvTags);
        setCopiedAllTags(true);
        toast.success('All 13 Etsy tags copied to clipboard (CSV format)');
        setTimeout(() => setCopiedAllTags(false), 2500);
    };

    const handleCopyTitle = () => {
        navigator.clipboard.writeText(etsyTitle);
        setCopiedTitle(true);
        toast.success(`Etsy SEO title copied (${etsyTitle.length} chars)`);
        setTimeout(() => setCopiedTitle(false), 2500);
    };

    const handleCopyTag = (t, idx) => {
        navigator.clipboard.writeText(t);
        setCopiedTagIdx(idx);
        toast.success(`Tag copied: "${t}"`);
        setTimeout(() => setCopiedTagIdx(null), 2000);
    };

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/etsy" style={{ color: '#f472b6', textDecoration: 'none' }}>Etsy Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>13-Tag Studio &amp; Title</span>
            </nav>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#f472b6" />
                    <span>Strict 13-Tag Limit · Exactly ≤20 Chars Each</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    Etsy 13-Tag Studio &amp; 140-Char Title Generator
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '750px', margin: 0, lineHeight: '1.6' }}>
                    Etsy gives every seller exactly 13 tag slots with a hard limit of 20 characters per tag. This studio generates 13 conversion-optimized tags and a 140-character search-friendly listing title.
                </p>
            </div>

            {/* Input Form Card */}
            <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Layers size={18} color="#f472b6" />
                    <span>Product Attributes for Tag Packing</span>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Primary Product Keyword</label>
                        <input
                            type="text"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            placeholder="e.g., Leather Wallet"
                            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Material / Craft Technique</label>
                        <input
                            type="text"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            placeholder="e.g., Full Grain Leather"
                            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Style / Aesthetic</label>
                        <input
                            type="text"
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                            placeholder="e.g., Minimalist Bifold"
                            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>Recipient / Occasion</label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="e.g., Husband Gift"
                            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none' }}
                        />
                    </div>
                </div>
            </div>

            {/* Generated 140-Char Etsy Title Card */}
            <div style={{ background: '#0d121f', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Tag size={16} color="#f472b6" />
                        <span>High-CTR Etsy Title (140 Characters)</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: etsyTitle.length <= 140 ? '#34d399' : '#fbbf24', background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                        {etsyTitle.length} / 140 Chars
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '260px', fontFamily: 'monospace', fontSize: '0.92rem', color: '#ffffff', lineHeight: 1.4 }}>
                        {etsyTitle}
                    </div>
                    <button
                        onClick={handleCopyTitle}
                        style={{
                            background: copiedTitle ? 'rgba(16, 185, 129, 0.2)' : 'rgba(236, 72, 153, 0.2)',
                            border: `1px solid ${copiedTitle ? 'rgba(16, 185, 129, 0.4)' : 'rgba(236, 72, 153, 0.4)'}`,
                            color: copiedTitle ? '#34d399' : '#f472b6',
                            padding: '0.45rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}
                    >
                        {copiedTitle ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedTitle ? 'Title Copied!' : 'Copy Title'}</span>
                    </button>
                </div>
            </div>

            {/* Generated 13 Tags Grid */}
            <div style={{ background: '#0d121f', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.25rem 0' }}>
                            The 13 Recommended Tags
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                            All 13 tags strictly under 20 characters with punctuation stripped.
                        </p>
                    </div>
                    <button
                        onClick={handleCopyAll}
                        style={{
                            background: copiedAllTags ? 'rgba(16, 185, 129, 0.2)' : 'rgba(236, 72, 153, 0.2)',
                            color: copiedAllTags ? '#34d399' : '#f472b6',
                            border: `1px solid ${copiedAllTags ? 'rgba(16, 185, 129, 0.4)' : 'rgba(236, 72, 153, 0.4)'}`,
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
                        {copiedAllTags ? <Check size={15} /> : <Copy size={15} />}
                        <span>{copiedAllTags ? 'All 13 Tags Copied!' : 'Copy All 13 Tags (CSV)'}</span>
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.85rem' }}>
                    {tags.map((t, idx) => (
                        <div
                            key={t.id}
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '12px',
                                padding: '0.8rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.75rem'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}>
                                    {idx + 1}
                                </span>
                                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#ffffff' }}>
                                    {t.tag}
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.72rem', color: t.isValid ? '#34d399' : '#fbbf24', background: 'rgba(255, 255, 255, 0.04)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                                    {t.charCount}/20
                                </span>
                                <button
                                    onClick={() => handleCopyTag(t.tag, idx)}
                                    style={{
                                        background: copiedTagIdx === idx ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                                        border: '1px solid rgba(255, 255, 255, 0.12)',
                                        color: copiedTagIdx === idx ? '#34d399' : '#ffffff',
                                        padding: '0.35rem 0.65rem',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {copiedTagIdx === idx ? <Check size={13} /> : <Copy size={13} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Algorithm Rules */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
                    Etsy Search Algorithm Tag Rules:
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    <div>
                        <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>1. Always Use All 13 Tags</strong>
                        Leaving empty tag slots directly cuts your shop visibility. Etsy search scores match percentage based on tag presence.
                    </div>
                    <div>
                        <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>2. Use Multi-Word Phrases</strong>
                        Single-word tags like "wallet" face millions of competitors. Use 2-3 word phrases like "minimalist bifold" or "leather card case".
                    </div>
                    <div>
                        <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>3. No Punctuation or Symbols</strong>
                        Etsy automatically ignores special characters (`!`, `@`, `#`). This studio automatically purges all non-alphanumerics.
                    </div>
                </div>
            </div>
        </div>
    );
}
