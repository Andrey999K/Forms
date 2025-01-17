import { Form, Layout, Spin, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';
import { MdMail } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useState } from 'react';
import { AuthValidationRules } from '@/utils/validation';
import { AuthFormInput } from '@/components/auth/AuthFormInput';
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton';
import { AuthTextLink } from '@/components/auth/AuthTextLink';
import { Routes } from '@/utils/routesConfig';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/redux/auth';
import { SignInFormValues } from '@/types';

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<SignInFormValues>({
    mode: 'onChange',
  });
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    try {
      await login(data).unwrap();
      navigate(Routes.HOME);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <Layout className="min-h-screen bg-authImg bg-cover bg-center overflow-hidden">
      <Content className="flex justify-center items-center min-h-screen overflow-y-auto">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg max-w-sm w-full">
          <div className="mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 flex items-center justify-center bg-[#EEF5F8] rounded-2xl shadow-lg">
                <FiLogIn size={30} color="#808897" />
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
            <AuthFormInput
              control={control}
              name="email"
              placeholder="Email"
              rules={AuthValidationRules.email}
              prefix={<MdMail color="#808897" size={20} className="mr-1" />}
            />
            <AuthFormInput
              control={control}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              rules={AuthValidationRules.password}
              prefix={<RiLockFill color="#808897" size={20} className="mr-1" />}
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
            <AuthSubmitButton disabled={isLoading}>
              {isLoading ? <Spin size="small" /> : 'Войти'}
            </AuthSubmitButton>
            <AuthTextLink
              text="Нет аккаунта?"
              linkText="Зарегистрироваться"
              linkTo={Routes.SIGNUP}
            />
          </Form>
        </div>
      </Content>
    </Layout>
  );
};
