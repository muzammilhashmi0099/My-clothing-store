import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideButtons() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => {
      setVisible(window.scrollY < window.innerHeight * 2);
    };
    handler(); // run on mount
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Only show on homepage
  if (location.pathname !== '/') return null;
  if (!visible) return null;

  const baseStyle = {
    writingMode: 'vertical-rl',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 18,
    paddingRight: 18,
    border: '1px dashed rgba(18,18,18,0.4)',
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(4px)',
    letterSpacing: '0',
    fontSize: 14,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    color: 'rgba(18,18,18,0.65)',
    transition: 'color 0.2s',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const circleSize = 140;

  return null;
}
