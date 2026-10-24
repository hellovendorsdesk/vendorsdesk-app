import { updatePageSEO } from '../utils/seoManager';

export const PAGE_ROUTES = {
    '/': 'home',
    '/home': 'home',

    // ── AMAZON SUITE ──────────────────────────────────────────────
    '/amazon': 'amazon-hub',
    '/amazon/': 'amazon-hub',
    '/amazon/fba-calculator': 'amazon-fba-calculator',
    '/amazon/fba-profit-calculator': 'amazon-fba-calculator',
    '/amazon/keyword-cleaner': 'amazon-keyword-cleaner',
    '/amazon/search-terms': 'amazon-keyword-cleaner',
    '/amazon/description-editor': 'amazon-description-editor',
    '/amazon/html-converter': 'amazon-description-editor',

    // ── FLIPKART SUITE ────────────────────────────────────────────
    '/flipkart': 'flipkart-hub',
    '/flipkart/': 'flipkart-hub',
    '/flipkart/profit-calculator': 'flipkart-profit-calculator',
    '/flipkart/commission-calculator': 'flipkart-profit-calculator',
    '/flipkart/fee-calculator': 'flipkart-profit-calculator',

    // ── MEESHO SUITE ──────────────────────────────────────────────
    '/meesho': 'meesho-hub',
    '/meesho/': 'meesho-hub',
    '/meesho/shipping-rates': 'meesho-shipping-rates',
    '/meesho/rate-optimizer': 'meesho-shipping-rates',
    '/meesho/rto-calculator': 'meesho-rto-calculator',
    '/meesho/rto-return-loss-calculator': 'meesho-rto-calculator',
    '/meesho/label-exporter': 'meesho-label-exporter',
    '/meesho/image-generator': 'free-image-generator',
    '/meesho/pnl-calculator': 'pnl-calculator',

    // ── QUICK COMMERCE SUITE ──────────────────────────────────────
    '/quick-commerce': 'quick-commerce-margin',
    '/quick-commerce/': 'quick-commerce-margin',
    '/quick-commerce/blinkit-margin-calculator': 'quick-commerce-margin',
    '/quick-commerce/zepto-instamart-pnl': 'quick-commerce-margin',

    // ── EBAY SUITE ────────────────────────────────────────────────
    '/ebay': 'ebay-hub',
    '/ebay/': 'ebay-hub',
    '/ebay/title-generator': 'ebay-title-generator',
    '/ebay/title-studio': 'ebay-title-generator',
    '/ebay/keyword-tool': 'ebay-keyword-tool',
    '/ebay/keyword-research': 'ebay-keyword-tool',
    '/ebay/fee-calculator': 'ebay-fee-calculator',
    '/ebay/profit-calculator': 'ebay-fee-calculator',

    // ── ETSY SUITE ────────────────────────────────────────────────
    '/etsy': 'etsy-hub',
    '/etsy/': 'etsy-hub',
    '/etsy/tag-generator': 'etsy-tag-generator',
    '/etsy/tag-studio': 'etsy-tag-generator',
    '/etsy/keyword-tool': 'etsy-keyword-tool',
    '/etsy/keyword-research': 'etsy-keyword-tool',
    '/etsy/profit-calculator': 'etsy-profit-calculator',
    '/etsy/fee-calculator': 'etsy-profit-calculator',

    // ── LEGACY & STANDALONE TOOLS ─────────────────────────────────
    '/templates': 'templates',
    '/listing-templates': 'templates',
    '/shipping-rates': 'meesho-shipping-rates',
    '/meesho-shipping-rates': 'meesho-shipping-rates',
    '/rate-optimizer': 'meesho-shipping-rates',
    '/optimizer': 'meesho-shipping-rates',
    '/background-remover': 'bg-remover',
    '/bg-remover': 'bg-remover',
    '/free-image-generator': 'free-image-generator',
    '/image-generator': 'free-image-generator',
    '/meesho-image-generator': 'free-image-generator',
    '/pnl-calculator': 'pnl-calculator',
    '/label-exporter': 'meesho-label-exporter',
    '/meesho-label-exporter': 'meesho-label-exporter',
    '/margin-calculator': 'calculator',
    '/calculator': 'calculator',
    '/pricing': 'billing',
    '/billing': 'billing',
    '/affiliate': 'affiliate',
    '/privacy-policy': 'privacy-policy',
    '/refund-policy': 'refund-policy',
    '/terms-of-service': 'terms-of-service',
    '/contact': 'contact-us',
    '/contact-us': 'contact-us',
    '/support': 'contact-us'
};

export const PAGE_PATHS = {
    'home': '/',
    'amazon-hub': '/amazon',
    'amazon-fba-calculator': '/amazon/fba-calculator',
    'amazon-keyword-cleaner': '/amazon/keyword-cleaner',
    'amazon-description-editor': '/amazon/description-editor',
    'flipkart-hub': '/flipkart',
    'flipkart-profit-calculator': '/flipkart/profit-calculator',
    'meesho-hub': '/meesho',
    'meesho-shipping-rates': '/meesho/shipping-rates',
    'meesho-rto-calculator': '/meesho/rto-calculator',
    'meesho-label-exporter': '/meesho/label-exporter',
    'quick-commerce-margin': '/quick-commerce',
    'ebay-hub': '/ebay',
    'ebay-title-generator': '/ebay/title-generator',
    'ebay-keyword-tool': '/ebay/keyword-tool',
    'ebay-fee-calculator': '/ebay/fee-calculator',
    'etsy-hub': '/etsy',
    'etsy-tag-generator': '/etsy/tag-generator',
    'etsy-keyword-tool': '/etsy/keyword-tool',
    'etsy-profit-calculator': '/etsy/profit-calculator',
    'templates': '/templates',
    'bg-remover': '/background-remover',
    'free-image-generator': '/free-image-generator',
    'pnl-calculator': '/pnl-calculator',
    'label-exporter': '/meesho/label-exporter',
    'calculator': '/margin-calculator',
    'billing': '/pricing',
    'pricing': '/pricing',
    'affiliate': '/affiliate',
    'privacy-policy': '/privacy-policy',
    'refund-policy': '/refund-policy',
    'terms-of-service': '/terms-of-service',
    'contact-us': '/contact-us'
};

export const checkIsAppDomain = () => {
    const host = window.location.hostname.toLowerCase();
    const port = window.location.port;
    return (
        host === 'app.venderdesk.in' ||
        host === 'app.vendorsdesk.in' ||
        host.startsWith('app.') ||
        port === '5173'
    );
};

export const getAppBaseUrl = () => {
    const host = window.location.hostname.toLowerCase();
    if (host.includes('venderdesk.in')) {
        return 'https://app.venderdesk.in';
    }
    if (host.includes('vendorsdesk.in')) {
        return 'https://app.vendorsdesk.in';
    }
    return 'http://localhost:5173';
};

export const getWebsiteBaseUrl = () => {
    const host = window.location.hostname.toLowerCase();
    if (host.includes('venderdesk.in')) {
        return 'https://venderdesk.in';
    }
    if (host.includes('vendorsdesk.in')) {
        return 'https://vendorsdesk.in';
    }
    return 'http://localhost:5175';
};
