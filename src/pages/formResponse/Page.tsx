import { mockAnswers } from '@/pages/formResponse/mock.tsx';
import { Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';

export const FormResponse = () => {
  const { formId } = useParams();

  return (
    <div className="pt-5 pb-20">
      <h2 className="font-semibold">Название формы — Форма №1</h2>
      <div className="flex flex-col gap-2 mt-4">
        {mockAnswers.map((answer) => (
          <GlassWrapper key={answer.id} className="p-5">
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-semibold">{answer.question}</h3>
              <p className="text-start text-sm">{answer.answer}</p>
            </div>
          </GlassWrapper>
        ))}
        <div className="flex items-center gap-3 mt-4">
          <Button type="primary">
            <Link to={`/forms/${formId}`}>Перейти к форме</Link>
          </Button>
          <Button>
            <Link to={`/forms/${formId}/edit`}>Редактировать форму</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
