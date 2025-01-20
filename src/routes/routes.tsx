import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageLayout } from '@/layouts/PageLayout';
import { lazy, Suspense } from 'react';
import { Routes } from '@/utils/routesConfig';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorBoundary, Loader } from '@/components/common';
import { toastConfig } from '@/utils/toast.config';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

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
      element: (
        <ErrorBoundary>
          <PageLayout />
        </ErrorBoundary>
      ),
      children: [
        {
          element: (
            <Suspense fallback={<Loader />}>
              <ProtectedRoute />
            </Suspense>
          ),
          children: [
            {
              path: Routes.HOME,
              element: <Home />,
            },
            {
              path: Routes.ME,
              element: <Me />,
            },
            {
              path: Routes.FORMS_NEW,
              element: <FormsNew />,
            },
            {
              path: Routes.FORMS_EDIT,
              element: <FormsEdit />,
            },
            {
              path: Routes.FORM_RESPONSES,
              element: <FormResponses />,
            },
            {
              path: Routes.FORM_RESPONSE,
              element: <FormResponse />,
            },
            {
              path: Routes.FORM_PAGE,
              element: <FormPage />,
            },
            {
              path: Routes.NOT_FOUND,
              element: <NotFoundPage />,
            },
          ],
        },
      ],
    },
  ];

  const notAuthRoutes = [
    {
      path: Routes.HOME,
      element: (
        <>
          <ToastContainer {...toastConfig} />
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          </ErrorBoundary>
        </>
      ),
    },
    {
      path: Routes.LOGIN,
      element: (
        <>
          <ToastContainer {...toastConfig} />
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          </ErrorBoundary>
        </>
      ),
    },
    {
      path: Routes.SIGNUP,
      element: (
        <>
          <ToastContainer {...toastConfig} />
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          </ErrorBoundary>
        </>
      ),
    },
    {
      path: Routes.NOT_FOUND,
      element: <NotFoundPage />,
    },
  ];

  const routes = user ? authRoutes : notAuthRoutes;
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
