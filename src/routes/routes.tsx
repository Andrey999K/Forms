import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from '@/layouts/PageLayout';
import { lazy, Suspense } from 'react';
import { Routes } from '@/utils/routesConfig';
import { ProtectedRoute } from './ProtectedRoute';

const Home = lazy(() => import('@/pages/home/Page').then((module) => ({ default: module.Home })));
const Me = lazy(() => import('@/pages/me/Page').then((module) => ({ default: module.Me })));
const FormsNew = lazy(() =>
  import('@/pages/formsNew/Page').then((module) => ({ default: module.FormsNew }))
);
const FormsEdit = lazy(() =>
  import('@/pages/formsEdit/Page').then((module) => ({ default: module.FormsEdit }))
);
const FormPage = lazy(() =>
  import('@/pages/formPage/Page').then((module) => ({ default: module.FormPage }))
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        element: (
          <Suspense fallback={<div>Загрузка маршрутов...</div>}>
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
            path: Routes.FORM_PAGE,
            element: <FormPage />,
          },
          {
            path: Routes.FORM_RESPONSES,
            element: <FormResponses />,
          },
          {
            path: Routes.FORM_RESPONSE,
            element: <FormResponse />,
          },
        ],
      },
    ],
  },
  {
    path: Routes.LOGIN,
    element: (
      <Suspense fallback={<div>Загрузка маршрутов...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: Routes.SIGNUP,
    element: (
      <Suspense fallback={<div>Загрузка страницы...</div>}>
        <Signup />
      </Suspense>
    ),
  },
]);
