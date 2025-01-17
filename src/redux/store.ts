import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { formMiddleware, formReducer, formReducerPath } from './form';
import { responseMiddleware, responseReducer, responseReducerPath } from './response';

const rootReducer = combineReducers({
  [formReducerPath]: formReducer,
  [responseReducerPath]: responseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(formMiddleware)
      .concat(responseMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
