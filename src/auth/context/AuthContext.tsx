// Context de Autenticación - Gestiona el estado global de auth
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth.types';
import { mockAuthService } from '../services/mockAuthService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario al montar
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await mockAuthService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: RegisterCredentials) => {
    const newUser = await mockAuthService.register(credentials);
    // Auto-login después del registro
    await signIn({ email: credentials.email, password: credentials.password });
    // En MOCK, verificamos el email automáticamente
    setTimeout(() => {
      mockAuthService.verifyEmail(newUser.id);
      loadUser();
    }, 2000);
  };

  const signIn = async (credentials: LoginCredentials) => {
    const loggedUser = await mockAuthService.login(credentials);
    setUser(loggedUser);
  };

  const signOut = async () => {
    await mockAuthService.logout();
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    await mockAuthService.forgotPassword(email);
  };

  const verifyEmail = async () => {
    if (!user) return;
    await mockAuthService.verifyEmail(user.id);
    loadUser();
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = await mockAuthService.updateProfile(user.id, updates);
    setUser(updatedUser);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    verifyEmail,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

