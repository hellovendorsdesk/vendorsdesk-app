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
        <div style={{ minHeight: '100vh', width: '100%', maxWidth: '100vw', background: '#080b11', color: '#f8fafc', overflowX: 'hidden' }}>
            
            {/* ── Header / Floating Island Navbar ────────────────────────── */}
            <header className="site-header" style={{
                background: 'rgba(13, 18, 31, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                padding: '0.65rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: '0.75rem',
                zIndex: 990,
                width: 'calc(100% - 1.5rem)',
                maxWidth: '1140px',
                margin: '0.5rem auto 1rem auto',
                borderRadius: '9999px',
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
                        style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
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
                                padding: '0.5rem 0.95rem',
                                borderRadius: '9999px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Layers size={15} color="#38bdf8" />
                            <span>Free Tools</span>
                            <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '0.1rem 0.4rem', borderRadius: '6px', fontWeight: 700 }}>5 SUITE</span>
                            <ChevronDown size={14} color="#94a3b8" style={{ transition: 'transform 0.2s', transform: isToolsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </button>

                        {isToolsDropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 10px)',
                                left: 0,
                                width: '330px',
                                background: 'rgba(13, 18, 31, 0.96)',
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '18px',
                                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                                padding: '0.65rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.35rem',
                                zIndex: 1000,
                            }}>
                                <div 
                                    onClick={() => { onTabChange('meesho-shipping-rates'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: activeTab === 'meesho-shipping-rates' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', transition: 'background 0.15s ease' }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <TrendingDown size={17} color="#38bdf8" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>Freight &amp; Slab Optimizer</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Audit lowest courier freight slabs</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('free-image-generator'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'transparent', transition: 'background 0.15s ease' }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image size={17} color="#38bdf8" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>Anti-Duplicate Image Studio</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Bypass duplicate listing bans</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('meesho-label-exporter'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'transparent', transition: 'background 0.15s ease' }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Printer size={17} color="#38bdf8" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>4×6 Thermal Label Cropper</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Organize PDF invoices by SKU</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('pnl-calculator'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.65rem 0.75rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'transparent', transition: 'background 0.15s ease' }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FileSpreadsheet size={17} color="#38bdf8" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>Net P&amp;L Settlement Sheet</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Track real returns &amp; deduction margins</div>
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
                            borderRadius: '9999px',
                            background: 'transparent',
                            border: '1px solid transparent',
                            color: activeTab === 'pricing' ? '#38bdf8' : '#94a3b8',
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
                            borderRadius: '9999px',
                            background: 'transparent',
                            border: '1px solid transparent',
                            color: activeTab === 'contact-us' ? '#38bdf8' : '#94a3b8',
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
                                style={{
                                    padding: '0.55rem 1.25rem',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.45rem',
                                    background: '#ffffff',
                                    color: '#080b11',
                                    borderRadius: '9999px',
                                    fontWeight: 700,
                                    boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                <Sparkles size={14} color="#080b11" />
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
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '10px',
                        width: '40px',
                        height: '40px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#ffffff'
                    }}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Mobile Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="mobile-menu-drawer" style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        left: 0,
                        right: 0,
                        background: 'rgba(13, 18, 31, 0.98)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '20px',
                        padding: '1.25rem',
                        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem'
                    }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.2rem 0.5rem' }}>
                            Supplier Growth Tools
                        </div>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'meesho-shipping-rates' ? 'active' : ''}`}
                            onClick={() => { onTabChange('meesho-shipping-rates'); setMobileMenuOpen(false); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: activeTab === 'meesho-shipping-rates' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                border: activeTab === 'meesho-shipping-rates' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.07)',
                                color: activeTab === 'meesho-shipping-rates' ? '#38bdf8' : '#ffffff',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px'
                            }}
                        >
                            <TrendingDown size={16} color="#38bdf8" />
                            <span>Freight &amp; Rate Optimizer</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'free-image-generator' ? 'active' : ''}`}
                            onClick={() => { onTabChange('free-image-generator'); setMobileMenuOpen(false); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: activeTab === 'free-image-generator' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                border: activeTab === 'free-image-generator' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.07)',
                                color: activeTab === 'free-image-generator' ? '#38bdf8' : '#ffffff',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px'
                            }}
                        >
                            <Image size={16} color="#38bdf8" />
                            <span>Anti-Duplicate Catalog Studio</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'meesho-label-exporter' ? 'active' : ''}`}
                            onClick={() => { onTabChange('meesho-label-exporter'); setMobileMenuOpen(false); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: activeTab === 'meesho-label-exporter' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                border: activeTab === 'meesho-label-exporter' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.07)',
                                color: activeTab === 'meesho-label-exporter' ? '#38bdf8' : '#ffffff',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px'
                            }}
                        >
                            <Printer size={16} color="#38bdf8" />
                            <span>4×6 Thermal Label Cropper</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'pnl-calculator' ? 'active' : ''}`}
                            onClick={() => { onTabChange('pnl-calculator'); setMobileMenuOpen(false); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: activeTab === 'pnl-calculator' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                border: activeTab === 'pnl-calculator' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.07)',
                                color: activeTab === 'pnl-calculator' ? '#38bdf8' : '#ffffff',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px'
                            }}
                        >
                            <FileSpreadsheet size={16} color="#38bdf8" />
                            <span>P&amp;L Settlement Sheet</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
                            onClick={() => { onTabChange('pricing'); setMobileMenuOpen(false); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: activeTab === 'pricing' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                border: activeTab === 'pricing' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.07)',
                                color: activeTab === 'pricing' ? '#38bdf8' : '#ffffff',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px'
                            }}
                        >
                            <CreditCard size={16} color="#94a3b8" />
                            <span>Pricing &amp; Affiliate</span>
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'contact-us' ? 'active' : ''}`}
                            onClick={() => { onTabChange('contact-us'); setMobileMenuOpen(false); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: activeTab === 'contact-us' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                                border: activeTab === 'contact-us' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.07)',
                                color: activeTab === 'contact-us' ? '#38bdf8' : '#ffffff',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px'
                            }}
                        >
                            <Headphones size={16} color="#94a3b8" />
                            <span>Contact &amp; Support</span>
                        </button>

                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '0.5rem 0' }} />

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
                                style={{ width: '100%', justifyContent: 'center', background: '#ffffff', color: '#080b11', fontWeight: 700 }}
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
                            background: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid rgba(56, 189, 248, 0.22)',
                            color: '#38bdf8',
                            padding: '0.3rem 0.85rem',
                            borderRadius: '9999px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '0.75rem'
                        }}>
                            <Sparkles size={12} color="#38bdf8" />
                            <span>Frequently Asked Questions</span>
                        </div>
                        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
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
                                        background: isOpen ? 'rgba(56, 189, 248, 0.03)' : 'rgba(255, 255, 255, 0.02)', 
                                        border: isOpen ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)', 
                                        borderRadius: '16px', 
                                        padding: '1.15rem 1.25rem', 
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: isOpen ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none'
                                    }} 
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                        <strong style={{ fontSize: '0.95rem', color: '#ffffff', fontWeight: 700, lineHeight: '1.4' }}>
                                            {faq.q}
                                        </strong>
                                        <div style={{
                                            width: '26px',
                                            height: '26px',
                                            borderRadius: '6px',
                                            background: isOpen ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#38bdf8',
                                            flexShrink: 0
                                        }}>
                                            {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                                        </div>
                                    </div>
                                    {isOpen && (
                                        <div style={{ marginTop: '0.75rem', fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.6', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem' }}>
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ── Modern Obsidian Footer ──────────────────────────────────── */}
            <footer style={{ padding: '3.5rem 1.25rem 2.5rem 1.25rem', background: '#05070b', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={16} color="#38bdf8" />
                    </div>
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#ffffff' }}>
                        VendorsDesk
                    </span>
                </div>
                
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                    VendorsDesk is an independent optimization platform for e-commerce suppliers. All audits are derived dynamically via secure user tokens.
                </p>

                {/* Legal & Policy Links */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem', rowGap: '0.65rem', marginBottom: '1.75rem', fontSize: '0.82rem' }}>
                    <button 
                        onClick={() => { onTabChange('privacy-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <Lock size={13} />
                        <span>Privacy Policy</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('refund-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <RotateCcw size={13} />
                        <span>Refund Policy</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('terms-of-service'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <FileText size={13} />
                        <span>Terms of Service</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('contact-us'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <Mail size={13} />
                        <span>Contact Support</span>
                    </button>
                </div>

                <div style={{ color: '#64748b', fontSize: '0.74rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem' }}>
                    © 2026 VendorsDesk. All rights reserved. | Official Support: hellovendorsdesk@gmail.com
                </div>
            </footer>

        </div>
    );
}
