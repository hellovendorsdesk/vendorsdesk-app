import { useState, useMemo } from 'react';

export function useMarginCalculator(initialValues = {}) {
    const [sellingPrice, setSellingPrice] = useState(initialValues.sellingPrice ?? 399);
    const [costPrice, setCostPrice] = useState(initialValues.costPrice ?? 150);
    const [gstSlab, setGstSlab] = useState(initialValues.gstSlab ?? 12);
    const [packagingCost, setPackagingCost] = useState(initialValues.packagingCost ?? 10);
    const [shippingCost, setShippingCost] = useState(initialValues.shippingCost ?? 60);
    const [referralFeePercent, setReferralFeePercent] = useState(initialValues.referralFeePercent ?? 0);
    const [returnRate, setReturnRate] = useState(initialValues.returnRate ?? 15);
    const [returnShippingCost, setReturnShippingCost] = useState(initialValues.returnShippingCost ?? 120);

    const calculations = useMemo(() => {
        const gstOnSales = Math.round(((sellingPrice * gstSlab) / (100 + gstSlab)) * 100) / 100;
        const gstOnCost = Math.round(((costPrice * gstSlab) / 100) * 100) / 100;
        const netGstLiability = Math.max(0, gstOnSales - gstOnCost);

        const referralFee = Math.round(((sellingPrice * referralFeePercent) / 100) * 100) / 100;

        const averageReturnLoss = Math.round(
            ((returnRate * (shippingCost + returnShippingCost + packagingCost)) / 100) * 100
        ) / 100;

        const totalDeductions = packagingCost + shippingCost + referralFee + netGstLiability + averageReturnLoss;
        const netProfit = Math.round((sellingPrice - costPrice - totalDeductions) * 100) / 100;
        const profitMargin = sellingPrice > 0 ? Math.round((netProfit / sellingPrice) * 10000) / 100 : 0;

        const taxFactor = 1 - (gstSlab / (100 + gstSlab));
        const breakEven = taxFactor > 0
            ? Math.round((costPrice + packagingCost + shippingCost + averageReturnLoss) / taxFactor)
            : 0;

        return {
            gstOnSales,
            gstOnCost,
            netGstLiability,
            referralFee,
            averageReturnLoss,
            totalDeductions,
            netProfit,
            profitMargin,
            breakEven
        };
    }, [
        sellingPrice,
        costPrice,
        gstSlab,
        packagingCost,
        shippingCost,
        referralFeePercent,
        returnRate,
        returnShippingCost
    ]);

    return {
        inputs: {
            sellingPrice,
            setSellingPrice,
            costPrice,
            setCostPrice,
            gstSlab,
            setGstSlab,
            packagingCost,
            setPackagingCost,
            shippingCost,
            setShippingCost,
            referralFeePercent,
            setReferralFeePercent,
            returnRate,
            setReturnRate,
            returnShippingCost,
            setReturnShippingCost
        },
        ...calculations
    };
}

export default useMarginCalculator;
