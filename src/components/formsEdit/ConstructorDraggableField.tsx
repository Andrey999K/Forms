import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { FieldTypes, ConstructorField } from '@/types';
import { ConstructorFieldWrapper } from './ConstructorFieldWrapper';
import { RadioEdit } from './RadioEdit';

type Props = {
  field: ConstructorField;
  index: number;
  onMoveField: (dragIndex: number, hoverIndex: number) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
};

export const ConstructorDraggableField: FC<Props> = (props) => {
  const { field, index, onMoveField, onRemoveField, onUpdateField } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: field.type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: Object.values(FieldTypes),
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

  dragPreview(drop(ref));
  drag(dragRef);

  const renderField = () => {
    const commonProps = { dragRef, field, onUpdateField, onRemoveField };

    switch (field.type) {
      case FieldTypes.INPUT:
        return (
          <ConstructorFieldWrapper {...commonProps}>
            <div className="p-2 w-full text-sm text-gray-600 text-left border-2 rounded border-dotted bg-gray-100">
              Короткий ответ
            </div>
          </ConstructorFieldWrapper>
        );
      case FieldTypes.TEXTAREA:
        return (
          <ConstructorFieldWrapper {...commonProps}>
            <div className="p-2 h-20 w-full text-sm text-gray-600 text-left border-2 rounded border-dotted bg-gray-100">
              Развернутый ответ
            </div>
          </ConstructorFieldWrapper>
        );
      case FieldTypes.RADIO:
      case FieldTypes.CHECKBOX: {
        const handleAddOption = () => {
          const options = field?.options || [];
          const id = uuidv4();
          onUpdateField(field.id, { options: [...options, { id, label: '' }] });
        };

        const handleChangeOption = (id: string, label: string) => {
          const options = field?.options || [];
          const index = options.findIndex((option) => option.id === id);
          options[index] = { ...options[index], label };
          onUpdateField(field.id, { options });
        };

        const handleRemoveOption = (id: string) => {
          const options = field?.options || [];
          onUpdateField(field.id, { options: options.filter((option) => option.id !== id) });
        };

        return (
          <ConstructorFieldWrapper {...commonProps}>
            <RadioEdit
              data={field}
              onAdd={handleAddOption}
              onChange={handleChangeOption}
              onRemove={handleRemoveOption}
              onChangeType={(type) => onUpdateField(field.id, { type })}
            />
          </ConstructorFieldWrapper>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className={`relative group border rounded`}>
      <div
        className={`border-2 border-transparent rounded ${
          isDragging ? 'border-dashed border-gray-500' : ''
        }`}
      >
        {renderField()}
      </div>
    </div>
  );
};
