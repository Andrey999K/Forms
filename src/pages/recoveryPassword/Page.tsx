import { AuthSubmitButton } from '@/components/Auth/AuthSubmitButton';
import { AuthTextLink } from '@/components/Auth/AuthTextLink';
import { UserFormInput } from '@/components/Auth/UserFormInput';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useResetPasswordMutation } from '@/redux/auth';
import { EmailValue } from '@/types/auth';
import { ROUTES } from '@/routes/routesPaths';
import { UserFormValidationRules } from '@/utils/validation';
import { Form, notification } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdMail, MdLockReset } from 'react-icons/md';
import { AuthFormWrapper } from '@/components/ui/wrapper/AuthFormWrapper';

export const RecoveryPassword = () => {
  const { control, handleSubmit, reset } = useForm<EmailValue>({
    mode: 'onChange',
  });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<EmailValue> = async ({ email }) => {
    try {
      await resetPassword(email).unwrap();
      notification.success({ message: 'Письмо для сброса пароля отправлено на указанный email' });
      reset();
    } catch (error) {
      console.error('Ошибка сброса пароля:', error);
    }
  };

  usePageTitle('Восстановление пароля');

  return (
    <AuthFormWrapper
      title="Сброс пароля"
      subtitle="Введите почту, на которую будет отправлено письмо для сброса пароля."
      icon={<MdLockReset size={30} />}
    >
      <Form onFinish={handleSubmit(onSubmit)} autoComplete="off">
        <UserFormInput
          control={control}
          name="email"
          disabled={isLoading}
          placeholder="Email"
          rules={UserFormValidationRules.email}
          prefix={<MdMail size={20} className="mr-1" />}
        />
        <AuthSubmitButton disabled={isLoading} loading={isLoading}>
          Сбросить пароль
        </AuthSubmitButton>
        <AuthTextLink linkText="На страницу входа" linkTo={ROUTES.LOGIN} />
      </Form>
    </AuthFormWrapper>
  );
};
