import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';

const SORT_OPTIONS = [
  { label: 'Newest', value: '-created_date' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Top Rated', value: '-rating' },
];

const CATEGORY_LABELS = {
  men: 'Men',
  women: 'Women',
  new: 'New Arrivals',
};

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('-created_date');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ category: categoryParam || '', subcategory: '', material: '' });

  useEffect(() => {
    setFilters(f => ({ ...f, category: categoryParam || '' }));
  }, [categoryParam]);

  useEffect(() => {
    const handler = () => {
      setFilters({ category: '', subcategory: '', material: '' });
      setSearchParams({});
    };
    window.addEventListener('clearCollectionFilters', handler);
    return () => window.removeEventListener('clearCollectionFilters', handler);
  }, []);

  useEffect(() => {
    setLoading(true);
    const query = {};
    if (filters.subcategory) query.subcategory = filters.subcategory;
    if (filters.material) query.material = filters.material;
    base44.entities.Product.filter(query, sort, 100)
      .then(all => {
        if (!filters.category) return setProducts(all);
        const filtered = all.filter(p =>
          p.category === filters.category ||
          (Array.isArray(p.categories) && p.categories.includes(filters.category))
        );
        setProducts(filtered);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filters, sort]);

  const subcategories = useMemo(() => [...new Set(products.map(p => p.subcategory).filter(Boolean))], [products]);
  const materials = useMemo(() => [...new Set(products.map(p => p.material).filter(Boolean))], [products]);

  const clearFilter = (key) => {
    const updated = { ...filters, [key]: '' };
    setFilters(updated);
    if (key === 'category') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="pt-20 md:pt-24 px-5">
      {/* Narrative header */}
      <div className="w-full py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="hidden md:block technical-text text-obsidian/40 mb-3">Collection</p>
          <h1 className="section-heading text-obsidian mb-4">
            {filters.category ? CATEGORY_LABELS[filters.category] || 'All' : 'Shop All'}
          </h1>
          <p className="text-obsidian/60 max-w-xl text-base">
            Curated pieces that transcend seasons — designed with intention, crafted with precision, worn with confidence.
          </p>
        </motion.div>
      </div>

      <div className="w-full">
        {/* Toolbar */}
        <div className="py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="technical-text text-obsidian/60 hover:text-obsidian transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal size={16} strokeWidth={1.5} />
              Refine
              {activeFilterCount > 0 && (
                <span className="text-juniper">[ {activeFilterCount} ]</span>
              )}
            </button>
            {Object.entries(filters).filter(([, v]) => v).map(([key, value]) => (
              <button
                key={key}
                onClick={() => clearFilter(key)}
                className="technical-text text-xs bg-obsidian/5 text-obsidian/70 px-3 py-1.5 flex items-center gap-1.5 hover:bg-obsidian/10 transition-colors"
              >
                {value}
                <X size={12} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="technical-text text-obsidian/40 text-xs hidden sm:inline">Sort</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="technical-text text-xs bg-transparent text-obsidian border border-obsidian/15 px-3 py-1.5 focus:outline-none"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pb-6 border-b border-obsidian/10 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="technical-text text-obsidian/40 text-xs mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  {['men', 'women', 'new'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilters(f => ({ ...f, category: f.category === cat ? '' : cat }));
                        if (filters.category === cat) {
                          searchParams.delete('category');
                        } else {
                          searchParams.set('category', cat);
                        }
                        setSearchParams(searchParams);
                      }}
                      className={`technical-text text-xs px-3 py-1.5 border transition-colors ${
                        filters.category === cat
                          ? 'bg-juniper text-bone border-juniper'
                          : 'border-obsidian/15 text-obsidian/60 hover:border-obsidian/30'
                      }`}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>
              {subcategories.length > 0 && (
                <div>
                  <p className="technical-text text-obsidian/40 text-xs mb-2">Type</p>
                  <div className="flex flex-wrap gap-2">
                    {subcategories.map(sub => (
                      <button
                        key={sub}
                        onClick={() => setFilters(f => ({ ...f, subcategory: f.subcategory === sub ? '' : sub }))}
                        className={`technical-text text-xs px-3 py-1.5 border transition-colors ${
                          filters.subcategory === sub
                            ? 'bg-juniper text-bone border-juniper'
                            : 'border-obsidian/15 text-obsidian/60 hover:border-obsidian/30'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {materials.length > 0 && (
                <div>
                  <p className="technical-text text-obsidian/40 text-xs mb-2">Material</p>
                  <div className="flex flex-wrap gap-2">
                    {materials.map(mat => (
                      <button
                        key={mat}
                        onClick={() => setFilters(f => ({ ...f, material: f.material === mat ? '' : mat }))}
                        className={`technical-text text-xs px-3 py-1.5 border transition-colors ${
                          filters.material === mat
                            ? 'bg-juniper text-bone border-juniper'
                            : 'border-obsidian/15 text-obsidian/60 hover:border-obsidian/30'
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Product grid */}
        <div className="py-6 md:py-10">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-obsidian/5" />
                  <div className="mt-3 h-4 w-3/4 bg-obsidian/5" />
                  <div className="mt-2 h-3 w-1/3 bg-obsidian/5" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="section-heading text-obsidian/20 mb-4">No items found</p>
              <p className="text-obsidian/40 mb-6">Try adjusting your filters</p>
              <Link to="/collection" className="technical-text text-juniper hover:text-obsidian transition-colors">
                View All Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
