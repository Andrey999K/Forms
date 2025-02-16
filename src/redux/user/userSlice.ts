import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { RootState } from '@/redux/store.ts';

interface UserState {
  user: User | null;
  isLoading: boolean;
  isUserReady: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  isUserReady: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsUserReady: (state, action) => {
      state.isUserReady = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const getCurrentUser = () => (state: RootState) => state.user.user;
