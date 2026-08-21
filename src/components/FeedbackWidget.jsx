import React, { useState } from 'react';

export default function FeedbackWidget({ currentUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState('feature_suggestion');
    const [rating, setRating] = useState(5);
    const [email, setEmail] = useState(currentUser?.email || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedSuccess, setSubmittedSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitEmail = email || currentUser?.email;
        if (!submitEmail || !subject || !message) {
            setErrorMsg('Please fill in your email, title, and feedback message.');
            return;
        }

        setIsSubmitting(true);
        setErrorMsg('');

        try {
            const res = await fetch('/api/feedback/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: submitEmail,
                    userName: currentUser?.name || '',
                    category,
                    rating,
                    subject,
                    message,
                    pageUrl: window.location.pathname
                })
            });

            const data = await res.json();
            if (data.success) {
                setSubmittedSuccess(true);
                setTimeout(() => {
                    setSubmittedSuccess(false);
                    setIsOpen(false);
                    setSubject('');
                    setMessage('');
                }, 2500);
            } else {
                setErrorMsg(data.error || 'Failed to submit feedback.');
            }
        } catch (err) {
            console.error('Feedback submit error:', err);
            setErrorMsg('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
            
            {/* Floating Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '30px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        fontSize: '0.88rem',
                        fontWeight: 800,
                        fontFamily: 'Outfit, sans-serif',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.45)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                    }}
                    className="card-hover-lift"
                >
                    <span style={{ fontSize: '1.1rem' }}>💬</span>
                    <span>Feedback & Suggestions</span>
                </button>
            )}

            {/* Glassmorphic Modal Window */}
            {isOpen && (
                <div style={{
                    width: '380px',
                    maxWidth: 'calc(100vw - 32px)',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', pb: '0.75rem', paddingBottom: '0.75rem' }}>
                        <div>
                            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                                💬 Feedback & Suggestions
                            </h3>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>
                                Help us improve VendorsDesk for e-commerce sellers
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 800, color: '#64748b' }}
                        >
                            ✕
                        </button>
                    </div>

                    {submittedSuccess ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#10b981' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
                            <h4 style={{ fontFamily: 'Outfit', fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>Feedback Received!</h4>
                            <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0 }}>Thank you! Our engineering team has received your suggestion.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            
                            {/* Star Rating */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>Rate Your Experience:</label>
                                <div style={{ display: 'flex', gap: '0.35rem' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                fontSize: '1.4rem',
                                                cursor: 'pointer',
                                                filter: star <= rating ? 'none' : 'grayscale(100%) opacity(0.3)'
                                            }}
                                        >
                                            ⭐
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category Selector */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>Category:</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', fontWeight: 700, background: '#ffffff', color: '#0f172a' }}
                                >
                                    <option value="feature_suggestion">💡 Feature Suggestion</option>
                                    <option value="bug_report">🐛 Bug Report</option>
                                    <option value="ui_improvement">🎨 UI / Layout Improvement</option>
                                    <option value="general_feedback">💬 General Feedback</option>
                                </select>
                            </div>

                            {/* Email */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>Your Email:</label>
                                <input
                                    type="email"
                                    placeholder="seller@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', background: '#ffffff', color: '#0f172a' }}
                                />
                            </div>

                            {/* Subject */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>Title / Subject:</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Add Excel bulk export for P&L"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', background: '#ffffff', color: '#0f172a' }}
                                />
                            </div>

                            {/* Detailed Message */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>Detailed Suggestion / Feedback:</label>
                                <textarea
                                    rows="3"
                                    placeholder="Describe your suggestion or issue in detail..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', background: '#ffffff', color: '#0f172a', resize: 'vertical' }}
                                />
                            </div>

                            {errorMsg && (
                                <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-submit-form"
                                style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', fontSize: '0.88rem', marginTop: '0.25rem' }}
                            >
                                {isSubmitting ? 'Submitting...' : '🚀 Submit Feedback'}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
