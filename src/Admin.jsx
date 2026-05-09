import React, { useState, useEffect } from 'react';
import { supabase } from './supabase.js';

// ── Auth wrapper ────────────────────────────────────────────────────────────
export default function Admin() {
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) return <div className="admin-loading">Loading…</div>;
  if (!session) return <Login />;
  return <Dashboard session={session} />;
}

// ── Login ───────────────────────────────────────────────────────────────────
function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const [busy, setBusy]         = useState(false);

  const submit = async e => {
    e.preventDefault();
    setBusy(true); setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) setError(err.message);
  };

  return (
    <div className="admin-login-wrap">
      <div className="page-bg" />
      <div className="admin-login-card">
        <div className="brand-mark" style={{ margin: '0 auto 20px', width: 52, height: 52, fontSize: 22, borderRadius: '50%' }}>M</div>
        <h2 className="heading-condensed" style={{ textAlign: 'center', fontSize: 38, color: 'var(--brown-900)' }}>
          Admin <span style={{ color: 'var(--orange)' }}>Portal</span>
        </h2>
        <p className="admin-login-sub">MILLET FAM · Orders Dashboard</p>
        <form onSubmit={submit} style={{ marginTop: 28 }}>
          <div className="co-field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@milletfam.in" />
          </div>
          <div className="co-field" style={{ marginTop: 14 }}>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          {error && <div className="co-error" style={{ marginTop: 12 }}>{error}</div>}
          <button type="submit" className="btn-primary admin-login-btn" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <a href="#" className="admin-back-link">← Back to Shop</a>
      </div>
    </div>
  );
}

// ── Dashboard ───────────────────────────────────────────────────────────────
const STATUSES = ['pending','confirmed','processing','shipped','delivered','cancelled'];
const STATUS_COLOR = {
  pending:    '#c9a35a',
  confirmed:  '#3a8f5a',
  processing: '#c84e1a',
  shipped:    '#3a6ad4',
  delivered:  '#4a5d2a',
  cancelled:  '#8a3a3a',
};

