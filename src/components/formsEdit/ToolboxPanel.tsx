import { FC } from 'react';
import { Button, Divider } from 'antd';
import {
  FormOutlined,
  AlignLeftOutlined,
  CheckCircleOutlined,
  SaveOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { ToolboxDraggableItem } from './ToolboxDraggableItem';
import { FieldTypes } from '@/types';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';

type Props = {
  onSaveConstructor: () => void;
  onRemoveConstructor: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
  isEmptyFields: boolean;
};

export const ToolboxPanel: FC<Props> = (props) => {
  const { onSaveConstructor, onRemoveConstructor, isUpdating, isDeleting, isEmptyFields } = props;
  return (
    <GlassWrapper className="w-80">
      <div className="p-4">
        <h3 className="text-base font-medium mb-4">Элементы формы</h3>
        <div className="flex flex-col gap-2">
          <ToolboxDraggableItem type={FieldTypes.INPUT}>
            <FormOutlined />
            Однострочный текст
          </ToolboxDraggableItem>

          <ToolboxDraggableItem type={FieldTypes.TEXTAREA}>
            <AlignLeftOutlined />
            Многострочный текст
          </ToolboxDraggableItem>

          <ToolboxDraggableItem type={FieldTypes.RADIO}>
            <CheckCircleOutlined />
            Список выбора
          </ToolboxDraggableItem>
        </div>
      </div>

      <Divider className="my-2" />

      <div className="p-4">
        <h3 className="text-base font-medium mb-4">Действия</h3>
        <div className="flex flex-col gap-2">
          <Button
            color="default"
            variant="solid"
            className="w-full"
            icon={<SaveOutlined />}
            loading={isUpdating}
            disabled={isEmptyFields || isDeleting}
            onClick={onSaveConstructor}
          >
            Сохранить форму
          </Button>
          <Button
            color="danger"
            variant="filled"
            className="w-full"
            icon={<DeleteOutlined />}
            loading={isDeleting}
            disabled={isUpdating}
            onClick={onRemoveConstructor}
          >
            Удалить форму
          </Button>
        </div>
      </div>
    </GlassWrapper>
  );
};
