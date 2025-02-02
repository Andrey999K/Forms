import { CountdownProps, Statistic } from 'antd';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage.ts';

const { Countdown } = Statistic;

type TimerProps = {
  value?: string;
  onFinish: () => void;
  isLoading?: boolean;
};

export const Timer: FC<TimerProps> = ({ value, onFinish, isLoading }) => {
  const { formId } = useParams<{ formId: string }>();
  const {
    value: formLocalStorage,
    get: getForm,
    update,
  } = useLocalStorage<{
    formId: string;
    timer: number;
  } | null>('form');

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

  if (formLocalStorage && 'timer' in formLocalStorage) {
    deadline = deadline < formLocalStorage.timer ? deadline : formLocalStorage.timer;
  }

  // чтобы оставшееся время отсчитывалось от текущего момента
  deadline += Date.now();

  useEffect(() => {
    return () => {
      const currentTimeForm = deadline - Date.now();
      if (currentTimeForm > 0) {
        const currentLocalForm = getForm();
        if (currentLocalForm && typeof currentLocalForm === 'object') {
          console.log('Меняем существующий объект', currentLocalForm);
          update({ ...currentLocalForm, timer: currentTimeForm });
        } else if (formId) {
          console.log('Создаём новый объект');
          update({ formId, timer: currentTimeForm });
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
