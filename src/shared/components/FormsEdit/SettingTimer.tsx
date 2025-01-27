import { ConstructorForm, HandleChangeForm } from '@/shared/types';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Switch, TimePicker } from 'antd';
import dayjs from 'dayjs';

type Props = {
  constructor: ConstructorForm;
  onChangeForm: ({ value, name }: HandleChangeForm) => void;
};

export const SettingTimer = ({ constructor, onChangeForm }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-between">
        <span>Лимит времени:</span>
        <Switch
          value={constructor.settings?.timerActive}
          onChange={(checked) =>
            onChangeForm({
              name: 'settings',
              value: { ...constructor.settings, timerActive: checked },
            })
          }
        />
      </div>
      {constructor.settings?.timerActive && (
        <div className="flex justify-end">
          <TimePicker
            className="w-full"
            placeholder="Время"
            needConfirm
            hourStep={1}
            minuteStep={1}
            secondStep={15}
            prefix={<ClockCircleOutlined />}
            value={
              constructor.settings.timer ? dayjs(constructor.settings.timer, 'HH:mm:ss') : undefined
            }
            onChange={(date) => {
              const dateString = date ? date.format('HH:mm:ss') : '';
              onChangeForm({
                name: 'settings',
                value: { ...constructor.settings, timer: dateString },
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
