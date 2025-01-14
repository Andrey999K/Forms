import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@/utils/routesConfig';
import { useGetCurrentUserQuery } from '@/redux/auth';

export const ProtectedRoute = () => {
  //   const { data: user, isLoading } = useGetCurrentUserQuery();
  //   const { user, loading } = useAuth();

  const { data: user, isLoading: loading } = useGetCurrentUserQuery();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return user ? <Outlet /> : <Navigate to={Routes.LOGIN} replace />;
};
