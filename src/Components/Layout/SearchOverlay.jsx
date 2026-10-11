import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const all = await base44.entities.Product.list();
        const q = query.toLowerCase();
        const filtered = all.filter(p =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        ).slice(0, 6);
        setResults(filtered);
      } catch (e) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[70]"
            style={{ background: 'rgba(0,0,0,0.04)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Full-width glass panel from top */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-[80]"
            style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            borderBottom: '1px solid rgba(18,18,18,0.1)',
              boxShadow: 'none',
              paddingTop: 32,
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 30px 0' }}>
              {/* Input row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid rgba(18,18,18,0.15)', paddingBottom: 14 }}>
                <Search size={18} strokeWidth={1.5} style={{ color: '#121212', flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products, categories..."
                  className="placeholder-obsidian/50"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 15,
                    color: '#000000',
                    background: 'transparent',
                    letterSpacing: '0.02em',
                  }}
                />
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#121212', display: 'flex', opacity: 0.5 }}>
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Results */}
              <div style={{ paddingBottom: 24 }}>
                {loading && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#000', paddingTop: 16, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Searching...
                  </p>
                )}

                {!loading && query && results.length === 0 && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#000', paddingTop: 16, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    No results for "{query}"
                  </p>
                )}

                {results.length > 0 && (
                  <div style={{ paddingTop: 10 }}>
                    {results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelect(product.id)}
                        style={{
                          background: 'none', border: 'none',
                          borderBottom: '1px solid rgba(18,18,18,0.07)',
                          cursor: 'pointer', width: '100%',
                          display: 'flex', alignItems: 'center', gap: 14,
                          padding: '12px 0', textAlign: 'left',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            style={{ width: 40, height: 52, objectFit: 'cover', flexShrink: 0, borderRadius: 3 }}
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#121212', letterSpacing: '0.02em' }}>
                            {product.name}
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#000', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>
                            {product.category}{product.subcategory ? ` · ${product.subcategory}` : ''}
                          </div>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#121212' }}>
                          ${product.price}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {!query && (
                  <div style={{ paddingTop: 20 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#000', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                      Quick links
                    </p>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {[
                        { label: 'New In', to: '/collection?category=new' },
                        { label: 'Woman', to: '/collection?category=women' },
                        { label: 'Man', to: '/collection?category=men' },
                        { label: 'Shop All', to: '/collection' },
                      ].map(({ label, to }) => (
                        <button
                          key={label}
                          onClick={() => { navigate(to); onClose(); }}
                          style={{
                            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#121212',
                            border: '1px solid rgba(18,18,18,0.25)', padding: '6px 16px',
                            background: 'rgba(255,255,255,0.4)', cursor: 'pointer',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            borderRadius: 40, transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.7)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
