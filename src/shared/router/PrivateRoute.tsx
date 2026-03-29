import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from './Routers.const.ts';

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}

export const PrivateRoute = ({
  children,
  isAuthenticated,
  redirectTo = AppRoutes.LOGIN
}: PrivateRouteProps) => {
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectTo} replace />
  );
};
