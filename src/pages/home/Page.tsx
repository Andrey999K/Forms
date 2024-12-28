import { HomeList } from '@/components/Home/HomeList/HomeList';
import { getMockedCard } from './mock';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { useRef, useState } from 'react';
import { Card } from '@/types/card';
import { Flex, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Sort } from '@/types';

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

const CARDS_PER_PAGE = 30;

export const Home = () => {
  const { Search } = Input;

  const [list, setList] = useState<Card[]>([]);
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<Sort>(Sort.DESC);
  const [page, setPage] = useState<number>(0);

  const [hasNext, setHasNext] = useState(true);

  const onDelete = (id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));

    // TODO: Add response to backend
  };

  const searchTimeout = useRef<null | NodeJS.Timeout>(null);

  const onSearch = (value: string) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      clearData();
    }, 300);
  };

  const onChangeSort = (value: Sort) => {
    setOrder(value);
    clearData();
  };

  const clearData = () => {
    setList([]);
    setPage(0);
    setHasNext(true);
  };

  const loadTimeout = useRef<null | NodeJS.Timeout>(null);

  const loadData = async (page: number) => {
    setPage(page);

    if (!hasNext) return;

    const newData = await getMockedCard(
      { offset: (page - 1) * CARDS_PER_PAGE, limit: page * CARDS_PER_PAGE },
      order,
      search
    );

    if (newData.length < CARDS_PER_PAGE) {
      setHasNext(false);
    }

    setList((prev) => prev.concat(newData));
  };

  const debouncedLoadData = (page: number) => {
    if (loadTimeout.current) {
      clearTimeout(loadTimeout.current);
    }

    loadTimeout.current = setTimeout(() => {
      loadData(page);
    }, 400);
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
