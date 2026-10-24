// src/pages/marketplace/AmazonKeywordCleanerPage.jsx - Pure UI Presentation
import React, { useState, useMemo } from 'react';
import { Key, Copy, Check, Sparkles, AlertTriangle, Trash2 } from 'lucide-react';
import { cleanAmazonKeywords } from '../../services/marketplace/amazonService';
import { useToast } from '../../context/ToastContext';

export default function AmazonKeywordCleanerPage() {
    const [inputKeywords, setInputKeywords] = useState(
        'wireless earbuds bluetooth headphones waterproof earbuds wireless bluetooth noise cancelling headphones earbuds travel bass sound'
    );
    const [copied, setCopied] = useState(false);
    const [removePunctuation, setRemovePunctuation] = useState(true);
    const [lowercaseAll, setLowercaseAll] = useState(true);

    const toast = useToast();

    // Call pure decoupled domain service
    const { cleanedKeywords: cleanedText, byteCount: cleanedBytes } = useMemo(() => {
        let text = inputKeywords;
        if (removePunctuation) {
            text = text.replace(/[,;:\-_"'\.\(\)\[\]\/\\!@#\$%\^&\*\+=\?<>~`]/g, ' ');
        }
        if (lowercaseAll) {
            text = text.toLowerCase();
        }
        return cleanAmazonKeywords(text);
    }, [inputKeywords, removePunctuation, lowercaseAll]);

    const rawBytes = useMemo(() => {
        try {
            return new TextEncoder().encode(inputKeywords).length;
        } catch {
            return unescape(encodeURIComponent(inputKeywords)).length;
        }
    }, [inputKeywords]);

    const byteLimit = 249;
    const isOverLimit = cleanedBytes > byteLimit;
    const bytesSaved = Math.max(0, rawBytes - cleanedBytes);

    const handleCopy = () => {
        navigator.clipboard.writeText(cleanedText);
        setCopied(true);
        toast.success(`Copied ${cleanedBytes} bytes of deduplicated keywords!`);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleClear = () => {
        setInputKeywords('');
        toast.info('Keyword input cleared');
    };

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem 1.25rem 4rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/amazon" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>Amazon Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>Duplicate Keyword Cleaner (249-Byte Optimizer)</span>
            </nav>

            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(249, 115, 22, 0.12)', border: '1px solid rgba(249, 115, 22, 0.3)', color: '#f97316', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#f97316" />
                    <span>A9 Search Algorithm Ready · UTF-8 Byte Enforcement</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.75rem 0' }}>
                    Amazon Backend Search Terms Cleaner &amp; Deduplicator
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Amazon strictly enforces a <strong>249-byte limit</strong> on backend keywords. Repeating words or punctuation wastes precious byte capacity. This tool strips duplicates and punctuation to maximize keyword coverage.
                </p>
            </div>

            {/* Live Byte Meter Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#0d121f', borderRadius: '16px', border: `1px solid ${isOverLimit ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`, padding: '1.25rem' }}>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.25rem' }}>Cleaned Byte Count</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: isOverLimit ? '#ef4444' : '#10b981' }}>
                        {cleanedBytes} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>/ 249 bytes</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: isOverLimit ? '#ef4444' : '#10b981', marginTop: '0.25rem', fontWeight: 600 }}>
                        {isOverLimit ? '⚠️ Over 249-byte limit!' : '✓ Safe for Amazon A9'}
                    </div>
                </div>

                <div style={{ background: '#0d121f', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.25rem' }}>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.25rem' }}>Raw Input Bytes</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                        {rawBytes} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>bytes</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Original text volume</div>
                </div>

                <div style={{ background: '#0d121f', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.25rem' }}>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.25rem' }}>Bytes Saved by Deduplication</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f97316' }}>
                        +{bytesSaved} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>bytes</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#f97316', marginTop: '0.25rem' }}>Capacity restored</div>
                </div>
            </div>

            {/* Main Interactive Boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem', marginBottom: '2.5rem' }}>
                {/* Input Area */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Key size={16} color="#f97316" />
                            <span>1. Paste Raw Search Terms</span>
                        </div>
                        <button
                            onClick={handleClear}
                            style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', borderRadius: '6px' }}
                        >
                            <Trash2 size={13} /> Clear
                        </button>
                    </div>

                    <textarea
                        value={inputKeywords}
                        onChange={(e) => setInputKeywords(e.target.value)}
                        placeholder="Paste unorganized competitor keywords or search terms with duplicates..."
                        rows={7}
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '12px',
                            padding: '1rem',
                            color: '#ffffff',
                            fontSize: '0.95rem',
                            fontFamily: 'monospace',
                            lineHeight: '1.5',
                            outline: 'none',
                            resize: 'vertical'
                        }}
                    />

                    <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={removePunctuation}
                                onChange={(e) => setRemovePunctuation(e.target.checked)}
                                style={{ accentColor: '#f97316' }}
                            />
                            Remove punctuation (, - / .)
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#cbd5e1', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={lowercaseAll}
                                onChange={(e) => setLowercaseAll(e.target.checked)}
                                style={{ accentColor: '#f97316' }}
                            />
                            Lowercase all terms
                        </label>
                    </div>
                </div>

                {/* Cleaned Output Area */}
                <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Sparkles size={16} color="#10b981" />
                            <span>2. A9-Optimized Backend String</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isOverLimit ? '#ef4444' : '#10b981', background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                            {cleanedBytes} / 249 Bytes
                        </span>
                    </div>

                    <div
                        style={{
                            flex: 1,
                            minHeight: '160px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${isOverLimit ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.25)'}`,
                            borderRadius: '12px',
                            padding: '1rem',
                            color: '#ffffff',
                            fontSize: '0.95rem',
                            fontFamily: 'monospace',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            overflowY: 'auto'
                        }}
                    >
                        {cleanedText || <span style={{ color: '#64748b' }}>Cleaned keywords will appear here...</span>}
                    </div>

                    <button
                        onClick={handleCopy}
                        disabled={!cleanedText}
                        style={{
                            marginTop: '1rem',
                            background: copied ? 'rgba(16, 185, 129, 0.25)' : 'linear-gradient(135deg, #f97316, #ea580c)',
                            color: copied ? '#34d399' : '#ffffff',
                            border: copied ? '1px solid #10b981' : 'none',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            cursor: cleanedText ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            opacity: cleanedText ? 1 : 0.6,
                            transition: 'all 0.15s ease'
                        }}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        <span>{copied ? 'Copied to Clipboard!' : 'Copy Cleaned Search Terms'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
