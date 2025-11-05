import React, { createContext, useState, useEffect } from 'react';
import client, { postAuthGoogle } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fabula_user')) || null; } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem('fabula_user', JSON.stringify(user));
    else localStorage.removeItem('fabula_user');
  }, [user]);

  const login = (userData) => setUser(userData);
  const continueAsGuest = () => setUser({ username: 'Guest', email: '', picture: '' });

  const loginWithGoogle = async (credential) => {
    try {
      const r = await postAuthGoogle(credential);
      // Expecting { status: 'success', user: { ... } }
      if (r && r.data && r.data.status === 'success' && r.data.user) {
        setUser(r.data.user);
        return { ok: true, user: r.data.user };
      }
      return { ok: false, error: r?.data?.message || 'Unknown response' };
    } catch (e) {
      return { ok: false, error: e.message || String(e) };
    }
  };

  const logout = async () => {
    try {
      await client.post('/auth/logout');
    } catch (e) {
      console.warn('Logout backend error', e?.message || e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, continueAsGuest, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}