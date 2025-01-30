import { createBrowserRouter, Outlet, RouteObject, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '@/utils/routesConfig';
import { ProtectedRoute } from './ProtectedRoute';
import { ErrorComponent } from '@/components/ui/ErrorComponent/ErrorComponent';
import { Loader } from '@/components/ui/Loader';
import { PageLayout } from '@/layouts/PageLayout';

const Home = lazy(() => import('@/pages/home/Page').then((module) => ({ default: module.Home })));
const Me = lazy(() => import('@/pages/me/Page').then((module) => ({ default: module.Me })));
const FormsNew = lazy(() =>
  import('@/pages/formsNew/Page').then((module) => ({ default: module.FormsNew }))
);
const FormsEdit = lazy(() =>
  import('@/pages/formsEdit/Page').then((module) => ({ default: module.FormsEdit }))
);
const FormPage = lazy(() =>
  import('@/pages/formPage/Page.tsx').then((module) => ({ default: module.FormPage }))
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

const RecoveryPassword = lazy(() =>
  import('@/pages/recoveryPassword/Page').then((module) => ({ default: module.RecoveryPassword }))
);

const NotFoundPage = lazy(() =>
  import('@/pages/notFoundPage/Page').then((module) => ({ default: module.NotFound }))
);

export const AppRouter = () => {
  const routes: RouteObject[] = [
    {
      element: (
        <Suspense fallback={<Loader />}>
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
        { path: ROUTES.FORM_PAGE, element: <FormPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
    {
      errorElement: <ErrorComponent />,
      element: (
        <>
          <Suspense fallback={<Loader />}>
            <ProtectedRoute inverted>
              <Outlet />
            </ProtectedRoute>
          </Suspense>
        </>
      ),
      children: [
        { path: ROUTES.LOGIN, element: <Login /> },
        { path: ROUTES.SIGNUP, element: <Signup /> },
        { path: ROUTES.RECOVERY_PASSWORD, element: <RecoveryPassword /> },
      ],
    },
  ];

  return <RouterProvider router={createBrowserRouter(routes)} />;
};
