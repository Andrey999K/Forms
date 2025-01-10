import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorFormBuilder } from '@/components/formsEdit/ConstructorFormBuilder';
import { ConstructorField, ConstructorForm, FieldType } from '@/types';
import { toast } from 'react-toastify';
import { useGetFormQuery, useUpdateFormMutation, useDeleteFormMutation } from '@/redux/form';
import { Spin } from 'antd';

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
      const newField: ConstructorField = {
        id: uuidv4(),
        type,
        question: '',
        require: false,
      };
      const newFields = [...fields];
      if (index !== undefined) {
        newFields.splice(index, 0, newField);
      } else {
        newFields.push(newField);
      }
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
    <ConstructorFormBuilder
      constructor={constructor}
      onSaveConstructor={handleSaveForms}
      onRemoveConstructor={handleRemoveForms}
      onDropField={handleDropField}
      onMoveField={moveField}
      onRemoveField={removeField}
      onUpdateField={updateField}
      onChangeForm={handleChangeForm}
      isLoading={isUpdating || isDeleting}
    />
  );
};
