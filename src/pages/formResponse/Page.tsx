import { Button } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetFormQuery } from '@/redux/form';
import { Loader } from '@/components/common';
import { useGetResponseQuery } from '@/redux/response';
import { ROUTES } from '@/utils/routesConfig.ts';
import { AnswerCard } from '@/components/FormResponse/AnswerCard';

export const FormResponse = () => {
  const { formId, responseId } = useParams();
  const { data: form, isLoading: isLoadingForm } = useGetFormQuery(formId || '');
  const { data: response, isLoading: isLoadingResponse } = useGetResponseQuery(responseId || '');
  const navigate = useNavigate();

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
          <AnswerCard key={field.id} data={field} />
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
