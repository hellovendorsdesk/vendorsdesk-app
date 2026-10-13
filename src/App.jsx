import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import MarketingLandingPage from './pages/marketing/MarketingLandingPage';
import DashboardShell from './pages/dashboard/DashboardShell';
import AuthModal from './components/auth/AuthModal';
import PasswordSetupModal from './components/auth/PasswordSetupModal';
import FeedbackWidget from './components/FeedbackWidget';
import { PAGE_ROUTES, PAGE_PATHS } from './config/routes';
import { updatePageSEO } from './utils/seoManager';
import { secureFetch } from './utils/crypto';

function AppContent() {
    const { 
        currentUser, 
        isLoadingAuth, 
        isAppDomain, 
        authModalOpen,
        openLoginModal, 
        openSignupModal, 
        checkUserAuth
    } = useAuth();

    const [activePage, setActivePage] = useState('home');
    const [activeMarketingTab, setActiveMarketingTab] = useState('meesho-shipping-rates');

    const navigateToPage = (pageKey, pushState = true) => {
        const mappedTab = PAGE_ROUTES[pageKey] || pageKey;
        setActivePage(mappedTab);
        setActiveMarketingTab(mappedTab);
        updatePageSEO(mappedTab);
        const targetPath = PAGE_PATHS[mappedTab] || '/home';
        if (pushState && window.location.pathname !== targetPath) {
            window.history.pushState({ page: mappedTab }, '', targetPath);
        }
    };

    useEffect(() => {
        const currentPath = window.location.pathname.toLowerCase();
        const initialTab = PAGE_ROUTES[currentPath] || 'home';
        setActivePage(initialTab);
        setActiveMarketingTab(initialTab);
        updatePageSEO(initialTab);

        const handlePopState = (e) => {
            const path = window.location.pathname.toLowerCase();
            const pageKey = PAGE_ROUTES[path] || (e.state && e.state.page) || 'meesho-shipping-rates';
            setActivePage(pageKey);
            setActiveMarketingTab(pageKey);
            updatePageSEO(pageKey);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Cashfree verification listener
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const cashfreeOrderId = urlParams.get('cashfree_order_id');
        if (cashfreeOrderId) {
            window.history.replaceState({}, document.title, window.location.pathname);
            verifyCashfreePayment(cashfreeOrderId);
        }
    }, []);

    const verifyCashfreePayment = async (orderId) => {
        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const data = await secureFetch('/api/billing/cashfree/verify', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { orderId }
            });
            if (data.success) {
                await checkUserAuth();
            }
        } catch (e) {
            console.error('Cashfree verify error:', e);
        }
    };

    const handleGoToAppLogin = () => {
        if (window.location.hostname.includes('vendorsdesk.in') && !isAppDomain) {
            window.location.href = 'https://app.vendorsdesk.in?mode=login';
        } else {
            openLoginModal();
        }
    };

    const handleGoToAppSignup = () => {
        if (window.location.hostname.includes('vendorsdesk.in') && !isAppDomain) {
            window.location.href = 'https://app.vendorsdesk.in?mode=signup';
        } else {
            openSignupModal();
        }
    };

    const handleGoToAppDashboard = () => {
        if (window.location.hostname.includes('vendorsdesk.in') && !isAppDomain) {
            const token = localStorage.getItem('vendorsdesk_token');
            window.location.href = token ? `https://app.vendorsdesk.in?token=${token}` : 'https://app.vendorsdesk.in?mode=login';
        } else {
            setActivePage('home');
        }
    };

    if (isLoadingAuth) {
        return (
            <div style={{
                display: 'flex', minHeight: '100vh', width: '100vw',
                background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
                alignItems: 'center', justifyContent: 'center', color: '#ffffff',
                fontFamily: 'Outfit, sans-serif', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute', width: '380px', height: '380px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(124, 58, 237, 0) 70%)',
                    filter: 'blur(45px)', animation: 'pulse 3s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '1.5rem', background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)', padding: '3rem 3.5rem', borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src="/logo-icon.png" alt="VendorsDesk Logo" style={{ height: '48px', width: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        <span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 40%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            VendorsDesk
                        </span>
                    </div>
                    <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', border: '3px solid transparent', borderTopColor: '#3b82f6', borderRightColor: '#8b5cf6', animation: 'spin 1s linear infinite' }} />
                        <div style={{ position: 'absolute', top: '6px', left: '6px', width: '44px', height: '44px', borderRadius: '50%', border: '3px solid transparent', borderBottomColor: '#ec4899', borderLeftColor: '#10b981', animation: 'spin 1.5s linear infinite reverse' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.02em', color: '#f8fafc', marginBottom: '0.35rem' }}>
                            Initializing VendorsDesk Audit Engine...
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.05em' }}>
                            SMART TOOLS FOR SMART SELLERS
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 1. On main website domain (vendorsdesk.in): ALWAYS render Marketing Site
    if (!isAppDomain && window.location.hostname.includes('vendorsdesk.in')) {
        return (
            <>
                <MarketingLandingPage 
                    currentUser={currentUser}
                    activeTab={activeMarketingTab} 
                    onTabChange={(tabKey) => navigateToPage(tabKey)} 
                    onLogin={handleGoToAppLogin}
                    onRegister={handleGoToAppSignup}
                    onGoToDashboard={handleGoToAppDashboard}
                />
                <FeedbackWidget currentUser={currentUser} />
                <AuthModal />
                <PasswordSetupModal />
            </>
        );
    }

    // 2. On app.vendorsdesk.in: If not logged in, ask for credentials or redirect to vendorsdesk.in if modal closed
    if (!currentUser) {
        if (!authModalOpen && window.location.hostname.includes('vendorsdesk.in')) {
            window.location.href = 'https://vendorsdesk.in';
            return null;
        }
        return (
            <>
                <MarketingLandingPage 
                    currentUser={null}
                    activeTab={activeMarketingTab} 
                    onTabChange={(tabKey) => navigateToPage(tabKey)} 
                    onLogin={handleGoToAppLogin}
                    onRegister={handleGoToAppSignup}
                    onGoToDashboard={handleGoToAppDashboard}
                />
                <FeedbackWidget currentUser={null} />
                <AuthModal />
                <PasswordSetupModal />
            </>
        );
    }

    // 3. User is logged in -> Render User Panel / Dashboard Shell
    if (activePage === 'website') {
        return (
            <>
                <MarketingLandingPage 
                    currentUser={currentUser}
                    activeTab={activeMarketingTab} 
                    onTabChange={(tabKey) => navigateToPage(tabKey)} 
                    onLogin={handleGoToAppLogin}
                    onRegister={handleGoToAppSignup}
                    onGoToDashboard={handleGoToAppDashboard}
                />
                <AuthModal />
                <PasswordSetupModal />
            </>
        );
    }

    return (
        <>
            <DashboardShell 
                activePage={activePage} 
                setActivePage={setActivePage} 
                navigateToPage={navigateToPage} 
            />
            <AuthModal />
            <PasswordSetupModal />
        </>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
