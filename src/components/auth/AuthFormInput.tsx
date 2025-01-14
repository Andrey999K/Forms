import { Typography, Input, Form } from 'antd';
import { ReactNode } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { AuthFormValues } from '../../types';

type Props = {
  name: keyof AuthFormValues;
  control: Control<AuthFormValues>;
  rules: RegisterOptions<AuthFormValues>;
  type?: 'text' | 'password';
  placeholder: 'Email' | 'Пароль' | 'Имя' | 'Фамилия';
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const AuthFormInput = ({ name, control, rules, ...props }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Form.Item
          validateStatus={fieldState.error && 'error'}
          help={
            fieldState.error && (
              <Typography.Text
                type="danger"
                className="text-red-500 text-sm flex justify-start ml-2 min-h-[20px]"
              >
                {fieldState.error.message}
              </Typography.Text>
            )
          }
        >
          <Input
            {...field}
            {...props}
            style={{
              boxShadow: 'none',
              borderColor: 'transparent',
              outline: 'none',
              transition: 'none',
            }}
            className="py-1.5 px-4 rounded-lg bg-[#EFF2F6] placeholder-[#4a4b4d] focus:!outline-none focus:!ring-0 focus:!border-transparent focus:!transition-none !transition-none"
          />
        </Form.Item>
      )}
    />
  );
};
