import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { mockResponses } from "./mockData.ts";
import { sortDates } from "../../utils/sortDates.ts";
import { SortType } from "../../utils/types.ts";

const { RangePicker } = DatePicker;

type Dates = {
  from: null | string;
  to: null | string;
};

const dateFormat = "DD.MM.YYYY";

export const FormResponses = () => {
  const { formId } = useParams<{ formId: string }>();
  const [sort, setSort] = useState<SortType>("asc");
  const [dates, setDates] = useState<Dates>({
    from: null,
    to: null,
  });

  const handleChangeSort = (value: SortType) => {
    setSort(value);
  };

  const handleEditDates = (_dates: Dayjs, dateString: [string, string]) => {
    setDates({
      from: dateString[0],
      to: dateString[1],
    });
  };

  useEffect(() => {
    console.log("dates", dates);
  }, [dates]);

  const startDate = dates.from
    ? dayjs(dates.from, dateFormat)
    : dayjs("01.12.2024", dateFormat);
  const endDate = dates.to ? dayjs(dates.to, dateFormat) : dayjs();

  let responses = sortDates(mockResponses, sort);
  // if (dates.from && dates.to) {
  //   responses = responses.filter((response) => {
  //     const itemDate = dayjs(response.date, "DD.MM.YYYY");
  //     return itemDate.isBetween(startDate, endDate, null, "[]");
  //   });
  // }

  if (dates.from && dates.to) {
    responses = responses.filter((response) => {
      const itemDate = dayjs(response.date, dateFormat);
      // Проверяем, находится ли дата в диапазоне
      return (
        (itemDate.isSame(startDate) || itemDate.isAfter(startDate)) &&
        (itemDate.isSame(endDate) || itemDate.isBefore(endDate.add(1, "day")))
      );
    });
  }

  return (
    <div>
      <h2 className="font-bold">Отклики на — Форма №{formId}</h2>
      <div className="mt-4">
        <div className="flex items-center justify-end w-full gap-2">
          <Select
            defaultValue={"asc"}
            onChange={handleChangeSort}
            options={[
              { value: "asc", label: "Сначала новые" },
              { value: "desc", label: "Сначала старые" },
            ]}
            className="min-w-[20ch] text-left"
          />
          <RangePicker
            // @ts-ignore
            onChange={handleEditDates}
            className="max-w-[30ch]"
            format={dateFormat}
            minDate={dayjs("01.11.2024", "DD.MM.YYYY")}
            maxDate={dayjs()}
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {responses.map((response) => (
            <Card key={response.id}>
              <div className="flex items-center justify-between gap-5">
                <Link
                  to={`/forms/${formId}/responses/${response.id}`}
                  className="font-medium text-base"
                >
                  {response.name}
                </Link>
                <p className="text-gray-500 text-sm">{response.date}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
