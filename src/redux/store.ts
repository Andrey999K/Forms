import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { formMiddleware, formReducer, formReducerPath } from './form';
import { authMiddleware, authReducer, authReducerPath } from './auth';

const rootReducer = combineReducers({
  [formReducerPath]: formReducer,
  [authReducerPath]: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(formMiddleware, authMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
