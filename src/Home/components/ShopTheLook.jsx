import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

const LOOKS = [
{
  id: 1,
  name: 'Look 01',
  model: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/74eaf8e3c_60e8819c8_8.jpg',
  items: [
  { name: 'Washed Graphite Tee', price: '$89', id: '6a55e6b5f3286a242f10343a' },
  { name: 'The Blue Shorts', price: '$159', id: '6a55ff493e6cce27198a174c' }]
},
{
  id: 2,
  name: 'Look 02',
  model: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/dc5c93053_fdf0e9d52_4.jpg',
  items: [
  { name: 'Ribbed Stone Tank', price: '$68', id: '6a4625933967da21d114e850' },
  { name: 'Washed Camo Pants', price: '$320', id: '6a4625933967da21d114e853' }]
},
{
  id: 3,
  name: 'Look 03',
  model: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/58dfc37fb_16b827364_3.jpg',
  items: [
  { name: 'Basic White Tank', price: '$29', id: '6a56033e51fb428b33dd392f' },
  { name: 'Pink Stripe Jeans', price: '$245', id: '6a4625933967da21d114e852' }]
},

{
  id: 4,
  name: 'Look 04',
  model: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/1b01d354a_d366f0d0f_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-07_12-52-26.jpg',
  items: [
  { name: 'Panel Charcoal Tee', price: '$89', id: '6a4625933967da21d114e851' },
  { name: 'Balloon Olive Pants', price: '$129', id: '6a5608e64befa10795f74d1c' }]
},
{
  id: 5,
  name: 'Look 05',
  model: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/3825a33db_764163c70_2.jpg',
  items: [
  { name: 'Washed Forest Set', price: '$385', id: '6a4625933967da21d114e84f' }]
},
{
  id: 6,
  name: 'Look 06',
  model: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/482b5899a_39fa12b5d_7.jpg',
  items: [
  { name: 'Washed Hoodie', price: '$310', id: '6a4f65d58bb623cd7262ef3c', defaultColor: 'Stone' },
  { name: 'Utility Black Pants', price: '$129', id: '6a560d7aff120cffe5ad2b3a' }]
},
{
  id: 7,
  name: 'Look 07',
  model: 'https://media.base44.com/images/public/6a4623baae30bbc2404dae18/fcbf3e49e_89004c3ea__.jpg',
  items: [
  { name: 'Washed Hoodie', price: '$310', id: '6a4f65d58bb623cd7262ef3c', defaultColor: 'Pink' },
  { name: 'Straight Check Pants', price: '$139', id: '6a55e58919f94e25abaea993' }]
}];

const N = LOOKS.length;
// Triple the array for infinite illusion
const ITEMS = [...LOOKS, ...LOOKS, ...LOOKS];
const ITEM_WIDTH = 320;
const GAP = 32;

function LookItem({ item, product, hidden, imageHovered, alwaysShowShopNow }) {
  const [hovered, setHovered] = useState(false);
  const showShopNow = alwaysShowShopNow || hovered || imageHovered;
  return (
    <Link
      to={`/product/${item.id}`}
      className="flex flex-col gap-1"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        alignItems: showShopNow ? 'flex-start' : 'center',
        transition: 'opacity 0.5s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="technical-text" style={{ color: hovered ? '#121212' : 'rgba(18,18,18,0.7)', transition: 'color 0.5s ease' }}>
        {product ? product.name : item.name}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span
          className="technical-text"
          style={{
            color: 'rgba(18,18,18,0.4)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {product ? `$${product.price}` : item.price}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.1em',
          color: '#121212',
          opacity: showShopNow ? 1 : 0,
          maxWidth: showShopNow ? 120 : 0,
          overflow: 'hidden',
          transform: showShopNow ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'opacity 0.5s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1), max-width 0.55s cubic-bezier(0.16,1,0.3,1)',
          whiteSpace: 'nowrap',
        }}>
          SHOP NOW →
        </span>
      </div>
    </Link>
  );
}

