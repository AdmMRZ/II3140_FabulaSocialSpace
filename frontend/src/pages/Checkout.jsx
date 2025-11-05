import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { useState } from 'react';

export default function Checkout(){
  const { cart, updateQty, removeItem, totalPrice } = useContext(CartContext);
  const nav = useNavigate();
  const [table, setTable] = useState('');
  const [error, setError] = useState('');
  const [loading, ] = useState(false);

  return (
    <div className="checkout">
      <Navbar />
      <main>
        <h1 style={{textAlign:'center', marginBottom:20}}>Your Cart</h1>
        <div className="checkout-main">
          <div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p style={{margin:0}}>Your cart is empty.</p>
              </div>
            ) : (
              <div className="cart-list">
                {cart.map(item => (
                  <div key={item.menu_id} className="cart-item">
                    <div className="cart-item-left">
                      <img src={item.image || `${process.env.PUBLIC_URL}/images/default-menu.jpg`} alt={item.name} className="cart-thumb" />
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-meta">Qty: {item.quantity} • Rp {item.price.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.menu_id, Math.max(1, item.quantity-1))}>-</button>
                      <div style={{minWidth:24, textAlign:'center'}}>{item.quantity}</div>
                      <button className="qty-btn" onClick={() => updateQty(item.menu_id, item.quantity+1)}>+</button>
                      <div className="cart-price">Rp {(item.price * item.quantity).toLocaleString()}</div>
                      <button className="remove-btn" onClick={() => removeItem(item.menu_id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="summary">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Items</span><span>{cart.length}</span></div>
            <div className="summary-row"><span>Subtotal</span><span>Rp {totalPrice.toLocaleString()}</span></div>
            <div style={{height:12}} />
            <div className="input-group">
              <label>
                Table Number
                <span className="required">*</span>
              </label>
              <input
                type="text"
                value={table}
                onChange={e => { setTable(e.target.value); setError(''); }}
                placeholder="e.g. 12"
                className="table-input"
              />
              {error && <div className="error-text">{error}</div>}
            </div>
            <div style={{height:1,background:'#f0f0f0',margin:'12px 0'}} />
            <div className="summary-row"><strong>Total</strong><strong className="total-amount">Rp {totalPrice.toLocaleString()}</strong></div>
            <button
              className="checkout-btn"
              onClick={() => {
                if (!table) { setError('Table number is required'); return; }
                if (!cart.length) { setError('Cart is empty'); return; }
                // Just prepare the order data and pass to payment page
                const orderData = { 
                  table_number: parseInt(table), 
                  items: cart.map(i=>({menu_id:i.menu_id, quantity:i.quantity})),
                  total_amount: totalPrice
                };
                nav('/payment', { state: { orderData, totalPrice } });
              }}
              disabled={!cart.length || loading}
            >
              {loading ? 'Creating order...' : 'Proceed to Payment'}
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}
