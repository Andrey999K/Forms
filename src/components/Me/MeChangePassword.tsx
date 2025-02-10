import { useUpdatePasswordMutation } from '@/redux/user';
import { Form, Button, notification, Typography } from 'antd';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineCancel, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { UserFormInput } from '../Auth/UserFormInput';
import { UserFormValidationRules } from '@/utils/validation';
import { RiLockFill } from 'react-icons/ri';
import { ChangePasswordFormValues } from '@/types/me';

export const MeChangePassword = () => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const { control, handleSubmit, reset } = useForm<ChangePasswordFormValues>({
    mode: 'onBlur',
  });

  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    try {
      await updatePassword(data).unwrap();
      notification.success({ message: 'Пароль успешно обновлен' });
      reset();
    } catch (error) {
      notification.error({
        message: 'Пароль не обновлён. Убедитесь, что текущий пароль введён правильно.',
      });
      console.error('Ошибка изменения пароля:', error);
    }
  };

  return (
    <>
      <div
        onClick={() => setEdit(!isEdit)}
        className={`flex justify-center items-center cursor-pointer select-none ${isEdit && 'mb-6'}`}
      >
        <Typography.Title
          level={5}
          style={{
            marginBottom: 0,
          }}
          className="hover:text-primary transition-all duration-300 ease-in-out"
        >
          Изменить пароль
        </Typography.Title>
      </div>
      {isEdit && (
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className="w-full">
          <UserFormInput
            control={control}
            name="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="Текущий пароль"
            rules={UserFormValidationRules.password}
            prefix={<RiLockFill size={20} className="mr-1" />}
            suffix={
              <span
                onClick={toggleCurrentPasswordVisibility}
                className="flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500"
                aria-label={showCurrentPassword ? 'hideCurrentPassword' : 'showCurrentPassword'}
              >
                {showCurrentPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </span>
            }
          />
          <UserFormInput
            control={control}
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Новый пароль"
            rules={UserFormValidationRules.password}
            prefix={<RiLockFill size={20} className="mr-1" />}
            suffix={
              <span
                onClick={toggleNewPasswordVisibility}
                className="flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500"
                aria-label={showNewPassword ? 'hideNewPassword' : 'showNewPassword'}
              >
                {showNewPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </span>
            }
          />
          <Form.Item>
            <Button
              type="primary"
              style={{
                height: '35.81px',
              }}
              htmlType="submit"
              loading={isLoading}
              block
            >
              Обновить пароль
            </Button>
          </Form.Item>
          <Form.Item className="mb-0">
            <Button
              onClick={() => {
                reset();
                setEdit(!isEdit);
              }}
              color="danger"
              variant="filled"
              icon={<MdOutlineCancel size={15} />}
              className="w-full"
              style={{
                height: '33.79px',
              }}
            >
              Отменить
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
