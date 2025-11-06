import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setIsAuthenticated(true);
    navigate("/admin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    navigate("/admin");
  };

  return { isAuthenticated, login, logout };
};
