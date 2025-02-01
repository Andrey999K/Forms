import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, FC, useEffect, useState } from 'react';

type Props = {
  value: string;
  name: string;
  placeholder?: string;
  onChange: ({ value, name }: { value: string; name: string }) => void;
  onError: (id: string, updates: boolean) => void;
  children: React.ReactNode;
};

export const EditableTextarea: FC<Props> = (props) => {
  const { value, name, placeholder, onChange, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isError = Object.keys(errors).length > 0;

  const getErrors = (id: string, label: string): Record<string, string> => {
    if (label.trim() === '') {
      return { ...errors, [id]: 'Поле не может быть пустым' };
    } else {
      const newErrors = { ...errors };
      delete newErrors[id];
      return newErrors;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ name, value: e.target.value });
    setErrors(getErrors(e.target.id, e.target.value));
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const errors = getErrors(e.target.id, e.target.value);
    if (errors) return;
    setIsOpen(false);
  };

  useEffect(() => {
    if (value === '') {
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      {isOpen ? (
        <TextArea
          autoFocus={value === '' ? undefined : true}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full"
          status={isError ? 'error' : undefined}
          placeholder={placeholder}
          rows={1}
        />
      ) : (
        <div onClick={handleClick} className="cursor-pointer">
          {children}
        </div>
      )}
    </>
  );
};
