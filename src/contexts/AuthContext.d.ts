// Type definitions for AuthContext
import { User } from '../types';

export interface AuthContextState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export interface AuthContextValue extends AuthContextState {
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<User>;
  checkAuthStatus: () => Promise<boolean>;
}

declare const AuthContext: React.Context<AuthContextValue>;

export const useAuth: () => AuthContextValue;
export const AuthProvider: React.FC<{children: React.ReactNode}>;

export default AuthContext;
