import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/cartContext';
import { ShoppingCart } from 'lucide-react';


const SECTIONS = [
  {
    numberOffset: 0,
    products: [
      { id: '6a4625933967da21d114e84f', name: 'Structured Wool Blazer', price: 595, img: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/3c413080d_31246b900_untitled_Gemini-3-Nano-Banana-Pro_2026-07-07_07-34-58.jpg", img2: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/1641a4d05_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-07_07-41-54.jpg" },
      { id: '6a4625933967da21d114e850', name: 'Organic Cotton Tee', price: 120, img: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/31b8b35ba_0ee74921e_untitled_Gemini-3-Nano-Banana-Pro_2026-07-07_09-12-10.jpg", img2: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/95439df1b_6cbbb1b42_untitled_Gemini_3__Nano_Banana_Pro__2026-07-07_09-49-06.jpg" },
      { id: '6a4625933967da21d114e851', name: 'Linen Wide-Leg Trousers', price: 340, img: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/53eae351e_5bb59cf3e_untitled_Gemini-3-Nano-Banana-Pro_2026-07-07_07-57-48.jpg", img2: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/db258846d_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-07_08-13-56.jpg" },
      { id: '6a4625933967da21d114e852', name: 'Cashmere Blend Sweater', price: 480, img: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/367e5e3b8_2b34ca2f5_untitled_Gemini-3-Nano-Banana-Pro_2026-07-07_08-44-36.jpg", img2: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/1adf24638_untitled_Gemini-13-_Nano-Banana-Pro__2026-07-07_09-31-01.jpg" },
    ],
  },
  {
    numberOffset: 4,
    products: [
      { id: '6a4625933967da21d114e853', name: 'Washed Camo Pants', price: 320, img: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/b06a262ac_e2fe96dd6_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-07_12-51-08.jpg", img2: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/f09a94e48_875f53aa9_untitled_Gemini_3__Nano_Banana_Pro__2026-07-08_08-21-46.jpg" },
      { id: '6a4f65d58bb623cd7262ef3c', name: 'Washed Navy Hoodie', price: 310, img: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/dd800a80e_3048cb7ff_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-08_07-55-01.jpg", img2: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/a599da950_42072c6ca_untitled_Gemini_3__Nano_Banana_Pro__2026-07-08_08-11-44.jpg" },
      { id: '6a55e6b5f3286a242f10343a', name: 'Washed Graphite Tee', price: 89, img: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/b17686a1e_2bcc65134_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-08_15-35-56.jpg", img2: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/0e6e6442e_5d79de4c9_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-08_16-39-25.jpg" },
      { id: '6a55e58919f94e25abaea993', name: 'Straight Check Pants', price: 139, img: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/402655bf5_36521efec_6.jpg", img2: "https://media.base44.com/images/public/6a4623baae30bbc2404dae18/f826911d0_b20bc83e6_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-08_08-20-10.jpg" },
    ],
  },
];

// labelSide: 'right' | 'left' | 'below' | 'above'
const LAYOUT = [
  [
    { top: 'calc(4% + 0px)', left: 'calc(13% - 10px)', width: 330, labelSide: 'right' },
    { top: 'calc(5% - 40px)', left: '62%', width: 230, labelSide: 'below' },
    { top: 'calc(35% + 170px)', left: '7%', width: 330, labelSide: 'right' },
    { top: 'calc(32% + 170px)', left: '71%', width: 260, labelSide: 'above' },
  ],
  [
    { top: 'calc(4% + 60px)', left: 'calc(13% + 70px)', width: 265, labelSide: 'right' },
    { top: 'calc(5% - 50px)', left: 'calc(62% + 30px)', width: 365, labelSide: 'left' },
    { top: 'calc(35% + 220px)', left: '7%', width: 345, labelSide: 'right' },
    { top: 'calc(32% + 235px)', left: '71%', width: 335, labelSide: 'left' },
  ],
];

// All digits 0-9 in a vertical strip; we translate to show the correct one
// n = numeric digit value 0-9
function OdometerDigit({ n, color }) {
  return (
    <div style={{
      overflow: 'hidden',
      display: 'inline-block',
      height: '1.2em',
      lineHeight: '1.2em',
      position: 'relative',
    }}>
      <motion.div
        animate={{ y: `${-n * 1.2}em` }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ display: 'flex', flexDirection: 'column', color }}
      >
        {[0,1,2,3,4,5,6,7,8,9].map((d) => (
          <span key={d} style={{ display: 'block', height: '1.2em', lineHeight: '1.2em' }}>{d}</span>
        ))}
      </motion.div>
    </div>
  );
}

