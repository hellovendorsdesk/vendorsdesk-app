import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function PasswordSetupModal() {
    const {
        passwordSetupOpen,
        setPasswordSetupOpen,
        googleEmail,
        setupPassword,
        setSetupPassword,
        setupError,
        setupSuccess,
        handlePasswordSetupSubmit
    } = useAuth();

    if (!passwordSetupOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
            <div className="panel-card" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ textAlign: 'center', fontSize: '1.35rem', fontFamily: 'Outfit', color: '#818cf8' }}>
                    Setup Account Password
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    Configure a password for <strong>{googleEmail}</strong> to log in directly without Google in the future.
                </p>

                <form onSubmit={handlePasswordSetupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label>Create Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={setupPassword}
                            onChange={(e) => setSetupPassword(e.target.value)}
                            required
                        />
                    </div>

                    {setupError && <div style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{setupError}</div>}
                    {setupSuccess && <div style={{ color: 'var(--success)', fontSize: '0.8rem' }}>{setupSuccess}</div>}

                    <button className="btn-submit-form" type="submit">
                        Configure Password & Finish
                    </button>
                </form>
            </div>
        </div>
    );
}
