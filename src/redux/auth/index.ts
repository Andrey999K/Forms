import { authApi } from './authApi';

export const authReducer = authApi.reducer;
export const authReducerPath = authApi.reducerPath;
export const authMiddleware = authApi.middleware;

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
