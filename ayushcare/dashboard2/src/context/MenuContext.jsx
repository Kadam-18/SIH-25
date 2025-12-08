import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <MenuContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
