import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
  token: string;
  setUser: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }>
  >;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [token, setToken] = useState<string>("");

  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const token = localStorage.getItem("token");
    if (user?.email && token) {
      setUser(user);
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
