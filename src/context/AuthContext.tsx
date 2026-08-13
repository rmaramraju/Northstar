import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { DEMO_BROKER } from '../data/initialData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  loginAsDemoBroker: () => void;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('northstar_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('northstar_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('northstar_user');
    }
  }, [user]);

  const login = (email: string, pass: string): boolean => {
    // For demo purposes, accept demo broker or any valid email
    if (email.toLowerCase().includes('jenkins') || email.toLowerCase().includes('apex') || pass === 'password123' || email.includes('@')) {
      const loggedUser = {
        ...DEMO_BROKER,
        email: email || DEMO_BROKER.email,
      };
      setUser(loggedUser);
      return true;
    }
    return false;
  };

  const loginAsDemoBroker = () => {
    setUser(DEMO_BROKER);
  };

  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      id: `usr_broker_${Date.now()}`,
      name: userData.name || 'New Broker',
      email: userData.email || 'broker@agency.com',
      agencyName: userData.agencyName || 'Independent Risk Agency',
      npn: userData.npn || '19000000',
      licenseState: userData.licenseState || 'CA',
      role: 'Broker',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemoBroker,
        signup,
        logout,
      }}
    >
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
