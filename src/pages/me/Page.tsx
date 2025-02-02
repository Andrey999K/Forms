import { Alert, Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateEmail, updateProfile } from 'firebase/auth';
import { auth } from '@/utils/firebase/firebaseConfig';
import { MeProfileActions, MeAvatar, MeProfileDetails } from '@/components/Me';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { toast } from 'react-toastify';
import { Loader } from '@/components/ui/Loader';
import { uploadToCloudinary } from '@/services/cloudinary.service';
import PageTitle from '@/components/ui/PageTitle/PageTitle';
import { AuthSubmitButton } from '@/components/Auth/AuthSubmitButton';

export const Me = () => {
  const [isEdit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isAlertVisible, setAlertVisible] = useState(true);

  const user = useSelector((state: RootState) => state.user);

  console.log('####: user', user);

  useEffect(() => {
    document.title = 'Профиль';
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, dirtyFields },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (user.isUserReady) {
      reset({
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (avatar) {
      setValue('avatarUrl', 'uploaded', { shouldDirty: true });
    }
  }, [avatar]);

  const onSubmit = async (data: { firstName: string; lastName: string }) => {
    if (JSON.stringify(dirtyFields) === '{}') return;

    try {
      if (!auth.currentUser) throw new Error('Пользователь не найден');

      let avatarUrl = user.photoURL || '';
      if (avatar) {
        avatarUrl = await uploadToCloudinary(avatar);
      }

      const displayName = `${data.firstName} ${data.lastName}`;

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: avatarUrl,
      });

      if (dirtyFields.email) {
        await updateEmail(auth.currentUser, data.email);
        toast.success('Почта успешно обновлена. Необходимо заново войти.');
      }

      toast.success('Данные успешно обновлены');
      setAvatar(null);
      setAlertVisible(false);
      setEdit(false);
    } catch (error) {
      toast.error('Не удалось обновить данные');
      console.error('Ошибка обновления данных:', error);
    }
  };

  if (!user.isUserReady) return <Loader />;

  return (
    <>
      <PageTitle title="Профиль" />

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
        <div className="flex gap-4 w-full">
          <GlassWrapper className="w-2/3 px-5 py-5 text-center" style={{ zIndex: 10 }}>
            {user ? (
              <Form
                onFinish={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4 text-center"
              >
                <MeProfileActions
                  isEdit={isEdit}
                  dirtyFields={dirtyFields}
                  isValid={isValid}
                  setEdit={setEdit}
                  avatar={avatar}
                />
                <MeAvatar
                  currentAvatarUrl={user.photoURL}
                  isLoading={false}
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
            ) : (
              <Alert
                message="Ошибка загрузки данных"
                description="Не удалось получить информацию о пользователе"
                type="error"
                showIcon
              />
            )}
          </GlassWrapper>

          <GlassWrapper className="w-1/2 h-1/2 px-5 py-5 text-center" style={{ zIndex: 10 }}>
            <div className="flex h-full w-full flex-col justify-between">
              <Typography.Title level={4}>Изменить пароль</Typography.Title>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Form.Item
                    validateStatus={fieldState.error ? 'error' : undefined}
                    help={
                      fieldState.error && (
                        <Typography.Text type="danger" className="text-red-500 text-sm ml-2">
                          {fieldState.error.message}
                        </Typography.Text>
                      )
                    }
                  >
                    <div className="flex flex-col items-start w-full">
                      <Input
                        placeholder="Введите новый пароль"
                        {...field}
                        status={fieldState.error && 'error'}
                      />
                    </div>
                  </Form.Item>
                )}
              />
              <AuthSubmitButton disabled={false}>Изменить</AuthSubmitButton>
            </div>
          </GlassWrapper>
        </div>
      </div>
    </>
  );
};
