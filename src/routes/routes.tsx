import { createHashRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { ROUTES } from '@/routes/routesPaths';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorComponent } from '@/components/ui/ErrorComponent/ErrorComponent';
import { PageLayout } from '@/layouts/PageLayout';
import { Loader } from '@/components/ui/Loader';
import { FallbackLoader } from '@/components/FallbackLoader';
import {
  FormPage,
  FormResponse,
  FormResponses,
  FormsEdit,
  FormsNew,
  Home,
  Login,
  Me,
  NotFoundPage,
  RecoveryPassword,
  Signup,
} from './lazyPages';

export const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      errorElement: <ErrorComponent />,
      element: (
        <Suspense fallback={<FallbackLoader />}>
          <ProtectedRoute>
            <PageLayout />
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        { path: ROUTES.HOME, element: <Home /> },
        { path: ROUTES.ME, element: <Me /> },
        { path: ROUTES.FORMS_NEW, element: <FormsNew /> },
        { path: ROUTES.FORMS_EDIT, element: <FormsEdit /> },
        { path: ROUTES.FORM_RESPONSES, element: <FormResponses /> },
        { path: ROUTES.FORM_RESPONSE, element: <FormResponse /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
    {
      errorElement: <ErrorComponent />,
      element: (
        <Suspense fallback={<FallbackLoader />}>
          <ProtectedRoute inverted>
            <Outlet />
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        { path: ROUTES.LOGIN, element: <Login /> },
        { path: ROUTES.SIGNUP, element: <Signup /> },
        { path: ROUTES.RECOVERY_PASSWORD, element: <RecoveryPassword /> },
      ],
    },
    {
      errorElement: <ErrorComponent />,
      path: ROUTES.FORM_PAGE,
      element: (
        <Suspense fallback={<Loader />}>
          <PageLayout>
            <FormPage />
          </PageLayout>
        </Suspense>
      ),
    },
  ];

  return <RouterProvider router={createHashRouter(routes)} />;
};
