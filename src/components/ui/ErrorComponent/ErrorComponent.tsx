import { Button, Typography } from 'antd';
import ShapeWrapper from '@/layouts/GlassLayout.tsx';

const { Title, Text } = Typography;

export const ErrorComponent = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <ShapeWrapper>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Title level={3} className="text-red-500 !mb-0">
          Что-то пошло не так!
        </Title>
        <Text className="text-base mb-2">Попробуйте перезагрузить страницу.</Text>
        <Button type="primary" onClick={handleReload}>
          Перезагрузить
        </Button>
      </div>
    </ShapeWrapper>
  );
};
