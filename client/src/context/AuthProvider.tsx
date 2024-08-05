import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  user: any;
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

  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user?.email) {
      setUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
