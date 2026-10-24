import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useTemplates from '../hooks/useTemplates';
import { INITIAL_TEMPLATE_FORM } from '../constants/templatePresets';
import TemplateCard from './templates/TemplateCard';
import ExtensionBanner from './templates/ExtensionBanner';
import TemplateFormModal from './templates/TemplateFormModal';
import InstallGuideModal from './templates/InstallGuideModal';

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

        const res = await saveTemplate(payload, editingTemplate?._id);
        setIsSaving(false);

        if (res.success) {
            setFormSuccess('Template saved successfully!');
            setTimeout(() => {
                setIsModalOpen(false);
                setFormSuccess('');
            }, 800);
        } else {
            setFormError(res.error || 'Failed to save template. Please try again.');
        }
    };

    const handleDeleteTemplate = async (id, title) => {
        if (!window.confirm(`Delete listing template "${title}"?`)) return;
        const res = await deleteTemplate(id);
        if (!res.success) {
            alert(res.error || 'Could not delete template.');
        }
    };

    const handleDuplicateTemplate = (template) => {
        setEditingTemplate(null);
        setFormData({
            ...template,
            title: `${template.title} (Copy)`,
            _id: undefined,
            keywords: Array.isArray(template.keywords) ? template.keywords.join(', ') : '',
            features: Array.isArray(template.features) ? template.features.join('\n') : ''
        });
        setIsModalOpen(true);
    };

    const totalAutofills = templates.reduce((acc, t) => acc + (t.usageCount || 0), 0);

    return (
        <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>
                        📦 Multi-Marketplace Listing Templates
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
            <ExtensionBanner
                extensionInstalled={extensionInstalled}
                syncSuccess={syncSuccess}
                syncTokenToExtension={syncTokenToExtension}
                setShowInstallModal={setShowInstallModal}
            />

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
                            boxSizing: 'border-box',
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
                    <div style={{ fontSize: '2.5rem' }}>📄</div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>
                        No templates found
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '400px', margin: 0 }}>
                        {searchQuery ? 'Try matching another search keyword or filter.' : 'Create your first reusable listing template to start autofilling catalog details in seconds.'}
                    </p>
                    <button
                        onClick={openCreateModal}
                        style={{
                            marginTop: '0.5rem',
                            background: '#2563eb',
                            color: '#ffffff',
                            fontWeight: 700,
                            padding: '0.6rem 1.2rem',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        + Create First Template
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                    {filteredTemplates.map(tpl => (
                        <TemplateCard
                            key={tpl._id}
                            template={tpl}
                            onEdit={openEditModal}
                            onDuplicate={handleDuplicateTemplate}
                            onDelete={handleDeleteTemplate}
                        />
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            <TemplateFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingTemplate={editingTemplate}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSaveTemplate}
                isSaving={isSaving}
                formError={formError}
                formSuccess={formSuccess}
            />

            {/* Install Guide Modal */}
            <InstallGuideModal
                isOpen={showInstallModal}
                onClose={() => setShowInstallModal(false)}
            />
        </div>
    );
}
