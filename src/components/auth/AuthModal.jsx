import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
    const {
        authModalOpen,
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
        handleAuthSubmit,
        processGoogleLogin,
        handleCloseAuthModal
    } = useAuth();

    useEffect(() => {
        if (authModalOpen) {
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const timer = setTimeout(() => {
                try {
                    const btnContainer = document.getElementById("google-signin-btn");
                    if (!isLocalhost && window.google && window.google.accounts && window.google.accounts.id && btnContainer) {
                        btnContainer.innerHTML = '';
                        window.google.accounts.id.initialize({
                            client_id: "148360176717-1dpf5u3v99ckjhu5gruud4f9u17uqoc2.apps.googleusercontent.com",
                            callback: (res) => {
                                if (res && res.credential) {
                                    processGoogleLogin(res.credential);
                                }
                            },
                            auto_select: false,
                            cancel_on_tap_outside: true
                        });
                        window.google.accounts.id.renderButton(
                            btnContainer,
                            { theme: "outline", size: "large", width: 340 }
                        );
                    } else if (isLocalhost && btnContainer) {
                        btnContainer.innerHTML = '<div style="font-size:0.75rem; color:#64748b; background:#f8fafc; padding:0.45rem 0.85rem; border-radius:8px; border:1px solid #e2e8f0; font-weight:600; text-align:center;">⚡ Google 1-Click Login Active on Production (vendorsdesk.in)</div>';
                    }
                } catch (e) {
                    console.warn("Google Sign-In initialization skipped/not allowed on this origin:", e.message);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [authModalOpen]);

    if (!authModalOpen) return null;

    return (
        <div 
            className="auth-modal-overlay" 
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handleCloseAuthModal();
                }
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(8, 11, 17, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                zIndex: 99999
            }}
        >
            <div className="auth-modal-card" style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                background: '#0d121f',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '2.25rem 2rem',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                fontFamily: 'Inter, sans-serif',
                color: '#f8fafc'
            }}>
                {/* Close Modal Button */}
                <button 
                    type="button"
                    onClick={handleCloseAuthModal}
                    style={{
                        position: 'absolute', top: '1.2rem', right: '1.2rem',
                        background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '50%',
                        width: '32px', height: '32px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold', color: '#94a3b8', fontSize: '0.9rem',
                        transition: 'all 0.2s', zIndex: 10
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; e.currentTarget.style.color = '#94a3b8'; }}
                    title="Close"
                >
                    ✕
                </button>

                {/* Brand Icon Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                    <img src="/logo-icon.png" alt="VendorsDesk Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'Outfit', color: '#ffffff', letterSpacing: '-0.02em' }}>VendorsDesk</span>
                </div>

                {/* Segmented Auth Mode Tabs */}
                <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '0.25rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <button 
                        className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`} 
                        onClick={() => { setAuthMode('login'); setAuthError(''); }}
                        style={{
                            flex: 1, padding: '0.55rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                            background: authMode === 'login' ? '#ffffff' : 'transparent',
                            color: authMode === 'login' ? '#080b11' : '#94a3b8',
                            border: 'none',
                            boxShadow: authMode === 'login' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none'
                        }}
                    >
                        Sign In
                    </button>
                    <button 
                        className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`} 
                        onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                        style={{
                            flex: 1, padding: '0.55rem', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                            background: authMode === 'signup' ? '#ffffff' : 'transparent',
                            color: authMode === 'signup' ? '#080b11' : '#94a3b8',
                            border: 'none',
                            boxShadow: authMode === 'signup' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none'
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.35rem', fontFamily: 'Outfit', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
                        {authMode === 'login' ? 'Welcome Back!' : 'Create your Account'}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        {authMode === 'login' ? 'Sign in to access your shipping optimizer dashboard' : 'Register and get 3 free credits immediately'}
                    </p>
                </div>

                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {authMode === 'signup' && (
                        <div className="form-group" style={{ marginBottom: 0, gap: '0.35rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#94a3b8' }}>Full Name</label>
                            <input 
                                type="text" 
                                placeholder="John Doe" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                style={{ 
                                    padding: '0.75rem 1rem', fontSize: '0.9rem', borderRadius: '12px',
                                    background: '#080b11', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.12)'
                                }} 
                            />
                        </div>
                    )}
                    <div className="form-group" style={{ marginBottom: 0, gap: '0.35rem' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#94a3b8' }}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="john@email.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            style={{ 
                                padding: '0.75rem 1rem', fontSize: '0.9rem', borderRadius: '12px',
                                background: '#080b11', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.12)'
                            }} 
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, gap: '0.35rem' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#94a3b8' }}>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={{ 
                                padding: '0.75rem 1rem', fontSize: '0.9rem', borderRadius: '12px',
                                background: '#080b11', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.12)'
                            }} 
                        />
                    </div>
                    {authMode === 'signup' && (
                        <div className="form-group" style={{ marginBottom: 0, gap: '0.35rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#94a3b8' }}>Referral Code (Optional)</label>
                            <input 
                                type="text" 
                                placeholder="REF123" 
                                value={referralCodeInput} 
                                onChange={(e) => setReferralCodeInput(e.target.value)} 
                                style={{ 
                                    padding: '0.75rem 1rem', fontSize: '0.9rem', borderRadius: '12px',
                                    background: '#080b11', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.12)'
                                }} 
                            />
                        </div>
                    )}

                    {authError && <div style={{ color: '#ef4444', fontSize: '0.82rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>{authError}</div>}
                    <button 
                        className="btn-primary" 
                        type="submit" 
                        disabled={isAuthSubmitting}
                        style={{ 
                            padding: '0.85rem', 
                            borderRadius: '9999px', 
                            fontSize: '0.95rem', 
                            fontWeight: 700, 
                            marginTop: '0.5rem', 
                            background: '#ffffff',
                            color: '#080b11',
                            border: 'none',
                            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.18)',
                            cursor: isAuthSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isAuthSubmitting ? 0.75 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {isAuthSubmitting ? (
                            <>
                                <span style={{ width: '16px', height: '16px', border: '2px solid #080b11', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                            </>
                        ) : (
                            authMode === 'login' ? 'Sign In to Account' : 'Create Free Account'
                        )}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: '0.2rem 0' }}>
                    <hr style={{ width: '38%', borderColor: 'rgba(255, 255, 255, 0.1)', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>OR</span>
                    <hr style={{ width: '38%', borderColor: 'rgba(255, 255, 255, 0.1)', borderStyle: 'solid', borderWidth: '1px 0 0 0' }} />
                </div>

                {/* Google Sign In Wrapper */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center' }}>
                    <div id="google-signin-btn"></div>
                </div>
            </div>
        </div>
    );
}
