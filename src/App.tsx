import { ConfigProvider } from 'antd';
import './App.css';
import { useChangeTheme } from './hooks/useChangeTheme.ts';
import { useFirebaseAuth } from './hooks/useFirebaseAuth.ts';
import { AppRouter } from './routes/routes.tsx';
import { antdThemeConfig } from './utils/antdThemeConfig.ts';

export const App = () => {
  useFirebaseAuth();
  const theme = useChangeTheme();

  return (
    <ConfigProvider theme={antdThemeConfig(theme)}>
      <AppRouter />
    </ConfigProvider>
  );
};
