import { updatePageSEO } from '../utils/seoManager';

export const PAGE_ROUTES = {
    '/': 'home',
    '/home': 'home',
    '/shipping-rates': 'meesho-shipping-rates',
    '/meesho-shipping-rates': 'meesho-shipping-rates',
    '/background-remover': 'bg-remover',
    '/bg-remover': 'bg-remover',
    '/free-image-generator': 'free-image-generator',
    '/image-generator': 'free-image-generator',
    '/rate-optimizer': 'optimizer',
    '/optimizer': 'optimizer',
    '/pnl-calculator': 'pnl-calculator',
    '/label-exporter': 'label-exporter',
    '/meesho-label-exporter': 'label-exporter',
    '/margin-calculator': 'calculator',
    '/calculator': 'calculator',
    '/pricing': 'pricing',
    '/billing': 'pricing',
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
    'meesho-shipping-rates': '/',
    'bg-remover': '/background-remover',
    'free-image-generator': '/free-image-generator',
    'optimizer': '/rate-optimizer',
    'pnl-calculator': '/pnl-calculator',
    'label-exporter': '/label-exporter',
    'calculator': '/margin-calculator',
    'pricing': '/pricing',
    'billing': '/pricing',
    'affiliate': '/affiliate',
    'privacy-policy': '/privacy-policy',
    'refund-policy': '/refund-policy',
    'terms-of-service': '/terms-of-service',
    'contact-us': '/contact-us'
};

export const checkIsAppDomain = () => {
    return window.location.hostname === 'app.vendorsdesk.in' || window.location.hostname.startsWith('app.');
};
