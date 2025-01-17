import { HomeList } from '@/components/Home/HomeList/HomeList';
import { useDeleteFormMutation, useGetFormListQuery } from '@/redux/form';
import { CardWithCount, Sort } from '@/types';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { Flex, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import Title from 'antd/es/typography/Title';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get('search') ?? '');
  const [order, setOrder] = useState<Sort>((searchParams.get('order') as Sort) ?? Sort.DESC);
  const [page, setPage] = useState<number>(0);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
  const [removedIndices, setRemovedIndices] = useState<string[]>([]);
  const [filteredList, setFilteredList] = useState<CardWithCount[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const {
    data: res,
    isError,
    isFetching,
  } = useGetFormListQuery({
    search: search.length ? { key: 'title', value: search } : undefined,
    sort: order,
    limit: CARDS_PER_PAGE,
    lastVisible,
    page,
  });
  const [deleteForm] = useDeleteFormMutation();

  const { ref: intersectionRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,

    onChange: async (entry) => {
      if (entry.isIntersecting && !isFetching) {
        setPage((prev) => prev + 1);
      }
    },
  });

  const onDelete = async (id: string) => {
    try {
      await deleteForm(id).unwrap();
      setRemovedIndices((prev) => [...prev, id]);
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  const onSearch = (value: string) => {
    setLastVisible(undefined);
    setFilteredList([]);
    setPage(0);
    setSearch(value);
  };

  const onChangeSort = (value: Sort) => {
    setLastVisible(undefined);
    setFilteredList([]);
    setPage(0);
    setOrder(value);
  };

  useEffect(() => {
    const query: { order: Sort; search?: string } = { order };
    if (search.length) {
      query.search = search;
    }
    setSearchParams(query);
  }, [order, search, setSearchParams]);

  useEffect(() => {
    if ((res?.data?.length ?? 0) < CARDS_PER_PAGE) {
      setHasNext(false);
      setLastVisible(undefined);
    } else if (res?.lastVisible) {
      setHasNext(true);
      setLastVisible(res.lastVisible);
    }
  }, [res]);

  useEffect(() => {
    if (res?.data?.length) {
      setFilteredList(res.data.filter((item) => !removedIndices.includes(item.id)));
    } else {
      setFilteredList([]);
    }
  }, [res?.data, removedIndices]);

  const showTriggerLoader = !isFetching && !isError && hasNext;

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
        !isFetching && isError && <Title level={2}>Нет доступных форм.</Title>
      )}

      {isFetching && (
        <div className="mb-5 mt-4">
          <Spin />
        </div>
      )}

      {showTriggerLoader && (
        <div ref={intersectionRef} className="mt-4 mb-5">
          <Spin />
        </div>
      )}
    </div>
  );
};
