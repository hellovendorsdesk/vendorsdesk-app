import React, { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';

// List of All 19 Graphic PNG Badge Image Files from Backend Assets
const GRAPHIC_BADGE_ASSETS = [
    { id: 'pink_bestseller', name: '🔥 Pink Best Seller Scallop Badge', file: 'badge_pink_bestseller.png', category: 'bestseller' },
    { id: 'red_star_bestseller', name: '⭐ Red Best Seller Starburst Stamp', file: 'stamp_red_bestseller_star.png', category: 'bestseller' },
    { id: 'red_vintage_seal', name: '🏆 Red Vintage Best Seller Seal', file: 'stamp_red_bestseller_seal.png', category: 'bestseller' },
    { id: 'red_circle_bestseller', name: '⭕ Red Circular Best Seller Stamp', file: 'stamp_red_bestseller_circle.png', category: 'bestseller' },
    { id: 'red_ribbon_bestseller', name: '🎗️ Red Ribbon Sunburst Stamp', file: 'stamp_red_bestseller_ribbon.png', category: 'bestseller' },
    
    { id: 'gold_premium_hex', name: '👑 Gold Premium Quality Hex Badge', file: 'badge_gold_premium.png', category: 'quality' },
    { id: 'gold_circle_seal', name: '🌟 Gold Circle Premium Quality Stamp', file: 'badge_gold_circle.png', category: 'quality' },
    { id: 'red_original_seal', name: '🛡️ Red 100% Original Guaranteed Stamp', file: 'stamp_red_original.png', category: 'quality' },
    { id: 'authorized_dealer', name: '📜 Authorized Dealer Stamp', file: 'stamp_authorized_dealer.png', category: 'quality' },
    { id: 'licensed_stamp', name: '⚖️ Licensed Quality Seal Stamp', file: 'stamp_licensed.png', category: 'quality' },
    { id: 'trusted_brand_ribbon', name: '💎 Trusted Brand Ribbon Tag', file: 'stamp_trusted_brand.png', category: 'quality' },
    { id: 'trusted_circle', name: '✨ Trusted Brand Circle Stamp', file: 'stamp_trusted_circle.png', category: 'quality' },

    { id: 'free_delivery_truck', name: '🚚 Free Delivery Truck Graphic', file: 'badge_free_delivery_truck.png', category: 'shipping' },
    { id: 'free_shipping_speed', name: '⚡ Fast Speed Free Shipping Badge', file: 'badge_free_shipping_speed.png', category: 'shipping' },
    { id: 'free_shipping_ribbon', name: '🚩 Red Free Shipping Truck Ribbon Banner', file: 'badge_free_shipping_ribbon.png', category: 'shipping' },
    { id: 'fast_delivery_speedo', name: '⏱️ Fast Delivery Speedometer Badge', file: 'badge_fast_delivery_speedometer.png', category: 'shipping' },
    { id: 'free_shipping_navy', name: '🔷 Navy Motion Free Shipping Tag', file: 'badge_free_shipping_navy.png', category: 'shipping' },

    { id: 'new_arrival_circle', name: '💥 Red Circular New Arrival Stamp', file: 'stamp_red_new_arrival_circle.png', category: 'new' },
    { id: 'new_arrival_yellow', name: '🏷️ Yellow Arrow New Arrival Tag', file: 'badge_new_arrival_yellow_tag.png', category: 'new' }
];

// Preset Batches utilizing Real Graphic PNG Badges & Stamps
const GRAPHIC_VARIATION_BATCHES = [
    // Batch 1 (Initial 8 Real Image Graphic Variations)
    [
        { id: 'pink_bestseller_topleft', label: 'Pink Frame + Graphic Pink Best Seller Badge', color: '#ff3f6c', badgeFile: 'badge_pink_bestseller.png', position: 'top_left' },
        { id: 'blue_star_bestseller', label: 'Blue Frame + Graphic Red Starburst Best Seller Stamp', color: '#0099ff', badgeFile: 'stamp_red_bestseller_star.png', position: 'top_right' },
        { id: 'green_delivery_truck', label: 'Green Frame + Graphic Free Delivery Truck', color: '#2ecc71', badgeFile: 'badge_free_delivery_truck.png', position: 'bottom_right' },
        { id: 'gold_premium_hex', label: 'Gold Frame + Graphic Gold Premium Quality Hex Badge', color: '#f1c40f', badgeFile: 'badge_gold_premium.png', position: 'top_left' },
        { id: 'purple_authorized_dealer', label: 'Purple Frame + Graphic Authorized Dealer Stamp', color: '#9b59b6', badgeFile: 'stamp_authorized_dealer.png', position: 'top_right' },
        { id: 'red_original_seal', label: 'Red Frame + Graphic Red 100% Original Stamp', color: '#ef4444', badgeFile: 'stamp_red_original.png', position: 'top_left' },
        { id: 'teal_trusted_brand', label: 'Teal Frame + Graphic Trusted Brand Ribbon', color: '#1abc9c', badgeFile: 'stamp_trusted_brand.png', position: 'bottom_right' },
        { id: 'orange_shipping_ribbon', label: 'Orange Frame + Graphic Free Shipping Ribbon Banner', color: '#e67e22', badgeFile: 'badge_free_shipping_ribbon.png', position: 'top_center' }
    ],

    // Batch 2 ("Generate More" Click #1)
    [
        { id: 'magenta_dual_badges', label: 'Magenta Frame + Dual Badges (Best Seller + Gold Seal)', color: '#ec4899', badgeFile: 'badge_pink_bestseller.png', position: 'top_left', secondBadgeFile: 'badge_gold_circle.png', secondPosition: 'bottom_right' },
        { id: 'navy_speed_shipping', label: 'Navy Blue Frame + Fast Speed Free Shipping Badge', color: '#1e3a8a', badgeFile: 'badge_free_shipping_speed.png', position: 'top_left' },
        { id: 'mint_trusted_circle', label: 'Mint Green Frame + Trusted Circle Stamp', color: '#10b981', badgeFile: 'stamp_trusted_circle.png', position: 'bottom_left' },
        { id: 'amber_gold_circle', label: 'Amber Gold Frame + Gold Circle Premium Stamp', color: '#eab308', badgeFile: 'badge_gold_circle.png', position: 'top_right' },
        { id: 'crimson_red_circle_bestseller', label: 'Crimson Red Frame + Circular Best Seller Seal', color: '#dc2626', badgeFile: 'stamp_red_bestseller_circle.png', position: 'top_right' },
        { id: 'violet_licensed_stamp', label: 'Violet Frame + Licensed Quality Seal Stamp', color: '#7c3aed', badgeFile: 'stamp_licensed.png', position: 'top_left' },
        { id: 'cyan_speedometer_delivery', label: 'Cyan Frame + Speedometer Fast Delivery Badge', color: '#06b6d4', badgeFile: 'badge_fast_delivery_speedometer.png', position: 'bottom_right' },
        { id: 'dark_slate_navy_tag', label: 'Dark Slate Frame + Navy Motion Free Shipping Tag', color: '#1e293b', badgeFile: 'badge_free_shipping_navy.png', position: 'bottom_right' }
    ],

    // Batch 3 ("Generate More" Click #2)
    [
        { id: 'rose_red_bestseller_ribbon', label: 'Rose Frame + Red Ribbon Sunburst Best Seller Stamp', color: '#e11d48', badgeFile: 'stamp_red_bestseller_ribbon.png', position: 'top_left' },
        { id: 'indigo_bestseller_seal', label: 'Indigo Frame + Red Vintage Best Seller Seal', color: '#4338ca', badgeFile: 'stamp_red_bestseller_seal.png', position: 'bottom_left' },
        { id: 'forest_free_truck', label: 'Forest Green Frame + Free Delivery Truck Badge', color: '#15803d', badgeFile: 'badge_free_delivery_truck.png', position: 'top_right' },
        { id: 'gold_new_arrival_yellow', label: 'Gold Frame + Yellow Arrow New Arrival Tag', color: '#ca8a04', badgeFile: 'badge_new_arrival_yellow_tag.png', position: 'bottom_left' },
        { id: 'ruby_red_new_arrival_circle', label: 'Ruby Red Frame + Red Circular New Arrival Stamp', color: '#b91c1c', badgeFile: 'stamp_red_new_arrival_circle.png', position: 'top_left' },
        { id: 'coral_dual_original_trusted', label: 'Deep Coral Frame + Dual Badges (100% Original + Trusted)', color: '#ea580c', badgeFile: 'stamp_red_original.png', position: 'top_left', secondBadgeFile: 'stamp_trusted_brand.png', secondPosition: 'bottom_right' },
        { id: 'purple_gold_premium_hex', label: 'Deep Purple Frame + Gold Premium Hex Badge', color: '#6b21a8', badgeFile: 'badge_gold_premium.png', position: 'top_right' },
        { id: 'black_authorized_dealer', label: 'Midnight Black Frame + Authorized Dealer Stamp', color: '#09090b', badgeFile: 'stamp_authorized_dealer.png', position: 'top_left' }
    ]
];

export default function FreeImageGeneratorTab() {
    const [imagePreview, setImagePreview] = useState('');
    const [loadedImageObj, setLoadedImageObj] = useState(null);
    const [generatedVariations, setGeneratedVariations] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingMore, setIsGeneratingMore] = useState(false);
    const [isZipping, setIsZipping] = useState(false);
    const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

    // Selected Custom Graphic Badge
    const [badgeAssetList, setBadgeAssetList] = useState(GRAPHIC_BADGE_ASSETS);
    const [selectedBadgeAsset, setSelectedBadgeAsset] = useState(GRAPHIC_BADGE_ASSETS[0]);
    const [selectedBadgeColor, setSelectedBadgeColor] = useState('#ff3f6c');
    const [selectedBadgePosition, setSelectedBadgePosition] = useState('top_left');

    const fileInputRef = useRef(null);
    const customBadgeInputRef = useRef(null);
    const badgeImageCache = useRef(new Map());

    // Handle User Custom Badge Upload
    const handleCustomBadgeUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const customBadgeObj = {
                id: `custom_badge_${Date.now()}`,
                name: `📤 Custom Badge: ${file.name.slice(0, 20)}`,
                file: event.target.result,
                category: 'custom'
            };

            setBadgeAssetList(prev => [customBadgeObj, ...prev]);
            setSelectedBadgeAsset(customBadgeObj);
        };
        reader.readAsDataURL(file);
    };

    // Preload PNG Badge Asset Image or Data URL
    const loadBadgeImage = (srcOrFilename) => {
        return new Promise((resolve) => {
            if (!srcOrFilename) { resolve(null); return; }
            if (badgeImageCache.current.has(srcOrFilename)) {
                resolve(badgeImageCache.current.get(srcOrFilename));
                return;
            }
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = srcOrFilename.startsWith('data:') ? srcOrFilename : `/badges/${srcOrFilename}`;
            img.onload = () => {
                badgeImageCache.current.set(srcOrFilename, img);
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load graphic badge image: ${srcOrFilename}`);
                resolve(null);
            };
        });
    };

    // Export All Generated Catalog Images into 1 Single ZIP File Archive
    const handleDownloadAllZip = async () => {
        if (generatedVariations.length === 0 || isZipping) return;
        setIsZipping(true);
        try {
            const zip = new JSZip();
            const folder = zip.folder("vendorsdesk_catalog_variations");

            generatedVariations.forEach((item, idx) => {
                if (item.dataUrl) {
                    const base64Data = item.dataUrl.split(',')[1];
                    folder.file(`catalog_variation_${idx + 1}.jpg`, base64Data, { base64: true });
                }
            });

            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `vendorsdesk_catalog_variations_${generatedVariations.length}_bundle.zip`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('ZIP Export Error:', err);
            alert('Failed to generate ZIP archive.');
        } finally {
            setIsZipping(false);
        }
    };

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
                generateGraphicBatch(img, 0, []);
            };
        };
        reader.readAsDataURL(file);
    };

    // Render Canvas with Product Photo + Outer Rounded Border + Graphic PNG Badge Overlay
    const renderCanvasWithGraphicBadge = async (productImg, config) => {
        const canvas = document.createElement('canvas');
        const size = 1000; // 1000x1000 High Resolution Canvas
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // 1. Solid White Base Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);

        // 2. Border & Padding Dimensions
        const outerBorderWidth = 28;
        const innerPadding = 36;
        const drawX = outerBorderWidth + innerPadding;
        const drawY = outerBorderWidth + innerPadding;
        const drawSize = size - (drawX * 2);
        const cornerRadius = 24;

        // Clip Product Photo inside Rounded Rectangle Container
        ctx.save();
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(drawX, drawY, drawSize, drawSize, cornerRadius);
        } else {
            ctx.rect(drawX, drawY, drawSize, drawSize);
        }
        ctx.clip();
        ctx.drawImage(productImg, drawX, drawY, drawSize, drawSize);
        ctx.restore();

        // 3. Draw Outer Border Frame
        ctx.lineWidth = outerBorderWidth;
        ctx.strokeStyle = config.color || '#ff3f6c';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(outerBorderWidth / 2, outerBorderWidth / 2, size - outerBorderWidth, size - outerBorderWidth, cornerRadius + 8);
        } else {
            ctx.strokeRect(outerBorderWidth / 2, outerBorderWidth / 2, size - outerBorderWidth, size - outerBorderWidth);
        }
        ctx.stroke();

        // 4. Draw Primary Graphic PNG Badge Overlay
        if (config.badgeFile) {
            const badgeImg = await loadBadgeImage(config.badgeFile);
            if (badgeImg) {
                drawGraphicBadgeOverlay(ctx, badgeImg, config.position || 'top_left', size, outerBorderWidth);
            }
        }

        // 5. Draw Optional Secondary Graphic Badge (Dual Badge Combo)
        if (config.secondBadgeFile) {
            const secondBadgeImg = await loadBadgeImage(config.secondBadgeFile);
            if (secondBadgeImg) {
                drawGraphicBadgeOverlay(ctx, secondBadgeImg, config.secondPosition || 'bottom_right', size, outerBorderWidth);
            }
        }

        return canvas.toDataURL('image/jpeg', 0.92);
    };

    // Draw PNG Graphic Badge onto Canvas with Drop Shadow & Scaled Position
    const drawGraphicBadgeOverlay = (ctx, badgeImg, position, canvasSize, outerBorderWidth) => {
        const margin = outerBorderWidth + 24;
        
        let badgeWidth = 230;
        let badgeHeight = (badgeImg.height / badgeImg.width) * badgeWidth;

        let x = margin;
        let y = margin;

        if (position === 'top_right') {
            x = canvasSize - margin - badgeWidth;
            y = margin;
        } else if (position === 'bottom_left') {
            x = margin;
            y = canvasSize - margin - badgeHeight;
        } else if (position === 'bottom_right') {
            x = canvasSize - margin - badgeWidth;
            y = canvasSize - margin - badgeHeight;
        } else if (position === 'top_center') {
            x = (canvasSize - badgeWidth) / 2;
            y = margin;
        } else if (position === 'bottom_center') {
            x = (canvasSize - badgeWidth) / 2;
            y = canvasSize - margin - badgeHeight;
        }

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 4;
        ctx.drawImage(badgeImg, x, y, badgeWidth, badgeHeight);
        ctx.restore();
    };

    // Generate Batch of Variations
    const generateGraphicBatch = async (img, batchIdx, existingList = []) => {
        setIsGenerating(true);

        let configsToRender = [];

        if (batchIdx < GRAPHIC_VARIATION_BATCHES.length) {
            configsToRender = GRAPHIC_VARIATION_BATCHES[batchIdx];
        } else {
            // Batch 4+ Dynamic Random Graphic Badge Generator
            const colors = ['#ff3f6c', '#0099ff', '#2ecc71', '#f1c40f', '#9b59b6', '#ef4444', '#1abc9c', '#e67e22', '#ec4899', '#34495e'];
            const positions = ['top_left', 'top_right', 'bottom_left', 'bottom_right', 'top_center'];

            for (let i = 0; i < 8; i++) {
                const badgeAsset = GRAPHIC_BADGE_ASSETS[(i + batchIdx * 3) % GRAPHIC_BADGE_ASSETS.length];
                const color = colors[(i + batchIdx) % colors.length];
                const pos = positions[(i + batchIdx) % positions.length];

                configsToRender.push({
                    id: `dynamic_graphic_${batchIdx}_${i}`,
                    label: `${badgeAsset.name} (${color})`,
                    color,
                    badgeFile: badgeAsset.file,
                    position: pos
                });
            }
        }

        const newList = [];
        for (const config of configsToRender) {
            const dataUrl = await renderCanvasWithGraphicBadge(img, config);
            newList.push({
                id: `${config.id}_${Date.now()}`,
                label: config.label,
                color: config.color,
                dataUrl
            });
        }

        setGeneratedVariations([...existingList, ...newList]);
        setIsGenerating(false);
        setIsGeneratingMore(false);
    };

    // Handle "Generate More Variations" Button Click
    const handleGenerateMore = () => {
        if (!loadedImageObj || isGeneratingMore) return;
        setIsGeneratingMore(true);
        const nextBatchIdx = currentBatchIndex + 1;
        setCurrentBatchIndex(nextBatchIdx);
        generateGraphicBatch(loadedImageObj, nextBatchIdx, generatedVariations);
    };

    // Handle User Picked Graphic Badge Add
    const handleAddSelectedGraphicBadge = async () => {
        if (!loadedImageObj || !selectedBadgeAsset) return;

        const customConfig = {
            id: `user_graphic_${Date.now()}`,
            label: `Graphic Badge: ${selectedBadgeAsset.name}`,
            color: selectedBadgeColor,
            badgeFile: selectedBadgeAsset.file,
            position: selectedBadgePosition
        };

        const dataUrl = await renderCanvasWithGraphicBadge(loadedImageObj, customConfig);
        const newVariation = {
            id: customConfig.id,
            label: customConfig.label,
            color: customConfig.color,
            dataUrl
        };

        setGeneratedVariations([newVariation, ...generatedVariations]);
    };

    const downloadImage = (dataUrl, label) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `vendorsdesk_graphic_catalog_${label.replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    return (
        <div style={{ width: '100%', maxWidth: '1040px', margin: '0 auto' }}>
            
            {/* Header & Upload Card */}
            <div className="panel-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04), rgba(236, 72, 153, 0.04))', border: '1px solid rgba(37, 99, 235, 0.15)' }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#2563eb', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 800, display: 'inline-block', marginBottom: '0.4rem' }}>
                    🆓 100% FREE UNLIMITED GRAPHIC BADGE GENERATOR
                </div>
                <h2 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                    Meesho Catalog Image Graphic Badge Generator
                </h2>
                <p style={{ color: '#475569', fontSize: '0.82rem', maxWidth: '640px', margin: '0 auto 1rem auto', lineHeight: '1.5' }}>
                    Bypass Meesho duplicate listing filters with <strong>19 Real Graphic PNG Badges & Stamps</strong> (Best Seller, Premium Quality, 100% Original, Free Delivery, Fast Shipping). Click <strong>"Generate More Variations"</strong> continuously to unlock unlimited combinations for free!
                </p>

                {!imagePreview ? (
                    <div className="upload-zone" onClick={() => fileInputRef.current.click()} style={{ maxWidth: '480px', margin: '0 auto', padding: '1.75rem 1.25rem', borderRadius: '16px', border: '2px dashed #3b82f6', background: '#ffffff', cursor: 'pointer' }}>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
                        <div style={{ fontSize: '2.2rem', marginBottom: '0.35rem' }}>🖼️</div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.2rem' }}>Upload Product Photo</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Supports PNG, JPG (Click or Drag & Drop)</div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                            <button className="btn-submit-form" onClick={() => fileInputRef.current.click()} style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                                🔄 Upload Different Photo
                            </button>
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
                        </div>

                        {/* Interactive Graphic Badge Selector Builder */}
                        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '1rem 1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', width: '100%', maxWidth: '780px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Choose Graphic Badge:</div>
                            
                            <input 
                                type="file" 
                                ref={customBadgeInputRef} 
                                style={{ display: 'none' }} 
                                accept="image/*" 
                                onChange={handleCustomBadgeUpload} 
                            />

                            <button
                                className="btn-action"
                                onClick={() => customBadgeInputRef.current.click()}
                                style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem', fontWeight: 800, background: '#eff6ff', color: '#2563eb', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '8px' }}
                            >
                                📤 Upload Custom Badge
                            </button>

                            <select
                                value={selectedBadgeAsset.id}
                                onChange={(e) => {
                                    const asset = badgeAssetList.find(b => b.id === e.target.value);
                                    if (asset) setSelectedBadgeAsset(asset);
                                }}
                                style={{ flexGrow: 1, padding: '0.5rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 600 }}
                            >
                                {badgeAssetList.map((b) => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>

                            <select
                                value={selectedBadgePosition}
                                onChange={(e) => setSelectedBadgePosition(e.target.value)}
                                style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 600 }}
                            >
                                <option value="top_left">Top-Left</option>
                                <option value="top_right">Top-Right</option>
                                <option value="bottom_left">Bottom-Left</option>
                                <option value="bottom_right">Bottom-Right</option>
                                <option value="top_center">Top-Center</option>
                            </select>

                            <input
                                type="color"
                                value={selectedBadgeColor}
                                onChange={(e) => setSelectedBadgeColor(e.target.value)}
                                style={{ width: '38px', height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                                title="Choose Border Color"
                            />

                            <button
                                className="btn-action btn-action-primary"
                                onClick={handleAddSelectedGraphicBadge}
                                style={{ padding: '0.5rem 1.1rem', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}
                            >
                                🎨 Apply Badge
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
                            ✨ Generated Graphic Catalog Variations ({generatedVariations.length})
                        </h3>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <button
                                className="btn-submit-form"
                                disabled={isZipping}
                                onClick={handleDownloadAllZip}
                                style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    padding: '0.55rem 1.25rem',
                                    borderRadius: '10px',
                                    fontWeight: 800,
                                    fontSize: '0.85rem',
                                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)'
                                }}
                            >
                                {isZipping ? '⏳ Zipping...' : `📦 Export All ${generatedVariations.length} Images (.ZIP)`}
                            </button>

                            <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '0.4rem 0.85rem', borderRadius: '10px' }}>
                                ⚡ Free Unlimited Download
                            </div>
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
                            {isGeneratingMore || isGenerating ? (
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
