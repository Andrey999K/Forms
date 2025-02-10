import { AuthSubmitButton } from '@/components/Auth/AuthSubmitButton';
import { AuthTextLink } from '@/components/Auth/AuthTextLink';
import { UserFormInput } from '@/components/Auth/UserFormInput';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import { usePageTitle } from '@/hooks/usePageTitle';
import ShapeWrapper from '@/layouts/GlassLayout';
import { useResetPasswordMutation } from '@/redux/auth';
import { EmailValue } from '@/types/auth';
import { ROUTES } from '@/utils/routesConfig';
import { UserFormValidationRules } from '@/utils/validation';
import { Form, notification, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdMail, MdLockReset } from 'react-icons/md';

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
    <ShapeWrapper>
      <Content className="flex px-8 md:p-0 justify-center items-center min-h-screen overflow-y-auto">
        <GlassWrapper className="px-8 py-8 rounded-2xl max-w-sm w-full" style={{ zIndex: 10 }}>
          <div className="mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 flex items-center justify-center bg-bgPrimary rounded-2xl shadow-lg">
                <MdLockReset size={30} />
              </div>
            </div>
            <Typography.Title
              level={2}
              style={{
                marginBottom: '0.5rem',
              }}
            >
              Сброс пароля
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{
                margin: '0',
              }}
            >
              Введите почту, на которую будет отправлено письмо для сброса пароля.
            </Typography.Title>
          </div>
          <Form onFinish={handleSubmit(onSubmit)} autoComplete="off">
            <UserFormInput
              control={control}
              name="email"
              placeholder="Email"
              rules={UserFormValidationRules.email}
              prefix={<MdMail size={20} className="mr-1" />}
            />
            <AuthSubmitButton disabled={isLoading} loading={isLoading}>
              Сбросить пароль
            </AuthSubmitButton>
            <AuthTextLink linkText="На страницу входа" linkTo={ROUTES.LOGIN} />
          </Form>
        </GlassWrapper>
      </Content>
    </ShapeWrapper>
  );
};
