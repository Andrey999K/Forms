import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = ({ title }: { title?: string }) => {
  const location = useLocation();

  useEffect(() => {
    let newTitle = 'Конструктор форм';
    if (title) {
      newTitle += ` | ${title}`;
    }
    document.title = newTitle;
  }, [location, title]);

  return null;
};

export default PageTitle;
