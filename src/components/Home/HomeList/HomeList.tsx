import { CardWithCount } from '@/types/card';
import { Row, Col } from 'antd';
import { HomeCard } from '../HomeCard/HomeCard';

type Props = {
  items: CardWithCount[];
};

export const HomeList = (props: Props) => {
  const { items } = props;

  return (
    <Row gutter={[16, 16]} align="stretch">
      {items.map((item) => (
        <Col span={24} md={12} lg={8} key={item.id}>
          <HomeCard item={item} />
        </Col>
      ))}
    </Row>
  );
};
