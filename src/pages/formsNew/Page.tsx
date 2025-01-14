import { FC, useEffect } from 'react';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateFormMutation } from '@/redux/form';
import { toast } from 'react-toastify';

export const FormsNew: FC = () => {
  const navigate = useNavigate();
  const [createForm, { isLoading, isSuccess, data: newForm }] = useCreateFormMutation();

  useEffect(() => {
    const initForm = async () => {
      try {
        await createForm({}).unwrap();
      } catch {
        toast.error('Ошибка при создании формы');
        navigate('/');
      }
    };

    initForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess && newForm?.id) {
      navigate(`/forms/${newForm.id}/edit`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, newForm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return null;
};
