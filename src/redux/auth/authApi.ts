import { firestoreService } from '@/services/firestore.service';
import { AuthUser, SignInFormValues, SignUpFormValues } from '@/types/auth';
import { validateAuthError } from '@/utils/errors/validateAuthError';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { notification } from 'antd';
import { FirebaseError } from 'firebase/app';

const COLLECTION = 'users';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthUser, SignInFormValues>({
      queryFn: async ({ email, password }) => {
        try {
          const data = (await firestoreService.login(email, password)) as AuthUser;
          return { data };
        } catch (error: unknown) {
          const firebaseError = error as FirebaseError;
          const validatedError = validateAuthError(firebaseError.message);
          notification.error({
            message: 'Ошибка',
            description: (validatedError.data as string) || 'Пожалуйста, попробуйте позже.',
          });
          return { error: validatedError };
        }
      },
      invalidatesTags: ['auth'],
    }),
    register: builder.mutation<AuthUser, SignUpFormValues>({
      queryFn: async ({ email, password, name, surname }) => {
        try {
          const result = (await firestoreService.register(
            COLLECTION,
            email,
            password,
            name,
            surname
          )) as AuthUser;
          return { data: result as AuthUser };
        } catch (error: unknown) {
          const firebaseError = error as FirebaseError;
          const validatedError = validateAuthError(firebaseError.message);
          notification.error({
            message: 'Ошибка',
            description: (validatedError.data as string) || 'Пожалуйста, попробуйте позже.',
          });
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
    resetPassword: builder.mutation<void, string>({
      queryFn: async (email) => {
        try {
          await firestoreService.resetPassword(email);
          return { data: undefined };
        } catch (error) {
          const firebaseError = error as FirebaseError;
          const validatedError = validateAuthError(firebaseError.message);
          notification.error({
            message: 'Ошибка',
            description: (validatedError.data as string) || 'Пожалуйста, попробуйте позже.',
          });
          return { error: validatedError };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
