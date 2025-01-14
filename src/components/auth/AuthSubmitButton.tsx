import { Button, Form } from 'antd';
import { ReactNode } from 'react';

export const AuthSubmitButton = ({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) => {
  return (
    <Form.Item className="mb-2">
      <Button
        htmlType="submit"
        block
        disabled={disabled}
        className="bg-[#2A2B34] text-white rounded-lg hover:!bg-[#4C4D5E] hover:!text-slate-200 h-[35.81px] !border-none focus:!outline-none active:!outline-none active:!shadow-none active:!ring-0"
      >
        {children}
      </Button>
    </Form.Item>
  );
};
