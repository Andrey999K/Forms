import { Button, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetFormQuery } from '@/redux/form';
import { useGetResponseQuery } from '@/redux/response';
import { Loader } from '@/components/ui/Loader';
import { AnswerCard } from '@/components/FormResponse/AnswerCard';
import { NotFound } from '../notFoundPage/Page';
import { usePageTitle } from '@/hooks/usePageTitle';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';

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
    <div className="flex flex-col gap-4">
      <Typography.Text className="!text-xl font-medium xl:px-0 md:!text-2xl self-start">
        Отклик на форму
      </Typography.Text>
      <GlassWrapper className="flex flex-col gap-4 p-5 w-full">
        <div className="flex flex-col justify-center">
          <Typography.Text className="text-xl">{form.title}</Typography.Text>
          <Typography.Text>{form.description}</Typography.Text>
        </div>
        <div className="flex flex-col gap-3">
          {response.fields.map((field) => (
            <AnswerCard key={field.id} data={field} />
          ))}
          <div className="flex items-center gap-3 justify-end">
            <Button>
              <Link to={`/forms/${formId}/edit`}>Редактировать форму</Link>
            </Button>
            <Button type="primary">
              <Link to={`/forms/${formId}`}>Перейти к форме</Link>
            </Button>
          </div>
        </div>
      </GlassWrapper>
    </div>
  );
};
