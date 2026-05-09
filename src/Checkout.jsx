import React, { useState } from 'react';
import { supabase } from './supabase.js';
import { useCart } from './CartContext.jsx';

const PRODUCTS = [
  { name: 'Millet Crunch Mix',  tagline: 'Healthy tea-time snack with the perfect crunch.',         price: 249, unit: '200g',       img: '/assets/images/crunch-mix.jpg' },
  { name: 'Millet Energy Bar',  tagline: 'Slow-roasted millets, almonds & cocoa for clean fuel.',   price: 299, unit: 'Pack of 6',  img: '/assets/images/energy-bar.jpg' },
  { name: 'Millet Laddu',       tagline: 'Heritage recipe, slow-rolled with seven millets.',         price: 349, unit: '12 pcs',     img: '/assets/images/laddu.jpg'      },
  { name: 'Millet Cookies',     tagline: 'Baked, never fried — choco-chip joy.',                     price: 199, unit: '150g',       img: '/assets/images/cookies.jpg'    },
  { name: 'Ragi Crisps',        tagline: 'Light, crispy ragi rounds with curry leaves & spice.',     price: 179, unit: '100g',       img: '/assets/images/crisps.jpg'     },
];

function mkOrderNum() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `MF-${d}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

function MiniNav() {
  return (
    <header className="co-header">
      <div className="co-header-inner">
        <a href="#" className="brand" style={{ textDecoration: 'none', color: 'var(--brown-900)' }}>
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-name">MILLET FAM</div>
            <div className="brand-sub">A Healthy Lifestyle</div>
          </div>
        </a>
        <a href="#" className="co-back">← Back to Shop</a>
      </div>
    </header>
  );
}

export default function Checkout() {
  const { cart, add, sub, clear } = useCart();
  const [form, setForm]   = useState({ customer_name:'', email:'', phone:'', address:'', city:'', state:'', pincode:'', payment_method:'cod', payment_note:'' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [success, setSuccess] = useState(null);

  const field = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const items   = PRODUCTS.map((p, i) => ({ ...p, qty: cart[i] || 0 })).filter(p => p.qty > 0);
  const subtotal    = items.reduce((s, p) => s + p.price * p.qty, 0);
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const grandTotal  = subtotal + deliveryFee;

  const submit = async e => {
    e.preventDefault();
    if (!items.length) { setError('Please add at least one product.'); return; }
    setLoading(true); setError(null);
    const orderNumber = mkOrderNum();
    const { error: err } = await supabase.rpc('submit_order', {
      p_order_number:   orderNumber,
      p_customer_name:  form.customer_name,
      p_email:          form.email,
      p_phone:          form.phone,
      p_address:        form.address,
      p_city:           form.city,
      p_state:          form.state,
      p_pincode:        form.pincode,
      p_items:          items.map(p => ({ name: p.name, price: p.price, qty: p.qty, unit: p.unit })),
      p_subtotal:       subtotal,
      p_delivery_fee:   deliveryFee,
      p_grand_total:    grandTotal,
      p_payment_method: form.payment_method,
      p_payment_note:   form.payment_note || null,
    });
    setLoading(false);
    if (err) setError('Could not place order. Please try again.');
    else { clear(); setSuccess(orderNumber); }
  };

  if (success) return (
    <div className="co-page">
      <div className="page-bg" />
      <MiniNav />
      <div className="co-success">
        <div className="co-success-check">✓</div>
        <h2 className="heading-condensed">Order <span className="accent">Placed!</span></h2>
        <p>Thank you! We'll contact you shortly to confirm delivery.</p>
        <div className="co-success-num"># {success}</div>
        <a href="#" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>← Back to Shop</a>
      </div>
    </div>
  );

  return (
    <div className="co-page">
      <div className="page-bg" />
      <MiniNav />

      <main className="co-main shell">
        <div className="co-title-row">
          <div className="section-eyebrow">Fast &amp; Easy</div>
          <h1 className="heading-condensed co-h1">Checkout <span className="accent">Your Order</span></h1>
        </div>

        <div className="co-grid">
          {/* ── LEFT ── */}
          <div className="co-left">
            {/* Product Picker */}
            <div className="co-card">
              <h2 className="co-card-title">Select Products</h2>
              <div className="co-products">
                {PRODUCTS.map((p, i) => (
                  <div key={i} className="co-product-row">
                    <img src={p.img} alt={p.name} className="co-product-img" />
                    <div className="co-product-info">
                      <div className="co-product-name">{p.name}</div>
                      <div className="co-product-meta">₹{p.price} &middot; {p.unit}</div>
                    </div>
                    <div className="co-qty">
                      <button type="button" className="co-qty-btn" onClick={() => sub(i)}>−</button>
                      <span className="co-qty-num">{cart[i] || 0}</span>
                      <button type="button" className="co-qty-btn" onClick={() => add(i)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            {items.length > 0 && (
              <div className="co-card co-summary-card">
                <h2 className="co-card-title">Order Summary</h2>
                {items.map((p, i) => (
                  <div key={i} className="co-sum-row">
                    <span>{p.name} × {p.qty}</span>
                    <span>₹{p.price * p.qty}</span>
                  </div>
                ))}
                <div className="co-sum-divider" />
                <div className="co-sum-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="co-sum-row"><span>Delivery</span><span>₹{deliveryFee}</span></div>
                <div className="co-sum-row co-sum-total"><span>Grand Total</span><span>₹{grandTotal}</span></div>
              </div>
            )}
          </div>

          {/* ── RIGHT ── */}
          <div className="co-right">
            <div className="co-card">
              <h2 className="co-card-title">Delivery Details</h2>
              <form onSubmit={submit} className="co-form">
                <div className="co-field">
                  <label>Full Name *</label>
                  <input name="customer_name" value={form.customer_name} onChange={field} required placeholder="Your full name" />
                </div>

                <div className="co-row-2">
                  <div className="co-field">
                    <label>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={field} required placeholder="you@email.com" />
                  </div>
                  <div className="co-field">
                    <label>Phone *</label>
                    <input name="phone" type="tel" value={form.phone} onChange={field} required placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="co-field">
                  <label>Address *</label>
                  <input name="address" value={form.address} onChange={field} required placeholder="House / Flat / Street / Area" />
                </div>

                <div className="co-row-3">
                  <div className="co-field">
                    <label>City *</label>
                    <input name="city" value={form.city} onChange={field} required placeholder="City" />
                  </div>
                  <div className="co-field">
                    <label>State *</label>
                    <input name="state" value={form.state} onChange={field} required placeholder="State" />
                  </div>
                  <div className="co-field">
                    <label>Pincode *</label>
                    <input name="pincode" value={form.pincode} onChange={field} required placeholder="560001" maxLength={6} />
                  </div>
                </div>

                <div className="co-field">
                  <label>Payment Method</label>
                  <div className="co-pay-opts">
                    {[['cod','💵  Cash on Delivery'],['upi','📱  UPI / Online']].map(([v,l]) => (
                      <label key={v} className={`co-pay-opt ${form.payment_method === v ? 'active' : ''}`}>
                        <input type="radio" name="payment_method" value={v} checked={form.payment_method===v} onChange={field} />
                        {l}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="co-field">
                  <label>Notes <span style={{fontWeight:400,textTransform:'none',letterSpacing:0}}>(optional)</span></label>
                  <textarea name="payment_note" value={form.payment_note} onChange={field} rows={3} placeholder="Any special instructions for delivery…" />
                </div>

                {error && <div className="co-error">{error}</div>}

                {items.length === 0 && (
                  <div className="co-hint">← Select products on the left to continue</div>
                )}

                <button type="submit" className="btn-primary co-submit-btn" disabled={loading || items.length === 0}>
                  {loading ? 'Placing Order…' : grandTotal > 0 ? `Place Order · ₹${grandTotal}` : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
