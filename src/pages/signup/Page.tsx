import { Button, Form, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdMail, MdPerson, MdPersonAddAlt1, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/redux/auth';
import { AuthSubmitButton } from '@/components/Auth/AuthSubmitButton';
import { AuthTextLink } from '@/components/Auth/AuthTextLink';
import { ROUTES } from '@/utils/routesConfig';
import { SignUpFormValues } from '@/types/auth';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/user';
import { UserFormValidationRules } from '@/utils/validation';
import { UserFormInput } from '@/components/Auth/UserFormInput';
import { usePageTitle } from '@/hooks/usePageTitle';
import ShapeWrapper from '@/layouts/GlassLayout';
import { GlassWrapper } from '@/components/ui/wrapper/GlassWrapper';

export const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCopyPassword, setShowCopyPassword] = useState<boolean>(false);
  const { control, handleSubmit, watch, reset } = useForm<SignUpFormValues>({
    mode: 'onBlur',
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

  usePageTitle('Регистрация');

  return (
    <ShapeWrapper>
      <Content className="flex px-8 md:p-0 justify-center items-center min-h-screen overflow-y-auto">
        <GlassWrapper className="px-8 py-8 rounded-2xl max-w-sm w-full" style={{ zIndex: 10 }}>
          <div className="mb-6">
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 flex items-center justify-center bg-bgPrimary rounded-2xl shadow-lg">
                <MdPersonAddAlt1 size={30} />
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
              disabled={isLoading}
              placeholder="Имя"
              rules={UserFormValidationRules.name}
              prefix={<MdPerson size={20} className="mr-1" />}
            />
            <UserFormInput
              control={control}
              name="surname"
              disabled={isLoading}
              placeholder="Фамилия"
              rules={UserFormValidationRules.surname}
              prefix={<MdPerson size={20} className="mr-1" />}
            />
            <UserFormInput
              control={control}
              name="email"
              disabled={isLoading}
              placeholder="Email"
              rules={UserFormValidationRules.email}
              prefix={<MdMail size={20} className="mr-1" />}
            />
            <UserFormInput
              control={control}
              name="password"
              disabled={isLoading}
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
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
            <UserFormInput
              control={control}
              name="copyPassword"
              type={showCopyPassword ? 'text' : 'password'}
              disabled={isLoading}
              placeholder="Пароль"
              rules={UserFormValidationRules.copyPassword(password)}
              prefix={<RiLockFill size={20} className="mr-1" />}
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
            <AuthSubmitButton disabled={isLoading} loading={isLoading}>
              Зарегистрироваться
            </AuthSubmitButton>
            <div className="flex justify-between mb-0 gap-1">
              <Form.Item className="flex items-center justify-end">
                <Button onClick={() => reset()} color="default" variant="solid">
                  Очистить форму
                </Button>
              </Form.Item>
              <AuthTextLink text="Есть аккаунт?" linkText="Войти" linkTo={ROUTES.LOGIN} />
            </div>
          </Form>
        </GlassWrapper>
      </Content>
    </ShapeWrapper>
  );
};
