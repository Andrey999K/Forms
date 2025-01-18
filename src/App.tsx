import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './routes/routes.tsx';
import { useFirebaseAuth } from './hooks/useFirebaseAuth.ts';
import { toastConfig } from './utils/toast.config.ts';
import { ConfigProvider } from 'antd';
import { Loader } from './components/common/Loader.tsx';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useFirebaseAuth();

  return (
    <>
      <ToastContainer {...toastConfig} />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fa9145',
            colorTextBase: '#885028',
            colorBgBase: '#fdf8f4',
          },
          cssVar: true,
        }}
      >
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      </ConfigProvider>
    </>
  );
}

export default App;
