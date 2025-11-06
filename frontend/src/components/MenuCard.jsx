import React, { useContext, useRef } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function MenuCard({ menu }) {
  const { addToCart } = useContext(CartContext);
  const cardRef = useRef(null);

  // Only the handle will be draggable. This prevents the whole card from being
  // pulled when the user starts dragging content (improves UX).
  const handleDragStart = (e) => {
    try {
      e.dataTransfer.setData('application/json', JSON.stringify(menu));
      e.dataTransfer.effectAllowed = 'copy';

      // Create a small drag preview (ghost) to follow the cursor
      const preview = document.createElement('div');
      preview.style.padding = '8px 12px';
      preview.style.background = 'white';
      preview.style.borderRadius = '8px';
      preview.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
      preview.style.display = 'flex';
      preview.style.alignItems = 'center';
      preview.style.gap = '8px';
      preview.style.fontSize = '14px';
      preview.style.color = '#222';

      const img = document.createElement('img');
      img.src = menu.image_url || menu.image || `${process.env.PUBLIC_URL}/images/default-menu.jpg`;
      img.style.width = '48px';
      img.style.height = '48px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '6px';

      const label = document.createElement('div');
      label.textContent = menu.name;
      label.style.maxWidth = '200px';
      label.style.overflow = 'hidden';
      label.style.textOverflow = 'ellipsis';
      label.style.whiteSpace = 'nowrap';

      preview.appendChild(img);
      preview.appendChild(label);

      // Attach to body (offscreen) so browser can use it as drag image
      preview.style.position = 'absolute';
      preview.style.top = '-1000px';
      document.body.appendChild(preview);

      // Set custom drag image (offsets chosen to center preview near cursor)
      e.dataTransfer.setDragImage(preview, 30, 20);

      // store preview element to cleanup later
      e._dragPreview = preview;
      // add dragging class to original card for subtle feedback
      cardRef.current?.classList.add('dragging');
    } catch (err) {
      // ignore
    }
  };

  const handleDragEnd = (e) => {
    try {
      // cleanup preview element
      const preview = e._dragPreview || (e.dataTransfer && e.dataTransfer._dragPreview);
      if (preview && preview.parentNode) preview.parentNode.removeChild(preview);
    } catch (err) {
      // ignore
    }
    cardRef.current?.classList.remove('dragging');
  };

  const imgSrc = menu.image_url || menu.image || `${process.env.PUBLIC_URL}/images/default-menu.jpg`;
  const priceDisplay = typeof menu.price === 'number' ? menu.price.toLocaleString() : '-';

  return (
    <div className="menu-card" ref={cardRef} role="button" tabIndex={0}>
      <div className="menu-image-wrap">
        <img 
          src={imgSrc} 
          alt={menu.name}
          className="menu-image"
          referrerPolicy="no-referrer"
        />
        {/* Drag handle (only this is draggable) */}
        <button
          className="drag-handle"
          aria-label={`Drag ${menu.name}`}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          ☰
        </button>
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