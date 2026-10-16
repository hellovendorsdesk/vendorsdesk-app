import React from 'react';

export function PrivacyPolicyPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 5%', background: '#0d121f', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>Last Updated: August 2026</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem' }}>
                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>1. Introduction</h2>
                    <p>At VendorsDesk (vendorsdesk.in), protecting your privacy and business confidentiality is our highest priority. This policy details how we handle user data when using our catalog variation generator, rate optimizer, P&L settlement calculator, and label cropper tools.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>2. Data We Collect</h2>
                    <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
                        <li><strong style={{ color: '#ffffff' }}>Account Details:</strong> Name, Email Address, and encrypted authentication tokens.</li>
                        <li><strong style={{ color: '#ffffff' }}>Usage & Tool Metadata:</strong> Query history, uploaded Excel P&L settlement files, and catalog variation parameters.</li>
                        <li><strong style={{ color: '#ffffff' }}>Payment Logs:</strong> Transaction timestamps and payment IDs processed via Cashfree Payments (we do NOT store credit card details or bank PINs).</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>3. Data Confidentiality & Encryption</h2>
                    <p>All payload communications are encrypted using SSL/TLS 256-bit protocols. We never share, sell, or disclose your supplier catalog credentials, revenue figures, or SKU margin details to third parties.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>4. Contact Us</h2>
                    <p>If you have any privacy inquiries, reach out to our privacy compliance team at <strong style={{ color: '#38bdf8' }}>hellovendorsdesk@gmail.com</strong>.</p>
                </section>
            </div>
        </div>
    );
}

export function RefundPolicyPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 5%', background: '#0d121f', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Refund & Cancellation Policy</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>Last Updated: August 2026</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem' }}>
                
                {/* Highlight Box: No Refunds */}
                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px', padding: '1.25rem', color: '#fca5a5' }}>
                    <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem', color: '#f87171' }}>🚫 No Monetary Refunds Policy</strong>
                    <span>Once a digital service plan, subscription upgrade, or query credit package is picked and purchased on VendorsDesk, all transactions are final. We do NOT issue monetary, cash, or bank gateway refunds once a service plan is picked.</span>
                </div>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>1. Credit Restoration & Loss Compensation Policy</h2>
                    <p>We guarantee the reliability of our system. If you experience credit loss due to a verified server issue, system error, or technical outage during calculation, the following credit compensation policy applies:</p>
                    
                    <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '16px', padding: '1.25rem', marginTop: '0.75rem', color: '#e0f2fe' }}>
                        <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '0.35rem', color: '#38bdf8' }}>⚡ Technical Error Credit Restoration Procedure:</strong>
                        <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem', color: '#bae6fd', fontSize: '0.9rem' }}>
                            <li>If a server failure, calculation error, or technical outage causes an accidental loss of query credits without outputting your audit result, you can email us immediately at <strong style={{ color: '#ffffff' }}>hellovendorsdesk@gmail.com</strong>.</li>
                            <li>Please include your registered email ID, transaction timestamp, and the tool name.</li>
                            <li>Our engineering team will audit server logs within 24–48 hours. Upon verification of the server failure or credit loss, <strong style={{ color: '#ffffff' }}>the exact number of lost credits will be restored and credited back directly to your account balance</strong>.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>2. Cancellation Policy</h2>
                    <p>Users may stop purchasing future credit packages at any time. Activated query credits remain available in your account until their specified validity period expires.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>3. How to Submit a Support Claim</h2>
                    <p>To request a credit restoration audit for lost credits, send an email to <strong style={{ color: '#38bdf8' }}>hellovendorsdesk@gmail.com</strong> with the subject line <code>Credit Audit Request - [Your Registered Email]</code>.</p>
                </section>

            </div>
        </div>
    );
}

export function TermsOfServicePage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 5%', background: '#0d121f', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Terms of Service</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>Last Updated: August 2026</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#94a3b8', lineHeight: '1.7', fontSize: '0.95rem' }}>
                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h2>
                    <p>By accessing or using VendorsDesk (vendorsdesk.in), you agree to be bound by these Terms of Service. If you do not agree, please discontinue using our tools and services.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>2. Description of Service</h2>
                    <p>VendorsDesk provides catalog image variation tools, shipping rate optimization auditors, Excel P&L settlement calculators, and thermal label processing tools for online e-commerce sellers.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>3. Fair Usage & Restrictions</h2>
                    <p>Users must not engage in automated scraping, reverse engineering, or exploiting free tier credits using disposable email accounts. Accounts violating fair use rules may be suspended.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>4. Contact</h2>
                    <p>For questions regarding terms and conditions, contact <strong style={{ color: '#38bdf8' }}>hellovendorsdesk@gmail.com</strong>.</p>
                </section>
            </div>
        </div>
    );
}

export function ContactUsPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 5%', background: '#0d121f', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8)', marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Contact Support</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>We are here to help you resolve technical, billing, and credit audit queries.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.75rem', borderRadius: '16px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✉️</div>
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff', display: 'block' }}>Email Support</strong>
                    <span style={{ fontSize: '0.9rem', color: '#38bdf8', display: 'block', marginTop: '0.35rem', fontWeight: 600 }}>hellovendorsdesk@gmail.com</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', display: 'block' }}>Response time: 24 - 48 Hours</span>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.75rem', borderRadius: '16px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔄</div>
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff', display: 'block' }}>Credit Loss & Server Audit</strong>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginTop: '0.35rem', lineHeight: '1.6' }}>If you faced server errors during a calculation, email your account ID for instant credit restoration.</span>
                </div>
            </div>
        </div>
    );
}
