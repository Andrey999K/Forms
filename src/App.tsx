import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { toastConfig } from '@/utils/toast.config.ts';
import { store } from '@/redux/store.ts';
import { router } from '@/routes/routes.tsx';
import { Suspense } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './components/common';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer {...toastConfig} />
    </Provider>
  );
}

export default App;
