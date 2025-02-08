import { Button, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetFormQuery } from '@/redux/form';
import { useGetResponseQuery } from '@/redux/response';
import { Loader } from '@/components/ui/Loader';
import { AnswerCard } from '@/components/FormResponse/AnswerCard';
import { NotFound } from '../notFoundPage/Page';
import { usePageTitle } from '@/hooks/usePageTitle';

export const FormResponse = () => {
  const { formId, responseId } = useParams();
  const { data: form, isLoading: isLoadingForm } = useGetFormQuery(formId || '');
  const { data: response, isLoading: isLoadingResponse } = useGetResponseQuery(responseId || '');

  usePageTitle(form?.title ? `Отклик | ${form.title}` : 'Отклик');

  if (isLoadingForm || isLoadingResponse) return <Loader />;

  if (!form || !response) {
    return <NotFound />;
  }

  return (
    <div className="pt-5 pb-20">
      <Typography.Text style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
        Название формы — {form.title}
      </Typography.Text>
      <Typography.Paragraph style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
        {form.description}
      </Typography.Paragraph>{' '}
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
