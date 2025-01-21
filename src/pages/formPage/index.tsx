import { useParams } from 'react-router-dom';
import { useGetFormQuery } from '@/redux/form';
import { Loader } from '@/components/ui/Loader';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import { ConstructorField } from '@/types';
import { useCreateResponseMutation } from '@/redux/response';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ResponseSendMessage } from '@/components/FormPage';

export const FormPage = () => {
  const { formId } = useParams();
  const { data: formData, isLoading } = useGetFormQuery(formId || '');
  const [createFormResponse, { isLoading: isLoadingCreateResponse }] = useCreateResponseMutation();
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const renderField = (field: ConstructorField) => {
    const { type } = field;
    switch (type) {
      case 'input':
        return <Input key={field.id} />;
      case 'textarea':
        return <Input.TextArea />;
      case 'radio':
        return (
          <Radio.Group className="flex justify-start">
            {field.options?.map((option) => (
              <Radio key={option.id} value={option.label}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'checkbox':
        return (
          <Checkbox.Group className="flex justify-start">
            {field.options?.map((option) => (
              <Checkbox key={option.id} value={option.label}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
    }
  };

  const onFinish = async (values: { [key: string]: string }) => {
    const answers = Object.keys(values)
      .map((field) => {
        const questionData = formData?.fields.find((currentField) => currentField.id === field);
        return questionData
          ? { id: questionData.id, question: questionData.question, answer: values[field] || '—' }
          : false;
      })
      .filter((item) => item !== false);
    if (formId) {
      const answersData = {
        fields: answers,
        formId,
      };
      try {
        const result = await createFormResponse(answersData).unwrap();
        if (result) {
          setFormSubmitted(true);
        }
      } catch (error: any) {
        toast.error('Произошла неизвестная ошибка!');
        console.error('Error', error.data);
      }
    }
  };

  // Обработчик изменения формы
  const onValuesChange = () => {
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

  if (!formId) {
    return <h2>Форма не найдена!</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!formData) {
    return <h2>Нет данных!</h2>;
  }

  return (
    <div className="pt-5 relative">
      {isLoadingCreateResponse && (
        <div className="absolute h-full inset-0 bg-white/90 flex justify-center items-center z-10">
          <Loader />
        </div>
      )}
      {formSubmitted ? (
        <ResponseSendMessage />
      ) : (
        <>
          <h2 className="font-semibold text-lg">{formData.title}</h2>
          <p className="mt-3">{formData.description}</p>
          <Form
            form={form}
            onFinish={onFinish}
            className="mt-3 custom-form"
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            {formData.fields.map((field) => (
              <Form.Item
                key={field.id}
                label={field.question}
                name={field.id}
                rules={
                  field.require
                    ? [{ required: true, message: 'Поле обязательно к заполнению!' }]
                    : []
                }
              >
                {renderField(field)}
              </Form.Item>
            ))}
            <Form.Item>
              <div className="flex justify-start">
                <Button type="primary" htmlType="submit" disabled={!isFormValid}>
                  Отправить форму
                </Button>
              </div>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};
