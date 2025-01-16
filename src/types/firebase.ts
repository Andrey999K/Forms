import { DocumentData, DocumentReference, QueryDocumentSnapshot } from 'firebase/firestore';
import { Sort } from './base';

export type FormListReferenceOption = {
  id: string;
  collectionName: string;
  key: string;
};

export type FormListOptions = {
  limit?: number;
  page?: number;
  searchKey?: string;
  search?: string | DocumentReference<DocumentData, DocumentData>;
  sort?: Sort;
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
  reference?: FormListReferenceOption;
};

export type FormListResponse<T> = {
  data: T;
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>;
};
