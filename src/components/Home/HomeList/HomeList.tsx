import { Card } from '@/types/card';
import { Row, Col } from 'antd';
import { HomeCard } from '../HomeCard/HomeCard';

type Props = {
  items: Card[];
  onDelete: (id: string) => void;
};

export const HomeList = (props: Props) => {
  const { items, onDelete } = props;

  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col span={8} key={item.id}>
          <HomeCard item={item} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
};
