import { Button, Input, Modal } from 'antd';
import { ChangeEvent, FC, useEffect, useState } from 'react';

type Props = {
  value: string;
  name: string;
  title: string;
  onChange: ({ value, name }: { value: string; name: string }) => void;
  children: React.ReactNode;
};

export const ConstructorNameModal: FC<Props> = (props) => {
  const { name, value, title, children, onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValue, setFormValue] = useState(value);
  const isError = Object.keys(errors).length > 0;

  const getErrors = (id: string, label: string): Record<string, string> => {
    if (label.trim() === '') {
      return { ...errors, [id]: 'Поле не может быть пустым' };
    } else {
      const newErrors = { ...errors };
      delete newErrors[id];
      return newErrors;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onChange({ name, value: formValue });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
    setErrors(getErrors(e.target.id, e.target.value));
  };

  useEffect(() => {
    if (isModalOpen) setFormValue(value);
  }, [isModalOpen]);

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
          <Button
            key="submit"
            color="default"
            variant="solid"
            onClick={handleOk}
            disabled={isError}
          >
            Сохранить
          </Button>,
        ]}
      >
        <Input
          id="title"
          status={Object.keys(errors).length > 0 ? 'error' : undefined}
          value={formValue}
          placeholder="Вопрос"
          onChange={handleChange}
        />
      </Modal>
    </>
  );
};
