import { HomeList } from '@/components/Home/HomeList/HomeList';
import { useDeleteFormMutation, useGetFormListQuery } from '@/redux/form';
import { Sort } from '@/types';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { Flex, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';

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

const CARDS_PER_PAGE = 9;

export const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<Sort>(Sort.DESC);
  const [page, setPage] = useState<number>(0);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
  const isFetching = useRef(false);
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
  const { ref: intersectionRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,

    onChange: async (entry) => {
      if (entry.isIntersecting && !isFetching.current) {
        isFetching.current = true;
        setPage((prev) => prev + 1);
        await new Promise((resolve) => setTimeout(resolve, 500));
        isFetching.current = false;
      }
    },
  });

  const onDelete = async (id: string) => {
    try {
      await deleteForm(id).unwrap();
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const onChangeSort = (value: Sort) => {
    setOrder(value);
  };

  useEffect(() => {
    if ((res?.data?.length ?? 0) < CARDS_PER_PAGE) {
      setLastVisible(undefined);
    } else if (res?.lastVisible) {
      setLastVisible(res.lastVisible);
    }
  }, [res?.lastVisible]);

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

      {isLoading && <Spin />}

      {res?.data && res.data.length > 0 ? (
        <HomeList items={res.data.filter((item) => item !== null)} onDelete={onDelete} />
      ) : (
        !isLoading && <div>Нет доступных форм.</div>
      )}

      {!isError && !isLoading && (
        <div className="mb-5">
          <div ref={intersectionRef} className="mt-4">
            <Spin />
          </div>
        </div>
      )}
    </div>
  );
};
