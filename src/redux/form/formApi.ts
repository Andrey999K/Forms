import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { firestoreService } from '@/services/firestore.service';
import { ConstructorForm, FormListOptions, FormListResponse, Sort } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';

export const COLLECTION = 'form';

const defaultOptions: FormListOptions = {
  search: '',
  sort: Sort.DESC,
  limit: 9,
  page: 0,
};

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
      merge(currentCache, newItems, { arg }) {
        console.log(currentCache, newItems, { arg });

        if (arg.page === 0) return newItems;

        const existingIds = new Set(currentCache?.data?.map((item) => item.id) || []);
        const uniqueNewItems = newItems.data.filter((item) => !existingIds.has(item.id));

        return {
          data: [...(currentCache?.data || []).filter(Boolean), ...uniqueNewItems],
          lastVisible: newItems.lastVisible,
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        console.log('forceRefetch', { currentArg, previousArg });

        return currentArg?.page !== previousArg?.page;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'form' as const, id })),
              { type: 'form', id: 'LIST' },
            ]
          : [{ type: 'form', id: 'LIST' }],
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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          formApi.util.updateQueryData('getFormList', defaultOptions, (draft) => {
            if (draft?.data) {
              draft.data = draft.data.filter((item) => item.id !== id);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'form', id }],
    }),
  }),
});
