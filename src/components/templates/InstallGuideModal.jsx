// src/components/templates/InstallGuideModal.jsx - Chrome Extension Installation Guide
import React from 'react';

export default function InstallGuideModal({
    isOpen,
    onClose
}) {
    if (!isOpen) return null;

    return (
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
                        onClick={onClose}
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
                            Enable <strong>Developer mode</strong> using the toggle switch in the top-right corner.
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.8rem', background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                            3
                        </span>
                        <div style={{ fontSize: '0.88rem' }}>
                            Click <strong>Load unpacked</strong> and select the <code>vendorsdesk-extension/</code> folder.
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    style={{
                        padding: '0.75rem',
                        background: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer'
                    }}
                >
                    Got It!
                </button>
            </div>
        </div>
    );
}
