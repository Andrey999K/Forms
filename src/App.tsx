import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './routes/routes.tsx';
import { store } from './redux/store.ts';
import { toastConfig } from './utils/toast.config.ts';
import { ConfigProvider } from 'antd';
import { Loader } from './components/common/Loader.tsx';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
        <Provider store={store}>
          <Suspense fallback={<Loader />}>
            <AppRouter />
          </Suspense>
        </Provider>
      </ConfigProvider>
    </>
  );
}

export default App;
