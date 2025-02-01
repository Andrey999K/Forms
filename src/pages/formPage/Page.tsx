import { useParams } from 'react-router-dom';
import { useGetFormQuery } from '@/redux/form';
import { Loader } from '@/components/ui/Loader';
import { Form, Typography } from 'antd';
import { useCreateResponseMutation } from '@/redux/response';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ResponseSendMessage } from '@/components/FormPage';
import { StartTimer } from '@/components/FormPage/StartTimer.tsx';
import { Timer } from '@/components/FormPage/Timer.tsx';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';
import PageTitle from '@/components/ui/PageTitle/PageTitle';
import { FillingForm } from '@/components/FormPage/FillingForm';

export const FormPage = () => {
  const { formId } = useParams();
  const { data: formData, isLoading } = useGetFormQuery(formId || '');
  const [createFormResponse, { isLoading: isLoadingCreateResponse }] = useCreateResponseMutation();
  const [form] = Form.useForm();

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
            <FillingForm form={form} onSend={sendForm} />
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
