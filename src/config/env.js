// src/config/env.js - Centralized Environment Configuration
const env = import.meta.env || {};

export const ENV = {
    // Backend API Base URL
    API_BASE_URL: env.VITE_BACKEND_URL || (typeof window !== 'undefined' && window.location.hostname.includes('vendorsdesk.in') 
        ? 'https://backend.vendorsdesk.in' 
        : ''),

    // App Domain (Seller SaaS)
    APP_URL: env.VITE_APP_URL || (typeof window !== 'undefined' && window.location.hostname.includes('vendorsdesk.in')
        ? 'https://app.vendorsdesk.in'
        : 'http://localhost:5173'),

    // Public Portal Domain
    PORTAL_URL: env.VITE_PORTAL_URL || 'https://vendorsdesk.in',

    // Google OAuth Client ID
    GOOGLE_CLIENT_ID: env.VITE_GOOGLE_CLIENT_ID || '148360176717-1dpf5u3v99ckjhu5gruud4f9u17uqoc2.apps.googleusercontent.com',

    // Razorpay Key
    RAZORPAY_KEY_ID: env.VITE_RAZORPAY_KEY_ID || '',

    // AES Payload Encryption Key
    ENCRYPTION_KEY: env.VITE_PAYLOAD_ENCRYPTION_KEY || 'vendorsdesk-secure-payload-key-2026',

    // Environment Flags
    IS_PROD: env.PROD ?? false,
    IS_DEV: env.DEV ?? true,
    MODE: env.MODE || 'development'
};

export default ENV;
