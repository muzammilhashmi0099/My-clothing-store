import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const mobileSectionRef = useRef(null);
  const mobileTitleRef = useRef(null);
  const [titleStyle, setTitleStyle] = useState({ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 20 });
  const [mobileTitleStyle, setMobileTitleStyle] = useState({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 });

  useEffect(() => {
    const STOP_OFFSET = 80;

    const onScroll = () => {
      // Desktop
      const section = sectionRef.current;
      const title = titleRef.current;
      if (section && title) {
        const sectionRect = section.getBoundingClientRect();
        const titleHeight = title.offsetHeight;
        const stopPoint = sectionRect.bottom - titleHeight - STOP_OFFSET;
        if (stopPoint <= 0) {
          setTitleStyle({ position: 'absolute', bottom: STOP_OFFSET, left: 0, width: '100%', zIndex: 20 });
        } else if (sectionRect.top <= 0) {
          setTitleStyle({ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 20 });
        } else {
          setTitleStyle({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 20 });
        }
      }

      // Mobile
      const mSection = mobileSectionRef.current;
      const mTitle = mobileTitleRef.current;
      if (mSection && mTitle) {
        const mRect = mSection.getBoundingClientRect();
        const mTitleHeight = mTitle.offsetHeight;
        const mStopPoint = mRect.bottom - mTitleHeight - STOP_OFFSET;
        if (mStopPoint <= 0) {
          setMobileTitleStyle({ position: 'absolute', bottom: STOP_OFFSET, left: 0, width: '100%', zIndex: 10 });
        } else if (mRect.top <= 0) {
          setMobileTitleStyle({ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10 });
        } else {
          setMobileTitleStyle({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 });
        }
      }
    };

    const onResize = () => setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, [loading]);

  useEffect(() => {
    base44.entities.Product.filter({ is_new_arrival: true }, '-created_date', 4).
    then(setProducts).
    catch(() => {}).
    finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full h-screen flex">
        <div className="flex-1 bg-obsidian/5 animate-pulse" />
        <div className="flex-1 bg-obsidian/10 animate-pulse" />
      </section>);

  }

  if (products.length === 0) return null;

  const left = products[0];
  const right = products[1] || products[0];

  return (
    <>
      {/* Mobile version */}
      <section ref={mobileSectionRef} className="md:hidden w-full relative" style={{ background: '#FFFFFF', height: '150vh' }}>
        {/* Sticky scrolling title — same behaviour as desktop */}
        <div ref={mobileTitleRef} style={{ ...mobileTitleStyle, pointerEvents: 'none', width: '100vw', left: 0 }}>
          <h2
            className="uppercase font-heading font-normal text-white"
            style={{ fontSize: 'min(calc(11.5vw + 20px), 13.5vw)', letterSpacing: '-0.02em', lineHeight: 1, margin: 0, width: '100vw', textAlign: 'center', whiteSpace: 'nowrap', display: 'block' }}>
            NEW ARRIVALS
          </h2>
        </div>
        {/* Stacked images filling the section vertically */}
        <div className="absolute inset-0 flex flex-col">
          <Link to={`/product/${right.id}`} className="flex-1 relative overflow-hidden">
            <img
              src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/10075d79e_28b5079e8_untitled_Gemini_3__Nano_Banana_Pro__2026-07-07_16-11-37.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
          <Link to={`/product/${left.id}`} className="flex-1 relative overflow-hidden">
            <img
              src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/e8897ee86_1.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-6" style={{ zIndex: 30 }}>
              <Link
                to="/collection"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', border: 'none', padding: '14px 40px', textDecoration: 'none', display: 'inline-block', background: 'hsl(var(--primary))', borderRadius: 6 }}
              >
                Shop Now
              </Link>
            </div>
          </Link>
        </div>
      </section>

      {/* Desktop version */}
      <section ref={sectionRef} className="hidden md:block relative w-full" style={{ marginTop: '180px', height: isTablet ? '200vh' : '150vh' }}>
        <div className="absolute inset-0 flex flex-col lg:flex-row">
          <Link to={`/product/${right.id}`} className="flex-1 relative overflow-hidden group">
            <img
              src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/10075d79e_28b5079e8_untitled_Gemini_3__Nano_Banana_Pro__2026-07-07_16-11-37.jpg"
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* Desktop only button */}
            <div className="absolute bottom-10 left-8 hidden lg:block" style={{ pointerEvents: 'auto', zIndex: 30 }}>
              <Link
                to="/collection?category=new"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', border: 'none', padding: '14px 40px', textDecoration: 'none', display: 'inline-block', background: 'hsl(var(--primary))', borderRadius: 6, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                Shop Now
              </Link>
            </div>
          </Link>
          <Link to={`/product/${left.id}`} className="flex-1 relative overflow-hidden group">
            <img
              src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/e8897ee86_1.jpg"
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* Tablet only button */}
            <div className="absolute bottom-10 left-8 block lg:hidden" style={{ pointerEvents: 'auto', zIndex: 30 }}>
              <Link
                to="/collection?category=new"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', border: 'none', padding: '14px 40px', textDecoration: 'none', display: 'inline-block', background: 'hsl(var(--primary))', borderRadius: 6, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                Shop Now
              </Link>
            </div>
          </Link>
        </div>
        <div ref={titleRef} style={{ ...titleStyle, pointerEvents: 'none', width: '100vw', left: 0 }}>
          <h2
            className="uppercase [font-family:'DM_Sans',_sans-serif] font-normal text-white"
            style={{ fontSize: 'calc(13.2vw + 15px)', letterSpacing: '-0.02em', lineHeight: 1, margin: 0, width: '100vw', textAlign: 'center', whiteSpace: 'nowrap', display: 'block' }}>
            NEW ARRIVALS
          </h2>
        </div>
      </section>
    </>
  );

}
