import React, { createContext, useContext, useState } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('civicfix_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      const data = response.data;
      localStorage.setItem('civicfix_token', data.token);
      localStorage.setItem('civicfix_user', JSON.stringify(data));
      setUser(data);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid email or password',
      };
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = () => {
    const guestUser = {
      id: 0,
      firstName: 'Guest',
      lastName: 'User',
      email: 'guest@civicfix.local',
      role: 'ROLE_CITIZEN',
      isGuest: true,
      token: 'guest-session-token',
    };
    localStorage.setItem('civicfix_token', guestUser.token);
    localStorage.setItem('civicfix_user', JSON.stringify(guestUser));
    setUser(guestUser);
  };

  const logout = () => {
    localStorage.removeItem('civicfix_token');
    localStorage.removeItem('civicfix_user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsGuest, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);