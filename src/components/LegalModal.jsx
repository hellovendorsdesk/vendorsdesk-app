import React, { useState } from 'react';

export default function LegalModal({ isOpen, onClose, initialTab = 'terms' }) {
    const [activeTab, setActiveTab] = useState(initialTab);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(2, 6, 23, 0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
        }}>
            <div style={{
                background: '#0f172a',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '780px',
                maxHeight: '88vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                overflow: 'hidden'
            }}>
                {/* Modal Header */}
                <div style={{
                    padding: '1.5rem 1.75rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(30, 41, 59, 0.6)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <img src="/logo-icon.png" alt="VendorsDesk" style={{ width: '36px', height: '36px', borderRadius: '10px' }} />
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                VendorsDesk — Legal & Policy Documentation
                            </h2>
                            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
                                Domain: vendorsdesk.in | Smart Tools For Smart Sellers
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#94a3b8',
                            fontSize: '1.2rem',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Document Navigation Tabs */}
                <div style={{
                    display: 'flex',
                    background: '#020617',
                    padding: '0.5rem 1.75rem',
                    gap: '0.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={() => setActiveTab('disclaimer')}
                        style={{
                            padding: '0.55rem 1rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: activeTab === 'disclaimer' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                            color: activeTab === 'disclaimer' ? '#f87171' : '#94a3b8',
                            border: activeTab === 'disclaimer' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid transparent'
                        }}
                    >
                        ⚠️ Non-Affiliation Disclaimer
                    </button>
                    <button
                        onClick={() => setActiveTab('terms')}
                        style={{
                            padding: '0.55rem 1rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: activeTab === 'terms' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                            color: activeTab === 'terms' ? '#818cf8' : '#94a3b8',
                            border: activeTab === 'terms' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
                        }}
                    >
                        📜 Terms of Service
                    </button>
                    <button
                        onClick={() => setActiveTab('privacy')}
                        style={{
                            padding: '0.55rem 1rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: activeTab === 'privacy' ? 'rgba(52, 211, 153, 0.2)' : 'transparent',
                            color: activeTab === 'privacy' ? '#34d399' : '#94a3b8',
                            border: activeTab === 'privacy' ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid transparent'
                        }}
                    >
                        🔒 Privacy Policy
                    </button>
                    <button
                        onClick={() => setActiveTab('refund')}
                        style={{
                            padding: '0.55rem 1rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: activeTab === 'refund' ? 'rgba(251, 146, 60, 0.2)' : 'transparent',
                            color: activeTab === 'refund' ? '#fb923c' : '#94a3b8',
                            border: activeTab === 'refund' ? '1px solid rgba(251, 146, 60, 0.4)' : '1px solid transparent'
                        }}
                    >
                        💸 Refund Policy
                    </button>
                </div>

                {/* Modal Content Body */}
                <div style={{
                    padding: '1.75rem',
                    overflowY: 'auto',
                    fontSize: '0.875rem',
                    lineHeight: '1.65',
                    color: '#cbd5e1'
                }}>
                    {activeTab === 'disclaimer' && (
                        <div>
                            <h3 style={{ color: '#f87171', fontSize: '1.15rem', marginTop: 0 }}>Third-Party Non-Affiliation Disclaimer</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Effective Date: August 2026 | Domain: vendorsdesk.in</p>

                            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                                <p style={{ margin: 0, fontWeight: 600, color: '#fca5a5' }}>
                                    VendorsDesk (vendorsdesk.in) is an independent software utility developed for online e-commerce sellers.
                                </p>
                            </div>

                            <h4 style={{ color: '#f87171', marginTop: '1.2rem', marginBottom: '0.4rem' }}>1. No Official Connection</h4>
                            <p>VendorsDesk is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Meesho, Fashnear Technologies Private Limited, or any of their subsidiaries or affiliates. The official website for Meesho can be found at meesho.com.</p>

                            <h4 style={{ color: '#f87171', marginTop: '1.2rem', marginBottom: '0.4rem' }}>2. Trademark Ownership</h4>
                            <p>The name "Meesho" as well as related names, logos, emblems, and registered trademarks belong exclusively to their respective corporate owners. References to third-party marketplaces within VendorsDesk are strictly for descriptive identification, utility integration, and educational compatibility purposes under fair use doctrine.</p>

                            <h4 style={{ color: '#f87171', marginTop: '1.2rem', marginBottom: '0.4rem' }}>3. Independent Utility Tool</h4>
                            <p>VendorsDesk operates solely as a merchant-side productivity tool aiding authorized sellers in optimizing product catalog images, auditing shipping weight penalties, calculating return charges, and printing order shipping labels.</p>
                        </div>
                    )}

                    {activeTab === 'terms' && (
                        <div>
                            <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', marginTop: 0 }}>Terms of Service</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Last updated: August 2026 | VendorsDesk (vendorsdesk.in)</p>
                            
                            <h4 style={{ color: '#818cf8', marginTop: '1.2rem', marginBottom: '0.4rem' }}>1. Acceptance & Licensing</h4>
                            <p>By accessing VendorsDesk web tools or desktop software, you agree to comply with these Terms of Service and applicable laws. Licensing is granted on a subscription / credit-usage basis to authorized users.</p>

                            <h4 style={{ color: '#818cf8', marginTop: '1.2rem', marginBottom: '0.4rem' }}>2. Merchant Account Authorization</h4>
                            <p>Sellers utilizing VendorsDesk tools confirm that they are the legal owners or authorized operators of their respective merchant store accounts. Session keys and tokens are encrypted locally and in memory solely to execute requests initiated by the seller.</p>

                            <h4 style={{ color: '#818cf8', marginTop: '1.2rem', marginBottom: '0.4rem' }}>3. Fair Usage Policy</h4>
                            <p>Users agree not to engage in unauthorized scraping of non-public systems, reverse engineering of software binaries, sharing account credentials, or circumventing software licensing controls. Accounts violating fair use policies may be terminated.</p>

                            <h4 style={{ color: '#818cf8', marginTop: '1.2rem', marginBottom: '0.4rem' }}>4. Limitation of Liability</h4>
                            <p>VendorsDesk provides automated calculations and optimization tools on an "as-is" basis. Official platform settlements, logistics billing, and marketplace policies remain subject to final verification on official merchant panels.</p>
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div>
                            <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', marginTop: 0 }}>Privacy & Data Protection Policy</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Last updated: August 2026 | VendorsDesk (vendorsdesk.in)</p>

                            <h4 style={{ color: '#34d399', marginTop: '1.2rem', marginBottom: '0.4rem' }}>1. Information Collected</h4>
                            <p>We collect essential information required to operate the service, including account email, encrypted password credentials, system Hardware ID (HWID for desktop app activation), and catalog images submitted for variation processing.</p>

                            <h4 style={{ color: '#34d399', marginTop: '1.2rem', marginBottom: '0.4rem' }}>2. End-to-End Payload Encryption</h4>
                            <p>All sensitive payloads transmitted between the client application and backend servers are encrypted using AES algorithms over secure TLS (HTTPS). Credentials and cookies are stored securely using encryption at rest.</p>

                            <h4 style={{ color: '#34d399', marginTop: '1.2rem', marginBottom: '0.4rem' }}>3. Zero Third-Party Monetization</h4>
                            <p>VendorsDesk strictly does NOT sell, rent, or trade seller data, store analytics, order volumes, or catalog assets to third-party advertisers, data brokers, or marketplace competitors.</p>
                        </div>
                    )}

                    {activeTab === 'refund' && (
                        <div>
                            <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', marginTop: 0 }}>Refund & Cancellation Policy</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Last updated: August 2026 | VendorsDesk (vendorsdesk.in)</p>

                            <h4 style={{ color: '#fb923c', marginTop: '1.2rem', marginBottom: '0.4rem' }}>1. Free Evaluation Credits</h4>
                            <p>VendorsDesk provides free initial trial credits upon user registration to allow sellers to test shipping auditors, badge variation generators, and catalog tools prior to purchasing paid credits or subscription tiers.</p>

                            <h4 style={{ color: '#fb923c', marginTop: '1.2rem', marginBottom: '0.4rem' }}>2. Digital Product Policy</h4>
                            <p>Due to the instant delivery nature of digital software credits and SaaS subscription activations, credit top-ups and plan purchases are non-refundable once allocated and consumed on an account.</p>

                            <h4 style={{ color: '#fb923c', marginTop: '1.2rem', marginBottom: '0.4rem' }}>3. Exception Cases & Support</h4>
                            <p>Refunds will be processed in cases of duplicate payment charges or server outages exceeding 48 consecutive hours. Contact support@vendorsdesk.in for assistance.</p>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div style={{
                    padding: '1.25rem 1.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(30, 41, 59, 0.4)'
                }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        © 2026 VendorsDesk (vendorsdesk.in). All rights reserved.
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.65rem 1.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                            color: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
                        }}
                    >
                        I Accept & Close
                    </button>
                </div>
            </div>
        </div>
    );
}
