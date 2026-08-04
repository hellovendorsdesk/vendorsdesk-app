import React, { useState, useRef } from 'react';

const BORDER_PRESETS = [
    { id: 'pink_border', label: 'Pink Border + Best Seller Badge', color: '#ec4899', badge: '🔥 BEST SELLER' },
    { id: 'blue_border', label: 'Blue Border + NDD Fast Dispatch', color: '#2563eb', badge: '⚡ NEXT-DAY DISPATCH' },
    { id: 'green_border', label: 'Green Border + Free Shipping Stamp', color: '#10b981', badge: '🚚 FREE DELIVERY' },
    { id: 'gold_border', label: 'Gold Border + Premium Quality Seal', color: '#eab308', badge: '👑 PREMIUM QUALITY' },
    { id: 'purple_border', label: 'Purple Border + Authorized Dealer Tag', color: '#8b5cf6', badge: '🛡️ AUTHORIZED DEALER' },
    { id: 'red_border', label: 'Red Border + Top Rated Product', color: '#ef4444', badge: '⭐ TOP RATED' },
];

export default function FreeImageGeneratorTab({ onRegister }) {
    const [imagePreview, setImagePreview] = useState('');
    const [selectedBorder, setSelectedBorder] = useState(BORDER_PRESETS[0]);
    const [customBadgeText, setCustomBadgeText] = useState('🔥 BEST SELLER');
    const [generatedVariations, setGeneratedVariations] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const fileInputRef = useRef(null);

    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
            generateFreeVariations(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const generateFreeVariations = (baseImage) => {
        setIsGenerating(true);
        const img = new Image();
        img.src = baseImage;
        img.onload = () => {
            const list = BORDER_PRESETS.map((preset) => {
                const canvas = document.createElement('canvas');
                const size = 800;
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');

                // White Background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, size, size);

                // Draw centered product image with inner margin for border
                const borderPadding = 32;
                const drawSize = size - (borderPadding * 2);
                ctx.drawImage(img, borderPadding, borderPadding, drawSize, drawSize);

                // Outer Border Frame
                ctx.lineWidth = 24;
                ctx.strokeStyle = preset.color;
                ctx.strokeRect(12, 12, size - 24, size - 24);

                // Badge Ribbon Overlay
                ctx.fillStyle = preset.color;
                ctx.beginPath();
                ctx.roundRect(30, 30, 320, 60, 16);
                ctx.fill();

                // Badge Text
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 22px Outfit, sans-serif';
                ctx.fillText(preset.badge, 50, 68);

                return {
                    id: preset.id,
                    label: preset.label,
                    color: preset.color,
                    dataUrl: canvas.toDataURL('image/jpeg', 0.92)
                };
            });

            setGeneratedVariations(list);
            setIsGenerating(false);
        };
    };

    const downloadImage = (dataUrl, label) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `vendorsdesk_free_${label.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    return (
        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
            <div className="panel-card" style={{ marginBottom: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(124, 58, 237, 0.05))', border: '1px solid rgba(37, 99, 235, 0.15)' }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.85rem' }}>
                    🆓 100% FREE UNLIMITED TOOL
                </div>
                <h2 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                    Meesho Catalog Image Variation Generator
                </h2>
                <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                    Bypass Meesho duplicate listing filters instantly! Add high-converting Pink/Blue borders, Next-Day Delivery (NDD) stamps, and graphic quality seals for free without using any credits.
                </p>

                {!imagePreview ? (
                    <div className="upload-zone" onClick={() => fileInputRef.current.click()} style={{ maxWidth: '500px', margin: '0 auto', padding: '2.5rem 1.5rem', borderRadius: '16px', border: '2px dashed #3b82f6', background: '#ffffff', cursor: 'pointer' }}>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.25rem' }}>Upload Product Photo</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Supports PNG, JPG (Click or Drag & Drop)</div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                        <button className="btn-submit-form" onClick={() => fileInputRef.current.click()} style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                            🔄 Upload Different Photo
                        </button>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
                    </div>
                )}
            </div>

            {/* Generated Free Variations Grid */}
            {generatedVariations.length > 0 && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h3 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 700, color: '#0f172a' }}>
                            ✨ Generated Free Catalog Variations ({generatedVariations.length})
                        </h3>
                        <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '0.35rem 0.85rem', borderRadius: '12px' }}>
                            ⚡ Free Unlimited Download
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                        {generatedVariations.map((v) => (
                            <div key={v.id} className="variation-card" style={{ background: '#ffffff', border: `2px solid ${v.color}`, borderRadius: '16px', overflow: 'hidden', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                <div style={{ aspectRatio: '1 / 1', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc' }}>
                                    <img src={v.dataUrl} alt={v.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', height: '2.4rem', overflow: 'hidden' }}>
                                    {v.label}
                                </div>
                                <button className="btn-action btn-action-primary" style={{ padding: '0.55rem', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700, width: '100%', background: v.color }} onClick={() => downloadImage(v.dataUrl, v.id)}>
                                    ⬇ Download Free HD
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
