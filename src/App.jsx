import React, { useState, useEffect } from 'react';
import {
  Benefits,
  Footer,
  Hero,
  Ingredients,
  Lifestyle,
  MarqueeStrip,
  Nav,
  Products,
  Testimonials,
  useReveal,
  Why,
} from './components.jsx';
import Checkout from './Checkout.jsx';
import Admin    from './Admin.jsx';

export const navigate = (path) => {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);

    const handleLinkClick = (e) => {
      let el = e.target;
      while (el && el.tagName !== 'A') {
        el = el.parentElement;
      }
      if (el && el.tagName === 'A') {
        const href = el.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();
          navigate(href);
        }
      }
    };
    window.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('click', handleLinkClick);
    };
  }, []);
  return path;
}

export default function App() {
  const path = usePath();
  useReveal(path);

  if (path === '/checkout') return <Checkout />;
  if (path === '/admin')    return <Admin />;

  return (
    <>
      <div className="page-bg"></div>
      <Nav/>
      <MarqueeStrip/>
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
