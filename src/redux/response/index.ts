import { responseApi } from './responseApi';
import { fetchResponseSlice, responseSlice } from './responseSlice';

export const responseReducer = responseApi.reducer;
export const responseReducerPath = responseApi.reducerPath;
export const responseMiddleware = responseApi.middleware;
export const responseReset = responseApi.util.resetApiState;

export const { useGetResponseQuery, useCreateResponseMutation, useDeleteResponseMutation } =
  responseApi;

export const responseSliceReducer = responseSlice.reducer;
export const responseSliceReducerPath = responseSlice.reducerPath;
export { fetchResponseSlice };

export const {
  actions: { resetStore },
} = responseSlice;
