
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart(prev => {
      const found = prev.find(p => p.menu_id === item.menu_id);
      if (!found) return [...prev, item];
      return prev.map(p => p.menu_id === item.menu_id ? { ...p, quantity: p.quantity + item.quantity } : p);
    });
  };

  const addToCart = (menu, qty = 1) => {
    if (!menu) return;
    const item = {
      menu_id: menu.id ?? menu.menu_id,
      name: menu.name,
      price: menu.price ?? 0,
      image_url: menu.image_url || menu.image,
      quantity: qty
    };
    addItem(item);
  };
  const updateQty = (menu_id, q) => setCart(prev => prev.map(p => p.menu_id === menu_id ? { ...p, quantity: q } : p));
  const removeItem = (menu_id) => setCart(prev => prev.filter(p => p.menu_id !== menu_id));
  const clear = () => setCart([]);

  const totalItems = cart.reduce((s, it) => s + it.quantity, 0);
  const totalPrice = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, addToCart, updateQty, removeItem, clear, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
