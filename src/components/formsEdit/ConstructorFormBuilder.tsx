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
        <div className="flex flex-col w-full relative">
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
          <div ref={workspaceRef} className="flex flex-col rounded-lg shadow-sm">
            {fields.length === 0 ? (
              <ConstructorDropZone
                onDropField={(type) => onDropField(type, 0)}
                className="min-h-24"
                index={0}
              />
            ) : (
              <>
                <ConstructorDropZone
                  onDropField={(type) => onDropField(type, 0)}
                  className="min-h-5"
                  index={0}
                />
                {fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <ConstructorDraggableField
                      field={field}
                      index={index}
                      onMoveField={onMoveField}
                      onRemoveField={onRemoveField}
                      onUpdateField={onUpdateField}
                      isOutsideWorkspace={isOutsideWorkspace}
                    />
                    <ConstructorDropZone
                      onDropField={(type) => onDropField(type, index + 1)}
                      className="min-h-5"
                      index={index + 1}
                    />
                  </Fragment>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
