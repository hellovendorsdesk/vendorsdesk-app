import React from 'react';
import { UploadCloud, X, Zap } from 'lucide-react';

export default function UploadDropzone({
    imagePreview,
    dragOver,
    setDragOver,
    handleFile,
    clearImage,
    fileInputRef
}) {
    return (
        <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginBottom: '0.4rem', display: 'block' }}>
                Upload Product Image
            </label>
            
            {!imagePreview ? (
                <label 
                    htmlFor="optimizer-file-input"
                    className={`upload-zone ${dragOver ? 'dragover' : ''}`} 
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} 
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { 
                        e.preventDefault(); 
                        setDragOver(false); 
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleFile(e.dataTransfer.files[0]);
                        }
                    }} 
                    style={{ 
                        width: '100%',
                        minHeight: '160px',
                        padding: '1.5rem 1rem', 
                        borderRadius: '16px',
                        border: '2px dashed #2563eb',
                        background: dragOver ? 'rgba(37, 99, 235, 0.05)' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.06)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <input 
                        id="optimizer-file-input"
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/*" 
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                handleFile(e.target.files[0]);
                            }
                        }} 
                    />
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: '#eff6ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.25rem'
                    }}>
                        <UploadCloud size={26} color="#2563eb" />
                    </div>
                    <div className="upload-text-main" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                        Click to Upload or Drag & Drop Image
                    </div>
                    <div className="upload-text-sub" style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                        Supports PNG, JPG, WEBP (Max 15MB)
                    </div>
                    <span style={{ 
                        fontSize: '0.72rem', 
                        background: '#eff6ff', 
                        color: '#2563eb', 
                        fontWeight: 700, 
                        padding: '0.3rem 0.75rem', 
                        borderRadius: '20px', 
                        marginTop: '0.35rem', 
                        border: '1px solid rgba(37,99,235,0.2)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                    }}>
                        <Zap size={13} />
                        <span>Instant 1-Click Processing</span>
                    </span>
                </label>
            ) : (
                <div style={{ position: 'relative', border: '2px solid #2563eb', borderRadius: '16px', overflow: 'hidden', background: '#ffffff', padding: '0.5rem' }}>
                    <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'contain', display: 'block', borderRadius: '12px' }} 
                    />
                    <button 
                        type="button"
                        onClick={clearImage} 
                        aria-label="Remove image"
                        style={{ 
                            position: 'absolute', top: '12px', right: '12px', 
                            background: '#ef4444', color: '#ffffff', border: 'none', 
                            width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(239, 68, 68, 0.4)' 
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
