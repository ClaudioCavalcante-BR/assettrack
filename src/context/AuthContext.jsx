import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(localStorage.getItem("assettrack.logged") === "1");
  }, []);

  const login = () => {
    localStorage.setItem("assettrack.logged", "1");
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("assettrack.logged");
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
