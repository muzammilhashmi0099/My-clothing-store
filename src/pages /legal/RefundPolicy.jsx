import React from 'react';
import { Link } from 'react-router-dom';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <p className="technical-text text-obsidian/30 text-xs mb-6">
        <Link to="/" className="hover:text-obsidian transition-colors">HOME</Link>
        {' / '}REFUND POLICY
      </p>
      <h1 className="font-heading font-light text-obsidian mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
        Refund<br />Policy
      </h1>
      <p className="technical-text text-obsidian/30 text-xs mb-16">Last updated: August 2035</p>

      <div className="space-y-12 text-obsidian/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>

        <section>
          <p>We want you to love your Edifice purchase. If something isn't right, we're here to help. Please read our policy carefully before initiating a return or refund request.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Returns</h2>
          <p>We accept returns on full-priced items within 30 days of delivery, provided the items are:</p>
          <ul className="space-y-2 list-none mt-4">
            {[
              'Unworn and unwashed',
              'In their original condition with all tags still attached',
              'In their original packaging where possible',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-obsidian/30 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">Items marked as "Final Sale" are not eligible for return or exchange. Underwear, socks, and pierced jewellery (if applicable) cannot be returned for hygiene reasons.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">How to Initiate a Return</h2>
          <p>To start a return, email us at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a> with your order number and reason for return. We will respond within 2 business days with instructions and a returns authorisation. Returns sent without prior authorisation may not be accepted.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Return Shipping</h2>
          <p>Return shipping costs are the responsibility of the customer, unless the item is faulty or was sent in error. We recommend using a tracked shipping service, as Edifice cannot be held responsible for items lost in return transit. Original shipping costs are non-refundable.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Refunds</h2>
          <p>Once we receive and inspect your return, we will notify you by email. If approved, your refund will be processed to your original payment method within 5–10 business days. Processing times may vary depending on your bank or card provider.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Exchanges</h2>
          <p>We offer size and colour exchanges subject to stock availability. To request an exchange, please contact us at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a> before returning your item. If your preferred size or colour is unavailable, we will issue a full refund instead.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Faulty or Incorrect Items</h2>
          <p>If you have received a faulty, damaged, or incorrect item, please contact us within 7 days of delivery at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a> with your order number and photos of the issue. We will arrange a free return and either a replacement or a full refund at your preference.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Payment Methods</h2>
          <p>Edifice accepts payment via Visa, Mastercard, American Express, and other major debit and credit cards. Refunds are returned to the original payment method used at checkout.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Contact</h2>
          <p>For any questions about returns or refunds, please contact our team at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a>.</p>
        </section>

      </div>
    </div>
  );
}
