import { firestoreService } from '@/services/firestore.service';
import { ConstructorForm, FormData } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const COLLECTION = 'form';

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['form'],
  endpoints: (builder) => ({
    getForm: builder.query<ConstructorForm, string>({
      queryFn: async (id) => {
        try {
          const result = await firestoreService.get(COLLECTION, id);
          return { data: result as FormData };
        } catch (error) {
          console.error('Error:', error);
          return { error: getFirebaseError(error) };
        }
      },
      providesTags: ['form'],
    }),

    createForm: builder.mutation<ConstructorForm, ConstructorForm>({
      queryFn: async (form) => {
        try {
          const userRef = await firestoreService.getRef('users', form.userId);
          const result = await firestoreService.create(COLLECTION, { ...form, userId: userRef });
          return { data: result as FormData };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      invalidatesTags: ['form'],
    }),

    updateForm: builder.mutation<ConstructorForm, ConstructorForm>({
      queryFn: async (form) => {
        try {
          const { id, ...updateData } = form;
          const result = await firestoreService.update(COLLECTION, { id, ...updateData });
          return { data: result as FormData };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      invalidatesTags: ['form'],
    }),

    deleteForm: builder.mutation<boolean, string>({
      queryFn: async (id) => {
        try {
          const result = await firestoreService.delete(COLLECTION, id);
          return { data: result };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      invalidatesTags: ['form'],
    }),
  }),
});
