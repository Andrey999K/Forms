import { HomeList } from '@/components/Home/HomeList/HomeList';
import { CardsMock } from './mock';

export const Home = () => {
  const onDelete = (id: string) => {
    console.log('### Delete item with id', id);
  };

  return (
    <div>
      Home
      <HomeList items={CardsMock} onDelete={onDelete} />
    </div>
  );
};
