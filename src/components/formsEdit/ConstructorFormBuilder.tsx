import { FC, Fragment, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConstructorField, ConstructorForm, FieldType } from '../../types';
import { ConstructorDropZone } from './ConstructorDropZone';
import { ConstructorDraggableField } from './ConstructorDraggableField';
import { ToolboxPanel } from './ToolboxPanel';
import { ConstructorNameModal } from './ConstructorNameModal';

type Props = {
  constructor: ConstructorForm;
  onSaveConstructor: () => void;
  onRemoveConstructor: () => void;
  onDropField: (type: FieldType, index?: number) => void;
  onMoveField: (dragIndex: number, hoverIndex: number) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  onChangeForm: ({ value, name }: { value: string; name: string }) => void;
};

export const ConstructorFormBuilder: FC<Props> = (props) => {
  const {
    constructor,
    onSaveConstructor,
    onRemoveConstructor,
    onDropField,
    onMoveField,
    onRemoveField,
    onUpdateField,
    onChangeForm,
  } = props;
  const { fields } = constructor;
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Функция для определения, находится ли элемент за пределами рабочей области
  const isOutsideWorkspace = (x: number, y: number) => {
    if (!workspaceRef.current) return false;
    const rect = workspaceRef.current.getBoundingClientRect();
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 items-start">
        <ToolboxPanel
          onSaveConstructor={onSaveConstructor}
          onRemoveConstructor={onRemoveConstructor}
        />
        <div
          ref={workspaceRef}
          className="flex flex-col gap-4 w-full relative bg-white min-h-[600px] rounded-lg shadow-sm"
        >
          <div className="flex flex-col gap-2 p-4">
            <ConstructorNameModal
              value={constructor.title}
              name="title"
              title="Название"
              onChange={onChangeForm}
            >
              <h1 className="text-lg font-medium">{constructor.title}</h1>
            </ConstructorNameModal>
            <ConstructorNameModal
              value={constructor.description}
              name="description"
              title="Описание"
              onChange={onChangeForm}
            >
              <h2 className="text-sm text-gray-600">{constructor.description}</h2>
            </ConstructorNameModal>
          </div>
          <div className="flex flex-col">
            {fields.length === 0 && (
              <ConstructorDropZone onDropField={onDropField} className="min-h-24" />
            )}
            {fields.length > 0 && (
              <>
                {fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <ConstructorDropZone
                      onDropField={(type) => onDropField(type, index)}
                      className="min-h-5"
                    />
                    <ConstructorDraggableField
                      field={field}
                      index={index}
                      onMoveField={onMoveField}
                      onRemoveField={onRemoveField}
                      onUpdateField={onUpdateField}
                      isOutsideWorkspace={isOutsideWorkspace}
                    />
                  </Fragment>
                ))}
                <ConstructorDropZone
                  onDropField={(type) => onDropField(type, fields.length)}
                  className="min-h-5"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
