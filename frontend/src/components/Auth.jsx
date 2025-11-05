import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './Auth.css';

const Auth = () => {
  const { loginWithGoogle } = useContext(AuthContext);

  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!window.google || !clientId) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (resp) => {
        if (resp && resp.credential) {
          await loginWithGoogle(resp.credential);
        }
      },
    });

    const target = document.getElementById('gsi-nav-button-root');
    if (target) {
      window.google.accounts.id.renderButton(target, { 
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: target.offsetWidth
      });
    }
  }, [loginWithGoogle]);

  return (
    <div id="gsi-nav-button-root" className="auth-button-container" />
  );
};

export default Auth;