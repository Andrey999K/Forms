import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  FormPage,
  FormResponse,
  FormResponses,
  FormsEdit,
  FormsNew,
  Home,
  Login,
  Me,
  Signup,
} from './pages';
import { PageLayout } from './layouts/PageLayout.tsx';
import { Routes } from './utils/routesConfig.ts';

const router = createBrowserRouter([
  {
    path: Routes.HOME,
    element: <PageLayout />,
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
  {
    path: Routes.LOGIN,
    element: <Login />,
  },
  {
    path: Routes.SIGNUP,
    element: <Signup />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
