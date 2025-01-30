import { CardWithCount } from '@/types/card';
import { Row, Col } from 'antd';
import { HomeCard } from '../HomeCard/HomeCard';

type Props = {
  items: CardWithCount[];
  onDelete: (id: string) => void;
};

export const HomeList = (props: Props) => {
  const { items, onDelete } = props;

  return (
    <Row gutter={[16, 16]} align="stretch" className="px-5 lg:px-0">
      {items.map((item) => (
        <Col span={24} md={12} lg={8} key={item.id}>
          <HomeCard item={item} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
};
