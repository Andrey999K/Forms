import { Form, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';
import { MdMail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';
import { useState } from 'react';
import { AuthSubmitButton } from '@/components/Auth/AuthSubmitButton';
import { AuthTextLink } from '@/components/Auth/AuthTextLink';
import { ROUTES } from '@/routes/routesPaths';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/redux/auth';
import { SignInFormValues } from '@/types/auth';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/user';
import { UserFormValidationRules } from '@/utils/validation';
import { UserFormInput } from '@/components/Auth/UserFormInput';
import { usePageTitle } from '@/hooks/usePageTitle';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';
import ShapeWrapper from '@/layouts/GlassLayout';

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<SignInFormValues>({
    mode: 'onBlur',
  });
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    dispatch(setLoading(true));
    try {
      await login(data).unwrap();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  usePageTitle('Авторизация');

  return (
    <ShapeWrapper>
      <Content className="flex px-8 md:p-0 justify-center items-center min-h-screen overflow-y-auto">
        <GlassWrapper className="px-8 py-8 rounded-2xl max-w-sm w-full" style={{ zIndex: 10 }}>
          <div className="mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 flex items-center justify-center bg-bgPrimary rounded-2xl shadow-lg">
                <FiLogIn size={30} />
              </div>
            </div>
            <Typography.Title
              level={2}
              style={{
                marginBottom: '0.5rem',
              }}
            >
              Авторизация
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{
                margin: '0',
              }}
            >
              Войти с помощью почты
            </Typography.Title>
          </div>
          <Form onFinish={handleSubmit(onSubmit)} autoComplete="off">
            <UserFormInput
              control={control}
              name="email"
              placeholder="Email"
              disabled={isLoading}
              rules={UserFormValidationRules.email}
              prefix={<MdMail size={20} className="mr-1" />}
            />
            <UserFormInput
              control={control}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              disabled={isLoading}
              rules={UserFormValidationRules.password}
              prefix={<RiLockFill size={20} className="mr-1" />}
              suffix={
                <span
                  onClick={togglePasswordVisibility}
                  className="flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500"
                  aria-label={showPassword ? 'hidePassword' : 'showPassword'}
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </span>
              }
            />
            <AuthSubmitButton disabled={isLoading} loading={isLoading}>
              Войти
            </AuthSubmitButton>
            <div>
              <AuthTextLink
                text="Забыли пароль?"
                linkText="Сбросить"
                linkTo={ROUTES.RECOVERY_PASSWORD}
              />
              <AuthTextLink
                text="Нет аккаунта?"
                linkText="Зарегистрироваться"
                linkTo={ROUTES.SIGNUP}
              />
            </div>
          </Form>
        </GlassWrapper>
      </Content>
    </ShapeWrapper>
  );
};
