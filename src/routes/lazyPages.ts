import { lazy } from 'react';

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

export {
  Home,
  Me,
  FormsNew,
  FormsEdit,
  FormPage,
  FormResponses,
  FormResponse,
  Login,
  Signup,
  RecoveryPassword,
  NotFoundPage,
};
