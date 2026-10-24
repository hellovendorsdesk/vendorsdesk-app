// src/services/marketplace/quickCommerceService.js - Quick Commerce (Blinkit, Zepto, Instamart) Margin Engine

export function calculateQuickCommerceMargin({
    mrp = 299,
    costPrice,
    landedCost = 120,
    commissionPct,
    platformMarginPercent = 22,
    handlingFeePerUnit,
    listingFeePerSku = 6,
    damageAllowancePct,
    wastageAllowancePercent = 3
} = {}) {
    const retail = Number(mrp) || 0;
    const cost = Number(costPrice ?? landedCost) || 0;
    const commPct = Number(commissionPct ?? platformMarginPercent) || 0;
    const handling = Number(handlingFeePerUnit ?? listingFeePerSku) || 0;
    const wastagePct = Number(damageAllowancePct ?? wastageAllowancePercent) || 0;

    // Platform Commission
    const platformCommission = Math.round(retail * (commPct / 100));
    // Wastage / Damage loss
    const damageLoss = Math.round(cost * (wastagePct / 100));
    // Total platform deductions
    const totalPlatformDeductions = platformCommission + handling;
    const netPayout = retail - totalPlatformDeductions;
    const totalSourcingCost = cost + damageLoss;

    const netProfit = netPayout - totalSourcingCost;
    const netMarginPct = retail > 0 ? Math.round((netProfit / retail) * 100) : 0;

    return {
        mrp: retail,
        costPrice: cost,
        landedCost: cost,
        commissionPct: commPct,
        handlingFeePerUnit: handling,
        damageAllowancePct: wastagePct,
        platformCommission,
        damageLoss,
        totalPlatformDeductions,
        netPayout,
        totalSourcingCost,
        netProfit,
        netMarginPct,
        profitMargin: netMarginPct,
        isProfitable: netProfit >= 0
    };
}
