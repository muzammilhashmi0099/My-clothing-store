import React, { useState, useEffect } from 'react';
import { Truck, RotateCcw, Ruler, Mail, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'shipping', icon: Truck, label: 'Shipping' },
  { id: 'returns', icon: RotateCcw, label: 'Returns' },
  { id: 'sizing', icon: Ruler, label: 'Size Guide' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export default function Support() {
  const [activeSection, setActiveSection] = useState('shipping');

  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash && sections.find(s => s.id === hash)) {
      setActiveSection(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="pt-20 md:pt-24">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="technical-text text-obsidian/40 mb-3">Help Center</p>
          <h1 className="section-heading text-obsidian">How Can We Help?</h1>
        </motion.div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex gap-1 py-4 overflow-x-auto">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`technical-text text-xs px-5 py-2.5 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeSection === sec.id
                  ? 'bg-juniper text-bone'
                  : 'text-obsidian/50 hover:text-obsidian hover:bg-obsidian/5'
              }`}
            >
              <sec.icon size={14} strokeWidth={1.5} />
              {sec.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pb-20">
        {/* Shipping */}
        <section id="shipping" className="py-12 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-light text-obsidian mb-8">Shipping & Delivery</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="border border-obsidian/10 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Truck size={18} strokeWidth={1.5} className="text-juniper" />
                  <h3 className="text-sm font-medium text-obsidian">Standard Shipping</h3>
                </div>
                <p className="text-sm text-obsidian/60 mb-2">5–7 business days</p>
                <p className="technical-text text-obsidian">Free on orders over $150</p>
                <p className="technical-text text-obsidian/40 mt-1">$8.00 for orders under $150</p>
              </div>
              <div className="border border-obsidian/10 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={18} strokeWidth={1.5} className="text-juniper" />
                  <h3 className="text-sm font-medium text-obsidian">Express Shipping</h3>
                </div>
                <p className="text-sm text-obsidian/60 mb-2">2–3 business days</p>
                <p className="technical-text text-obsidian">$15.00</p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-obsidian/60 leading-relaxed">
              <p>We ship worldwide from our European distribution center. All orders are carefully packed in our signature recycled packaging to ensure your garments arrive in perfect condition.</p>
              <p>Tracking information is emailed within 24 hours of dispatch. For international orders, please allow additional time for customs processing.</p>
              <p>Orders placed before 2:00 PM CET on business days are dispatched the same day.</p>
            </div>
          </div>
        </section>

        {/* Returns */}
        <section id="returns" className="py-12 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-light text-obsidian mb-8">Returns & Exchanges</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4 text-sm text-obsidian/60 leading-relaxed">
              <p>We want you to love your edifice pieces. If something doesn't feel right, we offer hassle-free returns within <strong className="text-obsidian">30 days</strong> of delivery.</p>
              <h4 className="text-obsidian font-medium pt-2">How to Return</h4>
              <ol className="list-decimal pl-4 space-y-2">
                <li>Email us at <a href="mailto:returns@edifice.com" className="text-juniper hover:text-obsidian transition-colors">returns@edifice.com</a> with your order number</li>
                <li>Receive a prepaid shipping label within 24 hours</li>
                <li>Pack items in original packaging (or any secure box)</li>
                <li>Drop off at your nearest postal service</li>
              </ol>
              <p>Refunds are processed within 5–7 business days after we receive your return.</p>
            </div>
            <div className="space-y-4">
              <div className="border border-obsidian/10 p-6">
                <h4 className="text-sm font-medium text-obsidian mb-3">Return Policy</h4>
                <ul className="space-y-2 text-sm text-obsidian/60">
                  <li className="flex items-start gap-2"><span className="text-juniper mt-0.5">•</span> Items must be unworn with tags attached</li>
                  <li className="flex items-start gap-2"><span className="text-juniper mt-0.5">•</span> Sale items are eligible for exchange only</li>
                  <li className="flex items-start gap-2"><span className="text-juniper mt-0.5">•</span> Undergarments and swimwear are final sale</li>
                  <li className="flex items-start gap-2"><span className="text-juniper mt-0.5">•</span> Free returns within the EU</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sizing */}
        <section id="sizing" className="py-12 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-light text-obsidian mb-8">Size Guide</h2>
          <div className="overflow-x-auto">
            <div className="mb-8">
              <p className="technical-text text-obsidian/40 text-xs mb-4">Women's Sizing (cm)</p>
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="technical-text text-obsidian/50 border-b border-obsidian/10">
                    <th className="text-left py-3 pr-6">Size</th>
                    <th className="text-left py-3 pr-6">US</th>
                    <th className="text-left py-3 pr-6">EU</th>
                    <th className="text-left py-3 pr-6">Bust</th>
                    <th className="text-left py-3 pr-6">Waist</th>
                    <th className="text-left py-3">Hip</th>
                  </tr>
                </thead>
                <tbody className="text-obsidian/70">
                  <tr className="border-b border-obsidian/5"><td className="py-3 pr-6 font-medium">XS</td><td className="py-3 pr-6">0-2</td><td className="py-3 pr-6">32-34</td><td className="py-3 pr-6">80-84</td><td className="py-3 pr-6">60-64</td><td className="py-3">86-90</td></tr>
                  <tr className="border-b border-obsidian/5"><td className="py-3 pr-6 font-medium">S</td><td className="py-3 pr-6">4-6</td><td className="py-3 pr-6">36-38</td><td className="py-3 pr-6">84-88</td><td className="py-3 pr-6">64-68</td><td className="py-3">90-94</td></tr>
                  <tr className="border-b border-obsidian/5"><td className="py-3 pr-6 font-medium">M</td><td className="py-3 pr-6">8-10</td><td className="py-3 pr-6">40-42</td><td className="py-3 pr-6">88-92</td><td className="py-3 pr-6">68-72</td><td className="py-3">94-98</td></tr>
                  <tr className="border-b border-obsidian/5"><td className="py-3 pr-6 font-medium">L</td><td className="py-3 pr-6">12-14</td><td className="py-3 pr-6">44-46</td><td className="py-3 pr-6">96-100</td><td className="py-3 pr-6">76-80</td><td className="py-3">102-106</td></tr>
                  <tr><td className="py-3 pr-6 font-medium">XL</td><td className="py-3 pr-6">16-18</td><td className="py-3 pr-6">48-50</td><td className="py-3 pr-6">104-108</td><td className="py-3 pr-6">84-88</td><td className="py-3">110-114</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <p className="technical-text text-obsidian/40 text-xs mb-4">Men's Sizing (cm)</p>
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="technical-text text-obsidian/50 border-b border-obsidian/10">
                    <th className="text-left py-3 pr-6">Size</th>
                    <th className="text-left py-3 pr-6">US</th>
                    <th className="text-left py-3 pr-6">EU</th>
                    <th className="text-left py-3 pr-6">Chest</th>
                    <th className="text-left py-3 pr-6">Waist</th>
                    <th className="text-left py-3">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="text-obsidian/70">
                  <tr className="border-b border-obsidian/5"><td className="py-3 pr-6 font-medium">S</td><td className="py-3 pr-6">36-38</td><td className="py-3 pr-6">46-48</td><td className="py-3 pr-6">88-92</td><td className="py-3 pr-6">72-76</td><td className="py-3">43-44</td></tr>
                  <tr className="border-b border-obsidian/5"><td className="py-3 pr-6 font-medium">M</td><td className="py-3 pr-6">40-42</td><td className="py-3 pr-6">50-52</td><td className="py-3 pr-6">96-100</td><td className="py-3 pr-6">80-84</td><td className="py-3">45-46</td></tr>
                  <tr className="border-b border-obsidian/5"><td className="py-3 pr-6 font-medium">L</td><td className="py-3 pr-6">44-46</td><td className="py-3 pr-6">54-56</td><td className="py-3 pr-6">104-108</td><td className="py-3 pr-6">88-92</td><td className="py-3">47-48</td></tr>
                  <tr><td className="py-3 pr-6 font-medium">XL</td><td className="py-3 pr-6">48-50</td><td className="py-3 pr-6">58-60</td><td className="py-3 pr-6">112-116</td><td className="py-3 pr-6">96-100</td><td className="py-3">49-50</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 border border-obsidian/10 p-6 max-w-lg">
            <h4 className="text-sm font-medium text-obsidian mb-2">How to Measure</h4>
            <ul className="space-y-2 text-sm text-obsidian/60">
              <li><strong>Chest/Bust:</strong> Measure around the fullest part of your chest</li>
              <li><strong>Waist:</strong> Measure around the narrowest part of your natural waist</li>
              <li><strong>Hips:</strong> Measure around the fullest part of your hips</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-light text-obsidian mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={18} strokeWidth={1.5} className="text-juniper mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-obsidian">Email</p>
                  <a href="mailto:hello@edifice.com" className="text-sm text-juniper hover:text-obsidian transition-colors">hello@edifice.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={18} strokeWidth={1.5} className="text-juniper mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-obsidian">Phone</p>
                  <a href="tel:+18001234567" className="text-sm text-juniper hover:text-obsidian transition-colors">+1 (800) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={18} strokeWidth={1.5} className="text-juniper mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-obsidian">Hours</p>
                  <p className="text-sm text-obsidian/60">Mon–Fri: 9:00 – 18:00 CET</p>
                  <p className="text-sm text-obsidian/60">Sat: 10:00 – 14:00 CET</p>
                </div>
              </div>
            </div>
            <div>
              {submitted ? (
                <div className="border border-juniper/30 bg-juniper/5 p-8 text-center">
                  <p className="font-heading text-2xl text-obsidian mb-2">Message Sent</p>
                  <p className="text-sm text-obsidian/60">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={contactForm.name}
                      onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                      required
                      className="bg-transparent border-b border-obsidian/20 py-3 text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-juniper transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                      required
                      className="bg-transparent border-b border-obsidian/20 py-3 text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-juniper transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))}
                    required
                    className="w-full bg-transparent border-b border-obsidian/20 py-3 text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-juniper transition-colors"
                  />
                  <textarea
                    placeholder="Message"
                    value={contactForm.message}
                    onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-obsidian/20 py-3 text-sm text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-juniper transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="technical-text bg-juniper text-bone px-8 py-3 hover:bg-juniper/90 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
