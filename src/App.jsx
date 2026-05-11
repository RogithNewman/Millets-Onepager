import React, { useState, useEffect } from 'react';
import {
  Benefits,
  Footer,
  Hero,
  Ingredients,
  Lifestyle,
  Nav,
  Products,
  Testimonials,
  useReveal,
  Why,
} from './components.jsx';
import Checkout from './Checkout.jsx';
import Admin    from './Admin.jsx';

function useHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const h = () => setHash(window.location.hash);
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  useReveal(hash);

  if (hash === '#checkout') return <Checkout />;
  if (hash === '#admin')    return <Admin />;

  return (
    <>
      <div className="page-bg"></div>
      <Nav/>
      <Hero/>
      <Products/>
      <Benefits/>
      <Ingredients/>
      <Why/>
      <Testimonials/>
      <Lifestyle/>
      <Footer/>
    </>
  );
}
