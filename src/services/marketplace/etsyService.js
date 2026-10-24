// src/services/marketplace/etsyService.js - Pure Etsy Domain Logic & 13-Tag Algorithms

/**
 * Clean string for Etsy tag compliance (alphanumeric, spaces only, max 20 chars)
 */
export function cleanEtsyTag(text) {
    if (!text) return '';
    const cleaned = text
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    if (cleaned.length <= 20) return cleaned;
    const words = cleaned.split(' ');
    let res = '';
    for (const w of words) {
        if ((res + ' ' + w).trim().length <= 20) {
            res = (res + ' ' + w).trim();
        } else {
            break;
        }
    }
    return res || cleaned.slice(0, 20).trim();
}

/**
 * Generates exactly 13 unique tags (each <= 20 chars) + 140-char title
 */
export function generateEtsyTags({
    product = 'Leather Wallet',
    material = 'Full Grain Leather',
    occasion = '3rd Anniversary',
    recipient = 'Gift For Him',
    style = 'Minimalist Bifold'
} = {}) {
    const p = (product || 'Handmade Item').trim();
    const m = (material || 'Artisan Made').trim();
    const o = (occasion || 'Anniversary').trim();
    const r = (recipient || 'Gift For Him').trim();
    const s = (style || 'Minimalist').trim();

    const candidates = [
        // Primary Product Phrases
        p,
        `${s} ${p}`,
        `Custom ${p}`,
        `Personalized ${p}`,
        // Material Phrases
        `${m} ${p}`,
        m,
        `Handcrafted ${p}`,
        // Recipient / Occasion
        `Gift ${r}`,
        `${o} Gift`,
        `${p} ${r}`,
        `Best Gift ${r}`,
        // Style / Aesthetic
        s,
        `${s} Aesthetic`,
        `${m} Gift`,
        `Artisan ${p}`,
        `Unique ${p}`
    ];

    const tagSet = new Set();
    for (const raw of candidates) {
        const cleaned = cleanEtsyTag(raw);
        if (cleaned && cleaned.length >= 3 && cleaned.length <= 20 && !tagSet.has(cleaned.toLowerCase())) {
            tagSet.add(cleaned.toLowerCase());
            if (tagSet.size === 13) break;
        }
    }

    // Fallbacks if under 13
    const fallbacks = [
        'Shop Small Finds', 'Artisan Made', 'Cozy Aesthetic', 'Boutique Item',
        'Trending Gift', 'Keepsake Treasure', 'Everyday Classic', 'Heirloom Quality'
    ];
    for (const fb of fallbacks) {
        if (tagSet.size >= 13) break;
        const cleaned = cleanEtsyTag(fb);
        if (cleaned && !tagSet.has(cleaned.toLowerCase())) {
            tagSet.add(cleaned.toLowerCase());
        }
    }

    const tags = Array.from(tagSet).slice(0, 13).map((t, idx) => {
        const formatted = t.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return {
            id: idx + 1,
            tag: formatted,
            charCount: formatted.length,
            isValid: formatted.length <= 20
        };
    });

    // 140-char title generator
    const titleCandidates = [
        `Personalized ${p}`,
        `${m} ${s}`,
        `${o} Gift ${r}`,
        `Custom Handcrafted Keepsake`
    ];
    let etsyTitle = titleCandidates.join(' | ');
    if (etsyTitle.length > 140) {
        etsyTitle = etsyTitle.slice(0, 140);
        const lastPipe = etsyTitle.lastIndexOf(' | ');
        if (lastPipe > 60) {
            etsyTitle = etsyTitle.slice(0, lastPipe);
        }
    }

    return {
        tags,
        totalCount: tags.length,
        etsyTitle,
        titleLength: etsyTitle.length
    };
}

/**
 * Detailed 2026 Etsy Profit, Renewals, Processing & Offsite Ads Calculation
 */
export function calculateEtsyProfitDetailed({
    sellingPrice = 38.00,
    shippingCharged = 4.50,
    itemCost = 9.00,
    packagingPostage = 4.00,
    offsiteAdsEnabled = false,
    salesTier = 'under10k',
    renewalCount = 1
} = {}) {
    const totalBuyerPaid = Number(sellingPrice) + Number(shippingCharged);

    // 1. Etsy Listing Fee: $0.20 per 4-month renewal
    const listingFee = Number(renewalCount) * 0.20;

    // 2. Etsy Transaction Fee: 6.5% on total price (item + shipping)
    const transactionFee = totalBuyerPaid * 0.065;

    // 3. Payment Processing Fee: 3.0% + $0.25 (US rate)
    const paymentProcessingFee = (totalBuyerPaid * 0.03) + 0.25;

    // 4. Regulatory Operating Fee: ~0.35%
    const regulatoryFee = totalBuyerPaid * 0.0035;

    // 5. Offsite Ads Fee (if sale comes from Etsy Google/Bing ads)
    const offsiteAdRate = salesTier === 'under10k' ? 0.15 : 0.12;
    const offsiteAdFee = offsiteAdsEnabled ? (totalBuyerPaid * offsiteAdRate) : 0;

    // Total Etsy Deductions
    const totalEtsyFees = listingFee + transactionFee + paymentProcessingFee + regulatoryFee + offsiteAdFee;

    // Seller Production & Sourcing Costs
    const totalSellerCosts = Number(itemCost) + Number(packagingPostage);

    // Net Bank Payout & Profit
    const netPayout = totalBuyerPaid - totalEtsyFees;
    const netProfit = netPayout - totalSellerCosts;
    const marginPercent = totalBuyerPaid > 0 ? Math.round((netProfit / totalBuyerPaid) * 100) : 0;
    const roiPercent = totalSellerCosts > 0 ? Math.round((netProfit / totalSellerCosts) * 100) : 0;

    return {
        totalBuyerPaid,
        listingFee,
        transactionFee,
        paymentProcessingFee,
        regulatoryFee,
        offsiteAdFee,
        totalEtsyFees,
        totalSellerCosts,
        netPayout,
        netProfit,
        marginPercent,
        roiPercent
    };
}

/**
 * Calculates Etsy Seller Profit, Listing Fees, 6.5% Transaction, and Processing Fees
 */
export function calculateEtsyProfit({
    listingPrice = 35,
    shippingPrice = 0,
    costOfItem = 10,
    shippingCost = 0,
    offsiteAds = 0
} = {}) {
    const totalRevenue = Number(listingPrice) + Number(shippingPrice);
    const listingFee = 0.20;
    const transactionFee = Math.round(totalRevenue * 0.065 * 100) / 100; // 6.5%
    const paymentProcessingFee = Math.round(((totalRevenue * 0.03) + 0.25) * 100) / 100; // 3% + $0.25
    const offsiteAdsFee = Math.round(totalRevenue * (Number(offsiteAds) / 100) * 100) / 100;

    const totalEtsyFees = Math.round((listingFee + transactionFee + paymentProcessingFee + offsiteAdsFee) * 100) / 100;
    const totalCost = Number(costOfItem) + Number(shippingCost);
    const netProfit = Math.round((totalRevenue - totalEtsyFees - totalCost) * 100) / 100;
    const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 1000) / 10 : 0;

    return {
        totalRevenue,
        listingFee,
        transactionFee,
        paymentProcessingFee,
        offsiteAdsFee,
        totalEtsyFees,
        totalCost,
        netProfit,
        profitMargin,
        effectiveFeeRate: totalRevenue > 0 ? Math.round((totalEtsyFees / totalRevenue) * 1000) / 10 : 0
    };
}
