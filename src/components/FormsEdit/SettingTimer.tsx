import { ConstructorForm, HandleChangeForm } from '@/types';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

type Props = {
  constructor: ConstructorForm;
  onChangeForm: ({ value, name }: HandleChangeForm) => void;
};

export const SettingTimer = ({ constructor, onChangeForm }: Props) => {
  const value = constructor.timer ? dayjs(constructor.timer, 'HH:mm:ss') : undefined;

  const handleChange = (date: dayjs.Dayjs) => {
    const dateString = date ? date.format('HH:mm:ss') : '';
    onChangeForm({
      name: 'timer',
      value: dateString,
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-between">
        <span>Лимит:</span>
        <TimePicker
          className="w-full"
          placeholder="Время"
          needConfirm
          hourStep={1}
          minuteStep={1}
          secondStep={15}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
