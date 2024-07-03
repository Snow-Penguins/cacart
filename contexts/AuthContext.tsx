"use client";
// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  const [user, setUser] = useState<any | null>(null);

  const signIn = (userData: any) => {
    localStorage.setItem("cacartUser", JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = () => {
    localStorage.removeItem("cacartUser");
    setUser(null);
  };

  useEffect(() => {
    const cacartUser = localStorage.getItem("cacartUser");
    if (cacartUser !== null && cacartUser !== undefined) {
      setUser(JSON.parse(cacartUser));
    } else {
      setUser(null);
    }
  }, []);

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
