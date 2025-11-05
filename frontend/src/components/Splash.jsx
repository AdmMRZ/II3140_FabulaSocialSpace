import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Splash.css';

export default function Splash() {
  const nav = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => nav('/home'), 20000);
    return () => clearTimeout(t);
  }, [nav]);

  // Clicking anywhere skips the intro and goes to home
  const handleSkip = () => nav('/home');

  return (
    <div
      className="splash-container"
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSkip()}
      aria-label="Enter Fabula Social Space"
    >
      <div className="splash-vignette" />
      <img src="/images/logo.png" alt="Fabula" className="splash-logo" />
      <div className="splash-tag">Fabula Social Space</div>
      <div className="splash-hint">Tap to continue</div>
    </div>
  );
}