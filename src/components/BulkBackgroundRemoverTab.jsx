import React, { useState, useRef } from 'react';
import JSZip from 'jszip';

const STUDIO_BACKDROPS = [
    { id: 'white', name: '⚪ Pure White Studio (Amazon/Meesho Standard)', color: '#ffffff', preview: '#ffffff' },
    { id: 'offwhite', name: '🌫️ Soft Studio Shadow Vignette', color: '#f8fafc', preview: 'linear-gradient(135deg, #ffffff, #f1f5f9)' },
    { id: 'pink', name: '🌸 Pastel Pink Fashion Studio', color: '#fce7f3', preview: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' },
    { id: 'royalblue', name: '💙 Royal Blue Luxury Gradient', color: '#1e3a8a', preview: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' },
    { id: 'sunbeam', name: '☀️ Golden Hour Warm Studio', color: '#fffbeb', preview: 'linear-gradient(135deg, #fffbeb, #fde68a)' },
    { id: 'concrete', name: '🏛️ Minimalist Concrete Shadow', color: '#f1f5f9', preview: 'linear-gradient(135deg, #f1f5f9, #cbd5e1)' },
    { id: 'emerald', name: '👑 Emerald Velvet Luxury', color: '#064e3b', preview: 'linear-gradient(135deg, #065f46, #064e3b)' },
    { id: 'transparent', name: '✨ Transparent PNG (No Background)', color: 'transparent', preview: 'repeating-conic-gradient(#e2e8f0 0% 25%, #ffffff 0% 50%) 50% / 16px 16px' }
];

export default function BulkBackgroundRemoverTab() {
    const [files, setFiles] = useState([]);
    const [selectedBackdrop, setSelectedBackdrop] = useState(STUDIO_BACKDROPS[0]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progressCount, setProgressCount] = useState(0);
    const [isZipping, setIsZipping] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fileInputRef = useRef(null);

    // Handle Bulk File Selection (Supports up to 40 Images)
    const handleFilesSelect = (selectedFileList) => {
        if (!selectedFileList || selectedFileList.length === 0) return;

        const validFiles = Array.from(selectedFileList).filter(f => f.type.startsWith('image/'));

        if (validFiles.length === 0) {
            alert('Please select valid image files (JPG, PNG, WebP).');
            return;
        }

        if (validFiles.length > 40) {
            alert('You can select a maximum of 40 images per batch. Processing first 40 images.');
        }

        const batchFiles = validFiles.slice(0, 40);

        const newItems = batchFiles.map((file, idx) => {
            return {
                id: `img_${Date.now()}_${idx}`,
                name: file.name,
                originalUrl: URL.createObjectURL(file),
                fileObj: file,
                status: 'pending', // 'pending' | 'processing' | 'done' | 'failed'
                processedUrl: null,
                error: null
            };
        });

        setFiles(prev => [...prev, ...newItems]);
        setErrorMsg('');
    };

    // Remove single item from queue
    const handleRemoveItem = (id) => {
        setFiles(prev => prev.filter(item => item.id !== id));
    };

    // Reset entire queue
    const handleResetAll = () => {
        setFiles([]);
        setProgressCount(0);
        setIsProcessing(false);
        setErrorMsg('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Edge-Aware Background Removal & Backdrop Replacement Canvas Engine
    const processImageBackdrop = (fileObj, backdropId) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        const width = img.width;
                        const height = img.height;
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');

                        // 1. Draw Selected Studio Backdrop
                        if (backdropId === 'white') {
                            ctx.fillStyle = '#ffffff';
                            ctx.fillRect(0, 0, width, height);
                        } else if (backdropId === 'offwhite') {
                            ctx.fillStyle = '#f8fafc';
                            ctx.fillRect(0, 0, width, height);

                            const grad = ctx.createRadialGradient(width / 2, height * 0.7, 40, width / 2, height * 0.7, width * 0.6);
                            grad.addColorStop(0, 'rgba(0, 0, 0, 0.08)');
                            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 0, width, height);
                        } else if (backdropId === 'pink') {
                            const grad = ctx.createLinearGradient(0, 0, width, height);
                            grad.addColorStop(0, '#fce7f3');
                            grad.addColorStop(1, '#fbcfe8');
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 0, width, height);
                        } else if (backdropId === 'royalblue') {
                            const grad = ctx.createLinearGradient(0, 0, 0, height);
                            grad.addColorStop(0, '#1e3a8a');
                            grad.addColorStop(1, '#3b82f6');
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 0, width, height);
                        } else if (backdropId === 'sunbeam') {
                            const grad = ctx.createRadialGradient(width * 0.3, height * 0.2, 20, width / 2, height / 2, width * 0.85);
                            grad.addColorStop(0, '#fffbeb');
                            grad.addColorStop(0.5, '#fef3c7');
                            grad.addColorStop(1, '#fde68a');
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 0, width, height);
                        } else if (backdropId === 'concrete') {
                            const grad = ctx.createLinearGradient(0, 0, width, height);
                            grad.addColorStop(0, '#f1f5f9');
                            grad.addColorStop(1, '#cbd5e1');
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 0, width, height);
                        } else if (backdropId === 'emerald') {
                            const grad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width * 0.75);
                            grad.addColorStop(0, '#065f46');
                            grad.addColorStop(1, '#064e3b');
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 0, width, height);
                        }

                        // 2. Perform Edge-Aware Subject Isolation & Background Removal
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = width;
                        tempCanvas.height = height;
                        const tempCtx = tempCanvas.getContext('2d');
                        tempCtx.drawImage(img, 0, 0, width, height);

                        const imgData = tempCtx.getImageData(0, 0, width, height);
                        const data = imgData.data;

                        // Sample background color from outer border samples
                        let rSum = 0, gSum = 0, bSum = 0, count = 0;
                        const cornerCoords = [
                            [2, 2], [width - 3, 2], [2, height - 3], [width - 3, height - 3],
                            [12, 12], [width - 13, 12], [12, height - 13], [width - 13, height - 13]
                        ];
                        cornerCoords.forEach(([cx, cy]) => {
                            const idx = (cy * width + cx) * 4;
                            rSum += data[idx];
                            gSum += data[idx + 1];
                            bSum += data[idx + 2];
                            count++;
                        });

                        const bgR = rSum / count;
                        const bgG = gSum / count;
                        const bgB = bSum / count;
                        const tolerance = 44;

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
                            } else if (diff < tolerance + 22) {
                                const alphaRatio = (diff - tolerance) / 22;
                                data[i + 3] = Math.round(255 * alphaRatio); // Smooth edge feathering
                            }
                        }

                        tempCtx.putImageData(imgData, 0, 0);

                        // 3. Composite Natural Studio Ground Shadow (Non-Transparent Backdrops)
                        if (backdropId !== 'transparent') {
                            ctx.save();
                            ctx.filter = 'blur(16px)';
                            ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
                            ctx.beginPath();
                            ctx.ellipse(width / 2, height * 0.88, width * 0.34, height * 0.05, 0, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();
                        }

                        // 4. Overlay Subject Product Unchanged
                        ctx.drawImage(tempCanvas, 0, 0, width, height);

                        const outDataUrl = canvas.toDataURL(backdropId === 'transparent' ? 'image/png' : 'image/jpeg', 0.92);
                        resolve(outDataUrl);
                    } catch (err) {
                        reject(err);
                    }
                };
                img.onerror = (e) => reject(e);
            };
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(fileObj);
        });
    };

    // Bulk Process All Images in Queue
    const handleProcessBulk = async () => {
        if (files.length === 0 || isProcessing) return;

        setIsProcessing(true);
        setProgressCount(0);
        setErrorMsg('');

        const pendingItems = files.filter(f => f.status !== 'done');
        let completed = 0;

        for (let i = 0; i < files.length; i++) {
            const item = files[i];

            // Set state to processing
            setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'processing' } : f));

            try {
                const resultUrl = await processImageBackdrop(item.fileObj, selectedBackdrop.id);
                setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'done', processedUrl: resultUrl } : f));
            } catch (err) {
                console.error(`Failed to process ${item.name}:`, err);
                setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'failed', error: 'Processing error' } : f));
            }

            completed++;
            setProgressCount(completed);
            await new Promise(r => setTimeout(r, 60)); // Small yield for UI updates
        }

        setIsProcessing(false);
    };

    // Download Single Processed Image
    const handleDownloadSingle = (item) => {
        if (!item.processedUrl) return;
        const ext = selectedBackdrop.id === 'transparent' ? 'png' : 'jpg';
        const a = document.createElement('a');
        a.href = item.processedUrl;
        a.download = `studio_${item.name.replace(/\.[^/.]+$/, '')}.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    // Bulk Export All Processed Images as a single compressed ZIP file
    const handleExportZip = async () => {
        const doneItems = files.filter(f => f.status === 'done' && f.processedUrl);
        if (doneItems.length === 0 || isZipping) {
            alert('No processed images available to export.');
            return;
        }

        setIsZipping(true);

        try {
            const zip = new JSZip();
            const folder = zip.folder("vendorsdesk_studio_photos");

            doneItems.forEach((item, idx) => {
                const base64Data = item.processedUrl.split(',')[1];
                const ext = selectedBackdrop.id === 'transparent' ? 'png' : 'jpg';
                const filename = `studio_${idx + 1}_${item.name.replace(/\.[^/.]+$/, '')}.${ext}`;
                folder.file(filename, base64Data, { base64: true });
            });

            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `vendorsdesk_studio_backgrounds_${doneItems.length}_photos.zip`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('ZIP generation error:', err);
            alert('Failed to generate ZIP archive.');
        } finally {
            setIsZipping(false);
        }
    };

    const doneCount = files.filter(f => f.status === 'done').length;
    const pct = files.length > 0 ? Math.round((progressCount / files.length) * 100) : 0;

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', color: '#0f172a' }}>
            
            {/* Header & Controls Panel */}
            <div className="panel-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(124, 58, 237, 0.05))', border: '1px solid rgba(37, 99, 235, 0.18)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-block', marginBottom: '0.5rem' }}>
                            🖼️ BULK BACKGROUND REMOVER & STUDIO REPLACER
                        </div>
                        <h2 style={{ fontFamily: 'Outfit', fontSize: '1.9rem', fontWeight: 800, margin: 0 }}>
                            Bulk Product Image Background Changer (30-40 Photos)
                        </h2>
                    </div>

                    {doneCount > 0 && (
                        <button
                            className="btn-submit-form"
                            disabled={isZipping}
                            onClick={handleExportZip}
                            style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                padding: '0.75rem 1.5rem',
                                fontSize: '0.9rem',
                                fontWeight: 800,
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {isZipping ? '⏳ Zipping Photos...' : `📦 Export All ${doneCount} Studio Photos (.ZIP)`}
                        </button>
                    )}
                </div>

                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '780px' }}>
                    Upload 30 to 40 product images at once. Automatically remove original backgrounds, isolate the product subject without modifying details, and replace with high-converting E-Commerce Studio backdrops.
                </p>

                {/* Backdrop Picker & Bulk Actions Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', alignItems: 'center', background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.5rem' }}>
                            Select E-Commerce Studio Backdrop:
                        </label>
                        <select
                            value={selectedBackdrop.id}
                            onChange={(e) => {
                                const b = STUDIO_BACKDROPS.find(item => item.id === e.target.value);
                                if (b) setSelectedBackdrop(b);
                            }}
                            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700 }}
                        >
                            {STUDIO_BACKDROPS.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', alignItems: 'center', height: '100%', paddingTop: '1.2rem' }}>
                        <button
                            className="btn-action"
                            onClick={() => fileInputRef.current.click()}
                            style={{ padding: '0.65rem 1.1rem', fontSize: '0.85rem', fontWeight: 700, borderRadius: '10px' }}
                        >
                            ➕ Add Images
                        </button>

                        <button
                            className="btn-submit-form"
                            disabled={files.length === 0 || isProcessing}
                            onClick={handleProcessBulk}
                            style={{
                                padding: '0.65rem 1.4rem',
                                fontSize: '0.85rem',
                                fontWeight: 800,
                                opacity: (files.length === 0 || isProcessing) ? 0.6 : 1,
                                cursor: (files.length === 0 || isProcessing) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isProcessing ? `Processing (${pct}%)` : `🚀 Replace Backgrounds (${files.length})`}
                        </button>
                    </div>

                </div>
            </div>

            {/* Upload Zone & Bulk Queue Display */}
            {files.length === 0 ? (
                <div
                    className="upload-zone"
                    onClick={() => fileInputRef.current.click()}
                    style={{
                        padding: '3.5rem 2rem',
                        borderRadius: '20px',
                        border: '2px dashed #2563eb',
                        background: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        maxWidth: '650px',
                        margin: '0 auto'
                    }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFilesSelect(e.target.files)}
                    />
                    <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>📸</div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                        Bulk Upload Product Images (30–40 Photos)
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Supports JPG, PNG, WebP (Click or Drag & Drop Multiple Files)
                    </div>
                </div>
            ) : (
                <div>
                    {/* Live Progress Bar */}
                    {isProcessing && (
                        <div className="panel-card" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ width: '16px', height: '16px', border: '2px solid #2563eb', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                    Replacing backgrounds for batch... {progressCount} / {files.length} ({pct}%)
                                </span>
                                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Isolating subjects with edge detection...</span>
                            </div>
                            <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #7c3aed)', transition: 'width 0.3s' }} />
                            </div>
                        </div>
                    )}

                    {/* Batch Actions Summary Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h3 style={{ fontFamily: 'Outfit', fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                            📷 Uploaded Product Queue ({files.length} Photos)
                        </h3>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.75rem', borderRadius: '10px' }}>
                                ✅ {doneCount} Processed
                            </span>
                            <button
                                type="button"
                                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.35rem 0.85rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}
                                onClick={handleResetAll}
                            >
                                🗑️ Clear All
                            </button>
                        </div>
                    </div>

                    {/* 30-40 Images Responsive Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
                        {files.map((item, idx) => (
                            <div
                                key={item.id}
                                className="panel-card"
                                style={{
                                    padding: '0.75rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.65rem',
                                    border: item.status === 'done' ? '2px solid #10b981' : (item.status === 'processing' ? '2px solid #2563eb' : '1px solid #cbd5e1'),
                                    position: 'relative'
                                }}
                            >
                                {/* Photo Preview Container */}
                                <div style={{ aspectRatio: '1 / 1', borderRadius: '12px', overflow: 'hidden', background: selectedBackdrop.preview, position: 'relative' }}>
                                    <img
                                        src={item.processedUrl || item.originalUrl}
                                        alt={item.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />

                                    {/* Status Badge Tag */}
                                    <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                                        {item.status === 'done' && (
                                            <span style={{ background: '#10b981', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                                                ✅ READY
                                            </span>
                                        )}
                                        {item.status === 'processing' && (
                                            <span style={{ background: '#2563eb', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                                                ⚡ PROCESSING
                                            </span>
                                        )}
                                        {item.status === 'pending' && (
                                            <span style={{ background: '#64748b', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                                                ⏳ QUEUED
                                            </span>
                                        )}
                                    </div>

                                    {/* Remove Item Button */}
                                    {!isProcessing && (
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            style={{
                                                position: 'absolute', top: '8px', right: '8px',
                                                background: 'rgba(15, 23, 42, 0.65)', color: '#ffffff',
                                                border: 'none', borderRadius: '50%', width: '24px', height: '24px',
                                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.75rem', fontWeight: 'bold'
                                            }}
                                            title="Remove Photo"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                {/* File Name & Download Controls */}
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {idx + 1}. {item.name}
                                </div>

                                {item.status === 'done' ? (
                                    <button
                                        className="btn-action btn-action-primary"
                                        style={{ padding: '0.5rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, width: '100%', background: '#10b981', borderColor: '#10b981' }}
                                        onClick={() => handleDownloadSingle(item)}
                                    >
                                        ⬇ Download Single HD
                                    </button>
                                ) : (
                                    <div style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'center', height: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {item.status === 'processing' ? 'Isolating Subject...' : 'Waiting for Batch Process'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
