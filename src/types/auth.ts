export type AuthFormValues = {
  name?: string;
  surname?: string;
  email: string;
  password: string;
  copyPassword?: string;
};

export type SignUpFormValues = {
  name: string;
  surname: string;
  email: string;
  password: string;
  copyPassword: string;
};

export type SignInFormValues = {
  email: string;
  password: string;
};

export type AuthUser = {
  uid: string;
  email: string | null;
};

export type UserFormPlaceholder =
  | 'Email'
  | 'Пароль'
  | 'Повторите пароль'
  | 'Имя'
  | 'Фамилия'
  | 'Новый пароль'
  | 'Текущий пароль';

export type EmailValue = Pick<AuthFormValues, 'email'>;
