import React, { useState } from 'react';
import { 
    Layers, 
    ChevronDown, 
    Menu, 
    X, 
    ShieldCheck, 
    ArrowRight, 
    Sparkles, 
    CreditCard, 
    Headphones, 
    Image, 
    TrendingDown, 
    FileSpreadsheet, 
    Printer, 
    Lock, 
    RotateCcw, 
    FileText, 
    Mail,
    Plus,
    Minus
} from 'lucide-react';
import BulkBackgroundRemoverTab from '../../components/BulkBackgroundRemoverTab';
import FreeImageGeneratorTab from '../../components/FreeImageGeneratorTab';
import PnLCalculatorTab from '../../components/PnLCalculatorTab';
import ListingTemplatesTab from '../../components/ListingTemplatesTab';
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
        'home', 'templates', 'bg-remover', 'free-image-generator', 'meesho-shipping-rates', 
        'pnl-calculator', 'meesho-image-generator', 'meesho-label-exporter', 
        'pricing', 'billing', 'privacy-policy', 'refund-policy', 'terms-of-service', 'contact-us',
        'optimizer', 'label-exporter', 'calculator', 'affiliate'
    ];

    return (
        <div style={{ minHeight: '100vh', width: '100%', maxWidth: '100vw', background: 'var(--bg-gradient)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
            
            {/* ── Header / Navbar ────────────────────────────────────────── */}
            <header className="site-header" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid #e2e8f0',
                boxShadow: '0 2px 12px rgba(15, 23, 42, 0.04)',
                padding: '0.75rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 990,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Brand Logo */}
                <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
                    onClick={() => { onTabChange('meesho-shipping-rates'); setMobileMenuOpen(false); }}
                >
                    <img 
                        src="/logo-icon.png" 
                        alt="VendorsDesk Official Logo" 
                        style={{ height: '34px', width: 'auto', objectFit: 'contain' }} 
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                        VendorsDesk
                    </span>
                </div>
                
                {/* Desktop Navigation Links */}
                <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {/* Free Tools Dropdown */}
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
                                gap: '0.45rem',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                padding: '0.55rem 0.95rem',
                                borderRadius: '10px',
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                color: '#0f172a',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Layers size={15} color="#2563eb" />
                            <span>Free Tools</span>
                            <span style={{ fontSize: '0.65rem', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.1rem 0.4rem', borderRadius: '6px', fontWeight: 700 }}>5 SUITE</span>
                            <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: isToolsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </button>

                        {isToolsDropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '330px',
                                background: '#ffffff',
                                border: '1px solid #cbd5e1',
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px -8px rgba(15, 23, 42, 0.15)',
                                padding: '0.65rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.35rem',
                                zIndex: 1000,
                            }}>
                                <div 
                                    onClick={() => { onTabChange('meesho-shipping-rates'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: activeTab === 'meesho-shipping-rates' ? '#f1f5f9' : 'transparent' }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <TrendingDown size={17} color="#2563eb" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Freight &amp; Slab Optimizer</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Audit lowest courier freight slabs</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('free-image-generator'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image size={17} color="#2563eb" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Anti-Duplicate Image Studio</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Bypass duplicate listing bans</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('meesho-label-exporter'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Printer size={17} color="#2563eb" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>4×6 Thermal Label Cropper</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Organize PDF invoices by SKU</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('pnl-calculator'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem' }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FileSpreadsheet size={17} color="#2563eb" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Net P&amp;L Settlement Sheet</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Track real returns &amp; deduction margins</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        className={`nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
                        onClick={() => onTabChange('pricing')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            padding: '0.55rem 0.85rem',
                            borderRadius: '10px',
                            background: 'transparent',
                            border: '1px solid transparent',
                            color: '#475569',
                            cursor: 'pointer'
                        }}
                    >
                        <CreditCard size={15} />
                        <span>Pricing &amp; Affiliate</span>
                    </button>

                    <button 
                        className={`nav-link ${activeTab === 'contact-us' ? 'active' : ''}`}
                        onClick={() => onTabChange('contact-us')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            padding: '0.55rem 0.85rem',
                            borderRadius: '10px',
                            background: 'transparent',
                            border: '1px solid transparent',
                            color: '#475569',
                            cursor: 'pointer'
                        }}
                    >
                        <Headphones size={15} />
                        <span>Support</span>
                    </button>
                </nav>

                {/* Right CTA Actions */}
                <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {currentUser ? (
                        <button 
                            className="btn-primary" 
                            onClick={onGoToDashboard}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                        >
                            <span>Open Console</span>
                            <ArrowRight size={15} />
                        </button>
                    ) : (
                        <>
                            <button 
                                className="btn-action" 
                                onClick={onLogin}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                            >
                                Sign In
                            </button>
                            <button 
                                className="btn-primary" 
                                onClick={onRegister}
                                style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                            >
                                <Sparkles size={14} />
                                <span>Get Started</span>
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Toggle Button */}
                <button 
                    className="mobile-hamburger-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                    style={{
                        display: 'none',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '10px',
                        width: '40px',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#0f172a'
                    }}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Mobile Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="mobile-menu-drawer">
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.4rem 0.5rem' }}>
                            Supplier Growth Tools
                        </div>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'meesho-shipping-rates' ? 'active' : ''}`}
                            onClick={() => { onTabChange('meesho-shipping-rates'); setMobileMenuOpen(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                        >
                            <TrendingDown size={16} color="#2563eb" />
                            <span>Freight &amp; Rate Optimizer</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'free-image-generator' ? 'active' : ''}`}
                            onClick={() => { onTabChange('free-image-generator'); setMobileMenuOpen(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                        >
                            <Image size={16} color="#2563eb" />
                            <span>Anti-Duplicate Catalog Studio</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'meesho-label-exporter' ? 'active' : ''}`}
                            onClick={() => { onTabChange('meesho-label-exporter'); setMobileMenuOpen(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                        >
                            <Printer size={16} color="#2563eb" />
                            <span>4×6 Thermal Label Cropper</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'pnl-calculator' ? 'active' : ''}`}
                            onClick={() => { onTabChange('pnl-calculator'); setMobileMenuOpen(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                        >
                            <FileSpreadsheet size={16} color="#2563eb" />
                            <span>P&amp;L Settlement Sheet</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
                            onClick={() => { onTabChange('pricing'); setMobileMenuOpen(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                        >
                            <CreditCard size={16} color="#475569" />
                            <span>Pricing &amp; Affiliate</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'contact-us' ? 'active' : ''}`}
                            onClick={() => { onTabChange('contact-us'); setMobileMenuOpen(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                        >
                            <Headphones size={16} color="#475569" />
                            <span>Contact &amp; Support</span>
                        </button>

                        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.5rem 0' }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button 
                                className="btn-action" 
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    onLogin(); 
                                    setMobileMenuOpen(false); 
                                }}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                Sign In
                            </button>
                            <button 
                                className="btn-primary" 
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    onRegister(); 
                                    setMobileMenuOpen(false); 
                                }}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                Get Started (3 Free Credits)
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* ── Subpages Routing ───────────────────────────────────────── */}
            {activeTab === 'templates' && <div style={{ padding: '2rem 1.25rem' }}><ListingTemplatesTab /></div>}
            {activeTab === 'bg-remover' && <div style={{ padding: '2rem 1.25rem' }}><BulkBackgroundRemoverTab /></div>}
            {(activeTab === 'free-image-generator' || activeTab === 'meesho-image-generator') && <div style={{ padding: '2rem 1.25rem' }}><FreeImageGeneratorTab onRegister={onRegister} /></div>}
            {(activeTab === 'meesho-shipping-rates' || activeTab === 'home' || activeTab === 'optimizer' || activeTab === 'calculator') && <MeeshoShippingRatesPage onRegister={onRegister} />}
            {activeTab === 'pnl-calculator' && <div style={{ padding: '2rem 1.25rem' }}><PnLCalculatorTab /></div>}
            {(activeTab === 'meesho-label-exporter' || activeTab === 'label-exporter') && <MeeshoLabelExporterPage onRegister={onRegister} />}
            {(activeTab === 'pricing' || activeTab === 'affiliate' || activeTab === 'billing') && <PricingAffiliatePage onRegister={onRegister} />}
            {activeTab === 'privacy-policy' && <PrivacyPolicyPage />}
            {activeTab === 'refund-policy' && <RefundPolicyPage />}
            {activeTab === 'terms-of-service' && <TermsOfServicePage />}
            {activeTab === 'contact-us' && <ContactUsPage />}

            {!validTabs.includes(activeTab) && (
                <NotFoundPage onReturnHome={() => onTabChange('meesho-shipping-rates')} />
            )}

            {/* ── FAQs Accordion Section ─────────────────────────────────── */}
            {(activeTab === 'meesho-shipping-rates' || activeTab === 'home') && (
                <section id="faqs" style={{ padding: '4.5rem 1.25rem 5rem 1.25rem', maxWidth: '820px', margin: '0 auto', boxSizing: 'border-box' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: '#f1f5f9',
                            color: '#475569',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '0.5rem'
                        }}>
                            <span>Frequently Asked Questions</span>
                        </div>
                        <h2 style={{ fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
                            Clear Answers for Sellers
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                            {
                                q: "What is VendorsDesk and how does it optimize Meesho shipping?",
                                a: "VendorsDesk cross-references actual packaged product variation weights against the shipping rate slabs logged by logistics partners on the Meesho Supplier Panel, flagging and fixing wrongful shipping charge leakages."
                            },
                            {
                                q: "Is it secure to link my Meesho account or session keys?",
                                a: "Absolutely. We do not store master passwords or sensitive credentials. All checks are processed client-side with encrypted payloads, ensuring complete panel compliance."
                            },
                            {
                                q: "How does the SKU-wise Return Risk Auditor work?",
                                a: "Our SKU Return Risk Auditor pulls actual product payouts and matches them with RTO returns records, identifying listings that produce negative profits due to excessive return penalties."
                            },
                            {
                                q: "How do I claim my 3 free query credits?",
                                a: "Simply sign up with your email ID. 3 credits are added instantly to your balance so you can test freight slab auditing and label cropping right away."
                            }
                        ].map((faq, idx) => {
                            const isOpen = !!faqOpen[idx];
                            return (
                                <div 
                                    key={idx} 
                                    style={{ 
                                        background: '#ffffff', 
                                        border: '1px solid #e2e8f0', 
                                        borderRadius: '14px', 
                                        padding: '1.15rem 1.25rem', 
                                        cursor: 'pointer',
                                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                                        boxShadow: isOpen ? '0 4px 16px rgba(15, 23, 42, 0.05)' : 'none'
                                    }} 
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                        <strong style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, lineHeight: '1.4' }}>
                                            {faq.q}
                                        </strong>
                                        <div style={{
                                            width: '26px',
                                            height: '26px',
                                            borderRadius: '6px',
                                            background: isOpen ? '#eff6ff' : '#f8fafc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#2563eb',
                                            flexShrink: 0
                                        }}>
                                            {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                                        </div>
                                    </div>
                                    {isOpen && (
                                        <div style={{ marginTop: '0.75rem', fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ── Modern Footer ──────────────────────────────────────────── */}
            <footer style={{ padding: '3.5rem 1.25rem 2.5rem 1.25rem', background: '#ffffff', borderTop: '1px solid #e2e8f0', textAlign: 'center', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={16} color="#2563eb" />
                    </div>
                    <span style={{ fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#0f172a' }}>
                        VendorsDesk
                    </span>
                </div>
                
                <p style={{ color: '#64748b', fontSize: '0.82rem', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: '1.5' }}>
                    VendorsDesk is an independent optimization platform for e-commerce suppliers. All audits are derived dynamically via secure user tokens.
                </p>

                {/* Legal & Policy Links */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', rowGap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.82rem' }}>
                    <button 
                        onClick={() => { onTabChange('privacy-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <Lock size={13} />
                        <span>Privacy Policy</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('refund-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <RotateCcw size={13} />
                        <span>Refund Policy</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('terms-of-service'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <FileText size={13} />
                        <span>Terms of Service</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('contact-us'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <Mail size={13} />
                        <span>Contact Support</span>
                    </button>
                </div>

                <div style={{ color: '#94a3b8', fontSize: '0.74rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                    © 2026 VendorsDesk. All rights reserved. | Official Support: hellovendorsdesk@gmail.com
                </div>
            </footer>

        </div>
    );
}
