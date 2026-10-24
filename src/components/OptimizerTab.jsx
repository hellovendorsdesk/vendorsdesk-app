import React, { useState, useEffect, useRef, useCallback } from 'react';
import JSZip from 'jszip';
import optimizerApi from '../api/optimizerApi';
import apiClient from '../api/client';
import { secureFetch } from '../utils/crypto';
import { fileToBase64 } from '../utils/imageCompressor';

// Subcomponents
import CategorySelector from './optimizer/CategorySelector';
import UploadDropzone from './optimizer/UploadDropzone';
import RecentJobsList from './optimizer/RecentJobsList';
import ResultsGallery from './optimizer/ResultsGallery';
import CreditModal from './optimizer/CreditModal';

export default function OptimizerTab({ currentUser, onCreditsChange, onNavigateToBilling }) {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [dragOver, setDragOver] = useState(false);

    const [isOptimizing, setIsOptimizing] = useState(false);
    const [stage, setStage] = useState(''); // 'creating' | 'checking' | 'done'
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
    const [isZipping, setIsZipping] = useState(false);
    const [showCreditModal, setShowCreditModal] = useState(false);

    const fileInputRef = useRef(null);
    const pollRef = useRef(null);
    const pollTriesRef = useRef(0);

    const authHeaders = () => {
        const token = localStorage.getItem('vendorsdesk_token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    const fetchHistory = useCallback(async () => {
        try {
            const data = await optimizerApi.getAllVariations();
            if (data.success) setJobs(data.jobs || []);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await optimizerApi.getCategories();
                if (data.success) setCategories(data.categories || []);
            } catch (e) {
                console.error('Failed to load categories', e);
            }
        };
        loadCategories();
        fetchHistory();

        return () => {
            if (pollRef.current) clearTimeout(pollRef.current);
        };
    }, [fetchHistory]);

    const refreshCredits = async () => {
        try {
            const data = await apiClient.get('/api/auth/me');
            if (data.success && data.user && onCreditsChange) {
                onCreditsChange(data.user.credits);
            }
        } catch (e) {
            /* ignore */
        }
    };

    const handleFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG/PNG).');
            return;
        }
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
                const d = await optimizerApi.getVariations(jobId);
                if (d.success) {
                    const vars = d.variations || [];
                    setResults(vars);
                    setDoneCount(vars.length);
                    const ok = vars
                        .filter(v => v.status === 'success' && v.shippingCharge != null)
                        .sort((a, b) => a.shippingCharge - b.shippingCharge);
                    setCheapest(ok[0] || null);

                    if (vars.length >= total) {
                        setStage('done');
                        setProgressText('Done! Rate optimization completed successfully. (100%)');
                        setIsOptimizing(false);
                        refreshCredits();
                        fetchHistory();
                        return;
                    }
                    setStage('checking');
                    const pct = total > 0 ? Math.round((vars.length / total) * 100) : 0;
                    setProgressText(`Checking shipping rates on Meesho... ${pct}%`);
                }
            } catch (e) {
                console.error('poll error', e);
            }

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
        if (!selectedCategory) {
            alert('Please select a Meesho category first.');
            return;
        }
        if (!imageFile) {
            alert('Please upload a product image first.');
            return;
        }

        // Image generation & variation optimization is 100% Free
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
            const data = await optimizerApi.optimize(selectedCategory.id, base64);

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
                const ok = (data.variations || [])
                    .filter(v => v.status === 'success' && v.shippingCharge != null)
                    .sort((a, b) => a.shippingCharge - b.shippingCharge);
                setCheapest(ok[0] || null);
                setViewMode('results');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const downloadVariation = async (v) => {
        const id = v.id || v._id;
        if (!v || !v.imageUrl) return;
        setDownloadingId(id || 'temp');
        try {
            const fileName = `vendorsdesk_${(v.label || 'variation').replace(/[^a-z0-9]+/gi, '_').toLowerCase()}.jpg`;
            
            // Fast Path: Direct base64 data URL
            if (v.imageUrl && v.imageUrl.startsWith('data:image')) {
                const a = document.createElement('a');
                a.href = v.imageUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                return;
            }

            // Proxy Download route
            if (id) {
                const res = await fetch(`/api/variations/${id}/download`, { headers: authHeaders() });
                if (res.ok) {
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                    return;
                }
            }

            // Fallback: Direct CDN link
            if (v.imageUrl) {
                const a = document.createElement('a');
                a.href = v.imageUrl;
                a.target = '_blank';
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert('Could not download this image.');
            }
        } catch (e) {
            console.error('Download error:', e);
            if (v.imageUrl) window.open(v.imageUrl, '_blank');
        } finally {
            setDownloadingId(null);
        }
    };

    const handleDownloadOptimizerZip = async () => {
        if (results.length === 0 || isZipping) return;
        setIsZipping(true);
        try {
            const zip = new JSZip();
            const folder = zip.folder("vendorsdesk_rate_variations");

            for (let idx = 0; idx < results.length; idx++) {
                const item = results[idx];
                if (item.imageUrl) {
                    try {
                        const resp = await fetch(item.imageUrl);
                        const blob = await resp.blob();
                        folder.file(`variation_${idx + 1}_${(item.label || 'img').replace(/[^a-z0-9]/gi, '_')}.jpg`, blob);
                    } catch(e) {}
                }
            }

            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `vendorsdesk_variations_${results.length}_bundle.zip`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('ZIP Error:', err);
            alert('Failed to generate ZIP archive.');
        } finally {
            setIsZipping(false);
        }
    };

    const handleGenerateMore = async () => {
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
    };

    const successful = results.filter(r => r.status === 'success' && r.shippingCharge != null);
    const cheapestCharge = cheapest ? cheapest.shippingCharge : (successful.length ? Math.min(...successful.map(r => r.shippingCharge)) : null);
    const sortedResults = sortResults(results);
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    return (
        <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto' }}>
            {viewMode === 'dashboard' && (
                <div className="optimizer-main-grid">
                    {/* LEFT COLUMN: UPLOAD & OPTIMIZE INPUT FORM */}
                    <div className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', borderRadius: '20px' }}>
                        <h3 className="panel-title" style={{ color: '#2563eb', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 800 }}>
                            Upload & Optimize
                        </h3>

                        <CategorySelector
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            dropdownOpen={dropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                        />

                        <UploadDropzone
                            imagePreview={imagePreview}
                            dragOver={dragOver}
                            setDragOver={setDragOver}
                            handleFile={handleFile}
                            clearImage={clearImage}
                            fileInputRef={fileInputRef}
                        />

                        <button 
                            className="btn-submit-form" 
                            disabled={!selectedCategory || !imageFile || isOptimizing} 
                            onClick={startOptimization}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '0.5rem', 
                                padding: '0.85rem', 
                                opacity: (!selectedCategory || !imageFile || isOptimizing) ? 0.6 : 1, 
                                cursor: isOptimizing ? 'not-allowed' : 'pointer', 
                                width: '100%',
                                borderRadius: '12px',
                                fontWeight: 700
                            }}
                        >
                            {isOptimizing ? (
                                <>
                                    <span style={{ width: '16px', height: '16px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                    <span>Generating Variations & Checking Rates...</span>
                                </>
                            ) : (
                                <span>Generate Variations & Check Rates</span>
                            )}
                        </button>
                        {errorMsg && <div style={{ color: 'var(--danger, #ef4444)', fontSize: '0.8rem' }}>{errorMsg}</div>}
                    </div>

                    {/* RIGHT COLUMN: OUTPUT & RECENT OPTIMIZATIONS */}
                    <RecentJobsList
                        jobs={jobs}
                        openJob={openJob}
                    />
                </div>
            )}

            {viewMode === 'results' && (
                <ResultsGallery
                    results={results}
                    sortedResults={sortedResults}
                    cheapestCharge={cheapestCharge}
                    isOptimizing={isOptimizing}
                    stage={stage}
                    progressText={progressText}
                    pct={pct}
                    successful={successful}
                    selectedJob={selectedJob}
                    onBack={() => {
                        if (pollRef.current) clearTimeout(pollRef.current);
                        setViewMode('dashboard');
                        setSelectedJob(null);
                        setIsOptimizing(false);
                    }}
                    onDownloadZip={handleDownloadOptimizerZip}
                    isZipping={isZipping}
                    onOptimizeAnother={() => {
                        setViewMode('dashboard');
                        setSelectedJob(null);
                    }}
                    downloadVariation={downloadVariation}
                    downloadingId={downloadingId}
                    setLightboxUrl={setLightboxUrl}
                    onGenerateMore={handleGenerateMore}
                    imageFile={imageFile}
                    selectedCategory={selectedCategory}
                />
            )}

            {/* Lightbox Modal */}
            {lightboxUrl && (
                <div className="lightbox-modal" onClick={() => setLightboxUrl(null)}>
                    <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setLightboxUrl(null)}>✕</button>
                        <div className="lightbox-img-wrapper">
                            <img src={lightboxUrl} alt="variation preview" className="lightbox-img" />
                        </div>
                    </div>
                </div>
            )}

            {/* Out of Credits Modal */}
            {showCreditModal && (
                <CreditModal
                    onClose={() => setShowCreditModal(false)}
                    onNavigateToBilling={onNavigateToBilling}
                />
            )}
        </div>
    );
}
