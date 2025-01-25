type ValidationRule = {
  required?: { value: boolean; message: string };
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  validate?: (value: string | undefined) => boolean | string;
};

export type UserFormValidation = {
  name: ValidationRule;
  surname: ValidationRule;
  email: ValidationRule;
  password: ValidationRule;
  copyPassword: (password: string) => ValidationRule;
};

export const UserFormValidationRules: UserFormValidation = {
  name: {
    required: { value: true, message: 'Введите имя' },
    pattern: {
      value: /^[A-ZА-ЯЁ][a-zа-яё\s-]+$/,
      message: 'Имя должно начинаться с заглавной буквы и содержать только буквы, пробелы и дефисы',
    },
    minLength: { value: 2, message: 'Имя должно быть не менее 2 символов' },
    maxLength: { value: 50, message: 'Имя должно быть не более 50 символов' },
  },
  surname: {
    required: { value: true, message: 'Введите фамилию' },
    pattern: {
      value: /^[A-ZА-ЯЁ][a-zа-яё\s-]+$/,
      message:
        'Фамилия должна начинаться с заглавной буквы и содержать только буквы, пробелы и дефисы',
    },
    minLength: { value: 2, message: 'Фамилия должна быть не менее 2 символов' },
    maxLength: { value: 50, message: 'Фамилия должна быть не более 50 символов' },
  },
  email: {
    required: { value: true, message: 'Введите email' },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Неверный формат электронной почты',
    },
  },
  password: {
    required: { value: true, message: 'Введите пароль' },
    minLength: { value: 6, message: 'Минимальная длина пароля 6 символов' },
    maxLength: { value: 25, message: 'Максимальная длина пароля 25 символов' },
  },
  copyPassword: (password: string) => ({
    required: { value: true, message: 'Введите пароль' },
    minLength: { value: 6, message: 'Минимальная длина пароля 6 символов' },
    maxLength: { value: 25, message: 'Максимальная длина пароля 25 символов' },
    validate: (value?: string) => value === password || 'Пароли должны совпадать',
  }),
};
