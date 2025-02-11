import { AnalyticsResponses } from '@/components/FormResponses/AnalyticsResponses';
import { TableResponses } from '@/components/FormResponses/TableResponses';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { useGetFormQuery } from '@/redux/form';
import { PieChartOutlined, TableOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import typography from 'antd/es/typography';
import { useParams } from 'react-router-dom';

const { Title } = typography;

export const FormResponses = () => {
  const { formId } = useParams<{ formId: string }>();
  const { data: form } = useGetFormQuery(formId ?? '');

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
    <GlassWrapper className="flex flex-col gap-2 p-5">
      {form && <Title className="!text-xl lg:px-0 md:!text-2xl">{form?.title}</Title>}

      <Tabs defaultActiveKey="constructor" items={TABS_ITEMS} />
    </GlassWrapper>
  );
};
