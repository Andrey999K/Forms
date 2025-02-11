import { firestoreService } from '@/services/firestore.service';
import { Card, CardWithCount, FormListOptions, FormListResponse, FormResponse } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { RootState } from '../store';

export const COLLECTION = 'form';
export const RESPONSE_COLLECTION = 'response';

export const fetchFormsSlice = createAsyncThunk<
  {
    data: FormListResponse<CardWithCount[]>;
  },
  FormListOptions,
  { state: RootState }
>('formSlice/fetchFormsSlice', async (payload: FormListOptions, thunkApi) => {
  try {
    const { formSlice } = thunkApi.getState();
    const cards = await firestoreService.getAll<CardWithCount[]>(
      COLLECTION,
      { ...payload, lastVisible: formSlice.lastVisible },
      true
    );

    for (const card of cards.data) {
      const responses = await firestoreService.getAll<FormResponse[]>(
        RESPONSE_COLLECTION,
        {
          reference: {
            key: 'formId',
            collectionName: COLLECTION,
            id: card.id,
          },
        },
        true
      );

      card.responseCount = responses.data?.length ?? 0;
    }

    return {
      data: cards,
    };
  } catch (error) {
    throw thunkApi.rejectWithValue({ error: getFirebaseError(error) });
  }
});

type InitialState = {
  error: FetchBaseQueryError | null;
  status: 'pending' | 'success' | 'rejected' | null;
  data: CardWithCount[];
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  order?: FormListOptions['sort'];
  search?: string;
  hasNext: boolean;
};

const initialState: InitialState = {
  status: null,
  error: null,
  data: [],
  hasNext: true,
};

const formsSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    resetStore: () => {
      return initialState;
    },
    createLocalForm: (state, action: PayloadAction<CardWithCount>) => {
      state.data = [action.payload, ...state.data];
    },
    updateLocalForm: (state, action: PayloadAction<Card>) => {
      const index = state.data.findIndex((form) => form.id === action.payload.id);
      if (index === -1) return;
      state.data[index] = { ...action.payload, ...state.data[index] };
    },
    incrementResponseCount: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.data.findIndex((form) => form.id === action.payload.id);
      if (index === -1) return;

      state.data[index].responseCount += 1;
    },
    deleteLocalForm: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((form) => form.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormsSlice.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchFormsSlice.fulfilled, (state, action) => {
        state.lastVisible = action.payload.data?.lastVisible;
        state.search = action.meta.arg.search?.value;
        state.order = action.meta.arg.sort;
        state.status = 'success';
        state.hasNext = action.payload.data.data.length === action.meta.arg.limit;
        state.data = [...state.data, ...(action.payload.data?.data ?? [])];
      })
      .addCase(fetchFormsSlice.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export { formsSlice };
