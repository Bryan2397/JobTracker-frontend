import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(() =>
    localStorage.getItem("email"),
  );
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");

    if (storedEmail && storedToken) {
      setEmail(storedEmail);
      setToken(storedToken);
    }
  }, []);

  const login = (email: string, token: string) => {
    setEmail(email);
    setToken(token);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
  };

  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  const logout = () => {
    setEmail(null);
    setToken(null);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    console.log("deleted both items");
  };

  return (
    <AuthContext.Provider value={{ email, token, getToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
