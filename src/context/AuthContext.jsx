import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const validateToken = async () => {
      try {
        if (!token) {
          return setLoading(false);
        }

        const response = await axios.get(`http://localhost:3000/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (e) {
        console.log(e.message);
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`http://localhost:3000/login`, {
        email: email,
        password: password,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      setIsAuthenticated(true);

      // !TODO вернуть user в ответе при logine с сервера
      // setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
