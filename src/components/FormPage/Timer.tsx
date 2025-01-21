import { CountdownProps, Statistic } from 'antd';
import { FC } from 'react';

const { Countdown } = Statistic;

type TimerProps = {
  onFinish: () => void;
};

export const Timer: FC<TimerProps> = ({ onFinish }) => {
  const handleFinish: CountdownProps['onFinish'] = () => {
    onFinish();
  };

  const deadline = Date.now() + 1000 * 60 * 15 + 500;

  return (
    <Countdown
      title="Осталось времени"
      value={deadline}
      onFinish={handleFinish}
      className="flex flex-col custom-timer text-nowrap"
    />
  );
};
