import { useParams } from 'react-router-dom';
import { useGetFormQuery } from '@/redux/form';
import { Loader } from '@/components/ui/Loader';
import { Button, Checkbox, Form, Input, Radio, Typography } from 'antd';
import { ConstructorField } from '@/types';
import { useCreateResponseMutation } from '@/redux/response';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ResponseSendMessage } from '@/components/FormPage';
import { StartTimer } from '@/components/FormPage/StartTimer.tsx';
import { Timer } from '@/components/FormPage/Timer.tsx';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';

export const FormPage = () => {
  const { formId } = useParams();
  const { data: formData, isLoading } = useGetFormQuery(formId || '');
  const [createFormResponse, { isLoading: isLoadingCreateResponse }] = useCreateResponseMutation();
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [timerStart, setTimerStart] = useState(false);

  const startTimer = () => {
    setTimerStart(true);
  };

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
              <Radio key={option.id} value={option.id}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'checkbox':
        return (
          <Checkbox.Group className="flex justify-start gap-2">
            {field.options?.map((option) => (
              <Checkbox key={option.id} value={option.id}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
    }
  };

  const sendForm = async (_values: { [key: string]: string | string[] }, strict?: boolean) => {
    const allValues = form.getFieldsValue({ strict });
    // Если при отправке формы по таймеру есть незаполненные поля, пишем в них прочерк
    const completeValues = Object.keys(allValues).reduce((acc: Record<string, any>, key) => {
      acc[key] = allValues[key] || '—'; // Если значение пустое, ставим "-"
      return acc;
    }, {});
    const answers = Object.keys(completeValues)
      .map((field) => {
        const questionData = formData?.fields.find((currentField) => currentField.id === field);
        const findedField = formData?.fields.find((item) => item.id === field);
        let value = completeValues[field];
        if (findedField?.type === 'radio') {
          value = findedField.options?.find((option) => option.id === completeValues[field])?.label;
        }
        if (findedField?.type === 'checkbox' && Array.isArray(value)) {
          value = value.map(
            (item) => findedField.options?.find((option) => option.id === item)!.label as string
          );
        }
        return questionData
          ? { id: questionData.id, question: questionData.question, answer: value || '—' }
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

  const onFinish = async (values: { [key: string]: string }) => {
    await sendForm(values);
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

  const sendFormAfterTimer = async () => {
    await sendForm(form.getFieldsValue(true));
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

  if (!timerStart && formData?.settings?.timerActive) {
    return <StartTimer onStart={startTimer} />;
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
        <div className="flex gap-4 items-start">
          <GlassWrapper className="p-10 relative">
            <div className="flex items-center justify-around">
              <div className="flex flex-col gap-3">
                <Typography className="text-lg font-bold leading-none">{formData.title}</Typography>
                <Typography.Text className="text-sm block">{formData.description}</Typography.Text>
              </div>
            </div>
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
              <Form.Item className="mb-0">
                <div className="flex justify-start">
                  <Button type="primary" htmlType="submit" disabled={!isFormValid}>
                    Отправить форму
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </GlassWrapper>
          <GlassWrapper className="p-10">
            {formData.settings?.timerActive && timerStart && (
              <Timer onFinish={sendFormAfterTimer} />
            )}
          </GlassWrapper>
        </div>
      )}
    </div>
  );
};
