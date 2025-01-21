import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.page-layout-offset))]">
      <div className="w-[300px] flex flex-col items-center text-center space-y-4">
        <Typography className="text-[8rem] text-[#2A2B34] font-bold leading-none">404</Typography>
        <Typography.Text className="text-lg">Запрашиваемая страница не найдена</Typography.Text>
        <Button
          size="large"
          block
          className="bg-[#2A2B34] text-white rounded-lg hover:!bg-[#4C4D5E] hover:!text-slate-200 h-[35.81px] !border-none"
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
      </div>
    </div>
  );
};
