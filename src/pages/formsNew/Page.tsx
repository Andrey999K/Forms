import { getUUID } from '@/utils/getUUID';
import { Spin } from 'antd';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormsNew: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = getUUID();
    if (id) {
      navigate(`/forms/${id}/edit`, { state: { id } });
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <Spin />
    </div>
  );
};
