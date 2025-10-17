import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('usuario');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  //guarda usuario en sessionStorage
  const isLoggedIn = useMemo(() => !!user, [user]);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('usuario');
    cookies.remove('jwt-auth');
  };

  const login = (token, user) => {
    setUser(user);
    sessionStorage.setItem('usuario', JSON.stringify(user));
    cookies.set('jwt-auth', token);
  };

  useEffect(() => {
    const token = cookies.get('jwt-auth');
    const storedUser = sessionStorage.getItem('usuario');
    
    // helper para decodificar JWT sin depender de jwt-decode (evita problemas ESM/CJS con Vite)
    const decodeJWT = (tkn) => {
      try {
        const parts = tkn.split('.');
        if (parts.length !== 3) return null;
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
        // atob en navegador decodifica base64
        const jsonPayload = decodeURIComponent(atob(padded).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (err) {
        return null;
      }
    };

    if (token && storedUser) {
      try {
        const decoded = decodeJWT(token);
        if (!decoded) {
          // no se pudo decodificar, limpiar
          throw new Error('Token inválido');
        }
        // si el token ya expiró (exp*1000 < ahora) entonces hacer logout
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
      } catch (error) {
        console.error('Error al decodificar token:', error);
        cookies.remove('jwt-auth');
        sessionStorage.removeItem('usuario');
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, setIsLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
