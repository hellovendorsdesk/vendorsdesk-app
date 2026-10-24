import React from 'react';
import { 
    LayoutDashboard, 
    Sparkles, 
    Layers, 
    FileText, 
    TrendingDown, 
    FileSpreadsheet, 
    Printer, 
    Calculator, 
    CreditCard, 
    Users, 
    Globe, 
    LogOut 
} from 'lucide-react';

export default function AppSidebar({
    activePage,
    handleNavigate,
    mobileNavOpen,
    currentUser,
    handleLogout
}) {
    return (
        <aside className={`dashboard-sidebar ${mobileNavOpen ? 'mobile-open' : ''}`}>
            <div>
                {/* Brand Header */}
                <div 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2rem', cursor: 'pointer' }}
                    onClick={() => handleNavigate('home')}
                >
                    <img 
                        src="/logo-icon.png" 
                        alt="VendorsDesk Logo" 
                        style={{ height: '34px', width: 'auto', objectFit: 'contain' }} 
                        onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div>
                        <span style={{ fontFamily: 'Plus Jakarta Sans, Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#0f172a', display: 'block', lineHeight: 1.1 }}>
                            VendorsDesk
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600, letterSpacing: '0.04em' }}>
                            SELLER SUITE
                        </span>
                    </div>
                </div>

                {/* Navigation Links with Structured Groups */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <button 
                        className={`sidebar-link ${activePage === 'home' ? 'active' : ''}`}
                        onClick={() => handleNavigate('home')}
                    >
                        <LayoutDashboard size={18} />
                        <span>Dashboard Overview</span>
                    </button>

                    <div className="sidebar-section-title">Core Seller Tools</div>
                    
                    <button 
                        className={`sidebar-link ${(activePage === 'optimizer' || activePage === 'meesho-shipping-rates') ? 'active' : ''}`}
                        onClick={() => handleNavigate('optimizer')}
                    >
                        <TrendingDown size={18} />
                        <span>Rate Optimizer</span>
                    </button>

                    <button 
                        className={`sidebar-link ${(activePage === 'label-exporter' || activePage === 'meesho-label-exporter') ? 'active' : ''}`}
                        onClick={() => handleNavigate('label-exporter')}
                    >
                        <Printer size={18} />
                        <span>4x6 Label Exporter</span>
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'pnl-calculator' ? 'active' : ''}`}
                        onClick={() => handleNavigate('pnl-calculator')}
                    >
                        <FileSpreadsheet size={18} />
                        <span>Excel P&L Calculator</span>
                    </button>

                    <button 
                        className={`sidebar-link ${(activePage === 'calculator' || activePage === 'margin-calculator') ? 'active' : ''}`}
                        onClick={() => handleNavigate('calculator')}
                    >
                        <Calculator size={18} />
                        <span>Margin Calculator</span>
                    </button>

                    <div className="sidebar-section-title">AI & Catalog Studio</div>

                    <button 
                        className={`sidebar-link ${activePage === 'templates' ? 'active' : ''}`}
                        onClick={() => handleNavigate('templates')}
                    >
                        <FileText size={18} />
                        <span>Listing Templates</span>
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'bg-remover' ? 'active' : ''}`}
                        onClick={() => handleNavigate('bg-remover')}
                    >
                        <Layers size={18} />
                        <span>Background Remover</span>
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'free-image-generator' ? 'active' : ''}`}
                        onClick={() => handleNavigate('free-image-generator')}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <Sparkles size={18} color="#0d9488" />
                            <span>Meesho Image Studio</span>
                        </div>
                        <span style={{ fontSize: '0.65rem', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.1rem 0.45rem', borderRadius: '6px', fontWeight: 800 }}>FREE</span>
                    </button>

                    <div className="sidebar-section-title">Billing & Account</div>

                    <button 
                        className={`sidebar-link ${(activePage === 'billing' || activePage === 'pricing') ? 'active' : ''}`}
                        onClick={() => handleNavigate('billing')}
                    >
                        <CreditCard size={18} />
                        <span>Purchase Credits</span>
                        {currentUser && currentUser.credits <= 0 && (
                            <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#ffffff', fontSize: '0.62rem', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>GET</span>
                        )}
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'affiliate' ? 'active' : ''}`}
                        onClick={() => handleNavigate('affiliate')}
                    >
                        <Users size={18} />
                        <span>Affiliate Program</span>
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'website' ? 'active' : ''}`}
                        onClick={() => handleNavigate('home')}
                    >
                        <Globe size={18} />
                        <span>Public Website</span>
                    </button>
                </nav>
            </div>

            {/* Profile Section Footer */}
            {currentUser && (
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: '#2563eb', color: '#ffffff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
                        }}>
                            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div style={{ overflow: 'hidden', flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#0f172a' }}>
                                {currentUser.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#64748b' }}>
                                <span style={{ color: currentUser.credits <= 0 ? '#ef4444' : '#2563eb', fontWeight: 700 }}>
                                    {currentUser.credits} Credits
                                </span>
                                <span>•</span>
                                <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>{currentUser.tier}</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        style={{ 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            width: '100%', padding: '0.55rem', borderRadius: '8px',
                            border: '1px solid #fee2e2', background: '#fef2f2', color: '#b91c1c',
                            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease'
                        }}
                    >
                        <LogOut size={15} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </aside>
    );
}
