import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'New In', to: '/collection?category=new' },
  { label: 'Woman', to: '/collection?category=women' },
  { label: 'Man', to: '/collection?category=men' },
  { label: 'Shop All', to: '/collection' },
  { label: 'Support', to: '/support' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'TikTok', href: 'https://www.tiktok.com' },
  { label: 'Pinterest', href: 'https://www.pinterest.com' },
];

const LEGAL_LINKS = [
  { label: 'Accessibility Statement', to: '/accessibility' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Shipping Policy', to: '/shipping-policy' },
  { label: 'Refund Policy', to: '/refund-policy' },
];

const mono = { fontFamily: 'var(--font-mono)' };
const linkStyle = {
  ...mono,
  fontSize: 14,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ffffff',
  textDecoration: 'none',
  display: 'block',
  marginBottom: 14,
  transition: 'opacity 0.2s',
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await base44.entities.NewsletterSubscriber.create({ email });
      toast({ title: 'Welcome to edifice', description: 'Enjoy 15% off your first order. Code: edifice15' });
      setEmail('');
    } catch {
      toast({ title: 'Already subscribed', description: 'This email is already in our list.' });
    }
    setSubmitting(false);
  };

  return (
    <footer style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>

      {/* Top section grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-16 px-7 md:px-10 md:pl-20 pt-10 md:pt-16 pb-0 border-b border-white/[0.08]">

        {/* Newsletter — full width on mobile */}
        <div className="col-span-2 md:col-span-1 pb-4 md:pb-16">
          <p style={{ ...mono, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ffffff', marginBottom: 16 }}>
            Join the edifice
          </p>
          <p style={{ ...mono, fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 24, letterSpacing: '0.02em' }}>
            Exclusive drops, styling notes & early access. By signing up, you agree to our Privacy Policy.
          </p>
          <form onSubmit={handleNewsletter} style={{ display: 'flex', alignItems: 'center', borderBottom: '0.5px solid rgba(255,255,255,0.3)', paddingBottom: 8 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              required
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                ...mono,
                fontSize: 14,
                letterSpacing: '0.1em',
                padding: '4px 0',
              }}
            />
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                padding: 0,
              }}
            >
              <ArrowRight size={16} color="#ffffff" />
            </button>
          </form>
        </div>

        {/* Menu column */}
        <div className="pb-10 md:pb-16">
          <p style={{ ...mono, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Menu</p>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Official column */}
        <div className="pb-10 md:pb-16">
          <p style={{ ...mono, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Official</p>
          {LEGAL_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Social column */}
        <div className="pb-10 md:pb-16">
          <p style={{ ...mono, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Social Media</p>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Big logo */}
      <div className="px-7 md:px-10 pt-10 overflow-hidden">
        <Link to="/">
          <img
            src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/c50d9d5ba_logonew.svg"
            alt=""
            style={{ width: '100%', height: 'auto', maxHeight: 180, objectFit: 'contain', objectPosition: 'left bottom', filter: 'invert(1) brightness(10)', opacity: 1 }}
          />
        </Link>
      </div>

      {/* Copyright */}
      <div className="px-7 md:px-10 py-5">
        <p style={{ ...mono, fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff', margin: 0 }}>
          © 2035 edifice. Built on Base44.
        </p>
      </div>
    </footer>
  );
}
