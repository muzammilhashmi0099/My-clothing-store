import React from 'react';
import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <p className="technical-text text-obsidian/30 text-xs mb-6">
        <Link to="/" className="hover:text-obsidian transition-colors">HOME</Link>
        {' / '}SHIPPING POLICY
      </p>
      <h1 className="font-heading font-light text-obsidian mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1 }}>
        Shipping<br />Policy
      </h1>
      <p className="technical-text text-obsidian/30 text-xs mb-16">Last updated: August 2035</p>

      <div className="space-y-12 text-obsidian/70 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>

        <section>
          <p>At Edifice, we want your order to reach you as quickly and safely as possible. Please read our Shipping Policy carefully before placing your order.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Order Processing</h2>
          <p>All orders are processed within 1–3 business days (Monday through Friday, excluding public holidays). Orders placed on weekends or public holidays will begin processing on the next business day. You will receive a confirmation email with a tracking number once your order has been dispatched.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Domestic Shipping</h2>
          <ul className="space-y-3 list-none">
            {[
              'Standard Shipping (5–7 business days) — Free on orders over €200',
              'Express Shipping (2–3 business days) — €12',
              'Next Day Delivery (order by 12:00 noon) — €20',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-obsidian/30 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">International Shipping</h2>
          <p className="mb-4">We ship to most countries worldwide. International delivery times and costs vary by destination:</p>
          <ul className="space-y-3 list-none">
            {[
              'Europe — 3–7 business days from €15',
              'North America — 5–10 business days from €20',
              'Rest of World — 7–14 business days from €25',
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-obsidian/30 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">International orders may be subject to customs duties, import taxes, or fees imposed by the destination country. These charges are the responsibility of the customer. Edifice has no control over these charges and cannot predict their amount.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Tracking Your Order</h2>
          <p>Once your order has shipped, you will receive a dispatch confirmation email containing your tracking number and a link to track your parcel. Please allow up to 24 hours for tracking information to update after dispatch.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Delays and Service Interruptions</h2>
          <p>Edifice is not responsible for shipping delays caused by carrier issues, customs clearance, adverse weather, or other circumstances beyond our control. If your order has not arrived within the estimated timeframe, please contact us and we will do our best to investigate.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Lost or Damaged Parcels</h2>
          <p>If your order arrives damaged or is confirmed lost in transit, please contact us within 14 days of the expected delivery date at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a>. We will work with the carrier to resolve the issue and arrange a replacement or refund where applicable.</p>
        </section>

        <section>
          <h2 className="technical-text text-obsidian text-xs mb-4 uppercase tracking-widest">Contact</h2>
          <p>For any shipping-related questions, please reach out to us at <a href="mailto:edifice@support.com" className="underline text-obsidian">edifice@support.com</a>.</p>
        </section>

      </div>
    </div>
  );
}
