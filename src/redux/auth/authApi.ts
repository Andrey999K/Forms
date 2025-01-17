import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthUser, SignInFormValues, SignUpFormValues } from '@/types';
import { validateAuthError } from '@/utils/errors/validateAuthError';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { firestoreService } from '@/services/firestore.service';

const COLLECTION = 'users';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthUser, SignInFormValues>({
      queryFn: async ({ email, password }) => {
        try {
          const result = await firestoreService.login(email, password);
          toast.success('Вы успешно авторизовались');
          return { data: result.data };
        } catch (error: unknown) {
          const firebaseError = error as FirebaseError;
          const validatedError = validateAuthError(firebaseError.message);
          toast.error(
            (validatedError.data as string) ||
              'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.'
          );
          return { error: validatedError };
        }
      },
      invalidatesTags: ['auth'],
    }),
    register: builder.mutation<AuthUser, SignUpFormValues>({
      queryFn: async ({ email, password, name, surname }) => {
        try {
          const result = await firestoreService.register(
            COLLECTION,
            email,
            password,
            name,
            surname
          );
          toast.success('Вы успешно зарегистрировались');
          return { data: result };
        } catch (error: unknown) {
          const firebaseError = error as FirebaseError;
          const validatedError = validateAuthError(firebaseError.message);
          toast.error(
            (validatedError.data as string) ||
              'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.'
          );
          return { error: validatedError };
        }
      },
      invalidatesTags: ['auth'],
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await firestoreService.logout();
          return { data: undefined };
        } catch (error) {
          return { error: { status: 500, data: error } };
        }
      },
      invalidatesTags: ['auth'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
