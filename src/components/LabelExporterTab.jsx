import React, { useState, useRef } from 'react';

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'Outfit, sans-serif' }}>Shipping Label Export</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Upload your Meesho PDF sheets, sort by SKU, crop labels, and export clean packs</p>
            </div>

            {isLocked ? (
                /* Locked Screen Overlay */
                <div className="panel-card" style={{ textAlign: 'center', padding: '4rem 2rem', background: '#f8fafc', position: 'relative' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔒</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>Subscription Required</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto 2rem auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Shipping Label Exporter is a premium warehouse optimization tool. 
                        Subscribe to Standard Plan (₹199) or higher to unlock unlimited PDF uploads, SKU sorting, and courier splitting.
                    </p>
                    <button className="btn-submit-form" style={{ maxWidth: '250px', margin: '0 auto' }} onClick={onNavigateToBilling}>
                        Subscribe Now
                    </button>
                </div>
            ) : (
                /* Unlocked Exporter Page */
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '2rem' }}>
                    
                    {/* Left Upload card */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', color: '#818cf8' }}>Upload Sheet</h3>
                        
                        {!fileUploaded && !isParsing && (
                            <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    style={{ display: 'none' }} 
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                />
                                <div className="upload-icon">📄</div>
                                <div className="upload-text-main">Click to upload Meesho PDF</div>
                                <div className="upload-text-sub">Select PDF label sheet (Max 50MB)</div>
                            </div>
                        )}

                        {isParsing && (
                            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                <div 
                                    style={{
                                        width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)',
                                        borderTopColor: '#818cf8', borderRadius: '50%', display: 'block',
                                        margin: '0 auto 1.25rem auto', animation: 'spin 1s linear infinite'
                                    }}
                                />
                                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Analyzing labels sheet...</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Extracting SKU labels & courier details</div>
                            </div>
                        )}

                        {fileUploaded && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--success)' }}>Sheet Parsed Successfully!</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Found {orders.length} orders in file</div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Filter by Product SKU</label>
                                    <select value={selectedSku} onChange={(e) => setSelectedSku(e.target.value)}>
                                        {uniqueSkus.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Filter by Courier Partner</label>
                                    <select value={selectedCourier} onChange={(e) => setSelectedCourier(e.target.value)}>
                                        {uniqueCouriers.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button 
                                        className="btn-submit-form" 
                                        disabled={isExporting} 
                                        onClick={handleExport}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: isExporting ? 0.7 : 1, cursor: isExporting ? 'not-allowed' : 'pointer' }}
                                    >
                                        {isExporting ? (
                                            <>
                                                <span style={{ width: '14px', height: '14px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                                Exporting Labels...
                                            </>
                                        ) : (
                                            'Export Labels'
                                        )}
                                    </button>
                                    <button className="btn-action" disabled={isExporting} onClick={handleReset}>Reset</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Orders table */}
                    <div className="panel-card">
                        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', color: '#c084fc', marginBottom: '1rem' }}>
                            {fileUploaded ? `Extracted Orders (${filteredOrders.length})` : 'Recent Uploads'}
                        </h3>

                        {!fileUploaded ? (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📂</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>No uploads recorded yet</div>
                                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Upload your PDF invoice sheet to start cropping labels</p>
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
                                                    <td style={{ fontWeight: 600 }}>{o.id}</td>
                                                    <td><code>{o.sku}</code></td>
                                                    <td>{o.courier}</td>
                                                    <td style={{ fontWeight: 'bold' }}>{o.qty}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colspan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No orders match the selected filters.</td>
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
