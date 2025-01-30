import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { FC } from 'react';
import { ResponseField } from '@/types/response';

type AnswerCardProps = {
  data: ResponseField;
};

export const AnswerCard: FC<AnswerCardProps> = ({ data }) => {
  const renderAnswer = (answer: string | string[]) => {
    if (typeof answer === 'string') {
      return <p className="text-start text-sm">{answer}</p>;
    } else {
      return (
        <p className="text-start text-sm flex flex-col gap-2">
          {answer.map((item, index) => (
            <span key={item + index}>{item}</span>
          ))}
        </p>
      );
    }
  };

  return (
    <GlassWrapper key={data.id} className="p-5">
      <div className="flex flex-col items-start gap-1">
        <h3 className="font-semibold">{data.question}</h3>
        {renderAnswer(data.answer)}
      </div>
    </GlassWrapper>
  );
};
