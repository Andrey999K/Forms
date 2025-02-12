import { MeAvatar, MeProfileActions, MeProfileDetails } from '@/components/Me';
import { MeChangePassword } from '@/components/Me/MeChangePassword';
import { BackButton } from '@/components/ui/BackButton';
import { Loader } from '@/components/ui/Loader';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useGetMeInfoQuery, useUpdateMeInfoMutation } from '@/redux/user';
import { uploadToCloudinary } from '@/services/cloudinary.service';
import { MeChangeFields } from '@/types/me';
import { Alert, Form, notification, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
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
        setAlertVisible(false);
        setEdit(false);
      } catch (error) {
        notification.error({ message: 'Не удалось обновить данные' });
        console.log('Ошибка обновления данных:', error);
      }
    }
  };

  usePageTitle('Профиль');

  if (isLoading) return <Loader />;

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
    <>
      <BackButton />
      <div className="flex flex-col gap-4">
        <Typography.Text className="!text-xl font-medium xl:px-0 md:!text-2xl self-start">
          Мой профиль
        </Typography.Text>
        <div data-test-id="me-page">
          <Content className="flex flex-col px-4 md:p-0 items-center md:flex-row gap-4 w-full md:items-start">
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
                  isEdit={isEdit}
                  setAvatar={setAvatar}
                  avatar={avatar}
                  setAlertVisible={setAlertVisible}
                  isAlertVisible={isAlertVisible}
                />
                <MeProfileDetails
                  isEdit={isEdit}
                  control={control}
                  reset={reset}
                  user={user}
                  setEdit={setEdit}
                  setAvatar={setAvatar}
                  isUpdating={isUpdating}
                />
              </Form>
            </GlassWrapper>
            <GlassWrapper
              className="w-full min-w-56 md:w-1/2 px-5 py-5 text-center"
              style={{ zIndex: 10 }}
            >
              <MeChangePassword />
            </GlassWrapper>
          </Content>
        </div>
      </div>
    </>
  );
};
