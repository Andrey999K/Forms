import { ConstructorForm, HandleChangeForm } from '@/types';
import { DeleteOutlined, HomeOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Divider, Tabs } from 'antd';
import { FC } from 'react';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { ConstructorTab } from './ConstructorTab';
import { SettingsTab } from './SettingsTab';

type Props = {
  constructor: ConstructorForm;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onSaveConstructor: () => void;
  onRemoveConstructor: () => void;
  onChangeForm: ({ value, name }: HandleChangeForm) => void;
};

export const Sidebar: FC<Props> = (props) => {
  const {
    constructor,
    isCreating,
    isUpdating,
    isDeleting,
    onSaveConstructor,
    onRemoveConstructor,
    onChangeForm,
  } = props;

  const TABS_ITEMS = [
    {
      key: 'constructor',
      label: (
        <span>
          <HomeOutlined /> Конструктор
        </span>
      ),
      children: <ConstructorTab />,
    },
    {
      key: 'settings',
      label: (
        <span>
          <SettingOutlined /> Настройки
        </span>
      ),
      children: <SettingsTab constructor={constructor} onChangeForm={onChangeForm} />,
    },
  ];

  return (
    <GlassWrapper className="w-96 px-5 pb-5">
      <Tabs defaultActiveKey="constructor" items={TABS_ITEMS} />
      <Divider className="my-4" />
      <div>
        <h3 className="text-base font-medium mb-4">Действия</h3>
        <div className="flex flex-col gap-2">
          <Button
            color="default"
            variant="solid"
            className="w-full"
            icon={<SaveOutlined />}
            loading={isUpdating || isCreating}
            disabled={constructor.fields.length === 0 || isDeleting}
            onClick={onSaveConstructor}
          >
            {'updateAt' in constructor && constructor?.updateAt
              ? 'Обновить форму'
              : 'Сохранить форму'}
          </Button>
          <Button
            color="danger"
            variant="filled"
            className="w-full"
            icon={<DeleteOutlined />}
            loading={isDeleting}
            disabled={isUpdating || isCreating}
            onClick={onRemoveConstructor}
          >
            Удалить форму
          </Button>
        </div>
      </div>
    </GlassWrapper>
  );
};
