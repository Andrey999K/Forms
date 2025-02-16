import { ConstructorField } from '@/types';
import { Checkbox, Input, Radio } from 'antd';

export const renderField = (field: ConstructorField, isLoading?: boolean) => {
  const { type } = field;
  switch (type) {
    case 'input':
      return <Input key={field.id} disabled={isLoading} />;
    case 'textarea':
      return <Input.TextArea disabled={isLoading} />;
    case 'radio':
      return (
        <Radio.Group
          className="flex justify-start flex-col gap-2 md:gap-0 md:flex-row"
          disabled={isLoading}
        >
          {field.options?.map((option) => (
            <Radio key={option.id} value={option.id}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    case 'checkbox':
      return (
        <Checkbox.Group className="flex justify-start gap-2" disabled={isLoading}>
          {field.options?.map((option) => (
            <Checkbox key={option.id} value={option.id}>
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      );
  }
};
