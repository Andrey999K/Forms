import { useParams } from 'react-router-dom';
import { useGetFormQuery } from '@/redux/form';
import { Loader } from '@/components/ui/Loader';
import { Button, Form, Typography } from 'antd';
import { useCreateResponseMutation } from '@/redux/response';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ResponseSendMessage } from '@/components/FormPage';
import { StartTimer } from '@/components/FormPage/StartTimer.tsx';
import { Timer } from '@/components/FormPage/Timer.tsx';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';
import { renderField } from '@/utils/renderField.tsx';
import PageTitle from '@/components/ui/PageTitle/PageTitle';

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
    return (
      <>
        <PageTitle title="Форма" />
        <h2>Форма не найдена!</h2>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <PageTitle title="Форма" />
        <Loader />
      </>
    );
  }

  if (!formData) {
    return (
      <>
        <PageTitle title="Форма" />
        <h2>Нет данных!</h2>
      </>
    );
  }

  if (!timerStart && formData?.timer) {
    return (
      <>
        <PageTitle title={formData?.title ? `Форма | ${formData.title}` : 'Форма'} />
        <StartTimer onStart={startTimer} />
      </>
    );
  }

  return (
    <div className="pt-5 relative">
      <PageTitle title={formData?.title ? `Форма | ${formData.title}` : 'Форма'} />
      {isLoadingCreateResponse && (
        <div className="absolute h-full inset-0 bg-white/90 flex justify-center items-center z-10">
          <Loader />
        </div>
      )}
      {formSubmitted ? (
        <ResponseSendMessage />
      ) : (
        <div className="flex gap-4 items-start w-full">
          <GlassWrapper className="p-10 relative w-full overflow-hidden max-h-[calc(100dvh-200px)]">
            <div className="flex items-center justify-around">
              <div className="flex flex-col gap-3">
                <Typography className="text-lg font-bold leading-none">{formData.title}</Typography>
                <Typography.Text className="text-sm line-clamp-3">
                  {formData.description}
                </Typography.Text>
              </div>
            </div>
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
                      field.require
                        ? [{ required: true, message: 'Поле обязательно к заполнению!' }]
                        : []
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
          </GlassWrapper>
          {formData?.timer && timerStart && (
            <GlassWrapper className="p-10">
              <Timer onFinish={sendFormAfterTimer} />
            </GlassWrapper>
          )}
        </div>
      )}
    </div>
  );
};
