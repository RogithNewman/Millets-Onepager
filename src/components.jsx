// MILLET FAM — components

import React from 'react';
import { useCart } from './CartContext.jsx';

// ---------- ICONS ----------
const Icon = {
  Leaf: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 3c0 9-7 18-18 18 0-9 7-18 18-18z"/><path d="M3 21c5-5 10-7 18-18"/></svg>,
  Wheat: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22V8"/><path d="M12 8c-3-2-5-2-7 0 2 2 4 2 7 0z"/><path d="M12 8c3-2 5-2 7 0-2 2-4 2-7 0z"/><path d="M12 13c-3-2-5-2-7 0 2 2 4 2 7 0z"/><path d="M12 13c3-2 5-2 7 0-2 2-4 2-7 0z"/><path d="M12 18c-3-2-5-2-7 0 2 2 4 2 7 0z"/><path d="M12 18c3-2 5-2 7 0-2 2-4 2-7 0z"/></svg>,
  NoMaida: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M5 5l14 14"/></svg>,
  Shield: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>,
  Honey: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l8 4v8l-8 4-8-4V6z"/><path d="M12 2v20M4 6l16 12M20 6L4 18"/></svg>,
  Gluten: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22V4"/><path d="M5 8c2-2 5-2 7 0M19 8c-2-2-5-2-7 0M5 14c2-2 5-2 7 0M19 14c-2-2-5-2-7 0"/><path d="M3 4l18 18"/></svg>,
  Bolt: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>,
  Heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-4.5-9.5-9C.5 8 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z"/></svg>,
  Flame: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22c4 0 7-3 7-7 0-4-4-6-4-10-3 2-7 5-7 10 0 4 1 7 4 7z"/><path d="M12 22c-1-2-1-4 0-6"/></svg>,
  ArrowRight: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  Plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Star: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2l3 7 7 .8-5.2 4.8L18 22l-6-3.6L6 22l1.2-7.4L2 9.8 9 9z"/></svg>,
  Mail: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  Phone: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M22 16v3a2 2 0 0 1-2 2c-9 0-17-8-17-17a2 2 0 0 1 2-2h3l2 5-2 1c1 3 3 5 6 6l1-2 5 2z"/></svg>,
  Pin: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>,
  IG: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  FB: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 22V12h3l1-4h-4V6c0-1 .5-2 2-2h2V0h-3c-3 0-5 2-5 5v3H6v4h3v10z"/></svg>,
  TW: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18 3h3l-7 8 8 10h-6l-5-6-5 6H3l7-8L2 3h6l4 5 6-5z"/></svg>,
  YT: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 8s-.2-1.5-.8-2.1c-.7-.8-1.5-.8-1.9-.9C16.7 5 12 5 12 5s-4.7 0-7.3.2c-.4 0-1.2.1-1.9.9C2.2 6.7 2 8 2 8S1.8 9.8 1.8 11.6V12c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.1c.7.8 1.7.8 2.1.9 1.5.1 6.5.2 6.5.2s4.7 0 7.3-.2c.4 0 1.2-.1 1.9-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.6V12c0-1.8-.2-3.6-.2-3.6zM10 15V9l5 3z"/></svg>,
};

