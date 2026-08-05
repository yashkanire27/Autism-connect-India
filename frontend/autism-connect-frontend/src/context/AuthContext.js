import React, { createContext, useContext, useState } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("aci_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    persistSession(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await authApi.register(payload);
    persistSession(data);
    return data;
  };

  const persistSession = (data) => {
    const sessionUser = {
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem("aci_token", data.token);
    localStorage.setItem("aci_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem("aci_token");
      localStorage.removeItem("aci_user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
