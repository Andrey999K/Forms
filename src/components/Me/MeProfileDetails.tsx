import { UserFormValidationRules } from '@/utils/validation';
import { Control, UseFormReset } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { MeChangeFields, MeData } from '@/types/me';
import { Button } from 'antd';
import { MdOutlineCancel, MdPerson } from 'react-icons/md';
import { formatUserCreatedAt } from '@/utils/formatUserCreatedAt';
import { UserFormInput } from '../Auth/UserFormInput';
import { MdOutlineDateRange, MdOutlineAlternateEmail, MdOutlineAssignment } from 'react-icons/md';

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
          {/* <div className="flex flex-col items-start mb-6">
            <label className="ml-2">Аватар</label>
            <Input
              type="file"
              accept="image/*"
              disabled={isUpdating}
              onChange={handleFileChange}
              style={{ height: '35.81px' }}
              className="text-textPrimary file:cursor-pointer file:bg-transparent file:border-none file:text-textPrimary py-1.5 px-4 rounded-lg"
            />
          </div> */}
          <UserFormInput
            control={control}
            disabled={isUpdating}
            label="Имя"
            name="firstName"
            placeholder="Имя"
            prefix={<MdPerson size={20} className="mr-1" />}
            rules={UserFormValidationRules.name}
          />
          <UserFormInput
            control={control}
            disabled={isUpdating}
            name="lastName"
            placeholder="Фамилия"
            label="Фамилия"
            prefix={<MdPerson size={20} className="mr-1" />}
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
