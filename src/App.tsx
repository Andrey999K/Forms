import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './routes/routes.tsx';
import { useFirebaseAuth } from './hooks/useFirebaseAuth.ts';
import { toastConfig } from './shared/utils/toast.config.ts';
import { ConfigProvider } from 'antd';
import '@/shared/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './shared/components/ui/Loader/index.tsx';

export const App = () => {
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
            colorLinkActive: '#fa9145',
            colorLinkHover: '#fa9145',
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
};
