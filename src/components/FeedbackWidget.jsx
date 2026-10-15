import React, { useState } from 'react';
import { MessageSquare, X, CheckCircle2, Send } from 'lucide-react';

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
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
            
            {/* Floating Trigger Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.65rem 1.15rem',
                        borderRadius: '9999px',
                        background: '#0f172a',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.25)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                >
                    <MessageSquare size={16} color="#60a5fa" />
                    <span>Feedback</span>
                </button>
            )}

            {/* Modal Window */}
            {isOpen && (
                <div style={{
                    width: '360px',
                    maxWidth: 'calc(100vw - 32px)',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MessageSquare size={18} color="#2563eb" />
                            <div>
                                <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                                    Send Feedback
                                </h3>
                                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                                    Help us improve VendorsDesk for sellers
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {submittedSuccess ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                            <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
                            <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                                Thank You!
                            </h4>
                            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                                Your feedback was submitted directly to our engineering team.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {errorMsg && (
                                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem' }}>
                                    {errorMsg}
                                </div>
                            )}

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>Category</label>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem' }}
                                >
                                    <option value="feature_suggestion">Feature Suggestion</option>
                                    <option value="bug_report">Bug Report / Error</option>
                                    <option value="rate_accuracy">Shipping Rate Discrepancy</option>
                                    <option value="other">General Feedback</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>Your Email</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="seller@example.com"
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>Topic / Subject</label>
                                <input 
                                    type="text" 
                                    value={subject} 
                                    onChange={(e) => setSubject(e.target.value)} 
                                    placeholder="e.g. Saree weight calculation issue"
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>Details</label>
                                <textarea 
                                    rows={3} 
                                    value={message} 
                                    onChange={(e) => setMessage(e.target.value)} 
                                    placeholder="Describe your suggestion or issue..."
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.82rem', boxSizing: 'border-box', resize: 'none' }}
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="btn-primary"
                                style={{ width: '100%', padding: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', fontSize: '0.85rem' }}
                            >
                                <Send size={14} />
                                <span>{isSubmitting ? 'Submitting...' : 'Send Feedback'}</span>
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
