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

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(
      decodeURIComponent(
        decoded
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(""),
      ),
    );
  } catch {
    return null;
  }
}

function buildUserFromToken(token: string): AuthUser | null {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  return {
    id:
      typeof payload.sub === "string"
        ? payload.sub
        : typeof payload.userId === "string"
          ? payload.userId
          : "me",
    email: typeof payload.email === "string" ? payload.email : undefined,
    username:
      typeof payload.username === "string"
        ? payload.username
        : typeof payload.preferred_username === "string"
          ? payload.preferred_username
          : undefined,
    name: typeof payload.name === "string" ? payload.name : undefined,
  };
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
    if (stored) {
      try {
        return JSON.parse(stored) as AuthUser;
      } catch (error) {
        localStorage.removeItem(USER_KEY);
      }
    }

    const currentToken = localStorage.getItem(TOKEN_KEY);
    if (currentToken) {
      const decodedUser = buildUserFromToken(currentToken);
      if (decodedUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(decodedUser));
        return decodedUser;
      }
    }

    return null;
  });

  useEffect(() => {
    if (token && !user) {
      const decodedUser = buildUserFromToken(token);
      if (decodedUser) {
        setUser(decodedUser);
        localStorage.setItem(USER_KEY, JSON.stringify(decodedUser));
      }
    }
  }, [token, user]);

  const login = async (username: string, password: string) => {
    const resp = await backend.login({ username, password });
    setToken(resp.token);
    localStorage.setItem(TOKEN_KEY, resp.token);

    const decodedUser = buildUserFromToken(resp.token);
    const effectiveUser = {
      ...decodedUser,
      ...resp.user,
    } as AuthUser;

    setUser(effectiveUser);
    localStorage.setItem(USER_KEY, JSON.stringify(effectiveUser));
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
