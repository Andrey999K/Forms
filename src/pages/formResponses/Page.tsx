import { AnalyticsResponses } from '@/components/FormResponses/AnalyticsResponses';
import { TableResponses } from '@/components/FormResponses/TableResponses';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useGetFormQuery } from '@/redux/form';
import { PieChartOutlined, TableOutlined } from '@ant-design/icons';
import { Tabs, Typography } from 'antd';
import typography from 'antd/es/typography';
import { useParams } from 'react-router-dom';

const { Text } = typography;

export const FormResponses = () => {
  const { formId } = useParams<{ formId: string }>();
  const { data: form } = useGetFormQuery(formId ?? '');

  usePageTitle(form ? `Отклики | ${form.title}` : 'Отклики');

  const TABS_ITEMS = [
    {
      key: 'constructor',
      label: (
        <span>
          <TableOutlined /> Таблица
        </span>
      ),
      children: <TableResponses />,
    },
    {
      key: 'settings',
      label: (
        <span>
          <PieChartOutlined /> Аналитика
        </span>
      ),
      children: <AnalyticsResponses />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Text className="!text-xl font-medium xl:px-0 md:!text-2xl self-start">Отклики</Text>
      <GlassWrapper className="flex flex-col gap-2 p-5 w-full">
        {form && (
          <div className="flex flex-col justify-center">
            <Typography.Text className="text-xl">{form.title}</Typography.Text>
            <Typography.Text>{form.description}</Typography.Text>
          </div>
        )}

        <Tabs defaultActiveKey="constructor" items={TABS_ITEMS} />
      </GlassWrapper>
    </div>
  );
};