// ---------- NAV ----------
export function Nav() {
  const { total } = useCart();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#home" className="brand" onClick={close}>
            <div className="brand-mark">M</div>
            <div>
              <div className="brand-name">MILLET FAM</div>
              <div className="brand-sub">A Healthy Lifestyle</div>
            </div>
          </a>
          <div className="nav-links">
            <a className="nav-link" href="#home">Home</a>
            <a className="nav-link" href="#products">Products</a>
            <a className="nav-link" href="#ingredients">Ingredients</a>
            <a className="nav-link" href="#benefits">Benefits</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#contact">Contact</a>
          </div>
          <div className="nav-actions">
            <a href="/checkout" className="nav-cta" onClick={close}>
              Order Now
              {total > 0 && <span className="nav-cart-ct">{total}</span>}
            </a>
            <button
              className={`nav-burger${open ? ' open' : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-overlay${open ? ' active' : ''}`} aria-hidden={!open}>
        <div className="mobile-overlay-inner">
          <a className="mobile-nav-link" href="#home" onClick={close}>Home</a>
          <a className="mobile-nav-link" href="#products" onClick={close}>Products</a>
          <a className="mobile-nav-link" href="#ingredients" onClick={close}>Ingredients</a>
          <a className="mobile-nav-link" href="#benefits" onClick={close}>Benefits</a>
          <a className="mobile-nav-link" href="#about" onClick={close}>About</a>
          <a className="mobile-nav-link" href="#contact" onClick={close}>Contact</a>
          <a className="mobile-nav-cta" href="/checkout" onClick={close}>
            Order Now {total > 0 && <span className="nav-cart-ct">{total}</span>}
          </a>
        </div>
      </div>
    </>
  );
}

// ---------- FLOATING PARTICLES (SVG) ----------
function FloatingGrains() {
  // Subtle floating millet grain svgs scattered behind hero
  const grains = [
    { c: '#c9a35a', t: '6%', l: '8%', s: 18, anim: 'fa', d: 0 },
    { c: '#8b5a2b', t: '14%', l: '92%', s: 14, anim: 'fb', d: 1 },
    { c: '#d8a866', t: '40%', l: '4%', s: 12, anim: 'fc', d: 0.5 },
    { c: '#7a8c4a', t: '60%', l: '94%', s: 22, anim: 'fa', d: 2 },
    { c: '#a07a52', t: '78%', l: '12%', s: 16, anim: 'fb', d: 1.5 },
    { c: '#c9a35a', t: '88%', l: '88%', s: 14, anim: 'fc', d: 0.8 },
  ];
  return (
    <>
      {grains.map((g, i) => (
        <svg key={i} className={`float-grain ${g.anim}`} style={{
          top: g.t, left: g.l, width: g.s, height: g.s * 1.6,
          animationDelay: `${g.d}s`,
        }} viewBox="0 0 12 20">
          <ellipse cx="6" cy="10" rx="5" ry="9" fill={g.c} />
          <ellipse cx="4.5" cy="7" rx="1.6" ry="3" fill="rgba(255,255,255,0.25)" />
        </svg>
      ))}
    </>
  );
}

// ---------- HERO ----------
export function Hero() {
  return (
    <section id="home" className="hero shell">
      <FloatingGrains />
      <div className="hero-grid">
        <div className="reveal in">
          <div className="eyebrow"><span className="dot"></span> Made with Millets · Packed with Nutrition</div>
          <h1 className="heading-condensed">
            Perfect Healthy<br/>Snacks for<br/>
            <span className="accent">Everyday Energy</span>
          </h1>
          <p className="hero-sub">
            Wholesome, tasty &amp; guilt-free snacks crafted from ancient grains.
            Roasted, never fried — sweetened with jaggery — built for the way you live now.
          </p>
          <div className="hero-tagline">Healthy Snacks For A Better You</div>
          <div className="hero-ctas">
            <a className="btn-primary" href="#products">Explore  <Icon.ArrowRight/></a>
            <a className="btn-ghost" href="/checkout">Order Now</a>
          </div>
          <div className="hero-meta">
            <div className="item"><div className="num">100%</div><div className="lbl">Natural</div></div>
            <div className="item"><div className="num">0g</div><div className="lbl">Refined Sugar</div></div>
            <div className="item"><div className="num">9+</div><div className="lbl">Whole Grains</div></div>
          </div>
        </div>
        <div className="hero-stage reveal in">
          <div className="hero-disc"></div>
          <div className="hero-product">
            <img src="/assets/images/banner.png" alt="Millet Laddu" />
          </div>

          <div className="hero-badge b2"><Icon.Leaf style={{width:18,height:18,color:'#4a5d2a'}}/> Gluten Free</div>
          <div className="hero-badge b3"><Icon.Bolt style={{width:18,height:18,color:'#c84e1a'}}/> High Protein</div>
        </div>
      </div>
    </section>
  );
}

