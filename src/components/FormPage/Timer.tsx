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

  // const deadline = Date.now() + 1000 * 60 * 15 + 500;
  const deadline = Date.now() + 1000 * 10;

  return <Countdown title="Countdown" value={deadline} onFinish={handleFinish} />;
};
