import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔥 THIS SHOULD TRIGGER /api/users/me
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api
      .get("/api/users/me")
      .then((res) => {
        console.log("USER LOADED", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("AUTH ERROR", err);
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    const res = await api.get("/api/users/me");
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
