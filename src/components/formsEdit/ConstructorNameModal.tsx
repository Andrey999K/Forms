import { Button, Modal } from 'antd';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { TextField } from '../ui/TextField';

type Props = {
  value: string;
  name: string;
  title: string;
  onChange: ({ value, name }: { value: string; name: string }) => void;
  children: React.ReactNode;
};

type FormValues = {
  input: string;
};

export const ConstructorNameModal: FC<Props> = (props) => {
  const { name, value, title, children, onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { input: value },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = handleSubmit((data) => {
    setIsModalOpen(false);
    onChange({ name, value: data.input });
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    reset({ input: value });
  };

  return (
    <>
      <button onClick={showModal}>{children}</button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" color="default" variant="filled" onClick={handleCancel}>
            Назад
          </Button>,
          <Button key="submit" color="default" variant="solid" onClick={handleOk}>
            Сохранить
          </Button>,
        ]}
      >
        <TextField
          name="input"
          control={control}
          rules={{
            required: 'Поле не может быть пустым', // Сообщение об ошибке, если поле пустое
          }}
          placeholder="Введите значение"
        />
      </Modal>
    </>
  );
};
