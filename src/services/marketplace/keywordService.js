// src/services/marketplace/keywordService.js - Opportunity Scoring & Autocomplete Processing

/**
 * Pure-math Logarithmic Opportunity Scoring Formula
 * Score = 0.40 * Demand + 0.30 * Competition + 0.20 * Price + 0.10 * Freshness
 */
export function scoreOpportunity({
    reviews = 150,
    sold = 320,
    listings = 1850,
    price = 45,
    currentYear = 2026,
    itemYear = 2026
} = {}) {
    const rev = Number(reviews || 0);
    const s = Number(sold || 0);
    const list = Math.max(1, Number(listings || 1));
    const pr = Number(price || 40);

    // Demand score (0–100): min(100, (reviews * 0.5 + sold * 2) / 10)
    const demandScore = Math.min(100, Math.max(5, ((rev * 0.5) + (s * 2)) / 10));

    // Competition score (0–100): Logarithmic scale (1 - log10(listings) / log10(1,000,000))
    const logListings = Math.log10(list);
    const logMax = Math.log10(1000000); // 1,000,000 ceiling
    const compScore = Math.min(100, Math.max(0, 100 * (1 - (logListings / logMax))));

    // Price sweet spot score (0–100): $20 - $100 = 100 points
    let priceScore = 50;
    if (pr >= 20 && pr <= 100) {
        priceScore = 100;
    } else if (pr < 20 && pr > 0) {
        priceScore = Math.round((pr / 20) * 80);
    } else if (pr > 100) {
        priceScore = Math.max(30, Math.round(100 - ((pr - 100) * 0.2)));
    }

    // Freshness score (0–100)
    const yearDiff = Math.max(0, currentYear - itemYear);
    const freshnessScore = Math.max(20, Math.round(100 - (yearDiff * 25)));

    // Composite Weighted Opportunity Score
    const opportunityScore = Math.round(
        (0.40 * demandScore) +
        (0.30 * compScore) +
        (0.20 * priceScore) +
        (0.10 * freshnessScore)
    );

    let classification = 'Medium Opportunity';
    let color = '#EAB308';
    if (opportunityScore >= 75) {
        classification = 'High Demand / Low Competition 🚀';
        color = '#10B981';
    } else if (opportunityScore < 50) {
        classification = 'High Competition / Low Margin ⚠️';
        color = '#EF4444';
    }

    return {
        opportunityScore,
        classification,
        color,
        breakdown: {
            demandScore: Math.round(demandScore),
            competitionScore: Math.round(compScore),
            priceScore: Math.round(priceScore),
            freshnessScore: Math.round(freshnessScore)
        },
        inputs: { reviews: rev, sold: s, listings: list, price: pr }
    };
}

/**
 * Filter & sort keywords by score, search query, or intent
 */
export function filterKeywords(keywordList, query = '', sortBy = 'score') {
    if (!Array.isArray(keywordList)) return [];

    let filtered = [...keywordList];

    if (query.trim()) {
        const q = query.toLowerCase().trim();
        filtered = filtered.filter(item => 
            (item.keyword || '').toLowerCase().includes(q) ||
            (item.tag || '').toLowerCase().includes(q)
        );
    }

    if (sortBy === 'score') {
        filtered.sort((a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0));
    } else if (sortBy === 'listings-asc') {
        filtered.sort((a, b) => (a.listings || 0) - (b.listings || 0));
    } else if (sortBy === 'demand-desc') {
        filtered.sort((a, b) => (b.sold || 0) - (a.sold || 0));
    }

    return filtered;
}
