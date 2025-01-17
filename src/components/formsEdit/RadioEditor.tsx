import { ConstructorField, FieldTypes } from '@/types';
import { getUUID } from '@/utils/getUUID';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Radio, Select, Tooltip } from 'antd';
import { FC } from 'react';

type Props = {
  field: ConstructorField;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
};

export const RadioEditor: FC<Props> = (props) => {
  const { field, onUpdateField } = props;

  const handleAdd = () => {
    const options = field?.options || [];
    const id = getUUID();
    onUpdateField(field.id, { options: [...options, { id, label: '' }] });
  };

  const handleChange = (id: string, label: string) => {
    const options = field.options || [];
    const index = options.findIndex((option) => option.id === id);
    options[index] = { ...options[index], label };
    onUpdateField(field.id, { options });
  };

  const handleRemove = (id: string) => {
    const options = field?.options || [];
    onUpdateField(field.id, { options: options.filter((option) => option.id !== id) });
  };

  const handleChangeType = (type: FieldTypes) => {
    onUpdateField(field.id, { type });
  };

  return (
    <>
      {field?.options?.map(({ id, label }, i) => (
        <div key={id} className="w-full flex items-center gap-2">
          {field.type === 'radio' ? <Radio className="m-0" disabled /> : <Checkbox disabled />}
          <Input
            placeholder={`Вариант ${i + 1}`}
            value={label}
            className="w-full"
            onChange={(e) => handleChange(id, e.target.value)}
          />
          {field?.options && field?.options?.length > 1 && (
            <Tooltip title="Удалить">
              <Button
                type="text"
                danger
                icon={<MinusCircleOutlined />}
                onClick={() => handleRemove(id)}
              />
            </Tooltip>
          )}
        </div>
      ))}
      <div className="flex gap-2 w-full justify-between">
        <div className="flex items-center gap-2">
          {field.type === 'radio' ? <Radio className="m-0" disabled /> : <Checkbox disabled />}
          <Tooltip title="Добавить вариант">
            <Button color="default" variant="filled" onClick={handleAdd}>
              Добавить
            </Button>
          </Tooltip>
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
