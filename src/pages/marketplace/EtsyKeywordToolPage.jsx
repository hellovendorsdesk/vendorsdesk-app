// src/pages/marketplace/EtsyKeywordToolPage.jsx - Pure UI Presentation
import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Copy, Check, Tag } from 'lucide-react';
import { scoreOpportunity } from '../../services/marketplace/keywordService';
import { useToast } from '../../context/ToastContext';

function generateEtsyKeywordData(seed) {
    const base = seed.trim().toLowerCase() || 'handmade pottery';
    const candidatePhrases = [
        base,
        `${base} mug`,
        `${base} vase`,
        `${base} bowl`,
        `${base} gift`,
        `personalized ${base}`,
        `vintage ${base}`,
        `ceramic ${base}`,
        `artisan ${base}`,
        `rustic ${base}`,
        `custom ${base}`,
        `${base} decor`,
        `${base} for home`,
        `${base} for him`,
        `${base} for her`,
        `cozy ${base}`,
        `studio ${base}`,
        `hand thrown ${base}`
    ];

    return candidatePhrases.map((kw) => {
        let hash = 0;
        for (let i = 0; i < kw.length; i++) {
            hash = (hash << 5) - hash + kw.charCodeAt(i);
            hash |= 0;
        }
        const absHash = Math.abs(hash);

        const listings = Math.max(65, (absHash * 113) % 450000);
        const avgPrice = Math.round((16 + ((absHash * 23) % 85)) * 100) / 100;
        const favorites = (absHash * 9) % 780;
        const reviewCount = (absHash * 4) % 290;

        const scoreObj = scoreOpportunity({
            reviews: reviewCount,
            sold: favorites,
            listings,
            price: avgPrice
        });

        return {
            keyword: kw,
            listings,
            avgPrice,
            favorites,
            reviewCount,
            demandScore: scoreObj.breakdown.demandScore,
            compScore: scoreObj.breakdown.competitionScore,
            priceScore: scoreObj.breakdown.priceScore,
            oppScore: scoreObj.opportunityScore,
            tier: scoreObj.opportunityScore >= 70 ? 'HIGH OPPORTUNITY' : scoreObj.opportunityScore < 45 ? 'HIGH COMPETITION' : 'MODERATE',
            tierColor: scoreObj.color
        };
    }).sort((a, b) => b.oppScore - a.oppScore);
}

export default function EtsyKeywordToolPage() {
    const [seed, setSeed] = useState('handmade pottery');
    const [copiedIndex, setCopiedIndex] = useState(null);

    const toast = useToast();

    const keywordData = useMemo(() => {
        return generateEtsyKeywordData(seed);
    }, [seed]);

    const handleCopyKw = (kw, idx) => {
        navigator.clipboard.writeText(kw);
        setCopiedIndex(idx);
        toast.success(`Etsy keyword copied: "${kw}"`);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem 1.25rem' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
                <a href="/home" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a>
                <span>/</span>
                <a href="/etsy" style={{ color: '#f472b6', textDecoration: 'none' }}>Etsy Suite</a>
                <span>/</span>
                <span style={{ color: '#ffffff' }}>Long-Tail Opportunity Scorer</span>
            </nav>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', padding: '0.35rem 0.95rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    <Sparkles size={13} color="#f472b6" />
                    <span>Etsy Long-Tail SEO Discovery Engine</span>
                </div>
                <h1 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.85rem 0' }}>
                    Etsy Long-Tail Keyword Research &amp; Opportunity Tool
                </h1>
                <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '750px', margin: 0, lineHeight: '1.6' }}>
                    Find buyer-intent keywords that competitors miss. Evaluates shopper favorites, listing competition curves, and handmade price sweet spots ($20–$100).
                </p>
            </div>

            {/* Search Input Bar */}
            <div style={{ background: '#0d121f', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>
                            Seed Search Term (e.g. handmade pottery, leather journal, knit blanket)
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                value={seed}
                                onChange={(e) => setSeed(e.target.value)}
                                placeholder="e.g., handmade pottery, gold necklace..."
                                style={{
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '10px',
                                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                                    color: '#ffffff',
                                    fontSize: '0.95rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyword Results Table */}
            <div style={{ background: '#0d121f', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden', marginBottom: '2.5rem' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                        Etsy Opportunity Rankings for "{seed}"
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {keywordData.length} Variations
                    </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                <th style={{ padding: '0.85rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Keyword</th>
                                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Opportunity</th>
                                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Active Listings</th>
                                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Avg Price</th>
                                <th style={{ padding: '0.85rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Shopper Velocity</th>
                                <th style={{ padding: '0.85rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {keywordData.map((row, idx) => (
                                <tr key={row.keyword} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                                    <td style={{ padding: '0.95rem 1.25rem' }}>
                                        <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.92rem' }}>
                                            {row.keyword}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: row.tierColor, fontWeight: 700, marginTop: '2px' }}>
                                            {row.tier}
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.95rem 1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: row.tierColor }}>
                                                {row.oppScore}
                                            </div>
                                            <div style={{ width: '60px', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${row.oppScore}%`, height: '100%', background: row.tierColor }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.95rem 1rem' }}>
                                        <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 600 }}>
                                            {row.listings.toLocaleString()}
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                            Comp: {row.compScore}/100
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.95rem 1rem' }}>
                                        <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 600 }}>
                                            ${row.avgPrice}
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#34d399' }}>
                                            Sweet Spot
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.95rem 1rem' }}>
                                        <div style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 600 }}>
                                            {row.favorites} Favs · {row.reviewCount} Reviews
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                            Demand: {row.demandScore}/100
                                        </div>
                                    </td>
                                    <td style={{ padding: '0.95rem 1.25rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleCopyKw(row.keyword, idx)}
                                            style={{
                                                background: copiedIndex === idx ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: copiedIndex === idx ? '#34d399' : '#ffffff',
                                                padding: '0.35rem 0.65rem',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.3rem'
                                            }}
                                        >
                                            {copiedIndex === idx ? <Check size={13} /> : <Copy size={13} />}
                                            <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
