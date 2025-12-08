import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // "doctor" or "therapist"
  const [role, setRole] = useState("doctor");

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{ role, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
