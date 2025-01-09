import { Card } from '@/types/card';
import { Row, Col, Empty } from 'antd';
import { HomeCard } from '../HomeCard/HomeCard';

type Props = {
  items: Card[];
  onDelete: (id: string) => void;
};

export const HomeList = ({ items, onDelete }: Props) => {
  return items.length === 0 ? (
    <div className="text-center mt-5">
      <Empty description="Нет данных для отображения" />
    </div>
  ) : (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col span={8} key={item.id}>
          <HomeCard item={item} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
};
