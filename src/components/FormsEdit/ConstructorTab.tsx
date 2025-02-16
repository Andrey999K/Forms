import { FC } from 'react';
import { SidebarDraggableItem } from './SidebarDraggableItem';
import { useConstructorItems } from './useConstructorItems';
import { FieldType } from '@/types';

export const ConstructorTab: FC = () => {
  const { items } = useConstructorItems();
  return (
    <div>
      <h3 className="text-base font-medium mb-4">Элементы формы</h3>
      <div className="flex flex-col gap-2 items-center">
        {Object.entries(items).map(([key, { label, jsxIcon }]) => (
          <SidebarDraggableItem key={key} type={key as FieldType}>
            {jsxIcon} {label}
          </SidebarDraggableItem>
        ))}
      </div>
    </div>
  );
};
