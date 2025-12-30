"use client";
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface User {
  id?: string;
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  profile_image?: string;
  [key: string]: any;
}

export interface Teacher {
  id?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  teacher: Teacher | null;
  loading: boolean;
  authenticated: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => void;
  optimisticallyUpdateUserEmail: (newEmail: string) => void;
  role?: string;
  firstName?: string;
  lastName?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include' // Include httpOnly cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setTeacher(data.teacher || null);
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
      setTeacher(null);
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
  const optimisticallyUpdateUserEmail = (newEmail: string) => {
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

  console.log("Auth state changed:", { user, authenticated, loading, teacher });
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      teacher,
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
  return {
    ...context,
    role: context.user?.role,
    firstName: context.user?.first_name,
    lastName: context.user?.last_name,
  };
};