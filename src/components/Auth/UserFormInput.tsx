import { Typography, Input, Form } from 'antd';
import { ReactNode } from 'react';
import { Control, Controller, RegisterOptions, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules: RegisterOptions<T>;
  type?: 'text' | 'password';
  placeholder: 'Email' | 'Пароль' | 'Имя' | 'Фамилия';
  prefix?: ReactNode;
  suffix?: ReactNode;
  label?: string;
};

export const UserFormInput = <T extends FieldValues>({
  name,
  label,
  control,
  rules,
  ...props
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Form.Item
          className="input-item"
          validateStatus={fieldState.error ? 'error' : undefined}
          help={
            fieldState.error && (
              <Typography.Text
                type="danger"
                style={{
                  textAlign: 'left',
                  display: 'block',
                  lineHeight: '1.4',
                }}
                className="text-red-500 text-xs md:text-sm ml-2 "
              >
                {fieldState.error.message}
              </Typography.Text>
            )
          }
        >
          <div className="flex flex-col items-start">
            {label && <Typography.Text className="ml-2">{label}</Typography.Text>}
            <Input
              {...field}
              {...props}
              status={fieldState.error && 'error'}
              style={{
                boxShadow: 'none',
              }}
              className="py-1.5 px-4 rounded-lg focus:!outline-none focus:!ring-0 focus:!border-transparent focus:!transition-none !transition-none"
            />
          </div>
        </Form.Item>
      )}
    />
  );
};
