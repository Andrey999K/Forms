import TextArea, { TextAreaRef } from 'antd/es/input/TextArea';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  name: string;
  placeholder?: string;
  onChange: ({ value, name }: { value: string; name: string }) => void;
  errors: { [key: string]: string[] };
  children: React.ReactNode;
};

export const EditableTextarea: FC<Props> = (props) => {
  const { value, name, placeholder, onChange, children, errors } = props;
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef<TextAreaRef>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ name, value: e.target.value });
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (errors[name] || e.target.value.trim() === '') return;
    setIsOpen(false);
  };

  useEffect(() => {
    if (value === '') {
      setIsOpen(true);
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [value]);

  return (
    <>
      {isOpen ? (
        <TextArea
          autoFocus={value === '' ? undefined : true}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full"
          status={errors[name] ? 'error' : undefined}
          placeholder={placeholder}
          ref={textareaRef}
          rows={1}
          // suffix={
          //   isError ? (
          //     <Tooltip title={errors[id]}>
          //       <ExclamationCircleOutlined className="text-red-500" />
          //     </Tooltip>
          //   ) : null
          // }
        />
      ) : (
        <div onClick={handleClick} className="cursor-pointer">
          {children}
        </div>
      )}
    </>
  );
};
