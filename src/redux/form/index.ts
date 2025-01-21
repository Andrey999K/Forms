import { fetchFormsSlice } from '@/redux/form/formSlice';
import { formApi } from './formApi';
import { formsSlice } from './formSlice';

export const formReducer = formApi.reducer;
export const formReducerPath = formApi.reducerPath;
export const formMiddleware = formApi.middleware;
export const formReset = formApi.util.resetApiState;

export const formsSliceReducer = formsSlice.reducer;
export const formsSliceReducerPath = formsSlice.reducerPath;
export { fetchFormsSlice };

export const {
  useGetFormQuery,
  useCreateFormMutation,
  useDeleteFormMutation,
  useUpdateFormMutation,
} = formApi;

export const {
  actions: { resetStore },
} = formsSlice;
