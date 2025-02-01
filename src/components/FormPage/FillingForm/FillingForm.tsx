import { Button, Form, FormInstance } from 'antd';
import { renderField } from '@/utils/renderField.tsx';
import { useEffect, useState } from 'react';
import { useGetFormQuery } from '@/redux/form';
import { useParams } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage.ts';

type FillingFormProps = {
  form: FormInstance;
  onSend: (_values: { [key: string]: string | string[] }, strict?: boolean) => void;
};

export const FillingForm = ({ form, onSend }: FillingFormProps) => {
  const { formId } = useParams();
  const { data: formData } = useGetFormQuery(formId || '');
  const [isFormValid, setIsFormValid] = useState(false);
  const { value: draft, update } = useLocalStorage('draft');

  const onFinish = async (values: { [key: string]: string }) => {
    onSend(values);
  };

  const saveDraft = () => {
    const formValues = form.getFieldsValue();
    update(formValues);
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
    if (draft && Object.keys(draft).length > 0) {
      form.setFieldsValue(draft);
      setIsFormValid(true);
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
            {renderField(field)}
          </Form.Item>
        ))}
      </div>
      <div className="mb-0 py-5 relative h-full block border-t-[1px] border-solid border-gray-200">
        <div className="flex justify-start">
          <Button type="primary" htmlType="submit" disabled={!isFormValid}>
            Отправить форму
          </Button>
        </div>
      </div>
    </Form>
  );
};
