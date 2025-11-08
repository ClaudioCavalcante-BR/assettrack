import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { isLogged } = useAuth();
  const location = useLocation();
  if (!isLogged) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
