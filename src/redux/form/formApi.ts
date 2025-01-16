import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { firestoreService } from '@/services/firestore.service';
import { Card, ConstructorForm, FormListOptions, FormListResponse, FormResponse } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';

export const COLLECTION = 'form';
export const RESPONSE_COLLECTION = 'response';

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['form'],
  endpoints: (builder) => ({
    getFormList: builder.query<FormListResponse<Card[]>, FormListOptions>({
      queryFn: async (options: FormListOptions) => {
        try {
          const cards = await firestoreService.getAll<Card[]>(COLLECTION, options);

          for (const card of cards.data) {
            const responses = await firestoreService.getAll<FormResponse[]>(
              RESPONSE_COLLECTION,
              {
                reference: {
                  key: 'formId',
                  collectionName: COLLECTION,
                  id: card.id,
                },
              },
              true
            );

            card.responseCount = responses.data?.length ?? 0;
          }

          return {
            data: cards,
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
        return currentArg?.page !== previousArg?.page;
      },
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
