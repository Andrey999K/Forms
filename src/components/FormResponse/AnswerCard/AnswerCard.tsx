import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { FC } from 'react';
import { ResponseField } from '@/types/response';
import { Typography } from 'antd';

type AnswerCardProps = {
  data: ResponseField;
};

export const AnswerCard: FC<AnswerCardProps> = ({ data }) => {
  const renderAnswer = (answer: string | string[]) => {
    if (typeof answer === 'string') {
      return <Typography.Text>{answer}</Typography.Text>;
    } else {
      return (
        <Typography.Text>
          {answer.map((item, index) => (
            <Typography.Text key={item + index}>{item}</Typography.Text>
          ))}
        </Typography.Text>
      );
    }
  };

  return (
    <GlassWrapper key={data.id} className="p-3 shadow-none">
      <div className="flex flex-col items-start gap-1">
        <Typography.Text className="font-semibold">{data.question}</Typography.Text>
        {renderAnswer(data.answer)}
      </div>
    </GlassWrapper>
  );
};
