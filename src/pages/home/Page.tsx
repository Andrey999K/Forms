import { Button, Input, notification, Select, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import { deleteLocalForm, fetchFormsSlice, resetStore, useDeleteFormMutation } from '@/redux/form';
import { AppDispatch, RootState } from '@/redux/store';

import { HomeList } from '@/components/Home/HomeList/HomeList';

import { Loader } from '@/components/ui/Loader';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import { FormListOptions, Sort } from '@/types';
import { debounce } from '@/utils/debounce';
import { ROUTES } from '@/utils/routesConfig';

const { Search } = Input;
const { Text } = Typography;

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

  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();

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
      notification.info({ message: 'Форма успешно удалена' });
    } catch (error) {
      console.error('Ошибка удаления:', error);
      notification.error({ message: 'Ошибка' });
    }
  };

  const onSearch = debounce((value: string) => {
    dispatch(resetStore());
    setSearch(value);
  }, 300);

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
      notification.error({ message: 'Не найдены данные пользователя' });
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

  usePageTitle('Главная страница');

  return (
    <GlassWrapper data-testid="home-page" className="flex flex-col gap-4 p-5">
      <div className="flex-col sm:flex-row flex justify-between gap-4">
        <Search
          defaultValue={search}
          onSearch={onSearch}
          className="w-full sm:w-[300px]"
          disabled={status === 'pending'}
        />
        <Select
          value={order}
          options={sortOptions}
          onChange={onChangeSort}
          className="w-full sm:w-[200px]"
        />
      </div>

      <div>
        {formsList.length > 0 ? (
          <HomeList
            items={formsList.filter((item) => item !== null)}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        ) : (
          status !== 'pending' &&
          !showTrigger && (
            <div className="flex flex-col gap-4">
              <Text>Нет доступных форм.</Text>
              <Link to={ROUTES.FORMS_NEW}>
                <Button type="primary">Создать форму</Button>
              </Link>
            </div>
          )
        )}
        {status === 'pending' && <Loader />}

        {showTrigger && (
          <div ref={intersectionRef} className="mt-4 mb-5">
            <Loader />
          </div>
        )}

        {status === 'rejected' && !formsList.length && (
          <Text>Произошла ошибка, попробуйте обновить страницу</Text>
        )}
      </div>
    </GlassWrapper>
  );
};
