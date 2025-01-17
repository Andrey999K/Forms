import { responseApi } from './responseApi';

export const responseReducer = responseApi.reducer;
export const responseReducerPath = responseApi.reducerPath;
export const responseMiddleware = responseApi.middleware;
export const responseReset = responseApi.util.resetApiState;

export const {
  useGetResponseListQuery,
  useGetResponseQuery,
  useCreateResponseMutation,
  useDeleteResponseMutation,
} = responseApi;
