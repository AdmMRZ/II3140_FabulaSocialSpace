import React, { createContext, useContext, useRef } from 'react';
import { useCart } from './CartContext';

const DropContext = createContext();

export function DropProvider({ children }) {
  const zones = useRef({});
  const { addToCart } = useCart();

  const registerZone = (name, rect) => {
    zones.current[name] = rect;
  };

  const unregisterZone = (name) => {
    delete zones.current[name];
  };

  const tryDrop = (menu, x, y) => {
    // x,y are screen coordinates
    for (const [name, r] of Object.entries(zones.current)) {
      if (!r) continue;
      const inside = x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height;
      if (inside) {
        addToCart(menu, 1);
        return true;
      }
    }
    return false;
  };

  return (
    <DropContext.Provider value={{ registerZone, unregisterZone, tryDrop }}>
      {children}
    </DropContext.Provider>
  );
}

export function useDrop() {
  return useContext(DropContext);
}

export default DropContext;
