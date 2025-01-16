import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetFormQuery } from '@/redux/form';
import { Loader } from '@/components/ui/Loader';

export const FormPage = () => {
  const { formId } = useParams();
  const { data: formData, isLoading } = useGetFormQuery(formId || '');

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  if (!formId) {
    return <h2>Форма не найдена!</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!formData) {
    return <h2>Нет данных!</h2>;
  }

  return (
    <div className="pt-5">
      <h2 className="font-semibold text-lg">{formData.title}</h2>
      <p className="mt-3">{formData.description}</p>
      <div className="flex flex-col gap-3"></div>
    </div>
  );
};
