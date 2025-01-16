import { Flip, ToastContainerProps } from 'react-toastify';

export const toastConfig: ToastContainerProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'colored',
  style: { zIndex: 10000 },
  transition: Flip,
};
