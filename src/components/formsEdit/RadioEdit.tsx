import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Radio, Select, Tooltip } from 'antd';
import { FC } from 'react';
import { ConstructorField, FieldTypes } from '@/types';

type Props = {
  data: ConstructorField;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, label: string) => void;
  onChangeType: (type: FieldTypes) => void;
};

export const RadioEdit: FC<Props> = (props) => {
  const { data, onAdd, onRemove, onChange, onChangeType } = props;

  return (
    <>
      {data?.options?.map(({ id, label }, i) => (
        <div key={id} className="w-full flex items-center gap-2">
          {data.type === 'radio' ? <Radio className="m-0" disabled /> : <Checkbox disabled />}
          <Input
            placeholder={`Вариант ${i + 1}`}
            value={label}
            className="w-full"
            onChange={(e) => onChange(id, e.target.value)}
          />
          <Tooltip title="Удалить">
            <Button
              type="text"
              danger
              icon={<MinusCircleOutlined />}
              onClick={() => onRemove(id)}
            />
          </Tooltip>
        </div>
      ))}
      <div className="flex gap-2 w-full">
        <Button className="w-full" type="dashed" onClick={onAdd} block icon={<PlusOutlined />}>
          Добавить
        </Button>
        <Select
          defaultValue={FieldTypes.RADIO}
          className="w-[300px]"
          onChange={(type: FieldTypes) => onChangeType(type)}
          options={[
            { value: 'radio', label: 'Одиночный выбор' },
            { value: 'checkbox', label: 'Множественный выбор' },
          ]}
        />
      </div>
    </>
  );
};
