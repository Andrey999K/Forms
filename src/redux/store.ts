import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { formMiddleware, formReducer, formReducerPath } from './form';

const rootReducer = combineReducers({ [formReducerPath]: formReducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(formMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
