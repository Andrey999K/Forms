import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { FC, useState } from 'react';

type Props = {
  isDeleting: boolean;
  onRemoveConstructor: () => void;
};

export const DeleteFormModal: FC<Props> = (props) => {
  const { isDeleting, onRemoveConstructor } = props;
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    onRemoveConstructor();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        color="danger"
        variant="filled"
        className="w-full"
        icon={<DeleteOutlined />}
        onClick={showModal}
      >
        Удалить форму
      </Button>
      <Modal
        title="Удаление"
        open={open}
        onOk={handleOk}
        confirmLoading={isDeleting}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button
            key="submit"
            color="danger"
            variant="filled"
            loading={isDeleting}
            onClick={handleOk}
          >
            Удалить
          </Button>,
        ]}
      >
        <p>Вы действительно хоите удалить форму?</p>
      </Modal>
    </>
  );
};
