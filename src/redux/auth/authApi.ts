import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthFormValues } from '@/types';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '@/utils/firebase/firebaseConfig';
import { validateAuthError } from '@/utils/errors/validateAuthError';
import { setDoc, doc } from 'firebase/firestore';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    login: builder.mutation<{ uid: string; email: string | null }, AuthFormValues>({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          return { data: { uid: user.uid, email: user.email } };
        } catch (error: any) {
          return { error: validateAuthError(error.message) };
        }
      },
      invalidatesTags: ['auth'],
    }),
    register: builder.mutation<{ uid: string; email: string | null }, AuthFormValues>({
      queryFn: async ({ email, password, name, surname }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          await setDoc(doc(db, 'users', user.uid), {
            firstName: name,
            lastName: surname,
            email: email,
            createdAt: new Date().toISOString(),
          });
          return { data: { uid: user.uid, email: user.email, name } };
        } catch (error: any) {
          return { error: validateAuthError(error.message) };
        }
      },
      invalidatesTags: ['auth'],
    }),

    logout: builder.mutation<void, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: undefined };
        } catch (error) {
          return { error: { status: 500, data: error } };
        }
      },
    }),

    getCurrentUser: builder.query<{ uid: string | null; email: string | null } | null, void>({
      queryFn: () => {
        return new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              resolve({ data: { uid: user.uid, email: user.email } });
            } else {
              resolve({ data: null });
            }
          });

          return () => unsubscribe();
        });
      },
      providesTags: ['auth'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetCurrentUserQuery } =
  authApi;
