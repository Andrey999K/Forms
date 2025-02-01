import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Flex, Input, Select, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { DefaultOptionType } from 'antd/es/select';
import { useInView } from 'react-intersection-observer';

import { AppDispatch, RootState } from '@/redux/store';
import { resetStore, deleteLocalForm, useDeleteFormMutation, fetchFormsSlice } from '@/redux/form';

import { HomeList } from '@/components/Home/HomeList/HomeList';

import { FormListOptions, Sort } from '@/types';
import { toast } from 'react-toastify';
import PageTitle from '@/components/ui/PageTitle/PageTitle';

const { Search } = Input;

enum SortKeys {
  TIME_ASC = 'TIME_ASC',
  TIME_DESC = 'TIME_DESC',
  TITLE_ASC = 'TITLE_ASC',
  TITLE_DESC = 'TITLE_DESC',
}

const sortType: Record<SortKeys, FormListOptions['sort']> = {
  [SortKeys.TIME_ASC]: {
    field: 'createdAt',
    type: Sort.ASC,
  },
  [SortKeys.TIME_DESC]: {
    field: 'createdAt',
    type: Sort.DESC,
  },
  [SortKeys.TITLE_ASC]: {
    field: 'title',
    type: Sort.ASC,
  },
  [SortKeys.TITLE_DESC]: {
    field: 'title',
    type: Sort.DESC,
  },
};

const sortOptions: DefaultOptionType[] = [
  {
    value: SortKeys.TIME_DESC,
    label: 'Сначала новые',
  },
  {
    value: SortKeys.TIME_ASC,
    label: 'Сначала старые',
  },
  {
    value: SortKeys.TITLE_DESC,
    label: 'Порядок А-Я',
  },
  {
    value: SortKeys.TITLE_ASC,
    label: 'Порядок Я-А',
  },
];

const CARDS_PER_PAGE = 30;

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<RootState, 'pending' | 'success' | 'rejected' | null>(
    (state) => state.formSlice.status
  );
  const user = useSelector((state: RootState) => state.user.user);
  const savedOrder = useSelector((state: RootState) => state.formSlice.order);
  const savedSearch = useSelector((state: RootState) => state.formSlice.search);
  const formsList = useSelector((state: RootState) => state.formSlice.data);
  const hasNext = useSelector((state: RootState) => state.formSlice.hasNext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
  const [order, setOrder] = useState<SortKeys>(
    (searchParams.get('order') as SortKeys) ?? SortKeys.TIME_DESC
  );

  const [deleteForm] = useDeleteFormMutation();

  const { ref: intersectionRef } = useInView({
    threshold: 1,

    onChange: async (inView: boolean) => {
      if (inView && status !== 'pending') {
        handleLoadMore();
      }
    },
  });

  const onDelete = async (id: string) => {
    try {
      await deleteForm(id).unwrap();
      dispatch(deleteLocalForm(id));
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  const onSearch = (value: string) => {
    dispatch(resetStore());
    setSearch(value);
  };

  const onChangeSort = (value: SortKeys) => {
    dispatch(resetStore());
    setOrder(value);
  };

  useEffect(() => {
    const query: { order: SortKeys; search?: string } = { order };
    if (search.length) {
      query.search = search;
    }
    setSearchParams(query, { replace: true });
  }, [order, search, setSearchParams]);

  useEffect(() => {
    if (search !== (savedSearch ?? '')) {
      dispatch(resetStore());
      return;
    }
    if (
      sortType[order]?.field !== savedOrder?.field ||
      sortType[order]?.type !== savedOrder?.type
    ) {
      dispatch(resetStore());
      return;
    }
  }, []);

  const handleLoadMore = () => {
    if (!user) {
      toast.error('Не найдены данные пользователя');
      return;
    }

    dispatch(
      fetchFormsSlice({
        search: search.length ? { key: 'title', value: search } : undefined,
        sort: sortType[order],
        limit: CARDS_PER_PAGE,
        reference: { collectionName: 'users', key: 'userId', id: user.uid },
      })
    );
  };

  const showTrigger = (status === 'success' || status === null) && hasNext;

  return (
    <>
      <PageTitle title="Главная страница" />
      <div data-testid="home-page">
        <Flex justify="space-between" gap={12} vertical className="mb-4 sm:flex-row sm:mb-8">
          <Search defaultValue={search} onSearch={onSearch} className="w-full sm:w-[300px]" />
          <Select
            value={order}
            options={sortOptions}
            onChange={onChangeSort}
            className="w-full sm:w-[200px]"
          />
        </Flex>

        <div className="pb-5">
          {formsList.length > 0 ? (
            <HomeList items={formsList.filter((item) => item !== null)} onDelete={onDelete} />
          ) : (
            status !== 'pending' && !showTrigger && <Title level={2}>Нет доступных форм.</Title>
          )}
        </div>

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

        {status === 'rejected' && !formsList.length && (
          <Title level={2}>Произошла ошибка, попробуйте обновить страницу</Title>
        )}
      </div>
    </>
  );
};
