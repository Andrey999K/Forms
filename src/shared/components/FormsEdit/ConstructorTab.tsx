import { AlignLeftOutlined, CheckCircleOutlined, FormOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { SidebarDraggableItem } from './SidebarDraggableItem';
import { FieldTypes } from '@/shared/types';

export const ConstructorTab: FC = () => (
  <div>
    <h3 className="text-base font-medium mb-4">Элементы формы</h3>
    <div className="flex flex-col gap-2 items-center">
      <SidebarDraggableItem type={FieldTypes.INPUT}>
        <FormOutlined />
        Однострочный текст
      </SidebarDraggableItem>

      <SidebarDraggableItem type={FieldTypes.TEXTAREA}>
        <AlignLeftOutlined />
        Многострочный текст
      </SidebarDraggableItem>

      <SidebarDraggableItem type={FieldTypes.RADIO}>
        <CheckCircleOutlined />
        Список выбора
      </SidebarDraggableItem>
    </div>
  </div>
);
