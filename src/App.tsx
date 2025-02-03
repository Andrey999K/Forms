import { ConfigProvider } from 'antd';
import './App.css';
import { useFirebaseAuth } from './hooks/useFirebaseAuth.ts';
import { AppRouter } from './routes/routes.tsx';

export const App = () => {
  useFirebaseAuth();

  return (
    <>
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
        <AppRouter />
      </ConfigProvider>
    </>
  );
};
