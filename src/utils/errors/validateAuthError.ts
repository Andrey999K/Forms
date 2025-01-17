import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const validateAuthError = (error?: string): FetchBaseQueryError => {
  if (!error) {
    return { status: 500, data: 'Произошла неизвестная ошибка.' };
  }
  if (error.includes('auth/invalid-email')) {
    return { status: 400, data: 'Пожалуйста, введите корректный email.' };
  }
  if (error.includes('auth/missing-password')) {
    return { status: 400, data: 'Пожалуйста, заполните пароль.' };
  }
  if (
    error.includes('auth/invalid-credential') ||
    error.includes('auth/wrong-password') ||
    error.includes('auth/user-not-found')
  ) {
    return { status: 401, data: 'Введены неверные учетные данные.' };
  }
  if (error.includes('auth/email-already-in-use')) {
    return { status: 409, data: 'Введенный email уже используется.' };
  }
  if (error.includes('auth/weak-password')) {
    return { status: 400, data: 'Введенный пароль должен содержать более 8 символов.' };
  }
  if (error.includes('auth/too-many-requests')) {
    return { status: 429, data: 'Слишком много неудачных попыток. Попробуйте позже.' };
  }
  return { status: 500, data: 'Произошла неизвестная ошибка.' };
};
