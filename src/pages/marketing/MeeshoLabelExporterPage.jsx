import React from 'react';

export default function MeeshoLabelExporterPage({ onRegister }) {
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
