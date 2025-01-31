import { ConstructorHeader } from '@/components/FormsEdit/ConstructorHeader';
import { ConstructorWorkArea } from '@/components/FormsEdit/ConstructorWorkArea';
import { Sidebar } from '@/components/FormsEdit/Sidebar';
import PageTitle from '@/components/ui/PageTitle/PageTitle';
import {
  useCreateFormMutation,
  useDeleteFormMutation,
  useGetFormQuery,
  useUpdateFormMutation,
} from '@/redux/form';
import { RootState } from '@/redux/store';
import {
  ConstructorField,
  ConstructorForm,
  FieldType,
  FieldTypes,
  HandleChangeForm,
  NEW_FORM,
} from '@/types';
import { getUUID } from '@/utils/getUUID';
import { Spin } from 'antd';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NotFound } from '../notFoundPage/Page';

export const FormsEdit: FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const newFormId: string = location.state?.id;
  const [constructor, setConstructor] = useState<ConstructorForm | null>(null);
  const { data: formData, isLoading: isLoadingForm } = useGetFormQuery(formId || '', {
    skip: !formId,
  });
  const [createForm, { isLoading: isCreating }] = useCreateFormMutation();
  const [updateForm, { isLoading: isUpdating }] = useUpdateFormMutation();
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();
  const user = useSelector((state: RootState) => state.user.user);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const isError = useMemo(() => {
    let isError = false;
    Object.keys(errors).forEach((key) => {
      if (!isError && errors[key]) isError = true;
    });
    return isError;
  }, [errors]);

  const handleDropField = (type: FieldType, index?: number) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const isTypeRadio = type === FieldTypes.RADIO || type === FieldTypes.CHECKBOX;
      const options = isTypeRadio ? { options: [{ id: getUUID(), label: '' }] } : {};
      const newField: ConstructorField = {
        id: getUUID(),
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
      const newFields = fields.filter((field) => {
        if (field.options) {
          field.options.forEach((option) => setErrors((prev) => ({ ...prev, [option.id]: false })));
        }
        return field.id !== id;
      });
      return { ...prev, fields: newFields };
    });
  };

  const handleCopyField = (id: string, index: 'next' | 'last') => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const newFields = [...fields];
      const field = fields.find((field) => field.id === id);
      if (!field) return prev;
      const newField: ConstructorField = {
        ...field,
        id: getUUID(),
      };
      if (index === 'next') newFields.splice(newFields.indexOf(field) + 1, 0, newField);
      else newFields.push(newField);
      return { ...prev, fields: newFields };
    });
  };

  const handleSaveForms = async () => {
    if (!constructor) return;
    if (isError) return;

    try {
      if ('createAt' in constructor) {
        await updateForm(constructor).unwrap();
        toast.success('Форма успешно обновлена ');
      } else {
        await createForm(constructor).unwrap();
        toast.success('Форма успешно сохранена');
      }
    } catch (error) {
      console.log('Error', error);
      toast.error('Ошибка сохранения');
    }
  };

  const handleRemoveForms = async () => {
    try {
      if (formId) {
        await deleteForm(formId).unwrap();
        toast.success('Форма удалена');
        navigate('/');
      }
    } catch (error) {
      console.log('Error', error);
      toast.error('Ошибка при удалении');
    }
  };

  const handleChangeForm = ({ value, name }: HandleChangeForm) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  const handleError = (id: string, updates: boolean) => {
    setErrors((prev) => ({ ...prev, [id]: updates }));
  };

  useLayoutEffect(() => {
    if (formData) {
      setConstructor(() => formData);
    } else if (newFormId) {
      setConstructor(() => ({
        id: newFormId,
        userId: user?.uid || '',
        ...NEW_FORM,
      }));
    }
  }, [formData]);

  useEffect(() => {
    document.title = 'Конструктор';
  }, []);

  if (isLoadingForm) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!formData && !newFormId) {
    return <NotFound />;
  }

  if (!constructor) return <div>Ошибка при создании конструктора.</div>;

  return (
    <>
      <PageTitle
        title={formData?.title ? `Изменение формы | ${formData.title}` : 'Изменение формы'}
      />
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <div className="flex gap-4 items-start p-4">
          <Sidebar
            constructor={constructor}
            isCreating={isCreating}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
            isError={isError}
            isNew={!('createdAt' in constructor)}
            onSaveConstructor={handleSaveForms}
            onRemoveConstructor={handleRemoveForms}
            onChangeForm={handleChangeForm}
          />
          <div className="flex flex-col w-full relative gap-4 ">
            <ConstructorHeader constructor={constructor} onChangeForm={handleChangeForm} />
            <ConstructorWorkArea
              constructor={constructor}
              onError={handleError}
              onDropField={handleDropField}
              onMoveField={moveField}
              onRemoveField={removeField}
              onUpdateField={updateField}
              onCopyField={handleCopyField}
            />
          </div>
        </div>
      </DndProvider>
    </>
  );
};
