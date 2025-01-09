import { useContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom'
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { Auth, token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for initial auth check to complete
    if (token !== undefined) {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!Auth) {
    return <Navigate to='/login' replace />; // Added replace for cleaner navigation
  }

  return children;
};

export default ProtectedRoute;
