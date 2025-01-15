import { mockAnswers } from '@/pages/formResponse/mock.tsx';
import { Button, Card } from 'antd';
import { Link, useParams } from 'react-router-dom';

export const FormResponse = () => {
  const { formId } = useParams();

  return (
    <div className="pt-5 pb-20">
      <h2 className="font-semibold">Название формы — Форма №1</h2>
      <div className="flex flex-col gap-2 mt-4">
        {mockAnswers.map((answer) => (
          <Card key={answer.id} className="bg-white/20 border-gray/20">
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-semibold">{answer.question}</h3>
              <p className="text-start">{answer.answer}</p>
            </div>
          </Card>
        ))}
        <div className="flex items-center gap-3">
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
