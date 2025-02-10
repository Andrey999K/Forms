import { Button, Modal } from 'antd';
import { FC, useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

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
        block
        className="block"
        type="text"
        key="delete"
        data-testid="delete-button"
        danger
        icon={<MdOutlineDelete size={18} />}
        onClick={showModal}
      ></Button>
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
        <p>Вы действительно хотите удалить форму?</p>
      </Modal>
    </>
  );
};
