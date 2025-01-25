import { RootState } from '@/redux/store';
import { Button, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-center ${
        user ? 'min-h-[calc(100vh-theme(spacing.page-layout-offset))]' : 'min-h-screen'
      }`}
    >
      <div className="w-[300px] flex flex-col items-center text-center space-y-4">
        <Typography className="text-[8rem] text-gray-300 font-bold leading-none">404</Typography>
        <Typography.Text className="text-lg">Запрашиваемая страница не найдена</Typography.Text>
        <Button
          size="large"
          block
          type="primary"
          // className="bg-[#2A2B34] text-white rounded-lg hover:!bg-[#4C4D5E] hover:!text-slate-200 h-[35.81px] !border-none"
          onClick={() => navigate(user ? '/' : '/login')}
        >
          {user ? 'На главную' : 'На страницу входа'}
        </Button>
      </div>
    </div>
  );
};
