import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  formMiddleware,
  formReducer,
  formReducerPath,
  formsSliceReducer,
  formsSliceReducerPath,
} from './form';
import {
  responseMiddleware,
  responseReducer,
  responseReducerPath,
  responseSliceReducer,
  responseSliceReducerPath,
} from './response';
import { authReducerPath, authReducer, authMiddleware } from './auth';
import { userReducer } from './user/userSlice';

const rootReducer = combineReducers({
  [formReducerPath]: formReducer,
  [authReducerPath]: authReducer,
  [responseReducerPath]: responseReducer,
  [responseSliceReducerPath]: responseSliceReducer,
  [formsSliceReducerPath]: formsSliceReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(formMiddleware)
      .concat(responseMiddleware)
      .concat(authMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
