import { LoginCredentials } from '../contexts/AuthContext.d';

// Create axios instance with base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface AuthResponse {
  token: string;
  user: any;
}

interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  bio?: string;
  location?: string;
}

// Authentication service
const authService = {
  // Register user
  register: async (userData: RegisterUserData): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error: any) {
      throw error.message ? error : new Error('Network error');
    }
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      return data;
    } catch (error: any) {
      throw error.message ? error : new Error('Network error');
    }
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: (): any => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('token') !== null;
  },

  // Verify token is valid
  verifyToken: async (): Promise<any> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Token verification failed');
      }
      
      return await response.json();
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error.message ? error : new Error('Network error');
    }
  },

  // Update user profile
  updateProfile: async (profileData: ProfileData): Promise<any> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      // Update stored user data
      const currentUser = authService.getCurrentUser();
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return data;
    } catch (error: any) {
      throw error.message ? error : new Error('Network error');
    }
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<any> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await fetch(`${API_URL}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      return await response.json();
    } catch (error: any) {
      throw error.message ? error : new Error('Network error');
    }
  }
};

export default authService;
