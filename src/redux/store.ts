import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { formMiddleware, formReducer, formReducerPath } from './form';
import { responseMiddleware, responseReducer, responseReducerPath } from './response';
import { authReducerPath, authReducer, authMiddleware } from './auth';
import { userReducer } from './user/userSlice';

const rootReducer = combineReducers({
  [formReducerPath]: formReducer,
  [authReducerPath]: authReducer,
  [responseReducerPath]: responseReducer,
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
