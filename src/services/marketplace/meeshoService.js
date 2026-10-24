// src/services/marketplace/meeshoService.js - Meesho RTO Loss Shield & Profit Engine

export function calculateMeeshoRto({
    sellPrice = 450,
    productCost = 180,
    forwardShipping = 55,
    rtoReverseShipping = 65,
    customerReturnRate = 8,  // 8% customer returns
    rtoReturnRate = 18       // 18% courier RTO return rate
} = {}) {
    const price = Number(sellPrice);
    const cost = Number(productCost);
    const fwd = Number(forwardShipping);
    const rtoCharge = Number(rtoReverseShipping);
    const custRate = Number(customerReturnRate) / 100;
    const rtoRate = Number(rtoReturnRate) / 100;

    // Successful delivered orders proportion
    const deliveredRate = Math.max(0, 1 - custRate - rtoRate);

    // Meesho has 0% commission, but courier charges apply on returns
    // Customer return cost: forward shipping + return courier + packaging damage buffer (~Rs. 40)
    const customerReturnCost = fwd + 40;

    // RTO return cost: forward shipping + RTO reverse shipping loss
    const rtoLossCost = fwd + rtoCharge;

    // Blended cost per 100 orders
    const deliveredRevenue = deliveredRate * price;
    const deliveredProductCost = deliveredRate * cost;
    const rtoExpenses = rtoRate * rtoLossCost;
    const customerReturnExpenses = custRate * customerReturnCost;

    // Expected profit per dispatched unit
    const expectedProfitPerOrder = deliveredRevenue - (cost) - rtoExpenses - customerReturnExpenses;
    const profitMargin = price > 0 ? Math.round((expectedProfitPerOrder / price) * 1000) / 10 : 0;

    // Suggested safe price to maintain 20% margin
    const suggestedPrice = Math.round((cost + rtoExpenses + customerReturnExpenses) / (deliveredRate * 0.8));

    return {
        sellPrice: price,
        productCost: cost,
        deliveredRate: Math.round(deliveredRate * 100),
        rtoLossPerDispatchedUnit: Math.round(rtoExpenses * 100) / 100,
        customerReturnLossPerUnit: Math.round(customerReturnExpenses * 100) / 100,
        expectedProfitPerOrder: Math.round(expectedProfitPerOrder * 100) / 100,
        profitMargin,
        suggestedSafePrice: suggestedPrice,
        isProfitable: expectedProfitPerOrder > 0
    };
}

export function calculateMeeshoShippingRates({ weightGrams = 500, zone = 'National' } = {}) {
    const wt = Number(weightGrams);

    const base500g = {
        'Local': 39,
        'Regional': 49,
        'National': 65
    };

    const add500g = {
        'Local': 22,
        'Regional': 28,
        'National': 38
    };

    const slabs = Math.max(1, Math.ceil(wt / 500));
    const base = base500g[zone] || 65;
    const additional = (slabs - 1) * (add500g[zone] || 38);
    const totalShipping = base + additional;
    const gst = Math.round(totalShipping * 0.18 * 100) / 100;

    return {
        weightGrams: wt,
        zone,
        slabs,
        baseRate: base,
        additionalRate: additional,
        totalRateBeforeGst: totalShipping,
        gst,
        finalShippingWithGst: Math.round((totalShipping + gst) * 100) / 100
    };
}
