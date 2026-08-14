import React, { useState, useRef } from 'react';

// Cross-browser Polyfill for CanvasRenderingContext2D.roundRect
if (typeof window !== 'undefined' && typeof CanvasRenderingContext2D !== 'undefined') {
    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, radii) {
            let r = typeof radii === 'number' ? radii : (Array.isArray(radii) ? radii[0] : 0);
            if (r > w / 2) r = w / 2;
            if (r > h / 2) r = h / 2;
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
        };
    }
}

// Preset Batches for Continuous "Generate More" Combinations
const VARIATION_BATCHES = [
    // Batch 1 (Initial 8 Variations)
    [
        { id: 'pink_bestseller', label: 'Pink Frame + Best Seller Badge', color: '#ec4899', badgeText: '🔥 BEST SELLER', borderWidth: 28, cornerRadius: 24 },
        { id: 'blue_ndd', label: 'Blue Frame + Next-Day Dispatch', color: '#2563eb', badgeText: '⚡ NEXT-DAY DISPATCH', borderWidth: 28, cornerRadius: 24 },
        { id: 'green_delivery', label: 'Green Frame + Free Shipping Stamp', color: '#10b981', badgeText: '🚚 FREE DELIVERY', borderWidth: 28, cornerRadius: 24 },
        { id: 'gold_premium', label: 'Gold Frame + Top Right Premium Seal', color: '#eab308', sealText: 'PREMIUM\nQUALITY', sealColor: '#eab308', borderWidth: 28, cornerRadius: 24 },
        { id: 'purple_dealer', label: 'Purple Frame + Dual Badge Combo', color: '#8b5cf6', badgeText: '🛡️ AUTHORIZED DEALER', sealText: '100%\nGENUINE', sealColor: '#8b5cf6', borderWidth: 28, cornerRadius: 24 },
        { id: 'red_toprated', label: 'Red Frame + Top Rated Badge', color: '#ef4444', badgeText: '⭐ TOP RATED', borderWidth: 28, cornerRadius: 24 },
        { id: 'teal_original', label: 'Teal Frame + 100% Original Seal', color: '#06b6d4', sealText: '100%\nORIGINAL', sealColor: '#06b6d4', borderWidth: 28, cornerRadius: 24 },
        { id: 'orange_bottom_banner', label: 'Orange Frame + Bottom Free COD Banner', color: '#f97316', bannerText: '🚚 FREE SHIPPING & CASH ON DELIVERY', borderWidth: 28, cornerRadius: 24 }
    ],

    // Batch 2 ("Generate More" Click #1)
    [
        { id: 'pink_dual', label: 'Magenta Pink Frame + Dual Best Seller & Quality Seal', color: '#db2777', badgeText: '🔥 BEST SELLER', sealText: 'HIGH\nRATED', sealColor: '#db2777', doubleBorder: true, borderWidth: 24, cornerRadius: 20 },
        { id: 'royal_blue_ndd_seal', label: 'Royal Blue Frame + Fast Packing Seal', color: '#1d4ed8', badgeText: '⚡ FAST DISPATCH', sealText: 'SAFE\nPACKING', sealColor: '#1d4ed8', borderWidth: 28, cornerRadius: 24 },
        { id: 'mint_green_trending', label: 'Emerald Green Frame + Trending #1 Badge', color: '#059669', badgeText: '🏆 TRENDING #1', borderWidth: 28, cornerRadius: 24 },
        { id: 'amber_gold_festive', label: 'Gold Frame + Bottom Festive Offer Banner', color: '#d97706', bannerText: '✨ SPECIAL FESTIVE OFFER', badgeText: '👑 TOP QUALITY', borderWidth: 28, cornerRadius: 24 },
        { id: 'violet_hotdeal', label: 'Violet Frame + Hot Deal Badge', color: '#7c3aed', badgeText: '💥 HOT DEAL 50% OFF', borderWidth: 28, cornerRadius: 24 },
        { id: 'crimson_ready_ship', label: 'Crimson Red Frame + Ready to Ship Tag', color: '#dc2626', badgeText: '📦 READY TO SHIP', sealText: 'VERIFIED\nSUPPLIER', sealColor: '#dc2626', borderWidth: 28, cornerRadius: 24 },
        { id: 'cyan_fast_delivery', label: 'Cyan Frame + 24-Hr Dispatch Seal', color: '#0891b2', sealText: '24-HR\nDISPATCH', sealColor: '#0891b2', borderWidth: 28, cornerRadius: 24 },
        { id: 'dark_slate_verified', label: 'Dark Slate Frame + Verified Meesho Seller', color: '#1e293b', bannerText: '🔥 MEESHO VERIFIED SUPPLIER', borderWidth: 28, cornerRadius: 24 }
    ],

    // Batch 3 ("Generate More" Click #2)
    [
        { id: 'rose_limited', label: 'Rose Pink Frame + Limited Stock Badge', color: '#e11d48', badgeText: '⏳ LIMITED STOCK', borderWidth: 28, cornerRadius: 24 },
        { id: 'indigo_super_saver', label: 'Indigo Blue Frame + Super Saver Deal', color: '#4338ca', badgeText: '💰 SUPER SAVER DEAL', borderWidth: 28, cornerRadius: 24 },
        { id: 'forest_green_return', label: 'Forest Green Frame + Free Easy Returns', color: '#15803d', bannerText: '🔄 EASY 7-DAY FREE RETURNS', borderWidth: 28, cornerRadius: 24 },
        { id: 'gold_double_seal', label: 'Gold Double Frame + 100% Quality Seal', color: '#ca8a04', sealText: '100%\nQUALITY', sealColor: '#ca8a04', doubleBorder: true, borderWidth: 24, cornerRadius: 20 },
        { id: 'purple_exclusive', label: 'Deep Purple Frame + Exclusive Launch', color: '#6b21a8', badgeText: '✨ EXCLUSIVE LAUNCH', borderWidth: 28, cornerRadius: 24 },
        { id: 'red_lowest_price', label: 'Bright Red Frame + Lowest Price Banner', color: '#b91c1c', bannerText: '🏷️ LOWEST PRICE GUARANTEED', borderWidth: 28, cornerRadius: 24 },
        { id: 'coral_top_choice', label: 'Coral Orange Frame + Buyer\'s Top Choice', color: '#ea580c', badgeText: '⭐ BUYER\'S TOP CHOICE', borderWidth: 28, cornerRadius: 24 },
        { id: 'black_gold_vip', label: 'Midnight Black Frame + VIP Seller Stamp', color: '#09090b', badgeText: '👑 VIP SELLER CHOICE', sealText: 'PREMIUM\nPACKING', sealColor: '#eab308', borderWidth: 28, cornerRadius: 24 }
    ]
];

