import { ConstructorForm, HandleChangeForm } from '@/types';
import { DeleteOutlined, HomeOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Divider, Tabs, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { ConstructorTab } from './ConstructorTab';
import { SettingsTab } from './SettingsTab';
import { useNavigate } from 'react-router-dom';

type Props = {
  constructor: ConstructorForm;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isError: boolean;
  isNew: boolean;
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
    isError,
    isNew,
    onSaveConstructor,
    onRemoveConstructor,
    onChangeForm,
  } = props;
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sidebarTop = -10;
      setIsSticky(scrollTop >= sidebarTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <GlassWrapper
      className={`w-full max-w-72 px-5 pb-5 ${isSticky ? 'sticky top-4' : ''}`}
      style={{ zIndex: 10 }}
    >
      <Tabs defaultActiveKey="constructor" items={TABS_ITEMS} />
      <Divider className="my-4" />
      <div>
        <Typography.Text
          style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem', display: 'block' }}
        >
          Действия
        </Typography.Text>
        <div className="flex flex-col gap-2">
          {!isNew && (
            <Button
              variant="filled"
              className="w-full"
              loading={isDeleting}
              onClick={() => navigate(`/forms/${constructor.id}`)}
            >
              Просмотр
            </Button>
          )}
          <Button
            color="default"
            variant="solid"
            className="w-full"
            icon={<SaveOutlined />}
            loading={isUpdating || isCreating}
            disabled={constructor.fields.length === 0 || isDeleting || isError}
            onClick={onSaveConstructor}
          >
            {'updatedAt' in constructor && constructor?.updatedAt
              ? 'Обновить форму'
              : 'Сохранить форму'}
          </Button>
          {!isNew && (
            <Button
              color="danger"
              variant="filled"
              className="w-full"
              icon={<DeleteOutlined />}
              loading={isDeleting}
              onClick={onRemoveConstructor}
            >
              Удалить форму
            </Button>
          )}
        </div>
      </div>
    </GlassWrapper>
  );
};
