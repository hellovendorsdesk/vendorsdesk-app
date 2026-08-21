/**
 * SEO Manager Utility for VendorsDesk
 * Automatically manages dynamic page title, meta tags, canonical URLs,
 * OpenGraph tags, and Schema.org JSON-LD structured data for rank #1 Google SEO indexing.
 */

const SEO_DATA = {
    'home': {
        title: "Meesho Shipping Rate Calculator 2026 | Check Slabs & Charges | VendorsDesk",
        description: "Calculate exact Meesho shipping rates, weight slabs (₹48, ₹56, ₹62), RTO penalties, and net seller payout margins in under 10 seconds. India's #1 Meesho Supplier Growth Suite.",
        keywords: "Meesho shipping rate calculator, Meesho weight slabs 2026, Meesho freight charges, Meesho seller fee calculator, Meesho net payout calculator",
        canonical: "https://vendorsdesk.in/",
        ogType: "website",
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "VendorsDesk Meesho Growth Suite",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
            },
            "description": "All-in-one suite for Meesho suppliers: shipping rate optimizer, bulk background remover, catalog image generator, and thermal label exporter."
        }
    },
    'bg-remover': {
        title: "Free AI Meesho Background Remover & Live Studio | 19 PNG Badges | VendorsDesk",
        description: "Remove product image backgrounds in 1 click. Change live studio backdrops (Beach, Living Room, Palace) and overlay 19 real PNG badges (Best Seller, 100% Original, Free Shipping). Export ZIP.",
        keywords: "Meesho background remover online free, Meesho studio backdrop generator, Meesho image background removal, product photo editor Meesho, PNG badge maker",
        canonical: "https://vendorsdesk.in/background-remover",
        ogType: "article",
        schema: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "VendorsDesk AI Background Remover & Studio",
            "applicationCategory": "MultimediaApplication",
            "description": "Isolate subjects, replace studio backgrounds, and apply graphic stamps for Meesho catalog listings."
        }
    },
    'free-image-generator': {
        title: "Free Meesho Catalog Image Generator | Pink Border & 19 Badges | VendorsDesk",
        description: "Bypass Meesho duplicate listing filters using pink/blue borders, vertical spacers, and 19 graphic PNG badges. 100% free unlimited catalog variation generator with 1-click ZIP export.",
        keywords: "Meesho catalog image generator, Meesho pink border image maker, Meesho duplicate image bypass tool, Meesho listing variation generator",
        canonical: "https://vendorsdesk.in/free-image-generator",
        ogType: "article",
        schema: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "VendorsDesk Free Catalog Image Generator",
            "applicationCategory": "DesignApplication",
            "description": "Generate unique catalog image variations with borders and badges to avoid Meesho duplicate listing blocks."
        }
    },
    'optimizer': {
        title: "Meesho Image & Rate Optimizer | ₹48, ₹56, ₹62 Slab Check | VendorsDesk",
        description: "Audit product photo dimensions and live Meesho shipping matrices to qualify for lower shipping rate slabs (₹48, ₹56, ₹62) and maximize profit per unit.",
        keywords: "Meesho rate optimizer, Meesho shipping slab check, Meesho listing image variation optimizer, Meesho logistics fee reduction",
        canonical: "https://vendorsdesk.in/rate-optimizer",
        ogType: "article",
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "VendorsDesk Shipping Rate Optimizer",
            "applicationCategory": "FinanceApplication",
            "description": "Optimizes image variations against Meesho logistics matrices to qualify for minimal shipping slabs."
        }
    },
    'pnl-calculator': {
        title: "Meesho Excel P&L Settlement Auditor | Bank Payout Reconciliation | VendorsDesk",
        description: "Upload Meesho Excel payment settlement sheets to calculate real net profit after forward shipping, customer returns, RTO penalties, and TCS/TDS deductions.",
        keywords: "Meesho PnL calculator excel, Meesho bank payout settlement auditor, Meesho net profit calculator, Meesho order reconciliation",
        canonical: "https://vendorsdesk.in/pnl-calculator",
        ogType: "article",
        schema: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "VendorsDesk Excel P&L Auditor",
            "applicationCategory": "FinanceApplication",
            "description": "Audits Meesho Excel settlement sheets to calculate exact bank payouts and net profit margins."
        }
    },
    'label-exporter': {
        title: "Meesho Bulk Shipping Label Cropper (4x6 PDF) | Auto SKU Sorter | VendorsDesk",
        description: "Crop multi-page Meesho shipping label PDF files into 4x6 thermal printer format. Auto-sort shipping labels by SKU and courier partner for 10x faster packing.",
        keywords: "Meesho PDF label cropper 4x6, Meesho bulk shipping label crop online, Meesho label exporter SKU sorter, thermal label cropper Meesho",
        canonical: "https://vendorsdesk.in/label-exporter",
        ogType: "article",
        schema: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "VendorsDesk Shipping Label Exporter",
            "applicationCategory": "UtilitiesApplication",
            "description": "Crops thermal shipping labels from Meesho PDF manifest files and sorts orders by SKU."
        }
    },
    'calculator': {
        title: "Meesho Net Payout & Profit Margin Calculator 2026 | VendorsDesk",
        description: "Calculate exact Meesho selling price, commission fees, GST TCS/TDS deductions, logistics freight, and net bank payout before listing your products.",
        keywords: "Meesho profit margin calculator, Meesho net payout calculation, Meesho seller commission calculator, Meesho price calculator 2026",
        canonical: "https://vendorsdesk.in/margin-calculator",
        ogType: "article",
        schema: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "VendorsDesk Meesho Margin Calculator",
            "applicationCategory": "FinanceApplication",
            "description": "Calculates seller profit margins and net payouts for Meesho products."
        }
    },
    'billing': {
        title: "VendorsDesk Supplier Growth Plans & Credit Tiers | VendorsDesk",
        description: "Upgrade your VendorsDesk account for query credits to run high-volume catalog image optimizations and rate audits.",
        keywords: "VendorsDesk pricing, Meesho seller growth tools plans, VendorsDesk credits",
        canonical: "https://vendorsdesk.in/pricing",
        ogType: "website"
    },
    'affiliate': {
        title: "VendorsDesk E-Commerce Supplier Affiliate Program | Earn Commissions",
        description: "Join the VendorsDesk Affiliate Program. Share your referral link with Meesho, Flipkart, and Amazon suppliers to earn recurring commissions on every plan upgrade.",
        keywords: "VendorsDesk affiliate program, e-commerce referral rewards, Meesho seller affiliate",
        canonical: "https://vendorsdesk.in/affiliate",
        ogType: "website"
    }
};

