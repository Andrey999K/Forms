import { fetchResponseSlice, resetStore } from '@/redux/response';
import { useGetFormQuery } from '@/redux/form';
import { AppDispatch, RootState } from '@/redux/store';
import { FormListOptions, FormResponse, Sort } from '@/types';
import { ComponentProps, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, DatePicker, Select, Spin } from 'antd';
import typography from 'antd/es/typography';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import dayjs, { Dayjs } from 'dayjs';

const { Text, Title } = typography;

type RangeValue = Parameters<
  NonNullable<ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

const { RangePicker } = DatePicker;

type Dates = {
  start: null | Dayjs;
  end: null | Dayjs;
};

const dateFormat = 'YYYY-MM-DD';
const CARDS_PER_PAGE = 30;

enum SortKeys {
  TIME_ASC = 'TIME_ASC',
  TIME_DESC = 'TIME_DESC',
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
};

const sortOptions = [
  { value: SortKeys.TIME_DESC, label: 'Сначала новые' },
  { value: SortKeys.TIME_ASC, label: 'Сначала старые' },
];

export const FormResponses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<RootState, 'pending' | 'success' | 'rejected' | null>(
    (state) => state.responseSlice.status
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const { formId } = useParams<{ formId: string }>();

  const { data: form } = useGetFormQuery(formId ?? '');

  const [list, setList] = useState<FormResponse[]>([]);
  const [sort, setSort] = useState<SortKeys>(
    (searchParams.get('sort') as SortKeys) ?? SortKeys.TIME_DESC
  );
  const [dates, setDates] = useState<Dates>({
    start: searchParams.get('start') ? dayjs.unix(Number(searchParams.get('start'))) : null,
    end: searchParams.get('end') ? dayjs.unix(Number(searchParams.get('end'))) : null,
  });
  const [hasNext, setHasNext] = useState<boolean>(true);

  const filters: FormListOptions['filters'] = (() => {
    const newFilters: FormListOptions['filters'] = [];

    if (dates.start) {
      newFilters?.push({
        key: 'updatedAt',
        operator: '>=',
        value: new Date(dayjs(dates.start).toDate()),
      });
    }

    if (dates.end) {
      let copyEnd = dates.end.clone();
      copyEnd = copyEnd.add(1, 'day');

      newFilters?.push({
        key: 'updatedAt',
        operator: '<=',
        value: new Date(copyEnd.toDate()),
      });
    }

    return newFilters;
  })();

  const { ref: intersectionRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,

    onChange: async (entry) => {
      if (entry.isIntersecting && status !== 'pending') {
        handleLoadMore();
      }
    },
  });

  useEffect(() => {
    const query: { sort: SortKeys; start?: string; end?: string } = { sort };
    if (dates.start) {
      query.start = dates.start.unix().toString();
    }
    if (dates.end) {
      query.end = dates.end.unix().toString();
    }
    setSearchParams(query);
  }, [sort, dates, setSearchParams]);

  const handleChangeSort = (value: SortKeys) => {
    resetLocalState();
    setSort(value);
  };

  const handleEditDates = (_dates: RangeValue, dateString: [string, string]) => {
    resetLocalState();
    setDates({
      start: dateString[0] ? dayjs(dateString[0]) : null,
      end: dateString[0] ? dayjs(dateString[1]) : null,
    });
  };

  const handleLoadMore = () => {
    dispatch(
      fetchResponseSlice({
        limit: CARDS_PER_PAGE,
        reference: { collectionName: 'form', id: formId ?? '', key: 'formId' },
        filters,
        sort: sortType[sort],
      })
    )
      .unwrap()
      .then((res) => {
        const data = res.data.data ?? [];
        if (!data.length) {
          setHasNext(false);
          return;
        }
        setList((prev) => [...prev, ...data]);
      });
  };

  const resetLocalState = () => {
    dispatch(resetStore());
    setHasNext(true);
    setList([]);
  };

  const showTrigger = (status === 'success' || status === null) && hasNext;

  return (
    <div>
      <Title level={1} className="mt-10">
        Отклики на — Форма {form?.title}
      </Title>
      <div className="flex items-center justify-end w-full gap-2 mt-10">
        <Select
          defaultValue={sort}
          onChange={handleChangeSort}
          options={sortOptions}
          className="min-w-[20ch] text-left"
        />
        <RangePicker
          defaultValue={[dates.start, dates.end]}
          onChange={handleEditDates}
          className="max-w-[30ch]"
          format={dateFormat}
          maxDate={dayjs()}
        />
      </div>
      <div className="flex flex-col gap-4 my-6">
        {list.length
          ? list.map((response, index) => (
              <Link to={`/forms/${formId}/responses/${response.id}`} key={response.id}>
                <Card className="bg-[#fdf8f4]/85 backdrop-blur-sm hover:backdrop-blur-sm hover:bg-[#fdf8f4] hover:-translate-y-1 hover:shadow-lg transition duration-200 ease-in-out">
                  <div className="flex items-center justify-between gap-5">
                    <Title italic level={5} style={{ margin: 0 }}>
                      Отклик #{index + 1}
                    </Title>
                    <Text>{dayjs(response.updatedAt).toString()}</Text>
                  </div>
                </Card>
              </Link>
            ))
          : status !== 'pending' && !showTrigger && <Title level={2}>Нет доступных форм.</Title>}
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
      {status === 'rejected' && !list.length && (
        <Title level={2}>Произошла ошибка, попробуйте обновить страницу</Title>
      )}
    </div>
  );
};
