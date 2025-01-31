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
        style={{
          boxShadow: 'none',
          height: '35.81px',
          borderRadius: '0.5rem',
        }}
        disabled={disabled}
        type="primary"
      >
        {children}
      </Button>
    </Form.Item>
  );
};
