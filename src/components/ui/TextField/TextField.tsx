import { Form, Input, Typography } from 'antd';
import { ReactNode } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  type?: 'text' | 'password';
  placeholder: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export const TextField = <T extends FieldValues>({ name, control, rules, ...props }: Props<T>) => {
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
            className="py-2 px-4 rounded-xl bg-[#EFF2F6] placeholder-[#4a4b4d] focus:!outline-none focus:!ring-0 focus-visible:!border-gray-300 focus:!border-gray-300 hover:!border-gray-300"
          />
        </Form.Item>
      )}
    />
  );
};
