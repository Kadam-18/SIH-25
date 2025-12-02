import React, { createContext, useContext, useState, useEffect } from "react";
import { apiGet } from "../api";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);

  // Load user profile and settings on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark-theme");
      document.body.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  const loadUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Load user profile
      const profileRes = await apiGet("/api/patient/profile/", token);
      if (profileRes && profileRes.success && profileRes.data) {
        setUser({
          name: profileRes.data.full_name || "",
          email: profileRes.data.user_email || profileRes.data.email || "",
        });
      }

      // Load settings (theme, language)
      const settingsRes = await apiGet("/api/user/settings/", token);
      if (settingsRes && settingsRes.success && settingsRes.data) {
        const settings = settingsRes.data;
        setTheme(settings.theme || "light");
        setLanguage(settings.language || "en");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    // Save to backend
    const token = localStorage.getItem("token");
    if (token) {
      apiGet("/api/user/settings/", token).then((res) => {
        if (res && res.success) {
          const settings = { ...res.data, theme: newTheme };
          fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/user/settings/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(settings),
          });
        }
      });
    }
  };

  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Save to backend
    const token = localStorage.getItem("token");
    if (token) {
      apiGet("/api/user/settings/", token).then((res) => {
        if (res && res.success) {
          const settings = { ...res.data, language: newLanguage };
          fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/user/settings/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(settings),
          });
        }
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        theme,
        setTheme: updateTheme,
        language,
        setLanguage: updateLanguage,
        loading,
        loadUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

