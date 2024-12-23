import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FieldTypes, ConstructorField } from "../types/form";
import { ConstructorFieldWrapper } from "./FormFieldWrapper";

interface Props {
  field: ConstructorField;
  index: number;
  onMoveField: (dragIndex: number, hoverIndex: number) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
}

export const DraggableFormField: FC<Props> = (props) => {
  const { field, index, onMoveField, onRemoveField, onUpdateField } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: FieldTypes.FORM_ELEMENT,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: FieldTypes.FORM_ELEMENT,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
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
            <div className="p-2 w-full text-sm text-gray-600 text-left">
              <div className="w-full border-dotted border-b-2">
                Короткий ответ
              </div>
            </div>
          </ConstructorFieldWrapper>
        );
      case FieldTypes.TEXTAREA:
        return (
          <ConstructorFieldWrapper {...commonProps}>
            <div className="p-2 w-full text-sm text-gray-600 text-left">
              <div className="w-full border-dotted border-b-2">
                Развернутый ответ
              </div>
              <div className="w-full border-dotted border-b-2 min-h-5"></div>
            </div>
          </ConstructorFieldWrapper>
        );
      case FieldTypes.RADIO: {
        return (
          <ConstructorFieldWrapper {...commonProps}>
            RADIO
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
          isDragging ? "border-dashed border-gray-500" : ""
        }`}
      >
        {renderField()}
      </div>
    </div>
  );
};
