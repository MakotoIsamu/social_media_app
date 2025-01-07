import React, { createContext, useEffect, useState } from 'react';
import { BACKEND_URI } from '../utils';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('AuthToken') || '');

  const checkAuth = async () => {
    if (!token) {
      setAuth(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/checkAuth`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Authentication check failed');

      const data = await response.json();
      setAuth(data.authenticated);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      setAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]); // Re-run when the token changes

  return (
    <AuthContext.Provider value={{ Auth, setToken, token, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
