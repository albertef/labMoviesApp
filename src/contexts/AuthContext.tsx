import React, { createContext, useEffect, useState } from "react";
import { AuthUser } from "../types/movieAppTypes";
import * as backend from "../api/backend-api";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

const TOKEN_KEY = "moviesapp_token";
const USER_KEY = "moviesapp_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token && !user) {
      // Fallback placeholder if we have a token but no user data.
      setUser({ id: "me", email: "user@example.com" });
    }
  }, [token, user]);

  const login = async (username: string, password: string) => {
    const resp = await backend.login({ username, password });
    setToken(resp.token);
    localStorage.setItem(TOKEN_KEY, resp.token);
    setUser(resp.user);
    localStorage.setItem(USER_KEY, JSON.stringify(resp.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const value: AuthContextValue = {
    user,
    token,
    login,
    logout,
    isAuthenticated: Boolean(token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
