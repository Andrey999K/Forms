import { ConstructorField } from '@/types';
import { getUUID } from '@/utils/getUUID';
import {
  CloseOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Input, InputRef, MenuProps, Switch, Tooltip } from 'antd';
import { ChangeEvent, FC, ReactNode, useEffect, useRef } from 'react';
import { useConstructorItems } from './useConstructorItems';

type Props = {
  children: ReactNode;
  dragRef: React.RefObject<HTMLButtonElement>;
  field: ConstructorField;
  errors: { [key: string]: string | string[] };
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  className?: string;
  onCopyField: (id: string, index: 'next' | 'last', newId: string) => void;
};

export const ConstructorFieldWrapper: FC<Props> = (props) => {
  const {
    field,
    children,
    dragRef,
    onRemoveField,
    onUpdateField,
    className = '',
    onCopyField,
    errors,
  } = props;
  const inputRef = useRef<InputRef>(null);
  const { items } = useConstructorItems();
  const menuItems: MenuProps['items'] = [
    {
      key: 1,
      label: 'Создать копию снизу',
      icon: <CopyOutlined />,
      onClick: () => onCopyField(field.id, 'next', getUUID()),
    },
    {
      key: 2,
      label: 'Создать копию в конце',
      icon: <CopyOutlined />,
      onClick: () => onCopyField(field.id, 'last', getUUID()),
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdateField(field.id, { question: e.target.value });
  };

  const handleRemove = () => {
    onRemoveField(field.id);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [field.question]);

  return (
    <div className={`relative w-full flex ${className}`}>
      <div className="w-full flex flex-col">
        <div className="w-full px-4 py-2 flex flex-col gap-2 items-start">
          <div className="w-full flex gap-2 items-center">
            <Input
              id={field.id}
              status={errors[field.id] ? 'error' : undefined}
              value={field.question}
              placeholder="Вопрос"
              onChange={handleChange}
              ref={inputRef}
              suffix={
                errors[field.id] ? (
                  <Tooltip title={errors[field.id]}>
                    <ExclamationCircleOutlined className="text-red-500" />
                  </Tooltip>
                ) : null
              }
            />
          </div>
          {children}
        </div>
        <div className="px-4 border-t flex justify-between dark:border-border-dark">
          <div className="flex gap-2 items-center text-sm px-1 text-gray-500">
            {items[field.type].jsxIcon}
            {items[field.type].label}
          </div>
          <div className="flex gap-2 items-center">
            <Dropdown menu={{ items: menuItems }} placement="top" arrow={{ pointAtCenter: true }}>
              <Button type="text" icon={<CopyOutlined className="cursor-pointer transition" />} />
            </Dropdown>
            <Tooltip title="Обязательное поле">
              <Switch
                size="small"
                value={field.require}
                onChange={(require) => onUpdateField(field.id, { require })}
              />
            </Tooltip>
            <Button type="text" danger icon={<CloseOutlined />} onClick={handleRemove} />
          </div>
        </div>
      </div>
      <div className="border-l dark:border-border-dark">
        <button ref={dragRef} className={`h-full cursor-move text-gray-500 hover:text-orange-500`}>
          <HolderOutlined />
        </button>
      </div>
    </div>
  );
};
