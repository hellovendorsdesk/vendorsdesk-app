import React, { useState, useRef } from 'react';
import { 
    Printer, 
    UploadCloud, 
    FileText, 
    CheckCircle2, 
    FolderOpen, 
    Lock, 
    Filter, 
    RotateCcw, 
    Download, 
    Layers, 
    Truck, 
    AlertCircle 
} from 'lucide-react';

const MOCK_ORDERS = [
    { id: 'ORD-1001', sku: 'Kurtis-Red-M', courier: 'Delhivery', qty: 1, date: 'Jul 11, 2026' },
    { id: 'ORD-1002', sku: 'Kurtis-Red-M', courier: 'Shadowfax', qty: 2, date: 'Jul 11, 2026' },
    { id: 'ORD-1003', sku: 'Kurtis-Blue-L', courier: 'Delhivery', qty: 1, date: 'Jul 11, 2026' },
    { id: 'ORD-1004', sku: 'Sarees-Silk-Green', courier: 'Xpressbees', qty: 1, date: 'Jul 11, 2026' },
    { id: 'ORD-1005', sku: 'Sarees-Silk-Green', courier: 'Shadowfax', qty: 1, date: 'Jul 11, 2026' },
    { id: 'ORD-1006', sku: 'Shirts-Black-XL', courier: 'Delhivery', qty: 3, date: 'Jul 10, 2026' }
];

