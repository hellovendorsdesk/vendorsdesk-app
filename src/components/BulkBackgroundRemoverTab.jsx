import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';

// 19 Real PNG Graphic Badges & Stamps
const GRAPHIC_BADGES = [
    { id: 'none', name: '🚫 No Badge', path: null },
    { id: 'badge_pink_bestseller', name: '🔥 Pink Best Seller Scallop Badge', path: '/badges/badge_pink_bestseller.png' },
    { id: 'stamp_red_bestseller_star', name: '⭐ Red Best Seller Starburst Stamp', path: '/badges/stamp_red_bestseller_star.png' },
    { id: 'stamp_red_bestseller_seal', name: '🏆 Red Vintage Best Seller Seal', path: '/badges/stamp_red_bestseller_seal.png' },
    { id: 'stamp_red_bestseller_circle', name: '⭕ Red Circular Best Seller Stamp', path: '/badges/stamp_red_bestseller_circle.png' },
    { id: 'stamp_red_bestseller_ribbon', name: '🎗️ Red Ribbon Sunburst Stamp', path: '/badges/stamp_red_bestseller_ribbon.png' },
    { id: 'badge_gold_premium', name: '👑 Gold Premium Quality Hex Badge', path: '/badges/badge_gold_premium.png' },
    { id: 'badge_gold_circle', name: '🌟 Gold Circle Premium Quality Stamp', path: '/badges/badge_gold_circle.png' },
    { id: 'stamp_red_original', name: '🛡️ Red 100% Original Guaranteed Stamp', path: '/badges/stamp_red_original.png' },
    { id: 'stamp_authorized_dealer', name: '📜 Authorized Dealer Stamp', path: '/badges/stamp_authorized_dealer.png' },
    { id: 'stamp_licensed', name: '⚖️ Licensed Quality Seal Stamp', path: '/badges/stamp_licensed.png' },
    { id: 'stamp_trusted_brand', name: '💎 Trusted Brand Ribbon Tag', path: '/badges/stamp_trusted_brand.png' },
    { id: 'stamp_trusted_circle', name: '✨ Trusted Brand Circle Stamp', path: '/badges/stamp_trusted_circle.png' },
    { id: 'badge_free_delivery_truck', name: '🚚 Free Delivery Truck Graphic', path: '/badges/badge_free_delivery_truck.png' },
    { id: 'badge_free_shipping_speed', name: '⚡ Fast Speed Free Shipping Badge', path: '/badges/badge_free_shipping_speed.png' },
    { id: 'badge_free_shipping_ribbon', name: '🚩 Red Free Shipping Ribbon Banner', path: '/badges/badge_free_shipping_ribbon.png' },
    { id: 'badge_fast_delivery_speedometer', name: '⏱️ Fast Delivery Speedometer Badge', path: '/badges/badge_fast_delivery_speedometer.png' },
    { id: 'badge_free_shipping_navy', name: '🔷 Navy Motion Free Shipping Tag', path: '/badges/badge_free_shipping_navy.png' },
    { id: 'stamp_red_new_arrival_circle', name: '💥 Red Circular New Arrival Stamp', path: '/badges/stamp_red_new_arrival_circle.png' },
    { id: 'badge_new_arrival_yellow_tag', name: '🏷️ Yellow Arrow New Arrival Tag', path: '/badges/badge_new_arrival_yellow_tag.png' }
];

