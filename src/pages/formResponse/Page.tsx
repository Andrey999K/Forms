import { Button } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper.tsx';
import { useGetFormQuery } from '@/redux/form';
import { Loader } from '@/components/common';
import { useGetResponseQuery } from '@/redux/response';
import { ROUTES } from '@/utils/routesConfig.ts';

export const FormResponse = () => {
  const { formId, responseId } = useParams();
  const { data: form, isLoading: isLoadingForm } = useGetFormQuery(formId || '');
  const { data: response, isLoading: isLoadingResponse } = useGetResponseQuery(responseId || '');
  const navigate = useNavigate();

  const renderAnswer = (answer: string | string[]) => {
    if (typeof answer === 'string') {
      return answer;
    } else {
      return (
        <p className="flex flex-col gap-2">
          {answer.map((item, index) => (
            <span key={item + index}>{item}</span>
          ))}
        </p>
      );
    }
  };

  if (isLoadingForm || isLoadingResponse) return <Loader />;

  if (!form || !response) {
    navigate(ROUTES.NOT_FOUND);
    return;
  }

  return (
    <div className="pt-5 pb-20">
      <h2 className="font-semibold">Название формы — {form.title}</h2>
      <p className="text-sm mt-2">{form.description}</p>
      <div className="flex flex-col gap-2 mt-8">
        {response.fields.map((field) => (
          <GlassWrapper key={field.id} className="p-5">
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-semibold">{field.question}</h3>
              <p className="text-start text-sm">{renderAnswer(field.answer)}</p>
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
