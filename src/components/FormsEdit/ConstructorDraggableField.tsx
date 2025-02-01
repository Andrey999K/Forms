import { ConstructorField, FIELD_EXISTS, FieldTypes } from '@/types';
import { memo, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { ConstructorFieldWrapper } from './ConstructorFieldWrapper';
import { RadioEditor } from './RadioEditor';

type Props = {
  field: ConstructorField;
  index: number;
  onError: (id: string, updates: boolean) => void;
  onMoveField: (dragIndex: number, hoverIndex: number) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  isOutsideWorkspace: (x: number, y: number) => boolean;
  onCopyField: (id: string, index: 'next' | 'last', newId: string) => void;
  copyFieldsId: string | null;
  copiedFields: Set<string>;
  sourceFieldId: string | null;
  sourceFields: Set<string>;
};

export const ConstructorDraggableField = memo((props: Props) => {
  const {
    field,
    index,
    onMoveField,
    onRemoveField,
    onUpdateField,
    isOutsideWorkspace,
    onCopyField,
    onError,
    copyFieldsId,
    copiedFields,
    sourceFieldId,
    sourceFields,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);
  const [isOverDelete, setIsOverDelete] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const isCopied = field.id === copyFieldsId;
  const wasCopied = copiedFields.has(field.id);
  const isSourceField = field.id === sourceFieldId;
  const wasSourced = sourceFields.has(field.id);

  const handleDelete = (id: string) => {
    setIsDelete(true);
    setTimeout(() => {
      onRemoveField(id);
    }, 300);
  };

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
        handleDelete(field.id);
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

  const commonProps = {
    dragRef,
    field,
    onUpdateField,
    onRemoveField: handleDelete,
    onError,
    onCopyField,
    index,
  };

  const renderField = () => {
    switch (field.type) {
      case FieldTypes.INPUT: {
        return;
      }
      case FieldTypes.TEXTAREA: {
        return;
      }
      case FieldTypes.RADIO:
      case FieldTypes.CHECKBOX: {
        return <RadioEditor field={field} onUpdateField={onUpdateField} onError={onError} />;
      }
      default:
        return null;
    }
  };

  let animationClass = '';
  if (isSourceField) {
    animationClass = 'animate-fadeUpGray';
  } else if (isCopied) {
    animationClass = 'animate-scaleUpGreen';
  } else if (!wasCopied && !wasSourced) {
    animationClass = 'animate-scaleUp';
  }

  return (
    <GlassWrapper
      ref={ref}
      className={
        'relative group w-full flex' +
        (isOverDelete ? ' opacity-50 border-red-500' : '') +
        (isDragging ? ' border-dashed border-gray-500' : '') +
        (isDelete ? ' animate-scaleDown' : '') +
        (animationClass ? ` ${animationClass}` : '')
      }
      data-field-id={field.id}
    >
      <ConstructorFieldWrapper {...commonProps}>{renderField()}</ConstructorFieldWrapper>
    </GlassWrapper>
  );
});
ConstructorDraggableField.displayName = 'ConstructorDraggableField';
