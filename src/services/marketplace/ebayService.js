// src/services/marketplace/ebayService.js - Pure eBay Domain Logic & Cassini Algorithms

export const EBAY_FILLERS = [
    'New', 'Fast Ship', 'Gift Idea', 'Top Quality', 'Daily Use', 'Luxury',
    'Heavy Duty', 'Premium', 'Authentic', 'Durable', 'Classic', 'Modern',
    'Best Price', 'USA Stock', 'Slim Fit', 'Genuine', 'Handmade'
];

export const EBAY_ANGLES = [
    {
        name: 'Search Intent (High Volume)',
        desc: 'Front-loads primary keywords for maximum eBay Cassini search index match.',
        patterns: (p, m, f, a) => [
            [p, m, 'Holder Organizer', 'Pocket Accessory'],
            [p, 'Original Design', m, 'Everyday Carry EDC'],
            ['Best', p, m, 'Travel Portable Case'],
            [p, 'Pro Edition', m, 'Organizer Storage Sleeve']
        ]
    },
    {
        name: 'Feature-Packed (Buyer Specs)',
        desc: 'Combines technical specifications, dimensions, and physical attributes.',
        patterns: (p, m, f, a) => [
            [p, m, f, 'Compact Slim Profile'],
            [m, p, 'Water Resistant', f, 'Multipurpose'],
            [p, f, 'Heavy Duty Reinforced', m],
            ['Durable', m, p, f, 'All Weather Pocket']
        ]
    },
    {
        name: 'Urgency & Value Proposition',
        desc: 'Triggers fast click-throughs for deal-seekers and budget-conscious buyers.',
        patterns: (p, m, f, a) => [
            [p, m, 'Special Promotion Hot Deal', f],
            ['Affordable Premium', p, m, 'Direct Value'],
            [p, 'Clearance Best Price Guaranteed', m],
            ['Top Seller Choice', p, m, 'Fast Shipping']
        ]
    },
    {
        name: 'Gift & Broad Discovery',
        desc: 'Targets seasonal shoppers, birthdays, holidays, and gift occasions.',
        patterns: (p, m, f, a) => [
            [p, 'Perfect Present For', a, m],
            ['Holiday Gift Idea', p, m, 'Gift Box Included'],
            [p, a, 'Luxury Keepsake Present', f],
            ['Unique Birthday Gift', p, m, 'Ready To Wrap']
        ]
    },
    {
        name: 'Cassini Balanced Master',
        desc: 'Optimal balance of core keyword, material, and high-frequency Cassini qualifiers.',
        patterns: (p, m, f, a) => [
            [p, m, f, a, 'Authentic Guaranteed'],
            [m, p, f, 'Official Edition Fast Ship'],
            ['Original', p, m, f, 'Brand New Condition'],
            [p, m, 'Slim Fit Lightweight', f, 'USA Stock']
        ]
    }
];

/**
 * Dynamic word packer enforcing strictly 75 to 80 characters
 */
export function packCassiniTitle(baseWords, targetMin = 75, targetMax = 80) {
    let cleanWords = baseWords
        .map(w => (w || '').trim())
        .filter(Boolean)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1));

    let current = cleanWords.join(' ');
    let words = current.split(/\s+/);

    while (words.join(' ').length > targetMax && words.length > 2) {
        words.pop();
    }
    current = words.join(' ');

    if (current.length >= targetMin && current.length <= targetMax) {
        return current;
    }

    for (const filler of EBAY_FILLERS) {
        const candidate = `${current} ${filler}`;
        if (candidate.length <= targetMax) {
            current = candidate;
            if (current.length >= targetMin) break;
        }
    }
    return current;
}

/**
 * Generates 20 unique titles across 5 distinct Cassini angles
 */
export function generateEbayTitles({ product = 'Leather Wallet', material = 'Full Grain Leather', feature = 'RFID Blocking Bifold', audience = 'Men Husband Gift' } = {}) {
    const p = (product || 'Product').trim();
    const m = (material || 'Quality Material').trim();
    const f = (feature || 'Multi-Feature').trim();
    const a = (audience || 'Gift').trim();

    const titles = [];

    EBAY_ANGLES.forEach((ang) => {
        const anglePatterns = ang.patterns(p, m, f, a);
        anglePatterns.forEach((pattern) => {
            const packed = packCassiniTitle(pattern, 75, 80);
            titles.push({
                id: titles.length + 1,
                angle: ang.name,
                desc: ang.desc,
                title: packed,
                charCount: packed.length,
                isValid: packed.length >= 75 && packed.length <= 80
            });
        });
    });

    return titles;
}

