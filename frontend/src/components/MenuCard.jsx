import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function MenuCard({ menu }) {
  const { addToCart } = useContext(CartContext);

  const onDragStart = (e) => {
    try {
      e.dataTransfer.setData('application/json', JSON.stringify(menu));
      e.dataTransfer.effectAllowed = 'copy';
    } catch (err) {
      
    }
  };

  const imgSrc = menu.image_url || menu.image || `${process.env.PUBLIC_URL}/images/default-menu.jpg`;
  const priceDisplay = typeof menu.price === 'number' ? menu.price.toLocaleString() : '-';

  return (
  <div className="menu-card" draggable onDragStart={onDragStart} role="button" tabIndex={0}>
      <div className="menu-image-wrap">
        <img 
          src={imgSrc} 
          alt={menu.name}
          className="menu-image"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="menu-content">
        <h3 className="menu-name">{menu.name}</h3>
        <p className="menu-description">{menu.description || 'No description available'}</p>
        <div className="menu-bottom">
          <div className="menu-price">Rp {priceDisplay}</div>
          <button 
            className="add-to-cart"
            onClick={() => addToCart(menu, 1)}
            aria-label={`Add ${menu.name} to cart`}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}