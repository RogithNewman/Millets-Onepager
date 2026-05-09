import React, { createContext, useContext, useState } from 'react';

const CartCtx = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const add   = i => setCart(p => ({ ...p, [i]: (p[i] || 0) + 1 }));
  const sub   = i => setCart(p => ({ ...p, [i]: Math.max(0, (p[i] || 0) - 1) }));
  const clear = () => setCart({});
  const total = Object.values(cart).reduce((s, n) => s + n, 0);
  return (
    <CartCtx.Provider value={{ cart, add, sub, clear, total }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
