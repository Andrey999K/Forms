import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routesPaths';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Loader } from '@/components/ui/Loader';
import { ReactNode } from 'react';
import { resetStore as resetStoreResponse } from '@/redux/response';
import { resetStore as resetStoreForm } from '@/redux/form';
import { formApi } from '@/redux/form/formApi.ts';
import { responseApi } from '@/redux/response/responseApi.ts';

type Props = {
  children: ReactNode;
  inverted?: boolean;
};

export const ProtectedRoute = ({ children, inverted = false }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const isUserReady = useSelector((state: RootState) => state.user.isUserReady);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  if (!isUserReady)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (inverted) {
    return user ? <Navigate to={ROUTES.HOME} /> : children;
  }

  if (user) {
    return children;
  } else {
    dispatch(resetStoreResponse());
    dispatch(resetStoreForm());
    formApi.util.resetApiState();
    responseApi.util.resetApiState();
    navigate(ROUTES.LOGIN);
  }
};
