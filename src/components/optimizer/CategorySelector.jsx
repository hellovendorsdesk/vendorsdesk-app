import React, { useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

export default function CategorySelector({
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    dropdownOpen,
    setDropdownOpen
}) {
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setDropdownOpen]);

    const visibleCategories = searchQuery.trim() === ''
        ? categories.slice(0, 50)
        : categories.filter(c => 
            c.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.key.includes(searchQuery)
          ).slice(0, 200);

    return (
        <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontWeight: 600, marginBottom: '0.4rem', display: 'block', color: '#0f172a' }}>
                Select Meesho Category
            </label>
            <div className={`searchable-select-container ${dropdownOpen ? 'open' : ''}`} ref={selectRef}>
                <input 
                    type="text" 
                    placeholder="Search categories (e.g. Sarees, Kurtis...)" 
                    value={searchQuery}
                    onChange={(e) => { 
                        setSearchQuery(e.target.value); 
                        setDropdownOpen(true); 
                        setSelectedCategory(null); 
                    }}
                    onFocus={() => setDropdownOpen(true)} 
                    style={{ fontSize: '0.85rem', padding: '0.85rem 2.2rem 0.85rem 1rem', borderRadius: '12px' }} 
                />
                <span className="dropdown-arrow" style={{ pointerEvents: 'none' }}>
                    <ChevronDown size={16} color="#64748b" />
                </span>

                {dropdownOpen && (
                    <div className="category-dropdown" style={{ borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                        {visibleCategories.length > 0 ? (
                            visibleCategories.map(c => (
                                <div 
                                    key={c.key} 
                                    className={`category-item ${selectedCategory?.id === c.key ? 'selected' : ''}`}
                                    onClick={() => { 
                                        setSelectedCategory({ id: c.key, name: c.label }); 
                                        setSearchQuery(`${c.label} (ID: ${c.key})`); 
                                        setDropdownOpen(false); 
                                    }}
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <span>{c.label}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                                        ID: {c.key}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary, #64748b)' }}>
                                No matching categories found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