// Curated High-Definition Real Product Photoshoot Backdrops
const MAGIC_BACKGROUNDS = [
    { id: 'bg_marble_studio', name: 'Luxury White Marble Podium', type: 'image', url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop' },
    { id: 'bg_wooden_sun', name: 'Wooden Table & Warm Sun', type: 'image', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop' },
    { id: 'bg_pastel_podium', name: 'Pastel Podiums & Soft Shadows', type: 'image', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop' },
    { id: 'bg_silk_satin', name: 'Silk Velvet Satin Surface', type: 'image', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop' },
    { id: 'bg_living_room', name: 'Cozy Living Room Table', type: 'image', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop' },
    { id: 'bg_window_sill', name: 'Sunny Window Sill & Blinds', type: 'image', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop' },
    { id: 'bg_minimal_spotlight', name: 'Minimalist White Studio Spotlight', type: 'image', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop' },
    { id: 'bg_dark_marble', name: 'Luxury Dark Granite Marble', type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop' },
    { id: 'bg_terracotta', name: 'Terracotta Pedestal Display', type: 'image', url: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&auto=format&fit=crop' },
    { id: 'bg_boho_rattan', name: 'Boho Rattan & Oak Wood', type: 'image', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop' },
    { id: 'bg_gold_accent', name: 'Gold Accent Royal Pedestal', type: 'image', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop' },
    { id: 'bg_beach', name: 'Tropical Beach Ocean', type: 'image', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop' },
    { id: 'bg_forest', name: 'Sunlit Forest Meadow', type: 'image', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop' },
    { id: 'bg_floral_arch', name: 'White Floral Bridal Arch', type: 'image', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop' },
    { id: 'bg_palace_corridor', name: 'Regal Palace Hall', type: 'image', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop' },
    { id: 'bg_library', name: 'Warm Oak Library Bookshelf', type: 'image', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop' },
    { id: 'bg_japanese_garden', name: 'Zen Garden Tatami Studio', type: 'image', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop' },
    { id: 'bg_pastel_pink', name: 'Pastel Pink Studio Wall', type: 'image', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop' },
    { id: 'bg_royal_velvet', name: 'Royal Velvet Backdrop', type: 'image', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop' },
    { id: 'bg_industrial_concrete', name: 'Industrial Grey Concrete Table', type: 'image', url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop' },
    { id: 'bg_sunset_ocean', name: 'Warm Sunset Ocean Horizon', type: 'image', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop' },
    { id: 'bg_yellow_field', name: 'Mustard Flower Field', type: 'image', url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop' },
    { id: 'bg_glass_reflection', name: 'Minimalist Glass Reflection', type: 'image', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop' },
    { id: 'bg_modern_desk', name: 'Minimalist Studio Desk', type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop' }
];

const COLOR_BACKGROUNDS = [
    { id: 'col_transparent', name: 'Transparent Grid', type: 'color', value: 'transparent', preview: 'repeating-conic-gradient(#cbd5e1 0% 25%, #ffffff 0% 50%) 50% / 16px 16px' },
    { id: 'col_white', name: 'Pure White (Amazon/Meesho)', type: 'color', value: '#ffffff', preview: '#ffffff' },
    { id: 'col_offwhite', name: 'Soft Warm Off-White', type: 'color', value: '#f8fafc', preview: '#f8fafc' },
    { id: 'col_pink', name: 'Pastel Blush Pink', type: 'color', value: '#fce7f3', preview: '#fce7f3' },
    { id: 'col_blue', name: 'Royal Sky Blue', type: 'color', value: '#dbeafe', preview: '#dbeafe' },
    { id: 'col_emerald', name: 'Emerald Velvet Green', type: 'color', value: '#064e3b', preview: '#064e3b' },
    { id: 'col_charcoal', name: 'Dark Slate Charcoal', type: 'color', value: '#0f172a', preview: '#0f172a' },
    { id: 'col_yellow', name: 'Sunbeam Gold Yellow', type: 'color', value: '#fef08a', preview: '#fef08a' },
];

const BORDER_COLORS = [
    { id: 'none', name: 'No Border', value: null },
    { id: 'pink', name: 'Pink Frame (#ff3f6c)', value: '#ff3f6c' },
    { id: 'blue', name: 'Royal Blue (#2563eb)', value: '#2563eb' },
    { id: 'gold', name: 'Gold Frame (#d97706)', value: '#d97706' },
    { id: 'emerald', name: 'Emerald Green (#10b981)', value: '#10b981' },
    { id: 'purple', name: 'Purple Frame (#7c3aed)', value: '#7c3aed' },
    { id: 'dark', name: 'Dark Slate (#0f172a)', value: '#0f172a' }
];

export default function BulkBackgroundRemoverTab() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('magic'); // 'magic' | 'photo' | 'color'
    const [selectedBg, setSelectedBg] = useState(MAGIC_BACKGROUNDS[0]);
    const [customBgImage, setCustomBgImage] = useState(null);

    // Graphic Badges & Border Customization Controls
    const [graphicBadgeList, setGraphicBadgeList] = useState(GRAPHIC_BADGES);
    const [selectedBadge, setSelectedBadge] = useState(GRAPHIC_BADGES[1]); // Default Pink Best Seller
    const [badgePosition, setBadgePosition] = useState('top_left'); // 'top_left' | 'top_right' | 'bottom_left' | 'bottom_right' | 'top_center'
    const [borderColor, setBorderColor] = useState(BORDER_COLORS[1]); // Default Pink

    // Dynamic Multi-Variation Generator Controls
    const [numVariationsInput, setNumVariationsInput] = useState(12);
    const [dynamicVariations, setDynamicVariations] = useState([]);
    const [isGeneratingDynamic, setIsGeneratingDynamic] = useState(false);
    const [dynamicProgressPct, setDynamicProgressPct] = useState(0);

    const [isProcessingBatch, setIsProcessingBatch] = useState(false);
    const [isZipping, setIsZipping] = useState(false);
    const [renderedPreviewUrl, setRenderedPreviewUrl] = useState(null);

    const fileInputRef = useRef(null);
    const bgInputRef = useRef(null);
    const customBadgeInputRef = useRef(null);

    // Handle Upload of User Custom Graphic Badge (PNG/JPG)
    const handleCustomBadgeUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const customBadgeObj = {
                id: `custom_badge_${Date.now()}`,
                name: `📤 Custom Badge: ${file.name.slice(0, 22)}`,
                path: event.target.result
            };

            setGraphicBadgeList(prev => [customBadgeObj, ...prev]);
            setSelectedBadge(customBadgeObj);
        };
        reader.readAsDataURL(file);
    };

    const currentItem = uploadedImages[activeIndex] || null;

    // Handle Bulk Upload of Product Images (up to 40)
    const handleProductFilesSelect = (fileList) => {
        if (!fileList || fileList.length === 0) return;
        const valid = Array.from(fileList).filter(f => f.type.startsWith('image/')).slice(0, 40);
        if (valid.length === 0) return;

        const newItems = valid.map((file, idx) => ({
            id: `prod_${Date.now()}_${idx}`,
            name: file.name,
            originalUrl: URL.createObjectURL(file),
            isolatedCanvas: null,
            processedUrl: null,
            fileObj: file
        }));

        setUploadedImages(prev => [...prev, ...newItems]);
        if (uploadedImages.length === 0) setActiveIndex(0);
    };

    // Edge-Aware Subject Isolation (Background Remover Engine)
    const isolateSubject = (imgElement) => {
        const width = imgElement.naturalWidth || imgElement.width || 800;
        const height = imgElement.naturalHeight || imgElement.height || 800;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgElement, 0, 0, width, height);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Sample background color from outer perimeter corners
        let rSum = 0, gSum = 0, bSum = 0, count = 0;
        const corners = [
            [2, 2], [width - 3, 2], [2, height - 3], [width - 3, height - 3],
            [10, 10], [width - 11, 10], [10, height - 11], [width - 11, height - 11]
        ];

        corners.forEach(([cx, cy]) => {
            const idx = (cy * width + cx) * 4;
            rSum += data[idx];
            gSum += data[idx + 1];
            bSum += data[idx + 2];
            count++;
        });

        const bgR = rSum / count;
        const bgG = gSum / count;
        const bgB = bSum / count;
        const tolerance = 46;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const diff = Math.sqrt(
                Math.pow(r - bgR, 2) +
                Math.pow(g - bgG, 2) +
                Math.pow(b - bgB, 2)
            );

            if (diff < tolerance) {
                data[i + 3] = 0; // Transparent background
            } else if (diff < tolerance + 24) {
                const alphaRatio = (diff - tolerance) / 24;
                data[i + 3] = Math.round(255 * alphaRatio); // Smooth edge feathering
            }
        }

        ctx.putImageData(imgData, 0, 0);
        return canvas;
    };

    // Helper: Load Image as Promise
    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
            img.src = src;
        });
    };

    // Full Composite Render (Subject + Background + Border Frame + PNG Graphic Badge)
    const renderCompositeWithBadge = async (item, bgObj, borderObj, badgeObj, pos) => {
        if (!item) return null;

        try {
            const mainImg = await loadImage(item.originalUrl);
            const width = mainImg.naturalWidth || 800;
            const height = mainImg.naturalHeight || 800;

            let isolatedCanvas = item.isolatedCanvas;
            if (!isolatedCanvas) {
                isolatedCanvas = isolateSubject(mainImg);
                setUploadedImages(prev => prev.map(p => p.id === item.id ? { ...p, isolatedCanvas } : p));
            }

            const outCanvas = document.createElement('canvas');
            outCanvas.width = width;
            outCanvas.height = height;
            const outCtx = outCanvas.getContext('2d');

            // 1. Draw 4-Edge Solid Border Frame if selected
            let drawX = 0, drawY = 0, drawW = width, drawH = height;
            if (borderObj && borderObj.value) {
                const borderWidth = Math.max(16, Math.round(Math.min(width, height) * 0.035));
                
                // Fill entire canvas base with border color
                outCtx.fillStyle = borderObj.value;
                outCtx.fillRect(0, 0, width, height);

                drawX = borderWidth;
                drawY = borderWidth;
                drawW = width - (borderWidth * 2);
                drawH = height - (borderWidth * 2);
            }

            // Save context and clip all inner drawing (background & subject) inside 4 borders
            outCtx.save();
            outCtx.beginPath();
            outCtx.rect(drawX, drawY, drawW, drawH);
            outCtx.clip();

            // 2. Draw Background inside inner clipped bounds
            if (bgObj.type === 'color') {
                if (bgObj.value !== 'transparent') {
                    outCtx.fillStyle = bgObj.value;
                    outCtx.fillRect(drawX, drawY, drawW, drawH);
                }
            } else if (bgObj.type === 'image' && bgObj.url) {
                try {
                    const bgImg = await loadImage(bgObj.url);
                    const bgAspect = bgImg.width / bgImg.height;
                    const outAspect = drawW / drawH;
                    let renderW, renderH, renderX, renderY;

                    if (bgAspect > outAspect) {
                        renderH = drawH;
                        renderW = drawH * bgAspect;
                        renderX = drawX + (drawW - renderW) / 2;
                        renderY = drawY;
                    } else {
                        renderW = drawW;
                        renderH = drawW / bgAspect;
                        renderX = drawX;
                        renderY = drawY + (drawH - renderH) / 2;
                    }

                    outCtx.drawImage(bgImg, renderX, renderY, renderW, renderH);
                } catch(e) {
                    outCtx.fillStyle = '#f8fafc';
                    outCtx.fillRect(drawX, drawY, drawW, drawH);
                }
            }

            // 3. Composite Ground Contact Shadow
            if (bgObj.value !== 'transparent') {
                outCtx.save();
                outCtx.filter = 'blur(16px)';
                outCtx.fillStyle = 'rgba(0, 0, 0, 0.26)';
                outCtx.beginPath();
                outCtx.ellipse(width / 2, height * 0.88, width * 0.34, height * 0.05, 0, 0, Math.PI * 2);
                outCtx.fill();
                outCtx.restore();
            }

            // 4. Overlay Isolated Subject Product inside inner clipped bounds
            outCtx.drawImage(isolatedCanvas, drawX, drawY, drawW, drawH);

            // Restore clipping context to allow badge overlay on top
            outCtx.restore();

            // 5. Overlay Real PNG Graphic Badge if selected
            if (badgeObj && badgeObj.path) {
                try {
                    const badgeImg = await loadImage(badgeObj.path);
                    const bSize = Math.round(width * 0.22);
                    let bx = drawX + 16, by = drawY + 16;

                    if (pos === 'top_right') {
                        bx = drawX + drawW - bSize - 16;
                    } else if (pos === 'bottom_left') {
                        by = drawY + drawH - bSize - 16;
                    } else if (pos === 'bottom_right') {
                        bx = drawX + drawW - bSize - 16;
                        by = drawY + drawH - bSize - 16;
                    } else if (pos === 'top_center') {
                        bx = drawX + (drawW - bSize) / 2;
                    }

                    outCtx.save();
                    outCtx.shadowColor = 'rgba(0, 0, 0, 0.25)';
                    outCtx.shadowBlur = 12;
                    outCtx.drawImage(badgeImg, bx, by, bSize, bSize);
                    outCtx.restore();
                } catch(e) {}
            }

            return outCanvas.toDataURL(bgObj.value === 'transparent' ? 'image/png' : 'image/jpeg', 0.92);
        } catch (err) {
            console.error('Composite render error:', err);
            return null;
        }
    };

    // Live Render active image when any parameter changes
    useEffect(() => {
        if (!currentItem) return;
        let isMounted = true;

        const currentBg = customBgImage ? { type: 'image', url: customBgImage } : selectedBg;

        renderCompositeWithBadge(currentItem, currentBg, borderColor, selectedBadge, badgePosition).then(url => {
            if (isMounted && url) {
                setRenderedPreviewUrl(url);
                setUploadedImages(prev => prev.map((p, idx) => idx === activeIndex ? { ...p, processedUrl: url } : p));
            }
        });

        return () => { isMounted = false; };
    }, [activeIndex, selectedBg, customBgImage, selectedBadge, badgePosition, borderColor, uploadedImages.length]);

    // Dynamically Generate N Unique Studio Variations for Active Product
    const handleGenerateDynamicCollection = async () => {
        if (!currentItem || isGeneratingDynamic) return;

        const targetCount = Math.max(1, Math.min(60, Number(numVariationsInput) || 12));
        setIsGeneratingDynamic(true);
        setDynamicProgressPct(0);

        const newVariations = [];

        for (let i = 0; i < targetCount; i++) {
            // Pick dynamic mix of background, badge, border, and position
            const bg = MAGIC_BACKGROUNDS[i % MAGIC_BACKGROUNDS.length];
            const badge = GRAPHIC_BADGES[(i % (GRAPHIC_BADGES.length - 1)) + 1];
            const border = BORDER_COLORS[i % BORDER_COLORS.length];
            const posList = ['top_left', 'top_right', 'bottom_left', 'bottom_right', 'top_center'];
            const pos = posList[i % posList.length];

            const url = await renderCompositeWithBadge(currentItem, bg, border, badge, pos);

            if (url) {
                newVariations.push({
                    id: `dyn_${Date.now()}_${i}`,
                    title: `Studio Var #${i + 1}`,
                    bgName: bg.name,
                    badgeName: badge.name,
                    borderName: border.name,
                    imageUrl: url
                });
            }

            setDynamicProgressPct(Math.round(((i + 1) / targetCount) * 100));
            await new Promise(r => setTimeout(r, 40));
        }

        setDynamicVariations(newVariations);
        setIsGeneratingDynamic(false);
    };

    // Load 8 More Variations Continuously
    const handleLoad8More = async () => {
        if (!currentItem || isGeneratingDynamic) return;

        setIsGeneratingDynamic(true);
        const currentCount = dynamicVariations.length;
        const addCount = 8;
        const newBatch = [];

        for (let i = 0; i < addCount; i++) {
            const idx = currentCount + i;
            const bg = MAGIC_BACKGROUNDS[idx % MAGIC_BACKGROUNDS.length];
            const badge = GRAPHIC_BADGES[(idx % (GRAPHIC_BADGES.length - 1)) + 1];
            const border = BORDER_COLORS[idx % BORDER_COLORS.length];
            const posList = ['top_left', 'top_right', 'bottom_left', 'bottom_right', 'top_center'];
            const pos = posList[idx % posList.length];

            const url = await renderCompositeWithBadge(currentItem, bg, border, badge, pos);

            if (url) {
                newBatch.push({
                    id: `dyn_${Date.now()}_${idx}`,
                    title: `Studio Var #${idx + 1}`,
                    bgName: bg.name,
                    badgeName: badge.name,
                    borderName: border.name,
                    imageUrl: url
                });
            }

            await new Promise(r => setTimeout(r, 40));
        }

        setDynamicVariations(prev => [...prev, ...newBatch]);
        setIsGeneratingDynamic(false);
    };

    // Download Single Photo
    const handleDownloadSingle = (url) => {
        const downloadUrl = url || renderedPreviewUrl;
        if (!downloadUrl) return;
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `studio_bg_${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    // Export All Dynamic Variations as a ZIP File
    const handleExportZip = async () => {
        const itemsToZip = dynamicVariations.length > 0 ? dynamicVariations : uploadedImages;
        if (itemsToZip.length === 0 || isZipping) return;

        setIsZipping(true);
        try {
            const zip = new JSZip();
            const folder = zip.folder("vendorsdesk_studio_backgrounds_bundle");

            itemsToZip.forEach((item, idx) => {
                const dataUrl = item.imageUrl || item.processedUrl;
                if (dataUrl) {
                    const base64Data = dataUrl.split(',')[1];
                    folder.file(`studio_variation_${idx + 1}.jpg`, base64Data, { base64: true });
                }
            });

            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `vendorsdesk_studio_photos_${itemsToZip.length}_bundle.zip`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Zip export error:', err);
            alert('Failed to generate ZIP archive.');
        } finally {
            setIsZipping(false);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '1080px', margin: '0 auto', color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
            
            {/* Sleek Integrated Studio Header Card */}
            <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #cbd5e1',
                padding: '0.85rem 1.25rem',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
                flexWrap: 'wrap',
                gap: '0.75rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)'
                    }}>
                        🖼️
                    </div>
                    <div>
                        <h1 style={{ fontFamily: 'Outfit', fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.015em' }}>
                            AI Studio & Background Generator
                        </h1>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500 }}>
                            1-Click Background Removal • Live Studio Backdrops • 19 Graphic PNG Badges
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        multiple
                        onChange={(e) => handleProductFilesSelect(e.target.files)}
                    />
                    <button
                        className="btn-action btn-action-primary"
                        onClick={() => fileInputRef.current.click()}
                        style={{ padding: '0.5rem 1rem', borderRadius: '9px', fontWeight: 800, fontSize: '0.8rem' }}
                    >
                        ➕ Add Product Photos
                    </button>

                    {(uploadedImages.length > 0 || dynamicVariations.length > 0) && (
                        <button
                            className="btn-submit-form"
                            disabled={isZipping}
                            onClick={handleExportZip}
                            style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                padding: '0.5rem 1.1rem',
                                borderRadius: '9px',
                                fontWeight: 800,
                                fontSize: '0.8rem',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                            }}
                        >
                            {isZipping ? '⏳ Zipping...' : `📦 Export ZIP (${dynamicVariations.length || uploadedImages.length})`}
                        </button>
                    )}
                </div>
            </div>

            {uploadedImages.length === 0 ? (
                <div
                    className="upload-zone"
                    onClick={() => fileInputRef.current.click()}
                    style={{
                        padding: '2rem 1.25rem',
                        borderRadius: '18px',
                        border: '2px dashed #2563eb',
                        background: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        maxWidth: '520px',
                        margin: '1.25rem auto',
                        boxShadow: '0 12px 30px -10px rgba(37, 99, 235, 0.08)'
                    }}
                >
                    <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🖼️</div>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                        Upload Product Photos to Remove & Change Background Live
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', maxWidth: '440px', margin: '0 auto 1.1rem auto', lineHeight: '1.5' }}>
                        Supports Kurti, Saree, Shoes, Watches, Bags & Electronics. Select up to 40 images to remove original backdrops, apply 19 Real Graphic Badges, and generate dynamic studio collections!
                    </p>
                    <button
                        className="btn-submit-form"
                        style={{ padding: '0.55rem 1.4rem', fontSize: '0.82rem', fontWeight: 800, borderRadius: '10px' }}
                    >
                        📸 Select Product Images
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* TOP SECTION: Live Canvas Editor & Right Panel Studio Controls */}
                    <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                        
                        {/* LEFT PANEL: Live Preview Canvas */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', maxWidth: '400px' }}>
                            <div style={{
                                background: '#ffffff',
                                borderRadius: '18px',
                                border: '1px solid #cbd5e1',
                                padding: '0.85rem',
                                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                                position: 'relative'
                            }}>
                                {/* Card Subheader */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', padding: '0 0.2rem' }}>
                                    <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <span>🖼️</span> Live Studio Canvas
                                    </span>
                                    <span style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                                        LIVE PREVIEW
                                    </span>
                                </div>

                                {/* Main Canvas Viewport - Clean Dynamic Aspect Ratio */}
                                <div style={{
                                    width: '100%',
                                    minHeight: '340px',
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                    background: '#0f172a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    padding: '0.5rem'
                                }}>
                                    {renderedPreviewUrl ? (
                                        <img
                                            src={renderedPreviewUrl}
                                            alt="Live Studio Preview"
                                            style={{ maxWidth: '100%', maxHeight: '440px', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}
                                        />
                                    ) : (
                                        <div style={{ textAlign: 'center', color: '#64748b' }}>
                                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏳</div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Isolating subject & generating live studio...</div>
                                        </div>
                                    )}
                                </div>

                                {/* Left Action Footer */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '0 0.5rem' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
                                        Photo {activeIndex + 1} of {uploadedImages.length}: <span style={{ color: '#0f172a' }}>{currentItem.name}</span>
                                    </div>

                                    <button
                                        className="btn-submit-form"
                                        onClick={() => handleDownloadSingle(renderedPreviewUrl)}
                                        style={{ padding: '0.55rem 1.25rem', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 800 }}
                                    >
                                        ⬇ Download Single HD
                                    </button>
                                </div>
                            </div>

                            {/* Bottom Multi-Image Switcher Strip */}
                            <div style={{
                                background: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid #cbd5e1',
                                padding: '0.75rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                overflowX: 'auto'
                            }}>
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '12px',
                                        border: '2px dashed #3b82f6',
                                        background: '#eff6ff',
                                        color: '#3b82f6',
                                        fontSize: '1.4rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}
                                    title="Add More Product Images"
                                >
                                    ＋
                                </button>

                                {uploadedImages.map((img, idx) => (
                                    <div
                                        key={img.id}
                                        onClick={() => setActiveIndex(idx)}
                                        style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            border: activeIndex === idx ? '3px solid #3b82f6' : '1px solid #cbd5e1',
                                            cursor: 'pointer',
                                            flexShrink: 0,
                                            boxShadow: activeIndex === idx ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : 'none',
                                            background: '#f8fafc'
                                        }}
                                    >
                                        <img src={img.processedUrl || img.originalUrl} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT PANEL: Category Tabs & Interactive Studio + Graphic Badge Controls */}
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '24px',
                            border: '1px solid #cbd5e1',
                            padding: '1.25rem',
                            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem'
                        }}>
                            {/* 1. GRAPHIC BADGES & BORDER SELECTOR BOX (WITH CUSTOM USER BADGE UPLOAD) */}
                            <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                        🏷️ Choose Graphic Badge & Frame:
                                    </label>
                                    
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
                                        style={{ padding: '0.25rem 0.65rem', fontSize: '0.72rem', fontWeight: 800, background: '#eff6ff', color: '#2563eb', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '8px' }}
                                    >
                                        📤 Upload Custom Badge
                                    </button>
                                </div>

                                <select
                                    value={selectedBadge.id}
                                    onChange={(e) => {
                                        const b = graphicBadgeList.find(item => item.id === e.target.value);
                                        if (b) setSelectedBadge(b);
                                    }}
                                    style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700 }}
                                >
                                    {graphicBadgeList.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                                            Badge Placement:
                                        </label>
                                        <select
                                            value={badgePosition}
                                            onChange={(e) => setBadgePosition(e.target.value)}
                                            style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700 }}
                                        >
                                            <option value="top_left">Top-Left</option>
                                            <option value="top_right">Top-Right</option>
                                            <option value="bottom_left">Bottom-Left</option>
                                            <option value="bottom_right">Bottom-Right</option>
                                            <option value="top_center">Top-Center</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.35rem' }}>
                                            Frame Border Color:
                                        </label>
                                        <select
                                            value={borderColor.id}
                                            onChange={(e) => {
                                                const bc = BORDER_COLORS.find(item => item.id === e.target.value);
                                                if (bc) setBorderColor(bc);
                                            }}
                                            style={{ width: '100%', padding: '0.55rem 0.75rem', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700 }}
                                        >
                                            {BORDER_COLORS.map(bc => (
                                                <option key={bc.id} value={bc.id}>{bc.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* 2. THREE MAIN CATEGORY TABS: Magic | Photo | Color */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                background: '#f1f5f9',
                                padding: '0.35rem',
                                borderRadius: '16px'
                            }}>
                                <button
                                    onClick={() => { setActiveTab('magic'); setCustomBgImage(null); }}
                                    style={{
                                        padding: '0.6rem 0',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '0.88rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        background: activeTab === 'magic' ? '#ffffff' : 'transparent',
                                        color: activeTab === 'magic' ? '#0f172a' : '#64748b',
                                        boxShadow: activeTab === 'magic' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
                                    }}
                                >
                                    Magic ✨
                                </button>
                                <button
                                    onClick={() => setActiveTab('photo')}
                                    style={{
                                        padding: '0.6rem 0',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '0.88rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        background: activeTab === 'photo' ? '#ffffff' : 'transparent',
                                        color: activeTab === 'photo' ? '#0f172a' : '#64748b',
                                        boxShadow: activeTab === 'photo' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
                                    }}
                                >
                                    Photo 📷
                                </button>
                                <button
                                    onClick={() => { setActiveTab('color'); setCustomBgImage(null); }}
                                    style={{
                                        padding: '0.6rem 0',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '0.88rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        background: activeTab === 'color' ? '#ffffff' : 'transparent',
                                        color: activeTab === 'color' ? '#0f172a' : '#64748b',
                                        boxShadow: activeTab === 'color' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
                                    }}
                                >
                                    Color 🎨
                                </button>
                            </div>

                            {/* TAB 1: MAGIC BACKGROUND PRESETS */}
                            {activeTab === 'magic' && (
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                                        Click Scene Backdrop to Apply Live:
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '0.85rem',
                                        maxHeight: '340px',
                                        overflowY: 'auto',
                                        paddingRight: '0.25rem'
                                    }}>
                                        {MAGIC_BACKGROUNDS.map(bg => (
                                            <div
                                                key={bg.id}
                                                onClick={() => { setSelectedBg(bg); setCustomBgImage(null); }}
                                                style={{
                                                    aspectRatio: '1 / 1',
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                    border: selectedBg.id === bg.id && !customBgImage ? '3px solid #3b82f6' : '1px solid #cbd5e1',
                                                    boxShadow: selectedBg.id === bg.id && !customBgImage ? '0 0 0 3px rgba(59, 130, 246, 0.35)' : 'none',
                                                    position: 'relative'
                                                }}
                                            >
                                                <img src={bg.url} alt={bg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: 0, left: 0, right: 0,
                                                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)',
                                                    padding: '0.4rem 0.5rem', color: '#ffffff',
                                                    fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                                }}>
                                                    {bg.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: PHOTO (UPLOAD CUSTOM BACKGROUND) */}
                            {activeTab === 'photo' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                                        Upload Custom Backdrop Image:
                                    </div>

                                    <input
                                        type="file"
                                        ref={bgInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const url = URL.createObjectURL(file);
                                                setCustomBgImage(url);
                                                setSelectedBg({ id: 'custom', name: 'Custom Photo', type: 'image', url });
                                            }
                                        }}
                                    />

                                    <button
                                        onClick={() => bgInputRef.current.click()}
                                        style={{
                                            padding: '1.25rem',
                                            borderRadius: '16px',
                                            border: '2px dashed #3b82f6',
                                            background: '#eff6ff',
                                            color: '#2563eb',
                                            fontWeight: 800,
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        📷 Upload Background Image From Device
                                    </button>

                                    {customBgImage && (
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                                                Active Custom Background Preview:
                                            </div>
                                            <div style={{ width: '100%', height: '140px', borderRadius: '14px', overflow: 'hidden', border: '2px solid #3b82f6' }}>
                                                <img src={customBgImage} alt="Custom Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* TAB 3: COLOR BACKDROPS */}
                            {activeTab === 'color' && (
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                                        Solid Studio Colors:
                                    </div>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '0.85rem'
                                    }}>
                                        {COLOR_BACKGROUNDS.map(col => (
                                            <div
                                                key={col.id}
                                                onClick={() => { setSelectedBg(col); setCustomBgImage(null); }}
                                                style={{
                                                    aspectRatio: '1 / 1',
                                                    borderRadius: '16px',
                                                    background: col.preview,
                                                    cursor: 'pointer',
                                                    border: selectedBg.id === col.id && !customBgImage ? '3px solid #3b82f6' : '1px solid #cbd5e1',
                                                    boxShadow: selectedBg.id === col.id && !customBgImage ? '0 0 0 3px rgba(59, 130, 246, 0.35)' : 'none',
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                    padding: '0.4rem',
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                <span style={{ fontSize: '0.62rem', fontWeight: 800, color: col.id === 'col_charcoal' || col.id === 'col_emerald' ? '#ffffff' : '#0f172a', background: 'rgba(255,255,255,0.75)', padding: '0.15rem 0.35rem', borderRadius: '6px' }}>
                                                    {col.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 3. DYNAMIC MULTI-VARIATION QUANTITY GENERATOR BOX */}
                            <div style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(124, 58, 237, 0.05))', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>⚡ Dynamic Studio Collection Generator:</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>Quantity:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="60"
                                        value={numVariationsInput}
                                        onChange={(e) => setNumVariationsInput(e.target.value)}
                                        style={{ width: '80px', padding: '0.45rem 0.65rem', fontSize: '0.85rem', fontWeight: 800, borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}
                                    />
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>unique studio photos</span>
                                </div>

                                <button
                                    className="btn-submit-form"
                                    disabled={isGeneratingDynamic}
                                    onClick={handleGenerateDynamicCollection}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                        boxShadow: '0 4px 15px rgba(37, 99, 235, 0.25)'
                                    }}
                                >
                                    {isGeneratingDynamic ? `Generating (${dynamicProgressPct}%)...` : `✨ Dynamically Generate ${numVariationsInput || 12} Studio Variations`}
                                </button>
                            </div>

                        </div>

                    </div>

                    {/* BOTTOM SECTION: DYNAMIC GENERATED VARIATIONS GRID (WHEN USER GENERATES COLLECTION) */}
                    {dynamicVariations.length > 0 && (
                        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #cbd5e1', padding: '1.5rem', boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h3 style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                        🎨 Dynamic Studio Variations Collection ({dynamicVariations.length} Photos)
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                                        Generated dynamically with unique studio backdrops, border colors & graphic PNG badges.
                                    </p>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        className="btn-action"
                                        disabled={isGeneratingDynamic}
                                        onClick={handleLoad8More}
                                        style={{ padding: '0.6rem 1.1rem', fontSize: '0.82rem', fontWeight: 800, borderRadius: '10px' }}
                                    >
                                        ✨ Generate 8 More Variations
                                    </button>

                                    <button
                                        className="btn-submit-form"
                                        disabled={isZipping}
                                        onClick={handleExportZip}
                                        style={{
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            padding: '0.6rem 1.3rem',
                                            fontSize: '0.82rem',
                                            fontWeight: 800,
                                            borderRadius: '10px'
                                        }}
                                    >
                                        {isZipping ? '⏳ Zipping...' : `📦 Export All ${dynamicVariations.length} (.ZIP)`}
                                    </button>
                                </div>
                            </div>

                            {/* Responsive 4-Column Variation Cards Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                                {dynamicVariations.map((varItem, idx) => (
                                    <div
                                        key={varItem.id}
                                        className="panel-card"
                                        style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', border: '1px solid #cbd5e1' }}
                                    >
                                        <div style={{ aspectRatio: '4 / 5', borderRadius: '14px', overflow: 'hidden', background: '#f8fafc' }}>
                                            <img src={varItem.imageUrl} alt={varItem.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>

                                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a' }}>
                                            {idx + 1}. {varItem.bgName}
                                        </div>

                                        <div style={{ fontSize: '0.68rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {varItem.badgeName}
                                        </div>

                                        <button
                                            className="btn-action btn-action-primary"
                                            style={{ padding: '0.45rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, width: '100%', marginTop: 'auto' }}
                                            onClick={() => handleDownloadSingle(varItem.imageUrl)}
                                        >
                                            ⬇ Download Single HD
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
