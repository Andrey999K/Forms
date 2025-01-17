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
