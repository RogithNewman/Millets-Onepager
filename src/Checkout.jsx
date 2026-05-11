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
    else {
      setSuccess({
        orderNumber,
        customerName: form.customer_name,
        email: form.email,
        phone: form.phone,
        address: `${form.address}, ${form.city}, ${form.state} – ${form.pincode}`,
        paymentMethod: form.payment_method === 'cod' ? 'Cash on Delivery' : 'UPI / Online',
        items: [...items],
        subtotal,
        deliveryFee,
        grandTotal,
        date: new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }),
      });
      clear();
    }
  };

  const downloadReceipt = () => {
    if (!success) return;
    const o = success;
    const itemsHtml = o.items.map(p =>
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #ede0c6;">${p.name}</td>
           <td style="padding:8px 12px;border-bottom:1px solid #ede0c6;text-align:center;">${p.qty}</td>
           <td style="padding:8px 12px;border-bottom:1px solid #ede0c6;text-align:right;">₹${p.price * p.qty}</td></tr>`
    ).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Receipt - ${o.orderNumber}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#f5e7c8;padding:40px;color:#3a2418}
  .receipt{max-width:600px;margin:0 auto;background:#fff;border-radius:20px;padding:48px 40px;box-shadow:0 8px 30px rgba(60,30,12,0.15)}
  .header{text-align:center;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #e9d5ad}
  .logo{font-family:'Trebuchet MS',sans-serif;font-size:28px;font-weight:800;color:#2a1810;letter-spacing:0.06em}
  .sub{font-size:11px;letter-spacing:0.2em;color:#a07a52;text-transform:uppercase;margin-top:4px}
  .tag{display:inline-block;margin-top:12px;background:#2a1810;color:#faf0d8;padding:6px 16px;border-radius:999px;font-size:12px;font-weight:600}
  .info{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:28px}
  .info-block label{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a07a52;font-weight:600}
  .info-block p{margin-top:4px;font-size:14px;color:#2a1810;font-weight:500}
  table{width:100%;border-collapse:collapse;margin-bottom:20px}
  th{text-align:left;padding:10px 12px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a07a52;border-bottom:2px solid #e9d5ad}
  th:last-child{text-align:right}th:nth-child(2){text-align:center}
  .totals{border-top:2px solid #e9d5ad;padding-top:16px}
  .totals .row{display:flex;justify-content:space-between;padding:6px 12px;font-size:14px;color:#6b432a}
  .totals .grand{font-size:20px;font-weight:800;color:#2a1810;padding-top:12px;margin-top:8px;border-top:2px solid #2a1810}
  .footer{text-align:center;margin-top:32px;padding-top:20px;border-top:1px solid #ede0c6;font-size:12px;color:#a07a52}
  @media print{body{background:#fff;padding:0}.receipt{box-shadow:none}}
</style></head><body>
<div class="receipt">
  <div class="header">
    <div class="logo">MILLET FAM</div>
    <div class="sub">A Healthy Lifestyle</div>
    <div class="tag">Order Receipt</div>
  </div>
  <div class="info">
    <div class="info-block"><label>Order Number</label><p>${o.orderNumber}</p></div>
    <div class="info-block"><label>Date</label><p>${o.date}</p></div>
    <div class="info-block"><label>Customer</label><p>${o.customerName}</p></div>
    <div class="info-block"><label>Phone</label><p>${o.phone}</p></div>
    <div class="info-block" style="grid-column:span 2"><label>Delivery Address</label><p>${o.address}</p></div>
    <div class="info-block"><label>Payment</label><p>${o.paymentMethod}</p></div>
    <div class="info-block"><label>Email</label><p>${o.email}</p></div>
  </div>
  <table>
    <thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead>
    <tbody>${itemsHtml}</tbody>
  </table>
  <div class="totals">
    <div class="row"><span>Subtotal</span><span>₹${o.subtotal}</span></div>
    <div class="row"><span>Delivery</span><span>₹${o.deliveryFee}</span></div>
    <div class="row grand"><span>Grand Total</span><span>₹${o.grandTotal}</span></div>
  </div>
  <div class="footer">Thank you for choosing Millet Fam! 🌾<br/>For queries, reach us at hello@milletfam.com</div>
</div></body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt-${o.orderNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (success) return (
    <div className="co-page">
      <div className="page-bg" />
      <MiniNav />
      <div className="co-success">
        <div className="co-success-check">✓</div>
        <h2 className="heading-condensed">Order <span className="accent">Placed!</span></h2>
        <p>Thank you! We'll contact you shortly to confirm delivery.</p>
        <div className="co-success-num"># {success.orderNumber}</div>
        <div className="co-success-actions">
          <button className="btn-primary" onClick={downloadReceipt} style={{ gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Receipt
          </button>
          <a href="#" className="btn-ghost" style={{ display: 'inline-flex' }}>← Back to Shop</a>
        </div>
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
