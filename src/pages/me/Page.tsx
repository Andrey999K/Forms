import { Alert, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetMeInfoQuery, useUpdateMeInfoMutation } from '@/redux/user';
import { MeChangeFields } from '@/types/me';
import { MeProfileActions, MeAvatar } from '@/components/Me';
import { MeProfileDetails } from '@/components/Me';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { toast } from 'react-toastify';
import { Loader } from '@/components/ui/Loader';

export const Me = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const userUid = localStorage.getItem('user');

  const {
    data: user,
    error,
    isLoading,
  } = useGetMeInfoQuery(userUid || '', {
    skip: !userUid,
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, dirtyFields },
    reset,
  } = useForm<MeChangeFields>({
    mode: 'onChange',
  });

  const [updateUserInfo, { isLoading: isUpdating }] = useUpdateMeInfoMutation();

  const handleSave = async (data: MeChangeFields) => {
    if (JSON.stringify(dirtyFields) === '{}') return;
    if (userUid) {
      try {
        await updateUserInfo({ id: userUid, data }).unwrap();
        toast.success('Данные успешно обновлены');
        setIsEdit(false);
      } catch (error) {
        toast.error('Не удалось обновить данные');
        console.error('Ошибка обновления данных:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
      });
    }
  }, [user]);

  if (!user || isLoading || isUpdating) return <Loader />;

  return (
    <div className="flex justify-center p-4 break-words w-full">
      <GlassWrapper className={`w-1/2 px-5 py-5 text-center`} style={{ zIndex: 10 }}>
        {error ? (
          <Alert
            message="Ошибка загрузки данных"
            description="Не удалось получить информацию о пользователе"
            type="error"
            showIcon
          />
        ) : (
          <div className="">
            <Form
              onFinish={handleSubmit(handleSave)}
              className="w-full flex flex-col gap-4 text-center"
            >
              <MeProfileActions
                isEdit={isEdit}
                dirtyFields={dirtyFields}
                isValid={isValid}
                setIsEdit={setIsEdit}
                isUpdating={isUpdating}
              />
              <MeAvatar avatarHash={user?.avatarHash} />
              <MeProfileDetails
                isEditing={isEdit}
                control={control}
                reset={reset}
                user={user}
                setIsEdit={setIsEdit}
              />
            </Form>
          </div>
        )}
      </GlassWrapper>
    </div>
  );
};
