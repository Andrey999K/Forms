import { UserFormValidationRules } from '@/utils/validation';
import { Control, UseFormReset } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { MeChangeFields, MeData } from '@/types/me';
import { Button, Input, notification } from 'antd';
import { MdOutlineCancel } from 'react-icons/md';
import { formatUserCreatedAt } from '@/utils/formatUserCreatedAt';
import { UserFormInput } from '../Auth/UserFormInput';
import { MdOutlineDateRange, MdOutlineAlternateEmail } from 'react-icons/md';
import { MdOutlineAssignment } from 'react-icons/md';

type Props = {
  control: Control<any>;
  reset: UseFormReset<MeChangeFields>;
  user: MeData;
  setEdit: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  setAvatar: Dispatch<SetStateAction<File | null>>;
  isUpdating: boolean;
};

export const MeProfileDetails = ({
  isEdit,
  control,
  reset,
  user,
  setEdit,
  setAvatar,
  isUpdating,
}: Props) => {
  const handleFormsReset = () => {
    reset({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    });
    setAvatar(null);
    setEdit(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
      if (!isJpgOrPng) {
        notification.error({
          message: 'Ошибка',
          description: 'Для аватара можно загружать только форматы JPG/PNG/WEBP!',
        });
        return;
      }

      const isLt8M = file.size / 1024 / 1024 < 8;
      if (!isLt8M) {
        notification.error({
          message: 'Ошибка',
          description: 'Файл должен быть меньше 8MB!',
        });
        return;
      }

      setAvatar(file);
    }
  };

  return (
    <>
      {!isEdit ? (
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col items-start gap-2">
            <div className="flex gap-2 items-start justify-start">
              <span className="w-full text-2xl font-bold text-left break-words">
                {`${user?.firstName} ${user?.lastName}`}
              </span>
            </div>
            <div className="flex gap-2 items-center justify-start">
              <MdOutlineAlternateEmail size={20} />
              <span className="break-words text-lg font-semibold text-left break-all">
                {user?.email}
              </span>
            </div>
            <div className="flex gap-2 items-start justify-start">
              <MdOutlineAssignment size={20} />
              <span className="w-full text-left">{`Количество созданных форм: ${user?.formsCount}`}</span>
            </div>
            <div className="flex gap-2 items-start justify-start">
              <MdOutlineDateRange size={20} />
              <span className="w-full text-left">{`Дата регистрации: ${formatUserCreatedAt(
                user?.createdAt
              )}`}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-start mb-6">
            <label className="ml-2">Аватар</label>
            <Input
              type="file"
              accept="image/*"
              disabled={isUpdating}
              onChange={handleFileChange}
              className="text-textPrimary file:cursor-pointer file:bg-transparent file:border-none file:text-textPrimary "
            />
          </div>
          <UserFormInput
            control={control}
            disabled={isUpdating}
            label="Имя"
            name="firstName"
            placeholder="Имя"
            rules={UserFormValidationRules.name}
          />
          <UserFormInput
            control={control}
            disabled={isUpdating}
            name="lastName"
            placeholder="Фамилия"
            label="Фамилия"
            rules={UserFormValidationRules.surname}
          />
          <div className="flex flex-col gap-5 mb-6">
            <div className="flex gap-2 items-center justify-start">
              <MdOutlineAlternateEmail size={20} />
              <span className="w-full text-lg font-semibold text-left break-words ">
                {user?.email}
              </span>
            </div>
            <div className="flex gap-2 items-start justify-start">
              <MdOutlineAssignment size={20} />
              <span className="w-full text-left">{`Количество созданных форм: ${user?.formsCount}`}</span>
            </div>
            <div className="flex gap-2 items-start justify-start">
              <MdOutlineDateRange size={20} />
              <span className="w-full text-left">{`Дата регистрации: ${formatUserCreatedAt(
                user?.createdAt
              )}`}</span>
            </div>
          </div>
          <Button
            onClick={handleFormsReset}
            color="danger"
            variant="filled"
            icon={<MdOutlineCancel size={15} />}
            className="w-full"
            style={{
              height: '33.79px',
            }}
          >
            Отменить изменения
          </Button>
        </div>
      )}
    </>
  );
};
