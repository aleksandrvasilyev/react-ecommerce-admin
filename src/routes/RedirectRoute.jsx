import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const RedirectRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RedirectRoute;
