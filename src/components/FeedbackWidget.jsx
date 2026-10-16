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
                        background: '#0d121f',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.15)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                >
                    <MessageSquare size={16} color="#38bdf8" />
                    <span>Feedback</span>
                </button>
            )}

            {/* Modal Window */}
            {isOpen && (
                <div style={{
                    width: '360px',
                    maxWidth: 'calc(100vw - 32px)',
                    background: '#0d121f',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    padding: '1.25rem',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    fontFamily: 'Inter, sans-serif',
                    color: '#ffffff'
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MessageSquare size={18} color="#38bdf8" />
                            <div>
                                <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                                    Send Feedback
                                </h3>
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                    Help us improve VendorsDesk for sellers
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {submittedSuccess ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                            <CheckCircle2 size={40} color="#34d399" style={{ margin: '0 auto 0.5rem auto' }} />
                            <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
                                Thank You!
                            </h4>
                            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
                                Your feedback was submitted directly to our engineering team.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {errorMsg && (
                                <div style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.25)', color: '#f87171', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem' }}>
                                    {errorMsg}
                                </div>
                            )}

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.25rem' }}>Category</label>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(255, 255, 255, 0.03)', color: '#ffffff', fontSize: '0.82rem' }}
                                >
                                    <option value="feature_suggestion">Feature Suggestion</option>
                                    <option value="bug_report">Bug Report / Error</option>
                                    <option value="rate_accuracy">Shipping Rate Discrepancy</option>
                                    <option value="other">General Feedback</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.25rem' }}>Your Email</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="seller@example.com"
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(255, 255, 255, 0.03)', color: '#ffffff', fontSize: '0.82rem', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.25rem' }}>Topic / Subject</label>
                                <input 
                                    type="text" 
                                    value={subject} 
                                    onChange={(e) => setSubject(e.target.value)} 
                                    placeholder="e.g. Saree weight calculation issue"
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(255, 255, 255, 0.03)', color: '#ffffff', fontSize: '0.82rem', boxSizing: 'border-box' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.25rem' }}>Details</label>
                                <textarea 
                                    rows={3} 
                                    value={message} 
                                    onChange={(e) => setMessage(e.target.value)} 
                                    placeholder="Describe your suggestion or issue..."
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'rgba(255, 255, 255, 0.03)', color: '#ffffff', fontSize: '0.82rem', boxSizing: 'border-box', resize: 'none' }}
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '0.65rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.45rem',
                                    fontSize: '0.85rem',
                                    background: '#ffffff',
                                    color: '#080b11',
                                    borderRadius: '9999px',
                                    fontWeight: 700
                                }}
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