export default function LabelExporterTab({ currentUser, onNavigateToBilling }) {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [orders, setOrders] = useState([]);
    
    // Filters
    const [selectedSku, setSelectedSku] = useState('All');
    const [selectedCourier, setSelectedCourier] = useState('All');
    const [selectedOrders, setSelectedOrders] = useState({});

    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsParsing(true);
        setTimeout(() => {
            setOrders(MOCK_ORDERS);
            const initialSelected = {};
            MOCK_ORDERS.forEach(o => { initialSelected[o.id] = true; });
            setSelectedOrders(initialSelected);
            setIsParsing(false);
            setFileUploaded(true);
        }, 1200);
    };

    const handleReset = () => {
        setFileUploaded(false);
        setOrders([]);
        setSelectedOrders({});
        setSelectedSku('All');
        setSelectedCourier('All');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const toggleOrderSelect = (id) => {
        setSelectedOrders(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSelectAll = (checked) => {
        const updated = {};
        filteredOrders.forEach(o => { updated[o.id] = checked; });
        setSelectedOrders(updated);
    };

    const [isExporting, setIsExporting] = useState(false);
    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert(`Exported 4×6 shipping labels for ${Object.values(selectedOrders).filter(Boolean).length} orders.`);
        }, 1200);
    };

    const filteredOrders = orders.filter(o => {
        const matchSku = selectedSku === 'All' || o.sku === selectedSku;
        const matchCourier = selectedCourier === 'All' || o.courier === selectedCourier;
        return matchSku && matchCourier;
    });

    const uniqueSkus = ['All', ...new Set(orders.map(o => o.sku))];
    const uniqueCouriers = ['All', ...new Set(orders.map(o => o.courier))];

    const isLocked = !currentUser || currentUser.tier === 'free';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
            {/* Header Banner */}
            <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'rgba(56, 189, 248, 0.08)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.22)',
                    padding: '0.25rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                }}>
                    <Printer size={13} />
                    <span>Thermal label cropper</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', letterSpacing: '-0.02em' }}>
                    4×6 thermal shipping label cropper and SKU sorter
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 auto', maxWidth: '580px', lineHeight: 1.5 }}>
                    Upload Meesho invoice PDF sheets, automatically crop labels into 4×6 format, and sort sequentially by SKU.
                </p>
            </div>

            {isLocked ? (
                /* Locked Screen Overlay */
                <div className="panel-card" style={{
                    textAlign: 'center',
                    padding: '3.5rem 2rem',
                    background: '#0f1422',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#f87171',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.25rem auto'
                    }}>
                        <Lock size={26} />
                    </div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff' }}>
                        Subscription required
                    </h3>
                    <p style={{ color: '#94a3b8', maxWidth: '460px', margin: '0 auto 1.75rem auto', fontSize: '0.88rem', lineHeight: 1.6 }}>
                        Bulk label cropping is available on the Growth plan and above. Upgrade your account to process multi-page label sheets.
                    </p>
                    <button 
                        className="btn-primary" 
                        style={{ maxWidth: '220px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.88rem' }} 
                        onClick={onNavigateToBilling}
                    >
                        <span>Upgrade plan</span>
                    </button>
                </div>
            ) : (
                /* Unlocked Exporter Page */
                <div className="label-exporter-main-grid">
                    
                    {/* Left Upload card */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'fit-content' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <UploadCloud size={17} color="#38bdf8" />
                                <h3 style={{ fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', fontWeight: 600, margin: 0 }}>
                                    Upload sheet
                                </h3>
                            </div>
                            {fileUploaded && (
                                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                                    Ready
                                </span>
                            )}
                        </div>
                        
                        {!fileUploaded && !isParsing && (
                            <div 
                                className="upload-zone" 
                                onClick={() => fileInputRef.current.click()}
                            >
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    style={{ display: 'none' }} 
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                />
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '10px',
                                    background: 'rgba(56, 189, 248, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 0.5rem auto'
                                }}>
                                    <FileText size={22} color="#38bdf8" />
                                </div>
                                <div className="upload-text-main">
                                    Upload Meesho PDF sheet
                                </div>
                                <div className="upload-text-sub">
                                    Select label PDF batch (Max 50MB)
                                </div>
                            </div>
                        )}

                        {isParsing && (
                            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                                <div 
                                    style={{
                                        width: '32px', height: '32px', border: '2px solid rgba(255, 255, 255, 0.1)',
                                        borderTopColor: '#38bdf8', borderRadius: '50%', display: 'block',
                                        margin: '0 auto 1rem auto', animation: 'spin 1s linear infinite'
                                    }}
                                />
                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>Analyzing label sheet...</div>
                                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>Extracting SKU labels and courier barcodes</div>
                            </div>
                        )}

                        {fileUploaded && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                <div style={{
                                    background: 'rgba(52, 211, 153, 0.08)',
                                    border: '1px solid rgba(52, 211, 153, 0.22)',
                                    padding: '0.75rem 0.85rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.65rem'
                                }}>
                                    <CheckCircle2 size={18} color="#34d399" />
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#34d399' }}>Sheet parsed</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Found {orders.length} orders in file</div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <Layers size={13} color="#94a3b8" />
                                        Filter by product SKU
                                    </label>
                                    <select value={selectedSku} onChange={(e) => setSelectedSku(e.target.value)}>
                                        {uniqueSkus.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <Truck size={13} color="#94a3b8" />
                                        Filter by courier partner
                                    </label>
                                    <select value={selectedCourier} onChange={(e) => setSelectedCourier(e.target.value)}>
                                        {uniqueCouriers.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                                    <button 
                                        className="btn-primary" 
                                        disabled={isExporting} 
                                        onClick={handleExport}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.4rem',
                                            opacity: isExporting ? 0.7 : 1,
                                            cursor: isExporting ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isExporting ? (
                                            <>
                                                <span style={{ width: '14px', height: '14px', border: '2px solid #080b11', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                                <span>Exporting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Download size={14} />
                                                <span>Export labels</span>
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        className="btn-action" 
                                        disabled={isExporting} 
                                        onClick={handleReset}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                                    >
                                        <RotateCcw size={14} />
                                        <span>Reset</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Orders table */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Filter size={16} color="#38bdf8" />
                                <h3 style={{ fontSize: '1rem', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#ffffff', fontWeight: 600, margin: 0 }}>
                                    {fileUploaded ? `Extracted orders (${filteredOrders.length})` : 'Orders preview'}
                                </h3>
                            </div>
                            {fileUploaded && (
                                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                    {Object.values(selectedOrders).filter(Boolean).length} selected
                                </span>
                            )}
                        </div>

                        {!fileUploaded ? (
                            <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: '#94a3b8' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: '#141a29',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 0.75rem auto',
                                    color: '#64748b'
                                }}>
                                    <FolderOpen size={24} />
                                </div>
                                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#ffffff' }}>No uploads recorded yet</div>
                                <p style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: '#94a3b8' }}>
                                    Upload your PDF invoice sheet to start cropping labels and sorting by SKU
                                </p>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '40px' }}>
                                                <input 
                                                    type="checkbox" 
                                                    onChange={(e) => toggleSelectAll(e.target.checked)}
                                                    checked={filteredOrders.length > 0 && filteredOrders.every(o => selectedOrders[o.id])}
                                                />
                                            </th>
                                            <th>Order ID</th>
                                            <th>SKU identifier</th>
                                            <th>Courier</th>
                                            <th>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders.length > 0 ? (
                                            filteredOrders.map(o => (
                                                <tr key={o.id}>
                                                    <td>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={!!selectedOrders[o.id]} 
                                                            onChange={() => toggleOrderSelect(o.id)}
                                                        />
                                                    </td>
                                                    <td style={{ fontWeight: 500, color: '#f8fafc' }}>{o.id}</td>
                                                    <td>
                                                        <span style={{
                                                            background: '#141a29',
                                                            color: '#e2e8f0',
                                                            padding: '0.2rem 0.5rem',
                                                            borderRadius: '4px',
                                                            fontSize: '0.78rem',
                                                            fontFamily: 'monospace'
                                                        }}>
                                                            {o.sku}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.35rem',
                                                            color: '#94a3b8',
                                                            fontSize: '0.8rem'
                                                        }}>
                                                            <Truck size={13} color="#64748b" />
                                                            {o.courier}
                                                        </span>
                                                    </td>
                                                    <td style={{ fontWeight: 600, color: '#ffffff', fontVariantNumeric: 'tabular-nums' }}>{o.qty}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                                                    <AlertCircle size={20} color="#64748b" style={{ margin: '0 auto 0.4rem auto', display: 'block' }} />
                                                    No orders match the selected filters
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}
