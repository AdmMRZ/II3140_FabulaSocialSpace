import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { CartContext } from '../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { postOrder } from '../services/api';
import './Payment.css';

export default function Payment() {
  const { clear: clearCart } = useContext(CartContext);
  const nav = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const orderData = location.state?.orderData;
  
  if (!orderData) {
    nav('/checkout');
    return null;
  }

  return (
    <div className="payment-container">
      <Navbar />
      <div className="success-container">
        <h2 className="success-title">Complete Your Payment</h2>
        
        <div className="order-details">
          <div className="order-info">
            <span className="order-label">Table Number:</span>
            <span className="order-value">{orderData.table_number}</span>
          </div>
          <div className="order-info">
            <span className="order-label">Total Amount:</span>
            <span className="order-value">Rp {parseInt(orderData.total_amount).toLocaleString()}</span>
          </div>
        </div>

        <div className="qris-container">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Order:${orderData.table_number}_Amount:${orderData.total_amount}`}
            alt="QRIS Payment"
            className="qris-image"
          />
        </div>
        
        <p className="qris-help">Please scan this QR code with your preferred payment app</p>

        {error && (
          <div className="status-error">
            {error}
          </div>
        )}

        <div className="buttons-grid">
          <button
            className="action-btn"
            onClick={async () => {
              try {
                setLoading(true);
                setError('');
                
                await postOrder({
                  table_number: orderData.table_number,
                  items: orderData.items,
                  total_amount: orderData.total_amount
                });
                
                clearCart();
                nav('/menu');
                
              } catch (err) {
                console.error('Error confirming order:', err);
                setError(err.response?.data?.message || 'Error processing order. Please try again.');
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm My Payment'}
          </button>
          
          <button
            className="action-btn outline"
            onClick={() => nav('/menu')}
            disabled={loading}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}