export default function FreeImageGeneratorTab() {
    const [imagePreview, setImagePreview] = useState('');
    const [loadedImageObj, setLoadedImageObj] = useState(null);
    const [generatedVariations, setGeneratedVariations] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingMore, setIsGeneratingMore] = useState(false);
    const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

    // Custom Badge Controls
    const [customText, setCustomText] = useState('🔥 BEST SELLER');
    const [customColor, setCustomColor] = useState('#ec4899');

    const fileInputRef = useRef(null);

    const handleFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            setImagePreview(dataUrl);

            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                setLoadedImageObj(img);
                setCurrentBatchIndex(0);
                generateBatch(img, 0, []);
            };
        };
        reader.readAsDataURL(file);
    };

    // Render Canvas Function for Single Variation Configuration
    const renderCanvasVariation = (img, config) => {
        const canvas = document.createElement('canvas');
        const size = 1000; // 1000x1000 High Resolution Canvas
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // 1. Solid White Base Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // 2. Padding Calculations
        const outerBorderWidth = config.borderWidth || 28;
        const innerPadding = config.innerPadding || 36;
        const drawX = outerBorderWidth + innerPadding;
        const drawY = outerBorderWidth + innerPadding;
        const drawSize = size - (drawX * 2);
        const cornerRadius = config.cornerRadius || 20;

        // Clip Product Photo inside Rounded Rectangle
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(drawX, drawY, drawSize, drawSize, cornerRadius);
        ctx.clip();
        ctx.drawImage(img, drawX, drawY, drawSize, drawSize);
        ctx.restore();

        // 3. Draw Outer Border Frame
        ctx.lineWidth = outerBorderWidth;
        ctx.strokeStyle = config.color;
        ctx.beginPath();
        ctx.roundRect(outerBorderWidth / 2, outerBorderWidth / 2, size - outerBorderWidth, size - outerBorderWidth, cornerRadius + 8);
        ctx.stroke();

        // Double Inner Accent Line (optional)
        if (config.doubleBorder) {
            ctx.lineWidth = 4;
            ctx.strokeStyle = config.color;
            ctx.beginPath();
            ctx.roundRect(outerBorderWidth + 10, outerBorderWidth + 10, size - (outerBorderWidth + 10) * 2, size - (outerBorderWidth + 10) * 2, cornerRadius);
            ctx.stroke();
        }

        // 4. Draw Badges & Overlays
        const badgeMargin = drawX + 16;

        // Top-Left Pill Ribbon Badge
        if (config.badgeText) {
            ctx.save();
            ctx.font = 'bold 26px Outfit, sans-serif';
            const textMetrics = ctx.measureText(config.badgeText);
            const badgeW = textMetrics.width + 48;
            const badgeH = 64;
            const badgeX = badgeMargin;
            const badgeY = badgeMargin;

            // Pill Shape Background
            ctx.fillStyle = config.badgeColor || config.color;
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 18);
            ctx.fill();

            // Crisp White Outline
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            // Badge Text
            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'middle';
            ctx.fillText(config.badgeText, badgeX + 24, badgeY + (badgeH / 2));
            ctx.restore();
        }

        // Top-Right Circular Seal
        if (config.sealText) {
            ctx.save();
            const sealRadius = 54;
            const sealX = size - badgeMargin - sealRadius;
            const sealY = badgeMargin + sealRadius;

            // Circle Fill
            ctx.fillStyle = config.sealColor || config.color;
            ctx.beginPath();
            ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.lineWidth = 3;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            // Inner Dashed Ring
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(sealX, sealY, sealRadius - 6, 0, Math.PI * 2);
            ctx.stroke();

            // Seal Text Lines
            ctx.setLineDash([]);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 15px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const lines = config.sealText.split('\n');
            if (lines.length > 1) {
                ctx.fillText(lines[0], sealX, sealY - 10);
                ctx.fillText(lines[1], sealX, sealY + 10);
            } else {
                ctx.fillText(config.sealText, sealX, sealY);
            }
            ctx.restore();
        }

        // Bottom Banner Strip
        if (config.bannerText) {
            ctx.save();
            const bannerH = 54;
            const bannerY = size - badgeMargin - bannerH;
            const bannerW = size - (badgeMargin * 2);

            ctx.fillStyle = config.bannerColor || config.color;
            ctx.beginPath();
            ctx.roundRect(badgeMargin, bannerY, bannerW, bannerH, 14);
            ctx.fill();

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 22px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(config.bannerText, size / 2, bannerY + (bannerH / 2));
            ctx.restore();
        }

        return canvas.toDataURL('image/jpeg', 0.92);
    };

    // Generate a Batch of Variations
    const generateBatch = (img, batchIdx, existingList = []) => {
        setIsGenerating(true);

        setTimeout(() => {
            let configsToRender = [];

            if (batchIdx < VARIATION_BATCHES.length) {
                configsToRender = VARIATION_BATCHES[batchIdx];
            } else {
                // Batch 4+ Dynamic Random Combination Generator
                const randomColors = ['#ec4899', '#2563eb', '#10b981', '#eab308', '#8b5cf6', '#ef4444', '#06b6d4', '#f97316', '#10b981'];
                const randomBadges = ['🔥 BEST SELLER', '⚡ FAST DISPATCH', '🚚 FREE DELIVERY', '⭐ TOP RATED', '🏆 TRENDING #1', '💥 HOT DEAL', '📦 READY TO SHIP', '✨ NEW ARRIVAL'];
                const randomSeals = ['100%\nORIGINAL', 'PREMIUM\nQUALITY', 'SAFE\nPACKING', '24-HR\nDISPATCH', 'HIGH\nRATED'];

                for (let i = 0; i < 8; i++) {
                    const color = randomColors[i % randomColors.length];
                    const badge = randomBadges[(i + batchIdx) % randomBadges.length];
                    const seal = (i % 2 === 0) ? randomSeals[(i + batchIdx) % randomSeals.length] : null;

                    configsToRender.push({
                        id: `dynamic_${batchIdx}_${i}`,
                        label: `${badge.replace(/[^\w\s]/gi, '').trim()} (${color})`,
                        color,
                        badgeText: badge,
                        sealText: seal,
                        sealColor: color,
                        borderWidth: 28,
                        cornerRadius: 24
                    });
                }
            }

            const newList = configsToRender.map((config) => ({
                id: `${config.id}_${Date.now()}`,
                label: config.label,
                color: config.color,
                dataUrl: renderCanvasVariation(img, config)
            }));

            setGeneratedVariations([...existingList, ...newList]);
            setIsGenerating(false);
            setIsGeneratingMore(false);
        }, 300);
    };

    // Handle "Generate More Variations" Click
    const handleGenerateMore = () => {
        if (!loadedImageObj || isGeneratingMore) return;
        setIsGeneratingMore(true);
        const nextBatchIdx = currentBatchIndex + 1;
        setCurrentBatchIndex(nextBatchIdx);
        generateBatch(loadedImageObj, nextBatchIdx, generatedVariations);
    };

    // Generate Custom User Variation
    const handleGenerateCustom = () => {
        if (!loadedImageObj || !customText.trim()) return;

        const customConfig = {
            id: `custom_${Date.now()}`,
            label: `Custom: ${customText}`,
            color: customColor,
            badgeText: customText,
            borderWidth: 28,
            cornerRadius: 24
        };

        const customDataUrl = renderCanvasVariation(loadedImageObj, customConfig);
        const newVariation = {
            id: customConfig.id,
            label: customConfig.label,
            color: customConfig.color,
            dataUrl: customDataUrl
        };

        setGeneratedVariations([newVariation, ...generatedVariations]);
    };

    const downloadImage = (dataUrl, label) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `vendorsdesk_catalog_${label.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    return (
        <div style={{ width: '100%', maxWidth: '1150px', margin: '0 auto' }}>
            
            {/* Header & Upload Section */}
            <div className="panel-card" style={{ marginBottom: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(236, 72, 153, 0.05))', border: '1px solid rgba(37, 99, 235, 0.15)' }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.85rem' }}>
                    🆓 100% FREE UNLIMITED TOOL
                </div>
                <h2 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                    Meesho Catalog Image Variation & Badge Generator
                </h2>
                <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '680px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                    Bypass Meesho duplicate listing filters instantly! Generate HD catalog variations with Pink/Blue border frames, NDD badges, Best Seller ribbons, and Quality seals. Click <strong>"Generate More Variations"</strong> continuously to create unlimited combinations for free!
                </p>

                {!imagePreview ? (
                    <div className="upload-zone" onClick={() => fileInputRef.current.click()} style={{ maxWidth: '500px', margin: '0 auto', padding: '2.5rem 1.5rem', borderRadius: '16px', border: '2px dashed #3b82f6', background: '#ffffff', cursor: 'pointer' }}>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.25rem' }}>Upload Product Photo</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Supports PNG, JPG (Click or Drag & Drop)</div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                            <button className="btn-submit-form" onClick={() => fileInputRef.current.click()} style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                                🔄 Upload Different Photo
                            </button>
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
                        </div>

                        {/* Custom Badge Input Builder */}
                        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '0.85rem 1.25rem', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', width: '100%', maxWidth: '650px', marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Custom Badge:</span>
                            <input
                                type="text"
                                value={customText}
                                onChange={(e) => setCustomText(e.target.value)}
                                placeholder="e.g. 🔥 50% OFF"
                                style={{ flexGrow: 1, padding: '0.45rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            />
                            <input
                                type="color"
                                value={customColor}
                                onChange={(e) => setCustomColor(e.target.value)}
                                style={{ width: '38px', height: '34px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                title="Choose Border Color"
                            />
                            <button
                                className="btn-action btn-action-primary"
                                onClick={handleGenerateCustom}
                                style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', fontWeight: 700 }}
                            >
                                ✨ Add Custom Badge
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Generated Free Variations Grid */}
            {generatedVariations.length > 0 && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <h3 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                            ✨ Generated Catalog Variations ({generatedVariations.length})
                        </h3>
                        <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '0.35rem 0.85rem', borderRadius: '12px' }}>
                            ⚡ Free Unlimited Download
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                        {generatedVariations.map((v) => (
                            <div key={v.id} className="variation-card" style={{ background: '#ffffff', border: `2px solid ${v.color}`, borderRadius: '16px', overflow: 'hidden', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                <div style={{ aspectRatio: '1 / 1', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc' }}>
                                    <img src={v.dataUrl} alt={v.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', height: '2.2rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {v.label}
                                </div>
                                <button
                                    className="btn-action btn-action-primary"
                                    style={{ padding: '0.55rem', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700, width: '100%', background: v.color, borderColor: v.color }}
                                    onClick={() => downloadImage(v.dataUrl, v.id)}
                                >
                                    ⬇ Download Free HD
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Continuous "✨ Generate More Variations" Button */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button
                            className="btn-submit-form"
                            disabled={isGeneratingMore || isGenerating}
                            onClick={handleGenerateMore}
                            style={{
                                width: '100%',
                                maxWidth: '420px',
                                padding: '0.9rem 1.75rem',
                                fontSize: '1rem',
                                fontWeight: 800,
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #ec4899 0%, #2563eb 100%)',
                                boxShadow: '0 6px 20px rgba(236, 72, 153, 0.3)',
                                cursor: (isGeneratingMore || isGenerating) ? 'not-allowed' : 'pointer',
                                opacity: (isGeneratingMore || isGenerating) ? 0.75 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.65rem'
                            }}
                        >
                            {isGeneratingMore ? (
                                <>
                                    <span style={{ width: '18px', height: '18px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                    Generating More Combinations...
                                </>
                            ) : (
                                <>
                                    <span>✨ Generate More Variations (Load 8 More)</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
