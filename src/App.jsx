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
                background: '#080b11',
                alignItems: 'center', justifyContent: 'center', color: '#ffffff',
                fontFamily: 'Inter, sans-serif'
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '1.25rem', background: '#0f1422',
                    padding: '2.5rem 3rem', borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img src="/logo-icon.png" alt="VendorsDesk Logo" style={{ height: '36px', width: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        <span style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#ffffff', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            VendorsDesk
                        </span>
                    </div>
                    <div style={{
                        width: '28px', height: '28px',
                        borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderTopColor: '#38bdf8', animation: 'spin 0.8s linear infinite'
                    }} />
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        Loading seller workspace...
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

    // 2. On app.vendorsdesk.in: If not logged in, render marketing/tools preview and provide login modal
    if (!currentUser) {
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
