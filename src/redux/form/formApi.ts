import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ConstructorForm } from '@/types';

export const formApi = createApi({
  reducerPath: 'formApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['form'],
  endpoints: (builder) => ({
    getForm: builder.query<ConstructorForm, string>({
      query: (id) => `/form/${id}`,
      providesTags: ['form'],
    }),

    createForm: builder.mutation<ConstructorForm, Partial<ConstructorForm>>({
      query: (form) => ({
        url: '/form',
        method: 'POST',
        body: form,
      }),
      invalidatesTags: ['form'],
    }),

    updateForm: builder.mutation<ConstructorForm, ConstructorForm>({
      query: (form) => ({
        url: `/form/${form.id}`,
        method: 'PUT',
        body: form,
      }),
      invalidatesTags: ['form'],
    }),

    deleteForm: builder.mutation<void, string>({
      query: (id) => ({
        url: `/form/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['form'],
    }),
  }),
});
