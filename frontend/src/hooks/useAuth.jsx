import { useState, createContext, useContext, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { taskService } from '../services/task.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Falta almcenar token en el localStorage
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const data = await authService.login(username, password);
      if (data && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);
        const tasks = await taskService.getTasks(data.user._id);
        console.log("🚀 ~ login ~ tasks:", tasks)
      }
    } catch(error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.register(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    authService,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};