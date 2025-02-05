import { ToastContainer } from 'react-toastify';
import { AppRouter } from './routes/routes.tsx';
import { useFirebaseAuth } from './hooks/useFirebaseAuth.ts';
import { toastConfig } from './utils/toast.config.ts';
import { ConfigProvider } from 'antd';
import { RootState } from './redux/store.ts';
import { useSelector } from 'react-redux';
import { darkThemeConfig, lightThemeConfig } from './utils/themeConfig.ts';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Theme } from './redux/theme/ThemeSlice.ts';
import { useEffect } from 'react';

export const App = () => {
  useFirebaseAuth();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const antdTheme = theme === 'dark' ? darkThemeConfig : lightThemeConfig;

  const rawSetTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);
  };

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <>
      <ToastContainer {...toastConfig} />
      <ConfigProvider theme={antdTheme}>
        <AppRouter />
      </ConfigProvider>
    </>
  );
};
