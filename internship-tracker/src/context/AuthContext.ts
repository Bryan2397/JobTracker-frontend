import { createContext } from "react";

interface AuthContextType {
  email: string | null;
  token: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export default AuthContext;
