import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/utils/routesConfig';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Loader } from '@/components/ui/Loader';

export const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const isUserReady = useSelector((state: RootState) => state.user.isUserReady);

  if (isLoading || !isUserReady) return <Loader />;

  return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};
