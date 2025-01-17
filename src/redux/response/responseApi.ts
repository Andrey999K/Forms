import { firestoreService } from '@/services/firestore.service';
import { FormListOptions, FormListResponse, FormResponse } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isEqual } from 'lodash';

const COLLECTION = 'response';

export const responseApi = createApi({
  reducerPath: 'responseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['response'],
  endpoints: (builder) => ({
    getResponseList: builder.query<FormListResponse<FormResponse[]>, FormListOptions>({
      queryFn: async (options: FormListOptions) => {
        try {
          const result = await firestoreService.getAll<FormResponse[]>(COLLECTION, options);

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
      merge(currentCacheData, responseData, { arg }) {
        if (arg.page === 0) {
          currentCacheData.data = responseData.data;
        } else {
          currentCacheData.data.push(...responseData.data);
        }

        currentCacheData.lastVisible = responseData.lastVisible;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (
          currentArg?.page === previousArg?.page &&
          isEqual(currentArg?.filters, previousArg?.filters) &&
          isEqual(currentArg?.sort, previousArg?.sort)
        ) {
          return false;
        }

        if (currentArg?.page && currentArg.page > 0 && !currentArg?.lastVisible) {
          return false;
        }

        return true;
      },
      providesTags: (result) => {
        return [{ type: 'response', id: (result?.data[0]?.formId as string) ?? '' }];
      },
    }),

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
