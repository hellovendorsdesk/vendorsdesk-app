// src/api/marketplaceApi.js - Scalable Marketplace API Layer
import apiClient from './client';
import * as ebayService from '../services/marketplace/ebayService';
import * as etsyService from '../services/marketplace/etsyService';
import * as keywordService from '../services/marketplace/keywordService';
import * as amazonService from '../services/marketplace/amazonService';

export const marketplaceApi = {
    /**
     * Generate 20 Cassini packed titles (75-80 chars)
     */
    async generateEbayTitles(payload) {
        try {
            const res = await apiClient.post('/api/marketplace/ebay/titles', payload);
            if (res && res.success && res.titles) {
                return res.titles;
            }
        } catch (e) {
            // Server offline or network error: fallback to client-side pure engine
        }
        return ebayService.generateEbayTitles(payload);
    },

    /**
     * Generate 13 Etsy tags (<= 20 chars) and 140-char title
     */
    async generateEtsyTags(payload) {
        try {
            const res = await apiClient.post('/api/marketplace/etsy/tags', payload);
            if (res && res.success && res.tags) {
                return res;
            }
        } catch (e) {
            // Fallback
        }
        return etsyService.generateEtsyTags(payload);
    },

    /**
     * Live autocomplete keyword scraper across Etsy, eBay, Google Shopping
     */
    async expandKeywords(seed, options = {}) {
        try {
            const res = await apiClient.post('/api/marketplace/keywords/expand', { seed, ...options });
            if (res && res.success && Array.isArray(res.keywords)) {
                return res.keywords;
            }
        } catch (e) {
            // Fallback
        }
        return [];
    },

    /**
     * Opportunity scoring with logarithmic formula
     */
    async scoreOpportunity(payload) {
        try {
            const res = await apiClient.post('/api/marketplace/keywords/opportunity-score', payload);
            if (res && res.success) {
                return res;
            }
        } catch (e) {
            // Fallback
        }
        return keywordService.scoreOpportunity(payload);
    },

    /**
     * eBay 2026 fee breakdown
     */
    async calculateEbayFees(payload) {
        try {
            const res = await apiClient.post('/api/marketplace/ebay/fees', payload);
            if (res && res.success) {
                return res;
            }
        } catch (e) {
            // Fallback
        }
        return ebayService.calculateEbayFees(payload);
    },

    /**
     * Etsy profit breakdown
     */
    async calculateEtsyProfit(payload) {
        try {
            const res = await apiClient.post('/api/marketplace/etsy/profit', payload);
            if (res && res.success) {
                return res;
            }
        } catch (e) {
            // Fallback
        }
        return etsyService.calculateEtsyProfit(payload);
    },

    /**
     * Amazon 249-byte search term cleaner
     */
    async cleanAmazonKeywords(keywords) {
        try {
            const res = await apiClient.post('/api/marketplace/amazon/clean-keywords', { keywords });
            if (res && res.success) {
                return res;
            }
        } catch (e) {
            // Fallback
        }
        return amazonService.cleanAmazonKeywords(keywords);
    }
};

export default marketplaceApi;
