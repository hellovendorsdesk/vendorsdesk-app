export const PRESET_COLORS = [
    'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Navy', 'Grey', 'Maroon'
];

export const PRESET_SIZES = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Free Size'
];

export const PLATFORMS = [
    { id: 'all', label: 'All Marketplaces', icon: '🌐' },
    { id: 'meesho', label: 'Meesho', icon: '🛍️' },
    { id: 'amazon', label: 'Amazon India', icon: '📦' },
    { id: 'flipkart', label: 'Flipkart', icon: '⚡' },
    { id: 'glowroad', label: 'GlowRoad', icon: '🏷️' },
    { id: 'shopee', label: 'Shopee', icon: '🛒' }
];

export const INITIAL_TEMPLATE_FORM = {
    platform: 'all',
    title: '',
    category: '',
    brand: '',
    description: '',
    sellingPrice: '',
    mrp: '',
    sku: '',
    hsnCode: '',
    gstPercentage: '5',
    weightGrams: '300',
    packageLength: '20',
    packageWidth: '15',
    packageHeight: '4',
    colors: [],
    sizes: [],
    keywords: '',
    features: ''
};
