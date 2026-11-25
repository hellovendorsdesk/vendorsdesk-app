import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { secureFetch } from '../../utils/crypto';

// Subcomponents
import AppSidebar from '../../components/dashboard/AppSidebar';
import MobileHeader from '../../components/dashboard/MobileHeader';
import MobileBottomNav from '../../components/dashboard/MobileBottomNav';
import BillingPlansView from '../../components/dashboard/BillingPlansView';
import AffiliateProgramView from '../../components/dashboard/AffiliateProgramView';

// Tabs
import HomeTab from '../../components/HomeTab';
import OptimizerTab from '../../components/OptimizerTab';
import LabelExporterTab from '../../components/LabelExporterTab';
import CalculatorTab from '../../components/CalculatorTab';
import FreeImageGeneratorTab from '../../components/FreeImageGeneratorTab';
import PnLCalculatorTab from '../../components/PnLCalculatorTab';
import BulkBackgroundRemoverTab from '../../components/BulkBackgroundRemoverTab';
import ListingTemplatesTab from '../../components/ListingTemplatesTab';
import { PrivacyPolicyPage, RefundPolicyPage, TermsOfServicePage, ContactUsPage } from '../marketing/LegalPages';

export default function DashboardShell({ activePage, setActivePage, navigateToPage }) {
    const { currentUser, setCurrentUser, handleLogout, checkUserAuth, openSignupModal } = useAuth();

    // Auto-sync authentication with VendorsDesk Chrome Extension
    useEffect(() => {
        const token = localStorage.getItem('vendorsdesk_token');
        if (token && currentUser) {
            window.postMessage({
                type: 'VENDORSDESK_SYNC_AUTH',
                token,
                user: currentUser,
                apiBase: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://backend.vendorsdesk.in'
            }, '*');
        }
    }, [currentUser]);

    // Billing Upgrade State
    const [selectedPlan, setSelectedPlan] = useState('tier_299');
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState('');
    const [couponError, setCouponError] = useState('');
    const [billingError, setBillingError] = useState('');
    const [billingSuccess, setBillingSuccess] = useState('');
    const [submittingPlanId, setSubmittingPlanId] = useState(null);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [copiedText, setCopiedText] = useState('Copy');
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const handleNavigate = (page) => {
        setMobileNavOpen(false);
        navigateToPage(page);
    };

    const handleApplyCoupon = async () => {
        setCouponError('');
        setCouponMessage('');
        if (!couponCode) return;
        setIsApplyingCoupon(true);

        const token = localStorage.getItem('vendorsdesk_token');
        try {
            const data = await secureFetch('/api/billing/coupon/apply', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { code: couponCode }
            });

            if (data.success) {
                const discount = data.coupon.discountType === 'percentage' 
                    ? `${data.coupon.discountValue}%` 
                    : `₹${data.coupon.discountValue}`;
                setCouponMessage(`Coupon Applied! Discount: ${discount}`);
            } else {
                setCouponError(data.error || 'Invalid coupon.');
            }
        } catch (e) {
            setCouponError('Coupon validation error.');
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const handleSubscribe = async (planToSubscribe) => {
        const targetPlan = planToSubscribe || selectedPlan;
        setBillingError('');
        setBillingSuccess('');
        setSubmittingPlanId(targetPlan);
        const token = localStorage.getItem('vendorsdesk_token');

        if (!token) {
            openSignupModal();
            setSubmittingPlanId(null);
            return;
        }
        
        try {
            const data = await secureFetch('/api/billing/cashfree/create-order', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { plan: targetPlan, couponCode }
            });

            if (data.success && data.paymentSessionId) {
                setBillingSuccess('Redirecting to Cashfree Secure Payment Gateway...');
                
                const triggerCheckout = () => {
                    const cashfree = window.Cashfree({ mode: data.cfEnv === 'PRODUCTION' ? 'production' : 'sandbox' });
                    cashfree.checkout({
                        paymentSessionId: data.paymentSessionId,
                        redirectTarget: '_self'
                    });
                };

                if (!window.Cashfree) {
                    const script = document.createElement('script');
                    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
                    script.onload = triggerCheckout;
                    document.body.appendChild(script);
                } else {
                    triggerCheckout();
                }
                return;
            }

            const fallbackData = await secureFetch('/api/billing/subscribe', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { plan: targetPlan, couponCode }
            });

            if (fallbackData.success) {
                setBillingSuccess(`Upgrade Successful! ${fallbackData.message}`);
                setCouponCode('');
                setCouponMessage('');
                await checkUserAuth();
                setTimeout(() => {
                    setBillingSuccess('');
                    setActivePage('home');
                }, 2000);
            } else {
                setBillingError(data.error || fallbackData.error || 'Subscription failed.');
            }
        } catch (e) {
            console.error('Subscription Error:', e);
            setBillingError('Network subscription failed.');
        } finally {
            setSubmittingPlanId(null);
        }
    };

    const copyReferralLink = () => {
        if (!currentUser) return;
        const refLink = `${window.location.origin}/index.html?ref=${currentUser.referralCode}`;
        navigator.clipboard.writeText(refLink).then(() => {
            setCopiedText('Copied!');
            setTimeout(() => setCopiedText('Copy'), 2000);
        });
    };

    return (
        <div className="dashboard-shell-container">
            {/* Mobile Top Header */}
            <MobileHeader
                handleNavigate={handleNavigate}
                currentUser={currentUser}
                mobileNavOpen={mobileNavOpen}
                setMobileNavOpen={setMobileNavOpen}
            />

            {/* Mobile Backdrop Overlay */}
            <div 
                className={`dashboard-mobile-overlay ${mobileNavOpen ? 'active' : ''}`}
                onClick={() => setMobileNavOpen(false)}
            />

            {/* Desktop / Tablet Sidebar */}
            <AppSidebar
                activePage={activePage}
                handleNavigate={handleNavigate}
                mobileNavOpen={mobileNavOpen}
                currentUser={currentUser}
                handleLogout={handleLogout}
            />

            {/* Main Content Area */}
            <div className="dashboard-main-content">
                <div style={{ width: '100%', maxWidth: '100%' }}>
                    
                    {/* Top 0-Credits Banner Notice */}
                    {currentUser && currentUser.credits <= 0 && currentUser.tier !== 'enterprise' && activePage !== 'billing' && activePage !== 'website' && (
                        <div style={{
                            background: '#0f1422',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '0.85rem 1.25rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block', flexShrink: 0 }} />
                                <div>
                                    <span style={{ fontSize: '0.875rem', color: '#f8fafc', fontWeight: 500, display: 'block' }}>0 credits remaining</span>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Upgrade your plan to generate product images and export shipping labels.</span>
                                </div>
                            </div>
                            <button 
                                style={{
                                    background: '#ffffff',
                                    color: '#080b11',
                                    border: 'none',
                                    padding: '0.55rem 1.1rem',
                                    borderRadius: '8px',
                                    fontSize: '0.825rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                }}
                                onClick={() => setActivePage('billing')}
                            >
                                Upgrade plan
                            </button>
                        </div>
                    )}

                    {/* Page router */}
                    {activePage === 'home' && (
                        <HomeTab onNavigate={(page) => setActivePage(page)} />
                    )}

                    {activePage === 'templates' && (
                        <ListingTemplatesTab />
                    )}

                    {activePage === 'bg-remover' && (
                        <BulkBackgroundRemoverTab />
                    )}

                    {activePage === 'free-image-generator' && (
                        <FreeImageGeneratorTab onRegister={openSignupModal} />
                    )}

                    {(activePage === 'optimizer' || activePage === 'meesho-shipping-rates') && (
                        <div className="main-container">
                            <OptimizerTab 
                                currentUser={currentUser}
                                onCreditsChange={(cr) => setCurrentUser(prev => ({ ...prev, credits: cr }))} 
                                onNavigateToBilling={() => setActivePage('billing')}
                            />
                        </div>
                    )}

                    {activePage === 'pnl-calculator' && (
                        <PnLCalculatorTab />
                    )}

                    {(activePage === 'label-exporter' || activePage === 'meesho-label-exporter') && (
                        <LabelExporterTab 
                            currentUser={currentUser} 
                            onNavigateToBilling={() => setActivePage('billing')} 
                        />
                    )}

                    {(activePage === 'calculator' || activePage === 'margin-calculator') && (
                        <CalculatorTab />
                    )}

                    {(activePage === 'billing' || activePage === 'pricing') && (
                        <BillingPlansView
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                            couponCode={couponCode}
                            setCouponCode={setCouponCode}
                            couponMessage={couponMessage}
                            couponError={couponError}
                            isApplyingCoupon={isApplyingCoupon}
                            handleApplyCoupon={handleApplyCoupon}
                            submittingPlanId={submittingPlanId}
                            billingError={billingError}
                            billingSuccess={billingSuccess}
                            handleSubscribe={handleSubscribe}
                        />
                    )}

                    {activePage === 'affiliate' && (
                        <AffiliateProgramView
                            currentUser={currentUser}
                            copiedText={copiedText}
                            copyReferralLink={copyReferralLink}
                        />
                    )}

                    {activePage === 'privacy-policy' && <PrivacyPolicyPage />}
                    {activePage === 'refund-policy' && <RefundPolicyPage />}
                    {activePage === 'terms-of-service' && <TermsOfServicePage />}
                    {activePage === 'contact-us' && <ContactUsPage />}

                </div>
            </div>

            {/* Mobile Bottom Navigation Bar (< 1024px) */}
            <MobileBottomNav
                activePage={activePage}
                handleNavigate={handleNavigate}
                onOpenMore={() => setMobileNavOpen(true)}
            />
        </div>
    );
}
