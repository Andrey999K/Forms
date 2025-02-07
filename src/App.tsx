import { useFirebaseAuth } from './hooks/useFirebaseAuth.ts';
import { useChangeTheme } from './hooks/useChangeTheme.ts';
import { AppRouter } from './routes/routes.tsx';
import { ConfigProvider } from 'antd';
import { theme } from 'antd';
import './App.css';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const App = () => {
  useFirebaseAuth();
  const theme = useChangeTheme();

  return (
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
  );
};
