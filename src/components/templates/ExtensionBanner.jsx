// src/components/templates/ExtensionBanner.jsx - Modular Chrome Extension Status Banner
import React from 'react';

export default function ExtensionBanner({
    extensionInstalled,
    syncSuccess,
    syncTokenToExtension,
    setShowInstallModal
}) {
    return (
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
    );
}
