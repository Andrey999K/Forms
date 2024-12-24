import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const FormsNew = () => {
  const [loading, setLoading] = useState(true);
  const formId = 123;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Spin />;
  }

  return <Navigate to={`/forms/${formId}/edit`} />;
};
