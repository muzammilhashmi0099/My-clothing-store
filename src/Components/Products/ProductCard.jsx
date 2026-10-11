import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addItem } = useCart();
  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, size);
    setSelectedSize(null);
  };

  const discount = product.original_price && product.original_price > product.price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <div
        className="group relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setSelectedSize(null); }}
      >
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden aspect-[4/5]">
            <img
              src={product.images?.[0]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Quick purchase overlay */}
            <div className={`absolute inset-0 flex items-end transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-full p-4 bg-white" onClick={e => e.preventDefault()}>
                <p className="technical-text text-obsidian/50 mb-2">Quick Add — Select Size</p>
                <div className="flex gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={(e) => handleQuickAdd(e, size)}
                      className={`flex-1 py-2 technical-text text-xs border transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-juniper text-bone border-juniper'
                          : 'border-obsidian/20 text-obsidian hover:border-juniper hover:text-juniper'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Badges */}
            {discount && (
              <span className="absolute top-3 left-3 technical-text text-xs text-bone px-2 py-1" style={{ background: '#64CE00' }}>
                -{discount}%
              </span>
            )}
            {product.is_new_arrival && !discount && (
              <span className="absolute top-3 left-3 technical-text text-xs bg-obsidian text-bone px-2 py-1">
                New
              </span>
            )}
          </div>
        </Link>

        <div className="mt-3">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-obsidian hover:text-juniper transition-colors truncate">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <p className="technical-text text-obsidian">${product.price.toFixed(2)}</p>
            {product.original_price && product.original_price > product.price && (
              <p className="technical-text text-obsidian/40 line-through">${product.original_price.toFixed(2)}</p>
            )}
          </div>
          {product.material && (
            <p className="technical-text text-obsidian/40 mt-1">{product.material}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
