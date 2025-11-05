import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

export default function Home(){
  return (
    <div className="home-container">
      <Navbar />
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Fabula Social Space</h1>
          <p className="hero-subtitle">A cozy space where ideas meet comfort. Perfect for work, meetings, and social gatherings.</p>
          <Link to="/menu" className="cta-button">Explore Our Menu</Link>
        </div>
      </section>
      
      <section className="features-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Strategic Location</h3>
            <p className="feature-description">Strategically located in the heart of Dago for easy access</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3 className="feature-title">Work Ready</h3>
            <p className="feature-description">High-speed WiFi and comfortable workspaces</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">☕</div>
            <h3 className="feature-title">Great Menu</h3>
            <p className="feature-description">Delicious beverages to fuel your day</p>
          </div>
          <div className="feature-card contact-card">
            <div className="feature-icon">📱</div>
            <h3 className="feature-title">Connect With Us</h3>
            <div className="social-links">
              <a href="https://www.instagram.com/fabulasocialspace" className="social-link instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
                Follow us on Instagram
              </a>
              <a href="https://wa.me/628111700318" className="social-link whatsapp" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
