import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Flex, Input, Select, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { DefaultOptionType } from 'antd/es/select';
import { useIntersectionObserver } from '@siberiacancode/reactuse';

import { AppDispatch, RootState } from '@/redux/store';
import { resetStore, useDeleteFormMutation, fetchFormsSlice } from '@/redux/form';

import { HomeList } from '@/components/Home/HomeList/HomeList';

import { CardWithCount, Sort } from '@/types';

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

const CARDS_PER_PAGE = 30;

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<RootState, 'pending' | 'success' | 'rejected' | null>(
    (state) => state.formSlice.status
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
  const [order, setOrder] = useState<Sort>((searchParams.get('order') as Sort) ?? Sort.DESC);
  const [filteredList, setFilteredList] = useState<CardWithCount[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const [deleteForm] = useDeleteFormMutation();

  const { ref: intersectionRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,

    onChange: async (entry) => {
      if (entry.isIntersecting && status !== 'pending') {
        handleLoadMore();
      }
    },
  });

  const onDelete = async (id: string) => {
    try {
      await deleteForm(id).unwrap();
      setFilteredList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  const onSearch = (value: string) => {
    resetLocalState();
    setSearch(value);
  };

  const onChangeSort = (value: Sort) => {
    resetLocalState();
    setOrder(value);
  };

  const resetLocalState = () => {
    dispatch(resetStore());
    setHasNext(true);
    setFilteredList([]);
  };

  useEffect(() => {
    const query: { order: Sort; search?: string } = { order };
    if (search.length) {
      query.search = search;
    }
    setSearchParams(query);
  }, [order, search, setSearchParams]);

  const handleLoadMore = () => {
    dispatch(
      fetchFormsSlice({
        search: search.length ? { key: 'title', value: search } : undefined,
        sort: order,
        limit: CARDS_PER_PAGE,
      })
    )
      .unwrap()
      .then((res) => {
        const data = res.data.data ?? [];
        if (!data.length) {
          setHasNext(false);
          return;
        }
        setFilteredList((prev) => [...prev, ...data]);
      });
  };

  const showTrigger = (status === 'success' || status === null) && hasNext;

  return (
    <div>
      <Flex justify="space-between" gap={24} className="mb-8">
        <Search defaultValue={search} onSearch={onSearch} style={{ width: 300 }} />
        <Select
          value={order}
          options={sortOptions}
          style={{ width: 200 }}
          onChange={onChangeSort}
        />
      </Flex>

      {filteredList.length > 0 ? (
        <HomeList items={filteredList.filter((item) => item !== null)} onDelete={onDelete} />
      ) : (
        status !== 'pending' && !showTrigger && <Title level={2}>Нет доступных форм.</Title>
      )}

      {status === 'pending' && (
        <div className="mb-5 mt-4">
          <Spin />
        </div>
      )}

      {showTrigger && (
        <div ref={intersectionRef} className="mt-4 mb-5">
          <Spin />
        </div>
      )}

      {status === 'rejected' && !filteredList.length && (
        <Title level={2}>Произошла ошибка, попробуйте обновить страницу</Title>
      )}
    </div>
  );
};
