'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Additional layer of authentication protection for sensitive pages
 * 
 * Usage:
 * <ProtectedRoute>
 *   <YourAdminPage />
 * </ProtectedRoute>
 */
export function ProtectedRoute({ 
  children, 
  requiredRole = 'admin',
  redirectTo = '/admin/login' 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Wait for auth check to complete
    if (isLoading) {
      return;
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      const currentPath = window.location.pathname;
      router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    // Check role if required
    if (requiredRole && user?.role !== requiredRole) {
      // User doesn't have required role - redirect to dashboard
      router.push('/admin/dashboard');
      return;
    }

    // All checks passed
    setIsAuthorized(true);
  }, [isAuthenticated, isLoading, user, requiredRole, redirectTo, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Don't render content until authorized
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
