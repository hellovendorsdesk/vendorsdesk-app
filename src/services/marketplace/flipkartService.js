// src/services/marketplace/flipkartService.js - Flipkart Supplier Margin & Fee Calculations

export function calculateFlipkartProfit({
    sellPrice = 799,
    itemCost = 250,
    category = 'Clothing',
    shippingZone = 'National',
    weightGrams = 400
} = {}) {
    const price = Number(sellPrice);
    const cost = Number(itemCost);

    // Commission Rates (approximate standard rates)
    const commissionRates = {
        'Clothing': 0.12,
        'Footwear': 0.11,
        'Electronics': 0.08,
        'Home': 0.13
    };
    const rate = commissionRates[category] || 0.12;
    const commission = Math.round(price * rate * 100) / 100;

    // Fixed Fee based on price slab
    let fixedFee = 15;
    if (price <= 300) fixedFee = 7;
    else if (price <= 500) fixedFee = 12;
    else if (price <= 1000) fixedFee = 16;
    else fixedFee = 32;

    // Collection Fee (2% for prepaid or payment gateway)
    const collectionFee = Math.round(price * 0.02 * 100) / 100;

    // Shipping Fee (Standard slab for 500g)
    const shippingRates = {
        'Local': 44,
        'Zonal': 56,
        'National': 72
    };
    const shippingFee = shippingRates[shippingZone] || 72;

    const totalFeesBeforeTax = commission + fixedFee + collectionFee + shippingFee;
    const gstOnFees = Math.round(totalFeesBeforeTax * 0.18 * 100) / 100; // 18% GST on marketplace fees
    const totalFlipkartDeductions = Math.round((totalFeesBeforeTax + gstOnFees) * 100) / 100;

    const netBankPayout = Math.round((price - totalFlipkartDeductions) * 100) / 100;
    const netProfit = Math.round((netBankPayout - cost) * 100) / 100;
    const profitMargin = price > 0 ? Math.round((netProfit / price) * 1000) / 10 : 0;

    return {
        sellPrice: price,
        itemCost: cost,
        commission,
        fixedFee,
        collectionFee,
        shippingFee,
        gstOnFees,
        totalFlipkartDeductions,
        netBankPayout,
        netProfit,
        profitMargin
    };
}
