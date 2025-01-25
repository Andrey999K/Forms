import { Spin } from 'antd';

export const Loader = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0">
      <Spin size="large" />
    </div>
  );
};
