import { firestoreService } from '@/services/firestore.service';
import { CardWithCount, FormListOptions, FormListResponse, FormResponse } from '@/types';
import { getFirebaseError } from '@/utils/firebase/getFirebaseError';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
};

const initialState: InitialState = {
  status: null,
  error: null,
  data: [],
};

const formsSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    resetStore: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormsSlice.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchFormsSlice.fulfilled, (state, action) => {
        state.lastVisible = action.payload.data?.lastVisible;
        state.data = action.payload.data?.data ?? [];
        state.status = 'success';
      })
      .addCase(fetchFormsSlice.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export { formsSlice };
