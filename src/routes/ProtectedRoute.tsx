import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/utils/routesConfig';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Loader } from '@/components/ui/Loader';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  inverted?: boolean;
};

export const ProtectedRoute = ({ children, inverted = false }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const isUserReady = useSelector((state: RootState) => state.user.isUserReady);

  if (!isUserReady)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (inverted) {
    return user ? <Navigate to={ROUTES.HOME} /> : children;
  }

  return user ? children : <Navigate to={ROUTES.LOGIN} />;
};
