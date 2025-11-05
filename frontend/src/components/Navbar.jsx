import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import Auth from './Auth';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/home" className="nav-brand">
          <img src="/images/logo.png" alt="Fabula" className="nav-logo" />
          <span>Fabula Social Space</span>
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/tenant-request" className="nav-link">Tenant Request</Link>
        <Link to="/checkout" className="nav-link nav-cart">
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
        {user ? (
          <div className="nav-profile">
            <div className="profile-info">
              <img 
                src={user.picture || "/images/default-avatar.png"}
                alt={user.name} 
                className="profile-picture"
                referrerPolicy="no-referrer"
              />
              <div className="profile-text">
                <span className="profile-name">{user.name}</span>
                <span className="profile-email">{user.email}</span>
              </div>
            </div>
            <button 
              className="sign-out-btn"
              onClick={logout}
            >
              <span>Sign out</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5M7.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H7.5" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </nav>
  );
};

export default Navbar;