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
                apiBase: window.location.hostname.includes('vendorsdesk.in') ? 'https://backend.vendorsdesk.in' : window.location.origin
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
                            background: 'linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)',
                            border: '1px solid #bfdbfe',
                            borderRadius: '14px',
                            padding: '0.9rem 1.25rem',
                            marginBottom: '1.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1.4rem' }}>⚠️</span>
                                <div>
                                    <strong style={{ fontSize: '0.9rem', color: '#1e40af', display: 'block' }}>You have 0 Credits remaining!</strong>
                                    <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>If you want to generate image variations and check lower shipping rates, please purchase a plan.</span>
                                </div>
                            </div>
                            <button 
                                style={{
                                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '10px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                                }}
                                onClick={() => setActivePage('billing')}
                            >
                                💳 Purchase Plan Now
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
