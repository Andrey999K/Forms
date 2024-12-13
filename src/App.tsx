import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Me,
  FormsNew,
  FormsEdit,
  FormPage,
  FormResponses,
  FormResponse,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/me",
    element: <Me />,
  },
  {
    path: "/forms/new",
    element: <FormsNew />,
  },
  {
    path: "/forms/:formId/edit",
    element: <FormsEdit />,
  },
  {
    path: "/forms/:formId",
    element: <FormPage />,
  },
  {
    path: "/forms/:formId/responses",
    element: <FormResponses />,
  },
  {
    path: "/forms/:formId/responses/:responseId",
    element: <FormResponse />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
