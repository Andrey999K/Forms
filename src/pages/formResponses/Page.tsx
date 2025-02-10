import { Loader } from '@/components/ui/Loader';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useSaveCsv } from '@/hooks/useSaveCsv';
import { useGetFormQuery } from '@/redux/form';
import { fetchResponseSlice, resetStore } from '@/redux/response';
import { fetchAllResponses } from '@/redux/response/responseSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { FormListOptions, FormResponse, Sort } from '@/types';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Select } from 'antd';
import typography from 'antd/es/typography';
import dayjs, { Dayjs } from 'dayjs';
import { ComponentProps, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';

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
    <div className="flex flex-col gap-4">
      <GlassWrapper className="p-2">
        <Title className="!text-xl lg:px-0 md:!text-2xl">
          Отклики формы <br /> &quot;{form?.title}&quot;
        </Title>
      </GlassWrapper>

      <GlassWrapper className="flex flex-col w-full gap-2 sm:justify-between sm:flex-row p-5">
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
      </GlassWrapper>

      <GlassWrapper className="flex flex-col gap-4 p-5">
        {list.length
          ? list.map((response, index) => (
              <Link to={`/forms/${formId}/responses/${response.id}`} key={response.id}>
                <GlassWrapper className="hover:translate-y-[2px] transition duration-300 ease-in-out !shadow-none flex p-3 items-center justify-between gap-5">
                  <Title italic level={5} style={{ margin: 0 }}>
                    Отклик #{index + 1}
                  </Title>
                  <Text>{dayjs(response.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</Text>
                </GlassWrapper>
              </Link>
            ))
          : status !== 'pending' &&
            !showTrigger && <Title level={4}>У данной формы нет откликов.</Title>}
        {status === 'pending' && <Loader />}

        {showTrigger && (
          <div ref={intersectionRef} className="mt-4 mb-5">
            <Loader />
          </div>
        )}

        {status === 'rejected' && !list.length && (
          <Title level={4}>Произошла ошибка, попробуйте обновить страницу</Title>
        )}
      </GlassWrapper>
    </div>
  );
};
