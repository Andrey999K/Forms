import { fetchResponseSlice, resetStore } from '@/redux/response';
import { useGetFormQuery } from '@/redux/form';
import { AppDispatch, RootState } from '@/redux/store';
import { FormListOptions, FormResponse, Sort } from '@/types';
import { ComponentProps, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, DatePicker, Select, Spin } from 'antd';
import typography from 'antd/es/typography';
import { useInView } from 'react-intersection-observer';
import dayjs, { Dayjs } from 'dayjs';
import { usePageTitle } from '@/hooks/usePageTitle';
import { DownloadOutlined } from '@ant-design/icons';
import { fetchAllResponses } from '@/redux/response/responseSlice';
import { useSaveCsv } from '@/hooks/useSaveCsv';

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

  const saveCsv = useSaveCsv();

  const filters: FormListOptions['filters'] = (() => {
    const newFilters: FormListOptions['filters'] = [];

    if (dates.start) {
      newFilters?.push({
        key: 'createdAt',
        operator: '>=',
        value: new Date(dayjs(dates.start).toDate()),
      });
    }

    if (dates.end) {
      let copyEnd = dates.end.clone();
      copyEnd = copyEnd.add(1, 'day');

      newFilters?.push({
        key: 'createdAt',
        operator: '<=',
        value: new Date(copyEnd.toDate()),
      });
    }

    return newFilters;
  })();

  const { ref: intersectionRef } = useInView({
    threshold: 1,

    onChange: async (inView: boolean) => {
      if (inView && status !== 'pending') {
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
    setSearchParams(query, { replace: true });
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

  const handleLoadCsv = () => {
    dispatch(
      fetchAllResponses({
        reference: { collectionName: 'form', id: formId ?? '', key: 'formId' },
        filters,
        sort: sortType[sort],
      })
    )
      .unwrap()
      .then((res) => {
        if (res.data.length) {
          const savedData = res.data.map<Record<string, string>>((item) => {
            const fields = item.fields.reduce<Record<string, string>>((acc, field) => {
              acc[field.question] = Array.isArray(field.answer)
                ? field.answer.join(', ')
                : field.answer;
              return acc;
            }, {});
            return {
              id: item.id.toString(),
              ...fields,
              updateAt: dayjs(item.updatedAt).toDate().toDateString(),
              createdAt: dayjs(item.createdAt).toDate().toDateString(),
            };
          });
          saveCsv(savedData, `${form?.title}_responses`);
        }
      })
      .catch(() => console.error('Cannot load csv'));
  };

  const showTrigger = (status === 'success' || status === null) && hasNext;

  usePageTitle(form ? `Отклики | ${form.title}` : 'Отклики');

  return (
    <>
      <Title className="mt-10 px-5 !text-2xl lg:px-0 md:!text-4xl">
        Отклики формы <br /> &quot;{form?.title}&quot;
      </Title>

      <div className="flex flex-col w-full gap-2 mt-10 mb-4 sm:justify-between sm:flex-row">
        <Select
          defaultValue={sort}
          onChange={handleChangeSort}
          options={sortOptions}
          disabled={!list.length}
          className="w-full sm:w-[200px] text-left"
        />
        <div className="flex gap-2 sm:justify-between">
          <RangePicker
            defaultValue={[dates.start, dates.end]}
            onChange={handleEditDates}
            className="w-full sm:max-w-[300px]"
            format={dateFormat}
            allowEmpty
            maxDate={dayjs()}
          />
          <Button
            type="primary"
            disabled={list.length === 0}
            icon={<DownloadOutlined />}
            onClick={handleLoadCsv}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        {list.length
          ? list.map((response, index) => (
              <Link to={`/forms/${formId}/responses/${response.id}`} key={response.id}>
                <Card className="bg-[#fdf8f4]/85 backdrop-blur-sm hover:backdrop-blur-sm hover:bg-[#fdf8f4] hover:-translate-y-1 hover:shadow-lg transition duration-200 ease-in-out">
                  <div className="flex items-center justify-between gap-5">
                    <Title italic level={5} style={{ margin: 0 }}>
                      Отклик #{index + 1}
                    </Title>
                    <Text>{dayjs(response.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</Text>
                  </div>
                </Card>
              </Link>
            ))
          : status !== 'pending' &&
            !showTrigger && <Title level={2}>У данной формы нет откликов.</Title>}
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
    </>
  );
};
