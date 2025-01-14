import { Spin } from 'antd';

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Spin size="large" className="text-blue-500" />
    </div>
  );
};
