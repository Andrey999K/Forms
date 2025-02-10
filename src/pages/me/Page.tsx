import { MeAvatar, MeProfileActions, MeProfileDetails } from '@/components/Me';
import { MeChangePassword } from '@/components/Me/MeChangePassword';
import { Loader } from '@/components/ui/Loader';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useGetMeInfoQuery, useUpdateMeInfoMutation } from '@/redux/user';
import { uploadToCloudinary } from '@/services/cloudinary.service';
import { MeChangeFields } from '@/types/me';
import { Alert, Form, notification } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const Me = () => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
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

        notification.success({ message: 'Данные успешно обновлены' });
        setAvatar(null);
        setEdit(false);
      } catch (error) {
        notification.error({ message: 'Не удалось обновить данные' });
        console.error('Ошибка обновления данных:', error);
      }
    }
  };

  usePageTitle('Профиль');

  if (isLoading || isUpdating) return <Loader />;

  if (error || !user) {
    return (
      <Alert
        message="Ошибка"
        description="Не удалось получить информацию о пользователе"
        type="error"
        showIcon
      />
    );
  }

  return (
    <div data-testid="me-page">
      <Content className="flex flex-col px-1 md:p-0 items-center md:flex-row gap-4 w-full md:items-start">
        <GlassWrapper
          className="w-full min-w-56 md:w-1/2 px-5 py-5 text-center"
          style={{ zIndex: 10 }}
        >
          <Form onFinish={handleSubmit(onSubmit)}>
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
        </GlassWrapper>
        <GlassWrapper className="w-1/3 px-5 min-w-80 py-5 text-center" style={{ zIndex: 10 }}>
          <MeChangePassword />
        </GlassWrapper>
      </Content>
    </div>
  );
};
