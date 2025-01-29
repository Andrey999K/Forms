import { FieldTypes } from '@/types';
import {
  AlignLeftOutlined,
  CheckCircleOutlined,
  FormOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';

export const useConstructorItems = () => {
  const items = {
    [FieldTypes.INPUT]: {
      label: 'Однострочный ответ',
      jsxIcon: <FormOutlined />,
    },
    [FieldTypes.TEXTAREA]: {
      label: 'Многострочный ответ',
      jsxIcon: <AlignLeftOutlined />,
    },
    [FieldTypes.RADIO]: {
      label: 'Список одиночного выбора',
      jsxIcon: <CheckCircleOutlined />,
    },
    [FieldTypes.CHECKBOX]: {
      label: 'Список множественного выбора',
      jsxIcon: <PlusSquareOutlined />,
    },
  };
  return { items };
};
