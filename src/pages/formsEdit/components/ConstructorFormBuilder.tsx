import { FC, Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConstructorField, ConstructorForm, FieldType } from '../types/form';
import { DropZone } from './DropZone';
import { DraggableFormField } from './DraggableFormField';
import { ToolboxPanel } from './toolboxPanel';

interface Props {
  constructor: ConstructorForm;
  onSaveConstructor: () => void;
  onRemoveConstructor: () => void;
  onDropField: (type: FieldType, index?: number) => void;
  onMoveField: (dragIndex: number, hoverIndex: number) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
}

export const ConstructorFormBuilder: FC<Props> = (props) => {
  const {
    constructor,
    onSaveConstructor,
    onRemoveConstructor,
    onDropField,
    onMoveField,
    onRemoveField,
    onUpdateField,
  } = props;
  const { fields } = constructor;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 items-start">
        <ToolboxPanel
          onSaveConstructor={onSaveConstructor}
          onRemoveConstructor={onRemoveConstructor}
        />
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2 p-4">
            <h1 className="text-lg font-medium">Название формы</h1>
            <h2 className="text-sm text-gray-600">Описание формы</h2>
          </div>
          <div className="flex flex-col">
            {fields.length === 0 && <DropZone onDropField={onDropField} className="min-h-24" />}
            {fields.length > 0 && (
              <>
                {fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <DropZone
                      onDropField={(type) => onDropField(type, index)}
                      className="min-h-5"
                    />
                    <DraggableFormField
                      field={field}
                      index={index}
                      onMoveField={onMoveField}
                      onRemoveField={onRemoveField}
                      onUpdateField={onUpdateField}
                    />
                  </Fragment>
                ))}
                <DropZone
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