export const EBAY_CATEGORIES = [
    { name: "Clothing, Shoes & Accessories", feeNonStore: 13.25, feeStore: 12.35 },
    { name: "Consumer Electronics", feeNonStore: 12.35, feeStore: 9.35 },
    { name: "Home & Garden", feeNonStore: 13.25, feeStore: 12.35 },
    { name: "Jewelry & Watches", feeNonStore: 15.00, feeStore: 12.50 },
    { name: "Collectibles & Art", feeNonStore: 13.25, feeStore: 12.35 },
    { name: "Automotive Parts & Accessories", feeNonStore: 12.35, feeStore: 11.15 },
    { name: "Books, Movies & Music", feeNonStore: 14.95, feeStore: 14.55 },
    { name: "Sporting Goods", feeNonStore: 13.25, feeStore: 12.35 }
];

/**
 * Detailed eBay Fee Calculation supporting categories, store status, ads, international shipping
 */
export function calculateEbayFeesDetailed({
    categoryIndex = 0,
    categories = EBAY_CATEGORIES,
    sellingPrice = 49.99,
    shippingCharged = 5.00,
    itemCost = 15.00,
    actualShippingCost = 6.50,
    hasStore = false,
    promotedAdRate = 3.0,
    isInternational = false
} = {}) {
    const cat = categories[categoryIndex] || categories[0];
    const totalBuyerPaid = Number(sellingPrice) + Number(shippingCharged);

    // Final Value Fee rate
    const fvfRate = hasStore ? cat.feeStore : cat.feeNonStore;
    const fvfPercentageAmount = totalBuyerPaid * (fvfRate / 100);
    const fixedOrderFee = 0.30;
    const totalFvf = fvfPercentageAmount + fixedOrderFee;

    // Promoted listings standard fee
    const promotedAdFee = promotedAdRate > 0 ? (Number(sellingPrice) * (Number(promotedAdRate) / 100)) : 0;

    // International fee (1.65% if applicable)
    const intlFee = isInternational ? (totalBuyerPaid * 0.0165) : 0;

    // Total eBay Deductions
    const totalEbayFees = totalFvf + promotedAdFee + intlFee;

    // Seller Out of Pocket Costs
    const totalSellerCosts = Number(itemCost) + Number(actualShippingCost);

    // Net Profit & Margins
    const netPayout = totalBuyerPaid - totalEbayFees;
    const netProfit = netPayout - totalSellerCosts;
    const marginPercent = totalBuyerPaid > 0 ? Math.round((netProfit / totalBuyerPaid) * 100) : 0;
    const roiPercent = totalSellerCosts > 0 ? Math.round((netProfit / totalSellerCosts) * 100) : 0;

    return {
        cat,
        totalBuyerPaid,
        fvfRate,
        fvfPercentageAmount,
        fixedOrderFee,
        totalFvf,
        promotedAdFee,
        intlFee,
        totalEbayFees,
        totalSellerCosts,
        netPayout,
        netProfit,
        marginPercent,
        roiPercent
    };
}

/**
 * Calculates eBay 2026 Final Value Fees (FVF), Fixed Fees, and Net Margins
 */
export function calculateEbayFees({ sellPrice = 50, shippingCharge = 0, itemCost = 15, category = 'General Merchandise', promotedAdRate = 0 } = {}) {
    const grossRevenue = Number(sellPrice) + Number(shippingCharge);

    const fvfRates = {
        'General Merchandise': 0.1325,
        'Clothing & Shoes': 0.1235,
        'Electronics': 0.1290,
        'Jewelry & Watches': 0.1500,
        'Home & Garden': 0.1325
    };
    const rate = fvfRates[category] || 0.1325;
    const finalValueFee = Math.round(grossRevenue * rate * 100) / 100;
    const fixedFee = grossRevenue > 10 ? 0.40 : 0.30;
    const adFee = Math.round(grossRevenue * (Number(promotedAdRate) / 100) * 100) / 100;
    const totalEbayFees = Math.round((finalValueFee + fixedFee + adFee) * 100) / 100;
    const netProfit = Math.round((grossRevenue - totalEbayFees - Number(itemCost)) * 100) / 100;
    const profitMargin = grossRevenue > 0 ? Math.round((netProfit / grossRevenue) * 1000) / 10 : 0;

    return {
        grossRevenue,
        finalValueFee,
        fixedFee,
        adFee,
        totalEbayFees,
        itemCost: Number(itemCost),
        netProfit,
        profitMargin,
        effectiveFeeRate: grossRevenue > 0 ? Math.round((totalEbayFees / grossRevenue) * 1000) / 10 : 0
    };
}
