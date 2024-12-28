import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { FieldType, FieldTypes } from '@/types';

type Props = {
  onDropField: (type: FieldType) => void;
  children?: React.ReactNode;
  className?: string;
};

export const ConstructorDropZone: FC<Props> = (props) => {
  const { onDropField, children, className } = props;
  const [{ isOverNewItem }, drop] = useDrop(
    () => ({
      accept: Object.values(FieldTypes),
      drop: (item: { type: FieldType; isNew: boolean }, monitor) => {
        if (monitor.isOver({ shallow: true }) && item.isNew) {
          onDropField(item.type);
        }
      },
      collect: (monitor) => ({
        isOverNewItem: monitor.isOver({ shallow: true }) && monitor.getItem().isNew,
      }),
    }),
    []
  );

  return (
    <div
      ref={drop}
      className={`relative w-full min-h-5 group transition-all duration-200 ${className || ''}`}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          isOverNewItem ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-0.5 bg-blue-500" />
      </div>
      {children}
    </div>
  );
};
