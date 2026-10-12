import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/cartContext';
import { ChevronLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = ['Contact', 'Shipping', 'Payment'];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: ''
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleNext = (e) => {
    e.preventDefault();
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    // Final submit
    setSubmitted(true);
    clearCart();
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20">
        <p className="section-heading text-obsidian/30">Your bag is empty</p>
        <Link to="/collection" className="technical-text text-juniper hover:text-obsidian transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 pt-20"
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: '#64CE00' }}>
          <Check size={32} strokeWidth={2} className="text-white" />
        </div>
        <h1 className="section-heading text-obsidian text-center">Order Confirmed</h1>
        <p className="technical-text text-obsidian/50 text-center max-w-sm">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <Link to="/" className="technical-text text-juniper hover:text-obsidian transition-colors mt-4">
          Back to Home
        </Link>
      </motion.div>
    );
  }

  const inputClass = "w-full border border-obsidian/15 px-4 py-3 technical-text text-obsidian text-sm bg-transparent focus:outline-none focus:border-obsidian/40 transition-colors placeholder-obsidian/30";

  return (
    <div className="min-h-screen pt-24 pb-20 px-5 md:px-10">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link to="/collection" className="inline-flex items-center gap-2 technical-text text-obsidian/40 hover:text-obsidian transition-colors mb-10">
          <ChevronLeft size={16} /> Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — form */}
          <div>
            {/* Logo */}
            <Link to="/" className="block mb-10">
              <img
                src="https://media.base44.com/images/public/6a4623baae30bbc2404dae18/c50d9d5ba_logonew.svg"
                alt="edifice"
                className="h-8 w-auto"
              />
            </Link>

            {/* Steps */}
            <div className="flex items-center gap-2 mb-8">
              {STEPS.map((s, i) => (
                <React.Fragment key={s}>
                  <span className={`technical-text text-xs transition-colors ${i === step ? 'text-obsidian' : i < step ? 'text-obsidian/60' : 'text-obsidian/60'}`}>
                    {s}
                  </span>
                  {i < STEPS.length - 1 && <span className="text-obsidian/20 text-xs">/</span>}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleNext}>
              <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>

                {step === 0 && (
                  <div className="space-y-4">
                    <h2 className="font-heading text-xl text-obsidian mb-6">Contact</h2>
                    <input required type="email" placeholder="Email address" value={form.email} onChange={set('email')} className={inputClass} />
                    <div className="grid grid-cols-2 gap-4">
                      <input required placeholder="First name" value={form.firstName} onChange={set('firstName')} className={inputClass} />
                      <input required placeholder="Last name" value={form.lastName} onChange={set('lastName')} className={inputClass} />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-heading text-xl text-obsidian mb-6">Shipping Address</h2>
                    <input required placeholder="Address" value={form.address} onChange={set('address')} className={inputClass} />
                    <div className="grid grid-cols-2 gap-4">
                      <input required placeholder="City" value={form.city} onChange={set('city')} className={inputClass} />
                      <input required placeholder="ZIP / Postal code" value={form.zip} onChange={set('zip')} className={inputClass} />
                    </div>
                    <input required placeholder="Country" value={form.country} onChange={set('country')} className={inputClass} />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="font-heading text-xl text-obsidian mb-6">Payment</h2>
                    <input required placeholder="Cardholder name" value={form.cardName} onChange={set('cardName')} className={inputClass} />
                    <input required placeholder="Card number" maxLength={19} value={form.cardNumber} onChange={set('cardNumber')} className={inputClass} />
                    <div className="grid grid-cols-2 gap-4">
                      <input required placeholder="MM / YY" maxLength={5} value={form.cardExpiry} onChange={set('cardExpiry')} className={inputClass} />
                      <input required placeholder="CVC" maxLength={4} value={form.cardCvc} onChange={set('cardCvc')} className={inputClass} />
                    </div>
                  </div>
                )}

              </motion.div>

              <button
                type="submit"
                className="w-full mt-8 py-4 technical-text text-white transition-colors hover:opacity-90"
                style={{ background: '#121212' }}
              >
                {step < STEPS.length - 1 ? 'Continue' : 'Place Order'}
              </button>

              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)} className="w-full mt-3 technical-text text-obsidian/40 hover:text-obsidian transition-colors py-2 text-center">
                  Back
                </button>
              )}
            </form>
          </div>

          {/* Right — order summary */}
          <div>
            <h2 className="font-heading text-xl text-obsidian mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative">
                    {item.product_image && (
                      <img src={item.product_image} alt={item.product_name} className="w-16 h-20 object-cover" />
                    )}
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-obsidian text-white technical-text text-[10px] flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-obsidian truncate">{item.product_name}</p>
                    <p className="technical-text text-obsidian/50 text-xs mt-0.5">{item.size}{item.color ? ` / ${item.color}` : ''}</p>
                  </div>
                  <p className="technical-text text-obsidian text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="hairline-h mb-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="technical-text text-obsidian/50 text-sm">Subtotal</p>
                <p className="technical-text text-obsidian text-sm">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="technical-text text-obsidian/50 text-sm">Shipping</p>
                <p className="technical-text text-obsidian/50 text-sm">{totalPrice >= 200 ? 'Free' : '$12.00'}</p>
              </div>
            </div>

            <div className="hairline-h my-4" />

            <div className="flex justify-between">
              <p className="technical-text text-obsidian font-medium">Total</p>
              <p className="technical-text text-obsidian text-lg">
                ${(totalPrice >= 200 ? totalPrice : totalPrice + 12).toFixed(2)}
              </p>
            </div>

            {totalPrice < 200 && (
              <p className="technical-text text-obsidian/40 text-xs mt-2">
                Add ${(200 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
