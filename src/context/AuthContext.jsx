import React, { createContext, useContext, useState, useEffect } from 'react';
import { secureFetch } from '../utils/crypto';
import { checkIsAppDomain } from '../config/routes';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    
    // Auth Modal States
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [referralCodeInput, setReferralCodeInput] = useState('');
    const [authError, setAuthError] = useState('');
    const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

    // Google hybrid credentials state
    const [passwordSetupOpen, setPasswordSetupOpen] = useState(false);
    const [googleEmail, setGoogleEmail] = useState('');
    const [setupPassword, setSetupPassword] = useState('');
    const [setupError, setSetupError] = useState('');
    const [setupSuccess, setSetupSuccess] = useState('');

    const isAppDomain = checkIsAppDomain();

    const checkUserAuth = async () => {
        setIsLoadingAuth(true);
        const token = localStorage.getItem('vendorsdesk_token');
        if (!token) {
            setIsLoadingAuth(false);
            if (isAppDomain) {
                setAuthModalOpen(true);
            }
            return;
        }

        try {
            const data = await secureFetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (data.success) {
                setCurrentUser(data.user);
                setAuthModalOpen(false);
            } else {
                localStorage.removeItem('vendorsdesk_token');
                setCurrentUser(null);
                if (isAppDomain) {
                    setAuthModalOpen(true);
                }
            }
        } catch (e) {
            console.error('Auth check error:', e);
            if (isAppDomain) {
                setAuthModalOpen(true);
            }
        } finally {
            setIsLoadingAuth(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');
        const tokenParam = urlParams.get('token');
        const modeParam = urlParams.get('mode');

        if (tokenParam) {
            localStorage.setItem('vendorsdesk_token', tokenParam);
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (ref) {
            setAuthMode('signup');
            setReferralCodeInput(ref);
            setAuthModalOpen(true);
        } else if (modeParam === 'login' || modeParam === 'signup') {
            setAuthMode(modeParam);
            setAuthModalOpen(true);
        }

        checkUserAuth();
    }, []);

    const handleCloseAuthModal = () => {
        setAuthModalOpen(false);
        setAuthError('');
        if (isAppDomain && !currentUser) {
            if (window.location.hostname.includes('vendorsdesk.in')) {
                window.location.href = 'https://vendorsdesk.in';
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('vendorsdesk_token');
        setCurrentUser(null);
        if (isAppDomain && window.location.hostname.includes('vendorsdesk.in')) {
            window.location.href = 'https://vendorsdesk.in';
        } else {
            setAuthModalOpen(true);
        }
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        setIsAuthSubmitting(true);

        const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
        const payload = authMode === 'login' 
            ? { email, password } 
            : { name, email, password, referralCode: referralCodeInput };

        try {
            const data = await secureFetch(endpoint, {
                method: 'POST',
                body: payload
            });

            if (data && data.success) {
                localStorage.setItem('vendorsdesk_token', data.token);
                setName('');
                setEmail('');
                setPassword('');
                setReferralCodeInput('');
                await checkUserAuth();
            } else {
                const errMsg = data && data.error ? data.error : 'Authentication failed. Please check your details.';
                setAuthError(errMsg);
                if (authMode === 'signup' && (errMsg.includes('already registered') || errMsg.includes('already exists'))) {
                    setTimeout(() => {
                        setAuthMode('login');
                        setAuthError('An account with this email already exists. Please sign in below!');
                    }, 1200);
                }
            }
        } catch (err) {
            setAuthError(err && err.message ? err.message : 'Connection failed. Try again.');
        } finally {
            setIsAuthSubmitting(false);
        }
    };

    const processGoogleLogin = async (googleToken) => {
        setAuthError('');
        try {
            const data = await secureFetch('/api/auth/google', {
                method: 'POST',
                body: { token: googleToken }
            });

            if (data.success) {
                localStorage.setItem('vendorsdesk_token', data.token);
                if (data.isNewUser) {
                    setGoogleEmail(data.email);
                    setPasswordSetupOpen(true);
                    setAuthModalOpen(false);
                } else {
                    await checkUserAuth();
                    setAuthModalOpen(false);
                }
            } else {
                setAuthError(data.error || 'Google login verification failed.');
            }
        } catch (err) {
            setAuthError('Network communication failed.');
        }
    };

    const handlePasswordSetupSubmit = async (e) => {
        e.preventDefault();
        setSetupError('');
        setSetupSuccess('');

        if (setupPassword.length < 6) {
            setSetupError('Password must be at least 6 characters long.');
            return;
        }

        const token = localStorage.getItem('vendorsdesk_token');
        try {
            const data = await secureFetch('/api/auth/set-password', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { password: setupPassword }
            });

            if (data.success) {
                setSetupSuccess('Password configured successfully! Redirecting...');
                setTimeout(async () => {
                    setPasswordSetupOpen(false);
                    setSetupPassword('');
                    await checkUserAuth();
                }, 2000);
            } else {
                setSetupError(data.error || 'Could not configure password.');
            }
        } catch (err) {
            setSetupError('Failed to establish connection.');
        }
    };

    const openLoginModal = () => {
        setAuthMode('login');
        setAuthModalOpen(true);
    };

    const openSignupModal = () => {
        setAuthMode('signup');
        setAuthModalOpen(true);
    };

    return (
        <AuthContext.Provider value={{
            currentUser,
            setCurrentUser,
            isLoadingAuth,
            isAppDomain,
            authModalOpen,
            setAuthModalOpen,
            authMode,
            setAuthMode,
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            referralCodeInput,
            setReferralCodeInput,
            authError,
            setAuthError,
            isAuthSubmitting,
            passwordSetupOpen,
            setPasswordSetupOpen,
            googleEmail,
            setupPassword,
            setSetupPassword,
            setupError,
            setupSuccess,
            checkUserAuth,
            handleAuthSubmit,
            processGoogleLogin,
            handlePasswordSetupSubmit,
            handleCloseAuthModal,
            handleLogout,
            openLoginModal,
            openSignupModal
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
