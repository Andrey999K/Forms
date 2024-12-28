import { Card as CardType } from '@/types/card';
import { Card, Button, Flex } from 'antd';

type Props = {
  item: CardType;
  onDelete: (id: string) => void;
};

export const HomeCard = (props: Props) => {
  const { item, onDelete } = props;

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <Card title={item.title}>
      <Flex gap={8}>
        <Button className="grow">Изменить</Button>
        <Button className="grow" danger onClick={handleDeleteClick}>
          Удалить
        </Button>
      </Flex>
      <div className="mt-4">Отклики: {item.responseCount}</div>
    </Card>
  );
};
