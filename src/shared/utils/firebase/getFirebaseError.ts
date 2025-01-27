import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FirebaseError } from 'firebase/app';

export const getFirebaseError = (error: unknown): FetchBaseQueryError => {
  if (error instanceof FirebaseError) {
    return { status: +error.code, data: error.message };
  }
  return { status: 500, data: String(error) };
};
