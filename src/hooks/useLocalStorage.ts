import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | null>(() => get());

  function get() {
    try {
      return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) || '');
    } catch (error) {
      console.error('Ошибка при чтении из localStorage:', error);
      return initialValue || null;
    }
  }

  const update = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (error) {
      console.error('Ошибка при записи в localStorage:', error);
    }
  };

  const remove = () => {
    try {
      localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error('Ошибка при удалении из localStorage:', error);
    }
  };

  useEffect(() => {
    const item = get();
    if (item) setValue(item);
  }, [key]);

  return { get, value, update, remove };
}

export default useLocalStorage;
