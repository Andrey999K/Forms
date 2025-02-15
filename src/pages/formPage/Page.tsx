import { ResponseSendMessage } from '@/components/FormPage';
import { FillingForm } from '@/components/FormPage/FillingForm';
import { StartTimer } from '@/components/FormPage/StartTimer.tsx';
import { Timer } from '@/components/FormPage/Timer.tsx';
import { Loader } from '@/components/ui/Loader';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';
import useLocalStorage from '@/hooks/useLocalStorage.ts';
import { usePageTitle } from '@/hooks/usePageTitle';
import { incrementResponseCount, useGetFormQuery } from '@/redux/form';
import { useCreateResponseMutation } from '@/redux/response';
import { AppDispatch } from '@/redux/store';
import { Flex, Form, notification, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export const FormPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { formId } = useParams();
  const { data: formData, isLoading } = useGetFormQuery(formId || '');
  const [createFormResponse, { isLoading: isLoadingCreateResponse }] = useCreateResponseMutation();
  const [form] = Form.useForm();
  const { remove } = useLocalStorage('form');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [timerStart, setTimerStart] = useState(false);

  const startTimer = () => {
    setTimerStart(true);
  };

  const clearLocalStorageForm = () => {
    remove();
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
          clearLocalStorageForm();
          dispatch(incrementResponseCount({ id: formId ?? '' }));
          setIsFormSubmitted(true);
        }
      } catch (error: any) {
        notification.error({ message: 'Произошла неизвестная ошибка!' });

        console.error('Error', error.data);
      }
    }
  };

  const sendFormAfterTimer = async () => {
    await sendForm(form.getFieldsValue(true));
  };

  usePageTitle(formData?.title ? `Форма | ${formData.title}` : 'Форма');

  useEffect(() => {
    if (isFormSubmitted) {
      clearLocalStorageForm();
    }
  }, [isFormSubmitted]);

  if (!formId) {
    return <h2>Форма не найдена!</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!formData) {
    return <h2>Нет данных!</h2>;
  }

  if (!timerStart && formData?.timer) {
    return <StartTimer onStart={startTimer} time={formData.timer} />;
  }

  return (
    <div className="relative">
      {isFormSubmitted ? (
        <ResponseSendMessage />
      ) : (
        <div className="flex gap-4 items-start w-full">
          <GlassWrapper className="p-10 relative w-full overflow-hidden max-h-[calc(100dvh-200px)]">
            <div className="flex items-center justify-around">
              <div className="flex flex-col gap-3">
                <Typography className="text-lg font-bold leading-none">{formData.title}</Typography>
                <Typography.Text className="text-sm">{formData.description}</Typography.Text>
                <Flex>
                  {formData.tags.map((tag) => (
                    <Tag key={tag.id} color={tag.color}>
                      {tag.label}
                    </Tag>
                  ))}
                </Flex>
              </div>
            </div>
            <FillingForm form={form} onSend={sendForm} isLoading={isLoadingCreateResponse} />
          </GlassWrapper>
          {formData?.timer && timerStart && (
            <GlassWrapper className="p-10">
              <Timer
                value={formData.timer}
                onFinish={sendFormAfterTimer}
                isLoading={isLoadingCreateResponse}
              />
            </GlassWrapper>
          )}
        </div>
      )}
    </div>
  );
};
