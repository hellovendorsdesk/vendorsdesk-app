import React, { useState } from 'react';
import BulkBackgroundRemoverTab from '../../components/BulkBackgroundRemoverTab';
import FreeImageGeneratorTab from '../../components/FreeImageGeneratorTab';
import PnLCalculatorTab from '../../components/PnLCalculatorTab';
import MeeshoShippingRatesPage from './MeeshoShippingRatesPage';
import MeeshoLabelExporterPage from './MeeshoLabelExporterPage';
import PricingAffiliatePage from './PricingAffiliatePage';
import { PrivacyPolicyPage, RefundPolicyPage, TermsOfServicePage, ContactUsPage } from './LegalPages';
import NotFoundPage from './NotFoundPage';

export default function MarketingLandingPage({ currentUser, activeTab, onTabChange, onLogin, onRegister, onGoToDashboard }) {
    const [faqOpen, setFaqOpen] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

    const toggleFaq = (idx) => {
        setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const validTabs = [
        'home', 'bg-remover', 'free-image-generator', 'meesho-shipping-rates', 
        'pnl-calculator', 'meesho-image-generator', 'meesho-label-exporter', 
        'pricing', 'privacy-policy', 'refund-policy', 'terms-of-service', 'contact-us'
    ];

    return (
        <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg-gradient)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
            
            {/* Header / Navbar */}
            <header className="site-header" style={{
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 4px 25px rgba(15, 23, 42, 0.05)',
                padding: '0.75rem 3%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 990
            }}>
                {/* Left Official Brand Logo */}
                <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
                    onClick={() => { onTabChange('meesho-shipping-rates'); setMobileMenuOpen(false); }}
                >
                    <img 
                        src="/logo-icon.png" 
                        alt="VendorsDesk Official Logo" 
                        style={{ height: '38px', width: 'auto', objectFit: 'contain' }} 
                    />
                    <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                        VendorsDesk
                    </span>
                </div>
                
                {/* Desktop Navigation Links (Center) */}
                <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {/* 🧰 Free Tools Dropdown */}
                    <div 
                        className="nav-dropdown-wrapper"
                        onMouseEnter={() => setIsToolsDropdownOpen(true)}
                        onMouseLeave={() => setIsToolsDropdownOpen(false)}
                        style={{ position: 'relative' }}
                    >
                        <button 
                            className={`nav-link ${['free-image-generator', 'meesho-shipping-rates', 'pnl-calculator', 'meesho-label-exporter'].includes(activeTab) ? 'active' : ''}`}
                            onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                padding: '0.55rem 0.85rem',
                                borderRadius: '12px',
                                background: 'rgba(37, 99, 235, 0.06)',
                                border: '1px solid rgba(37, 99, 235, 0.15)',
                                color: '#2563eb'
                            }}
                        >
                            <span>🧰 Free Tools</span>
                            <span style={{ fontSize: '0.6rem', background: '#10b981', color: '#ffffff', padding: '0.12rem 0.4rem', borderRadius: '6px', fontWeight: 800 }}>5 SUITE</span>
                            <span style={{ fontSize: '0.7rem', transition: 'transform 0.2s', transform: isToolsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                        </button>

                        {isToolsDropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '340px',
                                background: '#ffffff',
                                border: '1px solid #cbd5e1',
                                borderRadius: '18px',
                                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
                                padding: '0.75rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.4rem',
                                zIndex: 1000,
                            }}>
                                {/* Tool 1: Background Remover */}
                                <div 
                                    onClick={() => { onTabChange('bg-remover'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
                                >
                                    <span style={{ fontSize: '1.3rem' }}>🖼️</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Bulk HD Background Remover</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Remove & transparent image backgrounds.</div>
                                    </div>
                                </div>

                                {/* Tool 2: Free Image Generator */}
                                <div 
                                    onClick={() => { onTabChange('free-image-generator'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
                                >
                                    <span style={{ fontSize: '1.3rem' }}>🆓</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Free Image Variation Generator</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Generate catalog borders & badges for free.</div>
                                    </div>
                                </div>

                                {/* Tool 3: Rate & Freight Optimizer */}
                                <div 
                                    onClick={() => { onTabChange('meesho-shipping-rates'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
                                >
                                    <span style={{ fontSize: '1.3rem' }}>⚡</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Meesho Shipping Rate Optimizer</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Check & audit lowest freight slab tiers.</div>
                                    </div>
                                </div>

                                {/* Tool 4: Excel P&L Settlement Calculator */}
                                <div 
                                    onClick={() => { onTabChange('pnl-calculator'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
                                >
                                    <span style={{ fontSize: '1.3rem' }}>📊</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Excel P&L Settlement Calculator</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Upload settlement sheet & audit net profits.</div>
                                    </div>
                                </div>

                                {/* Tool 5: Bulk Label Crop & Exporter */}
                                <div 
                                    onClick={() => { onTabChange('meesho-label-exporter'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
                                >
                                    <span style={{ fontSize: '1.3rem' }}>📋</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Bulk PDF Label Crop & SKU Sorter</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Crop 4x6 thermal shipping labels by SKU.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Featured Shortcut Link: Pricing */}
                    <button 
                        className="nav-link"
                        onClick={() => {
                            const el = document.getElementById('pricing-affiliate-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            else onTabChange('pricing');
                        }}
                        style={{ fontWeight: 700, padding: '0.45rem 0.75rem', borderRadius: '10px', fontSize: '0.85rem', color: '#475569' }}
                    >
                        💎 Pricing & Affiliate
                    </button>

                    {/* Contact & Support Link */}
                    <button 
                        className="nav-link"
                        onClick={() => onTabChange('contact-us')}
                        style={{ fontWeight: 700, padding: '0.45rem 0.75rem', borderRadius: '10px', fontSize: '0.85rem', color: '#475569' }}
                    >
                        📞 Contact & Support
                    </button>
                </nav>

                {/* Desktop Action Buttons (Right) */}
                <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    {currentUser ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '0.4rem 0.85rem', borderRadius: '10px' }}>
                                💎 {currentUser.credits} Credits
                            </span>
                            <button 
                                className="btn-get-started card-hover-lift" 
                                style={{ padding: '0.65rem 1.35rem', borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', boxShadow: '0 4px 18px rgba(37, 99, 235, 0.35)', fontWeight: 800 }} 
                                onClick={onGoToDashboard}
                            >
                                ⚡ Go to App Dashboard
                            </button>
                        </div>
                    ) : (
                        <>
                            <button 
                                className="btn-signin card-hover-lift" 
                                onClick={onLogin}
                                style={{
                                    background: '#ffffff',
                                    border: '1px solid #cbd5e1',
                                    color: '#0f172a',
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                                }}
                            >
                                Sign In
                            </button>
                            <button 
                                className="btn-get-started card-hover-lift" 
                                onClick={onRegister}
                                style={{
                                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.6rem 1.45rem',
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 18px rgba(37, 99, 235, 0.35)'
                                }}
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Toggle Button */}
                <button 
                    className="mobile-hamburger-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="mobile-menu-drawer">
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.4rem 0.75rem' }}>
                            🧰 FREE SUPPLIER TOOLS
                        </div>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'free-image-generator' ? 'active' : ''}`}
                            onClick={() => { onTabChange('free-image-generator'); setMobileMenuOpen(false); }}
                        >
                            🖼️ Free Image Variation Generator (100% Free)
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'meesho-shipping-rates' ? 'active' : ''}`}
                            onClick={() => { onTabChange('meesho-shipping-rates'); setMobileMenuOpen(false); }}
                        >
                            ⚡ Rate & Freight Optimizer
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'pnl-calculator' ? 'active' : ''}`}
                            onClick={() => { onTabChange('pnl-calculator'); setMobileMenuOpen(false); }}
                        >
                            📊 Excel P&L Settlement Calculator
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'meesho-label-exporter' ? 'active' : ''}`}
                            onClick={() => { onTabChange('meesho-label-exporter'); setMobileMenuOpen(false); }}
                        >
                            📋 Bulk Thermal Label Exporter (4x6 Crop)
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
                            onClick={() => { onTabChange('pricing'); setMobileMenuOpen(false); }}
                        >
                            💎 Pricing & Affiliate
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'contact-us' ? 'active' : ''}`}
                            onClick={() => { onTabChange('contact-us'); setMobileMenuOpen(false); }}
                        >
                            📞 Contact & Support
                        </button>

                        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.4rem 0' }} />

                        <button 
                            className="btn-signin-mobile" 
                            onClick={(e) => { 
                                e.preventDefault();
                                e.stopPropagation(); 
                                onLogin(); 
                                setTimeout(() => setMobileMenuOpen(false), 50); 
                            }}
                        >
                            Sign In
                        </button>
                        <button 
                            className="btn-get-started-mobile" 
                            onClick={(e) => { 
                                e.preventDefault();
                                e.stopPropagation(); 
                                onRegister(); 
                                setTimeout(() => setMobileMenuOpen(false), 50); 
                            }}
                        >
                            ⚡ Get Started (3 Free Credits)
                        </button>
                    </div>
                )}
            </header>

            {/* Conditionally Render Subpages */}
            {activeTab === 'bg-remover' && <div style={{ padding: '2.5rem 5%' }}><BulkBackgroundRemoverTab /></div>}
            {activeTab === 'free-image-generator' && <div style={{ padding: '2.5rem 5%' }}><FreeImageGeneratorTab onRegister={onRegister} /></div>}
            {(activeTab === 'meesho-shipping-rates' || activeTab === 'home') && <MeeshoShippingRatesPage onRegister={onRegister} />}
            {activeTab === 'pnl-calculator' && <div style={{ padding: '2.5rem 5%' }}><PnLCalculatorTab /></div>}
            {activeTab === 'meesho-label-exporter' && <MeeshoLabelExporterPage onRegister={onRegister} />}
            {activeTab === 'pricing' && <PricingAffiliatePage onRegister={onRegister} />}
            {activeTab === 'privacy-policy' && <PrivacyPolicyPage />}
            {activeTab === 'refund-policy' && <RefundPolicyPage />}
            {activeTab === 'terms-of-service' && <TermsOfServicePage />}
            {activeTab === 'contact-us' && <ContactUsPage />}

            {/* Custom 404 Not Found Page */}
            {!validTabs.includes(activeTab) && (
                <NotFoundPage onReturnHome={() => onTabChange('meesho-shipping-rates')} />
            )}

            {/* General FAQs Accordion Section */}
            {(activeTab === 'meesho-shipping-rates' || activeTab === 'home') && (
                <section id="faqs" style={{ padding: '5rem 5% 6rem 5%', maxWidth: '800px', margin: '0 auto', borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>Frequently Asked Questions</h2>
                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>Answers to common e-commerce logistics and duplicate listing queries.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            {
                                q: "What is VendorsDesk and how does it optimize Meesho shipping?",
                                a: "VendorsDesk is an e-commerce auditing tool that cross-references actual product variation weights against the shipping rate matrixes logged by logistics partners on the Meesho Supplier Panel, flagging shipping charge leakages."
                            },
                            {
                                q: "Is it secure to link my Meesho account or session keys?",
                                a: "Absolutely. We do not store master logins or developer API keys. Everything is routed using secure personal session handshake configurations, ensuring full compliance and avoiding Cloudflare blocks."
                            },
                            {
                                q: "How does the SKU-wise Return Risk Auditor work?",
                                a: "Our SKU Return Risk Auditor pulls product payouts and matches them with RTO returns records, identifying listings that produce negative profits due to high return penalty charges."
                            },
                            {
                                q: "How do I claim my 3 free query credits?",
                                a: "Simply sign up with an email ID or Google login. 3 free credits will be credited instantly to your account balance, allowing you to test shipping checks immediately."
                            }
                        ].map((faq, idx) => {
                            const isOpen = !!faqOpen[idx];
                            return (
                                <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', cursor: 'pointer' }} onClick={() => toggleFaq(idx)}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>{faq.q}</strong>
                                        <span style={{ fontSize: '1rem', color: '#2563eb', fontWeight: 'bold' }}>{isOpen ? '−' : '+'}</span>
                                    </div>
                                    {isOpen && (
                                        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #cbd5e1', paddingTop: '0.75rem' }}>
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer style={{ padding: '4rem 5% 3rem 5%', background: '#ffffff', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚡</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>VendorsDesk</span>
                </div>
                
                <p style={{ color: '#475569', fontSize: '0.8rem', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: '1.5' }}>
                    VendorsDesk is an independent SaaS optimization tool. We are not officially affiliated with Meesho Inc or logistics providers. All audits are derived dynamically via secure user tokens.
                </p>

                {/* Footer Legal & Policy Links */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem', fontSize: '0.85rem' }}>
                    <button 
                        onClick={() => { onTabChange('privacy-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    >
                        🔒 Privacy Policy
                    </button>
                    <button 
                        onClick={() => { onTabChange('refund-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    >
                        🔄 Refund & Cancellation Policy
                    </button>
                    <button 
                        onClick={() => { onTabChange('terms-of-service'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    >
                        📜 Terms of Service
                    </button>
                    <button 
                        onClick={() => { onTabChange('contact-us'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    >
                        ✉️ Contact Support
                    </button>
                </div>

                <div style={{ color: '#64748b', fontSize: '0.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                    © 2026 VendorsDesk. All rights reserved. | Official Support: hellovendorsdesk@gmail.com
                </div>
            </footer>

        </div>
    );
}
