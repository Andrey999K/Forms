import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Card, DatePicker, Select, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { FormListOptions, Sort } from '@/types/index.ts';
import { useGetResponseListQuery } from '@/redux/response/index.ts';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { useGetFormQuery } from '@/redux/form';
import Title from 'antd/es/typography/Title';

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
      newFilters?.push({
        key: 'updatedAt',
        operator: '<=',
        value: new Date(dayjs(dates.end).toDate()),
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
    setPage(0);
    setSort(value);
  };

  const handleEditDates = (_dates: RangeValue, dateString: [string, string]) => {
    setLastVisible(undefined);
    setPage(0);
    setDates({
      start: dateString[0] ? dayjs(dateString[0]) : null,
      end: dateString[0] ? dayjs(dateString[1]) : null,
    });
  };

  return (
    <div>
      <Title level={2} className="font-bold">
        Отклики на — Форма {form?.title}
      </Title>
      <div className="mt-4">
        <div className="flex items-center justify-end w-full gap-2">
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
        <div className="flex flex-col gap-2 mt-2">
          {res?.data.map((response, index) => (
            <Link to={`/forms/${formId}/responses/${response.id}`} key={response.id}>
              <Card>
                <div className="flex items-center justify-between gap-5">
                  #{index + 1}
                  <p className="text-gray-500 text-sm">{dayjs(response.updatedAt).toString()}</p>
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
    </div>
  );
};
