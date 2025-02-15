import { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";
import api, { setLogoutHandler } from "../utils/axiosInstance";

// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleLogin = (response, setToken = true) => {
    if (setToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    setIsAuthenticated(true);
    setUser(response.data.user);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/users/me");
        handleLogin(response, false);
      } catch (error) {
        console.log("Initialize auth error: ", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    setLogoutHandler(handleLogout);
    initializeAuth();

    // const validateToken = async () => {
    //   // if no access token
    //   if (!token) {
    //     setLoading(false);
    //     return handleLogout();
    //   }

    //   try {
    //     // send request to validate access token
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/users/me`,
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //         withCredentials: true,
    //         validateStatus: (status) => status === 200 || status === 401,
    //       }
    //     );

    //     // if access token expired
    //     if (response.status === 401) {
    //       const response = await axios.post(
    //         `${import.meta.env.VITE_API_URL}/refresh`,
    //         {},
    //         { withCredentials: true }
    //       );

    //       // if refresh token expired
    //       if (response.status === 403) {
    //         return handleLogout();
    //       }

    //       // if refresh token valid
    //       return handleLogin(response);
    //     }

    //     // if access token valid
    //     handleLogin(response, false);
    //   } catch (error) {
    //     console.log(error);
    //     handleLogout();
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // validateToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.statusText !== "OK") {
        throw new Error(response.response.data.error);
      }

      setError(null);
      handleLogin(response);
    } catch (error) {
      console.log("Error: ", error);

      const errorMessage = error.response?.data?.error || error.message;
      setError(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      handleLogout();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
