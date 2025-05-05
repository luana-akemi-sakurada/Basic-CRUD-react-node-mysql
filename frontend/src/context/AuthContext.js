import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in on page load
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // In a basic system, we fetch user data using the stored ID
      axios.get(`http://localhost:8000/protected`, {
        headers: { Authorization: userId }
      })
      .then(response => {
        setCurrentUser(response.data.user);
      })
      .catch(error => {
        console.error('Auth check failed:', error);
        localStorage.removeItem('userId');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  
  // Register function
  const register = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/register', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  };
  
  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      const { user } = response.data;
      
      // Store user ID in localStorage (basic approach)
      localStorage.setItem('userId', user.id);
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('userId');
    setCurrentUser(null);
  };
  
  const value = {
    currentUser,
    loading,
    register,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);