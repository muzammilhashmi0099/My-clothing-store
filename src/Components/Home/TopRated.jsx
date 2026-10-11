import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ProductCard from '@/components/products/ProductCard';

export default function TopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Product.filter({ is_top_rated: true }, '-rating', 4).
    then(setProducts).
    catch(() => {}).
    finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="oxygen-gap">
        <div className="w-full">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-obsidian/5" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) =>
              <div key={i} className="aspect-[4/5] bg-obsidian/5" />
              )}
            </div>
          </div>
        </div>
      </section>);

  }

  if (products.length === 0) return null;

  return null;

















}
