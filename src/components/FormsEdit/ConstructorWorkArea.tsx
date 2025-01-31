import { ConstructorField, ConstructorForm, FieldType } from '@/types';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { ConstructorDraggableField } from './ConstructorDraggableField';
import { ConstructorDropZone } from './ConstructorDropZone';
import { useConstructorItems } from './useConstructorItems';
import { getUUID } from '@/utils/getUUID';

type Props = {
  constructor: ConstructorForm;
  onError: (id: string, updates: boolean) => void;
  onDropField: (type: FieldType, index?: number, newId?: string) => void;
  onMoveField: (dragIndex: number, hoverIndex: number) => void;
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<ConstructorField>) => void;
  onCopyField: (id: string, index: 'next' | 'last', newId: string) => void;
};

export const ConstructorWorkArea: FC<Props> = (props) => {
  const {
    constructor,
    onDropField,
    onMoveField,
    onRemoveField,
    onUpdateField,
    onCopyField,
    onError,
  } = props;
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [copyFieldsId, setCopyFieldId] = useState<string | null>(null);
  const [copiedFields, setCopiedFields] = useState<Set<string>>(new Set());
  const [sourceFieldId, setSourceFieldId] = useState<string | null>(null);
  const [sourceFields, setSourceFields] = useState<Set<string>>(new Set());
  const { items } = useConstructorItems();

  const menuItems: MenuProps['items'] = Object.entries(items).map(([key, { label, jsxIcon }]) => ({
    key,
    label: label,
    icon: jsxIcon,
    onClick: () => {
      const newId = getUUID() as string;
      onDropField(key as FieldType, constructor.fields.length, newId);
      setCopyFieldId(newId);
      setCopiedFields((prev) => new Set(prev).add(newId));
      setTimeout(() => setCopyFieldId?.(null), 5000);
    },
  }));

  const isOutsideWorkspace = (x: number, y: number) => {
    if (!workspaceRef.current) return false;
    const rect = workspaceRef.current.getBoundingClientRect();
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  };

  const handleCopyField = (id: string, index: 'next' | 'last', newId: string) => {
    onCopyField(id, index, newId);
    setCopyFieldId(newId);
    setSourceFieldId(id);
    setCopiedFields((prev) => new Set(prev).add(newId));
    setSourceFields((prev) => new Set(prev).add(id));
  };

  useEffect(() => {
    if (copyFieldsId && workspaceRef.current) {
      const fieldElement = workspaceRef.current.querySelector(`[data-field-id="${copyFieldsId}"]`);

      if (fieldElement) {
        fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [copyFieldsId]);

  useEffect(() => {
    if (sourceFields || copiedFields) {
      const timeout = setTimeout(() => {
        setCopyFieldId?.(null);
        setSourceFieldId(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [sourceFields, copiedFields]);

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
          <ConstructorDropZone onDropField={(type) => onDropField(type, 0)} index={0} />
          {constructor.fields.map((field, index) => (
            <Fragment key={field.id}>
              <ConstructorDraggableField
                field={field}
                index={index}
                onError={onError}
                onMoveField={onMoveField}
                onRemoveField={onRemoveField}
                onUpdateField={onUpdateField}
                onCopyField={handleCopyField}
                isOutsideWorkspace={isOutsideWorkspace}
                copyFieldsId={copyFieldsId}
                copiedFields={copiedFields}
                sourceFieldId={sourceFieldId}
                sourceFields={sourceFields}
              />

              <ConstructorDropZone
                onDropField={(type) => onDropField(type, index + 1)}
                index={index + 1}
              />
            </Fragment>
          ))}
          <div className="w-full pb-2 flex justify-center">
            <Dropdown menu={{ items: menuItems }} placement="top" arrow={{ pointAtCenter: true }}>
              <Button
                type="text"
                icon={<PlusCircleOutlined className="cursor-pointer transition" />}
              />
            </Dropdown>
          </div>
        </>
      )}
    </GlassWrapper>
  );
};
