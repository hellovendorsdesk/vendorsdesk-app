import React, { useState } from 'react';
import { 
    Layers, 
    ChevronDown, 
    Menu, 
    X, 
    ShieldCheck, 
    ArrowRight, 
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
            
            {/* Header / Floating Island Navbar */}
            <header className="site-header" style={{
                background: 'rgba(12, 14, 20, 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                padding: '0.6rem 1.25rem',
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
                        style={{ height: '30px', width: 'auto', objectFit: 'contain' }} 
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
                        VendorsDesk
                    </span>
                </div>
                
                {/* Desktop Navigation Links */}
                <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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
                                fontWeight: 500,
                                fontSize: '0.85rem',
                                padding: '0.5rem 0.85rem',
                                borderRadius: '9999px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                color: '#ffffff',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            <Layers size={15} color="#38bdf8" />
                            <span>Free tools</span>
                            <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.08)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>5 tools</span>
                            <ChevronDown size={14} color="#94a3b8" style={{ transition: 'transform 0.2s', transform: isToolsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </button>

                        {isToolsDropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                left: 0,
                                width: '320px',
                                background: '#0f1422',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '14px',
                                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6)',
                                padding: '0.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem',
                                zIndex: 1000,
                            }}>
                                <div 
                                    onClick={() => { onTabChange('meesho-shipping-rates'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.6rem 0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: activeTab === 'meesho-shipping-rates' ? 'rgba(56, 189, 248, 0.08)' : 'transparent', transition: 'background 0.15s ease' }}
                                >
                                    <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <TrendingDown size={16} color="#38bdf8" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ffffff' }}>Freight & slab optimizer</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Audit lowest courier freight slabs</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('free-image-generator'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.6rem 0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'transparent', transition: 'background 0.15s ease' }}
                                >
                                    <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image size={16} color="#38bdf8" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ffffff' }}>Anti-duplicate image studio</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Bypass duplicate listing bans</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('meesho-label-exporter'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.6rem 0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'transparent', transition: 'background 0.15s ease' }}
                                >
                                    <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Printer size={16} color="#38bdf8" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ffffff' }}>4×6 thermal label cropper</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Organize PDF invoices by SKU</div>
                                    </div>
                                </div>

                                <div 
                                    onClick={() => { onTabChange('pnl-calculator'); setIsToolsDropdownOpen(false); }}
                                    style={{ padding: '0.6rem 0.75rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'transparent', transition: 'background 0.15s ease' }}
                                >
                                    <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FileSpreadsheet size={16} color="#38bdf8" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ffffff' }}>Net P&L settlement sheet</div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Calculate returns & deductions</div>
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
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            padding: '0.5rem 0.8rem',
                            borderRadius: '9999px',
                            background: 'transparent',
                            border: '1px solid transparent',
                            color: activeTab === 'pricing' ? '#38bdf8' : '#94a3b8',
                            cursor: 'pointer'
                        }}
                    >
                        <CreditCard size={15} />
                        <span>Pricing & affiliate</span>
                    </button>

                    <button 
                        className={`nav-link ${activeTab === 'contact-us' ? 'active' : ''}`}
                        onClick={() => onTabChange('contact-us')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            padding: '0.5rem 0.8rem',
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
                            <span>Open console</span>
                            <ArrowRight size={14} />
                        </button>
                    ) : (
                        <>
                            <button 
                                className="btn-action" 
                                onClick={onLogin}
                                style={{ padding: '0.5rem 0.95rem', fontSize: '0.85rem' }}
                            >
                                Sign in
                            </button>
                            <button 
                                className="btn-primary" 
                                onClick={onRegister}
                                style={{
                                    padding: '0.5rem 1.15rem',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <span>Get started</span>
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
                        borderRadius: '8px',
                        width: '36px',
                        height: '36px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#ffffff'
                    }}
                >
                    {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>

                {/* Mobile Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="mobile-menu-drawer" style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        left: 0,
                        right: 0,
                        background: '#0c0e14',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '1.25rem',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', padding: '0.2rem 0.5rem' }}>
                            Seller growth tools
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
                                borderRadius: '10px'
                            }}
                        >
                            <TrendingDown size={16} color="#38bdf8" />
                            <span>Freight & rate optimizer</span>
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
                                borderRadius: '10px'
                            }}
                        >
                            <Image size={16} color="#38bdf8" />
                            <span>Anti-duplicate catalog studio</span>
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
                                borderRadius: '10px'
                            }}
                        >
                            <Printer size={16} color="#38bdf8" />
                            <span>4×6 thermal label cropper</span>
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
                                borderRadius: '10px'
                            }}
                        >
                            <FileSpreadsheet size={16} color="#38bdf8" />
                            <span>P&L settlement sheet</span>
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
                                borderRadius: '10px'
                            }}
                        >
                            <CreditCard size={16} color="#94a3b8" />
                            <span>Pricing & affiliate</span>
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
                                borderRadius: '10px'
                            }}
                        >
                            <Headphones size={16} color="#94a3b8" />
                            <span>Support</span>
                        </button>

                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '0.4rem 0' }} />

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
                                Sign in
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
                                Get started (3 free credits)
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Subpages Routing */}
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

            {/* FAQs Accordion Section */}
            {(activeTab === 'meesho-shipping-rates' || activeTab === 'home') && (
                <section id="faqs" style={{ padding: '3.5rem 1.25rem 4.5rem 1.25rem', maxWidth: '820px', margin: '0 auto', boxSizing: 'border-box' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid rgba(56, 189, 248, 0.22)',
                            color: '#38bdf8',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            marginBottom: '0.5rem'
                        }}>
                            <ShieldCheck size={12} color="#38bdf8" />
                            <span>Frequently asked questions</span>
                        </div>
                        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
                            Answers for sellers
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {[
                            {
                                q: "What is VendorsDesk and how does it optimize Meesho shipping?",
                                a: "VendorsDesk cross-references actual packaged product variation weights against the shipping rate slabs logged by logistics partners on the Meesho Supplier Panel, flagging and fixing wrongful shipping charge leakages."
                            },
                            {
                                q: "Is it secure to link my Meesho account or session keys?",
                                a: "Yes. We do not store master passwords or sensitive credentials. All checks are processed client-side with encrypted payloads, ensuring complete panel compliance."
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
                                        background: isOpen ? '#141a29' : '#0f1422', 
                                        border: isOpen ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)', 
                                        borderRadius: '12px', 
                                        padding: '1.1rem 1.25rem', 
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }} 
                                    onClick={() => toggleFaq(idx)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                        <strong style={{ fontSize: '0.925rem', color: '#ffffff', fontWeight: 600, lineHeight: '1.4' }}>
                                            {faq.q}
                                        </strong>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '6px',
                                            background: isOpen ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#38bdf8',
                                            flexShrink: 0
                                        }}>
                                            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                                        </div>
                                    </div>
                                    {isOpen && (
                                        <div style={{ marginTop: '0.65rem', fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.65rem' }}>
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
            <footer style={{ padding: '3rem 1.25rem 2rem 1.25rem', background: '#080b11', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <img 
                        src="/logo-icon.png" 
                        alt="VendorsDesk" 
                        style={{ height: '22px', width: 'auto', objectFit: 'contain' }} 
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#ffffff' }}>
                        VendorsDesk
                    </span>
                </div>
                
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', maxWidth: '560px', margin: '0 auto 1.25rem auto', lineHeight: 1.6 }}>
                    Independent utility platform for e-commerce suppliers. All audits and label crops are processed client-side.
                </p>

                {/* Legal & Policy Links */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem', rowGap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
                    <button 
                        onClick={() => { onTabChange('privacy-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <Lock size={12} />
                        <span>Privacy policy</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('refund-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <RotateCcw size={12} />
                        <span>Refund policy</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('terms-of-service'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <FileText size={12} />
                        <span>Terms of service</span>
                    </button>
                    <button 
                        onClick={() => { onTabChange('contact-us'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                        <Mail size={12} />
                        <span>Support</span>
                    </button>
                </div>

                <div style={{ color: '#64748b', fontSize: '0.72rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem' }}>
                    © 2026 VendorsDesk. All rights reserved. | Official support: hellovendorsdesk@gmail.com
                </div>
            </footer>

        </div>
    );
}
