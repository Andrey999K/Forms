import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PageLayout } from './layouts/PageLayout.tsx';
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
import { Routes } from './utils/routesConfig.ts';
import { store } from './redux/store.ts';
import './App.css';

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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
