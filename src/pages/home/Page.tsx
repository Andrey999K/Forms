import { HomeList } from '@/components/Home/HomeList/HomeList';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { Flex, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Sort } from '@/types';
import { toast } from 'react-toastify';
import { cardService } from '@/services/card.service';
import { useCards } from '@/hooks/useCards';

const sortOptions: DefaultOptionType[] = [
  {
    value: Sort.DESC,
    label: 'Сначала новые',
  },
  {
    value: Sort.ASC,
    label: 'Сначала старые',
  },
];

export const Home = () => {
  const { Search } = Input;

  const { list, setList, order, setOrder, page, hasNext, onSearch, clearData, debouncedLoadData } =
    useCards();

  const onDelete = async (id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));

    try {
      await cardService.remove(id);
      toast.success('Карточка успешно удалена');
    } catch (error: any) {
      toast.error('Ошибка при удалении карточки:', error);
    }
  };

  const onChangeSort = (value: Sort) => {
    setOrder(value);
    clearData();
  };

  const { ref } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,
    onChange: (entry) => {
      if (entry.isIntersecting) debouncedLoadData(page + 1);
    },
  });

  return (
    <div>
      <Flex justify="space-between" gap={24} className="mb-8">
        <Search onSearch={onSearch} style={{ width: 300 }} />
        <Select
          value={order}
          options={sortOptions}
          style={{ width: 200 }}
          onChange={onChangeSort}
        />
      </Flex>
      <HomeList items={list} onDelete={onDelete} />
      {hasNext && (
        <div ref={ref} className="mt-4">
          <Spin />
        </div>
      )}
    </div>
  );
};
