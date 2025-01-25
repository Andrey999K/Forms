import { Form, Input, InputRef } from 'antd';
import { forwardRef, ReactNode } from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { ErrorInfoField } from '../ErrorInfoField';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  type?: 'text' | 'password';
  error?: string;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onBlur?: () => void;
  defaultValue?: T;
};

export const TextField = forwardRef<InputRef, Props<any>>((props, ref) => {
  const { name, control, error, rules, onBlur, defaultValue, ...restProps } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Form.Item
          validateStatus={(fieldState.error || error) && 'error'}
          help={
            (fieldState.error || error) && (
              <ErrorInfoField message={fieldState.error?.message || error || 'Ошибка'} />
            )
          }
        >
          <Input
            {...field}
            {...restProps}
            ref={ref}
            onBlur={() => {
              field.onBlur();
              onBlur?.();
            }}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            className="py-2 px-4 rounded-xl bg-[#EFF2F6] placeholder-[#4a4b4d] focus:!outline-none focus:!ring-0 focus-visible:!border-gray-300 focus:!border-gray-300 hover:!border-gray-300"
          />
        </Form.Item>
      )}
    />
  );
});
TextField.displayName = 'TextField';
