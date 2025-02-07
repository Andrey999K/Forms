import { AuthSubmitButton } from '@/components/Auth/AuthSubmitButton';
import { AuthTextLink } from '@/components/Auth/AuthTextLink';
import { UserFormInput } from '@/components/Auth/UserFormInput';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useResetPasswordMutation } from '@/redux/auth';
import { EmailValue } from '@/types/auth';
import { ROUTES } from '@/utils/routesConfig';
import { UserFormValidationRules } from '@/utils/validation';
import { Form, Layout, notification, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdMail } from 'react-icons/md';

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
    <Layout className="min-h-screen bg-gradientAuthBg overflow-hidden">
      <Content className="flex justify-center items-center min-h-screen overflow-y-auto px-8">
        <div className="bg-bgBase bg-opacity-20 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg max-w-sm w-full">
          <div className="mb-6">
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
        </div>
      </Content>
    </Layout>
  );
};
