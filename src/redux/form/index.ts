import { formApi } from './formApi';

export const formReducer = formApi.reducer;
export const formReducerPath = formApi.reducerPath;
export const formMiddleware = formApi.middleware;
export const formReset = formApi.util.resetApiState;

export const {
  useGetFormListQuery,
  useGetFormQuery,
  useCreateFormMutation,
  useDeleteFormMutation,
  useUpdateFormMutation,
} = formApi;
