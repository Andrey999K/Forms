import { ConstructorField, ConstructorForm, FieldType } from '@/types';
import { FC, Fragment, useRef } from 'react';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { ConstructorDraggableField } from './ConstructorDraggableField';
import { ConstructorDropZone } from './ConstructorDropZone';

type Props = {
  constructor: ConstructorForm;
  onError: (id: string, updates: boolean) => void;
  onDropField: (type: FieldType, index?: number) => void;
  onMoveField: (dragIndex: number, hoverIndex: number) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  onChangeForm: ({ value, name }: { value: string; name: string }) => void;
};

export const ConstructorWorkArea: FC<Props> = (props) => {
  const { constructor, onDropField, onMoveField, onRemoveField, onUpdateField, onError } = props;
  const workspaceRef = useRef<HTMLDivElement>(null);

  const isOutsideWorkspace = (x: number, y: number) => {
    if (!workspaceRef.current) return false;
    const rect = workspaceRef.current.getBoundingClientRect();
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  };

  return (
    <GlassWrapper
      ref={workspaceRef}
      className="flex flex-col border border-dashed rounded-2xl border-orange-400 px-4"
    >
      {constructor.fields.length === 0 ? (
        <ConstructorDropZone
          onDropField={(type) => onDropField(type, 0)}
          className="!min-h-64"
          index={0}
        />
      ) : (
        <>
          <ConstructorDropZone
            onDropField={(type) => onDropField(type, 0)}
            className="min-h-5"
            index={0}
          />
          {constructor.fields.map((field, index) => (
            <Fragment key={field.id}>
              <ConstructorDraggableField
                field={field}
                index={index}
                onError={onError}
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
    </GlassWrapper>
  );
};
