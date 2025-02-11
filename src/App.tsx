import { useFirebaseAuth } from './hooks/useFirebaseAuth.ts';
import { useChangeTheme } from './hooks/useChangeTheme.ts';
import { AppRouter } from './routes/routes.tsx';
import { ConfigProvider } from 'antd';
import { antdThemeConfig } from './utils/antdThemeConfig.ts';
import './App.css';

export const App = () => {
  useFirebaseAuth();
  const theme = useChangeTheme();

  return (
    <ConfigProvider theme={antdThemeConfig(theme)}>
      <AppRouter />
    </ConfigProvider>
  );
};
