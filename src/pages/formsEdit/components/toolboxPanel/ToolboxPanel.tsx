import { FC } from 'react';
import { Button, Divider } from 'antd';
import {
  FormOutlined,
  AlignLeftOutlined,
  CheckCircleOutlined,
  SaveOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { DraggableToolItem } from './DraggableToolItem';
import { FieldTypes } from '../../types/form';

interface Props {
  onSaveConstructor: () => void;
  onRemoveConstructor: () => void;
}

export const ToolboxPanel: FC<Props> = (props) => {
  const { onSaveConstructor, onRemoveConstructor } = props;
  return (
    <div className="w-64 border rounded-lg bg-white shadow-sm">
      <div className="p-4">
        <h3 className="text-base font-medium mb-4">Элементы формы</h3>
        <div className="flex flex-col gap-2">
          <DraggableToolItem type={FieldTypes.INPUT}>
            <FormOutlined className="mr-2" />
            Однострочный текст
          </DraggableToolItem>

          <DraggableToolItem type={FieldTypes.TEXTAREA}>
            <AlignLeftOutlined className="mr-2" />
            Многострочный текст
          </DraggableToolItem>

          <DraggableToolItem type={FieldTypes.RADIO}>
            <CheckCircleOutlined className="mr-2" />
            Список выбора
          </DraggableToolItem>
        </div>
      </div>

      <Divider className="my-2" />

      <div className="p-4">
        <h3 className="text-base font-medium mb-4">Действия</h3>
        <div className="flex flex-col gap-2">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            className="w-full"
            onClick={onSaveConstructor}
          >
            Сохранить форму
          </Button>

          <Button danger icon={<DeleteOutlined />} className="w-full" onClick={onRemoveConstructor}>
            Удалить форму
          </Button>
        </div>
      </div>
    </div>
  );
};
