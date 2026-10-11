import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen &&
      <>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
          style={{ background: 'rgba(0,0,0,0.04)' }}
          onClick={() => setIsOpen(false)} />
        
          <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[80] flex flex-col"
          style={{
            background: 'rgba(10,10,10,0.92)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            borderLeft: '1px solid rgba(255,255,255,0.08)'
          }}>
          
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
              <p className="technical-text text-white/60">
                Your Bag [ {String(totalItems).padStart(2, '0')} ]
              </p>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ?
            <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="text-white/30 mb-4" />
                  <p className="font-heading text-2xl text-white mb-2">Your bag is empty</p>
                  <p className="text-sm text-white/60 mb-6">Discover our latest collections</p>
                  <Link
                to="/collection"
                onClick={() => setIsOpen(false)}
                className="technical-text bg-white text-obsidian px-8 py-3 hover:bg-white/90 transition-colors border border-obsidian/20">
                
                    Shop Now
                  </Link>
                </div> :

            <div className="space-y-6">
                  {items.map((item) =>
              <div key={item.id} className="flex gap-4">
                      {item.product_image &&
                <Link to={`/product/${item.product_id}`} onClick={() => setIsOpen(false)}>
                          <img src={item.product_image} alt={item.product_name} className="w-20 h-24 object-cover" />
                        </Link>
                }
                      <div className="flex-1 min-w-0">
                        <Link
                    to={`/product/${item.product_id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium text-white hover:text-white/70 transition-colors block truncate">
                    
                          {item.product_name}
                        </Link>
                        <p className="technical-text text-white/40 mt-1">
                          {item.size}{item.color ? ` / ${item.color}` : ''}
                        </p>
                        <p className="technical-text text-white mt-1">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors">
                      
                            <Minus size={12} />
                          </button>
                          <span className="technical-text text-white w-4 text-center">{item.quantity}</span>
                          <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors">
                      
                            <Plus size={12} />
                          </button>
                          <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto technical-text text-xs text-white/40 hover:text-white transition-colors">
                      
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
              )}
                </div>
            }
            </div>

            {/* Footer */}
            {items.length > 0 &&
          <div className="px-6 py-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <p className="technical-text text-white/60">Total</p>
                  <p className="technical-text text-white text-lg">${totalPrice.toFixed(2)}</p>
                </div>
                <p className="text-xs text-white/40 mb-4">Shipping calculated at checkout</p>
                <button
                  onClick={() => { setIsOpen(false); navigate('/checkout'); }}
                  className="w-full py-4 technical-text hover:opacity-90 transition-colors text-obsidian bg-white">
                  Checkout
                </button>
                <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center technical-text text-white/40 hover:text-white mt-3 py-2 transition-colors">
              
                  Continue Shopping
                </button>
              </div>
          }
          </motion.div>
        </>
      }
    </AnimatePresence>);

}
