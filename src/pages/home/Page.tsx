import { HomeList } from '@/components/Home/HomeList/HomeList';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { useEffect, useState } from 'react';
import { Flex, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { Sort } from '@/types';
import { formReset, useDeleteFormMutation, useGetFormListQuery } from '@/redux/form';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { store } from '@/redux/store';

const { Search } = Input;
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

// TODO: Change to 30
const CARDS_PER_PAGE = 9;

export const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<Sort>(Sort.DESC);
  const [page, setPage] = useState<number>(0);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const {
    data: res,
    isLoading,
    isError,
  } = useGetFormListQuery({
    search,
    sort: order,
    limit: CARDS_PER_PAGE,
    lastVisible,
    page,
  });
  const [deleteForm] = useDeleteFormMutation();

  useEffect(() => {
    const newLastVisible = res?.lastVisible;

    if (newLastVisible) {
      setLastVisible(newLastVisible);
    }
  }, [res]);

  const onDelete = (id: string) => {
    clearData();
    deleteForm(id);
  };

  const onSearch = (value: string) => {
    setSearch(value);
    clearData();
  };

  const onChangeSort = (value: Sort) => {
    setOrder(value);
    clearData();
  };

  const clearData = () => {
    setLastVisible(undefined);
    store.dispatch(formReset());
    setPage(0);
  };

  const { ref } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,
    onChange: (entry) => {
      if (entry.isIntersecting) setPage((prev) => prev + 1);
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

      {res?.data && <HomeList items={res.data} onDelete={onDelete} />}

      {!isError && !isLoading && (
        <div ref={ref} className="mt-4">
          <Spin />
        </div>
      )}
    </div>
  );
};
