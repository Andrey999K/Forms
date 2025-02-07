import { ToastContainer } from 'react-toastify';
import { AppRouter } from './routes/routes.tsx';
import { useFirebaseAuth } from './hooks/useFirebaseAuth.ts';
import { toastConfig } from './utils/toast.config.ts';
import { ConfigProvider } from 'antd';
import { RootState } from './redux/store.ts';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { theme } from 'antd';
import './App.css';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const App = () => {
  useFirebaseAuth();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <>
      <ToastContainer {...toastConfig} />
      <ConfigProvider
        theme={{
          algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
          cssVar: true,
          token: {
            colorPrimary: theme === 'dark' ? '#e9ecef' : '#fa9145',
            colorTextBase: theme === 'dark' ? '#adb5bd' : '#885028',
            colorBgBase: theme === 'dark' ? '#212529' : '#fdf8f4',
            colorLinkActive: theme === 'dark' ? '#e9ecef' : '#fa9145',
            colorLinkHover: theme === 'dark' ? '#dee2e6' : '#fa9145',
            colorBorder: theme === 'dark' ? '#495057' : '#e9dac5',
          },
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </>
  );
};
