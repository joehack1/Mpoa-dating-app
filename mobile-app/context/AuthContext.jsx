import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // API base URL - adjust for mobile
  const API_URL = 'http://localhost:5000/api'; // or your backend URL

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('dating_token');
        if (token) {
          const response = await axios.get(`${API_URL}/profiles/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        }
      } catch (error) {
        await AsyncStorage.removeItem('dating_token');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      await AsyncStorage.setItem('dating_token', response.data.token);
      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed. Check your credentials.' 
      };
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name
      });
      
      await AsyncStorage.setItem('dating_token', response.data.token);
      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed.' 
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('dating_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};