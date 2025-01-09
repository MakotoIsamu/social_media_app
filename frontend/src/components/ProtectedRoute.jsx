import { useContext } from "react";
import {Navigate} from 'react-router-dom'
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { Auth } = useContext(AuthContext);

  if (!Auth) return <Navigate to='/login' />

  return children;
};

export default ProtectedRoute;
