import { MeAvatar, MeProfileActions, MeProfileDetails } from '@/components/Me';
import { MeChangePassword } from '@/components/Me/MeChangePassword';
import { BackButton } from '@/components/ui/BackButton';
import { Loader } from '@/components/ui/Loader';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useGetMeInfoQuery, useUpdateMeInfoMutation } from '@/redux/user';
import { getCurrentUser } from '@/redux/user/userSlice';
import { uploadToCloudinary } from '@/services/cloudinary.service';
import { MeChangeFields } from '@/types/me';
import { DEFAULT_AVATAR_URL } from '@/utils/constants/defaultAvatar';
import { Alert, Form, notification, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export const Me = () => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [, setAlertVisible] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const uid = useSelector(getCurrentUser())?.uid;

  const { data: user, error, isLoading } = useGetMeInfoQuery(uid as string);

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
    if (uid) {
      try {
        let avatarUrl = data?.avatarUrl || DEFAULT_AVATAR_URL;

        if (avatar) {
          avatarUrl = await uploadToCloudinary(avatar);
        } else if (!user?.avatarUrl || user.avatarUrl === DEFAULT_AVATAR_URL) {
          avatarUrl = DEFAULT_AVATAR_URL;
        }

        const updatedData: MeChangeFields = { ...data, avatarUrl };

        await updateUserInfo({ id: uid, data: updatedData }).unwrap();
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
                  setValue={setValue}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                />
                <MeProfileDetails
                  isEdit={isEdit}
                  control={control}
                  reset={reset}
                  user={user}
                  setEdit={setEdit}
                  setAvatar={setAvatar}
                  isUpdating={isUpdating}
                  setPreviewUrl={setPreviewUrl}
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