// ---------- PRODUCTS ----------
const PRODUCTS = [
  {
    name: "Assorted Millet Energy Balls", tag: "Every Flavour. One Box.",
    img: "/assets/productimg/Assorted Millet Energy Balls.png",
    tagline: "A handpicked mix of all six millet ball varieties — perfect for gifting or trying them all.",
    ingredients: "Ragi · Jowar · Foxtail Millet · Oats · Almonds · Cashews · Pumpkin Seeds · Honey · Jaggery",
    icons: [{i:'Bolt', l:'Variety Pack'}, {i:'Shield', l:'No Preservatives'}, {i:'Honey', l:'Jaggery Sweetened'}],
    price: "₹599", unit: "400g · 16 pcs",
  },
  {
    name: "Ragi Classic Laddu", tag: "Ancient Grain. Pure Indulgence.",
    img: "/assets/productimg/Ragi Classic Laddu.png",
    tagline: "Dark, dense finger millet laddus slow-rolled with jaggery — zero refined sugar, zero guilt.",
    ingredients: "Finger Millet (Ragi) · Jaggery · Ghee · Cardamom · Roasted Sesame Seeds",
    icons: [{i:'NoMaida', l:'No Refined Sugar'}, {i:'Wheat', l:'Calcium Rich'}, {i:'Honey', l:'Jaggery Sweetened'}],
    price: "₹299", unit: "200g · 8 pcs",
  },
  {
    name: "Multigrain Nut Energy Balls", tag: "Fuel That Fits In Your Palm",
    img: "/assets/productimg/multigrain-nut-balls.png",
    tagline: "Wholesome rolled oats, almonds & pumpkin seeds bound with jaggery — your afternoon hunger fix.",
    ingredients: "Rolled Oats · Foxtail Millet · Almonds · Pumpkin Seeds · Jaggery · Ghee",
    icons: [{i:'Bolt', l:'High Protein'}, {i:'Wheat', l:'High Fiber'}, {i:'NoMaida', l:'No Maida'}],
    price: "₹349", unit: "250g · 10 pcs",
  },
  {
    name: "Moringa Millet Power Balls", tag: "Green Nutrition. Zero Compromise.",
    img: "/assets/productimg/moringa-millet-balls.png",
    tagline: "Vibrant moringa-infused foxtail millet balls packed with iron, calcium & antioxidants.",
    ingredients: "Foxtail Millet · Moringa Powder · Almonds · Pumpkin Seeds · Rolled Oats · Jaggery",
    icons: [{i:'Leaf', l:'Iron Rich'}, {i:'Shield', l:'Antioxidant'}, {i:'Bolt', l:'Energy Boost'}],
    price: "₹379", unit: "200g · 8 pcs",
  },
  {
    name: "Jowar Almond Energy Balls", tag: "Classic Nutty Goodness",
    img: "/assets/productimg/jowar-almond-balls.png",
    tagline: "Slow-roasted sorghum with almonds & pumpkin seeds for steady, lasting energy through your day.",
    ingredients: "Jowar (Sorghum) · Rolled Oats · Almonds · Pumpkin Seeds · Jaggery · Ghee",
    icons: [{i:'Wheat', l:'Gluten Free'}, {i:'Bolt', l:'Slow Release Energy'}, {i:'NoMaida', l:'No Maida'}],
    price: "₹329", unit: "250g · 10 pcs",
  },
  {
    name: "Foxtail Millet Pumpkin Balls", tag: "Magnesium-Rich. Earthy. Honest.",
    img: "/assets/productimg/foxtail-pumpkin-balls.png",
    tagline: "Nutty foxtail millet with generous pumpkin seeds — a mineral-rich bite for the mindful snacker.",
    ingredients: "Foxtail Millet · Pumpkin Seeds · Rolled Oats · Almonds · Coconut Oil · Jaggery",
    icons: [{i:'Leaf', l:'Mineral Rich'}, {i:'Shield', l:'No Preservatives'}, {i:'Wheat', l:'High Fiber'}],
    price: "₹349", unit: "200g · 8 pcs",
  },
  {
    name: "Ragi Mixed Nut Laddu", tag: "Seven Superfoods. One Power Bite.",
    img: "/assets/productimg/Ragi Mixed Nut Laddu.png",
    tagline: "Deep ragi laddus loaded with almonds, cashews, flax & pumpkin seeds — serious nutrition in every bite.",
    ingredients: "Finger Millet (Ragi) · Almonds · Cashews · Pumpkin Seeds · Flax Seeds · Sesame · Jaggery",
    icons: [{i:'Bolt', l:'Protein Packed'}, {i:'Shield', l:'Omega-3 Rich'}, {i:'Honey', l:'Jaggery Sweetened'}],
    price: "₹399", unit: "200g · 8 pcs",
  },
  {
    name: "Honey Oat Granola Balls", tag: "Nature's Sweetest Energy Fix",
    img: "/assets/productimg/honey-oat-balls.png",
    tagline: "Hand-rolled oat granola balls with wild honey, sun-dried raisins, almonds & cashews.",
    ingredients: "Rolled Oats · Wild Honey · Raisins · Almonds · Cashews · Chia Seeds · Millet Flakes",
    icons: [{i:'Honey', l:'Wild Honey'}, {i:'Bolt', l:'Quick Energy'}, {i:'NoMaida', l:'No Refined Sugar'}],
    price: "₹299", unit: "200g · 8 pcs",
  },
];

