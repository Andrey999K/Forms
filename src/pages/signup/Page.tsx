import { Button, Form, Layout, Spin, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdMail, MdPerson, MdPersonAddAlt1, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/redux/auth';
import { AuthSubmitButton } from '@/shared/components/Auth/AuthSubmitButton';
import { AuthTextLink } from '@/shared/components/Auth/AuthTextLink';
import { ROUTES } from '@/shared/utils/routesConfig';
import { SignUpFormValues } from '@/shared/types/auth';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/user';
import { UserFormValidationRules } from '@/shared/utils/validation';
import { UserFormInput } from '@/shared/components/Auth/UserFormInput';

export const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCopyPassword, setShowCopyPassword] = useState<boolean>(false);
  const { control, handleSubmit, watch, reset } = useForm<SignUpFormValues>({
    mode: 'onChange',
  });
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleCopyPasswordVisibility = () => setShowCopyPassword((prev) => !prev);

  const password = watch('password');

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    dispatch(setLoading(true));
    try {
      await register(data).unwrap();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Layout className="min-h-screen auth-bg-gradient overflow-hidden">
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
            <UserFormInput
              control={control}
              name="name"
              placeholder="Имя"
              rules={UserFormValidationRules.name}
              prefix={<MdPerson color="#808897" size={20} className="mr-1" />}
            />
            <UserFormInput
              control={control}
              name="surname"
              placeholder="Фамилия"
              rules={UserFormValidationRules.surname}
              prefix={<MdPerson color="#808897" size={20} className="mr-1" />}
            />
            <UserFormInput
              control={control}
              name="email"
              placeholder="Email"
              rules={UserFormValidationRules.email}
              prefix={<MdMail color="#808897" size={20} className="mr-1" />}
            />
            <UserFormInput
              control={control}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              rules={UserFormValidationRules.password}
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
            <UserFormInput
              control={control}
              name="copyPassword"
              type={showCopyPassword ? 'text' : 'password'}
              placeholder="Пароль"
              rules={UserFormValidationRules.copyPassword(password)}
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
            <AuthSubmitButton disabled={isLoading}>
              {isLoading ? <Spin size="small" /> : 'Зарегистрироваться'}
            </AuthSubmitButton>
            <div className="flex items-center justify-between">
              <Form.Item className="flex justify-end ml-1 mb-0">
                <Button onClick={() => reset()} color="default" variant="solid">
                  Очистить форму
                </Button>
              </Form.Item>
              <AuthTextLink text="Есть аккаунт?" linkText="Войти" linkTo={ROUTES.LOGIN} />
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};
