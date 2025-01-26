import { ConstructorField } from '@/types';
import { CloseOutlined, HolderOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Switch, Tooltip } from 'antd';
import { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  children: ReactNode;
  dragRef: React.RefObject<HTMLButtonElement>;
  field: ConstructorField;
  onError: (id: string, updates: boolean) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  className?: string;
};

export const ConstructorFieldWrapper: FC<Props> = (props) => {
  const { field, children, dragRef, onRemoveField, onUpdateField, className = '', onError } = props;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<InputRef>(null);

  const getErrors = (id: string, label: string): Record<string, string> => {
    if (label.trim() === '') {
      onError(id, true);
      return { ...errors, [id]: 'Поле не может быть пустым' };
    } else {
      const newErrors = { ...errors };
      onError(id, false);
      delete newErrors[id];
      return newErrors;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(getErrors(e.target.id, e.target.value));
    onUpdateField(field.id, { question: e.target.value });
  };

  const handleRemove = (id: string) => {
    onRemoveField(field.id);
    onError(id, false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.input) {
        getErrors(inputRef.current.input.id, inputRef.current.input.value);
      }
    }
  }, []);

  return (
    <div className={`relative w-full flex ${className}`}>
      <div className="w-full flex flex-col">
        <button ref={dragRef} className={`w-full cursor-move hover:text-orange-500`}>
          <HolderOutlined className="rotate-90" />
        </button>
        <div className="w-full px-4 pb-4 flex flex-col gap-2 items-start">
          <div className="w-full flex gap-2 items-center">
            <Input
              id={field.id}
              status={Object.keys(errors).length > 0 ? 'error' : undefined}
              value={field.question}
              placeholder="Вопрос"
              onChange={handleChange}
              ref={inputRef}
            />
          </div>
          {children}
        </div>
      </div>

      <div className="border-l my-2 px-2 flex flex-col gap-2 justify-between items-center">
        <Tooltip title="Обязательное поле">
          <Switch
            size="small"
            value={field.require}
            onChange={(require) => onUpdateField(field.id, { require })}
          />
        </Tooltip>
        <Tooltip title="Удалить">
          <Button
            type="text"
            danger
            icon={<CloseOutlined />}
            onClick={() => handleRemove(field.id)}
          />
        </Tooltip>
      </div>
    </div>
  );
};
