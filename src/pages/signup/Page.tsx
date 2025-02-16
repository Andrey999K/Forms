import { Button, Form } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdMail, MdPerson, MdPersonAddAlt1, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { RiLockFill } from 'react-icons/ri';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '@/redux/auth';
import { AuthSubmitButton } from '@/components/Auth/AuthSubmitButton';
import { AuthTextLink } from '@/components/Auth/AuthTextLink';
import { ROUTES } from '@/routes/routesPaths';
import { SignUpFormValues } from '@/types/auth';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/user';
import { UserFormValidationRules } from '@/utils/validation';
import { UserFormInput } from '@/components/Auth/UserFormInput';
import { usePageTitle } from '@/hooks/usePageTitle';
import { AuthFormWrapper } from '@/components/ui/wrapper/AuthFormWrapper';

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
    <AuthFormWrapper
      title="Регистрация"
      subtitle="Зарегистрироваться с помощью почты"
      icon={<MdPersonAddAlt1 size={30} />}
    >
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
          placeholder="Повторите пароль"
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
    </AuthFormWrapper>
  );
};
