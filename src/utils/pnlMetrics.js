export const STATUS_KEYS = ['Delivered', 'Exchange', 'Shipped', 'Cancelled', 'RTO', 'Recovery&Claim', 'Return'];

export const STATUS_COLORS = {
    'Delivered': '#10b981',
    'Exchange': '#3b82f6',
    'Shipped': '#8b5cf6',
    'Cancelled': '#64748b',
    'RTO': '#f59e0b',
    'Recovery&Claim': '#06b6d4',
    'Return': '#ef4444'
};

export function getSkuMetrics(skuName, statusMatrix, skuPrices = {}) {
    const costPerUnit = parseFloat(skuPrices[skuName]) || 0;
    let totalSettlement = 0;
    let deliveredQty = 0;
    let exchangeQty = 0;
    let shippedQty = 0;

    STATUS_KEYS.forEach(k => {
        const [qty, amt] = (statusMatrix && statusMatrix[k]) ? statusMatrix[k] : [0, 0];
        totalSettlement += amt;
        if (k === 'Delivered') deliveredQty += qty;
        if (k === 'Exchange') exchangeQty += qty;
        if (k === 'Shipped') shippedQty += qty;
    });

    const totalCogsQty = deliveredQty + exchangeQty + shippedQty;
    const totalPurchaseCost = totalCogsQty * costPerUnit;
    const netProfit = totalSettlement - totalPurchaseCost;

    return {
        totalSettlement: Math.round(totalSettlement),
        totalCogsQty,
        totalPurchaseCost: Math.round(totalPurchaseCost),
        netProfit: Math.round(netProfit)
    };
}

export function calculateOverallKPIs(dashboardData, skuPrices = {}) {
    if (!dashboardData || !dashboardData.data) {
        return { overallSettlement: 0, grossSkuProfit: 0, adsSpend: 0, finalNetProfit: 0 };
    }

    let overallSettlement = 0;
    let grossSkuProfit = 0;

    Object.keys(dashboardData.data).forEach(sku => {
        const metrics = getSkuMetrics(sku, dashboardData.data[sku], skuPrices);
        overallSettlement += metrics.totalSettlement;
        grossSkuProfit += metrics.netProfit;
    });

    const adsSpend = dashboardData.ads_spend || 0;
    const finalNetProfit = grossSkuProfit - adsSpend;

    return {
        overallSettlement: Math.round(overallSettlement),
        grossSkuProfit: Math.round(grossSkuProfit),
        adsSpend: Math.round(adsSpend),
        finalNetProfit: Math.round(finalNetProfit)
    };
}

export function exportCsvReport(dashboardData, skuPrices = {}) {
    if (!dashboardData || !dashboardData.data) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "SKU Name,Purchase Price (INR),Delivered Qty,Exchange Qty,Shipped Qty,Cancelled Qty,RTO Qty,Recovery&Claim Qty,Return Qty,Total Settlement (INR),Total COGS (INR),Net SKU Profit (INR)\n";

    Object.keys(dashboardData.data).forEach(sku => {
        const matrix = dashboardData.data[sku];
        const price = skuPrices[sku] || 0;
        const m = getSkuMetrics(sku, matrix, skuPrices);

        const row = [
            `"${sku}"`,
            price,
            matrix['Delivered'][0],
            matrix['Exchange'][0],
            matrix['Shipped'][0],
            matrix['Cancelled'][0],
            matrix['RTO'][0],
            matrix['Recovery&Claim'][0],
            matrix['Return'][0],
            m.totalSettlement,
            m.totalPurchaseCost,
            m.netProfit
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vendorsdesk_pnl_analytics_report.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}
