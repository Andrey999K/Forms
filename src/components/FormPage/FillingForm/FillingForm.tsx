import { Button, Form, FormInstance } from 'antd';
import { renderField } from '@/utils/renderField.tsx';
import { useEffect, useState } from 'react';
import { useGetFormQuery } from '@/redux/form';
import { Link, useParams } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage.ts';
import { FormLocal } from '@/types/form.ts';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/redux/user/userSlice.ts';

type FillingFormProps = {
  form: FormInstance;
  onSend: (_values: { [key: string]: string | string[] }, strict?: boolean) => void;
  isLoading: boolean;
};

export const FillingForm = ({ form, onSend, isLoading }: FillingFormProps) => {
  const { formId } = useParams<{ formId: string }>();
  const { data: formData } = useGetFormQuery(formId || '');
  const [isFormValid, setIsFormValid] = useState(false);
  const { value: formsLocal, update, remove } = useLocalStorage<FormLocal[]>('form');
  const currentUser = useSelector(getCurrentUser());

  const deleteDraft = () => {
    remove();
  };

  const saveDraft = () => {
    const formValues = form.getFieldsValue();
    if (formsLocal && typeof formsLocal === 'object') {
      if (formsLocal.find((currentForm) => currentForm.formId === formId)) {
        const newData = formsLocal.map((currentForm) => {
          if (currentForm.formId === formId) {
            return { ...currentForm, fields: formValues };
          }
          return currentForm;
        });
        update(newData);
      } else if (formId) {
        update([...formsLocal, { formId, fields: formValues }]);
      }
    } else if (formId) {
      update([{ formId, fields: formValues }]);
    }
  };

  const onFinish = async (values: { [key: string]: string }) => {
    onSend(values);
    deleteDraft();
  };

  // Обработчик изменения формы
  const onValuesChange = () => {
    saveDraft();
    // Проверяем наличие обязательных полей
    const requiredFields = formData?.fields.filter((field) => field.require);
    // Проверяем валидность всех обязательных полей
    const isValid = !!requiredFields?.every((field) => {
      const value = form.getFieldValue(field.id);
      if (field.type === 'checkbox') {
        // Для чекбоксов проверяем, что хотя бы одно значение выбрано
        return Array.isArray(value) && value.length > 0;
      }
      // Для остальных типов полей просто проверяем на наличие значения
      return !!value;
    });
    setIsFormValid(isValid);
  };

  useEffect(() => {
    if (formsLocal && formsLocal.length > 0 && typeof formsLocal === 'object') {
      const currentLocalForm = formsLocal.find((currentForm) => currentForm.formId === formId);
      if (currentLocalForm) {
        form.setFieldsValue(currentLocalForm.fields);
      }
      onValuesChange();
    }
  }, []);

  if (!formData) return false;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="mt-5 custom-form flex flex-col h-full max-h-full"
      layout="vertical"
      onValuesChange={onValuesChange}
    >
      <div className="overflow-auto h-full max-h-[calc(100dvh-440px)] pr-2">
        {formData.fields.map((field) => (
          <Form.Item
            key={field.id}
            label={field.question}
            name={field.id}
            rules={
              field.require ? [{ required: true, message: 'Поле обязательно к заполнению!' }] : []
            }
          >
            {renderField(field, isLoading)}
          </Form.Item>
        ))}
      </div>
      <div className="mb-0 py-5 relative h-full block border-t-[1px] border-solid border-gray-200 dark:border-gray-600">
        <div className="flex justify-start gap-3">
          <Button type="primary" htmlType="submit" disabled={!isFormValid} loading={isLoading}>
            Отправить форму
          </Button>
          {currentUser && formData.userId === currentUser.uid && (
            <Button>
              <Link to={`/forms/${formId}/edit`}>Редактировать форму</Link>
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};
