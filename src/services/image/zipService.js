// src/services/image/zipService.js - Client-Side Batch ZIP Archiver
import JSZip from 'jszip';

export async function exportImagesAsZip({
    items = [],
    folderName = 'vendorsdesk_studio_backgrounds_bundle',
    zipFileName = 'vendorsdesk_studio_bundle.zip'
} = {}) {
    if (!items || items.length === 0) return false;

    const zip = new JSZip();
    const folder = zip.folder(folderName);

    items.forEach((item, idx) => {
        const dataUrl = item.imageUrl || item.processedUrl;
        if (dataUrl) {
            const base64Data = dataUrl.split(',')[1];
            const ext = dataUrl.startsWith('data:image/png') ? 'png' : 'jpg';
            folder.file(`studio_variation_${idx + 1}.${ext}`, base64Data, { base64: true });
        }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = zipFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    return true;
}
