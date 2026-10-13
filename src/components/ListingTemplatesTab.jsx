import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useTemplates from '../hooks/useTemplates';
import {
    PRESET_COLORS,
    PRESET_SIZES,
    INITIAL_TEMPLATE_FORM
} from '../constants/templatePresets';

export default function ListingTemplatesTab() {
    const { currentUser } = useAuth();
    const {
        templates: filteredTemplates,
        rawTemplates: templates,
        isLoading,
        searchQuery,
        setSearchQuery,
        selectedPlatform,
        setSelectedPlatform,
        extensionInstalled,
        syncSuccess,
        showInstallModal,
        setShowInstallModal,
        syncTokenToExtension,
        fetchTemplates,
        saveTemplate,
        deleteTemplate
    } = useTemplates(currentUser);

    // Modal state for Create / Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    // Form fields
    const [formData, setFormData] = useState(INITIAL_TEMPLATE_FORM);
    const [customColorInput, setCustomColorInput] = useState('');

    // 1. Modal Handlers
    const openCreateModal = () => {
        setEditingTemplate(null);
        setFormData({
            ...INITIAL_TEMPLATE_FORM,
            platform: selectedPlatform !== 'all' ? selectedPlatform : 'all'
        });
        setFormError('');
        setFormSuccess('');
        setIsModalOpen(true);
    };

    const openEditModal = (template) => {
        setEditingTemplate(template);
        setFormData({
            platform: template.platform || 'all',
            title: template.title || '',
            category: template.category || '',
            brand: template.brand || '',
            description: template.description || '',
            sellingPrice: template.sellingPrice || '',
            mrp: template.mrp || '',
            sku: template.sku || '',
            hsnCode: template.hsnCode || '',
            gstPercentage: template.gstPercentage !== undefined ? String(template.gstPercentage) : '5',
            weightGrams: template.weightGrams !== undefined ? String(template.weightGrams) : '300',
            packageLength: template.packageLength !== undefined ? String(template.packageLength) : '20',
            packageWidth: template.packageWidth !== undefined ? String(template.packageWidth) : '15',
            packageHeight: template.packageHeight !== undefined ? String(template.packageHeight) : '4',
            colors: template.colors || [],
            sizes: template.sizes || [],
            keywords: Array.isArray(template.keywords) ? template.keywords.join(', ') : '',
            features: Array.isArray(template.features) ? template.features.join('\n') : ''
        });
        setFormError('');
        setFormSuccess('');
        setIsModalOpen(true);
    };

    const handleSaveTemplate = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess('');

        if (!formData.title.trim()) {
            setFormError('Please provide a title for this template.');
            return;
        }

        setIsSaving(true);
        const payload = {
            ...formData,
            sellingPrice: Number(formData.sellingPrice) || 0,
            mrp: Number(formData.mrp) || 0,
            gstPercentage: Number(formData.gstPercentage) || 0,
            weightGrams: Number(formData.weightGrams) || 0,
            packageLength: Number(formData.packageLength) || 0,
            packageWidth: Number(formData.packageWidth) || 0,
            packageHeight: Number(formData.packageHeight) || 0,
            keywords: formData.keywords ? formData.keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
            features: formData.features ? formData.features.split('\n').map(f => f.trim()).filter(Boolean) : []
        };

        try {
            const res = await saveTemplate(editingTemplate?._id, payload);
            if (res.success) {
                setFormSuccess(editingTemplate ? 'Template updated!' : 'Template created!');
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 800);
            } else {
                setFormError(res.error || 'Failed to save template.');
            }
        } catch (err) {
            setFormError('Network error while saving template.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteTemplate = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete template "${title}"?`)) return;
        try {
            const res = await deleteTemplate(id);
            if (!res.success) {
                alert(res.error || 'Failed to delete template.');
            }
        } catch (err) {
            alert('Network error while deleting template.');
        }
    };

    const handleDuplicateTemplate = (tpl) => {
        setEditingTemplate(null);
        setFormData({
            platform: tpl.platform || 'all',
            title: `${tpl.title} (Copy)`,
            category: tpl.category || '',
            brand: tpl.brand || '',
            description: tpl.description || '',
            sellingPrice: tpl.sellingPrice || '',
            mrp: tpl.mrp || '',
            sku: tpl.sku ? `${tpl.sku}-COPY` : '',
            hsnCode: tpl.hsnCode || '',
            gstPercentage: String(tpl.gstPercentage || '5'),
            weightGrams: String(tpl.weightGrams || '300'),
            packageLength: String(tpl.packageLength || '20'),
            packageWidth: String(tpl.packageWidth || '15'),
            packageHeight: String(tpl.packageHeight || '4'),
            colors: tpl.colors || [],
            sizes: tpl.sizes || [],
            keywords: Array.isArray(tpl.keywords) ? tpl.keywords.join(', ') : '',
            features: Array.isArray(tpl.features) ? tpl.features.join('\n') : ''
        });
        setFormError('');
        setFormSuccess('');
        setIsModalOpen(true);
    };

    // Color & Size chips toggling
    const toggleColor = (color) => {
        setFormData(prev => {
            const exists = prev.colors.includes(color);
            return {
                ...prev,
                colors: exists ? prev.colors.filter(c => c !== color) : [...prev.colors, color]
            };
        });
    };

    const addCustomColor = () => {
        const c = customColorInput.trim();
        if (c && !formData.colors.includes(c)) {
            setFormData(prev => ({ ...prev, colors: [...prev.colors, c] }));
            setCustomColorInput('');
        }
    };

    const toggleSize = (size) => {
        setFormData(prev => {
            const exists = prev.sizes.includes(size);
            return {
                ...prev,
                sizes: exists ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
            };
        });
    };

    const totalAutofills = templates.reduce((acc, t) => acc + (t.usageCount || 0), 0);

    return (
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Header / Hero */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 0.4rem 0' }}>
                        ⚡ Listing Templates & Autofill
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
                        Save your product specifications once. VendorsDesk Chrome Extension will autofill listings across Meesho, Flipkart, and Amazon in 1-click.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                        onClick={openCreateModal}
                        style={{
                            background: '#2563eb',
                            color: '#ffffff',
                            fontWeight: 700,
                            padding: '0.75rem 1.4rem',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.92rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                        }}
                    >
                        <span>+</span> Create New Template
                    </button>
                </div>
            </div>

            {/* Extension Connectivity Banner */}
            <div style={{
                background: extensionInstalled ? 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)' : 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
                border: `1px solid ${extensionInstalled ? '#a7f3d0' : '#bfdbfe'}`,
                borderRadius: '14px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: extensionInstalled ? '#10b981' : '#2563eb',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        boxShadow: extensionInstalled ? '0 4px 12px rgba(16, 185, 129, 0.3)' : '0 4px 12px rgba(37, 99, 235, 0.3)'
                    }}>
                        {extensionInstalled ? '✓' : '⚡'}
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                                VendorsDesk Chrome Extension
                            </span>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '999px',
                                background: extensionInstalled ? '#d1fae5' : '#e0e7ff',
                                color: extensionInstalled ? '#065f46' : '#3730a3'
                            }}>
                                {extensionInstalled ? 'ACTIVE & SYNCED' : 'READY TO INSTALL'}
                            </span>
                        </div>
                        <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#475569' }}>
                            {extensionInstalled 
                                ? 'Autofill is enabled. When you open Meesho or Flipkart listing forms, the VendorsDesk floating widget will appear automatically.'
                                : 'Install the VendorsDesk Extension to autofill product listings directly on Meesho Supplier Panel and Flipkart Seller Hub.'}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    {extensionInstalled ? (
                        <button
                            onClick={syncTokenToExtension}
                            style={{
                                background: '#ffffff',
                                border: '1px solid #cbd5e1',
                                color: '#0f172a',
                                fontWeight: 700,
                                padding: '0.55rem 1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.85rem'
                            }}
                        >
                            {syncSuccess ? '✓ Synced!' : '🔄 Resync Token'}
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowInstallModal(true)}
                            style={{
                                background: '#2563eb',
                                color: '#ffffff',
                                fontWeight: 700,
                                padding: '0.6rem 1.2rem',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.88rem',
                                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
                            }}
                        >
                            📦 How to Install Extension
                        </button>
                    )}
                </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Total Templates</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>{templates.length}</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Total Fills Saved</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>{totalAutofills}</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Time Saved</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563eb', marginTop: '0.2rem' }}>
                        {Math.round((totalAutofills * 15) / 60)} hrs
                    </div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem 1.25rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Supported Platforms</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginTop: '0.4rem', display: 'flex', gap: '0.4rem' }}>
                        <span>Meesho</span> · <span>Flipkart</span> · <span>Amazon</span>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem', background: '#ffffff', padding: '4px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                    {['all', 'meesho', 'flipkart', 'amazon'].map(p => (
                        <button
                            key={p}
                            onClick={() => setSelectedPlatform(p)}
                            style={{
                                padding: '0.45rem 1rem',
                                borderRadius: '7px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                textTransform: 'capitalize',
                                background: selectedPlatform === p ? '#2563eb' : 'transparent',
                                color: selectedPlatform === p ? '#ffffff' : '#64748b',
                                transition: 'all 0.15s'
                            }}
                        >
                            {p === 'all' ? 'All Platforms' : p}
                        </button>
                    ))}
                </div>

                <div style={{ flex: 1, maxWidth: '380px' }}>
                    <input
                        type="text"
                        placeholder="Search templates by title, SKU, brand..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.6rem 1rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '10px',
                            fontSize: '0.88rem',
                            outline: 'none',
                            background: '#ffffff'
                        }}
                    />
                </div>
            </div>

            {/* Templates List */}
            {isLoading ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                    Loading your listing templates...
                </div>
            ) : filteredTemplates.length === 0 ? (
                <div style={{
                    background: '#ffffff',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '14px',
                    padding: '3.5rem 2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.8rem'
                }}>
                    <div style={{ fontSize: '2.5rem' }}>📋</div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {searchQuery ? 'No templates match your search' : 'No templates created yet'}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '440px', margin: 0 }}>
                        Create your first product listing template to start autofilling forms across Meesho, Flipkart, and Amazon seller panels.
                    </p>
                    <button
                        onClick={openCreateModal}
                        style={{
                            marginTop: '0.5rem',
                            background: '#2563eb',
                            color: '#ffffff',
                            fontWeight: 700,
                            padding: '0.65rem 1.4rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        + Create First Template
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1.2rem' }}>
                    {filteredTemplates.map(tpl => (
                        <div
                            key={tpl._id}
                            style={{
                                background: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: '1rem',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                transition: 'transform 0.15s, box-shadow 0.15s'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                                    <span style={{
                                        fontSize: '0.72rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        background: tpl.platform === 'meesho' ? '#fdf2f8' : tpl.platform === 'flipkart' ? '#eff6ff' : '#f8fafc',
                                        color: tpl.platform === 'meesho' ? '#be185d' : tpl.platform === 'flipkart' ? '#1d4ed8' : '#334155',
                                        border: '1px solid rgba(0,0,0,0.06)'
                                    }}>
                                        {tpl.platform === 'all' ? 'All Platforms' : tpl.platform}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                                        ⚡ Used {tpl.usageCount || 0} times
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0', lineHeight: 1.3 }}>
                                    {tpl.title}
                                </h3>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                                    {tpl.brand && (
                                        <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                                            Brand: {tpl.brand}
                                        </span>
                                    )}
                                    {tpl.category && (
                                        <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                                            {tpl.category}
                                        </span>
                                    )}
                                    {tpl.sku && (
                                        <span style={{ fontSize: '0.75rem', background: '#f8fafc', color: '#64748b', padding: '2px 6px', borderRadius: '4px' }}>
                                            SKU: {tpl.sku}
                                        </span>
                                    )}
                                </div>

                                <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ color: '#64748b' }}>Selling Price: </span>
                                        <span style={{ fontWeight: 700, color: '#10b981' }}>₹{tpl.sellingPrice || 0}</span>
                                    </div>
                                    <div>
                                        <span style={{ color: '#64748b' }}>MRP: </span>
                                        <span style={{ fontWeight: 700, color: '#64748b', textDecoration: 'line-through' }}>₹{tpl.mrp || 0}</span>
                                    </div>
                                    <div>
                                        <span style={{ color: '#64748b' }}>GST: </span>
                                        <span style={{ fontWeight: 600 }}>{tpl.gstPercentage || 0}%</span>
                                    </div>
                                </div>

                                {tpl.colors && tpl.colors.length > 0 && (
                                    <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#64748b', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                                        <span>Colors:</span>
                                        {tpl.colors.map(c => (
                                            <span key={c} style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: '3px', color: '#0f172a' }}>{c}</span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                    Updated {new Date(tpl.updatedAt || tpl.createdAt).toLocaleDateString()}
                                </div>
                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                    <button
                                        onClick={() => handleDuplicateTemplate(tpl)}
                                        title="Duplicate"
                                        style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', fontSize: '0.8rem' }}
                                    >
                                        📑 Copy
                                    </button>
                                    <button
                                        onClick={() => openEditModal(tpl)}
                                        title="Edit"
                                        style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: '#2563eb' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTemplate(tpl._id, tpl.title)}
                                        title="Delete"
                                        style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', fontSize: '0.8rem', color: '#dc2626' }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            {isModalOpen && (
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
                                onClick={() => setIsModalOpen(false)}
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
                        <form onSubmit={handleSaveTemplate} style={{ padding: '1.25rem 1rem', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
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
                                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
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
                                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
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
                                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
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
                                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
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
                                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
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
                                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
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
                                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                                        GST %
                                    </label>
                                    <select
                                        value={formData.gstPercentage}
                                        onChange={(e) => setFormData(prev => ({ ...prev, gstPercentage: e.target.value }))}
                                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', background: '#ffffff' }}
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
                                        style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
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
                                        style={{ padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Width (cm)"
                                        value={formData.packageWidth}
                                        onChange={(e) => setFormData(prev => ({ ...prev, packageWidth: e.target.value }))}
                                        style={{ padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Height (cm)"
                                        value={formData.packageHeight}
                                        onChange={(e) => setFormData(prev => ({ ...prev, packageHeight: e.target.value }))}
                                        style={{ padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
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
                                        style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={addCustomColor}
                                        style={{ padding: '0.5rem 1rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
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
                                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none' }}
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
                                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none' }}
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
                                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.88rem', outline: 'none' }}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{ padding: '0.65rem 1.2rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
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
            )}

            {/* Install Guide Modal */}
            {showInstallModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem'
                }}>
                    <div style={{
                        background: '#ffffff',
                        width: '100%',
                        maxWidth: '560px',
                        borderRadius: '16px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                        padding: '1.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.2rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                                📦 Install VendorsDesk Chrome Extension
                            </h2>
                            <button
                                onClick={() => setShowInstallModal(false)}
                                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}
                            >
                                ×
                            </button>
                        </div>

                        <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>
                            Follow these simple 3 steps to install the VendorsDesk Assistant in Google Chrome:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            <div style={{ display: 'flex', gap: '0.8rem', background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                                    1
                                </span>
                                <div style={{ fontSize: '0.88rem' }}>
                                    Open Chrome and navigate to <strong>chrome://extensions</strong> in the address bar.
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.8rem', background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                                    2
                                </span>
                                <div style={{ fontSize: '0.88rem' }}>
                                    Toggle ON <strong>Developer mode</strong> in the top-right corner of the Extensions page.
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.8rem', background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                                    3
                                </span>
                                <div style={{ fontSize: '0.88rem' }}>
                                    Click <strong>Load unpacked</strong> button and select the <code>chrome-extension</code> folder inside your VendorsDesk directory.
                                </div>
                            </div>
                        </div>

                        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', padding: '0.75rem', fontSize: '0.82rem', color: '#065f46' }}>
                            ✓ That's it! Once loaded, refresh this dashboard and the extension will automatically connect to your account.
                        </div>

                        <button
                            onClick={() => setShowInstallModal(false)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#2563eb',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Got It!
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
