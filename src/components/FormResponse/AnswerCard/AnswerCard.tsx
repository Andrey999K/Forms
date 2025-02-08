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
      return (
        <Typography.Paragraph style={{ textAlign: 'start', fontSize: '0.875rem' }}>
          {answer}
        </Typography.Paragraph>
      );
    } else {
      return (
        <Typography.Paragraph
          style={{
            textAlign: 'start',
            fontSize: '0.875rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {answer.map((item, index) => (
            <Typography.Text key={item + index}>{item}</Typography.Text>
          ))}
        </Typography.Paragraph>
      );
    }
  };

  return (
    <GlassWrapper key={data.id} className="p-5">
      <div className="flex flex-col items-start gap-1">
        <Typography.Title level={5} style={{ fontWeight: 600, marginBottom: 0 }}>
          {data.question}
        </Typography.Title>
        {renderAnswer(data.answer)}
      </div>
    </GlassWrapper>
  );
};
