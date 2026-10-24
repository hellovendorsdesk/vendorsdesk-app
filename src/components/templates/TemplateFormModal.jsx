// src/components/templates/TemplateFormModal.jsx - Create / Edit Listing Template Modal
import React, { useState } from 'react';
import { PRESET_COLORS, PRESET_SIZES } from '../../constants/templatePresets';

export default function TemplateFormModal({
    isOpen,
    onClose,
    editingTemplate,
    formData,
    setFormData,
    onSave,
    isSaving,
    formError,
    formSuccess
}) {
    const [customColorInput, setCustomColorInput] = useState('');

    if (!isOpen) return null;

    const inputStyle = {
        width: '100%',
        boxSizing: 'border-box',
        padding: '0.65rem',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        fontSize: '0.9rem',
        outline: 'none',
        color: '#0f172a',
        background: '#ffffff'
    };

    const toggleColor = (color) => {
        setFormData(prev => ({
            ...prev,
            colors: prev.colors.includes(color)
                ? prev.colors.filter(c => c !== color)
                : [...prev.colors, color]
        }));
    };

    const addCustomColor = () => {
        const c = customColorInput.trim();
        if (c && !formData.colors.includes(c)) {
            setFormData(prev => ({ ...prev, colors: [...prev.colors, c] }));
            setCustomColorInput('');
        }
    };

    const toggleSize = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem',
            boxSizing: 'border-box'
        }}>
            <div style={{
                background: '#ffffff',
                color: '#0f172a',
                width: '100%',
                maxWidth: '680px',
                maxHeight: '92vh',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Modal Header */}
                <div style={{
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#f8fafc',
                    gap: '0.75rem'
                }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {editingTemplate ? 'Edit Listing Template' : 'Create Listing Template'}
                        </h2>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0 0' }}>
                            Configure repeatable specs for 1-click marketplace autofill.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            color: '#64748b',
                            flexShrink: 0
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={onSave} style={{ padding: '1.25rem 1rem', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '1.15rem', color: '#0f172a' }}>
                    {formError && (
                        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                            {formError}
                        </div>
                    )}
                    {formSuccess && (
                        <div style={{ background: '#ecfdf5', color: '#047857', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                            {formSuccess}
                        </div>
                    )}

                    {/* Platform selector */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                            Target Marketplace
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {[
                                { id: 'all', label: 'All Platforms' },
                                { id: 'meesho', label: 'Meesho' },
                                { id: 'flipkart', label: 'Flipkart' },
                                { id: 'amazon', label: 'Amazon' }
                            ].map(p => (
                                <button
                                    type="button"
                                    key={p.id}
                                    onClick={() => setFormData(prev => ({ ...prev, platform: p.id }))}
                                    style={{
                                        flex: '1 1 calc(50% - 0.5rem)',
                                        minWidth: '100px',
                                        padding: '0.55rem',
                                        borderRadius: '8px',
                                        border: `1px solid ${formData.platform === p.id ? '#2563eb' : '#cbd5e1'}`,
                                        background: formData.platform === p.id ? '#eff6ff' : '#ffffff',
                                        color: formData.platform === p.id ? '#1d4ed8' : '#475569',
                                        fontWeight: 700,
                                        fontSize: '0.82rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                            Product Title / Name *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Women Pure Cotton Printed Straight Kurta"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            style={inputStyle}
                        />
                    </div>

                    {/* Category & Brand */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                Brand
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Rangoli, Generic"
                                value={formData.brand}
                                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                Category
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Sarees, Kurtas, Shoes"
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Pricing & SKU */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                Selling Price (₹)
                            </label>
                            <input
                                type="number"
                                placeholder="499"
                                value={formData.sellingPrice}
                                onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: e.target.value }))}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                MRP (₹)
                            </label>
                            <input
                                type="number"
                                placeholder="999"
                                value={formData.mrp}
                                onChange={(e) => setFormData(prev => ({ ...prev, mrp: e.target.value }))}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                SKU / Style Code
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. KRT-001-RED"
                                value={formData.sku}
                                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Tax & Weight */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                HSN Code
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. 6204"
                                value={formData.hsnCode}
                                onChange={(e) => setFormData(prev => ({ ...prev, hsnCode: e.target.value }))}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                GST %
                            </label>
                            <select
                                value={formData.gstPercentage}
                                onChange={(e) => setFormData(prev => ({ ...prev, gstPercentage: e.target.value }))}
                                style={inputStyle}
                            >
                                <option value="0">0%</option>
                                <option value="5">5%</option>
                                <option value="12">12%</option>
                                <option value="18">18%</option>
                                <option value="28">28%</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                Weight (Grams)
                            </label>
                            <input
                                type="number"
                                placeholder="300"
                                value={formData.weightGrams}
                                onChange={(e) => setFormData(prev => ({ ...prev, weightGrams: e.target.value }))}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Dimensions */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                            Package Dimensions (L × W × H in CM)
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 85px), 1fr))', gap: '0.75rem' }}>
                            <input
                                type="number"
                                placeholder="Length (cm)"
                                value={formData.packageLength}
                                onChange={(e) => setFormData(prev => ({ ...prev, packageLength: e.target.value }))}
                                style={inputStyle}
                            />
                            <input
                                type="number"
                                placeholder="Width (cm)"
                                value={formData.packageWidth}
                                onChange={(e) => setFormData(prev => ({ ...prev, packageWidth: e.target.value }))}
                                style={inputStyle}
                            />
                            <input
                                type="number"
                                placeholder="Height (cm)"
                                value={formData.packageHeight}
                                onChange={(e) => setFormData(prev => ({ ...prev, packageHeight: e.target.value }))}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Colors */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                            Available Colors
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            {PRESET_COLORS.map(c => {
                                const selected = formData.colors.includes(c);
                                return (
                                    <button
                                        type="button"
                                        key={c}
                                        onClick={() => toggleColor(c)}
                                        style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '0.8rem',
                                            border: `1px solid ${selected ? '#2563eb' : '#cbd5e1'}`,
                                            background: selected ? '#2563eb' : '#ffffff',
                                            color: selected ? '#ffffff' : '#334155',
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        {c}
                                    </button>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                placeholder="Custom color (e.g. Maroon, Teal)"
                                value={customColorInput}
                                onChange={(e) => setCustomColorInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomColor(); } }}
                                style={{ ...inputStyle, flex: 1, padding: '0.5rem 0.75rem' }}
                            />
                            <button
                                type="button"
                                onClick={addCustomColor}
                                style={{ padding: '0.5rem 1rem', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                            >
                                + Add
                            </button>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                            Available Sizes
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {PRESET_SIZES.map(s => {
                                const selected = formData.sizes.includes(s);
                                return (
                                    <button
                                        type="button"
                                        key={s}
                                        onClick={() => toggleSize(s)}
                                        style={{
                                            padding: '4px 10px',
                                            borderRadius: '6px',
                                            fontSize: '0.8rem',
                                            border: `1px solid ${selected ? '#2563eb' : '#cbd5e1'}`,
                                            background: selected ? '#2563eb' : '#ffffff',
                                            color: selected ? '#ffffff' : '#334155',
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                            Product Description
                        </label>
                        <textarea
                            rows="3"
                            placeholder="Enter full product description..."
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            style={inputStyle}
                        />
                    </div>

                    {/* Bullet Features */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                            Key Features (one per line)
                        </label>
                        <textarea
                            rows="3"
                            placeholder="100% Premium cotton fabric&#10;Hand wash recommended&#10;Includes matching mask"
                            value={formData.features}
                            onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                            style={inputStyle}
                        />
                    </div>

                    {/* Keywords */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                            Keywords (comma-separated)
                        </label>
                        <input
                            type="text"
                            placeholder="ethnic wear, kurti, cotton, festive wear"
                            value={formData.keywords}
                            onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                            style={inputStyle}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ padding: '0.65rem 1.2rem', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            style={{
                                padding: '0.65rem 1.6rem',
                                background: '#2563eb',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 700,
                                cursor: isSaving ? 'not-allowed' : 'pointer',
                                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                            }}
                        >
                            {isSaving ? 'Saving...' : editingTemplate ? 'Update Template' : 'Save Template'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
