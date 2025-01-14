import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { toastConfig } from '@/utils/toast.config.ts';
import { store } from '@/redux/store.ts';
import './App.css';
import { router } from '@/routes/routes.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
// import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
      <Suspense fallback={<div>Загрузка приложения...</div>}>
        <RouterProvider router={router} />
        <ToastContainer {...toastConfig} />
      </Suspense>
      {/* </AuthProvider> */}
    </Provider>
  );
}

export default App;
