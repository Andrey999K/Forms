import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { Button } from 'antd';
import { FC } from 'react';
import typography from 'antd/es/typography';
import { convertTimeInWords } from '@/utils/convertTimeInWords.ts';

type StartTimerProps = {
  onStart: () => void;
  time: string;
};

const { Title, Text } = typography;

export const StartTimer: FC<StartTimerProps> = ({ onStart, time }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <GlassWrapper className="pt-8 pb-12 px-8 w-full max-w-screen-lg flex flex-col justify-center items-center gap-3">
        <Title className="font-semibold !text-3xl !mb-0">Внимание!</Title>
        <Text className="text-base mb-1">
          На заполнение этой формы даётся {convertTimeInWords(time)}!
        </Text>
        <div className="mt-2 w-full max-w-[16ch]">
          <Button type="primary" className="w-full" onClick={onStart}>
            Начать
          </Button>
        </div>
      </GlassWrapper>
    </div>
  );
};
