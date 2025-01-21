import { Alert, Form } from 'antd';
import { MouseEvent, useEffect, useState } from 'react';
import Avatar from 'boring-avatars';
import { useForm } from 'react-hook-form';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { Loader } from '@/components/common';
import { TextField } from '@/components/ui/TextField';
import { useGetMeInfoQuery, useUpdateMeInfoMutation } from '@/redux/user';
import { UserFormValidationRules } from '@/utils/validation';

type MeFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

export const Me = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, dirtyFields },
    reset,
  } = useForm<MeFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const userUid = localStorage.getItem('user');

  const {
    data: user,
    error,
    isLoading,
  } = useGetMeInfoQuery(userUid || '', {
    skip: !userUid,
  });

  const [updateUserInfo, { isLoading: isUpdating }] = useUpdateMeInfoMutation();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = async (data: MeFormData) => {
    if (!Object.keys(dirtyFields).length) return;
    if (userUid) {
      try {
        await updateUserInfo({ id: userUid, data }).unwrap();
        setIsEditing(false);
      } catch (error) {
        console.error('Ошибка обновления данных:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert
          message="Ошибка загрузки данных"
          description="Не удалось получить информацию о пользователе. Попробуйте позднее."
          type="error"
          showIcon
        />
      ) : (
        <div className="flex relative flex-col items-center justify-center gap-4 p-6 border rounded-lg shadow-md w-1/2 h-1/3">
          <Form
            onFinish={handleSubmit(handleSave)}
            className="w-full flex flex-col gap-7 text-center"
          >
            {!isEditing ? (
              <button
                className="absolute top-3 right-3 p-0 m-0 bg-transparent border-none"
                onClick={handleEdit}
              >
                <MdEdit size={45} color="#4682B4" className="cursor-pointer" />
              </button>
            ) : (
              <button
                type="submit"
                className={`absolute top-3 right-3 p-0 m-0 bg-transparent border-none 
                  ${
                    !isValid || Object.keys(dirtyFields).length === 0
                      ? 'opacity-30 cursor-not-allowed'
                      : 'opacity-100 cursor-pointer'
                  }`}
                disabled={!isValid || isUpdating || !Object.keys(dirtyFields).length}
              >
                <FaRegCheckCircle
                  size={45}
                  color={!isValid || Object.keys(dirtyFields).length === 0 ? '#808080' : '#0E8B57'}
                />
              </button>
            )}
            <div className="flex justify-center w-full mb-3">
              <Avatar
                size={300}
                name={'Default User'}
                variant="bauhaus"
                colors={['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059']}
              />
            </div>
            {!isEditing ? (
              <div className="flex flex-col items-start gap-1">
                <div className="text-lg font-semibold text-[#885028E0]">{`${user?.firstName} ${user?.lastName}`}</div>
                <div className="text-base text-[#0D1117]">{user?.email}</div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <TextField
                  control={control}
                  name="firstName"
                  placeholder="Имя"
                  rules={UserFormValidationRules.name}
                />
                <TextField
                  control={control}
                  name="lastName"
                  placeholder="Фамилия"
                  rules={UserFormValidationRules.surname}
                />
                <TextField
                  control={control}
                  name="email"
                  placeholder="Email"
                  rules={UserFormValidationRules.email}
                />
                <button
                  type="button"
                  onClick={() => {
                    reset({
                      firstName: user?.firstName || '',
                      lastName: user?.lastName || '',
                      email: user?.email || '',
                    });
                    setIsEditing(false);
                  }}
                  className="bg-[#FA913C] hover:!bg-[#E58333] hover:!text-slate-200 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Отменить изменения
                </button>
              </div>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};
