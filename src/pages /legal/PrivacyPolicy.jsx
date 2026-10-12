import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <p className="technical-text text-obsidian/30 text-xs mb-6">
        <Link to="/" className="hover:text-obsidian transition-colors">HOME</Link>
        {' / '}PRIVACY POLICY
      </p>
      <h1 className="font-heading font-light text-obsidian mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
        Privacy<br />Policy
      </h1>
      <p className="technical-text text-obsidian/30 text-xs mb-16">Last updated: August 2035</p>

      <div className="space-y-12 text-obsidian/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>

        <section>
          <p>Edifice ("we", "us", or "our") operates the edifice website and online store. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. Please read it carefully. By using our site, you agree to the terms described here.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us, including:</p>
          <ul className="space-y-2 list-none">
            {[
              'Name, email address, billing and shipping address',
              'Payment information (processed securely — we do not store card details)',
              'Phone number (optional, for delivery updates)',
              'Account credentials if you create an account',
              'Communications you send us, including support requests',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-obsidian/30 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">We also collect certain information automatically when you visit our site, such as your IP address, browser type, referring URLs, pages viewed, and device identifiers, through cookies and similar tracking technologies.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">How We Use Your Information</h2>
          <ul className="space-y-2 list-none">
            {[
              'To process and fulfill your orders, including sending confirmation and tracking emails',
              'To communicate with you about your account or purchases',
              'To send marketing communications, if you have opted in',
              'To improve our website, products, and services',
              'To prevent fraudulent transactions and protect against criminal activity',
              'To comply with legal obligations',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-obsidian/30 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Sharing Your Information</h2>
          <p>We do not sell your personal data. We may share your information with trusted third parties solely to operate our business, including:</p>
          <ul className="space-y-2 list-none mt-4">
            {[
              'Payment processors (e.g. Stripe) to handle transactions securely',
              'Shipping and logistics partners to deliver your orders',
              'Email service providers to send transactional and marketing emails',
              'Analytics providers to understand how our site is used',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-obsidian/30 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">All third parties are contractually obligated to keep your information confidential and use it only for the purposes for which it was shared.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Cookies</h2>
          <p>We use cookies to maintain your session, remember your cart, and understand how visitors use our site. You can disable cookies in your browser settings, but some features of the site may not function correctly as a result.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Data Retention</h2>
          <p>We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Order records are typically retained for seven years.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Your Rights</h2>
          <p>Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data. You may also have the right to data portability and to withdraw consent at any time where processing is based on consent. To exercise any of these rights, contact us at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a>.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Security</h2>
          <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our site after changes constitutes your acceptance of the revised policy.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Contact</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a>.</p>
        </section>

      </div>
    </div>
  );
}
