import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Input, InputRef, Tooltip } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  name: string;
  placeholder?: string;
  onChange: ({ value, name }: { value: string; name: string }) => void;
  errors: { [key: string]: string[] };
  children: React.ReactNode;
  size?: SizeType;
  id?: string;
};

export const EditableText: FC<Props> = (props) => {
  const { value, name, placeholder, onChange, children, size, id = props.name, errors } = props;
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ name, value: e.target.value });
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (errors[name] || e.target.value.trim() === '') return;
    setIsOpen(false);
  };

  useEffect(() => {
    if (value === '') {
      setIsOpen(true);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value]);

  return (
    <>
      {isOpen ? (
        <Input
          autoFocus={value === '' ? undefined : true}
          value={value}
          id={id}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full"
          status={errors[name] ? 'error' : undefined}
          placeholder={placeholder}
          size={size}
          ref={inputRef}
          suffix={
            errors[name] ? (
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
