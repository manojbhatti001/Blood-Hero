import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user data on initial mount
  useEffect(() => {
    const loadUserFromStorage = async () => {
      setLoading(true);
      try {
        await checkAuthStatus();
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!token) {
      return false;
    }
    
    // Set token in axios headers
    api.defaults.headers.common['x-auth-token'] = token;
    
    // If we have stored user data, use it immediately to prevent UI flicker
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (e) {
        console.error('Error parsing stored user data:', e);
      }
    }
    
    try {
      // Verify token validity with backend
      const response = await api.get('/auth/me');
      const userData = response.data;
      
      // Update user data and store in localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return true;
    } catch (err) {
      console.error('Token validation error:', err);
      
      // Only clear if it's an authentication error
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        setUser(null);
      }
      
      return false;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      
      // Send registration request to backend
      const res = await api.post('/auth/register', userData);
      
      // Save token and user data to local storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('userType', res.data.user.userType || 'donor');
      
      // Set auth token header
      api.defaults.headers.common['x-auth-token'] = res.data.token;
      
      // Set user data
      setUser(res.data.user);
      
      // Redirect to dashboard
      navigate('/dashboard');
      
      toast.success('Registration successful!');
      return res.data;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        // Store token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userType', response.data.user.userType || 'donor');
        
        // Set auth token header
        api.defaults.headers.common['x-auth-token'] = response.data.token;
        
        setUser(response.data.user);
        toast.success('Login successful!');
        navigateToUserDashboard(response.data.user.userType || 'donor');
      }
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.msg || 'Login failed';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    
    // Remove auth header
    delete api.defaults.headers.common['x-auth-token'];
    
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navigateToUserDashboard = (userType) => {
    switch (userType) {
      case 'donor':
        navigate('/dashboard');
        break;
      case 'hospital':
      case 'ngo':
        navigate('/organization-dashboard');
        break;
      case 'individual':
        navigate('/requester-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    try {
      const isAuthenticated = await checkAuthStatus();
      return isAuthenticated;
    } catch (err) {
      console.error('Error refreshing user data:', err);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      register,
      login,
      logout,
      refreshUserData,
      isAuthenticated: !!user
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
