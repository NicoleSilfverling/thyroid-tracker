import React, { createContext, useState } from "react";

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [activeIcon, setActiveIcon] = useState("home");

  return (
    <NavContext.Provider value={{ activeIcon, setActiveIcon }}>
      {children}
    </NavContext.Provider>
  );
};
