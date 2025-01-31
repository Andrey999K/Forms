import { serverTimestamp } from 'firebase/firestore';
import { firestoreService } from '@/services/firestore.service';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormResponse } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getUUID } from '@/utils/getUUID';

dayjs.extend(utc);
dayjs.extend(timezone);

export const COLLECTION = 'response';

export const responseApi = createApi({
  reducerPath: 'responseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['response'],
  endpoints: (builder) => ({
    getResponse: builder.query<FormResponse, string>({
      queryFn: async (id) => {
        try {
          const result = await firestoreService.get<FormResponse>(COLLECTION, id);
          return { data: result };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      providesTags: ['response'],
    }),
    createResponse: builder.mutation<
      FormResponse,
      Omit<FormResponse, 'id' | 'createdAt' | 'updatedAt'>
    >({
      queryFn: async (answersData) => {
        try {
          const formRef = await firestoreService.getRef('form', answersData.formId);
          const responseData = {
            formId: formRef,
            id: getUUID(),
            fields: answersData.fields,
            createdAt: serverTimestamp(),
          };
          const result = await firestoreService.create('response', responseData);
          return { data: result as FormResponse };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
    }),

    deleteResponse: builder.mutation<boolean, string>({
      queryFn: async (id) => {
        try {
          const result = await firestoreService.delete(COLLECTION, id);
          return { data: result };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      invalidatesTags: ['response'],
    }),
  }),
});