export function updatePageSEO(pageKey) {
    const seo = SEO_DATA[pageKey] || SEO_DATA['home'];

    // 1. Update Document Title
    document.title = seo.title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = seo.description;

    // 3. Update Meta Keywords
    let metaKw = document.querySelector("meta[name='keywords']");
    if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.name = 'keywords';
        document.head.appendChild(metaKw);
    }
    metaKw.content = seo.keywords || 'Meesho, supplier, growth, shipping calculator, background remover';

    // 4. Update Canonical Link
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical;

    // 5. Update OpenGraph Tags (og:title, og:description, og:url, og:type)
    updateMetaProperty('og:title', seo.title);
    updateMetaProperty('og:description', seo.description);
    updateMetaProperty('og:url', seo.canonical);
    updateMetaProperty('og:type', seo.ogType || 'website');
    updateMetaProperty('og:site_name', 'VendorsDesk');
    updateMetaProperty('og:image', 'https://vendorsdesk.in/logo-icon.png');

    // 6. Update Schema.org JSON-LD Structured Data Script
    let schemaScript = document.getElementById('jsonld-schema');
    if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'jsonld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
    }
    if (seo.schema) {
        schemaScript.text = JSON.stringify(seo.schema);
    }
}

function updateMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property='${property}']`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
    }
    meta.content = content;
}
