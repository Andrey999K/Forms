import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { Button } from 'antd';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hangleNavigate = () => {
    if (location.state?.from === '/forms/new') {
      navigate(-2);
    } else if (location.pathname.endsWith('/edit')) {
      navigate(-1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="text-left">
      <Button type="link" style={{ padding: 0 }} onClick={hangleNavigate}>
        <FiArrowLeftCircle size={25} />
        Назад
      </Button>
    </div>
  );
};
