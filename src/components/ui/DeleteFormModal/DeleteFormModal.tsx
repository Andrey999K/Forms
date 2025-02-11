import { Button, Modal, notification } from 'antd';
import { deleteLocalForm, setDeletedForm, useDeleteFormMutation } from '@/redux/form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDeletedFormId } from '@/redux/form/formSlice.ts';
import { ROUTES } from '@/utils/routesConfig.ts';

export const DeleteFormModal = () => {
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();
  const deletedFormId = useSelector(getDeletedFormId());
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = async () => {
    try {
      if (deletedFormId) {
        await deleteForm(deletedFormId).unwrap();
        dispatch(deleteLocalForm(deletedFormId));
        dispatch(setDeletedForm(null));
        notification.info({ message: 'Форма успешно удалена' });
        const pageUrl = location.pathname;
        if (pageUrl.startsWith('/forms') && pageUrl.endsWith('/edit')) {
          navigate(ROUTES.HOME);
        }
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
      notification.error({ message: 'Ошибка' });
    }
  };

  const handleCancel = () => {
    dispatch(setDeletedForm(null));
  };

  return (
    <Modal
      title="Удаление"
      open={!!deletedFormId}
      onOk={handleDelete}
      confirmLoading={isDeleting}
      onCancel={handleCancel}
      maskClosable={false}
      closable={false}
      footer={[
        <Button key="back" onClick={handleCancel} disabled={isDeleting}>
          Отмена
        </Button>,
        <Button
          key="submit"
          color="danger"
          variant="filled"
          loading={isDeleting}
          onClick={handleDelete}
        >
          Удалить
        </Button>,
      ]}
    >
      <p>Вы действительно хотите удалить форму?</p>
    </Modal>
  );
};
