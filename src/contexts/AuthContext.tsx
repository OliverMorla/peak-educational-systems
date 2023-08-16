"use client";

import { createContext, useState, useContext } from "react";

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState("User");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const register = async (inputs: RequestInit) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth/register`,
      {
        method: "POST",
        body: JSON.stringify(inputs),
      }
    );
    const data = await response.json();
    setUser(data.user);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
