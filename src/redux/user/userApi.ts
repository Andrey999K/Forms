import { firestoreService } from '@/services/firestore.service';
import { MeChangeFields, MeData } from '@/types/me';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

export const COLLECTION = 'users';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['me'],
  endpoints: (builder) => ({
    getMeInfo: builder.query<MeData, string>({
      queryFn: async (uid: string) => {
        try {
          if (!uid) return { error: { status: 400, data: 'uid пользователя отсутствует' } };
          const result = await firestoreService.get<MeData>(COLLECTION, uid);
          return { data: result };
        } catch (error) {
          return { error: getFirebaseError(error) };
        }
      },
      providesTags: ['me'],
    }),

    updateMeInfo: builder.mutation<MeData, { id: string; data: MeChangeFields }>({
      queryFn: async ({ id, data }) => {
        try {
          const result = await firestoreService.update(COLLECTION, { id, ...data });
          toast.success('Вы успешно обновили свои данные');
          return { data: result as MeData };
        } catch (error) {
          toast.error('Не удалось обновить данные');
          return { error: getFirebaseError(error) };
        }
      },
      invalidatesTags: ['me'],
    }),
  }),
});

export const { useGetMeInfoQuery, useUpdateMeInfoMutation } = userApi;
