import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';

// Curated High-Definition Background Presets matching user design
const MAGIC_BACKGROUNDS = [
    { id: 'bg_beach', name: 'Tropical Beach', type: 'image', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop', category: 'Nature' },
    { id: 'bg_forest', name: 'Sunlit Forest', type: 'image', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop', category: 'Nature' },
    { id: 'bg_mountain', name: 'Green Mountain Peak', type: 'image', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop', category: 'Nature' },
    { id: 'bg_sunset_wave', name: 'Sunset Ocean', type: 'image', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop', category: 'Nature' },
    { id: 'bg_living_room', name: 'Cozy Living Room', type: 'image', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', category: 'Indoor' },
    { id: 'bg_floral_arch', name: 'White Floral Arch', type: 'image', url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop', category: 'Luxury' },
    { id: 'bg_library', name: 'Warm Library', type: 'image', url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop', category: 'Indoor' },
    { id: 'bg_japanese_garden', name: 'Zen Garden Tatami', type: 'image', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop', category: 'Luxury' },
    { id: 'bg_palace_corridor', name: 'Regal Palace Hall', type: 'image', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop', category: 'Luxury' },
    { id: 'bg_yellow_field', name: 'Yellow Flower Field', type: 'image', url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop', category: 'Nature' },
    { id: 'bg_marble_studio', name: 'Luxury White Marble', type: 'image', url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop', category: 'Studio' },
    { id: 'bg_modern_office', name: 'Minimalist Studio Desk', type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop', category: 'Indoor' },
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

export default function BulkBackgroundRemoverTab() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('magic'); // 'magic' | 'photo' | 'color'
    const [selectedBg, setSelectedBg] = useState(MAGIC_BACKGROUNDS[0]);
    const [customBgImage, setCustomBgImage] = useState(null);

    const [isRemovingBg, setIsRemovingBg] = useState(false);
    const [isProcessingBatch, setIsProcessingBatch] = useState(false);
    const [batchProgress, setBatchProgress] = useState(0);
    const [isZipping, setIsZipping] = useState(false);

    const [renderedPreviewUrl, setRenderedPreviewUrl] = useState(null);

    const fileInputRef = useRef(null);
    const bgInputRef = useRef(null);

    // Active product item
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
                data[i + 3] = 0; // Make background transparent
            } else if (diff < tolerance + 24) {
                const alphaRatio = (diff - tolerance) / 24;
                data[i + 3] = Math.round(255 * alphaRatio); // Soft edge feathering
            }
        }

        ctx.putImageData(imgData, 0, 0);
        return canvas;
    };

    // Render Canvas Composite (Subject on Top of Selected Background)
    const renderComposite = async (item, bgObj) => {
        if (!item) return null;

        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = item.originalUrl;

            img.onload = () => {
                const width = img.naturalWidth || 800;
                const height = img.naturalHeight || 800;

                // 1. Isolate subject if not already isolated
                let isolatedCanvas = item.isolatedCanvas;
                if (!isolatedCanvas) {
                    isolatedCanvas = isolateSubject(img);
                    // Save isolated canvas to item state
                    setUploadedImages(prev => prev.map(p => p.id === item.id ? { ...p, isolatedCanvas } : p));
                }

                const outCanvas = document.createElement('canvas');
                outCanvas.width = width;
                outCanvas.height = height;
                const outCtx = outCanvas.getContext('2d');

                // 2. Draw Background
                if (bgObj.type === 'color') {
                    if (bgObj.value !== 'transparent') {
                        outCtx.fillStyle = bgObj.value;
                        outCtx.fillRect(0, 0, width, height);
                    }
                    drawCompositeAndFinish();
                } else if (bgObj.type === 'image') {
                    const bgImg = new Image();
                    bgImg.crossOrigin = 'anonymous';
                    bgImg.src = bgObj.url;
                    bgImg.onload = () => {
                        // Draw cover cropped background image
                        const bgAspect = bgImg.width / bgImg.height;
                        const outAspect = width / height;
                        let renderW, renderH, renderX, renderY;

                        if (bgAspect > outAspect) {
                            renderH = height;
                            renderW = height * bgAspect;
                            renderX = (width - renderW) / 2;
                            renderY = 0;
                        } else {
                            renderW = width;
                            renderH = width / bgAspect;
                            renderX = 0;
                            renderY = (height - renderH) / 2;
                        }

                        outCtx.drawImage(bgImg, renderX, renderY, renderW, renderH);
                        drawCompositeAndFinish();
                    };
                    bgImg.onerror = () => {
                        // Fallback background
                        outCtx.fillStyle = '#f8fafc';
                        outCtx.fillRect(0, 0, width, height);
                        drawCompositeAndFinish();
                    };
                }

                function drawCompositeAndFinish() {
                    // Soft Natural Contact Shadow under subject
                    if (bgObj.value !== 'transparent') {
                        outCtx.save();
                        outCtx.filter = 'blur(18px)';
                        outCtx.fillStyle = 'rgba(0, 0, 0, 0.28)';
                        outCtx.beginPath();
                        outCtx.ellipse(width / 2, height * 0.88, width * 0.35, height * 0.05, 0, 0, Math.PI * 2);
                        outCtx.fill();
                        outCtx.restore();
                    }

                    // Draw Isolated Subject/Product Unchanged on top
                    outCtx.drawImage(isolatedCanvas, 0, 0, width, height);

                    const dataUrl = outCanvas.toDataURL(bgObj.value === 'transparent' ? 'image/png' : 'image/jpeg', 0.92);
                    resolve(dataUrl);
                }
            };
        });
    };

    // Live Render active image when item or background selection changes
    useEffect(() => {
        if (!currentItem) return;
        let isMounted = true;

        const currentBg = customBgImage ? { type: 'image', url: customBgImage } : selectedBg;

        renderComposite(currentItem, currentBg).then(url => {
            if (isMounted && url) {
                setRenderedPreviewUrl(url);
                // Update item processedUrl
                setUploadedImages(prev => prev.map((p, idx) => idx === activeIndex ? { ...p, processedUrl: url } : p));
            }
        });

        return () => { isMounted = false; };
    }, [activeIndex, selectedBg, customBgImage, uploadedImages.length]);

    // Handle Custom Background Upload
    const handleCustomBgSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setCustomBgImage(url);
            setSelectedBg({ id: 'custom', name: 'Custom Photo', type: 'image', url });
        }
    };

    // Process All Images in Queue
    const handleProcessAllBatch = async () => {
        if (uploadedImages.length === 0 || isProcessingBatch) return;

        setIsProcessingBatch(true);
        setBatchProgress(0);

        const currentBg = customBgImage ? { type: 'image', url: customBgImage } : selectedBg;

        for (let i = 0; i < uploadedImages.length; i++) {
            const item = uploadedImages[i];
            const url = await renderComposite(item, currentBg);
            setUploadedImages(prev => prev.map((p, idx) => idx === i ? { ...p, processedUrl: url } : p));
            setBatchProgress(Math.round(((i + 1) / uploadedImages.length) * 100));
            await new Promise(r => setTimeout(r, 50));
        }

        setIsProcessingBatch(false);
    };

    // Download Single Active Photo
    const handleDownloadSingle = () => {
        if (!renderedPreviewUrl) return;
        const ext = selectedBg.value === 'transparent' ? 'png' : 'jpg';
        const a = document.createElement('a');
        a.href = renderedPreviewUrl;
        a.download = `studio_bg_${Date.now()}.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    // Export All Processed Studio Photos as ZIP
    const handleExportZip = async () => {
        if (uploadedImages.length === 0 || isZipping) return;

        setIsZipping(true);
        try {
            const zip = new JSZip();
            const folder = zip.folder("vendorsdesk_studio_backgrounds");
            const currentBg = customBgImage ? { type: 'image', url: customBgImage } : selectedBg;

            for (let i = 0; i < uploadedImages.length; i++) {
                const item = uploadedImages[i];
                let dataUrl = item.processedUrl;
                if (!dataUrl) {
                    dataUrl = await renderComposite(item, currentBg);
                }
                const base64Data = dataUrl.split(',')[1];
                const ext = currentBg.value === 'transparent' ? 'png' : 'jpg';
                folder.file(`studio_${i + 1}_${item.name.replace(/\.[^/.]+$/, '')}.${ext}`, base64Data, { base64: true });
            }

            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `vendorsdesk_studio_photos_${uploadedImages.length}_bundle.zip`;
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
        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
            
            {/* Top Title & Header Banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.4rem' }}>
                        ✨ AUTOMATED BACKGROUND REMOVER & LIVE STUDIO REPLACER
                    </div>
                    <h1 style={{ fontFamily: 'Outfit', fontSize: '2.1rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                        Instant Product Background Removal & Live Studio Backdrops
                    </h1>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
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
                        style={{ padding: '0.7rem 1.3rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.85rem' }}
                    >
                        ➕ Upload Product Photos (Up to 40)
                    </button>

                    {uploadedImages.length > 0 && (
                        <button
                            className="btn-submit-form"
                            disabled={isZipping}
                            onClick={handleExportZip}
                            style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                padding: '0.7rem 1.4rem',
                                borderRadius: '10px',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)'
                            }}
                        >
                            {isZipping ? '⏳ Zipping...' : `📦 Export All ${uploadedImages.length} Photos (ZIP)`}
                        </button>
                    )}
                </div>
            </div>

            {/* Main Interactive Studio Editor Workspace */}
            {uploadedImages.length === 0 ? (
                <div
                    className="upload-zone"
                    onClick={() => fileInputRef.current.click()}
                    style={{
                        padding: '4.5rem 2rem',
                        borderRadius: '24px',
                        border: '2px dashed #2563eb',
                        background: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        maxWidth: '700px',
                        margin: '2rem auto',
                        boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.08)'
                    }}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🖼️</div>
                    <h2 style={{ fontFamily: 'Outfit', fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                        Upload Product Photos to Remove & Change Background Live
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '480px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                        Supports Kurti, Saree, Shoes, Watches, Bags & Electronics. Select up to 40 images to remove original backdrops and replace with AI Studio scenes.
                    </p>
                    <button
                        className="btn-submit-form"
                        style={{ padding: '0.8rem 2.2rem', fontSize: '0.95rem', fontWeight: 800, borderRadius: '12px' }}
                    >
                        📸 Select Product Images
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'start' }}>
                    
                    {/* LEFT PANEL: Live Preview Canvas (Matching User Image Layout) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '24px',
                            border: '1px solid #cbd5e1',
                            padding: '1rem',
                            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
                            position: 'relative'
                        }}>
                            {/* Top Badge Overlay */}
                            <div style={{
                                position: 'absolute',
                                top: '24px',
                                left: '24px',
                                zIndex: 10,
                                background: 'rgba(255, 255, 255, 0.92)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(203, 213, 225, 0.8)',
                                padding: '0.45rem 1rem',
                                borderRadius: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                            }}>
                                <span style={{ fontSize: '0.9rem' }}>✨</span>
                                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a' }}>Generate Background</span>
                                <span style={{ background: '#3b82f6', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '12px' }}>LIVE</span>
                            </div>

                            {/* Main Canvas Viewport */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '4 / 5',
                                borderRadius: '18px',
                                overflow: 'hidden',
                                background: selectedBg.preview,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                {renderedPreviewUrl ? (
                                    <img
                                        src={renderedPreviewUrl}
                                        alt="Live Studio Preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#64748b' }}>
                                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏳</div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Removing background & rendering studio...</div>
                                    </div>
                                )}
                            </div>

                            {/* Left Panel Action Footer */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '0 0.5rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>
                                    Photo {activeIndex + 1} of {uploadedImages.length}: <span style={{ color: '#0f172a' }}>{currentItem.name}</span>
                                </div>

                                <button
                                    className="btn-submit-form"
                                    onClick={handleDownloadSingle}
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

                    {/* RIGHT PANEL: Category Tabs & Interactive Backdrop Grid (Matching User Screenshot UI) */}
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
                        {/* 3 Main Category Tabs: Magic | Photo | Color */}
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
                                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                    Popular E-Commerce Studio Scenes (Click to Apply Live):
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '0.85rem',
                                    maxHeight: '460px',
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
                                                boxShadow: selectedBg.id === bg.id && !customBgImage ? '0 0 0 3px rgba(59, 130, 246, 0.35)' : '0 2px 6px rgba(0,0,0,0.04)',
                                                position: 'relative',
                                                transition: 'transform 0.15s'
                                            }}
                                        >
                                            <img src={bg.url} alt={bg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)',
                                                padding: '0.4rem 0.5rem',
                                                color: '#ffffff',
                                                fontSize: '0.65rem',
                                                fontWeight: 700,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
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
                                    onChange={handleCustomBgSelect}
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
                                    Solid Studio Colors & Transparent Alpha Grid:
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

                        {/* Batch Action Apply Button */}
                        <button
                            className="btn-submit-form"
                            disabled={isProcessingBatch}
                            onClick={handleProcessAllBatch}
                            style={{
                                marginTop: 'auto',
                                width: '100%',
                                padding: '0.85rem',
                                borderRadius: '14px',
                                fontSize: '0.9rem',
                                fontWeight: 800
                            }}
                        >
                            {isProcessingBatch ? `Applying to Batch... (${batchProgress}%)` : `⚡ Apply Current Studio Backdrop to All ${uploadedImages.length} Photos`}
                        </button>

                    </div>

                </div>
            )}
        </div>
    );
}
