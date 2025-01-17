import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@/utils/routesConfig';
import { Loader } from '@/components/common';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

export const ProtectedRoute = () => {
  const { currentUser, isAuthLoading } = useFirebaseAuth();

  if (isAuthLoading) return <Loader />;
  return currentUser ? <Outlet /> : <Navigate to={Routes.LOGIN} replace />;
};
