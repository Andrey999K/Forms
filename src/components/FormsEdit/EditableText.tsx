import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ChangeEvent, FC, useState } from 'react';

type Props = {
  value: string;
  name: string;
  placeholder?: string;
  onChange: ({ value, name }: { value: string; name: string }) => void;
  onError: (id: string, updates: boolean) => void;
  children: React.ReactNode;
  size?: SizeType;
  id?: string;
};

export const EditableText: FC<Props> = (props) => {
  const { value, name, placeholder, onChange, children, size, id = props.name } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isError = Object.keys(errors).length > 0;

  const getErrors = (id: string, label: string): Record<string, string> => {
    if (label.trim() === '') {
      return { ...errors, [id]: 'Поле не может быть пустым.' };
    } else {
      const newErrors = { ...errors };
      delete newErrors[id];
      return newErrors;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ name, value: e.target.value });
    setErrors(getErrors(e.target.id, e.target.value));
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    if (isError) return;
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <Input
          autoFocus
          value={value}
          id={id}
          onChange={handleChange}
          onBlur={handleBlur}
          onPressEnter={handleBlur}
          className="w-full"
          status={isError ? 'error' : undefined}
          placeholder={placeholder}
          size={size}
          suffix={
            isError ? (
              <Tooltip title={errors[id]}>
                <ExclamationCircleOutlined className="text-red-500" />
              </Tooltip>
            ) : null
          }
        />
      ) : (
        <div onClick={handleClick} className="cursor-pointer">
          {children}
        </div>
      )}
    </>
  );
};
