import { useEffect, useState } from 'react';
import typography from 'antd/es/typography';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Card, DatePicker, Select, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { FormListOptions, FormResponse, Sort } from '@/types/index.ts';
import { useGetResponseListQuery } from '@/redux/response/index.ts';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { useGetFormQuery } from '@/redux/form';

const { Text, Title } = typography;

type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

const { RangePicker } = DatePicker;

type Dates = {
  start: null | Dayjs;
  end: null | Dayjs;
};

const dateFormat = 'YYYY-MM-DD';
const CARDS_PER_PAGE = 4;

export const FormResponses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formId } = useParams<{ formId: string }>();

  const { data: form } = useGetFormQuery(formId ?? '');

  const [list, setList] = useState<FormResponse[]>([]);
  const [sort, setSort] = useState<Sort>((searchParams.get('sort') as Sort) ?? Sort.DESC);
  const [dates, setDates] = useState<Dates>({
    start: searchParams.get('start') ? dayjs.unix(Number(searchParams.get('start'))) : null,
    end: searchParams.get('end') ? dayjs.unix(Number(searchParams.get('end'))) : null,
  });
  const [page, setPage] = useState<number>(0);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
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

  const {
    data: res,
    isError,
    isFetching,
  } = useGetResponseListQuery({
    limit: CARDS_PER_PAGE,
    lastVisible,
    page,
    reference: { collectionName: 'form', id: formId ?? '', key: 'formId' },
    filters,
    sort,
  });

  const { ref: intersectionRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,

    onChange: async (entry) => {
      if (entry.isIntersecting && !isFetching) {
        setPage((prev) => prev + 1);
      }
    },
  });

  useEffect(() => {
    setList(res?.data ?? []);
    if ((res?.data?.length ?? 0) < CARDS_PER_PAGE) {
      setHasNext(false);
      setLastVisible(undefined);
    } else if (res?.lastVisible) {
      setHasNext(true);
      setLastVisible(res.lastVisible);
    }
  }, [res]);

  useEffect(() => {
    const query: { sort: Sort; start?: string; end?: string } = { sort };
    if (dates.start) {
      query.start = dates.start.unix().toString();
    }
    if (dates.end) {
      query.end = dates.end.unix().toString();
    }
    setSearchParams(query);
  }, [sort, dates, setSearchParams]);

  const showTriggerLoader = !isFetching && !isError && hasNext;

  const handleChangeSort = (value: Sort) => {
    setLastVisible(undefined);
    setList([]);
    setPage(0);
    setSort(value);
  };

  const handleEditDates = (_dates: RangeValue, dateString: [string, string]) => {
    setLastVisible(undefined);
    setList([]);
    setPage(0);
    setDates({
      start: dateString[0] ? dayjs(dateString[0]) : null,
      end: dateString[0] ? dayjs(dateString[1]) : null,
    });
  };

  return (
    <div>
      <Title level={1} className="mt-10">
        Отклики на — Форма {form?.title}
      </Title>
      <div className="flex items-center justify-end w-full gap-2 mt-10">
        <Select
          defaultValue={sort}
          onChange={handleChangeSort}
          options={[
            { value: Sort.DESC, label: 'Сначала новые' },
            { value: Sort.ASC, label: 'Сначала старые' },
          ]}
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
        {!isFetching && isError && !list.length && <Title level={2}>Нет доступных форм.</Title>}
        {list.map((response, index) => (
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
        ))}
      </div>
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
