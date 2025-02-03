import { ConstructorForm, HandleChangeForm } from '@/types';
import { FC } from 'react';
import { SettingTags } from './SettingTags';
import { SettingTimer } from './SettingTimer';

type Props = {
  constructor: ConstructorForm;
  onChangeForm: ({ value, name }: HandleChangeForm) => void;
};

export const SettingsTab: FC<Props> = ({ constructor, onChangeForm }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base font-medium mb-4">Настройки</h3>
      <div className="flex flex-col gap-4">
        <SettingTimer onChangeForm={onChangeForm} constructor={constructor} />
        <SettingTags onChangeForm={onChangeForm} constructor={constructor} />
      </div>
    </div>
  );
};
