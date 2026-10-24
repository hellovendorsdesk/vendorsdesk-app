// src/services/marketplace/amazonService.js - Amazon FBA Calculations & 249-Byte Keyword Cleaner

/**
 * Amazon 249-Byte Search Term Cleaner
 * Enforces UTF-8 249-byte limit, removes stop words, eliminates duplicates preserving order
 */
export function cleanAmazonKeywords(rawInput = '') {
    if (!rawInput) return { cleanedKeywords: '', byteCount: 0, wordCount: 0, withinLimit: true };

    const stopWords = new Set(['and', 'with', 'for', 'the', 'a', 'an', 'in', 'of', 'to', 'is', 'on', 'by']);
    const words = rawInput
        .replace(/[^\w\s]/gi, ' ')
        .split(/\s+/)
        .map(w => w.trim().toLowerCase())
        .filter(w => w.length > 1 && !stopWords.has(w));

    // Deduplicate preserving order
    const seen = new Set();
    const uniqueWords = [];
    for (const w of words) {
        if (!seen.has(w)) {
            seen.add(w);
            uniqueWords.push(w);
        }
    }

    let resultString = '';
    const encoder = new TextEncoder();

    for (const w of uniqueWords) {
        const candidate = resultString ? `${resultString} ${w}` : w;
        const byteLen = encoder.encode(candidate).length;
        if (byteLen <= 249) {
            resultString = candidate;
        } else {
            break;
        }
    }

    const finalBytes = encoder.encode(resultString).length;

    return {
        cleanedKeywords: resultString,
        byteCount: finalBytes,
        wordCount: resultString ? resultString.split(' ').length : 0,
        withinLimit: finalBytes <= 249
    };
}

/**
 * Calculates Amazon FBA fulfillment fee based on size tier & shipping weight
 */
export function calculateAmazonFba({
    lengthCm = 25,
    widthCm = 15,
    heightCm = 5,
    weightKg = 0.45,
    category = 'General',
    sellPrice = 29.99,
    itemCost = 8
} = {}) {
    const l = Number(lengthCm);
    const w = Number(widthCm);
    const h = Number(heightCm);
    const wt = Number(weightKg);
    const price = Number(sellPrice);
    const cost = Number(itemCost);

    // Dimensional Weight (Length x Width x Height in cm / 5000)
    const dimWeight = (l * w * h) / 5000;
    const billedWeight = Math.max(wt, dimWeight);

    // Size Tier logic
    let sizeTier = 'Standard Size';
    let fbaFee = 3.22;

    if (l <= 38 && w <= 25 && h <= 2 && wt <= 0.25) {
        sizeTier = 'Small Standard';
        fbaFee = 3.22;
    } else if (l <= 45 && w <= 35 && h <= 20 && wt <= 1.0) {
        sizeTier = 'Large Standard';
        fbaFee = 3.86 + Math.max(0, (billedWeight - 0.5) * 0.40);
    } else {
        sizeTier = 'Oversize';
        fbaFee = 8.50 + Math.max(0, (billedWeight - 1.0) * 0.75);
    }

    // Referral Fee (typically 15% for general categories)
    const referralFeeRate = category === 'Electronics' ? 0.08 : 0.15;
    const referralFee = Math.round(price * referralFeeRate * 100) / 100;

    const totalAmazonFees = Math.round((fbaFee + referralFee) * 100) / 100;
    const netProfit = Math.round((price - totalAmazonFees - cost) * 100) / 100;
    const profitMargin = price > 0 ? Math.round((netProfit / price) * 1000) / 10 : 0;

    return {
        sellPrice: price,
        itemCost: cost,
        sizeTier,
        billedWeight: Math.round(billedWeight * 100) / 100,
        fbaFee: Math.round(fbaFee * 100) / 100,
        referralFee,
        totalAmazonFees,
        netProfit,
        profitMargin
    };
}

/**
 * Amazon Description HTML Sanitizer
 * Amazon strictly allows ONLY: <b>, <i>, <p>, <br>, <ul>, <li>, <ol>, <em>, <strong>
 * Strips all forbidden tags, inline styles, IDs, and attributes
 */
export function sanitizeAmazonDescriptionHtml(html = '') {
    if (!html) return '';
    let cleaned = html;

    // Replace newlines with <br> if no paragraph tags exist
    if (!cleaned.includes('<p>') && !cleaned.includes('<ul>')) {
        cleaned = cleaned.replace(/\n\n/g, '<p></p>').replace(/\n/g, '<br>');
    }

    // Strip forbidden tags like div, span, script, iframe, font, style, class
    cleaned = cleaned.replace(/<\/?(div|span|script|iframe|style|link|font|table|tr|td|th|tbody|thead|h1|h2|h3|h4|h5|h6|header|footer|section|article)[^>]*>/gi, '');

    // Strip attributes like class="...", style="...", id="..." from permitted tags
    cleaned = cleaned.replace(/<([a-z][a-z0-9]*)[^>]*?(\/?)>/gi, (match, tag, slash) => {
        const allowed = ['b', 'i', 'p', 'br', 'ul', 'ol', 'li', 'em', 'strong'];
        if (allowed.includes(tag.toLowerCase())) {
            return `<${tag.toLowerCase()}${slash ? ' /' : ''}>`;
        }
        return '';
    });

    return cleaned.trim();
}