function ProductCard({ p, index }) {
  const { cart, add, sub } = useCart();
  const qty = cart[index] || 0;
  return (
    <article className="product-card reveal">
      <div className="product-img-wrap">
        <img src={p.img} alt={p.name} />
        {/* <span className="product-tag">New · Best Seller</span> */}
        <div className="product-glow"></div>
      </div>
      <div className="product-body">
        <h3 className="product-name">{p.name}</h3>
        <p className="product-tagline">{p.tag}</p>
        <p className="product-ingredients">{p.ingredients}</p>
        <div className="product-icons">
          {p.icons.map((ic, i) => {
            const I = Icon[ic.i] || Icon.Leaf;
            return <span key={i} className="icon-pill"><I/>{ic.l}</span>;
          })}
        </div>
        <div className="product-foot">
          <div className="price">{p.price}<small> · {p.unit}</small></div>
          {qty === 0 ? (
            <button className="add-cart" onClick={() => add(index)} aria-label="Add to cart">
              <Icon.Plus/>
            </button>
          ) : (
            <div className="card-qty-ctrl">
              <button className="card-qty-btn" onClick={() => sub(index)}>−</button>
              <span className="card-qty-num">{qty}</span>
              <button className="card-qty-btn" onClick={() => add(index)}>+</button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section id="products" className="section shell">
      <div className="section-head reveal">
        <div className="section-eyebrow">Try Our Delicious Range</div>
        <h2 className="section-title heading-condensed">Snacks <span className="accent">Worth Reaching For</span></h2>
        <p className="section-sub">Eight recipes, one rule — every ingredient earns its place. Roasted, baked, slow-cooked. Never fried, never compromised.</p>
      </div>
      <div className="products-grid">
        {PRODUCTS.map((p, i) => <ProductCard key={i} p={p} index={i}/>)}
      </div>
    </section>
  );
}

// ---------- BENEFITS ----------
const BENEFITS = [
  { i: 'Bolt',    l: 'High Protein' },
  { i: 'Wheat',   l: 'Rich Fiber' },
  { i: 'NoMaida', l: 'No Maida' },
  { i: 'Shield',  l: 'No Preservatives' },
  { i: 'Honey',   l: 'Jaggery Based' },
  { i: 'Gluten',  l: 'Gluten Free' },
];
export function Benefits() {
  return (
    <section id="benefits" className="section shell">
      <div className="section-head reveal">
        <div className="section-eyebrow">Why Snack Smart</div>
        <h2 className="section-title heading-condensed">Built On <span className="accent">Six Promises</span></h2>
      </div>
      <div className="benefits-grid">
        {BENEFITS.map((b, i) => {
          const I = Icon[b.i] || Icon.Leaf;
          return (
            <div key={i} className="benefit reveal" style={{transitionDelay: `${i*60}ms`}}>
              <div className="benefit-icon"><I/></div>
              <div className="benefit-label">{b.l}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------- INGREDIENTS ----------
const INGREDIENTS = [
  { name: 'Ragi',          note: 'Calcium-rich finger millet',  c1:'#a86f3a', c2:'#5a3418' },
  { name: 'Jowar',         note: 'Iron-loaded sorghum',         c1:'#efd6a4', c2:'#b88547' },
  { name: 'Bajra',         note: 'Pearl millet protein',        c1:'#c9a35a', c2:'#7a522a' },
  { name: 'Almonds',       note: 'Vitamin E powerhouse',        c1:'#e8c89a', c2:'#a07550' },
  { name: 'Pumpkin Seeds', note: 'Magnesium & zinc',            c1:'#9caf6a', c2:'#4a5d2a' },
  { name: 'Jaggery',       note: 'Unrefined sweetness',         c1:'#d49654', c2:'#6b3a18' },
  { name: 'Dark Chocolate',note: '70% cacao, real cocoa',       c1:'#6b432a', c2:'#2a1810' },
];
export function Ingredients() {
  return (
    <section id="ingredients" className="section shell" style={{position:'relative'}}>
      <FloatingGrains/>
      <div className="section-head reveal">
        <div className="section-eyebrow">Know What's Inside</div>
        <h2 className="section-title heading-condensed">Ingredients <span className="accent">You Can Pronounce</span></h2>
        <p className="section-sub">Sourced from small farms across India. Cleaned, milled and roasted in small batches — so every grain still tastes like itself.</p>
      </div>
      <div className="ingredients-grid">
        {INGREDIENTS.map((ing, i) => (
          <div key={i} className="ingredient reveal" style={{transitionDelay:`${i*50}ms`}}>
            <div className="ingredient-shape" style={{ '--c1': ing.c1, '--c2': ing.c2 }}></div>
            <div className="ingredient-name">{ing.name}</div>
            <div className="ingredient-note">{ing.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- WHY CHOOSE ----------
const WHY = [
  { n:'01', t:'100% Natural Ingredients', d:'Real grains, real seeds, real spices. Nothing arrives in a numbered drum.' },
  { n:'02', t:'Traditional Recipes, Modern Taste', d:'Heritage formats — laddu, sev, crisps — re-engineered for today’s palate.' },
  { n:'03', t:'Healthy & Tasty Together', d:'We refused to ship anything that didn’t earn its place at tea time.' },
  { n:'04', t:'Roasted, Never Fried', d:'Slow-roasted in small batches for crunch without the oil tax.' },
  { n:'05', t:'Energy You Can Feel', d:'Slow-release carbs, plant protein, no sugar crash. Snack, then keep going.' },
];
export function Why() {
  return (
    <section id="about" className="section shell">
      <div className="section-head reveal">
        <div className="section-eyebrow">Why Choose Millet Fam</div>
        <h2 className="section-title heading-condensed">A Snack You'll <span className="accent">Be Proud To Pack</span></h2>
      </div>
      <div className="why-grid">
        {WHY.map((w, i) => (
          <div key={i} className="why-card reveal" style={{transitionDelay:`${i*60}ms`}}>
            <div className="why-num">{w.n}</div>
            <div className="why-title">{w.t}</div>
            <div className="why-desc">{w.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- TESTIMONIALS ----------
const REVIEWS = [
  { q:"Finally a healthy snack that doesn't feel like punishment. The laddus are gone in two days every time.", n:"Aarti R.", r:"Verified Buyer · Bengaluru", a:"A" },
  { q:"My kids think it's dessert. I know it's breakfast. Everyone wins.", n:"Karan M.", r:"Verified Buyer · Mumbai", a:"K" },
  { q:"The crunch mix replaced my evening chips habit. Same craving, zero guilt.", n:"Priya S.", r:"Verified Buyer · Delhi", a:"P" },
  { q:"Travel-pack heaven. I throw a few bars in my bag and skip airport food entirely.", n:"Vivek N.", r:"Verified Buyer · Hyderabad", a:"V" },
];
export function Testimonials() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(v => (v+1) % REVIEWS.length), 5500);
    return () => clearInterval(t);
  }, []);
  const r = REVIEWS[i];
  return (
    <section className="section shell">
      <div className="section-head reveal">
        <div className="section-eyebrow">From The Family</div>
        <h2 className="section-title heading-condensed">Words From <span className="accent">Real Snackers</span></h2>
      </div>
      <div className="t-stage reveal">
        <div className="t-card" key={i}>
          <div className="t-stars">★★★★★</div>
          <p className="t-quote">"{r.q}"</p>
          <div className="t-author">
            <div className="t-avatar">{r.a}</div>
            <div className="t-author-text">
              <div className="n">{r.n}</div>
              <div className="r">{r.r}</div>
            </div>
          </div>
        </div>
        <div className="t-controls">
          {REVIEWS.map((_, k) => (
            <button key={k} className={`t-dot ${k===i?'active':''}`} onClick={() => setI(k)} aria-label={`Review ${k+1}`}/>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- LIFESTYLE BANNER ----------
export function Lifestyle() {
  return (
    <section className="shell">
      <div className="lifestyle reveal">
        <h2 className="heading-condensed">
          <span className="a1">Eat Better.</span>{' '}
          <span className="a2">Feel Better.</span>{' '}
          <span className="a3">Live Better.</span>
        </h2>
        <p>Small swaps, repeated daily. That's where every healthier life begins — and that's exactly what we're packing into every box.</p>
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <div className="brand-mark" style={{background:'var(--cream-light)', color:'var(--brown-900)'}}>M</div>
              <div>
                <div className="brand-name" style={{color:'var(--cream-light)'}}>MILLET FAM</div>
                <div className="brand-sub" style={{color:'var(--gold)'}}>A Healthy Lifestyle</div>
              </div>
            </div>
            <p>Wholesome snacks crafted from ancient Indian grains — slow-roasted, jaggery-sweetened and engineered for everyday energy.</p>
            <div className="socials">
              <a href="#"><Icon.IG style={{width:16,height:16}}/></a>
              <a href="#"><Icon.FB style={{width:16,height:16}}/></a>
              <a href="#"><Icon.TW style={{width:16,height:16}}/></a>
              <a href="#"><Icon.YT style={{width:16,height:16}}/></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <a href="#products">Ragi Classic Laddu</a>
            <a href="#products">Multigrain Nut Balls</a>
            <a href="#products">Moringa Millet Balls</a>
            <a href="#products">Jowar Almond Balls</a>
            <a href="#products">Ragi Mixed Nut Laddu</a>
            <a href="#products">Honey Oat Balls</a>
            <a href="#products">Assorted Mix Box</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#ingredients">Ingredients</a>
            <a href="#benefits">Benefits</a>
            <a href="#">Sustainability</a>
            <a href="#">Press</a>
          </div>
          <div className="footer-col">
            <h4>Stay In Touch</h4>
            <a href="mailto:hello@milletfam.in"><Icon.Mail style={{width:14,height:14, marginRight:8, verticalAlign:'middle'}}/> hello@milletfam.in</a>
            <a href="tel:+919945233599"><Icon.Phone style={{width:14,height:14, marginRight:8, verticalAlign:'middle'}}/> +91 99452 33599</a>
            <a href="#"><Icon.Pin style={{width:14,height:14, marginRight:8, verticalAlign:'middle'}}/> Bengaluru, India</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Millet Fam. All rights reserved.</div>
          <div>Made with millets, in India.</div>
        </div>
      </div>
    </footer>
  );
}

// Reveal-on-scroll observer — re-runs when `dep` changes so elements are
// re-observed after page navigation (e.g. returning from #checkout to home).
export function useReveal(dep) {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}
