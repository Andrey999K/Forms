import { Button, Form } from 'antd';
import { ReactNode } from 'react';

export const AuthSubmitButton = ({ children }: { children: ReactNode }) => {
  return (
    <Form.Item className="mb-2">
      <Button
        htmlType="submit"
        block
        className="bg-[#2A2B34] text-white rounded-xl hover:!bg-[#4C4D5E] hover:!text-slate-200 h-[39.82px] !border-none focus:!outline-none active:!outline-none active:!shadow-none active:!ring-0"
      >
        {children}
      </Button>
    </Form.Item>
  );
};
