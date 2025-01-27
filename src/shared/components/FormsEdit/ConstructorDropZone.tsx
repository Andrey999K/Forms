import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { FIELD_EXISTS, FieldType, FieldTypes } from '@/shared/types';

type Props = {
  onDropField: (type: FieldType) => void;
  children?: React.ReactNode;
  className?: string;
  index?: number;
};

export const ConstructorDropZone: FC<Props> = (props) => {
  const { onDropField, children, className = '', index } = props;
  const [{ isOverNewItem }, drop] = useDrop(
    () => ({
      accept: [...Object.values(FieldTypes), FIELD_EXISTS],
      drop: (item: { type: FieldType; isNew: boolean }, monitor) => {
        if (monitor.isOver({ shallow: true }) && item.isNew) {
          onDropField(item.type);
        }
      },
      hover: (item: { type: FieldType; isNew: boolean }, monitor) => {
        if (!monitor.isOver({ shallow: true })) return;
        if (!item.isNew) return;
      },
      collect: (monitor) => ({
        isOverNewItem: monitor.isOver({ shallow: true }) && monitor.getItem()?.isNew,
      }),
    }),
    [onDropField, index]
  );

  return (
    <div
      ref={drop}
      className={`relative w-full min-h-5 group transition-all duration-200 ${className}`}
      data-index={index}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          isOverNewItem ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-full h-0.5 bg-orange-500" />
      </div>
      {children}
    </div>
  );
};
