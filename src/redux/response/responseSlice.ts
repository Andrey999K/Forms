import { firestoreService } from '@/services/firestore.service';
import { FormListOptions, FormListResponse, FormResponse } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { RootState } from '../store';

export const COLLECTION = 'response';

export const fetchResponseSlice = createAsyncThunk<
  {
    data: FormListResponse<FormResponse[]>;
  },
  FormListOptions,
  { state: RootState }
>('responseSlice/fetchResponseSlice', async (payload: FormListOptions, thunkApi) => {
  try {
    const { responseSlice } = thunkApi.getState();
    const result = await firestoreService.getAll<FormResponse[]>(
      COLLECTION,
      { ...payload, lastVisible: responseSlice.lastVisible },
      true
    );

    return {
      data: result,
    };
  } catch (error) {
    throw thunkApi.rejectWithValue({ error: getFirebaseError(error) });
  }
});

export const fetchAllResponses = createAsyncThunk<
  {
    data: FormListResponse<FormResponse[]>['data'];
  },
  FormListOptions,
  { state: RootState }
>('responseSlice/fetchAllResponses', async (payload: FormListOptions, thunkApi) => {
  try {
    const result = await firestoreService.getAll<FormResponse[]>(COLLECTION, payload, true);

    return {
      data: result.data,
    };
  } catch (error) {
    throw thunkApi.rejectWithValue({ error: getFirebaseError(error) });
  }
});

type InitialState = {
  error: FetchBaseQueryError | null;
  status: 'pending' | 'success' | 'rejected' | null;
  data: FormResponse[];
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
};

const initialState: InitialState = {
  status: null,
  error: null,
  data: [],
};

export const responseSlice = createSlice({
  name: 'responseSlice',
  initialState,
  reducers: {
    resetStore: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponseSlice.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchResponseSlice.fulfilled, (state, action) => {
        state.lastVisible = action.payload.data?.lastVisible;
        state.data = action.payload.data?.data ?? [];
        state.status = 'success';
      })
      .addCase(fetchResponseSlice.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});
