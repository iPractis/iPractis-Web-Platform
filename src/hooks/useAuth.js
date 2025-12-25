//
"use client";
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include' // Include httpOnly cookies
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
    } catch (error) {
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      setAuthenticated(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API fails
      setUser(null);
      setAuthenticated(false);
      window.location.href = '/login';
    }
  };

  const refreshAuth = () => {
    setLoading(true);
    checkAuthStatus();
  };

  // ✅ Added this function to fix the error
  const optimisticallyUpdateUserEmail = (newEmail) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        email: newEmail
      };
    });
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      authenticated, 
      logout, 
      refreshAuth,
      optimisticallyUpdateUserEmail // ✅ Exported here
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};