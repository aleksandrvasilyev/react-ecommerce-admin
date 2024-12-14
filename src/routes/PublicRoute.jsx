import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
