import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTitle = (title?: string) => {
  const location = useLocation();

  useEffect(() => {
    let newTitle = 'Forms';
    if (title) {
      newTitle += ` | ${title}`;
    }
    document.title = newTitle;
  }, [location, title]);
};
