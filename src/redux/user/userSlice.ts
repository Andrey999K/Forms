// import { createSlice } from '@reduxjs/toolkit';
// import { User } from 'firebase/auth';

// interface UserState {
//   user: User | null;
//   isLoading: boolean;
//   isUserReady: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   user: null,
//   isLoading: false,
//   isUserReady: false,
//   error: null,
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     setIsUserReady: (state, action) => {
//       state.isUserReady = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  creationTime: string | null;
  isLoading: boolean;
  isUserReady: boolean;
  error: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  creationTime: null,
  isLoading: false,
  isUserReady: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState> | null>) => {
      if (action.payload) {
        state.uid = action.payload.uid || null;
        state.email = action.payload.email || null;
        state.displayName = action.payload.displayName || null;
        state.photoURL = action.payload.photoURL || null;
        state.creationTime = action.payload.creationTime || null;
      } else {
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
      }
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
  },
});

export const { setUser, setLoading, setIsUserReady, setError } = userSlice.actions;
export default userSlice.reducer;
