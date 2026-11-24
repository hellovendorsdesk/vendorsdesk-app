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
                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.75rem', cursor: 'pointer' }}
                    onClick={() => handleNavigate('home')}
                >
                    <img 
                        src="/logo-icon.png" 
                        alt="VendorsDesk Logo" 
                        style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
                        onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                    <div>
                        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#ffffff', display: 'block', lineHeight: 1.1 }}>
                            VendorsDesk
                        </span>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.02em' }}>
                            Seller suite
                        </span>
                    </div>
                </div>

                {/* Navigation Links with Structured Groups */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <button 
                        className={`sidebar-link ${activePage === 'home' ? 'active' : ''}`}
                        onClick={() => handleNavigate('home')}
                    >
                        <LayoutDashboard size={17} />
                        <span>Overview</span>
                    </button>

                    <div className="sidebar-section-title">Seller tools</div>
                    
                    <button 
                        className={`sidebar-link ${(activePage === 'optimizer' || activePage === 'meesho-shipping-rates') ? 'active' : ''}`}
                        onClick={() => handleNavigate('optimizer')}
                    >
                        <TrendingDown size={17} />
                        <span>Rate optimizer</span>
                    </button>

                    <button 
                        className={`sidebar-link ${(activePage === 'label-exporter' || activePage === 'meesho-label-exporter') ? 'active' : ''}`}
                        onClick={() => handleNavigate('label-exporter')}
                    >
                        <Printer size={17} />
                        <span>4×6 label cropper</span>
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'pnl-calculator' ? 'active' : ''}`}
                        onClick={() => handleNavigate('pnl-calculator')}
                    >
                        <FileSpreadsheet size={17} />
                        <span>Excel P&L calculator</span>
                    </button>

                    <button 
                        className={`sidebar-link ${(activePage === 'calculator' || activePage === 'margin-calculator') ? 'active' : ''}`}
                        onClick={() => handleNavigate('calculator')}
                    >
                        <Calculator size={17} />
                        <span>Margin calculator</span>
                    </button>

                    <div className="sidebar-section-title">Catalog studio</div>

                    <button 
                        className={`sidebar-link ${activePage === 'templates' ? 'active' : ''}`}
                        onClick={() => handleNavigate('templates')}
                    >
                        <FileText size={17} />
                        <span>Listing templates</span>
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'bg-remover' ? 'active' : ''}`}
                        onClick={() => handleNavigate('bg-remover')}
                    >
                        <Layers size={17} />
                        <span>Background remover</span>
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'free-image-generator' ? 'active' : ''}`}
                        onClick={() => handleNavigate('free-image-generator')}
                    >
                        <Sparkles size={17} />
                        <span>Image variation studio</span>
                    </button>

                    <div className="sidebar-section-title">Billing & account</div>

                    <button 
                        className={`sidebar-link ${(activePage === 'billing' || activePage === 'pricing') ? 'active' : ''}`}
                        onClick={() => handleNavigate('billing')}
                    >
                        <CreditCard size={17} />
                        <span>Usage credits</span>
                        {currentUser && currentUser.credits <= 0 && (
                            <span style={{ marginLeft: 'auto', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', fontSize: '0.62rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>0 CREDITS</span>
                        )}
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'affiliate' ? 'active' : ''}`}
                        onClick={() => handleNavigate('affiliate')}
                    >
                        <Users size={17} />
                        <span>Affiliate program</span>
                    </button>

                    <button 
                        className={`sidebar-link ${activePage === 'website' ? 'active' : ''}`}
                        onClick={() => handleNavigate('home')}
                    >
                        <Globe size={17} />
                        <span>Website</span>
                    </button>
                </nav>
            </div>

            {/* Profile Section Footer */}
            {currentUser && (
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                            width: '34px', height: '34px', borderRadius: '8px',
                            background: '#182033', color: '#ffffff',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 600, fontSize: '0.88rem', flexShrink: 0
                        }}>
                            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div style={{ overflow: 'hidden', flex: 1 }}>
                            <div style={{ fontWeight: 500, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#f8fafc' }}>
                                {currentUser.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#94a3b8' }}>
                                <span style={{ color: currentUser.credits <= 0 ? '#f87171' : '#38bdf8', fontWeight: 600 }}>
                                    {currentUser.credits} credits
                                </span>
                                <span>•</span>
                                <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{currentUser.tier || 'Free'}</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        style={{ 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            width: '100%', padding: '0.5rem', borderRadius: '8px',
                            border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.08)', color: '#f87171',
                            fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s ease'
                        }}
                    >
                        <LogOut size={14} />
                        <span>Log out</span>
                    </button>
                </div>
            )}
        </aside>
    );
}
