import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // API base URL - use environment variable or default
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    const token = localStorage.getItem('dating_token')
    if (token) {
      axios.get(`${API_URL}/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data)
      })
      .catch(() => {
        localStorage.removeItem('dating_token')
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      })
      
      localStorage.setItem('dating_token', response.data.token)
      setUser(response.data.user)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed. Check your credentials.' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData)
      localStorage.setItem('dating_token', response.data.token)
      setUser(response.data.user)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed. Try again.' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('dating_token')
    setUser(null)
  }

  const updateProfile = async (data) => {
    try {
      const token = localStorage.getItem('dating_token')
      const response = await axios.put(`${API_URL}/profiles/update`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data.user)
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Update failed' 
      }
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    API_URL
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}