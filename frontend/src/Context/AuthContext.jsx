import { createContext, useContext, useMemo, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  const handleAuthSuccess = (data) => {
    const { token, user } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };

  // Signup
  const signup = async (userData) => {
    setLoading(true);

    try {
      const { data } = await api.post("/auth/register", userData);

      if (data.success) {
        handleAuthSuccess(data);
      }

      return data;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (userData) => {
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", userData);

      if (data.success) {
        handleAuthSuccess(data);
      }

      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signup,
      login,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };