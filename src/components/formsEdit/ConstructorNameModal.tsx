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
  const [input, setInput] = useState(value);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    onChange({ name, value: input });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    if (value) setInput(value);
  }, [value]);

  return (
    <>
      <button onClick={showModal}>{children}</button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Назад
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Сохранить
          </Button>,
        ]}
      >
        <Input value={input} onChange={handleChange} />
      </Modal>
    </>
  );
};
