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
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
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
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '24px',
                padding: '2.25rem 2rem',
                boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                fontFamily: 'Inter, sans-serif',
                color: '#0f172a'
            }}>
                {/* Close Modal Button */}
                <button 
                    type="button"
                    onClick={handleCloseAuthModal}
                    style={{
                        position: 'absolute', top: '1.2rem', right: '1.2rem',
                        background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '50%',
                        width: '32px', height: '32px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold', color: '#64748b', fontSize: '0.9rem',
                        transition: 'all 0.2s', zIndex: 10
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
                    title="Close"
                >
                    ✕
                </button>

                {/* Brand Icon Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <img src="/logo-icon.png" alt="VendorsDesk Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a', letterSpacing: '-0.02em' }}>VendorsDesk</span>
                </div>

                {/* Segmented Auth Mode Tabs */}
                <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '0.25rem', border: '1px solid #e2e8f0' }}>
                    <button className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`} onClick={() => { setAuthMode('login'); setAuthError(''); }}>Sign In</button>
                    <button className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`} onClick={() => { setAuthMode('signup'); setAuthError(''); }}>Sign Up</button>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.35rem', fontFamily: 'Outfit', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {authMode === 'login' ? 'Welcome Back!' : 'Create your Account'}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {authMode === 'login' ? 'Sign in to access your shipping optimizer dashboard' : 'Register and get 3 free credits immediately'}
                    </p>
                </div>

                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {authMode === 'signup' && (
                        <div className="form-group" style={{ marginBottom: 0, gap: '0.35rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#475569' }}>Full Name</label>
                            <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '10px' }} />
                        </div>
                    )}
                    <div className="form-group" style={{ marginBottom: 0, gap: '0.35rem' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#475569' }}>Email Address</label>
                        <input type="email" placeholder="john@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '10px' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, gap: '0.35rem' }}>
                        <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#475569' }}>Password</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '10px' }} />
                    </div>
                    {authMode === 'signup' && (
                        <div className="form-group" style={{ marginBottom: 0, gap: '0.35rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.8rem', color: '#475569' }}>Referral Code (Optional)</label>
                            <input type="text" placeholder="REF123" value={referralCodeInput} onChange={(e) => setReferralCodeInput(e.target.value)} style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '10px' }} />
                        </div>
                    )}

                    {authError && <div style={{ color: 'var(--danger)', fontSize: '0.82rem', textAlign: 'center', background: 'rgba(220, 38, 38, 0.08)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>{authError}</div>}
                    <button 
                        className="btn-submit-form" 
                        type="submit" 
                        disabled={isAuthSubmitting}
                        style={{ 
                            padding: '0.75rem', 
                            borderRadius: '10px', 
                            fontSize: '0.95rem', 
                            fontWeight: 700, 
                            marginTop: '0.35rem', 
                            background: isAuthSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #2563eb, #4f46e5)', 
                            boxShadow: isAuthSubmitting ? 'none' : '0 4px 14px rgba(37, 99, 235, 0.3)',
                            cursor: isAuthSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isAuthSubmitting ? 0.75 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {isAuthSubmitting ? (
                            <>
                                <span style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                            </>
                        ) : (
                            authMode === 'login' ? 'Sign In to Account' : 'Create Free Account'
                        )}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: '0.2rem 0' }}>
                    <hr style={{ width: '38%', opacity: 0.2 }} />
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>OR</span>
                    <hr style={{ width: '38%', opacity: 0.2 }} />
                </div>

                {/* Google Sign In Wrapper */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center' }}>
                    <div id="google-signin-btn"></div>
                </div>
            </div>
        </div>
    );
}
