import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { PageLayout } from '@/layouts/PageLayout';
import { lazy, Suspense } from 'react';
import { ROUTES } from '@/utils/routesConfig';
import { ProtectedRoute } from './ProtectedRoute';
import { toastConfig } from '@/utils/toast.config';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ErrorComponent } from '@/components/ui/ErrorComponent/ErrorComponent';
import { Loader } from '@/components/ui/Loader';

const Home = lazy(() => import('@/pages/home/Page').then((module) => ({ default: module.Home })));
const Me = lazy(() => import('@/pages/me/Page').then((module) => ({ default: module.Me })));
const FormsNew = lazy(() =>
  import('@/pages/formsNew/Page').then((module) => ({ default: module.FormsNew }))
);
const FormsEdit = lazy(() =>
  import('@/pages/formsEdit/Page').then((module) => ({ default: module.FormsEdit }))
);
const FormPage = lazy(() =>
  import('@/pages/formPage').then((module) => ({ default: module.FormPage }))
);
const FormResponses = lazy(() =>
  import('@/pages/formResponses/Page').then((module) => ({ default: module.FormResponses }))
);
const FormResponse = lazy(() =>
  import('@/pages/formResponse/Page').then((module) => ({ default: module.FormResponse }))
);
const Login = lazy(() =>
  import('@/pages/login/Page').then((module) => ({ default: module.Login }))
);
const Signup = lazy(() =>
  import('@/pages/signup/Page').then((module) => ({ default: module.Signup }))
);

const NotFoundPage = lazy(() =>
  import('@/pages/notFoundPage/Page').then((module) => ({ default: module.NotFound }))
);

export const AppRouter = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const isUserReady = useSelector((state: RootState) => state.user.isUserReady);

  if (isLoading || !isUserReady) {
    return <Loader />;
  }

  const authRoutes = [
    {
      element: <PageLayout />,
      errorElement: <ErrorComponent />,
      children: [
        {
          element: (
            <Suspense fallback={<Loader />}>
              <ProtectedRoute />
            </Suspense>
          ),
          children: [
            {
              path: ROUTES.HOME,
              element: <Home />,
            },
            {
              path: ROUTES.ME,
              element: <Me />,
            },
            {
              path: ROUTES.FORMS_NEW,
              element: <FormsNew />,
            },
            {
              path: ROUTES.FORMS_EDIT,
              element: <FormsEdit />,
            },
            {
              path: ROUTES.FORM_RESPONSES,
              element: <FormResponses />,
            },
            {
              path: ROUTES.HOME,
              element: <Home />,
            },
            {
              path: ROUTES.FORM_RESPONSE,
              element: <FormResponse />,
            },
            {
              path: ROUTES.FORM_PAGE,
              element: <FormPage />,
            },
            {
              path: ROUTES.NOT_FOUND,
              element: <NotFoundPage />,
            },
          ],
        },
      ],
    },
  ];

  const notAuthRoutes = [
    {
      path: ROUTES.LOGIN,
      errorElement: <ErrorComponent />,
      element: (
        <>
          <ToastContainer {...toastConfig} />
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        </>
      ),
    },
    {
      path: ROUTES.FORM_PAGE,
      errorElement: <ErrorComponent />,
      element: (
        <>
          <ToastContainer {...toastConfig} />
          <Suspense fallback={<Loader />}>
            <FormPage />,
          </Suspense>
        </>
      ),
    },
    {
      path: ROUTES.SIGNUP,
      errorElement: <ErrorComponent />,
      element: (
        <>
          <ToastContainer {...toastConfig} />
          <Suspense fallback={<Loader />}>
            <Signup />
          </Suspense>
        </>
      ),
    },
    {
      path: ROUTES.NOT_FOUND,
      errorElement: <ErrorComponent />,
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
  ];

  const routes = user ? authRoutes : notAuthRoutes;
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
