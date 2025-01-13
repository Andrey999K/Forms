import { ConstructorField, FIELD_EXISTS, FieldTypes } from '@/types';
import { FC, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorFieldWrapper } from './ConstructorFieldWrapper';
import { RadioEditor } from './RadioEditor';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { AlignLeftOutlined, FormOutlined } from '@ant-design/icons';

type Props = {
  field: ConstructorField;
  index: number;
  onMoveField: (dragIndex: number, hoverIndex: number) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  isOutsideWorkspace: (x: number, y: number) => boolean;
};

export const ConstructorDraggableField: FC<Props> = (props) => {
  const { field, index, onMoveField, onRemoveField, onUpdateField, isOutsideWorkspace } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);
  const [isOverDelete, setIsOverDelete] = useState(false);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: FIELD_EXISTS,
    item: { index, id: field.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult();
      const { x, y } = monitor.getClientOffset() || { x: 0, y: 0 };

      if (!dropResult && isOutsideWorkspace(x, y)) {
        onRemoveField(field.id);
      }
    },
  });

  const [, drop] = useDrop({
    accept: FIELD_EXISTS,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMoveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  useEffect(() => {
    if (!isDragging) return;

    const handleDrag = (e: MouseEvent) => {
      const isOutside = isOutsideWorkspace(e.clientX, e.clientY);
      setIsOverDelete(isOutside);
    };

    document.addEventListener('mousemove', handleDrag);
    return () => document.removeEventListener('mousemove', handleDrag);
  }, [isDragging, isOutsideWorkspace]);

  dragPreview(drop(ref));
  drag(dragRef);

  const commonProps = { dragRef, field, onUpdateField, onRemoveField };

  const renderField = () => {
    switch (field.type) {
      case FieldTypes.INPUT:
        return (
          <div className="flex gap-2 text-sm px-1">
            <FormOutlined />
            <span>Однострочный текст</span>
          </div>
        );
      case FieldTypes.TEXTAREA:
        return (
          <div className="flex gap-2 text-sm px-1">
            <AlignLeftOutlined />
            <span>Многострочный текст</span>
          </div>
        );
      case FieldTypes.RADIO:
      case FieldTypes.CHECKBOX: {
        return <RadioEditor field={field} onUpdateField={onUpdateField} />;
      }
      default:
        return null;
    }
  };

  return (
    <GlassWrapper
      ref={ref}
      className={`relative group w-full flex ${isOverDelete ? 'opacity-50 border-red-500' : ''} ${isDragging ? 'border-dashed border-gray-500' : ''}`}
    >
      <ConstructorFieldWrapper {...commonProps}>{renderField()}</ConstructorFieldWrapper>
    </GlassWrapper>
  );
};
