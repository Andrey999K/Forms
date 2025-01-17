import { Form, Layout, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdMail, MdPerson, MdPersonAddAlt1, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/redux/auth';
import { AuthClearFormButton } from '@/components/auth/AuthClearFormButton';
import { AuthFormInput } from '@/components/auth/AuthFormInput';
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton';
import { AuthTextLink } from '@/components/auth/AuthTextLink';
import { AuthValidationRules } from '@/utils/validation';
import { Routes } from '@/utils/routesConfig';
import { SignUpFormValues } from '@/types/auth';

export const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCopyPassword, setShowCopyPassword] = useState<boolean>(false);
  const { control, handleSubmit, watch, reset } = useForm<SignUpFormValues>({
    mode: 'onChange',
  });
  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleCopyPasswordVisibility = () => setShowCopyPassword((prev) => !prev);

  const password = watch('password');

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      await register(data).unwrap();
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
                <MdPersonAddAlt1 size={30} color="#808897" />
              </div>
            </div>
            <Typography.Title
              level={2}
              style={{
                marginBottom: '0.5rem',
              }}
            >
              Регистрация
            </Typography.Title>
            <Typography.Title
              level={5}
              style={{
                margin: '0',
              }}
            >
              Зарегистрироваться с помощью почты
            </Typography.Title>
          </div>
          <Form onFinish={handleSubmit(onSubmit)} autoComplete="off">
            <AuthFormInput
              control={control}
              name="name"
              placeholder="Имя"
              rules={AuthValidationRules.name}
              prefix={<MdPerson color="#808897" size={20} className="mr-1" />}
            />
            <AuthFormInput
              control={control}
              name="surname"
              placeholder="Фамилия"
              rules={AuthValidationRules.surname}
              prefix={<MdPerson color="#808897" size={20} className="mr-1" />}
            />
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
            <AuthFormInput
              control={control}
              name="copyPassword"
              type={showCopyPassword ? 'text' : 'password'}
              placeholder="Пароль"
              rules={AuthValidationRules.copyPassword(password)}
              prefix={<RiLockFill color="#808897" size={20} className="mr-1" />}
              suffix={
                <span
                  onClick={toggleCopyPasswordVisibility}
                  className="flex items-center justify-center cursor-pointer p-0 m-0 h-auto w-auto hover:text-gray-500"
                  aria-label={showCopyPassword ? 'hidePassword' : 'showPassword'}
                >
                  {showCopyPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </span>
              }
            />
            <AuthSubmitButton disabled={isLoading}>Зарегистрироваться</AuthSubmitButton>
            <div className="flex items-center justify-between">
              <AuthClearFormButton reset={reset} />
              <AuthTextLink text="Есть аккаунт?" linkText="Войти" linkTo={Routes.LOGIN} />
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};
