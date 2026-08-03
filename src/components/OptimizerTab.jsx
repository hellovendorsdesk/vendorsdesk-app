import React, { useState, useEffect, useRef } from 'react';
import { secureFetch } from '../utils/crypto';

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const maxWidth = 1200;
                const maxHeight = 1200;

                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
                resolve(compressedBase64);
            };
            img.onerror = () => resolve(e.target.result);
        };
        reader.onerror = reject;
    });
}

export default function OptimizerTab({ currentUser, onCreditsChange, onNavigateToBilling }) {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [dragOver, setDragOver] = useState(false);

    const [isOptimizing, setIsOptimizing] = useState(false);
    const [stage, setStage] = useState('');          // 'creating' | 'checking' | 'done'
    const [progressText, setProgressText] = useState('');
    const [doneCount, setDoneCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    const [results, setResults] = useState([]);
    const [cheapest, setCheapest] = useState(null);
    const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard' | 'results'
    const [currentLotIndex, setCurrentLotIndex] = useState(0);

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [lightboxUrl, setLightboxUrl] = useState(null);
    const [downloadingId, setDownloadingId] = useState(null);
    const [showCreditModal, setShowCreditModal] = useState(false);

    const fileInputRef = useRef(null);
    const selectRef = useRef(null);
    const pollRef = useRef(null);
    const pollTriesRef = useRef(0);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await secureFetch('/api/categories');
                if (data.success) setCategories(data.categories);
            } catch (e) { console.error('Failed to load categories', e); }
        };
        loadCategories();
        fetchHistory();

        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) setDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (pollRef.current) clearTimeout(pollRef.current);
        };
    }, []);

    const authHeaders = () => {
        const token = localStorage.getItem('vendorsdesk_token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchHistory = async () => {
        try {
            const data = await secureFetch('/api/variations', { headers: authHeaders() });
            if (data.success) setJobs(data.jobs || []);
        } catch (e) { console.error(e); }
    };

    const refreshCredits = async () => {
        try {
            const data = await secureFetch('/api/auth/me', { headers: authHeaders() });
            if (data.success && data.user && onCreditsChange) onCreditsChange(data.user.credits);
        } catch (e) { /* ignore */ }
    };

    const handleFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) { alert('Please upload an image file (JPG/PNG).'); return; }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setErrorMsg('');
    };

    const clearImage = () => {
        setImageFile(null);
        setImagePreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const sortResults = (arr) => {
        return [...arr].sort((a, b) => {
            const av = a.shippingCharge == null ? Infinity : a.shippingCharge;
            const bv = b.shippingCharge == null ? Infinity : b.shippingCharge;
            return av - bv;
        });
    };

    const pollJob = (jobId, total) => {
        pollTriesRef.current = 0;
        const poll = async () => {
            pollTriesRef.current += 1;
            try {
                const d = await secureFetch(`/api/variations/${jobId}`, { headers: authHeaders() });
                if (d.success) {
                    const vars = d.variations || [];
                    setResults(vars);
                    setDoneCount(vars.length);
                    const ok = vars.filter(v => v.status === 'success' && v.shippingCharge != null).sort((a, b) => a.shippingCharge - b.shippingCharge);
                    setCheapest(ok[0] || null);

                    if (vars.length >= total) {
                        setStage('done');
                        setProgressText(`Done! Rate optimization completed successfully. (100%)`);
                        setIsOptimizing(false);
                        refreshCredits();
                        fetchHistory();
                        return;
                    }
                    setStage('checking');
                    const pct = total > 0 ? Math.round((vars.length / total) * 100) : 0;
                    setProgressText(`Checking shipping rates on Meesho... ${pct}%`);
                }
            } catch (e) { console.error('poll error', e); }

            // Safety timeout: stop after ~5 minutes of polling.
            if (pollTriesRef.current > 200) {
                setIsOptimizing(false);
                setStage('done');
                setProgressText('Finished (100%)');
                fetchHistory();
                return;
            }
            pollRef.current = setTimeout(poll, 800);
        };
        poll();
    };

    const startOptimization = async () => {
        if (!selectedCategory) { alert('Please select a Meesho category first.'); return; }
        if (!imageFile) { alert('Please upload a product image first.'); return; }

        if (currentUser && (currentUser.credits === undefined || currentUser.credits <= 0) && currentUser.tier !== 'enterprise' && currentUser.role !== 'admin') {
            setShowCreditModal(true);
            return;
        }

        setIsOptimizing(true);
        setErrorMsg('');
        setResults([]);
        setCheapest(null);
        setSelectedJob(null);
        setDoneCount(0);
        setTotalCount(0);
        setStage('creating');
        setProgressText('Generating image variations... 0%');
        setViewMode('results');

        try {
            const base64 = await fileToBase64(imageFile);
            const data = await secureFetch('/api/optimize', {
                method: 'POST',
                headers: authHeaders(),
                body: { category: selectedCategory.id, image: base64 },
            });

            if (data.success) {
                setTotalCount(data.total);
                setStage('checking');
                setProgressText('Variations generated. Checking shipping rates... 0%');
                pollJob(data.jobId, data.total);
            } else {
                if (data.error && (data.error.includes('CREDITS') || data.error.includes('credits'))) {
                    setShowCreditModal(true);
                } else {
                    setErrorMsg(data.error || 'Optimization failed.');
                }
                setIsOptimizing(false);
                setViewMode('dashboard');
            }
        } catch (e) {
            console.error(e);
            setErrorMsg('Optimization request failed. Please try again.');
            setIsOptimizing(false);
            setViewMode('dashboard');
        }
    };

    const openJob = async (job) => {
        if (pollRef.current) clearTimeout(pollRef.current);
        setIsOptimizing(false);
        setStage('done');
        try {
            const data = await secureFetch(`/api/variations/${job._id}`, { headers: authHeaders() });
            if (data.success) {
                setSelectedJob(job);
                setResults(data.variations || []);
                setTotalCount((data.variations || []).length);
                setDoneCount((data.variations || []).length);
                const ok = (data.variations || []).filter(v => v.status === 'success' && v.shippingCharge != null).sort((a, b) => a.shippingCharge - b.shippingCharge);
                setCheapest(ok[0] || null);
                setViewMode('results');
            }
        } catch (e) { console.error(e); }
    };

    const downloadVariation = async (v) => {
        const id = v.id || v._id;
        if (!id || !v.imageUrl) return;
        setDownloadingId(id);
        try {
            const res = await fetch(`/api/variations/${id}/download`, { headers: authHeaders() });
            if (!res.ok) throw new Error('download failed');
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `vendorsdesk_${(v.label || 'variation').replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (e) {
            alert('Could not download this image.');
        } finally {
            setDownloadingId(null);
        }
    };

    const visibleCategories = searchQuery.trim() === ''
        ? categories.slice(0, 50)
        : categories.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()) || c.key.includes(searchQuery)).slice(0, 200);

    const successful = results.filter(r => r.status === 'success' && r.shippingCharge != null);
    const cheapestCharge = cheapest ? cheapest.shippingCharge : (successful.length ? Math.min(...successful.map(r => r.shippingCharge)) : null);
    const sortedResults = sortResults(results);
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    return (
        <div style={{ width: '100%' }}>
            {viewMode === 'dashboard' && (
                <div className="app-workspace">
                    <div className="control-panel-section">
                        <h3 className="panel-title" style={{ color: '#2563eb', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', fontFamily: 'Outfit' }}>Upload & Optimize</h3>

                        <div className="form-group">
                            <label style={{ fontWeight: 600, marginBottom: '0.4rem', display: 'block' }}>Select Meesho Category</label>
                            <div className={`searchable-select-container ${dropdownOpen ? 'open' : ''}`} ref={selectRef}>
                                <input type="text" placeholder="Search categories (e.g. Sarees, Kurtis...)" value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setDropdownOpen(true); setSelectedCategory(null); }}
                                    onFocus={() => setDropdownOpen(true)} style={{ fontSize: '0.85rem', padding: '0.85rem 2rem 0.85rem 1rem' }} />
                                <span className="dropdown-arrow">▼</span>
                                {dropdownOpen && (
                                    <div className="category-dropdown">
                                        {visibleCategories.length > 0 ? visibleCategories.map(c => (
                                            <div key={c.key} className={`category-item ${selectedCategory?.id === c.key ? 'selected' : ''}`}
                                                onClick={() => { setSelectedCategory({ id: c.key, name: c.label }); setSearchQuery(`${c.label} (ID: ${c.key})`); setDropdownOpen(false); }}>
                                                {c.label} <span style={{ float: 'right', fontSize: '0.8rem', opacity: 0.6 }}>ID: {c.key}</span>
                                            </div>
                                        )) : <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No matching categories.</div>}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ fontWeight: 600, marginBottom: '0.4rem', display: 'block' }}>Upload Product Image</label>
                            {!imagePreview ? (
                                <div className={`upload-zone ${dragOver ? 'dragover' : ''}`} onClick={() => fileInputRef.current.click()}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }} style={{ padding: '1.5rem 1rem', borderRadius: '12px' }}>
                                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
                                    <div className="upload-icon" style={{ fontSize: '1.8rem' }}>📸</div>
                                    <div className="upload-text-main" style={{ fontSize: '0.85rem' }}>Click / Drop one image</div>
                                    <div className="upload-text-sub" style={{ fontSize: '0.7rem' }}>PNG, JPG (Max 15MB)</div>
                                </div>
                            ) : (
                                <div style={{ position: 'relative', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: '#f8fafc' }}>
                                    <img src={imagePreview} alt="preview" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'contain', display: 'block' }} />
                                    <button onClick={clearImage} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(220,38,38,0.9)', color: '#fff', border: 'none', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
                                </div>
                            )}
                        </div>

                        <button className="btn-submit-form" disabled={!selectedCategory || !imageFile || isOptimizing} onClick={startOptimization}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', opacity: (!selectedCategory || !imageFile || isOptimizing) ? 0.6 : 1 }}>
                            <span>Generate Variations & Check Rates</span>
                        </button>
                        {errorMsg && <div style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errorMsg}</div>}
                    </div>

                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minHeight: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                            <h3 className="panel-title" style={{ color: '#2563eb', fontFamily: 'Outfit' }}>Recent Optimizations</h3>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total: {jobs.length}</span>
                        </div>
                        {jobs.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', alignContent: 'start' }}>
                                {jobs.map(job => (
                                    <div key={job._id} onClick={() => openJob(job)} className="history-card-hover"
                                        style={{ background: '#ffffff', border: '1px solid var(--card-border)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                                        <div style={{ width: '100%', aspectRatio: '1 / 1', background: '#f1f5f9', overflow: 'hidden' }}>
                                            {job.thumb ? <img src={job.thumb} alt={job.category} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : null}
                                        </div>
                                        <div style={{ padding: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={job.category}>{job.category}</div>
                                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{new Date(job.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '0.35rem' }}>
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Best</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--success)', fontWeight: 800 }}>{job.cheapestRate != null ? `₹${job.cheapestRate}` : '--'}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📦</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>No optimizations yet</div>
                                <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Upload an image and generate variations to see results here.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {viewMode === 'results' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                    <div className="panel-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <div onClick={() => { if (pollRef.current) clearTimeout(pollRef.current); setViewMode('dashboard'); setSelectedJob(null); setIsOptimizing(false); }} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', marginBottom: '0.35rem' }}>◀ Back</div>
                            <h2 style={{ fontSize: '1.4rem', fontFamily: 'Outfit', fontWeight: 700 }}>Optimization Results</h2>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {selectedJob ? selectedJob.category : (results[0] && results[0].category) || 'Variations'} — {successful.length} rates found
                                {cheapestCharge != null && <> · Best rate <strong style={{ color: 'var(--success)' }}>₹{cheapestCharge}</strong></>}
                            </p>
                        </div>
                        {!isOptimizing && <button className="btn-action btn-action-primary" style={{ padding: '0.6rem 1.25rem', fontWeight: 600 }} onClick={() => { setViewMode('dashboard'); setSelectedJob(null); }}>⚡ Optimize Another</button>}
                    </div>

                    {/* Live progress banner */}
                    {isOptimizing && (
                        <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <span style={{ width: '18px', height: '18px', border: '2px solid rgba(37,99,235,0.25)', borderTopColor: '#2563eb', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                    {stage === 'creating' ? '⚙️ Creating variations...' : `🔄 ${progressText}`}
                                </span>
                            </div>
                            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${stage === 'creating' ? 8 : pct}%`, height: '100%', background: 'var(--primary-glow)', transition: 'width 0.4s' }} />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Please wait — we are testing image variations and checking Meesho shipping rates in real time. Rates appear below as they come in.</div>
                        </div>
                    )}

                    {!isOptimizing && successful.length === 0 && results.length > 0 && (
                        <div className="panel-card" style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>
                            No shipping rates could be fetched. This usually means the seller token/session needs to be reconnected in the admin panel. The generated variations are still saved.
                        </div>
                    )}

                    {!isOptimizing && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem', alignContent: 'start' }}>
                        {sortedResults.map((v, idx) => {
                            const isCheapest = v.status === 'success' && v.shippingCharge != null && v.shippingCharge === cheapestCharge;
                            const id = v.id || v._id;
                            return (
                                <div key={id || idx} className="variation-card" style={{ background: '#ffffff', border: isCheapest ? '2px solid #10b981' : '1px solid var(--card-border)', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                                    {isCheapest && <span className="badge badge-active" style={{ position: 'absolute', top: '10px', right: '10px', background: '#10b981', color: '#fff', fontSize: '0.6rem', padding: '0.2rem 0.45rem', borderRadius: '8px', zIndex: 5, fontWeight: 700 }}>CHEAPEST</span>}
                                    <div className="card-img-container" style={{ aspectRatio: '1 / 1', height: 'auto', background: '#f1f5f9', cursor: v.imageUrl ? 'zoom-in' : 'default' }} onClick={() => v.imageUrl && setLightboxUrl(v.imageUrl)}>
                                        {v.imageUrl ? <img src={v.imageUrl} alt={v.label} className="card-img" /> : <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', padding: '1rem', textAlign: 'center' }}>No image<br />(check failed)</div>}
                                    </div>
                                    <div className="card-body" style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, width: '58%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={v.label}>{v.label}</span>
                                            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: v.status === 'success' && v.shippingCharge != null ? 'var(--success)' : 'var(--danger)' }}>
                                                {v.status === 'success' && v.shippingCharge != null ? `₹${v.shippingCharge}` : '❌'}
                                            </span>
                                        </div>
                                        {v.imageUrl && (
                                            <button className="btn-download-small" style={{ marginTop: '0.25rem', padding: '0.45rem', width: '100%' }} disabled={downloadingId === id} onClick={() => downloadVariation(v)}>
                                                {downloadingId === id ? 'Downloading...' : '⬇ Download'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    )}

                    {!isOptimizing && imageFile && selectedCategory && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <button 
                                className="btn-submit-form" 
                                style={{ 
                                    maxWidth: '380px', 
                                    padding: '0.85rem 1.5rem', 
                                    fontSize: '0.95rem',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
                                }}
                                onClick={async () => {
                                    if (currentUser && (currentUser.credits === undefined || currentUser.credits <= 0) && currentUser.tier !== 'enterprise' && currentUser.role !== 'admin') {
                                        setShowCreditModal(true);
                                        return;
                                    }

                                    const nextLot = currentLotIndex + 1;
                                    setCurrentLotIndex(nextLot);
                                    setIsOptimizing(true);
                                    setErrorMsg('');
                                    setStage('creating');
                                    setProgressText('Generating more image variations... 0%');

                                    try {
                                        const base64 = await fileToBase64(imageFile);
                                        const data = await secureFetch('/api/optimize', {
                                            method: 'POST',
                                            headers: authHeaders(),
                                            body: { category: selectedCategory.id, image: base64, lotIndex: nextLot },
                                        });

                                        if (data.success) {
                                            setTotalCount(data.total);
                                            setStage('checking');
                                            setProgressText('Variations generated. Checking shipping rates... 0%');
                                            pollJob(data.jobId, data.total);
                                        } else {
                                            if (data.error && (data.error.includes('CREDITS') || data.error.includes('credits'))) {
                                                setShowCreditModal(true);
                                            } else {
                                                setErrorMsg(data.error || 'Optimization failed.');
                                            }
                                            setIsOptimizing(false);
                                        }
                                    } catch (e) {
                                        console.error(e);
                                        setErrorMsg('Request failed. Please try again.');
                                        setIsOptimizing(false);
                                    }
                                }}
                            >
                                ✨ Generate More Combinations
                            </button>
                        </div>
                    )}
                </div>
            )}

            {lightboxUrl && (
                <div className="lightbox-modal" onClick={() => setLightboxUrl(null)}>
                    <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setLightboxUrl(null)}>✕</button>
                        <div className="lightbox-img-wrapper"><img src={lightboxUrl} alt="variation" className="lightbox-img" /></div>
                    </div>
                </div>
            )}

            {showCreditModal && (
                <div className="lightbox-modal" onClick={() => setShowCreditModal(false)}>
                    <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px', padding: '2rem', textAlign: 'center', borderRadius: '24px', background: '#ffffff', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        <button className="lightbox-close" onClick={() => setShowCreditModal(false)}>✕</button>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💎</div>
                        <h3 style={{ fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Out of Credits!</h3>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            You have <strong>0 credits</strong> remaining.<br />
                            If you want to generate images and check lower shipping rates, please purchase a plan.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button 
                                className="btn-submit-form" 
                                style={{ padding: '0.85rem', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700, background: 'linear-gradient(135deg, #2563eb, #7c3aed)', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)', cursor: 'pointer' }}
                                onClick={() => {
                                    setShowCreditModal(false);
                                    if (onNavigateToBilling) onNavigateToBilling();
                                }}
                            >
                                💳 Purchase Plan
                            </button>
                            <button 
                                type="button"
                                style={{ padding: '0.65rem', borderRadius: '12px', background: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: 600 }}
                                onClick={() => setShowCreditModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
