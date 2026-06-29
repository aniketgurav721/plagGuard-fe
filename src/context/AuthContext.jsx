import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

/**
 * Provides authentication state and sign-in/sign-out actions to the app.
 * Persists user session in localStorage.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Stores authenticated user data in state and localStorage.
   * @param {{ email: string, token: string }} userData
   */
  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  /** Clears authentication state from memory and localStorage. */
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
