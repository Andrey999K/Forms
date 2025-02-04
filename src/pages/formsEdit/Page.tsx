import { ConstructorHeader } from '@/components/FormsEdit/ConstructorHeader';
import { ConstructorWorkArea } from '@/components/FormsEdit/ConstructorWorkArea';
import { Sidebar } from '@/components/FormsEdit/Sidebar';
import { usePageTitle } from '@/hooks/usePageTitle';
import {
  createLocalForm,
  deleteLocalForm,
  updateLocalForm,
  useCreateFormMutation,
  useDeleteFormMutation,
  useGetFormQuery,
  useUpdateFormMutation,
} from '@/redux/form';
import { AppDispatch, RootState } from '@/redux/store';
import {
  ConstructorField,
  ConstructorForm,
  FieldType,
  FieldTypes,
  HandleChangeForm,
  NEW_FORM,
  Tag,
} from '@/types';
import { getUUID } from '@/utils/getUUID';
import { notification, Spin } from 'antd';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NotFound } from '../notFoundPage/Page';

export const FormsEdit: FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const dispatch = useDispatch<AppDispatch>();
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
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const handleDropField = (type: FieldType, index?: number, newId?: string) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const isTypeRadio = type === FieldTypes.RADIO || type === FieldTypes.CHECKBOX;
      const options = isTypeRadio ? { options: [{ id: getUUID(), label: '' }] } : {};
      const newField: ConstructorField = {
        id: newId ? newId : getUUID(),
        type,
        question: '',
        require: false,
        ...options,
      };
      const newFields = [...fields];
      if (index !== undefined) newFields.splice(index, 0, newField);
      else newFields.push(newField);
      updateFieldErrors('fields', 'delete');
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

  const updateField = useCallback((id: string, updates: Partial<ConstructorField>) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;

      const newFields = fields.map((field) => {
        if (field.id === id) {
          console.log(updates, updates.question, field.question);

          if (updates.question) updateFieldErrors(id, 'delete');
          if (field.options) {
            field.options.forEach((option) => updateFieldErrors(option.id, 'delete'));
          }
          return { ...field, ...updates };
        }
        return field;
      });
      return { ...prev, fields: newFields };
    });
  }, []);

  const removeField = (id: string) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const newFields = fields.filter((field) => {
        updateFieldErrors(id, 'delete');
        return field.id !== id;
      });
      return { ...prev, fields: newFields };
    });
  };

  const handleCopyField = (id: string, index: 'next' | 'last', newId: string) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      const { fields } = prev;
      const newFields = [...fields];
      const field = fields.find((field) => field.id === id);
      if (!field) return prev;
      const newField: ConstructorField = {
        ...field,
        id: newId,
      };
      if (index === 'next') newFields.splice(newFields.indexOf(field) + 1, 0, newField);
      else newFields.push(newField);
      return { ...prev, fields: newFields };
    });
  };

  const handleSaveForms = async () => {
    if (!constructor) return;
    const errorsList = validateForm();
    setErrors(errorsList);
    if (Object.keys(errorsList).length > 0) return;

    try {
      if ('createdAt' in constructor) {
        await updateForm(constructor).unwrap();
        const updConstructor = {
          ...constructor,
          responseCount: 0,
          createdAt: constructor.createdAt
            ? new Date(constructor.createdAt).getTime()
            : new Date().getTime(),
          updatedAt: constructor.updatedAt
            ? new Date(constructor.updatedAt).getTime()
            : new Date().getTime(),
        };
        dispatch(updateLocalForm(updConstructor));
        notification.success({ message: 'Форма успешно обновлена' });
      } else {
        await createForm(constructor).unwrap();
        const newConstructor = {
          ...constructor,
          responseCount: 0,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime(),
        };
        dispatch(createLocalForm(newConstructor));
        notification.success({ message: 'Форма успешно сохранена' });
      }
    } catch (error) {
      console.log('Error', error);
      notification.error({ message: 'Ошибка' });
    }
  };

  const handleRemoveForms = async () => {
    try {
      if (formId) {
        await deleteForm(formId).unwrap();
        dispatch(deleteLocalForm(formId));
        notification.info({ message: 'Форма успешно удалена' });
        navigate('/');
      }
    } catch (error) {
      console.log('Error', error);
      notification.error({ message: 'Ошибка' });
    }
  };

  const handleChangeForm = ({ value, name }: HandleChangeForm) => {
    setConstructor((prev) => {
      if (!prev) return prev;
      updateFieldErrors(name, 'delete');
      return { ...prev, [name]: value };
    });
  };

  const updateFieldErrors = (fieldId: string, value: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (value.trim() === '') newErrors[fieldId] = ['Поле не может быть пустым.'];
      else delete newErrors[fieldId];

      return newErrors;
    });
  };

  const validateForm = (): { [key: string]: string[] } => {
    const errors: { [key: string]: string[] } = {};

    if (!constructor) return errors;

    if (constructor.fields && Array.isArray(constructor.fields)) {
      if (constructor.fields.length === 0) {
        errors['fields'] = ['Добавьте как минимум 1 вопрос.'];
      } else if (errors['fields']) {
        delete errors['fields'];
      }

      constructor.fields.forEach((field) => {
        if (field.question?.trim() === '') {
          errors[field.id] = ['Поле не может быть пустым.'];
        } else if (errors[field.id] && field.question?.trim() !== '') {
          delete errors[field.id];
        }
        if (field.type === FieldTypes.RADIO || field.type === FieldTypes.CHECKBOX) {
          field.options?.forEach((option) => {
            if (option.label.trim() === '') {
              errors[option.id] = ['Поле не может быть пустым.'];
            } else if (errors[option.id] && option.label.trim() !== '') {
              delete errors[option.id];
            }
          });
        }
      });
    }

    if (constructor.title?.trim() === '') {
      errors['title'] = ['Поле не может быть пустым.'];
    } else if (errors['title'] && constructor.title?.trim() !== '') {
      delete errors['title'];
    }

    if (constructor.description?.trim() === '') {
      errors['description'] = ['Поле не может быть пустым.'];
    } else if (errors['description'] && constructor.description?.trim() !== '') {
      delete errors['description'];
    }

    return errors;
  };

  useLayoutEffect(() => {
    if (formData) {
      if ('settings' in formData) {
        let newFormData = { ...formData };
        const settings = formData.settings as { tags?: Tag[]; timer?: string };
        newFormData = {
          ...formData,
          tags: settings.tags || [],
          timer: settings.timer || '',
        };
        delete newFormData.settings;
        setConstructor(() => newFormData);
        return;
      }
      setConstructor(() => formData);
    } else if (newFormId) {
      setConstructor(() => ({
        id: newFormId,
        userId: user?.uid || '',
        ...NEW_FORM,
      }));
    }
  }, [formData]);

  usePageTitle(formData?.title ? `Изменение формы | ${formData.title}` : 'Изменение формы');

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
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="flex gap-4 items-start p-4">
        <Sidebar
          constructor={constructor}
          isCreating={isCreating}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          isError={Object.keys(errors).length > 0}
          isNew={!('createdAt' in constructor)}
          onSaveConstructor={handleSaveForms}
          onRemoveConstructor={handleRemoveForms}
          onChangeForm={handleChangeForm}
        />
        <div className="flex flex-col w-full relative gap-4 ">
          <ConstructorHeader
            constructor={constructor}
            onChangeForm={handleChangeForm}
            errors={errors}
          />
          <ConstructorWorkArea
            constructor={constructor}
            errors={errors}
            onDropField={handleDropField}
            onMoveField={moveField}
            onRemoveField={removeField}
            onUpdateField={updateField}
            onCopyField={handleCopyField}
          />
        </div>
      </div>
    </DndProvider>
  );
};
