import React from 'react';
import { 
    LayoutDashboard, 
    TrendingDown, 
    Printer, 
    FileSpreadsheet, 
    MoreHorizontal 
} from 'lucide-react';

export default function MobileBottomNav({
    activePage,
    handleNavigate,
    onOpenMore
}) {
    return (
        <nav className="vd-bottom-nav">
            <button 
                className={`vd-bottom-nav-item ${activePage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavigate('home')}
            >
                <LayoutDashboard size={20} />
                <span>Home</span>
            </button>
            <button 
                className={`vd-bottom-nav-item ${(activePage === 'optimizer' || activePage === 'meesho-shipping-rates') ? 'active' : ''}`}
                onClick={() => handleNavigate('optimizer')}
            >
                <TrendingDown size={20} />
                <span>Optimizer</span>
            </button>
            <button 
                className={`vd-bottom-nav-item ${(activePage === 'label-exporter' || activePage === 'meesho-label-exporter') ? 'active' : ''}`}
                onClick={() => handleNavigate('label-exporter')}
            >
                <Printer size={20} />
                <span>Labels</span>
            </button>
            <button 
                className={`vd-bottom-nav-item ${activePage === 'pnl-calculator' ? 'active' : ''}`}
                onClick={() => handleNavigate('pnl-calculator')}
            >
                <FileSpreadsheet size={20} />
                <span>P&L</span>
            </button>
            <button 
                className="vd-bottom-nav-item"
                onClick={onOpenMore}
            >
                <MoreHorizontal size={20} />
                <span>More</span>
            </button>
        </nav>
    );
}
