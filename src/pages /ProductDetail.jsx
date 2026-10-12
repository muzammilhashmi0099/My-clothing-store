import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/cartContext';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { motion } from 'framer-motion';

function MobileImageCarousel({ images, name }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  return (
    <div className="block md:hidden w-full relative" style={{ background: '#f5f5f5' }}>
      <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
        <img
          src={images[current]}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Prev */}
        {total > 1 && (
          <button
            onClick={() => setCurrent((current - 1 + total) % total)}
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        {/* Next */}
        {total > 1 && (
          <button
            onClick={() => setCurrent((current + 1) % total)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}
        {/* Dots */}
        {total > 1 && (
          <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: 6, height: 6, borderRadius: '50%', background: i === current ? '#121212' : 'rgba(18,18,18,0.25)', border: 'none', padding: 0, cursor: 'pointer' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [modelSizeOpen, setModelSizeOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [fabricOpen, setFabricOpen] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setSelectedSize(null);
    const urlColor = new URLSearchParams(window.location.search).get('color');
    setSelectedColor(urlColor || null);

    base44.entities.Product.get(id).
    then((p) => {
      setProduct(p);
      return Promise.all([
      base44.entities.Review.filter({ product_id: id }),
      base44.entities.Product.filter({ category: p.category }, '-rating', 4)]
      );
    }).
    then(([revs, rel]) => {
      setReviews(revs);
      setRelated(rel.filter((r) => r.id !== id).slice(0, 4));
    }).
    catch(() => {}).
    finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor);
  };

  if (loading) {
    return (
      <div className="pt-24 flex w-full min-h-screen animate-pulse">
        <div className="w-[300px] flex-shrink-0" />
        <div className="flex-1 space-y-4 p-6">
          <div className="w-full aspect-[4/5] bg-obsidian/5" />
          <div className="w-full aspect-[4/5] bg-obsidian/5" />
        </div>
      </div>);

  }

  if (!product) {
    return (
      <div className="pt-24 text-center py-20">
        <p className="section-heading text-obsidian/20 mb-4">Product not found</p>
        <Link to="/collection" className="technical-text text-juniper">Back to Collection</Link>
      </div>);

  }

  const sizes = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];
  const colors = product.colors || [];
  const colorImages = product.color_images || {};
  const activeColor = selectedColor || colors[0] || null;
  const images = (activeColor && colorImages[activeColor]?.length > 0)
    ? colorImages[activeColor]
    : (product.images || []);

  return (
    <div className="pt-20 md:pt-24 flex flex-col md:flex-row min-h-screen" style={{ marginTop: '35px' }}>

      {/* MOBILE: Image carousel with arrows */}
      <MobileImageCarousel images={images} name={product.name} />

      {/* LEFT: Sticky info panel */}
      <div className="w-full md:w-[40%] flex-shrink-0 md:sticky md:top-0 md:self-start px-6 py-6 border-r border-obsidian/10 md:overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', marginTop: '-10px', height: 'md:100vh' }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 technical-text text-obsidian/30 text-[11px] mb-6">
          <Link to="/" className="hover:text-obsidian transition-colors">HOME PAGE</Link>
          <ChevronRight size={10} />
          <Link to="/collection" className="hover:text-obsidian transition-colors">CATALOG</Link>
          <ChevronRight size={10} />
          <span className="text-obsidian/60 uppercase">{product.name}</span>
        </div>

        {/* Name + Price */}
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h1 className="font-mono text-2xl font-light text-obsidian leading-tight uppercase">{product.name}</h1>
          <span className="technical-text text-obsidian text-base whitespace-nowrap">
            ${product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </span>
        </div>

        {/* Color selector */}
        {colors.length > 0 && (
          <div className="mb-4">
            <p className="technical-text text-obsidian/40 text-xs mb-2">
              Color — <span className="text-obsidian/70">{selectedColor || colors[0]}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => {
                const isSelected = (selectedColor || colors[0]) === color;
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 h-8 technical-text text-xs border transition-colors ${
                      isSelected
                        ? 'bg-obsidian text-white border-obsidian'
                        : 'border-obsidian/20 text-obsidian hover:border-obsidian/50'
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {!colors.length && product.material &&
        <p className="technical-text text-obsidian/40 text-xs mb-4">{product.material}</p>
        }

        {/* Description */}
        {product.description &&
        <p className="text-xs text-obsidian/60 leading-relaxed mb-6">{product.description}</p>
        }

        {/* Size selector */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-3">
            <p className="technical-text text-obsidian/40 text-xs">Size</p>
            <button
              onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
              className="technical-text text-xs text-obsidian/40 hover:text-obsidian transition-colors">
              
              Size Chart
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {sizes.map((size) =>
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? null : size)}
              className={`w-10 h-10 technical-text text-xs border rounded-full transition-colors ${
              selectedSize === size ?
              'bg-obsidian text-white border-obsidian' :
              'border-obsidian/20 text-obsidian hover:border-obsidian/50'}`
              }>
              
                {size}
              </button>
            )}
          </div>
        </div>

        {/* Size guide */}
        {sizeGuideOpen &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mb-4 overflow-hidden">
          
            <table className="w-full text-xs border border-obsidian/10">
              <thead>
                <tr className="technical-text text-obsidian/40 border-b border-obsidian/10">
                  <th className="text-left py-2 px-2">Size</th>
                  <th className="text-left py-2 px-2">Chest</th>
                  <th className="text-left py-2 px-2">Waist</th>
                  <th className="text-left py-2 px-2">Hips</th>
                </tr>
              </thead>
              <tbody className="text-obsidian/60">
                <tr className="border-b border-obsidian/5"><td className="py-1 px-2">XS</td><td className="px-2">82-86</td><td className="px-2">66-70</td><td className="px-2">90-94</td></tr>
                <tr className="border-b border-obsidian/5"><td className="py-1 px-2">S</td><td className="px-2">88-92</td><td className="px-2">72-76</td><td className="px-2">96-100</td></tr>
                <tr className="border-b border-obsidian/5"><td className="py-1 px-2">M</td><td className="px-2">96-100</td><td className="px-2">80-84</td><td className="px-2">104-108</td></tr>
                <tr className="border-b border-obsidian/5"><td className="py-1 px-2">L</td><td className="px-2">104-108</td><td className="px-2">88-92</td><td className="px-2">112-116</td></tr>
                <tr><td className="py-1 px-2">XL</td><td className="px-2">112-116</td><td className="px-2">96-100</td><td className="px-2">120-124</td></tr>
              </tbody>
            </table>
          </motion.div>
        }

        {/* Add to bag */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`w-full py-3 technical-text text-sm transition-all duration-300 mb-3 ${
          selectedSize ?
          'bg-obsidian text-white hover:bg-obsidian/80' :
          'bg-obsidian/10 text-obsidian/30 cursor-not-allowed'}`
          }>
          
          {selectedSize ? 'Add to Bag' : 'Select a Size'}
        </button>



        {/* Accordions */}
        <div className="border-t border-obsidian/10">
          {/* Model size */}
          <div className="border-b border-obsidian/10">
            <button
              className="w-full flex items-center justify-between py-3 text-xs technical-text text-obsidian/60 hover:text-obsidian"
              onClick={() => setModelSizeOpen(!modelSizeOpen)}>
              <span className="flex items-center gap-3">
                <span className="text-obsidian/30">/1</span>
                MODEL'S SIZE
              </span>
              {modelSizeOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {modelSizeOpen && (
              <div className="pb-3 text-xs text-obsidian/50 leading-relaxed">
                {product.model_size || 'The model is 185cm and wears size M.'}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="border-b border-obsidian/10">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between py-3 text-xs technical-text text-obsidian/60 hover:text-obsidian">
              
              <span className="flex items-center gap-3">
                <span className="text-obsidian/30">/2</span>
                DETAILS
              </span>
              {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {detailsOpen &&
            <div className="pb-3 text-xs text-obsidian/50 leading-relaxed">
                {product.description || 'No additional details available.'}
              </div>
            }
          </div>

          {/* Fabric & care */}
          <div className="border-b border-obsidian/10">
            <button
              onClick={() => setFabricOpen(!fabricOpen)}
              className="w-full flex items-center justify-between py-3 text-xs technical-text text-obsidian/60 hover:text-obsidian">
              
              <span className="flex items-center gap-3">
                <span className="text-obsidian/30">/3</span>
                FABRIC & CARE
              </span>
              {fabricOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {fabricOpen &&
            <div className="pb-3 space-y-1 text-xs text-obsidian/50">
                {product.material && <p><span className="text-obsidian/30">Material:</span> {product.material}</p>}
                {product.care_instructions && <p><span className="text-obsidian/30">Care:</span> {product.care_instructions}</p>}
                {product.fit && <p><span className="text-obsidian/30">Fit:</span> <span className="capitalize">{product.fit}</span></p>}
              </div>
            }
          </div>

          {/* You might also like */}
          {related.length > 0 &&
          <div className="pt-6">
            <p className="technical-text text-xs text-obsidian/40 mb-4 flex items-center gap-3">
              <span className="text-obsidian/20">/4</span>
              YOU MIGHT ALSO LIKE
            </p>
            <div className="grid grid-cols-2 gap-4">
              {related.slice(0, 2).map((p) =>
              <Link key={p.id} to={`/product/${p.id}`} className="group block">
                <div className="overflow-hidden mb-2" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={p.images?.[0]}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center justify-between gap-1">
                  <p className="technical-text text-obsidian/70 text-[11px] truncate">{p.name}</p>
                  <ChevronRight size={11} className="text-obsidian/40 group-hover:text-obsidian flex-shrink-0 transition-colors" />
                </div>
                <p className="technical-text text-obsidian/40 text-[11px]">${p.price.toFixed(0)}</p>
              </Link>
              )}
            </div>
          </div>
          }
        </div>
      </div>

      {/* RIGHT: Stacked images — desktop only */}
      <div className="hidden md:block" style={{ width: '60%', flexShrink: 0, overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {images.map((img, i) =>
          <div key={i} style={{ width: '100%' }}>
              <img
              src={img}
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          )}
        </div>

        {/* You may also like */}
        {related.length > 0 &&
        <div className="px-6 py-16 hidden">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="technical-text text-sm text-obsidian">You may also like</h2>
              <div className="flex gap-1">
                <button className="w-7 h-7 border border-obsidian/20 flex items-center justify-center text-obsidian/40 hover:text-obsidian hover:border-obsidian transition-colors rounded-sm">
                  <ChevronDown size={12} className="-rotate-90" />
                </button>
                <button className="w-7 h-7 border border-obsidian/20 flex items-center justify-center text-obsidian/40 hover:text-obsidian hover:border-obsidian transition-colors rounded-sm">
                  <ChevronDown size={12} className="rotate-90" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) =>
            <ProductCard key={p.id} product={p} index={i} />
            )}
            </div>
          </div>
        }
      </div>
    </div>);

}
