import { UserFormValidationRules } from '@/utils/validation';
import { Control, UseFormReset } from 'react-hook-form';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { MeChangeFields, MeData } from '@/types/me';
import { Button, Divider } from 'antd';
import { MdOutlineCancel, MdOutlineEmail } from 'react-icons/md';
import { FaRegRegistered } from 'react-icons/fa6';
import { formatUserCreatedAt } from '@/utils/formatUserCreatedAt';
import { MdPerson, MdOutlinePeople } from 'react-icons/md';
import { UserFormInput } from '../Auth/UserFormInput';

const renderMeProfileField = (icon: ReactNode, value?: string) => (
  <div className="flex gap-2 items-start justify-start mb-4">
    {icon}
    <span className="w-full break-all text-left">{value}</span>
  </div>
);

type Props = {
  control: Control<any>;
  reset: UseFormReset<MeChangeFields>;
  user: MeData;
  setEdit: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setAvatar: Dispatch<SetStateAction<File | null>>;
};

export const MeProfileDetails = ({
  isEditing,
  control,
  reset,
  user,
  setEdit,
  setAvatar,
}: Props) => {
  const handleFormsReset = () => {
    reset({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
    setAvatar(null);
    setEdit(false);
  };

  return (
    <>
      <div className="text-base mb-4 font-medium">Информация о пользователе</div>
      <Divider className="my-0" />
      {!isEditing ? (
        <div className="flex flex-col items-start gap-2">
          {renderMeProfileField(<MdPerson size={20} />, user?.firstName)}
          {renderMeProfileField(<MdOutlinePeople size={20} />, user?.lastName)}
          {renderMeProfileField(<MdOutlineEmail size={20} />, user?.email)}
          {renderMeProfileField(
            <FaRegRegistered size={20} />,
            `Дата регистрации: ${formatUserCreatedAt(user?.createdAt)}`
          )}
        </div>
      ) : (
        <div>
          <UserFormInput
            control={control}
            label="Имя"
            name="firstName"
            placeholder="Имя"
            rules={UserFormValidationRules.name}
          />
          <UserFormInput
            control={control}
            name="lastName"
            placeholder="Фамилия"
            label="Фамилия"
            rules={UserFormValidationRules.surname}
          />
          <UserFormInput
            control={control}
            name="email"
            label="Email"
            placeholder="Email"
            rules={UserFormValidationRules.email}
          />
          <Button
            onClick={handleFormsReset}
            color="danger"
            variant="filled"
            icon={<MdOutlineCancel size={15} />}
            className="w-full"
          >
            Отменить изменения
          </Button>
        </div>
      )}
    </>
  );
};