function CarouselItem({ look, isActive, isDragging, scale, rotateY, opacity, motionBlur, productsMap, onClick, cursor, hoveredHalf, setHoveredHalf }) {
  return (
    <div
      onClick={onClick}
      onMouseLeave={() => isActive && setHoveredHalf(null)}
      style={{
        flex: '0 0 auto',
        width: ITEM_WIDTH,
        marginRight: GAP,
        transform: `scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        filter: motionBlur > 0 ? `blur(${motionBlur}px)` : 'none',
        transition: isDragging ? 'opacity 0.2s, filter 0.1s' : 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        transformOrigin: 'center center',
        transformStyle: 'preserve-3d',
        cursor,
        position: 'relative',
      }}>

      <img
        src={look.model}
        alt=""
        draggable={false}
        style={{ width: ITEM_WIDTH, height: window.innerWidth < 768 ? 375 : 460, objectFit: 'contain', display: 'block' }} />

      {/* Hover zones — only interactive on active card */}
      {isActive && (
        <>
          {/* Top half zone */}
          <Link
            to={`/product/${look.items[0]?.id}${look.items[0]?.defaultColor ? `?color=${encodeURIComponent(look.items[0].defaultColor)}` : ''}`}
            onMouseEnter={() => setHoveredHalf('top')}
            onClick={e => isDragging && e.preventDefault()}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', zIndex: 10, display: 'block', cursor: 'pointer' }}
          />
          {/* Bottom half zone */}
          <Link
            to={`/product/${look.items[1]?.id}`}
            onMouseEnter={() => setHoveredHalf('bottom')}
            onClick={e => isDragging && e.preventDefault()}
            style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '50%', zIndex: 10, display: 'block', cursor: 'pointer' }}
          />
        </>
      )}
    </div>
  );
}

export default function ShopTheLook() {
  const [hoveredHalf, setHoveredHalf] = useState(null); // 'top' | 'bottom' | null
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const [productsMap, setProductsMap] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const allIds = [...new Set(LOOKS.flatMap(l => l.items.map(i => i.id)))];

  const fetchProducts = () => {
    Promise.all(allIds.map(id => base44.entities.Product.get(id).catch(() => null)))
      .then(results => {
        const map = {};
        results.forEach((p, i) => { if (p) map[allIds[i]] = p; });
        setProductsMap(map);
      });
  };

  useEffect(() => {
    fetchProducts();
    const unsubscribe = base44.entities.Product.subscribe(() => fetchProducts());
    return unsubscribe;
  }, []);

  // Start at index N (middle copy) so we can scroll left immediately
  const [active, setActive] = useState(N);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [animated, setAnimated] = useState(true);
  const startX = useRef(null);
  const lastX = useRef(null);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef(null);
  const jumpPending = useRef(false);

  const lookIndex = (active % N + N) % N;
  const activeLook = LOOKS[lookIndex];

  const goTo = (i) => {
    if (jumpPending.current) return;
    setAnimated(true);
    setActive(i);

    // After animation, silently jump to the middle copy
    jumpPending.current = true;
    setTimeout(() => {
      const normalized = (i % N + N) % N;
      const middle = normalized + N;
      if (i !== middle) {
        setAnimated(false);
        setActive(middle);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          setAnimated(true);
          jumpPending.current = false;
        }));
      } else {
        jumpPending.current = false;
      }
    }, 650);
  };

  // Mouse drag
  const onMouseDown = (e) => {startX.current = e.clientX;lastX.current = e.clientX;setIsDragging(false);setVelocity(0);};
  const onMouseMove = (e) => {
    if (startX.current === null) return;
    const diff = e.clientX - startX.current;
    const vel = e.clientX - (lastX.current ?? e.clientX);
    lastX.current = e.clientX;
    setDragOffset(diff);
    setVelocity(vel);
    if (Math.abs(diff) > 5) setIsDragging(true);
  };
  const onMouseUp = (e) => {
    if (startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 60) goTo(diff < 0 ? active + 1 : active - 1);
    startX.current = null;
    lastX.current = null;
    setDragOffset(0);
    setVelocity(0);
    setTimeout(() => setIsDragging(false), 10);
  };

  // Touch
  const onTouchStart = (e) => {startX.current = e.touches[0].clientX;lastX.current = e.touches[0].clientX;setVelocity(0);};
  const onTouchMove = (e) => {
    if (startX.current === null) return;
    const x = e.touches[0].clientX;
    setVelocity(x - (lastX.current ?? x));
    lastX.current = x;
    setDragOffset(x - startX.current);
  };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(diff) > 60) goTo(diff < 0 ? active + 1 : active - 1);
    startX.current = null;
    lastX.current = null;
    setDragOffset(0);
    setVelocity(0);
  };

  // Wheel
  const onWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (delta === 0) return;
    e.preventDefault();
    wheelAccum.current += delta;
    clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {wheelAccum.current = 0;}, 300);
    if (Math.abs(wheelAccum.current) > 300) {
      goTo(wheelAccum.current > 0 ? active + 1 : active - 1);
      wheelAccum.current = 0;
    }
  };

  return (
    <section ref={sectionRef} className="oxygen-gap bg-[hsl(var(--background))]" style={{ overflowX: 'hidden' }}>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12 px-4 md:px-0">
          <h2 className="section-heading text-obsidian text-xl uppercase [font-family:'Fira_Code',_monospace] font-normal tracking-normal text-center w-full">Shop the Look</h2>
        </div>

        {/* Two persistent plus icons — top and bottom product */}
        <div className="relative" style={{ height: 0 }}>
          {/* Top plus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={sectionVisible ? { opacity: 1, scale: hoveredHalf === 'top' ? 1.18 : 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: hoveredHalf ? 0.25 : 0.5, delay: sectionVisible && !hoveredHalf ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: isMobile ? 140 : 180,
              left: 'calc(50% + 40px)',
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'none',
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </motion.div>
          {/* Bottom plus */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={sectionVisible ? { opacity: 1, scale: hoveredHalf === 'bottom' ? 1.18 : 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: hoveredHalf ? 0.25 : 0.5, delay: sectionVisible && !hoveredHalf ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: isMobile ? 260 : 300,
              left: 'calc(50% - 60px)',
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'none',
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </motion.div>
        </div>

        {/* Carousel */}
        <div
          className="relative select-none"
          style={{ width: (isMobile || isTablet) ? '75%' : '100%', margin: (isMobile || isTablet) ? '0 auto' : undefined, height: (isMobile || isTablet) ? 420 : 520, cursor: isDragging ? 'grabbing' : 'grab', perspective: 1200, overflow: (isMobile || isTablet) ? 'visible' : 'hidden' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              transform: `translateX(calc(50% - ${active * (ITEM_WIDTH + GAP)}px - ${ITEM_WIDTH / 2}px + ${dragOffset}px))`,
              transition: animated && !isDragging ? 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' : 'none'
            }}>
            
            {ITEMS.map((look, i) => {
              const dist = i - active;
              const absDist = Math.abs(dist);
              const scale = absDist === 0 ? 1 : absDist === 1 ? 0.75 : 0.55;
              const opacity = absDist === 0 ? 1 : absDist === 1 ? 0.5 : 0.25;
              const blur = absDist === 0 ? 0 : absDist === 1 ? 3 : 7;

              const tiltFromDrag = absDist === 0 ? Math.max(-12, Math.min(12, velocity * 0.35)) : 0;
              const tiltFromPos = absDist > 0 ? dist * -4 : 0;
              const rotateY = isDragging ? tiltFromDrag : tiltFromPos;
              const motionBlur = absDist === 0 && isDragging ? Math.min(Math.abs(velocity) * 0.3, 6) : blur;

              const isActive = absDist === 0;
              return (
                <CarouselItem
                  key={i}
                  look={look}
                  isActive={isActive}
                  isDragging={isDragging}
                  scale={scale}
                  rotateY={rotateY}
                  opacity={opacity}
                  motionBlur={motionBlur}
                  productsMap={productsMap}
                  onClick={() => !isDragging && goTo(i)}
                  cursor={absDist > 0 ? 'pointer' : isDragging ? 'grabbing' : 'grab'}
                  hoveredHalf={isActive ? hoveredHalf : null}
                  setHoveredHalf={setHoveredHalf}
                />
              );

            })}
          </div>
        </div>

        {/* Mobile arrows — only on mobile and tablet */}
        {(isMobile || isTablet) && (
          <div className="flex items-center justify-center gap-8 mt-6">
            <button
              onClick={() => goTo(active - 1)}
              style={{ background: 'none', border: 'none', width: 44, height: 44, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'rgba(18,18,18,0.4)' }}>
              {String(lookIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </span>
            <button
              onClick={() => goTo(active + 1)}
              style={{ background: 'none', border: 'none', width: 44, height: 44, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        )}

        {/* Items for active look */}
        <div className="flex items-center justify-center gap-10 mt-10">
          {activeLook.items.map((item, idx) => {
            const p = productsMap[item.id];
            const isTopItem = idx === 0;
            const isBottomItem = idx === 1;
            const hidden =
              (hoveredHalf === 'top' && isBottomItem) ||
              (hoveredHalf === 'bottom' && isTopItem);
            const imageHovered =
              (hoveredHalf === 'top' && isTopItem) ||
              (hoveredHalf === 'bottom' && isBottomItem);
            return (
              <LookItem
                key={item.id}
                item={item}
                product={p}
                hidden={hidden}
                imageHovered={imageHovered}
                alwaysShowShopNow={isMobile || isTablet}
              />
            );
          })}
        </div>

        {/* Dots */}
        
















        
      </div>
    </section>);

}
