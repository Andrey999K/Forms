import { ReactNode } from 'react';
import { Card as CardType } from '@/types/card';
import { Card } from 'antd';
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

type Props = {
  item: CardType;
  onDelete: (id: string) => void;
};

export const HomeCard = (props: Props) => {
  const { item, onDelete } = props;

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  const actions: ReactNode[] = [
    <Link key="edit" to={`/forms/${item.id}/edit`}>
      <MdOutlineEdit size={16} style={{ margin: '0 auto' }} href={`/forms/${item.id}/edit`} />
    </Link>,
    <div
      key="delete"
      className="text-red-600 hover:text-red-400 transition-all duration-200 ease-in-out"
      onClick={handleDeleteClick}
    >
      <MdOutlineDelete size={16} style={{ margin: '0 auto' }} />
    </div>,
  ];

  const responseText = item.responseCount ? `Отклики: ${item.responseCount}` : 'Откликов нет';

  return (
    <Card
      title={item.title}
      bordered={false}
      actions={actions}
      style={{ backdropFilter: 'blur(4px)', background: 'rgb(255 250 245 / 85%)' }}
      styles={{
        actions: { background: 'transparent', borderColor: '#ffe2cb' },
        header: { borderColor: '#ffe2cb' },
      }}
    >
      {responseText}
    </Card>
  );
};
