// src/services/image/imageProcessor.js - Edge-Aware Subject Isolation & Composite Canvas Renderer

export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
    });
}

/**
 * Edge-Aware Subject Isolation (Background Remover Engine)
 * Samples outer perimeter corners to compute background color,
 * then strips background using Euclidean RGB distance with soft feathering.
 */
export function isolateSubject(imgElement) {
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
}

/**
 * Full Composite Render (Subject + Background + Border Frame + PNG Graphic Badge)
 * Supports both positional parameters and options object.
 */
export async function renderCompositeWithBadge(item, bgObj, borderObj, badgeObj, pos = 'top_left', options = {}) {
    if (!item) return null;

    const {
        subjectScale = 100,
        subjectOffsetX = 0,
        subjectOffsetY = 0,
        subjectFlipH = false,
        onIsolated
    } = options;

    try {
        const mainImg = await loadImage(item.originalUrl);
        const width = mainImg.naturalWidth || 800;
        const height = mainImg.naturalHeight || 800;

        let isolatedCanvas = item.isolatedCanvas;
        if (!isolatedCanvas) {
            isolatedCanvas = isolateSubject(mainImg);
            if (typeof onIsolated === 'function') {
                onIsolated(isolatedCanvas);
            }
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
        if (bgObj && bgObj.type === 'color') {
            if (bgObj.value !== 'transparent') {
                outCtx.fillStyle = bgObj.value;
                outCtx.fillRect(drawX, drawY, drawW, drawH);
            }
        } else if (bgObj && bgObj.type === 'image' && bgObj.url) {
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
            } catch (e) {
                outCtx.fillStyle = '#f8fafc';
                outCtx.fillRect(drawX, drawY, drawW, drawH);
            }
        }

        // 3. Composite Ground Contact Shadow
        if (bgObj && bgObj.value !== 'transparent') {
            outCtx.save();
            outCtx.filter = 'blur(16px)';
            outCtx.fillStyle = 'rgba(0, 0, 0, 0.26)';
            outCtx.beginPath();
            outCtx.ellipse(width / 2, height * 0.88, width * 0.34, height * 0.05, 0, 0, Math.PI * 2);
            outCtx.fill();
            outCtx.restore();
        }

        // 4. Overlay Isolated Subject Product with Interactive Scale & Move Transforms
        outCtx.save();
        const scaleFactor = (subjectScale || 100) / 100;
        const offX = ((subjectOffsetX || 0) / 100) * drawW;
        const offY = ((subjectOffsetY || 0) / 100) * drawH;

        const subjW = drawW * scaleFactor;
        const subjH = drawH * scaleFactor;
        const subjX = drawX + (drawW - subjW) / 2 + offX;
        const subjY = drawY + (drawH - subjH) / 2 + offY;

        if (subjectFlipH) {
            outCtx.translate(subjX + subjW / 2, subjY + subjH / 2);
            outCtx.scale(-1, 1);
            outCtx.drawImage(isolatedCanvas, -subjW / 2, -subjH / 2, subjW, subjH);
        } else {
            outCtx.drawImage(isolatedCanvas, subjX, subjY, subjW, subjH);
        }
        outCtx.restore();

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
            } catch (e) {}
        }

        const mime = bgObj && bgObj.value === 'transparent' ? 'image/png' : 'image/jpeg';
        return outCanvas.toDataURL(mime, 0.92);
    } catch (err) {
        console.error('Composite render error:', err);
        return null;
    }
}
