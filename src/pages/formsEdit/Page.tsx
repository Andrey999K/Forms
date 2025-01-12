import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorHeader } from '@/components/formsEdit/ConstructorHeader';
import { ConstructorWorkArea } from '@/components/formsEdit/ConstructorWorkArea';
import { ToolboxPanel } from '@/components/formsEdit/ToolboxPanel';
import { useDeleteFormMutation, useGetFormQuery, useUpdateFormMutation } from '@/redux/form';
import { ConstructorField, ConstructorForm, FieldType, FieldTypes } from '@/types';

export const FormsEdit: FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [constructor, setConstructor] = useState<ConstructorForm | null>(null);
  const { data: formData, isLoading: isLoadingForm } = useGetFormQuery(formId || '', {
    skip: !formId,
  });
  const [updateForm, { isLoading: isUpdating }] = useUpdateFormMutation();
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();

  useEffect(() => {
    if (formData) setConstructor(() => formData);
  }, [formData]);

  const handleDropField = (type: FieldType, index?: number) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const isTypeRadio = type === FieldTypes.RADIO;
      const options = isTypeRadio ? { options: [{ id: uuidv4(), label: 'Вариант 1' }] } : {};
      const newField: ConstructorField = {
        id: uuidv4(),
        type,
        question: '',
        require: false,
        ...options,
      };
      const newFields = [...fields];
      if (index !== undefined) newFields.splice(index, 0, newField);
      else newFields.push(newField);
      return { ...prev, fields: newFields };
    });
  };

  const moveField = (dragIndex: number, hoverIndex: number) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const newFields = [...fields];
      const [removed] = newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, removed);
      return { ...prev, fields: newFields };
    });
  };

  const updateField = (id: string, updates: Partial<ConstructorField>) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const newFields = fields.map((field) => (field.id === id ? { ...field, ...updates } : field));
      return { ...prev, fields: newFields };
    });
  };

  const removeField = (id: string) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const newFields = fields.filter((field) => field.id !== id);
      return { ...prev, fields: newFields };
    });
  };

  const handleSaveForms = async () => {
    if (!constructor) return;
    try {
      await updateForm(constructor).unwrap();
      toast.success('Сохранено успешно');
    } catch (error) {
      console.log('Error', error);
      toast.error('Ошибка сохранения');
    }
  };

  const handleRemoveForms = async () => {
    try {
      if (formId) {
        await deleteForm(formId).unwrap();
        toast.success('Удалено успешно');
        navigate('/');
      }
    } catch (error) {
      console.log('Error', error);
      toast.error('Ошибка при удалении');
    }
  };

  const handleChangeForm = ({ value, name }: { value: string; name: string }) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  if (isLoadingForm) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!formData) {
    toast.error('Ошибка загрузки');
    navigate('/');
    return;
  }
  if (!constructor) {
    return;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 items-start">
        <ToolboxPanel
          onSaveConstructor={handleSaveForms}
          onRemoveConstructor={handleRemoveForms}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          isEmptyFields={constructor.fields.length === 0}
        />
        <div className="flex flex-col w-full relative gap-4">
          <ConstructorHeader constructor={constructor} onChangeForm={handleChangeForm} />
          <ConstructorWorkArea
            constructor={constructor}
            onDropField={handleDropField}
            onMoveField={moveField}
            onRemoveField={removeField}
            onUpdateField={updateField}
            onChangeForm={handleChangeForm}
          />
        </div>
      </div>
    </DndProvider>
  );
};
