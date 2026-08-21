import React, { useState, useEffect } from 'react';
import { secureFetch } from './utils/crypto';
import { updatePageSEO } from './utils/seoManager';
import HomeTab from './components/HomeTab';
import OptimizerTab from './components/OptimizerTab';
import LabelExporterTab from './components/LabelExporterTab';
import CalculatorTab from './components/CalculatorTab';
import MeeshoAnalyticsTab from './components/MeeshoAnalyticsTab';
import FreeImageGeneratorTab from './components/FreeImageGeneratorTab';
import PnLCalculatorTab from './components/PnLCalculatorTab';
import BulkBackgroundRemoverTab from './components/BulkBackgroundRemoverTab';
import FeedbackWidget from './components/FeedbackWidget';

/* ── 1. MEESHO SHIPPING RATES & P&L HOME PAGE ─────────────────── */
function MeeshoShippingRatesPage({ onRegister }) {
    return (
        <div>
            {/* Hero Section - Compact SaaS Layout */}
            <section style={{ padding: '3.25rem 4% 2.5rem 4%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                
                {/* Background Ambient Orbs */}
                <div style={{
                    position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
                    width: '500px', height: '300px',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.06) 50%, transparent 70%)',
                    filter: 'blur(45px)', pointerEvents: 'none', zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* Compact Glowing Top Pill Tag */}
                    <div style={{ 
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)', 
                        border: '1px solid rgba(37, 99, 235, 0.22)', 
                        padding: '0.3rem 0.9rem', 
                        borderRadius: '30px', 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        color: '#2563eb', 
                        marginBottom: '1.25rem', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.35rem',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.06)'
                    }}>
                        <span>⚡</span> India's #1 All-In-One Meesho Supplier Growth Suite
                    </div>

                    {/* Refined Main Heading */}
                    <h1 style={{ 
                        fontFamily: 'Outfit', fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.18, letterSpacing: '-0.025em', 
                        color: '#0f172a', maxWidth: '800px', margin: '0 auto 1rem auto' 
                    }}>
                        Optimize Meesho Listing Images & <span style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Export PDF Shipping Labels</span>
                    </h1>

                    <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '650px', lineHeight: '1.6', margin: '0 auto 1.75rem auto', fontWeight: 500 }}>
                        Remove backgrounds, change live studio scenes, bypass duplicate catalog filters, qualify for lower shipping rates (₹48, ₹56, ₹62), and crop bulk thermal labels by SKU in under 2 minutes.
                    </p>
                    
                    {/* Compact Hero CTA Buttons */}
                    <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', marginBottom: '3.25rem', flexWrap: 'wrap' }}>
                        <button 
                            style={{ 
                                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', 
                                border: 'none', 
                                color: '#ffffff', 
                                padding: '0.65rem 1.6rem', 
                                borderRadius: '11px', 
                                fontSize: '0.88rem', 
                                fontWeight: 800, 
                                cursor: 'pointer', 
                                boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.35)',
                                transition: 'transform 0.2s ease'
                            }}
                            onClick={onRegister}
                            className="card-hover-lift"
                        >
                            ⚡ Claim 3 Free Credits & Start ➔
                        </button>
                        <a 
                            href="#performance-metrics" 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                background: '#ffffff', 
                                border: '1px solid #cbd5e1', 
                                color: '#0f172a', 
                                padding: '0.65rem 1.6rem', 
                                borderRadius: '11px', 
                                fontSize: '0.88rem', 
                                fontWeight: 800, 
                                textDecoration: 'none',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                            }}
                            className="card-hover-lift"
                        >
                            Explore Supplier Tools
                        </a>
                    </div>
                </div>

                {/* Compact macOS Browser Mockup Showcase Container */}
                <div style={{ 
                    width: '100%', 
                    maxWidth: '920px', 
                    background: '#ffffff', 
                    borderRadius: '20px', 
                    border: '1px solid #cbd5e1', 
                    boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.12), 0 4px 12px rgba(0, 0, 0, 0.03)', 
                    padding: '1.25rem', 
                    textAlign: 'left', 
                    color: '#0f172a',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {/* Mac Browser Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
                            <span style={{ width: '10px', height: '10px', background: '#eab308', borderRadius: '50%', display: 'inline-block' }}></span>
                            <span style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
                            <span style={{ fontSize: '0.78rem', color: '#475569', marginLeft: '0.5rem', fontWeight: 800 }}>
                                ⚡ VendorsDesk All-In-One Supplier Growth Suite
                            </span>
                        </div>
                        <div style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                            🚀 5 Essential Tools for E-Commerce Sellers
                        </div>
                    </div>

                    {/* 5 Tool Interactive Grid Cards (Compact Grid) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                        
                        {/* Tool 1: BG Remover & Studio */}
                        <div className="card-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.04), rgba(37, 99, 235, 0.04))', border: '1px solid rgba(236, 72, 153, 0.2)', borderRadius: '14px', padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ec4899', background: 'rgba(236, 72, 153, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>🖼️ BACKGROUND REMOVER</span>
                                <span style={{ fontSize: '0.65rem', color: '#2563eb', fontWeight: 800 }}>NEW V2</span>
                            </div>
                            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Background Remover & Live Studio</h4>
                            <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0, lineHeight: '1.45' }}>Isolate subjects, change background scenes live (Beach, Forest, Living Room, Palace), apply 19 PNG Badges & export ZIP.</p>
                        </div>

                        {/* Tool 2: Free Image Generator */}
                        <div className="card-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04), rgba(37, 99, 235, 0.04))', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '14px', padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', background: 'rgba(16, 185, 129, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>🆓 100% FREE</span>
                                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>0 Credits</span>
                            </div>
                            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Free Catalog Image Generator</h4>
                            <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0, lineHeight: '1.45' }}>Generate Pink/Blue borders, vertical spacers & 19 Real Graphic Badges to bypass Meesho duplicate listing blocks.</p>
                        </div>

                        {/* Tool 3: Rate Optimizer */}
                        <div className="card-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04), rgba(124, 58, 237, 0.04))', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '14px', padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#2563eb', background: 'rgba(37, 99, 235, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>⚡ RATE OPTIMIZER</span>
                                <span style={{ fontSize: '0.65rem', color: '#059669', fontWeight: 700 }}>₹48 Slab</span>
                            </div>
                            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Image + Shipping Rate Check</h4>
                            <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0, lineHeight: '1.45' }}>Queries live Meesho shipping matrices (₹48, ₹56, ₹62) via active token pool to ensure minimum shipping fees.</p>
                        </div>

                        {/* Tool 4: Excel P&L Calculator */}
                        <div className="card-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.04), rgba(37, 99, 235, 0.04))', border: '1px solid rgba(217, 119, 6, 0.2)', borderRadius: '14px', padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', background: 'rgba(217, 119, 6, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>📊 EXCEL P&L</span>
                                <span style={{ fontSize: '0.65rem', color: '#dc2626', fontWeight: 700 }}>7-Status</span>
                            </div>
                            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Excel P&L Settlement Calculator</h4>
                            <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0, lineHeight: '1.45' }}>Upload Meesho Payout Excel sheets to reconcile net payouts, customer return penalties, RTO losses & SKU margins.</p>
                        </div>

                        {/* Tool 5: Label Exporter */}
                        <div className="card-hover-lift" style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.04), rgba(37, 99, 235, 0.04))', border: '1px solid rgba(124, 58, 237, 0.2)', borderRadius: '14px', padding: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#7c3aed', background: 'rgba(124, 58, 237, 0.12)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>📋 LABEL EXPORTER</span>
                                <span style={{ fontSize: '0.65rem', color: '#2563eb', fontWeight: 700 }}>4x6 Thermal</span>
                            </div>
                            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Bulk PDF Label Crop & SKU Sorter</h4>
                            <p style={{ fontSize: '0.74rem', color: '#475569', margin: 0, lineHeight: '1.45' }}>Crops bulk shipping label PDF sheets into 4x6 thermal printer format and auto-sorts by SKU & courier partner.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Live Auditor Performance Section */}
            <section id="performance-metrics" style={{ padding: '5rem 5%', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', maxWidth: '1100px', margin: '0 auto', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, marginBottom: '1.25rem', lineHeight: '1.2' }}>
                            Verify Meesho Shipping Slabs & Detect Overcharges
                        </h2>
                        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                            Many e-commerce suppliers are charged for higher weight tiers than the actual listing weight. Our system parses packaging details and matches them against standard logistics matrices.
                        </p>
                        <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            We audit the entire payout ledger—deducting returned shipping, customer return penalties, and forward shipping charges—to output a clean net profit figure for your supplier panel.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', fontFamily: 'Outfit' }}>₹12,450</div>
                                <div style={{ fontSize: '0.75rem', color: '#475569' }}>Avg. Monhtly Weight Discrepancy Audited</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563eb', fontFamily: 'Outfit' }}>100%</div>
                                <div style={{ fontSize: '0.75rem', color: '#475569' }}>Secure Session Compliance</div>
                            </div>
                        </div>
                    </div>

                    <div className="panel-card" style={{ padding: '2rem' }}>
                        <h4 style={{ fontSize: '1.05rem', fontFamily: 'Outfit', fontWeight: 700, marginBottom: '1rem', color: '#2563eb' }}>⚡ Reconciled Shipping Rate Audits</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                                <span style={{ color: '#475569' }}>Forward Shipping Fees</span>
                                <span style={{ fontWeight: 'bold' }}>₹48.20 / order</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                                <span style={{ color: '#475569' }}>RTO Return Penalty</span>
                                <span style={{ fontWeight: 'bold' }}>₹0.00 (Standard Policy)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                                <span style={{ color: '#475569' }}>Customer Return shipping</span>
                                <span style={{ fontWeight: 'bold', color: '#dc2626' }}>₹85.00 / return</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', paddingTop: '0.25rem' }}>
                                <span style={{ color: '#475569', fontWeight: 600 }}>Verified Profit Margin</span>
                                <span style={{ fontWeight: 'bold', color: '#059669' }}>+34.2% Net Margin</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ── 2. MEESHO IMAGE GENERATOR / OPTIMIZER PAGE ────────────── */
function MeeshoImageGeneratorPage({ onRegister }) {
    return (
        <div style={{ padding: '4rem 5%' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.18)', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1.25rem', display: 'inline-block' }}>
                    🎨 Meesho Image Variation Creator
                </div>
                <h1 style={{ fontFamily: 'Outfit', fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, maxWidth: '800px', margin: '0 auto 1.25rem auto' }}>
                    Bypass Duplicate Image Blocks & Qualify for Lower Shipping Rates
                </h1>
                <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                    Meesho suppresses listings with duplicate catalog photos. Our automated optimizer generates distinct visual variations (borders, spacers, badges) to bypass checks and qualify for Next Day Dispatch (NDD) tiers.
                </p>
                <button 
                    style={{ background: '#2563eb', border: 'none', color: '#ffffff', padding: '0.85rem 2rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(37, 99, 235, 0.25)' }}
                    onClick={onRegister}
                >
                    Start Generating Variations
                </button>
            </div>

            {/* Before / After Mockup Showcase */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: '900px', margin: '0 auto 4rem auto' }}>
                <div className="panel-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 'bold', marginBottom: '0.75rem' }}>❌ Duplicate Original Listing Photo (Higher Shipping Slab)</div>
                    <div style={{ aspectRatio: '1', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', overflow: 'hidden' }}>
                        <span style={{ fontSize: '5rem' }}>👗</span>
                    </div>
                </div>

                <div className="panel-card" style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid #2563eb', boxShadow: '0 10px 30px rgba(37, 99, 235, 0.15)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 'bold', marginBottom: '0.75rem' }}>✅ Optimized Unique Variation (Lower Shipping Slabs & High CTR)</div>
                    <div style={{ aspectRatio: '1', background: '#ffffff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '8px solid #ff3f6c', position: 'relative', overflow: 'hidden' }}>
                        <span style={{ fontSize: '5.2rem' }}>👗</span>
                        <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: '#ff3f6c', color: '#ffffff', fontSize: '0.55rem', fontWeight: 'bold', padding: '0.2rem 0.4rem', borderRadius: '3px' }}>
                            BEST SELLER
                        </div>
                    </div>
                </div>
            </div>

            {/* Educational Content for AEO */}
            <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.7', color: '#475569' }}>
                <h3 style={{ color: '#0f172a', fontFamily: 'Outfit', fontSize: '1.6rem', marginBottom: '1rem' }}>How E-commerce Catalog Image Optimization Reduces Logistics Costs</h3>
                <p style={{ marginBottom: '1.25rem' }}>
                    Online marketplaces use computer vision algorithms to cluster and index product listings. If your product photo matches existing images, your catalog is categorized into standardized shipping rate grids.
                </p>
                <p>
                    By adding a subtle pink/blue border frame, top/bottom vertical spacers, or a brand badge, the image file hash changes and visual contours are shifted. This bypasses automated duplicator filters, keeping your listings active and qualifying for optimal logistics tariffs.
                </p>
            </div>
        </div>
    );
}

/* ── 3. MEESHO SHIPPING LABEL EXPORTER PAGE ─────────────── */
function MeeshoLabelExporterPage({ onRegister }) {
    return (
        <div style={{ padding: '4rem 5%' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.18)', padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1.25rem', display: 'inline-block' }}>
                    🏷️ E-commerce Label Crop & PDF Compiler
                </div>
                <h1 style={{ fontFamily: 'Outfit', fontSize: '3rem', fontWeight: 800, lineHeight: 1.2, maxWidth: '850px', margin: '0 auto 1.25rem auto' }}>
                    Sort & Export Meesho Shipping Labels by SKU in Under 2 Minutes
                </h1>
                <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                    Stop manually cutting sheets! Upload your bulk order PDF sheets, automatically crop labels, sort them by specific courier companies (Delhivery, Shadowfax, XpressBees), and export compact, print-ready layouts.
                </p>
                <button 
                    style={{ background: '#2563eb', border: 'none', color: '#ffffff', padding: '0.85rem 2rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(37, 99, 235, 0.25)' }}
                    onClick={onRegister}
                >
                    Upload Label PDF
                </button>
            </div>

            {/* Label Exporter Visual Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto 4rem auto' }}>
                <div className="panel-card" style={{ padding: '1.75rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontFamily: 'Outfit', fontWeight: 700, marginBottom: '0.75rem', color: '#2563eb' }}>📦 Bulk Packing Grouping</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                        Group labels by SKU variations automatically. Packers can pull 50 units of the same catalog SKU and pack them continuously, reducing warehouse processing errors by 95%.
                    </p>
                </div>
                <div className="panel-card" style={{ padding: '1.75rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontFamily: 'Outfit', fontWeight: 700, marginBottom: '0.75rem', color: '#2563eb' }}>🚚 Logistics Courier Sorting</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                        Separate Delhivery, Shadowfax, and ExpressBees labels instantly into distinct piles. Hand over dispatch packages directly to individual logistics pickups without manual scanning.
                    </p>
                </div>
                <div className="panel-card" style={{ padding: '1.75rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontFamily: 'Outfit', fontWeight: 700, marginBottom: '0.75rem', color: '#2563eb' }}>🖨️ Thermal Printer Sizing</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                        Crop standard multi-label A4 sheets into compact 3x5 or 4x6 sizes, ready to print on thermal rolls. Minimize printing ink costs and paper overheads.
                    </p>
                </div>
            </div>
        </div>
    );
}


/* ── 5. PRICING & AFFILIATE PAGE ────────────────────────────── */
function PricingAffiliatePage({ onRegister }) {
    return (
        <div style={{ padding: '4rem 5%' }}>
            
            {/* Pricing Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontFamily: 'Outfit', fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>Simple, Credit-Based Plans</h2>
                <p style={{ color: '#475569', fontSize: '0.95rem' }}>Acquire check query credits and start optimizing catalog variation rates.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '1150px', margin: '0 auto 5rem auto' }}>
                
                {/* Starter Plan - ₹99 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#64748b' }}>Starter</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a' }}>₹99</div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>For small sellers</div>
                    </div>
                    <hr style={{ opacity: 0.1, margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> <strong>40 Credits</strong> (60% More!)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 30 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> HD Badges & Borders</li>
                    </ul>
                    <button 
                        style={{ width: '100%', padding: '0.65rem', background: '#ffffff', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' }}
                        onClick={onRegister}
                    >
                        Buy Now
                    </button>
                </div>

                {/* Growth Plan - ₹299 (Best Value) */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '2px solid #2563eb', position: 'relative', background: '#ffffff', boxShadow: '0 10px 30px rgba(37, 99, 235, 0.15)', borderRadius: '16px' }}>
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.75rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Best Value</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#2563eb' }}>Growth</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a' }}>₹299</div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>For growing businesses</div>
                    </div>
                    <hr style={{ opacity: 0.1, margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> <strong>150 Credits</strong> (50% More!)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 45 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Multi-Badge Combinations</li>
                    </ul>
                    <button 
                        style={{ width: '100%', padding: '0.7rem', background: '#2563eb', border: 'none', color: '#ffffff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}
                        onClick={onRegister}
                    >
                        Buy Now
                    </button>
                </div>

                {/* Pro Plan - ₹599 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#64748b' }}>Pro</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a' }}>₹599</div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>For high volume</div>
                    </div>
                    <hr style={{ opacity: 0.1, margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> <strong>350 Credits</strong></li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 60 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Dual Seal Stamp Combo</li>
                    </ul>
                    <button 
                        style={{ width: '100%', padding: '0.65rem', background: '#ffffff', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' }}
                        onClick={onRegister}
                    >
                        Buy Now
                    </button>
                </div>

                {/* Enterprise Plan - ₹999 */}
                <div className="panel-card" style={{ padding: '1.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#64748b' }}>Enterprise</div>
                    <div>
                        <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Outfit', color: '#0f172a' }}>₹999</div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>Best value for agencies</div>
                    </div>
                    <hr style={{ opacity: 0.1, margin: 0 }} />
                    <ul style={{ paddingLeft: '0', listStyle: 'none', fontSize: '0.8rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> <strong>750 Credits</strong> (50% More!)</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 90 Days Validity</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> Low Shipping Rate Engine</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><span style={{ color: '#2563eb', fontWeight: 'bold' }}>✓</span> 24/7 Priority Support</li>
                    </ul>
                    <button 
                        style={{ width: '100%', padding: '0.65rem', background: '#ffffff', border: '1px solid #2563eb', color: '#2563eb', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: 'auto' }}
                        onClick={onRegister}
                    >
                        Buy Now
                    </button>
                </div>

            </div>

            {/* Affiliate Program Section */}
            <div style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '5rem', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="panel-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', padding: '2.5rem', background: '#ffffff', border: '1px solid #cbd5e1' }}>
                    <div>
                        <div style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Affiliate Partnership</div>
                        <h3 style={{ fontSize: '1.8rem', fontFamily: 'Outfit', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>
                            Earn 33% Lifetime Commission on Referred Purchases
                        </h3>
                        <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                            Share your unique link with e-commerce sellers. Earn standard query credits when they buy plans, and give them 5 extra credits upon signup.
                        </p>
                    </div>
                    <button 
                        style={{ background: '#2563eb', border: 'none', color: '#ffffff', padding: '0.85rem 2rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}
                        onClick={onRegister}
                    >
                        Join Affiliate Program
                    </button>
                </div>
            </div>

        </div>
    );
}

/* ── 5.1 LEGAL & POLICY PAGES ────────────────────────────── */
function PrivacyPolicyPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 5%', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)', marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Privacy Policy</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>Last Updated: August 2026</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#334155', lineHeight: '1.7', fontSize: '0.95rem' }}>
                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>1. Introduction</h2>
                    <p>At VendorsDesk (vendorsdesk.in), protecting your privacy and business confidentiality is our highest priority. This policy details how we handle user data when using our catalog variation generator, rate optimizer, P&L settlement calculator, and label cropper tools.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>2. Data We Collect</h2>
                    <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
                        <li><strong>Account Details:</strong> Name, Email Address, and encrypted authentication tokens.</li>
                        <li><strong>Usage & Tool Metadata:</strong> Query history, uploaded Excel P&L settlement files, and catalog variation parameters.</li>
                        <li><strong>Payment Logs:</strong> Transaction timestamps and payment IDs processed via Cashfree Payments (we do NOT store credit card details or bank PINs).</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>3. Data Confidentiality & Encryption</h2>
                    <p>All payload communications are encrypted using SSL/TLS 256-bit protocols. We never share, sell, or disclose your supplier catalog credentials, revenue figures, or SKU margin details to third parties.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>4. Contact Us</h2>
                    <p>If you have any privacy inquiries, reach out to our privacy compliance team at <strong>hellovendorsdesk@gmail.com</strong>.</p>
                </section>
            </div>
        </div>
    );
}

function RefundPolicyPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 5%', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)', marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Refund & Cancellation Policy</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>Last Updated: August 2026</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#334155', lineHeight: '1.7', fontSize: '0.95rem' }}>
                
                {/* Highlight Box: No Refunds */}
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '1.25rem', color: '#991b1b' }}>
                    <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>🚫 No Monetary Refunds Policy</strong>
                    <span>Once a digital service plan, subscription upgrade, or query credit package is picked and purchased on VendorsDesk, all transactions are final. We do NOT issue monetary, cash, or bank gateway refunds once a service plan is picked.</span>
                </div>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>1. Credit Restoration & Loss Compensation Policy</h2>
                    <p>We guarantee the reliability of our system. If you experience credit loss due to a verified server issue, system error, or technical outage during calculation, the following credit compensation policy applies:</p>
                    
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.25rem', marginTop: '0.75rem', color: '#1e40af' }}>
                        <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '0.35rem' }}>⚡ Technical Error Credit Restoration Procedure:</strong>
                        <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem', color: '#1e3a8a', fontSize: '0.9rem' }}>
                            <li>If a server failure, calculation error, or technical outage causes an accidental loss of query credits without outputting your audit result, you can email us immediately at <strong>hellovendorsdesk@gmail.com</strong>.</li>
                            <li>Please include your registered email ID, transaction timestamp, and the tool name.</li>
                            <li>Our engineering team will audit server logs within 24–48 hours. Upon verification of the server failure or credit loss, <strong>the exact number of lost credits will be restored and credited back directly to your account balance</strong>.</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>2. Cancellation Policy</h2>
                    <p>Users may stop purchasing future credit packages at any time. Activated query credits remain available in your account until their specified validity period expires.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>3. How to Submit a Support Claim</h2>
                    <p>To request a credit restoration audit for lost credits, send an email to <strong>hellovendorsdesk@gmail.com</strong> with the subject line <code>Credit Audit Request - [Your Registered Email]</code>.</p>
                </section>

            </div>
        </div>
    );
}

function TermsOfServicePage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 5%', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)', marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Terms of Service</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>Last Updated: August 2026</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#334155', lineHeight: '1.7', fontSize: '0.95rem' }}>
                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h2>
                    <p>By accessing or using VendorsDesk (vendorsdesk.in), you agree to be bound by these Terms of Service. If you do not agree, please discontinue using our tools and services.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>2. Description of Service</h2>
                    <p>VendorsDesk provides catalog image variation tools, shipping rate optimization auditors, Excel P&L settlement calculators, and thermal label processing tools for online e-commerce sellers.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>3. Fair Usage & Restrictions</h2>
                    <p>Users must not engage in automated scraping, reverse engineering, or exploiting free tier credits using disposable email accounts. Accounts violating fair use rules may be suspended.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>4. Contact</h2>
                    <p>For questions regarding terms and conditions, contact <strong>hellovendorsdesk@gmail.com</strong>.</p>
                </section>
            </div>
        </div>
    );
}

function ContactUsPage() {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 5%', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)', marginTop: '2rem', marginBottom: '4rem' }}>
            <h1 style={{ fontFamily: 'Outfit', fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Contact Support</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>We are here to help you resolve technical, billing, and credit audit queries.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '14px' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>✉️</div>
                    <strong style={{ fontSize: '1rem', color: '#0f172a', display: 'block' }}>Email Support</strong>
                    <span style={{ fontSize: '0.85rem', color: '#475569', display: 'block', marginTop: '0.25rem' }}>hellovendorsdesk@gmail.com</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', display: 'block' }}>Response time: 24 - 48 Hours</span>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '14px' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔄</div>
                    <strong style={{ fontSize: '1rem', color: '#0f172a', display: 'block' }}>Credit Loss & Server Audit</strong>
                    <span style={{ fontSize: '0.85rem', color: '#475569', display: 'block', marginTop: '0.25rem' }}>If you faced server errors during a calculation, email your account ID for instant credit restoration.</span>
                </div>
            </div>
        </div>
    );
}

function MarketingLandingPage({ currentUser, activeTab, onTabChange, onLogin, onRegister, onGoToDashboard }) {
    const [faqOpen, setFaqOpen] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

    const toggleFaq = (idx) => {
        setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg-gradient)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
            
            {/* Header / Navbar */}
            <header className="site-header" style={{
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                boxShadow: '0 4px 25px rgba(15, 23, 42, 0.05)',
                padding: '0.75rem 3%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 990
            }}>
                {/* Left Official Brand Logo */}
                <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
                    onClick={() => { onTabChange('meesho-shipping-rates'); setMobileMenuOpen(false); }}
                >
                    <img 
                        src="/logo-icon.png" 
                        alt="VendorsDesk Official Logo" 
                        style={{ height: '38px', width: 'auto', objectFit: 'contain' }} 
                    />
                    <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                        VendorsDesk
                    </span>
                </div>
                
                {/* Desktop Navigation Links (Center) */}
                <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {/* 🧰 Free Tools Dropdown */}
                    <div 
                        className="nav-dropdown-wrapper"
                        onMouseEnter={() => setIsToolsDropdownOpen(true)}
                        onMouseLeave={() => setIsToolsDropdownOpen(false)}
                        style={{ position: 'relative' }}
                    >
                        <button 
                            className={`nav-link ${['free-image-generator', 'meesho-shipping-rates', 'pnl-calculator', 'meesho-label-exporter'].includes(activeTab) ? 'active' : ''}`}
                            onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                padding: '0.55rem 0.85rem',
                                borderRadius: '12px',
                                background: 'rgba(37, 99, 235, 0.06)',
                                border: '1px solid rgba(37, 99, 235, 0.15)',
                                color: '#2563eb'
                            }}
                        >
                            <span>🧰 Free Tools</span>
                            <span style={{ fontSize: '0.6rem', background: '#10b981', color: '#ffffff', padding: '0.12rem 0.4rem', borderRadius: '6px', fontWeight: 800 }}>5 SUITE</span>
                            <span style={{ fontSize: '0.7rem', transition: 'transform 0.2s', transform: isToolsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                        </button>

                        {isToolsDropdownOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '340px',
                                background: '#ffffff',
                                border: '1px solid #cbd5e1',
                                borderRadius: '18px',
                                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
                                padding: '0.75rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.4rem',
                                zIndex: 1000,
                            }}>
                                {/* Tool 1: Background Remover & Live Studio */}
                                <div 
                                    onClick={() => { onTabChange('bg-remover'); setIsToolsDropdownOpen(false); }}
                                    style={{
                                        padding: '0.65rem 0.85rem',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: activeTab === 'bg-remover' ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem'
                                    }}
                                    className="tool-dropdown-item"
                                >
                                    <span style={{ fontSize: '1.4rem' }}>🖼️</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                            Background Remover & Studio
                                            <span style={{ fontSize: '0.55rem', background: '#ec4899', color: '#ffffff', padding: '0.08rem 0.35rem', borderRadius: '4px', fontWeight: 800 }}>NEW V2</span>
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Remove background & change live studio scenes.</div>
                                    </div>
                                </div>

                                {/* Tool 2: Free Catalog Image Generator */}
                                <div 
                                    onClick={() => { onTabChange('free-image-generator'); setIsToolsDropdownOpen(false); }}
                                    style={{
                                        padding: '0.65rem 0.85rem',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: activeTab === 'free-image-generator' ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem'
                                    }}
                                    className="tool-dropdown-item"
                                >
                                    <span style={{ fontSize: '1.4rem' }}>🆓</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                            Free Image Generator
                                            <span style={{ fontSize: '0.55rem', background: '#10b981', color: '#ffffff', padding: '0.08rem 0.35rem', borderRadius: '4px', fontWeight: 800 }}>FREE</span>
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Generate Pink/Blue borders & NDD fast stamps.</div>
                                    </div>
                                </div>

                                {/* Tool 3: Shipping Rate Optimizer */}
                                <div 
                                    onClick={() => { onTabChange('meesho-shipping-rates'); setIsToolsDropdownOpen(false); }}
                                    style={{
                                        padding: '0.65rem 0.85rem',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: activeTab === 'meesho-shipping-rates' ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem'
                                    }}
                                    className="tool-dropdown-item"
                                >
                                    <span style={{ fontSize: '1.3rem' }}>⚡</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Rate & Shipping Optimizer</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Audit ₹48, ₹56, ₹62 freight slabs & token pools.</div>
                                    </div>
                                </div>

                                {/* Tool 4: Excel P&L Settlement Calculator */}
                                <div 
                                    onClick={() => { onTabChange('pnl-calculator'); setIsToolsDropdownOpen(false); }}
                                    style={{
                                        padding: '0.6rem 0.8rem',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: activeTab === 'pnl-calculator' ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem'
                                    }}
                                    className="tool-dropdown-item"
                                >
                                    <span style={{ fontSize: '1.3rem' }}>📊</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Excel P&L Settlement Calculator</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Reconcile payouts, ads spend & RTO return penalties.</div>
                                    </div>
                                </div>

                                {/* Tool 5: Bulk PDF Label Crop & SKU Sorter */}
                                <div 
                                    onClick={() => { onTabChange('meesho-label-exporter'); setIsToolsDropdownOpen(false); }}
                                    style={{
                                        padding: '0.6rem 0.8rem',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: activeTab === 'meesho-label-exporter' ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '0.75rem'
                                    }}
                                    className="tool-dropdown-item"
                                >
                                    <span style={{ fontSize: '1.3rem' }}>📋</span>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Bulk PDF Label Crop & SKU Sorter</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.1rem' }}>Crop 4x6 thermal shipping labels by SKU.</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Featured Shortcut Link: Pricing */}
                    <button 
                        className="nav-link"
                        onClick={() => {
                            const el = document.getElementById('pricing-affiliate-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            else onTabChange('pricing');
                        }}
                        style={{ fontWeight: 700, padding: '0.45rem 0.75rem', borderRadius: '10px', fontSize: '0.85rem', color: '#475569' }}
                    >
                        💎 Pricing & Affiliate
                    </button>

                    {/* Contact & Support Link */}
                    <button 
                        className="nav-link"
                        onClick={() => onTabChange('contact-us')}
                        style={{ fontWeight: 700, padding: '0.45rem 0.75rem', borderRadius: '10px', fontSize: '0.85rem', color: '#475569' }}
                    >
                        📞 Contact & Support
                    </button>
                </nav>

                {/* Desktop Action Buttons (Right) */}
                <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    {currentUser ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '0.4rem 0.85rem', borderRadius: '10px' }}>
                                💎 {currentUser.credits} Credits
                            </span>
                            <button 
                                className="btn-get-started card-hover-lift" 
                                style={{ padding: '0.65rem 1.35rem', borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', boxShadow: '0 4px 18px rgba(37, 99, 235, 0.35)', fontWeight: 800 }} 
                                onClick={onGoToDashboard}
                            >
                                ⚡ Go to App Dashboard
                            </button>
                        </div>
                    ) : (
                        <>
                            <button 
                                className="btn-signin card-hover-lift" 
                                onClick={onLogin}
                                style={{
                                    background: '#ffffff',
                                    border: '1px solid #cbd5e1',
                                    color: '#0f172a',
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                                }}
                            >
                                Sign In
                            </button>
                            <button 
                                className="btn-get-started card-hover-lift" 
                                onClick={onRegister}
                                style={{
                                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                    border: 'none',
                                    color: '#ffffff',
                                    padding: '0.6rem 1.45rem',
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 18px rgba(37, 99, 235, 0.35)'
                                }}
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Toggle Button */}
                <button 
                    className="mobile-hamburger-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Menu Drawer */}
                {mobileMenuOpen && (
                    <div className="mobile-menu-drawer">
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.4rem 0.75rem' }}>
                            🧰 FREE SUPPLIER TOOLS
                        </div>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'free-image-generator' ? 'active' : ''}`}
                            onClick={() => { onTabChange('free-image-generator'); setMobileMenuOpen(false); }}
                        >
                            🖼️ Free Image Variation Generator (100% Free)
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'meesho-shipping-rates' ? 'active' : ''}`}
                            onClick={() => { onTabChange('meesho-shipping-rates'); setMobileMenuOpen(false); }}
                        >
                            ⚡ Rate & Freight Optimizer
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'pnl-calculator' ? 'active' : ''}`}
                            onClick={() => { onTabChange('pnl-calculator'); setMobileMenuOpen(false); }}
                        >
                            📊 Excel P&L Settlement Calculator
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'meesho-label-exporter' ? 'active' : ''}`}
                            onClick={() => { onTabChange('meesho-label-exporter'); setMobileMenuOpen(false); }}
                        >
                            📋 Bulk Thermal Label Exporter (4x6 Crop)
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'pricing' ? 'active' : ''}`}
                            onClick={() => { onTabChange('pricing'); setMobileMenuOpen(false); }}
                        >
                            💎 Pricing & Affiliate
                        </button>
                        <button 
                            className={`mobile-nav-link ${activeTab === 'contact-us' ? 'active' : ''}`}
                            onClick={() => { onTabChange('contact-us'); setMobileMenuOpen(false); }}
                        >
                            📞 Contact & Support
                        </button>

                        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '0.4rem 0' }} />

                        <button 
                            className="btn-signin-mobile" 
                            onClick={(e) => { 
                                e.preventDefault();
                                e.stopPropagation(); 
                                onLogin(); 
                                setTimeout(() => setMobileMenuOpen(false), 50); 
                            }}
                        >
                            Sign In
                        </button>
                        <button 
                            className="btn-get-started-mobile" 
                            onClick={(e) => { 
                                e.preventDefault();
                                e.stopPropagation(); 
                                onRegister(); 
                                setTimeout(() => setMobileMenuOpen(false), 50); 
                            }}
                        >
                            ⚡ Get Started (3 Free Credits)
                        </button>
                    </div>
                )}
            </header>

            {/* Conditionally Render Subpages */}
            {activeTab === 'bg-remover' && <div style={{ padding: '2.5rem 5%' }}><BulkBackgroundRemoverTab /></div>}
            {activeTab === 'free-image-generator' && <div style={{ padding: '2.5rem 5%' }}><FreeImageGeneratorTab onRegister={onRegister} /></div>}
            {activeTab === 'meesho-shipping-rates' && <MeeshoShippingRatesPage onRegister={onRegister} />}
            {activeTab === 'pnl-calculator' && <div style={{ padding: '2.5rem 5%' }}><PnLCalculatorTab /></div>}
            {activeTab === 'meesho-image-generator' && <MeeshoImageGeneratorPage onRegister={onRegister} />}
            {activeTab === 'meesho-label-exporter' && <MeeshoLabelExporterPage onRegister={onRegister} />}
            {activeTab === 'pricing' && <PricingAffiliatePage onRegister={onRegister} />}
            {activeTab === 'privacy-policy' && <PrivacyPolicyPage />}
            {activeTab === 'refund-policy' && <RefundPolicyPage />}
            {activeTab === 'terms-of-service' && <TermsOfServicePage />}
            {activeTab === 'contact-us' && <ContactUsPage />}

            {/* Custom 404 Not Found Page */}
            {!['bg-remover', 'free-image-generator', 'meesho-shipping-rates', 'pnl-calculator', 'meesho-image-generator', 'meesho-label-exporter', 'pricing', 'privacy-policy', 'refund-policy', 'terms-of-service', 'contact-us'].includes(activeTab) && (
                <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '3.5rem 2rem', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍 404</div>
                    <h1 style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Page Not Found</h1>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                        The page or URL you are looking for does not exist or has been moved.
                    </p>
                    <button 
                        onClick={() => onTabChange('meesho-shipping-rates')}
                        style={{ padding: '0.85rem 1.8rem', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}
                    >
                        🏠 Return to VendorsDesk Home
                    </button>
                </div>
            )}

            {/* General FAQs Accordion Section */}
            {activeTab === 'meesho-shipping-rates' && (
                <section id="faqs" style={{ padding: '5rem 5% 6rem 5%', maxWidth: '800px', margin: '0 auto', borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <h2 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#0f172a' }}>Frequently Asked Questions</h2>
                        <p style={{ color: '#475569', fontSize: '0.95rem' }}>Answers to common e-commerce logistics and duplicate listing queries.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            {
                                q: "What is VendorsDesk and how does it optimize Meesho shipping?",
                                a: "VendorsDesk is an e-commerce auditing tool that cross-references actual product variation weights against the shipping rate matrixes logged by logistics partners on the Meesho Supplier Panel, flagging shipping charge leakages."
                            },
                            {
                                q: "Is it secure to link my Meesho account or session keys?",
                                a: "Absolutely. We do not store master logins or developer API keys. Everything is routed using secure personal session handshake configurations, ensuring full compliance and avoiding Cloudflare blocks."
                            },
                            {
                                q: "How does the SKU-wise Return Risk Auditor work?",
                                a: "Our SKU Return Risk Auditor pulls product payouts and matches them with RTO returns records, identifying listings that produce negative profits due to high return penalty charges."
                            },
                            {
                                q: "How do I claim my 3 free query credits?",
                                a: "Simply sign up with an email ID or Google login. 3 free credits will be credited instantly to your account balance, allowing you to test shipping checks immediately."
                            }
                        ].map((faq, idx) => {
                            const isOpen = !!faqOpen[idx];
                            return (
                                <div key={idx} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.25rem', cursor: 'pointer' }} onClick={() => toggleFaq(idx)}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>{faq.q}</strong>
                                        <span style={{ fontSize: '1rem', color: '#2563eb', fontWeight: 'bold' }}>{isOpen ? '−' : '+'}</span>
                                    </div>
                                    {isOpen && (
                                        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6', borderTop: '1px solid #cbd5e1', paddingTop: '0.75rem' }}>
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer style={{ padding: '4rem 5% 3rem 5%', background: '#ffffff', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚡</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>VendorsDesk</span>
                </div>
                
                <p style={{ color: '#475569', fontSize: '0.8rem', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: '1.5' }}>
                    VendorsDesk is an independent SaaS optimization tool. We are not officially affiliated with Meesho Inc or logistics providers. All audits are derived dynamically via secure user tokens.
                </p>

                {/* Footer Legal & Policy Links */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem', fontSize: '0.85rem' }}>
                    <button 
                        onClick={() => { onTabChange('privacy-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    >
                        🔒 Privacy Policy
                    </button>
                    <button 
                        onClick={() => { onTabChange('refund-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    >
                        🔄 Refund & Cancellation Policy
                    </button>
                    <button 
                        onClick={() => { onTabChange('terms-of-service'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    >
                        📜 Terms of Service
                    </button>
                    <button 
                        onClick={() => { onTabChange('contact-us'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                    >
                        ✉️ Contact Support
                    </button>
                </div>

                <div style={{ color: '#64748b', fontSize: '0.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                    © 2026 VendorsDesk. All rights reserved. | Official Support: hellovendorsdesk@gmail.com
                </div>
            </footer>

        </div>
    );
}


export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [activePage, setActivePage] = useState('home'); // 'home' | 'optimizer' | 'label-exporter' | 'calculator' | 'billing' | 'affiliate'
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
    
    // Auth Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [referralCodeInput, setReferralCodeInput] = useState('');
    const [authError, setAuthError] = useState('');
    const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

    // Billing Upgrade State
    const [selectedPlan, setSelectedPlan] = useState('tier_299');
    const [couponCode, setCouponCode] = useState('');
    const [couponMessage, setCouponMessage] = useState('');
    const [couponError, setCouponError] = useState('');
    const [billingError, setBillingError] = useState('');
    const [billingSuccess, setBillingSuccess] = useState('');
    const [submittingPlanId, setSubmittingPlanId] = useState(null);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    // Copy link status
    const [copiedText, setCopiedText] = useState('Copy');
    const [activeMarketingTab, setActiveMarketingTab] = useState('meesho-shipping-rates');

    const PAGE_ROUTES = {
        '/': 'meesho-shipping-rates',
        '/home': 'meesho-shipping-rates',
        '/background-remover': 'bg-remover',
        '/bg-remover': 'bg-remover',
        '/free-image-generator': 'free-image-generator',
        '/image-generator': 'free-image-generator',
        '/rate-optimizer': 'meesho-shipping-rates',
        '/optimizer': 'meesho-shipping-rates',
        '/pnl-calculator': 'pnl-calculator',
        '/label-exporter': 'meesho-label-exporter',
        '/margin-calculator': 'meesho-shipping-rates',
        '/calculator': 'meesho-shipping-rates',
        '/pricing': 'pricing',
        '/billing': 'pricing',
        '/affiliate': 'pricing',
        '/contact': 'contact-us',
        '/contact-us': 'contact-us',
        '/support': 'contact-us'
    };

    const PAGE_PATHS = {
        'home': '/home',
        'meesho-shipping-rates': '/home',
        'bg-remover': '/background-remover',
        'free-image-generator': '/free-image-generator',
        'optimizer': '/rate-optimizer',
        'pnl-calculator': '/pnl-calculator',
        'label-exporter': '/label-exporter',
        'meesho-label-exporter': '/label-exporter',
        'calculator': '/margin-calculator',
        'pricing': '/pricing',
        'billing': '/pricing',
        'affiliate': '/affiliate',
        'contact-us': '/contact-us'
    };

    const navigateToPage = (pageKey, pushState = true) => {
        const mappedTab = PAGE_ROUTES[pageKey] || pageKey;
        setActivePage(mappedTab);
        setActiveMarketingTab(mappedTab);
        updatePageSEO(pageKey);
        const targetPath = PAGE_PATHS[mappedTab] || '/home';
        if (pushState && window.location.pathname !== targetPath) {
            window.history.pushState({ page: mappedTab }, '', targetPath);
        }
    };

    useEffect(() => {
        const currentPath = window.location.pathname.toLowerCase();
        const initialTab = PAGE_ROUTES[currentPath] || 'meesho-shipping-rates';
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


    // Google hybrid credentials state
    const [passwordSetupOpen, setPasswordSetupOpen] = useState(false);
    const [googleEmail, setGoogleEmail] = useState('');
    const [setupPassword, setSetupPassword] = useState('');
    const [setupError, setSetupError] = useState('');
    const [setupSuccess, setSetupSuccess] = useState('');

    const isAppDomain = window.location.hostname === 'app.vendorsdesk.in' || window.location.hostname.startsWith('app.');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');
        const tokenParam = urlParams.get('token');
        const modeParam = urlParams.get('mode');
        const cashfreeOrderId = urlParams.get('cashfree_order_id');

        if (tokenParam) {
            localStorage.setItem('vendorsdesk_token', tokenParam);
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Cashfree Payment Return Auto-Verification
        if (cashfreeOrderId) {
            window.history.replaceState({}, document.title, window.location.pathname);
            verifyCashfreePayment(cashfreeOrderId);
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

    const verifyCashfreePayment = async (orderId) => {
        setBillingError('');
        setBillingSuccess('Verifying Cashfree payment & updating balance...');
        try {
            const token = localStorage.getItem('vendorsdesk_token');
            const data = await secureFetch('/api/billing/cashfree/verify', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { orderId }
            });
            if (data.success) {
                setBillingSuccess(data.message || 'Payment verified! Credits added.');
                await checkUserAuth();
                setTimeout(() => setBillingSuccess(''), 4000);
            } else {
                setBillingError(data.error || 'Payment verification failed.');
            }
        } catch (e) {
            console.error('Cashfree verify error:', e);
            setBillingError('Could not verify Cashfree payment.');
        }
    };

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

    // Google Sign-In button initialization
    useEffect(() => {
        if (authModalOpen) {
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const timer = setTimeout(() => {
                try {
                    const btnContainer = document.getElementById("google-signin-btn");
                    if (!isLocalhost && window.google && window.google.accounts && window.google.accounts.id && btnContainer) {
                        btnContainer.innerHTML = '';
                        google.accounts.id.initialize({
                            client_id: "148360176717-1dpf5u3v99ckjhu5gruud4f9u17uqoc2.apps.googleusercontent.com",
                            callback: handleGoogleCredentialResponse,
                            auto_select: false,
                            cancel_on_tap_outside: true
                        });
                        google.accounts.id.renderButton(
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

    const handleGoogleCredentialResponse = async (response) => {
        if (response && response.credential) {
            await processGoogleLogin(response.credential);
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

    const handleLogout = () => {
        localStorage.removeItem('vendorsdesk_token');
        setCurrentUser(null);
        setAuthModalOpen(true);
        setActivePage('home');
    };

    const handleApplyCoupon = async () => {
        setCouponError('');
        setCouponMessage('');
        if (!couponCode) return;
        setIsApplyingCoupon(true);

        const token = localStorage.getItem('vendorsdesk_token');
        try {
            const data = await secureFetch('/api/billing/coupon/apply', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { code: couponCode }
            });

            if (data.success) {
                const discount = data.coupon.discountType === 'percentage' 
                    ? `${data.coupon.discountValue}%` 
                    : `₹${data.coupon.discountValue}`;
                setCouponMessage(`Coupon Applied! Discount: ${discount}`);
            } else {
                setCouponError(data.error || 'Invalid coupon.');
            }
        } catch (e) {
            setCouponError('Coupon validation error.');
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const handleSubscribe = async (planToSubscribe) => {
        const targetPlan = planToSubscribe || selectedPlan;
        setBillingError('');
        setBillingSuccess('');
        setSubmittingPlanId(targetPlan);
        const token = localStorage.getItem('vendorsdesk_token');

        if (!token) {
            setAuthModalOpen(true);
            setAuthError('Please sign in to purchase or upgrade your plan.');
            setSubmittingPlanId(null);
            return;
        }
        
        try {
            // First try Cashfree Payment Gateway order creation
            const data = await secureFetch('/api/billing/cashfree/create-order', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { plan: targetPlan, couponCode }
            });

            if (data.success && data.paymentSessionId) {
                setBillingSuccess('Redirecting to Cashfree Secure Payment Gateway...');
                
                // Dynamically load Cashfree V3 SDK script if not loaded
                const triggerCheckout = () => {
                    const cashfree = window.Cashfree({ mode: data.cfEnv === 'PRODUCTION' ? 'production' : 'sandbox' });
                    cashfree.checkout({
                        paymentSessionId: data.paymentSessionId,
                        redirectTarget: '_self'
                    });
                };

                if (!window.Cashfree) {
                    const script = document.createElement('script');
                    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
                    script.onload = triggerCheckout;
                    document.body.appendChild(script);
                } else {
                    triggerCheckout();
                }
                return;
            }

            // Fallback for dev mode / testing if Cashfree is not yet configured
            const fallbackData = await secureFetch('/api/billing/subscribe', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: { plan: targetPlan, couponCode }
            });

            if (fallbackData.success) {
                setBillingSuccess(`Upgrade Successful! ${fallbackData.message}`);
                setCouponCode('');
                setCouponMessage('');
                await checkUserAuth();
                setTimeout(() => {
                    setBillingSuccess('');
                    setActivePage('home');
                }, 2000);
            } else {
                setBillingError(data.error || fallbackData.error || 'Subscription failed.');
            }
        } catch (e) {
            console.error('Subscription Error:', e);
            setBillingError('Network subscription failed.');
        } finally {
            setSubmittingPlanId(null);
        }
    };

    const copyReferralLink = () => {
        if (!currentUser) return;
        const refLink = `${window.location.origin}/index.html?ref=${currentUser.referralCode}`;
        navigator.clipboard.writeText(refLink).then(() => {
            setCopiedText('Copied!');
            setTimeout(() => setCopiedText('Copy'), 2000);
        });
    };

    // Auth + password-setup modals. Rendered in BOTH the logged-out and logged-in
    // views so the login/signup modal actually appears when a visitor clicks
    // "Sign In" on the marketing site.
    const authModals = (
        <>
            {authModalOpen && (
                <div className="auth-modal-overlay" style={{
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
                }}>
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
                            onClick={() => { setAuthModalOpen(false); setAuthError(''); }}
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
            )}

            {passwordSetupOpen && (
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
            )}
        </>
    );


    if (isLoadingAuth) {
        return (
            <div style={{
                display: 'flex',
                minHeight: '100vh',
                width: '100vw',
                background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontFamily: 'Outfit, sans-serif',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Glowing Background Orb */}
                <div style={{
                    position: 'absolute', width: '380px', height: '380px',
                    borderRadius: '50%', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(124, 58, 237, 0) 70%)',
                    filter: 'blur(45px)', animation: 'pulse 3s ease-in-out infinite'
                }} />

                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    padding: '3rem 3.5rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                }}>
                    {/* Brand Logo & Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src="/logo-icon.png" alt="VendorsDesk Logo" style={{ height: '48px', width: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        <span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 40%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            VendorsDesk
                        </span>
                    </div>

                    {/* Dual-Ring Animated Spinner */}
                    <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            borderRadius: '50%', border: '3px solid transparent',
                            borderTopColor: '#3b82f6', borderRightColor: '#8b5cf6',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <div style={{
                            position: 'absolute', top: '6px', left: '6px', width: '44px', height: '44px',
                            borderRadius: '50%', border: '3px solid transparent',
                            borderBottomColor: '#ec4899', borderLeftColor: '#10b981',
                            animation: 'spin 1.5s linear infinite reverse'
                        }} />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.02em', color: '#f8fafc', marginBottom: '0.35rem' }}>
                            Initializing VendorsDesk Audit Engine...
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.05em' }}>
                            SMART TOOLS FOR SMART SELLERS
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleGoToAppLogin = () => {
        if (window.location.hostname.includes('vendorsdesk.in') && !isAppDomain) {
            window.location.href = 'https://app.vendorsdesk.in?mode=login';
        } else {
            setAuthMode('login');
            setAuthModalOpen(true);
        }
    };

    const handleGoToAppSignup = () => {
        if (window.location.hostname.includes('vendorsdesk.in') && !isAppDomain) {
            window.location.href = 'https://app.vendorsdesk.in?mode=signup';
        } else {
            setAuthMode('signup');
            setAuthModalOpen(true);
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

    // 1. If visiting main website domain (vendorsdesk.in / www.vendorsdesk.in): ALWAYS show Public Marketing Website!
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
                {authModals}
            </>
        );
    }

    // 2. On app.vendorsdesk.in: If not logged in, ask for credentials (open auth modal)
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
                {authModals}
            </>
        );
    }

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
                {authModals}
            </>
        );
    }
    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-gradient)', color: 'var(--text-primary)' }}>
            
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: '#ffffff',
                borderRight: '1px solid #cbd5e1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem 1.25rem',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                zIndex: 100,
                overflowY: 'auto'
            }}>
                <div>
                    {/* Brand */}
                    <div 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2.5rem', cursor: 'pointer' }}
                        onClick={() => navigateToPage('home')}
                    >
                        <img src="/logo-icon.png" alt="VendorsDesk Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.02em', color: '#0f172a' }}>
                            VendorsDesk
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <button 
                            className={`sidebar-link ${activePage === 'home' ? 'active' : ''}`}
                            onClick={() => navigateToPage('home')}
                        >
                            🏠 Home Dashboard
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'bg-remover' ? 'active' : ''}`}
                            onClick={() => navigateToPage('bg-remover')}
                            style={{ background: 'rgba(37, 99, 235, 0.08)', color: '#2563eb', fontWeight: 700 }}
                        >
                            🖼️ Bulk Background Remover
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'free-image-generator' ? 'active' : ''}`}
                            onClick={() => navigateToPage('free-image-generator')}
                        >
                            🆓 Free Image Generator
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'optimizer' ? 'active' : ''}`}
                            onClick={() => navigateToPage('optimizer')}
                        >
                            ⚡ Rate Optimizer
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'pnl-calculator' ? 'active' : ''}`}
                            onClick={() => navigateToPage('pnl-calculator')}
                        >
                            📊 Excel P&L Calculator
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'label-exporter' ? 'active' : ''}`}
                            onClick={() => navigateToPage('label-exporter')}
                        >
                            📋 Label Exporter
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'calculator' ? 'active' : ''}`}
                            onClick={() => navigateToPage('calculator')}
                        >
                            🧮 Margin Calculator
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'billing' ? 'active' : ''}`}
                            onClick={() => navigateToPage('billing')}
                            style={{ position: 'relative' }}
                        >
                            💳 Purchase Plan
                            {currentUser && currentUser.credits <= 0 && (
                                <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#ffffff', fontSize: '0.6rem', padding: '0.15rem 0.4rem', borderRadius: '6px', fontWeight: 800 }}>GET CREDITS</span>
                            )}
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'affiliate' ? 'active' : ''}`}
                            onClick={() => navigateToPage('affiliate')}
                        >
                            👥 Affiliate Program
                        </button>
                        <button 
                            className={`sidebar-link ${activePage === 'website' ? 'active' : ''}`}
                            onClick={() => navigateToPage('home')}
                            style={{ marginTop: '0.5rem', background: 'rgba(37, 99, 235, 0.06)', border: '1px solid rgba(37, 99, 235, 0.2)', color: '#2563eb', fontWeight: 700 }}
                        >
                            🌐 View Website & Plans
                        </button>
                    </nav>
                </div>

                {/* Profile Section Footer */}
                {currentUser && (
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
                            <div style={{ fontSize: '0.75rem', color: currentUser.credits <= 0 ? '#ef4444' : 'var(--text-secondary)', fontWeight: currentUser.credits <= 0 ? 700 : 400 }}>
                                💎 {currentUser.credits} Credits {currentUser.credits <= 0 && '(0 Remaining)'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#2563eb', textTransform: 'uppercase', fontWeight: 'bold', marginTop: '0.15rem' }}>Tier: {currentUser.tier}</div>
                        </div>
                        <button className="btn-action btn-action-danger" onClick={handleLogout} style={{ width: '100%' }}>Logout</button>
                    </div>
                )}
            </aside>

            {/* Main Area */}
            <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)', flexGrow: 1, padding: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '100%' }}>
                    
                    {/* Top 0-Credits Banner Notice */}
                    {currentUser && currentUser.credits <= 0 && currentUser.tier !== 'enterprise' && activePage !== 'billing' && activePage !== 'website' && (
                        <div style={{
                            background: 'linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)',
                            border: '1px solid #bfdbfe',
                            borderRadius: '14px',
                            padding: '0.9rem 1.25rem',
                            marginBottom: '1.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'space-between',
                            gap: '1rem',
                            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '1.4rem' }}>⚠️</span>
                                <div>
                                    <strong style={{ fontSize: '0.9rem', color: '#1e40af', display: 'block' }}>You have 0 Credits remaining!</strong>
                                    <span style={{ fontSize: '0.8rem', color: '#3b82f6' }}>If you want to generate image variations and check lower shipping rates, please purchase a plan.</span>
                                </div>
                            </div>
                            <button 
                                style={{
                                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '10px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                                }}
                                onClick={() => setActivePage('billing')}
                            >
                                💳 Purchase Plan Now
                            </button>
                        </div>
                    )}

                    {/* Render active tabs/pages */}
                    {activePage === 'home' && (
                        <HomeTab onNavigate={(page) => setActivePage(page)} />
                    )}

                    {activePage === 'bg-remover' && (
                        <BulkBackgroundRemoverTab />
                    )}

                    {activePage === 'free-image-generator' && (
                        <FreeImageGeneratorTab onRegister={handleGoToAppSignup} />
                    )}

                    {activePage === 'optimizer' && (
                        <div className="main-container">
                            <OptimizerTab 
                                currentUser={currentUser}
                                onCreditsChange={(cr) => setCurrentUser(prev => ({ ...prev, credits: cr }))} 
                                onNavigateToBilling={() => setActivePage('billing')}
                            />
                        </div>
                    )}

                    {activePage === 'pnl-calculator' && (
                        <PnLCalculatorTab />
                    )}

                    {activePage === 'label-exporter' && (
                        <LabelExporterTab 
                            currentUser={currentUser} 
                            onNavigateToBilling={() => setActivePage('billing')} 
                        />
                    )}

                    {activePage === 'calculator' && (
                        <CalculatorTab />
                    )}

                    {activePage === 'billing' && (
                        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>Account Upgrade Tiers</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Choose your plan to acquire query credits and start optimizing catalog variation rates.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                                {/* Starter Plan - ₹99 */}
                                <div 
                                    className="plan-card" 
                                    style={{
                                        borderColor: selectedPlan === 'tier_99' ? '#2563eb' : '#cbd5e1',
                                        background: selectedPlan === 'tier_99' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                                        borderRadius: '14px',
                                        padding: '1.25rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                    onClick={() => setSelectedPlan('tier_99')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Starter</strong>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹99</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>⚡ Adds <strong>40 Credits</strong> (30 Days)</span>
                                </div>

                                {/* Growth Plan - ₹299 (Best Value) */}
                                <div 
                                    className="plan-card" 
                                    style={{
                                        borderColor: selectedPlan === 'tier_299' ? '#2563eb' : '#cbd5e1',
                                        background: selectedPlan === 'tier_299' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                                        borderRadius: '14px',
                                        padding: '1.25rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                        position: 'relative'
                                    }}
                                    onClick={() => setSelectedPlan('tier_299')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Growth (Best Value)</strong>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹299</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🔥 Adds <strong>150 Credits</strong> (45 Days)</span>
                                </div>

                                {/* Pro Plan - ₹599 */}
                                <div 
                                    className="plan-card" 
                                    style={{
                                        borderColor: selectedPlan === 'tier_599' ? '#2563eb' : '#cbd5e1',
                                        background: selectedPlan === 'tier_599' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                                        borderRadius: '14px',
                                        padding: '1.25rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                    onClick={() => setSelectedPlan('tier_599')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Pro</strong>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹599</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🚀 Adds <strong>350 Credits</strong> (60 Days)</span>
                                </div>

                                {/* Enterprise Plan - ₹999 */}
                                <div 
                                    className="plan-card" 
                                    style={{
                                        borderColor: selectedPlan === 'tier_999' ? '#2563eb' : '#cbd5e1',
                                        background: selectedPlan === 'tier_999' ? 'rgba(37, 99, 235, 0.08)' : '#f8fafc',
                                        borderRadius: '14px',
                                        padding: '1.25rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem'
                                    }}
                                    onClick={() => setSelectedPlan('tier_999')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <strong style={{ fontSize: '1rem', color: '#0f172a' }}>Enterprise</strong>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#2563eb' }}>₹999</span>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>👑 Adds <strong>750 Credits</strong> (90 Days)</span>
                                </div>
                            </div>

                            {/* Coupon Section */}
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                                <input 
                                    type="text" 
                                    placeholder="Enter Coupon (e.g. WELCOME50)" 
                                    value={couponCode} 
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    disabled={isApplyingCoupon || !!submittingPlanId}
                                    style={{ flex: 1, textTransform: 'uppercase' }}
                                />
                                <button 
                                    className="btn-action btn-action-primary" 
                                    disabled={isApplyingCoupon || !!submittingPlanId || !couponCode}
                                    style={{ padding: '0 1.5rem', whiteSpace: 'nowrap', opacity: (isApplyingCoupon || !!submittingPlanId || !couponCode) ? 0.6 : 1 }} 
                                    onClick={handleApplyCoupon}
                                >
                                    {isApplyingCoupon ? 'Applying...' : 'Apply Coupon'}
                                </button>
                            </div>
                            {couponMessage && <div style={{ color: 'var(--success)', fontSize: '0.85rem' }}>{couponMessage}</div>}
                            {couponError && <div style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{couponError}</div>}

                            {billingError && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{billingError}</div>}
                            {billingSuccess && <div style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{billingSuccess}</div>}

                            <button 
                                className="btn-submit-form" 
                                disabled={!!submittingPlanId}
                                onClick={() => handleSubscribe()} 
                                style={{ 
                                    marginTop: '0.5rem',
                                    opacity: submittingPlanId ? 0.75 : 1,
                                    cursor: submittingPlanId ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {submittingPlanId ? (
                                    <>
                                        <span style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                        Connecting to Cashfree Gateway...
                                    </>
                                ) : (
                                    'Pay & Upgrade Subscription'
                                )}
                            </button>
                        </div>
                    )}

                    {activePage === 'affiliate' && currentUser && (
                        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>Affiliate Program</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Share your code with other sellers. Earn substantial credits when they make their first purchase!</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '0.5rem 0' }}>
                                <div className="stat-card" style={{ background: '#f8fafc', border: '1px solid var(--card-border)', padding: '1.25rem' }}>
                                    <span className="stat-label">Total Referrals</span>
                                    <span className="stat-val" style={{ color: '#c084fc', fontSize: '2rem' }}>{currentUser.referralsCount || 0}</span>
                                    <span className="stat-footer">Sellers signed up</span>
                                </div>
                                <div className="stat-card" style={{ background: '#f8fafc', border: '1px solid var(--card-border)', padding: '1.25rem' }}>
                                    <span className="stat-label">Commission Rate</span>
                                    <span className="stat-val" style={{ color: 'var(--success)', fontSize: '2rem' }}>33%</span>
                                    <span className="stat-footer">1/3 of referee's first plan credits</span>
                                </div>
                            </div>

                            <div className="form-group" style={{ background: '#f8fafc', border: '1px solid var(--card-border)', padding: '1.25rem', borderRadius: '12px' }}>
                                <label style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Your Referral Link</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input 
                                        type="text" 
                                        readOnly 
                                        value={`${window.location.origin}/index.html?ref=${currentUser.referralCode}`} 
                                        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--text-secondary)' }}
                                    />
                                    <button className="btn-action" style={{ padding: '0 1.5rem' }} onClick={copyReferralLink}>
                                        {copiedText}
                                    </button>
                                </div>
                            </div>

                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>How it Works:</strong>
                                <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                    <li>Copy your unique referral link and send it to other sellers.</li>
                                    <li>When they sign up via your link, they receive **5 extra free credits** (total 8 free credits).</li>
                                    <li>When they buy their first plan, **you receive 1/3 of their plan's credits** (e.g. they buy Standard 200 credits plan, you receive 66 credits commission).</li>
                                    <li>Referral payouts are one-time per user and apply only on their first purchase.</li>
                                </ol>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Auth Modal Overlay */}
            {authModalOpen && (
                <div className="auth-modal-overlay">
                    <div className="auth-modal-card">
                        {/* Close Modal Button */}
                        <button 
                            type="button"
                            onClick={() => setAuthModalOpen(false)}
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '10px',
                                background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#ffffff', fontWeight: 800, fontSize: '1.1rem'
                            }}>⚡</div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Outfit', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>VendorsDesk</span>
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

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.25rem', fontSize: '0.78rem', color: '#64748b' }}>
                                <input 
                                    type="checkbox" 
                                    id="webTermsCheck"
                                    defaultChecked={true} 
                                    style={{ width: '15px', height: '15px', marginTop: '2px', accentColor: '#2563eb', cursor: 'pointer' }}
                                />
                                <label htmlFor="webTermsCheck" style={{ cursor: 'pointer', userSelect: 'none', lineHeight: '1.4' }}>
                                    I agree to the <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms & Conditions:\n\n1. Usage is subject to platform terms.\n2. Do not misuse API credits.\n3. Account data is confidential.'); }} style={{ color: '#2563eb', textDecoration: 'underline' }}>Terms & Conditions</a> and <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy:\n\n1. Your credentials and store data are encrypted.\n2. We do not sell user data to third parties.'); }} style={{ color: '#2563eb', textDecoration: 'underline' }}>Privacy Policy</a>.
                                </label>
                            </div>

                            {authError && <div style={{ color: 'var(--danger)', fontSize: '0.82rem', textAlign: 'center', background: 'rgba(220, 38, 38, 0.08)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>{authError}</div>}
                            <button className="btn-submit-form" type="submit" style={{ padding: '0.75rem', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700, marginTop: '0.35rem', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}>
                                {authMode === 'login' ? 'Sign In to Account' : 'Create Free Account'}
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
            )}

            {/* Password Configuration Setup Modal */}
            {passwordSetupOpen && (
                <div className="auth-modal-overlay">
                    <div className="auth-modal-card" style={{ maxWidth: '380px' }}>
                        <h3 style={{ textAlign: 'center', fontSize: '1.25rem', fontFamily: 'Outfit', color: '#6366f1', fontWeight: 700 }}>
                            Setup Account Password
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            Configure a password for <strong>{googleEmail}</strong> to log in directly without Google in the future.
                        </p>

                        <form onSubmit={handlePasswordSetupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <div className="form-group" style={{ marginBottom: 0, gap: '0.3rem' }}>
                                <label style={{ fontWeight: 600, fontSize: '0.78rem' }}>Create Password</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    value={setupPassword} 
                                    onChange={(e) => setSetupPassword(e.target.value)} 
                                    required 
                                    style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                                />
                            </div>

                            {setupError && <div style={{ color: 'var(--danger)', fontSize: '0.78rem', textAlign: 'center' }}>{setupError}</div>}
                            {setupSuccess && <div style={{ color: 'var(--success)', fontSize: '0.78rem', textAlign: 'center' }}>{setupSuccess}</div>}

                            <button className="btn-submit-form" type="submit" style={{ padding: '0.65rem', borderRadius: '8px' }}>
                                Configure Password & Finish
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Global Floating Feedback & Suggestions Widget */}
            <FeedbackWidget currentUser={currentUser} />
        </div>
    );
}
