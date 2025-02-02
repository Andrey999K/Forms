import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { validateAuthError } from '@/utils/errors/validateAuthError';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { firestoreService } from '@/services/firestore.service';
import { AuthUser, SignInFormValues, SignUpFormValues } from '@/types/auth';
// const COLLECTION = 'users';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    // login: builder.mutation<AuthUser, SignInFormValues>({
    //   queryFn: async ({ email, password }) => {
    //     try {
    //       const data = (await firestoreService.login(email, password)) as AuthUser;
    //       localStorage.setItem('user', data.uid);
    //       return { data };
    //     } catch (error: unknown) {
    //       const firebaseError = error as FirebaseError;
    //       const validatedError = validateAuthError(firebaseError.message);

    //       toast.error(
    //         (validatedError.data as string) ||
    //           'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.'
    //       );
    //       return { error: validatedError };
    //     }
    //   },
    //   invalidatesTags: ['auth'],
    // }),
    login: builder.mutation<AuthUser, SignInFormValues>({
      queryFn: async ({ email, password }) => {
        try {
          const user = await firestoreService.login(email, password);
          localStorage.setItem('user', user.uid);
          return { data: user };
        } catch (error: unknown) {
          const firebaseError = error as FirebaseError;
          toast.error(firebaseError.message || 'Ошибка входа');
          return { error: { status: 500, data: firebaseError.message } };
        }
      },
    }),
    register: builder.mutation<AuthUser, SignUpFormValues>({
      queryFn: async ({ email, password, name, surname }) => {
        try {
          const user = await firestoreService.register(email, password, name, surname);
          localStorage.setItem('user', user.uid);

          return { data: user };
        } catch (error: unknown) {
          const firebaseError = error as FirebaseError;
          toast.error(firebaseError.message || 'Ошибка регистрации');
          return { error: { status: 500, data: firebaseError.message } };
        }
      },
    }),
    // register: builder.mutation<AuthUser, SignUpFormValues>({
    //   queryFn: async ({ email, password, name, surname }) => {
    //     try {
    //       const result = (await firestoreService.register(
    //         COLLECTION,
    //         email,
    //         password,
    //         name,
    //         surname
    //       )) as AuthUser;
    //       localStorage.setItem('user', result.uid);
    //       return { data: result as AuthUser };
    //     } catch (error: unknown) {
    //       const firebaseError = error as FirebaseError;
    //       const validatedError = validateAuthError(firebaseError.message);
    //       toast.error(
    //         (validatedError.data as string) ||
    //           'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.'
    //       );
    //       return { error: validatedError };
    //     }
    //   },
    //   invalidatesTags: ['auth'],
    // }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await firestoreService.logout();
          localStorage.removeItem('user');
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
          toast.error(
            (validatedError.data as string) || 'Произошла ошибка. Пожалуйста, попробуйте позже.'
          );
          return { error: validatedError };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
