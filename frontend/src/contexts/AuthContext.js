import { createContext, useEffect, useState } from "react";
import { BACKEND_URI } from "../utils";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(false);

  const checkAuth = async () => {
    const response = await fetch(`${BACKEND_URI}/api/auth/checkAuth`, {
        credentials: 'include'
    })
    if(!response.ok){
        const data = await response.json()
        return toast.error(data.error)
    }
    const data = await response.json()
    setAuth(data.authenticated)
  }

  useEffect(() => {
    checkAuth()
  }, []);

  return <AuthContext.Provider value={{Auth}}>{children}</AuthContext.Provider>;
};
