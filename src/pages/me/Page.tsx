import { MeAvatar, MeProfileActions, MeProfileDetails } from '@/components/Me';
import { Loader } from '@/components/ui/Loader';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useGetMeInfoQuery, useUpdateMeInfoMutation } from '@/redux/user';
import { uploadToCloudinary } from '@/services/cloudinary.service';
import { MeChangeFields } from '@/types/me';
import { Alert, Form, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const Me = () => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isAlertVisible, setAlertVisible] = useState<boolean>(true);
  const [userUid, setUserUid] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const storedUid = localStorage.getItem('user');
    if (storedUid) setUserUid(storedUid);
  }, []);

  const {
    data: user,
    error,
    isLoading,
  } = useGetMeInfoQuery(userUid || '', {
    skip: !userUid,
  });

  const [updateUserInfo, { isLoading: isUpdating }] = useUpdateMeInfoMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, dirtyFields },
    reset,
  } = useForm<MeChangeFields>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setValue('avatarUrl', 'uploaded', { shouldDirty: true });
    }
  }, [avatar]);

  const onSubmit = async (data: MeChangeFields) => {
    if (JSON.stringify(dirtyFields) === '{}') return;
    if (userUid) {
      try {
        let avatarUrl = user?.avatarUrl || '';

        if (avatar) {
          avatarUrl = await uploadToCloudinary(avatar);
        }

        const updatedData: MeChangeFields = { ...data };
        if (avatarUrl) {
          updatedData.avatarUrl = avatarUrl;
        }
        await updateUserInfo({
          id: userUid,
          data: updatedData,
        }).unwrap();

        notification.success({ message: 'Успешно', description: 'Данные обновлены' });
        setAvatar(null);
        setAlertVisible(false);
        setEdit(false);
      } catch (error) {
        notification.error({ message: 'Не удалось обновить данные' });
        console.error('Ошибка обновления данных:', error);
      }
    }
  };

  usePageTitle('Профиль');

  if (!user || isLoading || isUpdating) return <Loader />;

  return (
    <div className="flex relative justify-center p-4 break-words w-full">
      {isEdit && isAlertVisible && (
        <div className="absolute top-[-10px] z-50">
          <Alert
            message="Для изменения аватара наведите на него и нажмите"
            type="info"
            showIcon
            closable
            onClose={() => setAlertVisible(false)}
          />
        </div>
      )}
      <GlassWrapper className="w-full md:w-1/2 px-5 py-5 text-center" style={{ zIndex: 10 }}>
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
              onFinish={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4 text-center"
            >
              <MeProfileActions
                isEdit={isEdit}
                dirtyFields={dirtyFields}
                isValid={isValid}
                setEdit={setEdit}
                isUpdating={isUpdating}
                avatar={avatar}
              />
              <MeAvatar
                currentAvatarUrl={user.avatarUrl}
                isLoading={isLoading}
                isEdit={isEdit}
                setAvatar={setAvatar}
                avatar={avatar}
              />
              <MeProfileDetails
                isEditing={isEdit}
                control={control}
                reset={reset}
                user={user}
                setEdit={setEdit}
                setAvatar={setAvatar}
              />
            </Form>
          </div>
        )}
      </GlassWrapper>
    </div>
  );
};
