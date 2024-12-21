import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Select } from "antd";
import { mockResponses } from "./mockData.ts";
import { sortDates } from "../../utils/sortDates.ts";
import { SortType } from "../../utils/types.ts";

export const FormResponses = () => {
  const { formId } = useParams<{ formId: string }>();
  const [sort, setSort] = useState<SortType>("asc");

  const handleChangeSort = (value: SortType) => {
    setSort(value);
  };

  const responses = sortDates(mockResponses, sort);

  return (
    <div>
      <h2 className="font-bold">Отклики на — Форма №{formId}</h2>
      <div className="mt-4">
        <div className="flex items-center justify-end w-full">
          <Select
            defaultValue={"asc"}
            onChange={handleChangeSort}
            options={[
              { value: "asc", label: "Сначала новые" },
              { value: "desc", label: "Сначала старые" },
            ]}
            className="min-w-[20ch] text-left"
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