function OdometerNumber({ n, color }) {
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return (
    <span style={{ display: 'inline-flex', letterSpacing: '0.05em' }}>
      <OdometerDigit n={tens} color={color} />
      <OdometerDigit n={ones} color={color} />
    </span>
  );
}

// Odometer-style image: clips to a fixed window, slides old image out and new image in — exactly like OdometerDigit
function SlotImage({ src, alt, width, height, sectionIndex, slotIndex, direction }) {
  const [displayed, setDisplayed] = useState(src); // the image currently visible
  const [incoming, setIncoming] = useState(null);   // the next image sliding in
  const [animating, setAnimating] = useState(false);
  const prevSectionRef = useRef(sectionIndex);

  useEffect(() => {
    if (prevSectionRef.current === sectionIndex) return;
    prevSectionRef.current = sectionIndex;

    // stagger each slot slightly
    const delay = slotIndex * 70;
    const timer = setTimeout(() => {
      setIncoming(src);
      setAnimating(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [sectionIndex, src, slotIndex]);

  // when animation ends, settle
  const handleAnimationComplete = () => {
    setDisplayed(incoming);
    setIncoming(null);
    setAnimating(false);
  };

  // direction: 1 = scroll down → new image comes from below, old exits up
  //            -1 = scroll up → new image comes from above, old exits down
  const enterFrom = direction > 0 ? height : -height;
  const exitTo   = direction > 0 ? -height : height;

  return (
    <div style={{ width, height, overflow: 'hidden', position: 'relative' }}>
      {/* current image — slides out when animating */}
      <motion.img
        src={displayed}
        alt=""
        animate={animating ? { y: exitTo } : { y: 0 }}
        transition={{ duration: 0.45 + slotIndex * 0.04, ease: [0.4, 0, 0.2, 1] }}
        style={{ width, height, objectFit: 'contain', position: 'absolute', top: 0, left: 0 }}
      />
      {/* incoming image — slides in from opposite side */}
      {animating && incoming && (
        <motion.img
          src={incoming}
          alt=""
          initial={{ y: enterFrom }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45 + slotIndex * 0.04, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={handleAnimationComplete}
          style={{ width, height, objectFit: 'contain', position: 'absolute', top: 0, left: 0 }}
        />
      )}
    </div>
  );
}

function TabletProduct({ product, pos, productName, productPrice, sectionIndex, slotIndex, direction }) {
  const [peeking, setPeeking] = useState(false);
  const touchStartRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return;
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartRef.current.x);
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartRef.current.y);
    if (dx < 8 && dy < 8) setPeeking(true);
    touchStartRef.current = null;
  };

  const handleClick = () => setPeeking(true);

  return (
    <>
      <div
        className="absolute z-40"
        style={{ top: pos.top, left: pos.left, width: pos.width, cursor: 'pointer' }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <SlotImage
          src={product.img}
          alt={productName}
          width={pos.width}
          height={pos.width * 1.5}
          sectionIndex={sectionIndex}
          slotIndex={slotIndex}
          direction={direction}
        />
      </div>

      <AnimatePresence>
        {peeking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#000', display: 'flex', flexDirection: 'column' }}
          >
            <button
              onClick={() => setPeeking(false)}
              style={{
                position: 'absolute', top: 120, right: 20, zIndex: 1100,
                width: 40, height: 40, background: 'rgba(255,255,255,0.2)',
                border: 'none', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <motion.img
              src={product.img2}
              alt=""
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', bottom: 40, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                padding: '48px 32px 48px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', letterSpacing: '0.08em', margin: 0 }}>
                {productName}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', marginTop: 4 }}>
                ${productPrice}
              </p>
              <Link
                to={`/product/${product.id}`}
                onClick={() => setPeeking(false)}
                style={{
                  display: 'inline-block', marginTop: 20,
                  background: '#fff', color: '#121212',
                  padding: '14px 36px',
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
                }}
              >
                View Product →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GallerySection({ section, hovered, setHovered, direction, sectionIndex, layout, productsMap, isTablet }) {
  const { products, numberOffset } = section;
  const sectionRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [added, setAdded] = useState({});
  const { addItem } = useCart();

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight; // 0 at top, 1 when scrolled past
      setParallaxY(progress * 220); // numbers move 220px slower than the page
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setHoveredWithEvent = (val) => {
    setHovered(val);
    window.dispatchEvent(new CustomEvent('galleryHover', { detail: { active: val !== null } }));
  };

  return (
    <div ref={sectionRef} style={{ width: '100%', height: '100%' }}>
      {/* Fullscreen background overlay */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={`bg-${hovered}-${numberOffset}`}
            className="fixed inset-0 z-30 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={products[hovered].img2}
              alt=""

              className="absolute object-cover"
              style={{ width: '100%', height: '130%', top: '-15%', left: 0 }}
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-obsidian/30" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center number column — 4 slots, evenly spaced */}
      {/* Streetwear Unfiltered text block — outside motion.div to avoid inherited opacity */}
      {numberOffset === 0 && (
        <div style={{ position: 'absolute', left: '50%', transform: `translateX(-50%) translateY(${parallaxY}px)`, top: 'calc(50% - 60px)', width: 380, zIndex: 50, textAlign: 'center', pointerEvents: 'none' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#121212', whiteSpace: 'nowrap', textAlign: 'center' }}>
            Streetwear Unfiltered
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, marginTop: 7, fontWeight: 400, color: '#121212', maxWidth: 380, lineHeight: 1.7, whiteSpace: 'normal', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.02em', margin: '7px auto 0' }}>
            Your direct destination to shop clean matching sets, raw graphic staples, and relaxed proportions. No hype, no filler, just essential garments.
          </p>
        </div>
      )}

      <div className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none" style={{ top: 50, bottom: 100, transform: `translateX(-50%) translateY(${parallaxY}px)`, width: 60 }}>
        <div className="flex flex-col h-full">
          {[0, 1, 2, 3].map((i) => {
            const num = numberOffset + i + 1;
            const isActive = hovered !== null;
            const color = isActive ? '#FFFFFF' : '#121212';
            // After "02": push down to make room for STYLE HUB block
            const extraMargin = i === 1 ? 60 : 0;
            // "01" gets extra space below it (large gap before "02")
            const marginAfter01 = i === 0 ? 80 : 0;
            // In section 2 (05-08), no extra margins — let flex distribute evenly
            const sectionTwoOverride = numberOffset === 4;
            return (
              <motion.div
                key={i}
                className="flex-1 flex items-center justify-center technical-text text-sm"
                style={{ marginBottom: sectionTwoOverride ? 0 : extraMargin + marginAfter01, flexDirection: 'column', gap: 0 }}
                animate={{ opacity: isActive ? 1 : 0.45 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  style={{ pointerEvents: 'auto', cursor: 'pointer', padding: '8px 12px' }}
                  onMouseEnter={() => setHoveredWithEvent(i)}
                  onMouseLeave={() => setHoveredWithEvent(null)}
                >
                  <OdometerNumber n={num} color={color} />
                </span>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating product images */}
      {products.map((product, i) => {
        const pos = layout[i];
        const isHovered = hovered === i;
        const anyHovered = hovered !== null;
        const productName = productsMap[product.id]?.name || product.name;
        const productPrice = productsMap[product.id]?.price || product.price;

        if (isTablet) {
          return <TabletProduct key={product.id + i} product={product} pos={pos} productName={productName} productPrice={productPrice} sectionIndex={sectionIndex} slotIndex={i} direction={direction} />;
        }

        const sizes = productsMap[product.id]?.sizes || ['S', 'M', 'L', 'XL'];
        const chosenSize = selectedSizes[i];
        const wasAdded = added[i];

        // Extend the hover hit-box to cover the label area
        const labelPad = 140;
        const wrapStyle = pos.labelSide === 'above'
          ? { top: `calc(${pos.top} - ${labelPad}px)`, left: pos.left, width: pos.width, paddingTop: labelPad }
          : pos.labelSide === 'right'
          ? { top: pos.top, left: pos.left, width: pos.width + labelPad, paddingRight: labelPad }
          : pos.labelSide === 'left'
          ? { top: pos.top, left: `calc(${pos.left} - ${labelPad}px)`, width: pos.width + labelPad, paddingLeft: labelPad }
          : { top: pos.top, left: pos.left, width: pos.width, paddingBottom: labelPad };

        return (
          <div
            key={product.id + i}
            className="absolute z-40"
            style={{ ...wrapStyle, pointerEvents: 'none' }}
          >
            {/* Inner div carries pointer-events so only image+label area is interactive */}
            <div
              style={{ position: 'relative', display: 'block', pointerEvents: 'auto' }}
              onMouseEnter={() => setHoveredWithEvent(i)}
              onMouseLeave={() => setHoveredWithEvent(null)}
            >
              <Link to={`/product/${product.id}`} style={{ display: 'block' }}>
                <div style={{
                  opacity: anyHovered ? (isHovered ? 1 : 0) : 1,
                  transition: 'opacity 0.35s ease',
                  filter: anyHovered && !isHovered ? 'blur(1px)' : 'none',
                }}>
                  <SlotImage
                    src={product.img}
                    alt={product.name}
                    width={pos.width}
                    height={pos.width * 1.5}
                    sectionIndex={sectionIndex}
                    slotIndex={i}
                    direction={direction}
                  />
                </div>
              </Link>
              <div style={{
                position: 'absolute',
                ...(pos.labelSide === 'right'  ? { left: '100%', top: '50%', transform: 'translateY(-50%)', paddingLeft: 16 } :
                    pos.labelSide === 'left'   ? { right: '100%', top: '50%', transform: 'translateY(-50%)', paddingRight: 16 } :
                    pos.labelSide === 'above'  ? { bottom: '100%', left: 0, paddingBottom: 12 } :
                                                 { top: '100%', left: 0, paddingTop: 12 }),
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.35s ease',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                pointerEvents: isHovered ? 'auto' : 'none',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '12px 16px',
                borderRadius: 2,
              }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {productName}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, marginTop: 6, opacity: 0.8 }}>
                    ${productPrice}
                  </div>
                </Link>
                {/* Size selector + add to cart icon */}
                <div style={{ display: 'flex', gap: 6, marginTop: 10, alignItems: 'center' }}>
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={(e) => { e.stopPropagation(); setSelectedSizes(prev => ({ ...prev, [i]: size })); }}
                      style={{
                        padding: '2px 0',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'transparent',
                        color: '#fff',
                        borderBottom: chosenSize === size ? '1px solid #fff' : '1px solid transparent',
                        transition: 'all 0.15s',
                        marginRight: 10,
                      }}
                    >
                      {size}
                    </button>
                  ))}
                  {/* Cart + icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const finalSize = chosenSize || sizes[0];
                      addItem({ ...productsMap[product.id], id: product.id, name: productName, price: productPrice, images: [product.img] }, finalSize);
                      setAdded(prev => ({ ...prev, [i]: true }));
                      setTimeout(() => setAdded(prev => ({ ...prev, [i]: false })), 1500);
                    }}
                    style={{
                      marginLeft: 2,
                      width: 28, height: 28,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      border: 'none',
                      background: wasAdded ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      transition: 'all 0.2s',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    {wasAdded ? (
                      <span style={{ fontSize: 13 }}>✓</span>
                    ) : (
                      <>
                        <ShoppingCart size={14} strokeWidth={1.5} />
                        <span style={{ position: 'absolute', top: 5, right: 5, fontSize: 9, lineHeight: 1, fontWeight: 600 }}>+</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}


// x/y are percentages of container width; width is percentage of container width
const MOBILE_INITIAL_POSITIONS_PCT = [
  { xPct: 0.03, y: 20,  widthPct: 0.456, rotate: 0 },
  { xPct: 0.54, y: 120,  widthPct: 0.42, rotate: 0 },
  { xPct: 0.05, y: 465, widthPct: 0.43, rotate: 0 },
  { xPct: 0.54, y: 395, widthPct: 0.42, rotate: 0 },
  { xPct: 0.03, y: 625, widthPct: 0.36, rotate: 0 },
  { xPct: 0.05, y: 895, widthPct: 0.55, rotate: -3 },
  { xPct: 0.49, y: 615, widthPct: 0.50, rotate: 2 },
  { xPct: 0.63, y: 865, widthPct: 0.33, rotate: 3 },
];

function DraggableProduct({ product, productsMap, initialPos, zIndex, onBringToFront }) {
  const [peeking, setPeeking] = useState(false);
  const productName = productsMap[product.id]?.name || product.name;
  const productPrice = productsMap[product.id]?.price || product.price;

  const touchStartRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return;
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartRef.current.x);
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartRef.current.y);
    if (dx < 8 && dy < 8) {
      onBringToFront();
      setPeeking(true);
    }
    touchStartRef.current = null;
  };

  return (
    <>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'absolute',
          left: initialPos.x,
          top: initialPos.y,
          width: initialPos.width,
          zIndex,
          transform: `rotate(${initialPos.rotate}deg)`,
          touchAction: 'pan-y',
          cursor: 'pointer',
        }}
      >
        <img
          src={product.img}
          alt=""
          draggable={false}
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>

      {peeking && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#000', display: 'flex', flexDirection: 'column' }}>
          {/* X button */}
          <button
            onTouchEnd={e => { e.stopPropagation(); setPeeking(false); }}
            onClick={() => setPeeking(false)}
            style={{
              position: 'absolute', top: 20, right: 20, zIndex: 10,
              width: 40, height: 40, background: 'rgba(255,255,255,0.2)',
              border: 'none', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <motion.img
            src={product.img2}
            alt=""
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              padding: '48px 24px 40px',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              {productName}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
              ${productPrice}
            </p>
            <Link
              to={`/product/${product.id}`}
              onTouchEnd={e => e.stopPropagation()}
              style={{
                display: 'inline-block', marginTop: 16,
                background: '#fff', color: '#121212',
                padding: '12px 28px',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none',
              }}
            >
              View Product →
            </Link>
          </motion.div>
        </div>
      )}
    </>
  );
}

function MobileGallery({ productsMap }) {
  const allProducts = SECTIONS.flatMap(s => s.products).slice(0, 4);
  const [zOrders, setZOrders] = useState(allProducts.map((_, i) => i + 1));
  const maxZ = useRef(allProducts.length);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const positions = MOBILE_INITIAL_POSITIONS_PCT.map(p => ({
    x: Math.round(p.xPct * containerWidth),
    y: p.y,
    width: Math.round(p.widthPct * containerWidth),
    rotate: p.rotate,
  }));

  const bringToFront = (i) => {
    maxZ.current += 1;
    setZOrders(prev => { const next = [...prev]; next[i] = maxZ.current; return next; });
  };

  const totalHeight = Math.max(...positions.map((p) => p.y + 280)) + 80;

  return (
    <div ref={containerRef} style={{ background: '#FFFFFF', minHeight: totalHeight - 100, paddingTop: 80 }}>
      <div style={{ padding: '45px 32px 12px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#121212', marginTop: 4, textAlign: 'center' }}>Streetwear Unfiltered</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#121212', marginTop: 8, lineHeight: 1.7, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0em' }}>
          Your direct destination to shop clean matching sets, raw graphic staples, and relaxed proportions. No hype, no filler, just essential garments.
        </p>

      </div>
      <div style={{ position: 'relative', height: totalHeight - 600 }}>
        {allProducts.map((product, i) => (
          <DraggableProduct
            key={product.id + i}
            product={product}
            productsMap={productsMap}
            initialPos={positions[i] || positions[0]}
            zIndex={zOrders[i]}
            onBringToFront={() => bringToFront(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function GalleryLook() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(null);
  const [productsMap, setProductsMap] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  const allIds = [...new Set(SECTIONS.flatMap(s => s.products.map(p => p.id)))];

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
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener('resize', onResize);
    return () => { unsubscribe(); window.removeEventListener('resize', onResize); };
  }, []);

  if (isMobile) return <MobileGallery productsMap={productsMap} />;

  return (
    <div style={{ background: '#FFFFFF' }}>
      {SECTIONS.map((section, idx) => (
        <div key={idx} style={{ height: idx === 1 ? 'calc(100vh + 200px)' : '100vh', position: 'relative', overflow: 'hidden', zIndex: idx + 1, marginTop: idx === 0 ? 60 : 0 }}>
          <GallerySection
            section={section}
            hovered={sectionIndex === idx ? hovered : null}
            productsMap={productsMap}
            isTablet={isTablet}
            setHovered={(val) => {
              if (val !== null && sectionIndex !== idx) {
                setHovered(null);
                setSectionIndex(idx);
                setTimeout(() => setHovered(val), 0);
              } else {
                setSectionIndex(idx);
                setHovered(val);
              }
            }}
            direction={direction}
            sectionIndex={idx}
            layout={isTablet
              ? idx === 0
              ? [
                  { ...LAYOUT[0][0], left: 'calc(71% - 60px)', top: 'calc(32% + 190px)' },
                    LAYOUT[0][1],
                    { ...LAYOUT[0][2], left: 'calc(7% - 20px)', top: 'calc(35% + 170px)' },
                    { ...LAYOUT[0][3], left: 'calc(13% - 90px)', top: 'calc(4% + 0px)' },
                  ]
                : [
                    { ...LAYOUT[1][0], left: 'calc(13% - 30px)' },
                    { ...LAYOUT[1][1], left: 'calc(62% - 70px)', top: 'calc(5% - 60px)' },
                    LAYOUT[1][2],
                    { ...LAYOUT[1][3], left: 'calc(71% - 90px)' },
                  ]
              : LAYOUT[idx]}
          />
        </div>
      ))}
    </div>
  );
}
