import { ConstructorHeader } from '@/components/FormsEdit/ConstructorHeader';
import { ConstructorWorkArea } from '@/components/FormsEdit/ConstructorWorkArea';
import { Sidebar } from '@/components/FormsEdit/Sidebar';
import {
  useCreateFormMutation,
  useDeleteFormMutation,
  useGetFormQuery,
  useUpdateFormMutation,
} from '@/redux/form';
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
import { FC, useLayoutEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '@/utils/routesConfig.ts';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

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
      const isTypeRadio = type === FieldTypes.RADIO;
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

  const checkBeforeSending = (constructor: ConstructorForm) => {
    let copyConstructor: ConstructorForm = JSON.parse(JSON.stringify(constructor));
    if (copyConstructor.settings.timerActive && copyConstructor.settings.timer === '') {
      copyConstructor = {
        ...copyConstructor,
        settings: { ...copyConstructor.settings, timerActive: false },
      };
    }
    return copyConstructor;
  };

  const handleSaveForms = async () => {
    if (!constructor) return;
    if (isError) return;

    const newConstructor = checkBeforeSending(constructor);
    try {
      if ('createAt' in newConstructor) {
        await updateForm(newConstructor).unwrap();
        toast.success('Форма успешно обновлена ');
      } else {
        await createForm(newConstructor).unwrap();
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

  if (isLoadingForm) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!formData && !newFormId) {
    navigate(ROUTES.NOT_FOUND);
    return;
  }

  if (!constructor) return <div>Ошибка при создании конструктора.</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 items-start p-4">
        <Sidebar
          constructor={constructor}
          isCreating={isCreating}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          isError={isError}
          isNew={!formData}
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
            onChangeForm={handleChangeForm}
          />
        </div>
      </div>
    </DndProvider>
  );
};
