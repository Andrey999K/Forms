import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { toastConfig } from '@/utils/toast.config.ts';
import { store } from '@/redux/store.ts';
import { Suspense } from 'react';
import { Loader } from './components/common';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppRouter } from '@/routes/routes';

function App() {
  return (
    <>
      <ToastContainer {...toastConfig} />
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      </Provider>
    </>
  );
}

export default App;
