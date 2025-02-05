import { MeAvatar, MeProfileActions, MeProfileDetails } from '@/components/Me';
import { Loader } from '@/components/ui/Loader';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import { RootState } from '@/redux/store';
import { useGetMeInfoQuery, useUpdateMeInfoMutation } from '@/redux/user';
import { uploadToCloudinary } from '@/services/cloudinary.service';
import { MeChangeFields } from '@/types/me';
import { Alert, Form, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export const Me = () => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isAlertVisible, setAlertVisible] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.user.user);
  const uid = user?.uid;

  console.log('####: uid', uid);

  const {
    data: userData,
    error,
    isLoading,
  } = useGetMeInfoQuery(uid || '', {
    skip: !uid,
  });

  console.log('####: ', userData);

  const [updateUserInfo, { isLoading: isUpdating }] = useUpdateMeInfoMutation();

  // const [sendVerificationEmail, { isVerifyLoading }] = useSendVerificationEmailMutation();

  // const handleSendVerification = async () => {
  //   try {
  //     const response = await sendVerificationEmail().unwrap();
  //     notification.success({ message: response.message });
  //   } catch (error) {
  //     notification.error({ message: 'Не удалось отправить письмо. Попробуйте позже.' });
  //   }
  // };

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
    if (userData) {
      reset({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        email: userData?.email || '',
      });
    }
  }, [userData, reset]);

  useEffect(() => {
    if (avatar) {
      setValue('avatarUrl', 'uploaded', { shouldDirty: true });
    }
  }, [avatar, setValue]);

  const onSubmit = async (data: MeChangeFields) => {
    if (JSON.stringify(dirtyFields) === '{}') return;
    if (uid) {
      try {
        let avatarUrl = userData?.avatarUrl || '';

        if (avatar) {
          avatarUrl = await uploadToCloudinary(avatar);
        }

        const updatedData: MeChangeFields = { ...data };
        if (avatarUrl) {
          updatedData.avatarUrl = avatarUrl;
        }
        await updateUserInfo({
          id: uid,
          data: updatedData,
        }).unwrap();

        notification.success({ message: 'Данные успешно обновлены' });
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

  if (!userData || isLoading || isUpdating) return <Loader />;

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
          <div>
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
                currentAvatarUrl={userData.avatarUrl}
                isLoading={isLoading}
                isEdit={isEdit}
                setAvatar={setAvatar}
                avatar={avatar}
              />
              <MeProfileDetails
                isEditing={isEdit}
                control={control}
                reset={reset}
                user={userData}
                setEdit={setEdit}
                setAvatar={setAvatar}
              />
            </Form>
            {/* {user && !user.emailVerified && (
              <Button
                style={{
                  marginTop: '20px',
                }}
                type="primary"
                onClick={handleSendVerification}
                loading={isLoading}
              >
                Пройти верификацию почты
              </Button>
            )} */}
          </div>
        )}
      </GlassWrapper>
    </div>
  );
};
