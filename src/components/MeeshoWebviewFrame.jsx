import React, { useState } from 'react';
import { secureFetch } from '../utils/crypto';

export default function MeeshoWebviewFrame({ onSuccess, onCancel }) {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    
    const [step, setStep] = useState('credentials'); // 'credentials' | 'loading' | 'success'
    const [errorMsg, setErrorMsg] = useState('');
    const [loadingText, setLoadingText] = useState('');

    const handleStartLogin = async (e) => {
        if (e) e.preventDefault();
        if (!loginId || !password) {
            setErrorMsg('Kripya Login ID aur Password enter karein.');
            return;
        }

        setErrorMsg('');
        setStep('loading');
        setLoadingText('Connecting to Meesho supplier portal...');

        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const data = await secureFetch('/api/meesho/webview/login', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { email_or_phone: loginId, password }
            });

            if (data && data.success) {
                setStep('success');
                setTimeout(() => {
                    if (onSuccess) onSuccess();
                }, 1400);
            } else {
                setStep('credentials');
                setErrorMsg(data.error || 'Connection failed. Please check credentials.');
            }
        } catch (err) {
            setStep('credentials');
            setErrorMsg('Network error. Failed to reach the server.');
        }
    };

    const handleDemoConnect = async () => {
        setErrorMsg('');
        setStep('loading');
        setLoadingText('Connecting Sandbox Demo Store...');

        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const data = await secureFetch('/api/meesho/webview/login', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { email_or_phone: 'demo.store@vendorsdesk.in', password: 'Password123!' }
            });

            if (data.success) {
                setStep('success');
                setTimeout(() => {
                    if (onSuccess) onSuccess();
                }, 1200);
            } else {
                setStep('credentials');
                setErrorMsg(data.error || 'Demo connection failed.');
            }
        } catch (err) {
            setStep('credentials');
            setErrorMsg('Network error.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '460px', margin: '0 auto' }}>
            
            {/* Visual Header - Browser window frame */}
            <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 30px rgba(0,0,0,0.4)' }}>
                
                {/* Mock Address Bar */}
                <div style={{ background: '#0f172a', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%' }}></span>
                        <span style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '50%' }}></span>
                        <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></span>
                    </div>
                    <div style={{ flexGrow: 1, background: '#1e293b', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.25rem 0.75rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        <span>🔒</span>
                        <span style={{ color: '#94a3b8' }}>https://</span>
                        <span style={{ color: '#f8fafc' }}>supplier.meesho.com</span>
                        <span style={{ color: '#64748b' }}>/panel/v3/new/root/login</span>
                    </div>
                </div>

                {/* Browser Main Body Canvas */}
                <div style={{ padding: '2rem 1.5rem', minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0f172a', position: 'relative' }}>
                    
                    {/* Step 1: Input ID & Password */}
                    {step === 'credentials' && (
                        <form onSubmit={handleStartLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                                {/* Meesho Style Brand Header */}
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ff1493', fontFamily: 'Outfit', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                                    <span style={{ background: '#ff1493', color: '#fff', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.85rem', fontWeight: 900 }}>m</span>
                                    meesho supplier panel
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Connect your seller store securely</div>
                            </div>
                            
                            <div className="form-group" style={{ marginBottom: '0rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Email ID / Mobile Number</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your seller login email or phone" 
                                    value={loginId} 
                                    onChange={(e) => setLoginId(e.target.value)} 
                                    style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
                                    required
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: '0.25rem' }}>
                                <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)' }}
                                    required
                                />
                            </div>

                            {errorMsg && (
                                <div style={{ color: 'var(--danger)', fontSize: '0.75rem', textAlign: 'center' }}>{errorMsg}</div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button type="button" className="btn-action" onClick={onCancel} style={{ flex: 1, padding: '0.65rem' }}>Cancel</button>
                                    <button type="submit" className="btn-action btn-action-primary" style={{ flex: 1, padding: '0.65rem', fontWeight: 'bold', background: '#ff1493', border: 'none' }}>Connect Account</button>
                                </div>
                                <button 
                                    type="button" 
                                    className="btn-action" 
                                    onClick={handleDemoConnect}
                                    style={{ width: '100%', padding: '0.6rem', fontSize: '0.8rem', background: 'rgba(255, 20, 147, 0.15)', color: '#ff69b4', border: '1px solid rgba(255, 20, 147, 0.3)', borderRadius: '8px', fontWeight: 600 }}
                                >
                                    ⚡ Instant Demo Store Connect (Sandbox Mode)
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Loading Screen */}
                    {step === 'loading' && (
                        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                            <div 
                                style={{
                                    width: '36px', height: '36px', border: '3px solid rgba(255,255,255,0.1)',
                                    borderTopColor: '#ff1493', borderRadius: '50%', display: 'block',
                                    margin: '0 auto 1.25rem auto', animation: 'spin 1s linear infinite'
                                }}
                            />
                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{loadingText}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Securing sandbox connection keys...</div>
                        </div>
                    )}

                    {/* Step 2: Success Screen */}
                    {step === 'success' && (
                        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>Meesho Account Connected!</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Successfully established secure session link.</p>
                        </div>
                    )}

                </div>
            </div>
            
        </div>
    );
}
