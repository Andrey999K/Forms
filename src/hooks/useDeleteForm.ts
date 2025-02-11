import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store.ts';
import { setDeletedForm } from '@/redux/form';

export const useDeleteForm = (formId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSetFormDeleted = () => {
    dispatch(setDeletedForm(formId));
  };

  return { handleSetFormDeleted };
};
