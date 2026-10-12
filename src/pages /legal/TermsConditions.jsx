import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <p className="technical-text text-obsidian/30 text-xs mb-6">
        <Link to="/" className="hover:text-obsidian transition-colors">HOME</Link>
        {' / '}TERMS & CONDITIONS
      </p>
      <h1 className="font-heading font-light text-obsidian mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
        Terms &<br />Conditions
      </h1>
      <p className="technical-text text-obsidian/30 text-xs mb-16">Last updated: August 2035</p>

      <div className="space-y-12 text-obsidian/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>

        <section>
          <p>Welcome to Edifice. By accessing or purchasing from our website, you agree to be bound by the following Terms and Conditions. Please read them carefully before placing an order.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">1. General</h2>
          <p>These Terms and Conditions govern your use of the Edifice website and the purchase of products from our online store. Edifice reserves the right to update or modify these terms at any time without prior notice. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">2. Eligibility</h2>
          <p>You must be at least 18 years of age to make a purchase on our site. By placing an order, you confirm that you meet this requirement. Edifice reserves the right to refuse service to anyone at its sole discretion.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">3. Products and Pricing</h2>
          <p>All product descriptions, images, and prices are accurate to the best of our knowledge. We reserve the right to correct any errors and to change prices without notice. Prices displayed are in the currency shown at checkout and are inclusive of applicable taxes unless stated otherwise. Edifice reserves the right to limit quantities purchased per customer.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">4. Orders and Payment</h2>
          <p>When you place an order, you are making an offer to purchase the selected items. Edifice reserves the right to accept or decline your order at any time. You will receive an order confirmation email once payment is processed. We accept major credit and debit cards as well as other payment methods shown at checkout. All payments are processed securely.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">5. Shipping and Delivery</h2>
          <p>Orders are subject to our Shipping Policy, which is incorporated into these Terms by reference. Edifice is not responsible for delays caused by carriers, customs, or circumstances outside our control. Risk of loss and title for products pass to you upon delivery to the carrier.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">6. Returns and Refunds</h2>
          <p>Returns and refunds are governed by our Refund Policy, which is incorporated into these Terms by reference. Items must be returned in their original, unworn condition with all tags attached.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">7. Intellectual Property</h2>
          <p>All content on the Edifice website — including images, text, logos, graphics, and product designs — is the intellectual property of Edifice and is protected by copyright and applicable intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Edifice shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our site or products. Our total liability to you shall not exceed the amount you paid for the relevant order.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">9. Governing Law</h2>
          <p>These Terms and Conditions are governed by and construed in accordance with applicable law. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the relevant courts.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">10. Contact</h2>
          <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a>.</p>
        </section>

      </div>
    </div>
  );
}
