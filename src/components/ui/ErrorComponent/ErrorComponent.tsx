import { Button, Typography } from 'antd';

export const ErrorComponent = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-100">
      <Typography.Title level={3} className="text-red-500">
        Что-то пошло не так!
      </Typography.Title>
      <Typography.Text>Попробуйте перезагрузить страницу.</Typography.Text>
      <Button type="primary" onClick={handleReload}>
        Перезагрузить
      </Button>
    </div>
  );
};
