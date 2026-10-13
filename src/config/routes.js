import { updatePageSEO } from '../utils/seoManager';

export const PAGE_ROUTES = {
    '/': 'home',
    '/home': 'home',
    '/templates': 'templates',
    '/listing-templates': 'templates',
    '/shipping-rates': 'optimizer',
    '/meesho-shipping-rates': 'optimizer',
    '/rate-optimizer': 'optimizer',
    '/optimizer': 'optimizer',
    '/background-remover': 'bg-remover',
    '/bg-remover': 'bg-remover',
    '/free-image-generator': 'free-image-generator',
    '/image-generator': 'free-image-generator',
    '/meesho-image-generator': 'free-image-generator',
    '/pnl-calculator': 'pnl-calculator',
    '/label-exporter': 'label-exporter',
    '/meesho-label-exporter': 'label-exporter',
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
    'templates': '/templates',
    'optimizer': '/rate-optimizer',
    'meesho-shipping-rates': '/rate-optimizer',
    'bg-remover': '/background-remover',
    'free-image-generator': '/free-image-generator',
    'pnl-calculator': '/pnl-calculator',
    'label-exporter': '/label-exporter',
    'meesho-label-exporter': '/label-exporter',
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
    return window.location.hostname === 'app.vendorsdesk.in' || window.location.hostname.startsWith('app.');
};
