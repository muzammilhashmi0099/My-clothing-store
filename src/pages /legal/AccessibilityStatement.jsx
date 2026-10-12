import React from 'react';
import { Link } from 'react-router-dom';

export default function AccessibilityStatement() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <p className="technical-text text-obsidian/30 text-xs mb-6">
        <Link to="/" className="hover:text-obsidian transition-colors">HOME</Link>
        {' / '}ACCESSIBILITY STATEMENT
      </p>
      <h1 className="font-heading font-light text-obsidian mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
        Accessibility<br />Statement
      </h1>
      <p className="technical-text text-obsidian/30 text-xs mb-16">Last updated: August 2035</p>

      <div className="space-y-12 text-obsidian/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>

        <section>
          <p>Edifice is committed to ensuring that our website is accessible to everyone, including people with disabilities. We are continually working to improve the user experience and apply relevant accessibility standards.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Our Commitment</h2>
          <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible to people with disabilities. Conformance with these guidelines helps make the web more user-friendly for all people.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Measures Taken</h2>
          <p className="mb-4">As part of our ongoing accessibility efforts, we have:</p>
          <ul className="space-y-2 list-none">
            {[
              'Set the language of the site to ensure correct interpretation by assistive technologies',
              'Defined clear and consistent heading structures across all pages',
              'Added descriptive alternative text to meaningful images',
              'Ensured sufficient colour contrast between text and backgrounds',
              'Designed all interactive elements to be keyboard accessible',
              'Avoided reliance on motion or animation as the sole means of conveying information',
              'Ensured form fields are labelled clearly and include error descriptions',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-obsidian/30 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Known Limitations</h2>
          <p>While we strive to ensure full accessibility, some third-party content embedded on our site (such as payment processing widgets or social media embeds) may not fully conform to WCAG 2.1 Level AA. We are working with our vendors to address these where possible.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Feedback and Assistance</h2>
          <p>We welcome feedback on the accessibility of the Edifice website. If you experience any barriers, or if you require content in an alternative format, please contact us:</p>
          <div className="space-y-2 mt-4">
            <p>Email: <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a></p>
            <p>We aim to respond to accessibility-related requests within 3 business days.</p>
          </div>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Continuous Improvement</h2>
          <p>Edifice is actively working to increase the accessibility and usability of our website. As we update and improve our site, we will continue to evaluate and address accessibility issues in accordance with best practices and evolving standards.</p>
        </section>

      </div>
    </div>
  );
}
