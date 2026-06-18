'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, apiClient } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const response = await authService.getProfile();
      
      if (response.success && response.data) {
        setState({
          user: response.data as User,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
      } else {
        localStorage.removeItem('auth_token');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      localStorage.removeItem('auth_token');
      setState(prev => ({ ...prev, isLoading: false, error: null }));
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.data) {
        const { token, user } = response.data as any;
        
        apiClient.setAuthToken(token);
        
        setState({
          user: user as User,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
        
        router.push('/admin/dashboard');
        
        return { success: true };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Une erreur est survenue lors de la connexion';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, [router]);

  const logout = useCallback(async () => {
    await authService.logout();
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
    router.push('/admin/login');
  }, [router]);

  return {
    ...state,
    login,
    logout,
    checkAuth,
  };
}
