import { Button } from 'antd';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  const hangleNavigate = () => {
    // if (location.state?.from === '/forms/new') {
    //   navigate(-1);
    // } else if (location.pathname.endsWith('/edit')) {
    //   navigate(-1);
    // } else {
    //   navigate(-1);
    // }
    navigate(-1);
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
