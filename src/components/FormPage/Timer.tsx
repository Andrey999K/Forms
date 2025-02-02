import { CountdownProps, Statistic } from 'antd';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage.ts';
import { FormLocal } from '@/types/form.ts';

const { Countdown } = Statistic;

type TimerProps = {
  value?: string;
  onFinish: () => void;
  isLoading?: boolean;
};

export const Timer: FC<TimerProps> = ({ value, onFinish, isLoading }) => {
  const { formId } = useParams<{ formId: string }>();
  const {
    value: formsLocalStorage,
    get: getForm,
    update,
  } = useLocalStorage<FormLocal[] | null>('form');

  const handleFinish: CountdownProps['onFinish'] = () => {
    onFinish();
  };

  const convertStrToTime = (str: string) => {
    const massValue = str.split(':');
    return (
      1000 * (Number(massValue[2]) + 60 * (Number(massValue[1]) + 60 * Number(massValue[0]))) + 500
    );
  };

  let deadline = 1000 * 60 * 15 + 500;

  if (value) {
    deadline = convertStrToTime(value);
  }

  if (formsLocalStorage) {
    const currentLocalForm = formsLocalStorage.find((current) => current.formId === formId);

    if (
      currentLocalForm &&
      'timer' in currentLocalForm &&
      typeof currentLocalForm.timer === 'number'
    ) {
      deadline =
        deadline < (currentLocalForm.timer as number)
          ? deadline
          : (currentLocalForm.timer as number);
    }
  }

  // чтобы оставшееся время отсчитывалось от текущего момента
  deadline += Date.now();

  useEffect(() => {
    return () => {
      const currentTimeForm = deadline - Date.now();
      if (currentTimeForm > 0) {
        const currentLocalForms = getForm();
        if (currentLocalForms && typeof currentLocalForms === 'object') {
          if (
            (currentLocalForms as FormLocal[]).find((currentForm) => currentForm.formId === formId)
          ) {
            const newData = (currentLocalForms as FormLocal[]).map((currentForm) => {
              if (currentForm.formId === formId) {
                return { ...currentForm, timer: currentTimeForm };
              } else {
                return currentForm;
              }
            });
            update(newData);
          } else {
            update([...currentLocalForms, { formId, timer: currentTimeForm }]);
          }
        } else if (formId) {
          update([{ formId, timer: currentTimeForm }]);
        }
      }
    };
  }, []);

  return (
    <Countdown
      title="Осталось времени"
      value={deadline}
      onFinish={handleFinish}
      loading={isLoading}
      className="flex flex-col custom-timer text-nowrap"
    />
  );
};
