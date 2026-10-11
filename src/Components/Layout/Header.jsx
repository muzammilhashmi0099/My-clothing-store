import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { motion, AnimatePresence } from 'framer-motion';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [glassy, setGlassy] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [galleryActive, setGalleryActive] = useState(false);
  const [barHeight, setBarHeight] = useState(0);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);
  const barRef = useRef(null);

  const isInnerPage = location.pathname !== '/' && location.pathname !== '/gallery';
  const isProductPage = location.pathname.startsWith('/product/');

  useEffect(() => {
    if (barRef.current) setBarHeight(barRef.current.offsetHeight);
  }, []);

  // Reset hidden state on every route change (pathname or search)
  useEffect(() => {
    setHidden(false);
    setGlassy(false);
    setGalleryActive(false);
    lastScrollY.current = 0;
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handler = () => {
      const current = window.scrollY;
      const scrollingDown = current > lastScrollY.current;
      if (scrollingDown && current > 60) {
        setHidden(true);
        setGlassy(false);
      } else if (!scrollingDown) {
        setHidden(false);
        setGlassy(current > 60);
      }
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => setGalleryActive(e.detail.active);
    window.addEventListener('galleryHover', handler);
    return () => window.removeEventListener('galleryHover', handler);
  }, []);

  const navLinks = [
  { label: 'Shop All', to: '/collection' },
  { label: 'New In', to: '/collection?category=new' },
  { label: 'Woman', to: '/collection?category=women' },
  { label: 'Man', to: '/collection?category=men' }];


  const linkColor = galleryActive ? 'rgba(255,255,255,0.85)' : '#121212';
  const linkHoverColor = galleryActive ? '#ffffff' : '#000000';
  // On inner pages always show solid white background (regardless of scroll/glassy)
  const innerBg = isInnerPage ? 'rgba(255,255,255,1)' : undefined;
  const innerBorder = isInnerPage ? '1px solid rgba(18,18,18,0.08)' : undefined;

  return (
    <>
      {/* Announcement bar — slides with header */}
      <div
        ref={barRef}
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: 0,
          transform: (hidden && !isProductPage) ? 'translateY(-200%)' : 'translateY(0)',
          background: '#000000',
          padding: '4px 0',
          textAlign: 'center'
        }}>
        
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF' }}>
          Free Delivery Above $200 &amp; Free Returns
        </span>
      </div>

      <header
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: barHeight,
          transform: (hidden && !isProductPage) ? 'translateY(-200%)' : 'translateY(0)',
          background: isInnerPage ? innerBg : (glassy ? 'rgba(255,255,255,0.08)' : 'transparent'),
          backdropFilter: !isInnerPage && glassy ? 'blur(22px)' : 'none',
          WebkitBackdropFilter: !isInnerPage && glassy ? 'blur(22px)' : 'none',
          borderBottom: isInnerPage ? innerBorder : (glassy ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent')
        }}>
        
        <div className="flex items-center justify-between h-16 md:h-20" style={{ paddingLeft: 'clamp(10px, 1.9vw, 20px)', paddingRight: 'clamp(10px, 1.9vw, 20px)' }}>
          
          {/* Left — category nav (hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const linkActive = (location.pathname + location.search) === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(e) => {
                    if (link.to === '/collection' && location.pathname === '/collection') {
                      e.preventDefault();
                      navigate('/collection', { replace: true });
                      window.dispatchEvent(new Event('clearCollectionFilters'));
                    }
                  }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: 14, color: linkColor,
                    textTransform: 'uppercase', letterSpacing: '0.04em', textDecoration: 'none',
                    transition: 'opacity 0.2s',
                    borderBottom: linkActive ? `1px solid ${linkColor}` : '1px solid transparent',
                    paddingBottom: 2,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            
            <span style={{ display: 'block', width: 22, height: 1, background: galleryActive ? '#fff' : '#121212', transition: 'background 0.3s' }} />
            <span style={{ display: 'block', width: 22, height: 1, background: galleryActive ? '#fff' : '#121212', transition: 'background 0.3s' }} />
            <span style={{ display: 'block', width: 14, height: 1, background: galleryActive ? '#fff' : '#121212', transition: 'background 0.3s' }} />
          </button>

          {/* Center — logo (desktop) / Right — logo (mobile) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <Link to="/">
              <img
                src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/f27128090_8b5d52b45_logonew.jpg"
                alt=""
                className="w-auto transition-all duration-500"
                style={{ height: 28, filter: galleryActive ? 'invert(1) brightness(10)' : 'none' }} />
              
            </Link>
          </div>
          {/* Mobile logo — centered absolutely */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2">
            <Link to="/">
              <img
                src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/f27128090_8b5d52b45_logonew.jpg"
                alt=""
                className="w-auto transition-all duration-500"
                style={{ height: 22, filter: galleryActive ? 'invert(1) brightness(10)' : 'none' }} />
              
            </Link>
          </div>

          {/* Right — search (desktop only) + cart */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: linkColor, alignItems: 'center', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: linkColor, textTransform: 'uppercase', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'} className="text-xs">
              
              Cart ({String(totalItems).padStart(2, '0')})
            </button>
          </div>
        </div>
      </header>
      {/* spacer so content sits below announcement bar + header */}

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-bone flex flex-col">
          
            <div className="px-6 flex items-center justify-between h-16">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <img src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/f27128090_8b5d52b45_logonew.jpg" alt="" className="h-8 w-auto" />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-obsidian">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="px-6 pt-12 flex flex-col gap-6">
              {navLinks.map((link, i) =>
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}>
              
                  <Link
                to={link.to}
                className="section-heading text-obsidian block"
                onClick={() => setMobileOpen(false)}>
                
                    {link.label}
                  </Link>
                </motion.div>
            )}
              {/* Search button inside mobile menu */}
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}>
              
                <button
                onClick={() => {setMobileOpen(false);setSearchOpen(true);}}
                className="flex items-center gap-3 text-obsidian/60"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                
                  <Search size={20} strokeWidth={1.5} />
                  <span className="section-heading text-obsidian">Search</span>
                </button>
              </motion.div>
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
