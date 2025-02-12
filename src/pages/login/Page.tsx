import { Form } from 'antd';
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

import { AuthFormWrapper } from '@/components/ui/wrapper/AuthFormWrapper';

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
    <AuthFormWrapper
      title="Авторизация"
      subtitle="Войти с помощью почты"
      icon={<FiLogIn size={30} />}
    >
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
          <AuthTextLink text="Нет аккаунта?" linkText="Зарегистрироваться" linkTo={ROUTES.SIGNUP} />
        </div>
      </Form>
    </AuthFormWrapper>
  );
};
