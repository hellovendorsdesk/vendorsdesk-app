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
    Sparkles,
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
        if (!file || !file.name.endsWith('.pdf')) {
            alert('Kripya ek valid Meesho PDF sheet select karein.');
            return;
        }

        setIsParsing(true);
        setTimeout(() => {
            setIsParsing(false);
            setFileUploaded(true);
            setOrders(MOCK_ORDERS);
            
            // Auto-check all
            const initialChecked = {};
            MOCK_ORDERS.forEach(o => { initialChecked[o.id] = true; });
            setSelectedOrders(initialChecked);
        }, 2000); // 2s parse delay
    };

    const handleReset = () => {
        setFileUploaded(false);
        setOrders([]);
        setSelectedSku('All');
        setSelectedCourier('All');
        setSelectedOrders({});
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const toggleSelectAll = (checked) => {
        const nextChecked = {};
        filteredOrders.forEach(o => {
            nextChecked[o.id] = checked;
        });
        setSelectedOrders(prev => ({ ...prev, ...nextChecked }));
    };

    const toggleOrderSelect = (id) => {
        setSelectedOrders(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        const checkedIds = Object.keys(selectedOrders).filter(k => selectedOrders[k]);
        if (checkedIds.length === 0) {
            alert('Kripya export karne ke liye minimum ek order select karein.');
            return;
        }

        setIsExporting(true);
        setTimeout(() => {
            alert(`Success! exported ${checkedIds.length} cropped labels in a combined PDF sheet organized by SKU.`);
            setIsExporting(false);
            handleReset();
        }, 1200);
    };

    // Filter logic
    const filteredOrders = orders.filter(o => {
        const matchSku = selectedSku === 'All' || o.sku === selectedSku;
        const matchCourier = selectedCourier === 'All' || o.courier === selectedCourier;
        return matchSku && matchCourier;
    });

    const uniqueSkus = ['All', ...new Set(orders.map(o => o.sku))];
    const uniqueCouriers = ['All', ...new Set(orders.map(o => o.courier))];

    // Enforce lock if user is on free tier
    const isLocked = !currentUser || currentUser.tier === 'free';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
            {/* Header Banner */}
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: 'rgba(79, 70, 229, 0.08)',
                    color: '#4f46e5',
                    border: '1px solid rgba(79, 70, 229, 0.2)',
                    padding: '0.25rem 0.85rem',
                    borderRadius: '20px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    marginBottom: '0.5rem'
                }}>
                    <Printer size={13} />
                    <span>BULK PDF THERMAL LABEL CROPPER & SKU SORTER</span>
                </div>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.35rem', fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>
                    Shipping Label Exporter & SKU Sorter
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 auto', maxWidth: '580px', lineHeight: 1.5 }}>
                    Upload your Meesho invoice PDF sheets, automatically crop 4×6 thermal shipping labels, sort sequentially by SKU, and split by courier partner.
                </p>
            </div>

            {isLocked ? (
                /* Locked Screen Overlay */
                <div className="panel-card" style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem auto'
                    }}>
                        <Lock size={30} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.65rem', fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>
                        Subscription Required
                    </h3>
                    <p style={{ color: '#64748b', maxWidth: '460px', margin: '0 auto 2rem auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Shipping Label Exporter is a premium warehouse optimization tool. 
                        Subscribe to Standard Plan (₹199) or higher to unlock unlimited PDF uploads, SKU sorting, and courier splitting.
                    </p>
                    <button 
                        className="btn-submit-form" 
                        style={{ maxWidth: '240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} 
                        onClick={onNavigateToBilling}
                    >
                        <Sparkles size={16} />
                        <span>Subscribe Now</span>
                    </button>
                </div>
            ) : (
                /* Unlocked Exporter Page */
                <div className="label-exporter-main-grid">
                    
                    {/* Left Upload card */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'fit-content' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <UploadCloud size={18} color="#2563eb" />
                                <h3 style={{ fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif', color: '#0f172a', fontWeight: 700, margin: 0 }}>
                                    Upload Sheet
                                </h3>
                            </div>
                            {fileUploaded && (
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.15rem 0.5rem', borderRadius: '12px' }}>
                                    Ready
                                </span>
                            )}
                        </div>
                        
                        {!fileUploaded && !isParsing && (
                            <div 
                                className="upload-zone" 
                                onClick={() => fileInputRef.current.click()}
                                style={{
                                    border: '2px dashed #cbd5e1',
                                    borderRadius: '12px',
                                    padding: '2.5rem 1.5rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: '#f8fafc',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    style={{ display: 'none' }} 
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                />
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'rgba(37, 99, 235, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 0.75rem auto'
                                }}>
                                    <FileText size={24} color="#2563eb" />
                                </div>
                                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>
                                    Click to upload Meesho PDF
                                </div>
                                <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                                    Select label sheet or invoice batch (Max 50MB)
                                </div>
                            </div>
                        )}

                        {isParsing && (
                            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                                <div 
                                    style={{
                                        width: '38px', height: '38px', border: '3px solid #e2e8f0',
                                        borderTopColor: '#2563eb', borderRadius: '50%', display: 'block',
                                        margin: '0 auto 1.25rem auto', animation: 'spin 1s linear infinite'
                                    }}
                                />
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>Analyzing labels sheet...</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>Extracting SKU labels & courier details</div>
                            </div>
                        )}

                        {fileUploaded && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{
                                    background: 'rgba(16, 185, 129, 0.06)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                    padding: '0.85rem 1rem',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}>
                                    <CheckCircle2 size={20} color="#10b981" />
                                    <div>
                                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#065f46' }}>Sheet Parsed Successfully!</div>
                                        <div style={{ fontSize: '0.75rem', color: '#047857' }}>Found {orders.length} orders in file</div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <Layers size={13} color="#64748b" />
                                        Filter by Product SKU
                                    </label>
                                    <select value={selectedSku} onChange={(e) => setSelectedSku(e.target.value)}>
                                        {uniqueSkus.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <Truck size={13} color="#64748b" />
                                        Filter by Courier Partner
                                    </label>
                                    <select value={selectedCourier} onChange={(e) => setSelectedCourier(e.target.value)}>
                                        {uniqueCouriers.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.25rem' }}>
                                    <button 
                                        className="btn-submit-form" 
                                        disabled={isExporting} 
                                        onClick={handleExport}
                                        style={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            opacity: isExporting ? 0.7 : 1,
                                            cursor: isExporting ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isExporting ? (
                                            <>
                                                <span style={{ width: '14px', height: '14px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                                <span>Exporting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Download size={15} />
                                                <span>Export Labels</span>
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Filter size={18} color="#4f46e5" />
                                <h3 style={{ fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif', color: '#0f172a', fontWeight: 700, margin: 0 }}>
                                    {fileUploaded ? `Extracted Orders (${filteredOrders.length})` : 'Orders Preview'}
                                </h3>
                            </div>
                            {fileUploaded && (
                                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                    {Object.values(selectedOrders).filter(Boolean).length} selected
                                </span>
                            )}
                        </div>

                        {!fileUploaded ? (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b' }}>
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '14px',
                                    background: '#f1f5f9',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem auto',
                                    color: '#94a3b8'
                                }}>
                                    <FolderOpen size={28} />
                                </div>
                                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a' }}>No uploads recorded yet</div>
                                <p style={{ fontSize: '0.82rem', marginTop: '0.25rem', color: '#64748b' }}>
                                    Upload your PDF invoice sheet to start cropping labels and sorting by SKU
                                </p>
                            </div>
                        ) : (
                            <div className="table-container" style={{ overflowX: 'auto' }}>
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
                                            <th>SKU Identifier</th>
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
                                                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{o.id}</td>
                                                    <td>
                                                        <span style={{
                                                            background: '#f1f5f9',
                                                            color: '#334155',
                                                            padding: '0.2rem 0.5rem',
                                                            borderRadius: '6px',
                                                            fontSize: '0.8rem',
                                                            fontFamily: 'monospace',
                                                            fontWeight: 600
                                                        }}>
                                                            {o.sku}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '0.35rem',
                                                            color: '#475569',
                                                            fontSize: '0.82rem'
                                                        }}>
                                                            <Truck size={13} color="#94a3b8" />
                                                            {o.courier}
                                                        </span>
                                                    </td>
                                                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{o.qty}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                                                    <AlertCircle size={24} color="#94a3b8" style={{ margin: '0 auto 0.5rem auto', display: 'block' }} />
                                                    No orders match the selected filters.
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
