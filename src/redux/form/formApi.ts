import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { firestoreService } from '@/services/firestore.service';
import { ConstructorForm, FormListOptions, FormListResponse } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';

export const COLLECTION = 'form';

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['form'],
  endpoints: (builder) => ({
    getFormList: builder.query<FormListResponse, FormListOptions>({
      queryFn: async (options: FormListOptions) => {
        try {
          const result = await firestoreService.getAll(COLLECTION, options);
          return {
            data: result,
          };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (currentCacheData.lastVisible.id !== responseData.lastVisible.id) {
          currentCacheData.data.push(...responseData.data);
          currentCacheData.lastVisible = responseData.lastVisible;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ['form'],
    }),

    getForm: builder.query<ConstructorForm, string>({
      queryFn: async (id) => {
        try {
          const result = await firestoreService.get(COLLECTION, id);

          return { data: result as ConstructorForm };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      providesTags: ['form'],
    }),

    createForm: builder.mutation<ConstructorForm, Partial<ConstructorForm>>({
      queryFn: async (form) => {
        const newForm = {
          fields: [],
          title: form.title || 'Название формы',
          description: form.description || 'Описание формы',
        };
        try {
          const result = await firestoreService.create(COLLECTION, newForm);
          return { data: result as ConstructorForm };
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

          return { data: result as ConstructorForm };
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
