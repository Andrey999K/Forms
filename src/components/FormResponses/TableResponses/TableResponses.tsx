import { Loader } from '@/components/ui/Loader';
import { useSaveCsv } from '@/hooks/useSaveCsv';
import { useGetFormQuery } from '@/redux/form';
import { fetchResponseSlice, resetStore } from '@/redux/response';
import { fetchAllResponses } from '@/redux/response/responseSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { FormListOptions, FormResponse, Sort } from '@/types';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import typography from 'antd/es/typography';
import dayjs, { Dayjs } from 'dayjs';
import { ComponentProps, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const { Text } = typography;

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

export const TableResponses = () => {
  const navigate = useNavigate();
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
  const showTrigger = (status === 'success' || status === null) && hasNext;
  const { columns, data } = getTableSource(list);

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

  // Не удалять. Необходим для сброса lastVisible в сторе
  useEffect(() => {
    resetLocalState();
  }, []);

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

  function getTableSource(rawData: FormResponse[]) {
    const allQuestions: { [id: string]: { question: string; id: string } } = {};

    rawData.forEach((form) => {
      form.fields.forEach((field) => {
        if (!allQuestions[field.id]) {
          allQuestions[field.id] = { question: field.question, id: field.id };
        }
      });
    });

    const columns: ColumnsType<any> = [
      {
        title: '№',
        dataIndex: 'id',
        key: 'id',
        render: (_: any, __: any, index: number) => {
          return <span className="text-nowrap">{index + 1}</span>;
        },
        width: 1,
        fixed: 'left',
      },
      ...Object.values(allQuestions).map(({ question, id }) => ({
        title: question,
        dataIndex: id,
        key: id,
      })),
      {
        title: 'Дата заполнения',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: 1,
        render: (date: string) => (
          <span className="text-nowrap">{dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</span>
        ),
      },
    ];

    const data = rawData.map((form, rowIndex) => {
      const row: { key: string; updatedAt: string | number; [key: string]: any } = {
        key: form.id,
        index: rowIndex,
        updatedAt: form.updatedAt,
      };

      form.fields.forEach((field) => {
        row[field.id] = Array.isArray(field.answer) ? field.answer.join(', ') : field.answer;
      });

      return row;
    });

    return { columns, data };
  }

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full gap-2 sm:justify-between sm:flex-row">
        <Select
          defaultValue={sort}
          onChange={handleChangeSort}
          options={sortOptions}
          disabled={!list.length}
          className="w-full sm:w-[200px] text-left"
        />
        <div className="flex gap-2 flex-col sm:justify-between sm:flex-row">
          <RangePicker
            defaultValue={[dates.start, dates.end]}
            onChange={handleEditDates}
            className="w-full sm:max-w-[300px]"
            format={dateFormat}
            allowEmpty
            maxDate={dayjs()}
            disabled={!list.length}
            placeholder={['Начало', 'Конец']}
          />
          <Button
            type="primary"
            disabled={list.length === 0}
            icon={<DownloadOutlined />}
            onClick={handleLoadCsv}
          >
            Экспортировать CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Table
          bordered
          dataSource={data}
          columns={columns}
          pagination={false}
          scroll={{ x: 'max-content', y: 500 }}
          loading={status === 'pending'}
          locale={{ emptyText: 'Ничего не найдено.' }}
          onRow={(data) => {
            return {
              className: 'cursor-pointer',
              onClick: () => {
                navigate(`/forms/${formId}/responses/${data.key}`);
              },
            };
          }}
          summary={() =>
            showTrigger ? (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={columns.length}>
                  <div ref={intersectionRef} className="py-4">
                    <Loader />
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            ) : null
          }
        />

        {/* {showTrigger && (
          <div ref={intersectionRef} className="mt-4 mb-5">
            <Loader />
          </div>
        )} */}

        {status === 'rejected' && !list.length && (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Text>Произошла ошибка, попробуйте обновить страницу</Text>
            <Button onClick={handleReload}>Перезагрузить</Button>
          </div>
        )}
      </div>
    </div>
  );
};
