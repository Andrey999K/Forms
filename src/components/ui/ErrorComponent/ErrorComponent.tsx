import { Button, Typography } from 'antd';
import ShapeWrapper from '@/layouts/GlassLayout.tsx';

export const ErrorComponent = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <ShapeWrapper>
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="w-[400px] flex flex-col items-center text-center space-y-4">
          <Typography className="text-[2rem] text-gray-300 font-bold leading-none">
            Что-то пошло не так!
          </Typography>
          <Typography.Text className="text-base">Попробуйте перезагрузить страницу</Typography.Text>
          <Button size="large" block type="primary" onClick={handleReload}>
            Перезагрузить
          </Button>
        </div>
      </div>
    </ShapeWrapper>
  );
};
