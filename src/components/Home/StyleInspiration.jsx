import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_IMAGES = [
"https://media.base44.com/images/public/6a4623baae30bbc2404dae18/4d7fb9bac_7c9016d6d_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-09_12-12-48.jpg",
"https://media.base44.com/images/public/6a4623baae30bbc2404dae18/0b88dc2cd_c6ef084a7_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-08_16-17-32.jpg",
"https://media.base44.com/images/public/6a4623baae30bbc2404dae18/f826911d0_b20bc83e6_untitled_Gemini-3-_Nano-Banana-Pro__2026-07-08_08-20-10.jpg",
"https://media.base44.com/images/public/6a4623baae30bbc2404dae18/fd9f9c3ee_fd8f5f9fa_12.jpg"];



export default function StyleInspiration() {
  const scrollRef = useRef(null);
  const [outlined, setOutlined] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setOutlined(true);
      setTimeout(() => setOutlined(false), 800);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 500, behavior: 'smooth' });
  };

  return (
    <section className="" style={{ paddingTop: '10px' }}>
      <div className="w-full flex flex-col" style={{ background: '#FFFFFF' }}>

        {/* Title */}
        <div className="w-full flex items-center justify-center pt-10 pb-6" style={{ overflow: 'hidden' }}>
          <h2
            className="uppercase [font-family:'DM_Sans',_sans-serif] font-normal text-[hsl(var(--primary))]"
            style={{ fontSize: window.innerWidth < 768 ? 'clamp(1.3rem, 6.5vw, 2rem)' : '4.95vw', letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0, padding: window.innerWidth < 768 ? '0 16px' : '0 5px', textAlign: window.innerWidth < 768 ? 'left' : 'center', whiteSpace: window.innerWidth < 768 ? 'normal' : 'nowrap', display: 'block', width: '100%' }}>
            FOLLOW US AND GET INSPIRED{' '}
            <a
              href="https://www.instagram.com/base44.app?igsh=enRkMXg1amlub2x4"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: isMobile && outlined ? 'white' : 'inherit',
                WebkitTextStroke: isMobile && outlined ? '1px black' : '',
                textDecoration: 'none',
                transition: 'color 0.3s, -webkit-text-stroke 0.3s',
              }}
              onMouseEnter={(e) => { if (window.innerWidth >= 1024) { e.currentTarget.style.color = 'white'; e.currentTarget.style.webkitTextStroke = '1px black'; }}}
              onMouseLeave={(e) => { if (window.innerWidth >= 1024) { e.currentTarget.style.color = ''; e.currentTarget.style.webkitTextStroke = ''; }}}>
              @EDIFICE</a>
          </h2>
        </div>

        {/* Gallery */}
        <div className="relative overflow-hidden">
          {/* Prev / Next arrows */}
          <button
            onClick={() => scroll(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black hover:bg-black/80 transition-colors"
            style={{ border: 'none' }}>
            <ChevronLeft size={18} color="white" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black hover:bg-black/80 transition-colors"
            style={{ border: 'none' }}>
            <ChevronRight size={18} color="white" />
          </button>

          {/* Scrollable strip */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', gap: 0 }}>
            {GALLERY_IMAGES.map((src, i) =>
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                width: window.innerWidth < 768 ? '100vw' : 'clamp(280px, 85vw, 600px)',
                height: window.innerWidth < 768 ? '100vw' : 'clamp(280px, 85vw, 600px)',
                flexShrink: 0,
              }}>
                  <img src={src}
                alt={`inspiration ${i + 1}`}
                className="w-full h-full object-cover object-top"
                draggable={false} />
              
              </div>
            )}
          </div>
        </div>

      </div>
    </section>);

}
