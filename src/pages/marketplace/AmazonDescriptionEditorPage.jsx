import React, { useState, useMemo } from 'react';
import { FileText, Copy, Check, Sparkles, AlertTriangle, ShieldCheck, Bold, Italic, List, CornerDownLeft, Eye, Code } from 'lucide-react';
import { sanitizeAmazonDescriptionHtml } from '../../services/marketplace/amazonService';
import { useToast } from '../../context/ToastContext';

export default function AmazonDescriptionEditorPage() {
    const { toast } = useToast();
    const [rawText, setRawText] = useState(
        "<b>UPGRADE YOUR SOUND EXPERIENCE</b>\n\nLooking for crystal clear audio with all-day comfort? Our Premium Wireless Earbuds deliver studio-grade acoustics and deep bass.\n\n<b>KEY FEATURES:</b>\n<ul>\n<li>Active Noise Cancellation (ANC) up to 35dB</li>\n<li>Up to 36 hours of total playtime with USB-C fast charging case</li>\n<li>IPX7 waterproof and sweatproof for intense workouts</li>\n<li>Bluetooth 5.3 instant pairing with ultra-low latency</li>\n</ul>\n\n<i>Package Includes: 1x Earbuds, 1x Charging Case, 3x Silicone Ear Tips (S/M/L), 1x Type-C Cable.</i>"
    );
    const [viewMode, setViewMode] = useState('split'); // 'split', 'preview', 'code'
    const [copied, setCopied] = useState(false);

    const sanitizedHtml = useMemo(() => sanitizeAmazonDescriptionHtml(rawText), [rawText]);
    const charCount = sanitizedHtml.length;
    const charLimit = 2000;
    const isOverLimit = charCount > charLimit;

    const handleInsertTag = (openTag, closeTag = '') => {
        const textarea = document.getElementById('amazon-desc-textarea');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = rawText.substring(start, end);

        let replacement = '';
        if (selected) {
            replacement = `${openTag}${selected}${closeTag}`;
        } else {
            replacement = `${openTag}${closeTag}`;
        }

        const updated = rawText.substring(0, start) + replacement + rawText.substring(end);
        setRawText(updated);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(sanitizedHtml);
        setCopied(true);
        toast({
            title: 'Copied Amazon HTML',
            description: `Copied ${charCount} chars of sanitized description HTML.`,
            variant: isOverLimit ? 'warning' : 'success'
        });
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem 1.25rem 4rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/amazon" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>Amazon Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>Description HTML Sanitizer &amp; Editor</span>
            </nav>

            {/* Header Hero */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(249, 115, 22, 0.12)', border: '1px solid rgba(249, 115, 22, 0.3)', color: '#f97316', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#f97316" />
                    <span>Avoid Listing Suppression · 100% Permitted Tags Only</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.75rem 0' }}>
                    Amazon Product Description HTML Sanitizer
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
                    Amazon strictly forbids custom CSS, fonts, and unauthorized tags. Format your product description with allowed tags (`&lt;b&gt;`, `&lt;p&gt;`, `&lt;ul&gt;`, `&lt;li&gt;`, `&lt;br&gt;`) and see a live preview.
                </p>
            </div>

            {/* Formatting Toolbar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: '#0d121f', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '0.65rem 1rem', marginBottom: '1rem', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                        onClick={() => handleInsertTag('<b>', '</b>')}
                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '0.4rem 0.65rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 700 }}
                    >
                        <Bold size={14} />
                        <span>Bold</span>
                    </button>
                    <button
                        onClick={() => handleInsertTag('<i>', '</i>')}
                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '0.4rem 0.65rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}
                    >
                        <Italic size={14} />
                        <span>Italic</span>
                    </button>
                    <button
                        onClick={() => handleInsertTag('<ul>\n<li>', '</li>\n<li>Item 2</li>\n</ul>')}
                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '0.4rem 0.65rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}
                    >
                        <List size={14} />
                        <span>Bullet List</span>
                    </button>
                    <button
                        onClick={() => handleInsertTag('<br>\n')}
                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '0.4rem 0.65rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}
                    >
                        <CornerDownLeft size={14} />
                        <span>Line Break</span>
                    </button>
                    <button
                        onClick={() => handleInsertTag('<p>', '</p>')}
                        style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: '0.4rem 0.65rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                        Paragraph
                    </button>
                </div>

                {/* Copy Clean Code Button */}
                <button
                    onClick={handleCopy}
                    style={{
                        background: copied ? '#10b981' : '#f97316',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.5rem 1.15rem',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.15s ease'
                    }}
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied ? 'HTML Copied to Clipboard!' : 'Copy Amazon HTML'}</span>
                </button>
            </div>

            {/* Split Workspace */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                {/* Editor Column */}
                <div style={{ background: '#0d121f', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>Text / HTML Editor</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isOverLimit ? '#ef4444' : '#10b981' }}>
                            {charCount} / {charLimit} Characters
                        </span>
                    </div>

                    <textarea
                        id="amazon-desc-textarea"
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        placeholder="Paste your product description here..."
                        rows={14}
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            padding: '1rem',
                            color: '#ffffff',
                            fontSize: '0.88rem',
                            lineHeight: '1.6',
                            outline: 'none',
                            fontFamily: 'monospace',
                            resize: 'vertical'
                        }}
                    />

                    {isOverLimit && (
                        <div style={{ marginTop: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', padding: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fca5a5', fontSize: '0.78rem' }}>
                            <AlertTriangle size={15} color="#ef4444" />
                            <span>Description exceeds Amazon's 2,000 character limit by {charCount - charLimit} chars!</span>
                        </div>
                    )}
                </div>

                {/* Live Amazon Customer View Preview */}
                <div style={{ background: '#0d121f', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Eye size={15} color="#f97316" />
                            <span>Live Amazon Product Page Simulation</span>
                        </span>
                        <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                            Sanitized
                        </span>
                    </div>

                    <div
                        style={{
                            background: '#ffffff',
                            color: '#0f1111',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            minHeight: '310px',
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                            fontFamily: 'Amazon Ember, Arial, sans-serif',
                            overflowY: 'auto',
                            maxHeight: '400px'
                        }}
                        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                    />
                </div>
            </div>

            {/* Clean HTML Code View Box */}
            <div style={{ marginTop: '1.5rem', background: '#0d121f', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Code size={15} color="#38bdf8" />
                        <span>Amazon-Permitted Clean Code Output (Ready to paste into Seller Central)</span>
                    </span>
                </div>
                <pre
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        padding: '1rem',
                        color: '#38bdf8',
                        fontSize: '0.82rem',
                        overflowX: 'auto',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                        margin: 0,
                        fontFamily: 'monospace'
                    }}
                >
                    {sanitizedHtml}
                </pre>
            </div>
        </div>
    );
}
