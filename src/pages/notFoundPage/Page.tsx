import PageTitle from '@/components/ui/PageTitle/PageTitle';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Страница не найдена';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.page-layout-offset))]">
      <PageTitle title="Страница не найдена" />
      <div className="w-[300px] flex flex-col items-center text-center space-y-4">
        <Typography className="text-[8rem] text-gray-300 font-bold leading-none">404</Typography>
        <Typography.Text className="text-lg">Запрашиваемая страница не найдена</Typography.Text>
        <Button size="large" block type="primary" onClick={() => navigate('/')}>
          На главную
        </Button>
      </div>
    </div>
  );
};
