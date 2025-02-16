import { ConstructorForm, HandleChangeForm } from '@/types';
import { HomeOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Divider, Tabs, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassWrapper } from '../ui/wrapper/GlassWrapper';
import { ConstructorTab } from './ConstructorTab';
import { DeleteFormModal } from './DeleteFormModal';
import { SettingsTab } from './SettingsTab';

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
      className={`w-full max-w-72 px-5 pb-5 self-start ${isSticky ? 'sticky top-24' : ''}`}
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
            disabled={isDeleting || isError}
            onClick={onSaveConstructor}
          >
            Сохранить форму
          </Button>
          {!isNew && (
            <DeleteFormModal isDeleting={isDeleting} onRemoveConstructor={onRemoveConstructor} />
          )}
        </div>
      </div>
    </GlassWrapper>
  );
};
