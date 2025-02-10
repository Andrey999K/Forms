import { Button, Form } from 'antd';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

export const AuthSubmitButton = ({ children, disabled, loading }: Props) => {
  return (
    <Form.Item className="input-item">
      <Button
        htmlType="submit"
        block
        style={{
          boxShadow: 'none',
          height: '35.81px',
          borderRadius: '0.5rem',
        }}
        disabled={disabled}
        loading={loading}
        type="primary"
      >
        {children}
      </Button>
    </Form.Item>
  );
};
