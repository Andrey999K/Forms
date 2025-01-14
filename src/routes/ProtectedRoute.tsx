import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@/utils/routesConfig';
import { useGetCurrentUserQuery } from '@/redux/auth';
import { Loader } from '@/components/common';

export const ProtectedRoute = () => {
  const { data: user, isLoading: loading } = useGetCurrentUserQuery();

  if (loading) return <Loader />;
  return user ? <Outlet /> : <Navigate to={Routes.LOGIN} replace />;
};
