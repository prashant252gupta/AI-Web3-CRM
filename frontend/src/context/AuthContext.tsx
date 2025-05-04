'use client';
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import api from '@/lib/api';

interface User {
  _id: string;
  email: string;
  role: string;
  walletAddress?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser]   = useState<User | null>(null);

  // On mount, load token & fetch user
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      fetchMe();
    }
  }, []);

  // Fetch current user
  const fetchMe = async () => {
    try {
      const res = await api.get<User>('/auth/me');
      setUser(res.data);
    } catch {
      // invalid token or not logged in
      handleLogout();
    }
  };

  // Log in and store token
  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string }>('/auth/login', {
      email,
      password,
    });
    const t = res.data.token;
    localStorage.setItem('token', t);
    setToken(t);
    await fetchMe();
  };

  // Clear everything
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
