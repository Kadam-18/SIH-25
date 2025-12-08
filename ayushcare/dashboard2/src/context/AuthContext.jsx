import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setName(storedName || "");
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/user-role/`, {
        headers: {
          Authorization: `Bearer ${tokenToVerify}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRole(data.role);
          setName(data.name || "");
        } else {
          logout();
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (tokenData, roleData, nameData) => {
    localStorage.setItem("token", tokenData);
    localStorage.setItem("role", roleData);
    localStorage.setItem("name", nameData);
    setToken(tokenData);
    setRole(roleData);
    setName(nameData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("user_id");
    setToken(null);
    setRole(null);
    setName("");
  };

  return (
    <AuthContext.Provider value={{ role, name, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
