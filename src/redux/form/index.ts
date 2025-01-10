import { formApi } from './formApi';

export const formReducer = formApi.reducer;
export const formReducerPath = formApi.reducerPath;
export const formMiddleware = formApi.middleware;

export const {
  useGetFormQuery,
  useCreateFormMutation,
  useDeleteFormMutation,
  useUpdateFormMutation,
} = formApi;
