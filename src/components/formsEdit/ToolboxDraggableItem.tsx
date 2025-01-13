import { Button } from 'antd';
import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { FieldType } from '@/types';

type Props = {
  type: FieldType;
  children: React.ReactNode;
};

export const ToolboxDraggableItem: FC<Props> = (props) => {
  const { type, children } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, isNew: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`flex gap-2 ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
      <Button className="w-full text-left justify-start" type="text">
        {children}
      </Button>
    </div>
  );
};
