"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
  signIn: (userData: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const Backend_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      validateToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const interval = setInterval(
        () => {
          refreshAuthToken(token);
        },
        15 * 60 * 1000,
      );
      return () => clearInterval(interval);
    }
  }, [token]);

  const validateToken = async (token: string) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/auth/validate`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUser(response.data.user);
    } catch (error) {
      console.log("Token validation failed", error);
      setUser(null);
    }
  };

  const refreshAuthToken = async (currentToken: string) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/auth/refresh`,
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` },
        },
      );
      const newToken = response.data.access_token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } catch (error) {
      console.log("Token refresh failed", error);
    }
  };

  const signIn = (userData: any) => {
    localStorage.setItem("token", userData.access_token);
    setUser(userData);
    setToken(userData.access_token);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
