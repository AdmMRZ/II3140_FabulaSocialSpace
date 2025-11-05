import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { postTenant } from '../services/api';
import './TenantRequest.css';

export default function TenantRequest() {
  const [form, setForm] = useState({ tenant_name:'', contact:'', type:'', description:'' });
  const [sent, setSent] = useState(false);
  
  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.tenant_name||!form.contact||!form.type) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      await postTenant(form);
      setSent(true);
    } catch(e) {
      console.error(e);
      alert('Failed to submit request. Please try again.');
    }
  };

  const handleReset = () => {
    setSent(false);
    setForm({ tenant_name:'', contact:'', type:'', description:'' });
  };

  return (
    <div className="tenant-container">
      <Navbar />
      <div className="tenant-content">
        {sent ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Request Submitted Successfully!</h2>
            <p className="success-text">
              Thank you for your interest in becoming a tenant at Fabula Social Space.
              We will review your application and contact you soon.
            </p>
            <button className="back-button" onClick={handleReset}>
              Submit Another Request
            </button>
          </div>
        ) : (
          <>
            <div className="tenant-header">
              <h1 className="tenant-title">Join Our Community</h1>
            </div>

            <div className="tenant-benefits">
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Prime Location</h3>
                <p>Strategic spot with high foot traffic</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🤝</div>
                <h3>Community</h3>
                <p>Join a network of other businesses</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📈</div>
                <h3>Growth</h3>
                <p>Access to a ready customer base</p>
              </div>
            </div>

            <form className="tenant-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Tenant Application</h2>
                <p>Fill out the form below to start your journey with us</p>
              </div>

              <div className="form-group" style={{ marginBottom: "2.5rem" }}>
                <label className="form-label">Business Name <span className="required">*</span></label>
                <input
                  name="tenant_name"
                  className="form-input"
                  placeholder="Enter your business name"
                  value={form.tenant_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Contact Information <span className="required">*</span></label>
                  <input
                    name="contact"
                    className="form-input"
                    placeholder="Enter phone number or email"
                    value={form.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Business Type <span className="required">*</span></label>
                  <input
                    name="type"
                    className="form-input"
                    placeholder="e.g., Tattoo Parlor, Boutique  "
                    value={form.type}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Business Concept</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  placeholder="Tell us about your business vision, target market, and what makes you unique..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={!form.tenant_name || !form.contact || !form.type}
              >
                <span>Submit Application</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
