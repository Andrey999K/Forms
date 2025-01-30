import { ConstructorField, FieldTypes } from '@/types';
import { getUUID } from '@/utils/getUUID';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, InputRef, Radio, Select, Tooltip } from 'antd';
import { ChangeEvent, FC, useEffect, useState } from 'react';

type Props = {
  field: ConstructorField;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  onError: (id: string, updates: boolean) => void;
};

export const RadioEditor: FC<Props> = (props) => {
  const { field, onUpdateField, onError } = props;
  const options = field.options || [];
  const [newInputId, setNewInputId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    onError(id, false);
  };

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
    const newOptions = options.map((option) => {
      if (option.id === e.target.id) {
        setErrors(getErrors(e.target.id, e.target.value));
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

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    getErrors(e.target.id, e.target.value);
  };

  useEffect(() => {
    options.forEach((option) => {
      getErrors(option.id, option.label);
    });
  }, []);

  return (
    <>
      {options.map((option, index) => (
        <div key={option.id} className="w-full flex gap-2 items-center">
          {field.type === 'radio' ? <Radio className="m-0" disabled /> : <Checkbox disabled />}
          <Input
            id={option.id}
            status={errors[option.id] && 'error'}
            value={option.label}
            placeholder={`Вариант ${index + 1}`}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={handleRef}
          />

          {options.length > 1 && (
            <Tooltip title="Удалить">
              <Button
                type="text"
                danger
                icon={<MinusCircleOutlined />}
                onClick={() => handleRemove(option.id)}
              />
            </Tooltip>
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
          defaultValue={FieldTypes.RADIO}
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
