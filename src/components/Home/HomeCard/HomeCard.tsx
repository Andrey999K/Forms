import { ReactNode } from 'react';
import { CardWithCount } from '@/types/card';
import { Badge, Card } from 'antd';
import { MdOutlineEdit, MdOutlineDelete, MdOutlineQuestionAnswer } from 'react-icons/md';
import { Link } from 'react-router-dom';

type Props = {
  item: CardWithCount;
  onDelete: (id: string) => void;
};

export const HomeCard = (props: Props) => {
  const { item, onDelete } = props;

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  const actions: ReactNode[] = [
    <Link key="response" to={`/forms/${item.id}/responses`}>
      <Badge
        count={item.responseCount ?? 0}
        showZero
        size="small"
        styles={{ indicator: { fontSize: 10 }, root: { color: 'inherit' } }}
        offset={[2, -2]}
      >
        <MdOutlineQuestionAnswer size={18} />
      </Badge>
    </Link>,
    <Link key="edit" to={`/forms/${item.id}/edit`}>
      <MdOutlineEdit size={18} style={{ margin: '0 auto' }} href={`/forms/${item.id}/edit`} />
    </Link>,
    <div
      key="delete"
      data-testid="delete-button"
      className="text-red-600 hover:text-red-400 transition-all duration-200 ease-in-out"
      onClick={handleDeleteClick}
    >
      <MdOutlineDelete size={18} style={{ margin: '0 auto' }} />
    </div>,
  ];

  const titleElement = <Link to={`/forms/${item.id}`}>{item.title}</Link>;

  return (
    <Card
      title={titleElement}
      bordered={false}
      actions={actions}
      style={{ backdropFilter: 'blur(4px)', background: 'rgb(255 250 245 / 85%)' }}
      styles={{
        actions: { background: 'transparent', borderColor: '#ffe2cb' },
        header: { borderColor: '#ffe2cb' },
      }}
    >
      {item.description}
    </Card>
  );
};
