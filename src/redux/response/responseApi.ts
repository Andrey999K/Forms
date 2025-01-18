import { firestoreService } from '@/services/firestore.service';
import { FormResponse } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COLLECTION = 'response';

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

    createResponse: builder.mutation<FormResponse, { id: string; [key: string]: unknown }>({
      queryFn: async (response) => {
        try {
          const result = await firestoreService.create<FormResponse>(COLLECTION, response);
          return { data: result };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      invalidatesTags: (result) => [{ type: 'response', id: (result?.formId as string) ?? '' }],
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
