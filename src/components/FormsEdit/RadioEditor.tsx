import { ConstructorField, FieldTypes } from '@/types';
import { getUUID } from '@/utils/getUUID';
import { ExclamationCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, InputRef, Radio, Select, Tooltip } from 'antd';
import { ChangeEvent, FC, useState } from 'react';

type Props = {
  field: ConstructorField;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  errors: { [key: string]: string | string[] };
};

export const RadioEditor: FC<Props> = (props) => {
  const { field, onUpdateField, errors } = props;
  const options = field.options || [];
  const [newInputId, setNewInputId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState('');

  const handleChangeType = (type: FieldTypes) => {
    onUpdateField(field.id, { type });
  };

  const handleAdd = () => {
    const newOption = { id: getUUID(), label: '' };
    onUpdateField(field.id, { options: [...options, newOption] });
    setNewInputId(newOption.id);
  };

  const handleRemove = (id: string) => {
    const newOptions = options.filter((option) => option.id !== id);
    onUpdateField(field.id, { options: newOptions });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newOptions = options.map((option) => {
      if (option.id === e.target.id) {
        return { ...option, label: e.target.value };
      }
      return option;
    });
    onUpdateField(field.id, { options: newOptions });
  };

  const handleRef = (ref: InputRef) => {
    if (ref && newInputId === ref.input?.id) {
      ref.focus({ cursor: 'start' });
      setNewInputId(null);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setTimeout(() => {
      handleRemove(id);
      setDeleteId('');
    }, 300);
  };

  return (
    <>
      {options.map((option, index) => (
        <div
          key={option.id}
          className={`w-full flex gap-2 items-center ${deleteId === option.id ? 'animate-scaleDown' : 'animate-scaleUp'}`}
        >
          {field.type === 'radio' ? <Radio className="m-0" disabled /> : <Checkbox disabled />}
          <Input
            id={option.id}
            status={errors[option.id] && 'error'}
            value={option.label}
            placeholder={`Вариант ${index + 1}`}
            onChange={handleChange}
            ref={handleRef}
            suffix={
              errors[option.id] ? (
                <Tooltip title={errors[option.id]}>
                  <ExclamationCircleOutlined className="text-red-500" />
                </Tooltip>
              ) : null
            }
          />

          {options.length > 1 && (
            <Button
              type="text"
              danger
              icon={<MinusCircleOutlined />}
              onClick={() => handleDelete(option.id)}
            />
          )}
        </div>
      ))}
      <div className="flex gap-2 w-full justify-between">
        <div className="flex items-center gap-2">
          {field.type === 'radio' ? <Radio className="m-0" disabled /> : <Checkbox disabled />}
          <Button color="default" variant="filled" onClick={handleAdd}>
            Добавить
          </Button>
        </div>
        <Select
          defaultValue={field.type}
          className="w-[300px]"
          onChange={handleChangeType}
          options={[
            { value: 'radio', label: 'Одиночный выбор' },
            { value: 'checkbox', label: 'Множественный выбор' },
          ]}
        />
      </div>
    </>
  );
};
