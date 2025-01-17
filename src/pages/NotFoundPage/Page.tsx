import { Loader } from '@/components/common';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const { currentUser, isAuthLoading } = useFirebaseAuth();
  const navigate = useNavigate();

  if (isAuthLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`flex items-center justify-center ${
        currentUser ? 'min-h-[calc(100vh-theme(spacing.page-layout-offset))]' : 'min-h-screen'
      }`}
    >
      <div className="w-[300px] flex flex-col items-center text-center space-y-4">
        <Typography className="text-[8rem] text-[#2A2B34] font-bold leading-none">404</Typography>
        <Typography.Text className="text-lg">Запрашиваемая страница не найдена</Typography.Text>
        <Button
          size="large"
          block
          className="bg-[#2A2B34] text-white rounded-lg hover:!bg-[#4C4D5E] hover:!text-slate-200 h-[35.81px] !border-none"
          onClick={() => navigate(currentUser ? '/' : '/login')}
        >
          {currentUser ? 'На главную' : 'На страницу входа'}
        </Button>
      </div>
    </div>
  );
};
