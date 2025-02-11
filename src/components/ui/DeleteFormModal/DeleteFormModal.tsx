import { Button, Modal, notification } from 'antd';
import { FC, ReactNode, useState } from 'react';
import { deleteLocalForm, useDeleteFormMutation } from '@/redux/form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type Props = {
  formId: string;
  buttonText?: string;
  buttonIcon?: ReactNode;
  redirectUrl?: string;
};

export const DeleteFormModal: FC<Props> = ({ formId, buttonText, buttonIcon, redirectUrl }) => {
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteForm(formId).unwrap();
      dispatch(deleteLocalForm(formId));
      notification.info({ message: 'Форма успешно удалена' });
      if (redirectUrl) {
        navigate(redirectUrl);
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
      notification.error({ message: 'Ошибка' });
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        block
        color="danger"
        type="text"
        key="delete"
        data-testid="delete-button"
        variant="filled"
        danger
        className="w-full flex items-center"
        icon={buttonIcon || <DeleteOutlined size={18} />}
        onClick={showModal}
      >
        {buttonText}
      </Button>
      <Modal
        title="Удаление"
        open={open}
        onOk={handleDelete}
        confirmLoading={isDeleting}
        onCancel={handleCancel}
        maskClosable={false}
        closable={false}
        footer={[
          <Button key="back" onClick={handleCancel} disabled={isDeleting}>
            Отмена1111
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
    </>
  );
};
