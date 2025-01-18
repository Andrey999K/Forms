import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '@/utils/routesConfig';
import { ErrorBoundary, Loader } from '@/components/common';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const isUserReady = useSelector((state: RootState) => state.user.isUserReady);

  if (isLoading || !isUserReady) return <Loader />;

  return user ? (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  ) : (
    <Navigate to={Routes.LOGIN} replace />
  );
};
