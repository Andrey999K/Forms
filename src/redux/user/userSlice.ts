import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: { uid: string; email: string | null; emailVerified: boolean } | null;
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
    setUser: (
      state,
      action: PayloadAction<{ uid: string; email: string | null; emailVerified: boolean } | null>
    ) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsUserReady: (state, action: PayloadAction<boolean>) => {
      state.isUserReady = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logoutUser: () => initialState,
  },
});

export const { setUser, setLoading, setIsUserReady, setError, logoutUser } = userSlice.actions;
export default userSlice.reducer;
