import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { formMiddleware, formReducer, formReducerPath } from './form';
import { authMiddleware, authReducer, authReducerPath } from './auth';
// import { authApi } from './auth/authApi';

const rootReducer = combineReducers({
  [formReducerPath]: formReducer,
  [authReducerPath]: authReducer,
  // [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formMiddleware, authMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
