// src/components/templates/TemplateCard.jsx - Modular Template Item Card
import React from 'react';

export default function TemplateCard({
    template,
    onEdit,
    onDuplicate,
    onDelete
}) {
    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'transform 0.15s, box-shadow 0.15s'
        }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        background: template.platform === 'meesho' ? '#fdf2f8' : template.platform === 'flipkart' ? '#eff6ff' : '#f8fafc',
                        color: template.platform === 'meesho' ? '#be185d' : template.platform === 'flipkart' ? '#1d4ed8' : '#334155',
                        border: '1px solid rgba(0,0,0,0.06)'
                    }}>
                        {template.platform === 'all' ? 'All Platforms' : template.platform}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                        ⚡ Used {template.usageCount || 0} times
                    </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem 0', lineHeight: 1.3 }}>
                    {template.title}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    {template.brand && (
                        <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                            Brand: {template.brand}
                        </span>
                    )}
                    {template.category && (
                        <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#475569', padding: '2px 6px', borderRadius: '4px' }}>
                            {template.category}
                        </span>
                    )}
                    {template.sku && (
                        <span style={{ fontSize: '0.75rem', background: '#f8fafc', color: '#64748b', padding: '2px 6px', borderRadius: '4px' }}>
                            SKU: {template.sku}
                        </span>
                    )}
                </div>

                <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ color: '#64748b' }}>Selling Price: </span>
                        <span style={{ fontWeight: 700, color: '#10b981' }}>₹{template.sellingPrice || 0}</span>
                    </div>
                    <div>
                        <span style={{ color: '#64748b' }}>MRP: </span>
                        <span style={{ fontWeight: 700, color: '#64748b', textDecoration: 'line-through' }}>₹{template.mrp || 0}</span>
                    </div>
                    <div>
                        <span style={{ color: '#64748b' }}>GST: </span>
                        <span style={{ fontWeight: 600 }}>{template.gstPercentage || 0}%</span>
                    </div>
                </div>

                {template.colors && template.colors.length > 0 && (
                    <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#64748b', display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                        <span>Colors:</span>
                        {template.colors.map(c => (
                            <span key={c} style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: '3px', color: '#0f172a' }}>{c}</span>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Updated {new Date(template.updatedAt || template.createdAt).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                        onClick={() => onDuplicate(template)}
                        title="Duplicate"
                        style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                        📑 Copy
                    </button>
                    <button
                        onClick={() => onEdit(template)}
                        title="Edit"
                        style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: '#2563eb' }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(template._id, template.title)}
                        title="Delete"
                        style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', fontSize: '0.8rem', color: '#dc2626' }}
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}
