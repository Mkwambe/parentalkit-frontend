import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { User, LoginCredentials, RegisterData, UpdateProfileData } from '../types';

// Create auth context
interface AuthContextState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthContextState {
  register: (userData: RegisterData) => Promise<any>;
  login: (credentials: LoginCredentials) => Promise<any>;
  logout: () => void;
  updateProfile: (profileData: UpdateProfileData) => Promise<any>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Auth provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on component mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if user is already logged in
        if (authService.isAuthenticated()) {
          // Verify token is still valid
          await authService.verifyToken();
          // Get current user from local storage
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        // If token verification fails, user will be logged out
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Register a new user
  const register = async (userData: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.register(userData);
      setUser(result.user);
      return result;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.login(credentials);
      setUser(result.user);
      return result;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Update user profile
  const updateProfile = async (profileData: UpdateProfileData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await authService.updateProfile(profileData);
      setUser({ ...user, ...updatedUser });
      return updatedUser;
    } catch (err: any) {
      setError(err.message || 'Profile update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    try {
      return await authService.changePassword(currentPassword, newPassword);
    } catch (err: any) {
      setError(err.message || 'Password change failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value: AuthContextValue = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
