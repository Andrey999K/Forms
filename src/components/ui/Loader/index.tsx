import { Spin } from 'antd';

export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};