function Dashboard({ session }) {
  const [orders,   setOrders]   = useState([]);
  const [busy,     setBusy]     = useState(true);
  const [filter,   setFilter]   = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);

  const load = async () => {
    setBusy(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
    setBusy(false);
    // mark new orders seen
    const newIds = (data || []).filter(o => o.is_new).map(o => o.id);
    if (newIds.length) await supabase.from('orders').update({ is_new: false }).in('id', newIds);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    await supabase.from('orders').update({ status }).eq('id', id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    setUpdating(null);
  };

  const signOut = () => supabase.auth.signOut();

  const shown = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const stats = {
    total:   orders.length,
    newOrd:  orders.filter(o => o.is_new).length,
    pending: orders.filter(o => o.status === 'pending').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.grand_total, 0),
  };

  const fmtDate = ts => new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const fmtINR  = n  => `₹${Number(n).toLocaleString('en-IN')}`;

  return (
    <div className="admin-page">
      <div className="page-bg" />

      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner shell">
          <div className="brand">
            <div className="brand-mark" style={{ background: 'var(--gold)', color: 'var(--brown-900)', borderColor: 'rgba(255,255,255,0.3)' }}>M</div>
            <div>
              <div className="brand-name" style={{ color: 'var(--cream-light)' }}>MILLET FAM</div>
              <div className="brand-sub" style={{ color: 'var(--gold)' }}>Admin Dashboard</div>
            </div>
          </div>
          <div className="admin-header-right">
            <span className="admin-user">{session.user.email}</span>
            <button onClick={signOut} className="btn-ghost admin-signout">Sign Out</button>
          </div>
        </div>
      </header>

      <main className="admin-main shell">
        {/* Stats */}
        <div className="admin-stats">
          {[
            { label: 'Total Orders',  value: stats.total,           accent: false },
            { label: 'New Orders',    value: stats.newOrd,          accent: true  },
            { label: 'Pending',       value: stats.pending,         accent: false },
            { label: 'Revenue',       value: fmtINR(stats.revenue), accent: false },
          ].map((s, i) => (
            <div key={i} className={`admin-stat ${s.accent ? 'accent' : ''}`}>
              <div className="admin-stat-val">{s.value}</div>
              <div className="admin-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="admin-tabs">
          {['all', ...STATUSES].map(f => (
            <button key={f} className={`admin-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="admin-tab-ct">
                {f === 'all' ? orders.length : orders.filter(o => o.status === f).length}
              </span>
            </button>
          ))}
          <button className="admin-tab admin-refresh" onClick={load} title="Refresh">↻</button>
        </div>

        {/* Orders list */}
        {busy ? (
          <div className="admin-empty">Loading orders…</div>
        ) : shown.length === 0 ? (
          <div className="admin-empty">No orders here yet.</div>
        ) : (
          <div className="admin-orders">
            {shown.map(o => {
              const open = expanded === o.id;
              const sc   = STATUS_COLOR[o.status] || '#888';
              return (
                <div key={o.id} className="admin-order">
                  <div className="admin-order-head" onClick={() => setExpanded(open ? null : o.id)}>
                    <div className="admin-order-hl">
                      {o.is_new && <span className="admin-badge-new">NEW</span>}
                      <div>
                        <div className="admin-order-num">{o.order_number}</div>
                        <div className="admin-order-cust">{o.customer_name} &middot; {o.phone}</div>
                      </div>
                    </div>
                    <div className="admin-order-hr">
                      <div className="admin-order-amt">{fmtINR(o.grand_total)}</div>
                      <span className="admin-status-chip" style={{ color: sc, background: sc + '1a', border: `1px solid ${sc}40` }}>
                        {o.status}
                      </span>
                      <div className="admin-order-dt">{fmtDate(o.created_at)}</div>
                      <span className="admin-chevron">{open ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {open && (
                    <div className="admin-order-body">
                      <div className="admin-detail-grid">
                        <div>
                          <h4 className="admin-detail-lbl">Customer</h4>
                          <p>{o.customer_name}</p>
                          <p>{o.email}</p>
                          <p>{o.phone}</p>
                        </div>
                        <div>
                          <h4 className="admin-detail-lbl">Delivery Address</h4>
                          <p>{o.address}</p>
                          <p>{o.city}, {o.state} – {o.pincode}</p>
                        </div>
                        <div>
                          <h4 className="admin-detail-lbl">Payment</h4>
                          <p style={{ textTransform: 'uppercase', fontWeight: 700 }}>{o.payment_method}</p>
                          {o.payment_note && <p style={{ color: 'var(--brown-500)', marginTop: 6, fontSize: 13 }}>{o.payment_note}</p>}
                        </div>
                      </div>

                      <h4 className="admin-detail-lbl" style={{ marginTop: 22 }}>Items Ordered</h4>
                      <div className="admin-items-table">
                        {(o.items || []).map((it, idx) => (
                          <div key={idx} className="admin-item-row">
                            <span className="ai-name">{it.name}</span>
                            <span className="ai-unit">{it.unit}</span>
                            <span className="ai-qty">× {it.qty}</span>
                            <span className="ai-amt">{fmtINR(it.price * it.qty)}</span>
                          </div>
                        ))}
                        <div className="admin-item-row subtotal-row">
                          <span className="ai-name">Subtotal</span><span /><span />
                          <span className="ai-amt">{fmtINR(o.subtotal)}</span>
                        </div>
                        <div className="admin-item-row">
                          <span className="ai-name" style={{ color: 'var(--brown-500)' }}>Delivery</span><span /><span />
                          <span className="ai-amt">{fmtINR(o.delivery_fee)}</span>
                        </div>
                        <div className="admin-item-row total-row">
                          <span className="ai-name">Grand Total</span><span /><span />
                          <span className="ai-amt">{fmtINR(o.grand_total)}</span>
                        </div>
                      </div>

                      <div className="admin-status-update">
                        <h4 className="admin-detail-lbl">Update Status</h4>
                        <div className="admin-status-btns">
                          {STATUSES.map(s => (
                            <button key={s} disabled={updating === o.id}
                              onClick={() => updateStatus(o.id, s)}
                              className={`admin-status-btn ${o.status === s ? 'active' : ''}`}
                              style={{ '--sc': STATUS_COLOR[s] }}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
