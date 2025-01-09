import { toast } from 'react-toastify';
import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
});

const transformData = (data: any) =>
  data && typeof data === 'object' && !data._id
    ? Object.entries(data).map(([key, value]) => ({
        id: key,
        ...(value as Record<string, unknown>),
      }))
    : data;

//перехватчик запроса для добавления .json к URL, если его нет
http.interceptors.request.use((config) => {
  if (config.url && !config.url?.endsWith('.json')) {
    config.url = `${config.url}.json`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => {
    res.data = { content: transformData(res.data) };
    return res;
  },
  function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response < 500;
    if (!expectedErrors) {
      toast.error('Что-то пошло не так. Попробуйте позднее');
    }
    return Promise.reject(error);
  }
);
