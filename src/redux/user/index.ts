import { userSlice } from './userSlice';
import { userApi } from './userApi';

export const {
  reducer: userReducer,
  actions: { setUser, setLoading, setError, setIsUserReady },
} = userSlice;

export const userQueryReducer = userApi.reducer;
export const userReducerPath = userApi.reducerPath;
export const userMiddleware = userApi.middleware;

export const { useGetMeInfoQuery, useUpdateMeInfoMutation, useSendVerificationEmailMutation } =
  userApi;
